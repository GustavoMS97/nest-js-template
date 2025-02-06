import { ValidationError } from 'class-validator'

export default function isValidationErrorArray(error: unknown): error is ValidationError[] {
  return Array.isArray(error) && error.every((item) => item instanceof ValidationError)
}
