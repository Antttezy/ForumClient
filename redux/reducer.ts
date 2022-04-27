import { ForumUser } from "../lib/forumUser"
import { IReducerAction } from "./actions"


export interface IState {
    isTokenLoaded: boolean,
    isAuthenticated: boolean,
    accessToken: string | undefined,
    user: ForumUser | undefined,
    userLoaded: boolean
}

const defaultState: IState = {
    isTokenLoaded: false,
    isAuthenticated: false,
    accessToken: undefined,
    user: undefined,
    userLoaded: false
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

        case 'clearUser':
            return {
                ...state,
                user: undefined,
                userLoaded: true
            }

        case 'setUser':
            return {
                ...state,
                user: action.payload,
                userLoaded: true
            }

        default:
            return state
    }
}