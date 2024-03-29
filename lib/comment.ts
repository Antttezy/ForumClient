import axios from "axios"
import { API_URL } from "../const/api"
import { isSuccess, Result } from "./result"

export type PostComment = {
    id: number,
    text: string,
    createdAt: string,
    likes: number,
    liked: boolean,
    author: string
}

export type AddCommentResult = Result<PostComment, string>

export type PostCommentList = PostComment[]

export type LikeCommentResult = Result<string, string>

export async function likeComment(commentId: number, accessToken: string): Promise<boolean> {

    try {

        const result = await axios.post<LikeCommentResult>(`${API_URL}/likes/likeComment?id=${commentId}`, undefined, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })

        return isSuccess(result.data)

    } catch (e) {
        return false
    }
}

export async function likeCommentRetract(commentId: number, accessToken: string): Promise<boolean> {

    try {

        const result = await axios.post<LikeCommentResult>(`${API_URL}/likes/likeCommentRetract?id=${commentId}`, undefined, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })

        return isSuccess(result.data)

    } catch (e) {
        return false
    }
}

export async function addComment(commentText: string, postId: number, accessToken: string): Promise<PostComment | string> {

    try {

        const response = await axios.post<AddCommentResult>(`${API_URL}/posts/${postId}/comments/create`, {
            text: commentText
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })

        if (!isSuccess(response.data)) {
            return response.data.error
        }

        return response.data.result

    } catch (e) {
        console.error(e)
        return 'Unexpected error';
    }
}
