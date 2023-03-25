interface StringExtended extends String {
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  [x: string]: any
}
interface NumberExtended extends Number {
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  [x: string]: any
}
interface BooleanExtended extends Boolean {
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  [x: string]: any
}

export type ArgType = 'string' | 'number' | 'boolean' | 'regex'

/**
 * Instantiates an instance of the specified type using the provided value.
 *
 * @param value - The value to use when instantiating the instance.
 * @param type - The type of instance to create. Must be one of "string", "number", or "boolean".
 * @returns The instantiated instance of the specified type.
 * @throws {Error} If an invalid type is provided.
 */
function instantiateInstance(
  value: string,
  type: 'string' | 'number' | 'boolean'
): StringExtended | NumberExtended | BooleanExtended {
  switch (type) {
    case 'string': {
      return new String(value)
    }
    case 'number': {
      const numberValue = parseFloat(value)
      if (isNaN(numberValue)) throw new Error('Invalid number value.')
      return new Number(numberValue)
    }
    case 'boolean': {
      const lowerCaseValue = value.toLowerCase()
      if (lowerCaseValue === 'true') return new Boolean(true)
      if (lowerCaseValue === 'false') return new Boolean(false)
      throw new Error('Invalid boolean value.')
    }
    default: {
      throw new Error(`Unsupported type '${type}'.`)
    }
  }
}
/**
 * Instantiates an argument based on the specified argument type.
 *
 * @param arg - The argument value to instantiate.
 * @param argType - The type of the argument. Must be one of "string", "number", "boolean", or "regex".
 * @returns The instantiated argument of the specified type.
 * @throws {Error} If an unsupported or invalid type is provided.
 */
function instantiateArgument(
  arg: string,
  argType: ArgType
): string | number | boolean | RegExp {
  switch (argType) {
    case 'string':
      return arg
    case 'number':
      return parseFloat(arg)
    case 'boolean':
      return arg.toLowerCase() === 'true'
    case 'regex':
      try {
        return new RegExp(arg)
      } catch (error) {
        throw new Error(`Invalid regex: '${arg}'.`)
      }
    default:
      throw new Error(`Unsupported type '${argType}'.`)
  }
}

/**
 * Calls a method on an instance (String, Number, or Boolean) with the provided arguments.
 *
 * @param value - The value to use when instantiating the instance.
 * @param method - The method name to call on the instance.
 * @param args - An optional array of argument values to pass to the method.
 * @param argTypes - An optional array of argument types corresponding to the args array.
 *                   Must have the same length as the args array if provided.
 * @param type - The type of instance to create. Must be one of "string", "number", or "boolean".
 * @returns The result of calling the specified method on the instance.
 * @throws {Error} If the method does not exist on the instance, or if the lengths of args and argTypes arrays do not match.
 */
export function dynamicMethodCall(
  value: string,
  method: string,
  type: 'string' | 'number' | 'boolean',
  args?: string[],
  argTypes?: ArgType[]
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
): any {
  const instance = instantiateInstance(value, type)

  // Check if the method exists on the instance
  if (typeof instance[method] !== 'function') {
    throw new Error(
      `Method '${method}' does not exist on the ${type} instance.`
    )
  }

  // If args and argTypes are provided, check if their lengths match
  if (args && argTypes && args.length !== argTypes.length) {
    throw new Error('The lengths of args and argTypes arrays do not match.')
  }

  // Instantiate the arguments using the argTypes parameter
  const instantiatedArgs =
    args && argTypes
      ? args.map((arg, index) => instantiateArgument(arg, argTypes[index]))
      : []

  // Call the method with the instantiated arguments
  return instance[method](...instantiatedArgs)
}
