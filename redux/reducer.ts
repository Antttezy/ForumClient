import { IReducerAction } from "./actions"


export interface IState {
    isTokenLoaded: boolean,
    isAuthenticated: boolean,
    accessToken: string | undefined
}

const defaultState: IState = {
    isTokenLoaded: false,
    isAuthenticated: false,
    accessToken: undefined
}

export function reducer(state: IState = defaultState, action: IReducerAction<any>): IState {

    switch (action.type) {

        case 'clearToken':
            return {
                ...state,
                accessToken: undefined,
                isAuthenticated: false,
                isTokenLoaded: true
            }

        case 'setToken':
            return {
                ...state,
                accessToken: action.payload,
                isAuthenticated: true,
                isTokenLoaded: true
            }

        default:
            return state
    }
}