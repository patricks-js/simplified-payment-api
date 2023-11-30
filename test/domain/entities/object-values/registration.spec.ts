import { Registration } from '@/domain/entities/object-values/registration'
import { describe, expect, it } from 'vitest'

describe('Register creation', () => {
  it('should create register with CPF format', () => {
    const registrationCPF = '123.456.789-56'

    const registerOrError = Registration.make(registrationCPF)

    expect(registerOrError.isSuccess()).toBeTruthy()
    expect(registerOrError.value).toBeInstanceOf(Registration)
  })

  it('should create register with CNPJ format', () => {
    const registrationCNPJ = '23.456.789/0001-56'

    const registerOrError = Registration.make(registrationCNPJ)

    expect(registerOrError.isSuccess()).toBeTruthy()
    expect(registerOrError.value).toBeInstanceOf(Registration)
  })

  it('should not accept an registration with invalid format', () => {
    const invalidRegistration = '123456789'

    expect(Registration.validator(invalidRegistration)).toBeFalsy()
  })
})
