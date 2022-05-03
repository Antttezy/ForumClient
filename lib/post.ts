import { Result } from "./result"

export type ForumPost = {
    id: number,
    description: string,
    text: string | undefined,
    createdAt: string,
    likes: number,
    liked: boolean,
    author: string
}

export type ForumPostResult = Result<ForumPost, string>
export type PostListResult = ForumPost[]