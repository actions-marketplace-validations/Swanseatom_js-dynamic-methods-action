import * as core from '@actions/core'
import {ArgType, dynamicMethodCall} from './dynamic_methods'

function getInputAsArray(name: string): string[] {
  const input = core.getInput(name)
  if (!input) return []
  return input.split(',').map(item => item.trim())
}

async function run(): Promise<void> {
  try {
    // Read inputs from the GitHub Action
    const value = core.getInput('value')
    const method = core.getInput('method')
    const args = getInputAsArray('args')
    const argTypes = getInputAsArray('argTypes').map(item => item as ArgType)
    const type = core.getInput('type') as 'string' | 'number' | 'boolean'
    const envVar = core.getInput('envVar')

    // Validate that the required inputs are provided
    if (!value || !method || !type) {
      core.setFailed(
        "Required inputs 'value', 'method', and 'type' must be provided."
      )
    } else {
      try {
        const result = dynamicMethodCall(value, method, type, args, argTypes)

        core.info(`The result of the method call is: ${result}`)

        core.setOutput('result', result)

        if (envVar) {
          core.info(`The result has been assigned to: env.${envVar}`)
          core.exportVariable(envVar, result)
        }
      } catch (error) {
        core.setFailed(`Error during method call: ${(error as Error).message}`)
      }
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
