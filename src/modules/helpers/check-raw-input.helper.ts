import { HttpException, HttpStatus } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { validateOrReject, ValidationError } from 'class-validator'

import isValidationErrorArray from '@app/modules/helpers/check-validation-error-array.helper'

export default async function checkRawInput<T extends object>(clss: new () => T, rawInput: T): Promise<T> {
  try {
    const input = plainToInstance(clss, rawInput, { enableImplicitConversion: true })
    await validateOrReject(input, { whitelist: true })
    return input
  } catch (error: unknown) {
    if (isValidationErrorArray(error)) {
      const extractConstraints = (validationError: ValidationError): string[] => {
        const constraints = Object.values(validationError.constraints ?? {})
        const childrenConstraints = validationError.children
          ? validationError.children.flatMap((child: ValidationError) => extractConstraints(child))
          : []
        return [...constraints, ...childrenConstraints]
      }

      const errors = error.flatMap((item) => extractConstraints(item))

      throw new HttpException({ errors }, HttpStatus.BAD_REQUEST, {
        cause: error
      })
    }

    throw new Error(`Unknown error during validation: ${JSON.stringify(error, Object.getOwnPropertyNames(error))}`)
  }
}
