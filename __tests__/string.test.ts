import {dynamicMethodCall, ArgType} from '../src/dynamic_methods'
import {expect, test} from '@jest/globals'

test('should call the correct method on a string instance', () => {
  const value = 'Hello, World!'
  const method = 'toUpperCase'
  const type: ArgType = 'string'
  const result = dynamicMethodCall(value, method, type, undefined, undefined)
  expect(result).toBe('HELLO, WORLD!')
})

test('should call the correct method on a number instance', () => {
  const value = '42'
  const method = 'toFixed'
  const args = ['1']
  const argTypes: ArgType[] = ['number']
  const type: ArgType = 'number'
  const result = dynamicMethodCall(value, method, type, args, argTypes)
  expect(result).toBe('42.0')
})

test('should call the correct method on a boolean instance', () => {
  const value = 'true'
  const method = 'toString'
  const type: ArgType = 'boolean'
  const result = dynamicMethodCall(value, method, type, undefined, undefined)
  expect(result).toBe('true')
})

test('should throw an error when calling an invalid method', () => {
  const value = 'Hello, World!'
  const method = 'nonExistentMethod'
  const type: ArgType = 'string'
  expect(() =>
    dynamicMethodCall(value, method, type, undefined, undefined)
  ).toThrow(`Method 'nonExistentMethod' does not exist on the string instance.`)
})

test('should throw an error when args and argTypes arrays do not match', () => {
  const value = '42'
  const method = 'toFixed'
  const args = ['1', '2']
  const argTypes: ArgType[] = ['number']
  const type: ArgType = 'number'
  expect(() => dynamicMethodCall(value, method, type, args, argTypes)).toThrow(
    'The lengths of args and argTypes arrays do not match.'
  )
})
