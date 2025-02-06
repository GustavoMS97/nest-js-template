import { ValidationError } from 'class-validator'

import isValidationErrorArray from '@app/modules/helpers/check-validation-error-array.helper'

describe('isValidationErrorArray', () => {
  it('should return true when an array of validationError is sent as an error', () => {
    expect(isValidationErrorArray([new ValidationError()])).toEqual(true)
  })

  it('should return false when an array of generic Error is sent as an error', () => {
    expect(isValidationErrorArray([new Error()])).toEqual(false)
  })

  it('should return false when an array of generic Error and ValidationError is sent as an error', () => {
    expect(isValidationErrorArray([new Error(), new ValidationError()])).toEqual(false)
  })
})
