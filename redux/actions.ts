export interface IReducerAction<T> {
    type: string,
    payload: T
}


export function setAccessToken(token: string | undefined): IReducerAction<string | undefined> {

    if (!token)
        return {
            type: 'clearToken',
            payload: undefined
        }

    return {
        type: 'setToken',
        payload: token
    }
}