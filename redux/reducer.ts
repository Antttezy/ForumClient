import { ForumUser } from "../lib/forumUser"
import { ForumPost } from "../lib/post"
import { IReducerAction } from "./actions"


export interface IState {
    isTokenLoaded: boolean,
    isAuthenticated: boolean,
    accessToken: string | undefined,
    user: ForumUser | undefined,
    userLoaded: boolean,
    posts: ForumPost[],
    postsLoaded: boolean
}

const defaultState: IState = {
    isTokenLoaded: false,
    isAuthenticated: false,
    accessToken: undefined,
    user: undefined,
    userLoaded: false,
    posts: [],
    postsLoaded: false
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

        case 'fetchPosts':
            return {
                ...state,
                postsLoaded: true,
                posts: [...state.posts, ...action.payload]
            }

        case 'likePost':
            return {
                ...state,
                posts: [...state.posts.map(p => {
                    if (p.id !== action.payload)
                        return p

                    return {
                        ...p,
                        liked: true,
                        likes: p.likes + 1
                    }
                })]
            }

        case 'likePostRetract':
            return {
                ...state,
                posts: [...state.posts.map(p => {
                    if (p.id !== action.payload)
                        return p

                    return {
                        ...p,
                        liked: false,
                        likes: p.likes - 1
                    }
                })]
            }

        case 'createPost':
            return {
                ...state,
                posts: [action.payload, ...state.posts]
            }

        default:
            return state
    }
}