export type SuccessResult<T> = {
    result: T
}

export type ErrorResult<T> = {
    error: T
}

export type Result<T, E> = SuccessResult<T> | ErrorResult<E>

export function isSuccess<T, E>(result: Result<T, E>): result is SuccessResult<T> {

    return Object.entries(result).some(e => e[0] == 'result')
}