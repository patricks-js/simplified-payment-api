export type Either<F, S> = Failure<F, S> | Success<F, S>

export class Failure<F, S> {
  readonly value: F

  constructor (value: F) {
    this.value = value
  }

  isFailure (): this is Failure<F, S> {
    return true
  }

  isSuccess (): this is Success<F, S> {
    return false
  }
}

export class Success<F, S> {
  readonly value: S

  constructor (value: S) {
    this.value = value
  }

  isSuccess (): this is Success<F, S> {
    return true
  }

  isFailure (): this is Failure<F, S> {
    return false
  }
}

export function failure<F, S> (failure: F): Either<F, S> {
  return new Failure<F, S>(failure)
}

export function success<F, S> (success: S): Either<F, S> {
  return new Success<F, S>(success)
}
