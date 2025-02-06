import { IsString, ValidationError } from 'class-validator'
import { HttpException, HttpStatus } from '@nestjs/common'

import checkRawInput from '@app/modules/helpers/check-raw-input.helper'

describe('checkRawInput', () => {
  class TestClass {
    @IsString()
    foo: string
  }

  it('should return correct input type applying validation', async () => {
    const expected = new TestClass()
    expected.foo = 'bar'
    await expect(checkRawInput(TestClass, { foo: 'bar' })).resolves.toEqual(expected)
  })

  it('should throw a validation error when object does not match type validation', async () => {
    const error = {
      children: [],
      constraints: {
        isString: 'foo must be a string'
      },
      property: 'foo',
      target: new TestClass(),
      value: undefined
    }
    await expect(checkRawInput(TestClass, { bar: 'foo' } as unknown as TestClass)).rejects.toMatchError(
      new HttpException({ errors: ['foo must be a string'] }, HttpStatus.BAD_REQUEST, {
        cause: [error]
      })
    )
  })

  it('should throw a validation error when object does not match type validation but has no constraints', async () => {
    const expectedError = {} as ValidationError
    const error = new ValidationError()
    const plainToInstanceSpy = jest.spyOn(require('class-transformer'), 'plainToInstance')
    plainToInstanceSpy.mockImplementation(() => {
      throw [error]
    })
    await expect(checkRawInput(TestClass, { bar: 'foo' } as unknown as TestClass)).rejects.toMatchError(
      new HttpException({ errors: [] }, HttpStatus.BAD_REQUEST, {
        cause: [expectedError]
      })
    )
    plainToInstanceSpy.mockRestore()
  })

  it('should throw a generic error when something unexpected happens', async () => {
    const expected = new TestClass()
    expected.foo = 'bar'
    const error = new Error('Generic error')
    const expectedError = new Error(`Unknown error during validation: ${JSON.stringify(error, Object.getOwnPropertyNames(error))}`)
    const plainToInstanceSpy = jest.spyOn(require('class-transformer'), 'plainToInstance')
    plainToInstanceSpy.mockImplementation(() => {
      throw error
    })
    await expect(checkRawInput(TestClass, { foo: 'bar' })).rejects.toMatchError(expectedError)
    plainToInstanceSpy.mockRestore()
  })

  it('should process nested validation errors (children)', async () => {
    class NestedClass {
      @IsString()
      nestedFoo: string
    }

    class ParentClass {
      @IsString()
      parentFoo: string

      nested!: NestedClass
    }

    const nestedError = new ValidationError()
    nestedError.property = 'nestedFoo'
    nestedError.constraints = { isString: 'nestedFoo must be a string' }

    const parentError = new ValidationError()
    parentError.property = 'nested'
    parentError.children = [nestedError]

    const plainToInstanceSpy = jest.spyOn(require('class-transformer'), 'plainToInstance')
    plainToInstanceSpy.mockImplementation(() => {
      throw [parentError]
    })

    await expect(
      checkRawInput(ParentClass, { parentFoo: 'valid', nested: { nestedFoo: 123 } } as unknown as ParentClass)
    ).rejects.toMatchError(
      new HttpException({ errors: ['nestedFoo must be a string'] }, HttpStatus.BAD_REQUEST, {
        cause: [parentError]
      })
    )

    plainToInstanceSpy.mockRestore()
  })
})
