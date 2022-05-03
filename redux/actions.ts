import axios from "axios";
import { API_URL } from "../const/api";
import { LoginResult } from "../lib/auth";
import { ForumUser, ForumUserResult } from "../lib/forumUser";
import { LikeResult } from "../lib/like";
import { ForumPost, ForumPostResult, PostListResult } from "../lib/post";
import { RegisterResult } from "../lib/register";
import { isSuccess } from "../lib/result";

export interface IReducerAction<T> {
    type: string,
    payload: T
}

export function isAction<T>(obj: any): obj is IReducerAction<T> {

    if (!obj)
        return false

    return Object.entries(obj).some(e => e[0] === 'type') && Object.entries(obj).some(e => e[0] === 'payload')
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

export async function registerAction(username: string, email: string, password: string): Promise<IReducerAction<ForumUser> | string> {

    try {

        console.log(API_URL)
        const response = await axios.post<RegisterResult>(`${API_URL}/user/register`, {
            nickname: username,
            email,
            password
        })

        const result = response.data

        if (!isSuccess(result)) {
            return result.error
        }

        return {
            type: 'setUser',
            payload: result.result
        }

    } catch (e) {
        console.error(JSON.stringify(e))
        return "Unexpected error in register";
    }
}

export async function loginAction(username: string, password: string): Promise<IReducerAction<string> | string> {

    try {

        const response = await axios.post<LoginResult>(`${API_URL}/auth/login`, {
            username,
            password
        })

        const result = response.data

        if (!isSuccess(result)) {
            return result.error
        }

        return {
            type: 'setToken',
            payload: result.result
        }

    } catch (e) {
        return 'Unexpected error in login'
    }
}

export async function loadUserAction(accessToken: string): Promise<IReducerAction<ForumUser> | undefined> {
    try {

        const response = await axios.get<ForumUserResult>(`${API_URL}/user/me`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })

        const result = response.data

        if (!isSuccess(result)) {
            return;
        }

        return {
            type: 'setUser',
            payload: result.result
        }

    } catch (e) {
        return;
    }
}

export function clearUserAction(): IReducerAction<undefined> {
    return {
        type: 'clearUser',
        payload: undefined
    }
}

export async function fetchPostsAction(start: number, length: number, before: number, accessToken: string): Promise<IReducerAction<ForumPost[]>> {

    try {

        const resp = await axios.get<PostListResult>(`${API_URL}/posts/list?start=${start}&length=${length}&before=${before}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })

        const result = resp.data
        console.log(result)

        return {
            type: 'fetchPosts',
            payload: result
        }

    } catch (e) {
        return {
            type: 'fetchPosts',
            payload: []
        }
    }
}

export async function likePostAction(postId: number, accessToken: string): Promise<IReducerAction<number> | string> {

    console.log('Like post')
    console.log(accessToken)
    try {

        const resp = await axios.post<LikeResult>(`${API_URL}/likes/likePost?id=${postId}`, undefined, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })

        const result = resp.data

        if (!isSuccess(result)) {
            return result.error
        }

        return {
            type: 'likePost',
            payload: postId
        }

    } catch (e) {
        console.error(JSON.stringify(e))
        return 'Unexpected error'
    }
}

export async function likePostRetractAction(postId: number, accessToken: string): Promise<IReducerAction<number> | string> {
    console.log('No like post')

    try {

        const resp = await axios.post<LikeResult>(`${API_URL}/likes/likePostRetract?id=${postId}`, undefined, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })

        const result = resp.data

        if (!isSuccess(result)) {
            return result.error
        }

        return {
            type: 'likePostRetract',
            payload: postId
        }

    } catch (e) {
        console.error(JSON.stringify(e))
        return 'Unexpected error'
    }
}

export async function addPostAction(description: string, text: string, accessToken: string): Promise<IReducerAction<ForumPost> | string> {

    try {

        const resp = await axios.post<ForumPostResult>(`${API_URL}/posts/create`, {
            text,
            description
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })

        const post = resp.data

        if (!isSuccess(post)) {
            return post.error
        }

        return {
            type: 'createPost',
            payload: {
                ...post.result,
                liked: false,
                likes: 0
            }
        }

    } catch (e) {
        console.error(JSON.stringify(e))
        return 'Unexpected error'
    }
}