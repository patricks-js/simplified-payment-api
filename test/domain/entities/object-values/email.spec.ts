import { Email } from '@/domain/entities/object-values/email'
import { InvalidEmailError } from '@/domain/errors/invalid-email-error'
import { describe, expect, it } from 'vitest'

describe('Email creation', () => {
  it('should create email', () => {
    const validEmail = 'email@example.com'
    const emailOrError = Email.make(validEmail)

    expect(emailOrError.isSuccess).toBeTruthy()
    expect(emailOrError.value).toBeInstanceOf(Email)
  })

  it('should return an error if email provided is invalid', () => {
    const invalidEmail = '@example.com'
    const emailOrError = Email.make(invalidEmail)

    expect(emailOrError.isFailure).toBeTruthy()
    expect(emailOrError.value).toBeInstanceOf(InvalidEmailError)
  })

  it('should not accept an email without at symbol (@)', () => {
    const email = 'invalid_email.com'

    expect(Email.validator(email)).toBeFalsy()
  })

  it('should not accept an email with account part length more than 64 chars', () => {
    const account = 'a'.repeat(65)
    const email = `${account}@example.com`

    expect(Email.validator(email)).toBeFalsy()
  })

  it('should not accept an email with domain part length more than 255 chars', () => {
    const domain = 'a'.repeat(256)
    const email = `email@${domain}.com`

    expect(Email.validator(email)).toBeFalsy()
  })

  it('should not accept an email without the account part', () => {
    const email = '@example.com'

    expect(Email.validator(email)).toBeFalsy()
  })

  it('should not accept an email without the domain part', () => {
    const email = 'email@'

    expect(Email.validator(email)).toBeFalsy()
  })

  it('should not accept dot as first char in domain part', () => {
    const email = 'email@.example.com'

    expect(Email.validator(email)).toBeFalsy()
  })

  it('should not accept dot as last char in domain part', () => {
    const email = 'email@example.com.'

    expect(Email.validator(email)).toBeFalsy()
  })

  it('should not accept dot as first char in account part', () => {
    const email = '.email@example.com'

    expect(Email.validator(email)).toBeFalsy()
  })

  it('should not accept dot as last char in account part', () => {
    const email = 'email.@example.com'

    expect(Email.validator(email)).toBeFalsy()
  })
})
