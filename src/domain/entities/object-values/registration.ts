import { failure, success, type Either } from '@/utils/either'

export class Registration {
  readonly #registration: string

  private constructor (registration: string) {
    this.#registration = registration
  }

  static make (registration: string): Either<Error, Registration> {
    if (!Registration.validator(registration)) return failure(new Error('Invalid CPF or CNPJ'))

    return success(new Registration(registration))
  }

  static validator (registration: string): boolean {
    const test = /^(?:\d{3}\.\d{3}\.\d{3}-\d{2}|\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2})$/

    if (!test.test(registration)) return false

    return true
  }
}
