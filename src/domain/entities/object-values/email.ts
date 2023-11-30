import { InvalidEmailError } from '@/domain/errors/invalid-email-error'
import { failure, success, type Either } from '@/utils/either'

export class Email {
  readonly #email: string

  private constructor (email: string) {
    this.#email = email
  }

  static make (email: string): Either<InvalidEmailError, Email> {
    if (!Email.validator(email)) {
      return failure(new InvalidEmailError(email))
    }

    return success(new Email(email))
  }

  get email (): string {
    return this.#email
  }

  static validator (email: string): boolean {
    const [accountPart, domainPart] = email.split('@')
    const test = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/

    if (!test.test(email)) return false

    if (!email.includes('@')) return false

    if (accountPart.length > 64) return false

    if (domainPart.length > 255) return false

    if (accountPart.split('.')[0] === '') return false

    if (accountPart[accountPart.length - 1] === '.') return false

    return true
  }
}
