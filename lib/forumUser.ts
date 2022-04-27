import { Result } from "./result"

export type ForumUser = {
    nickname: string,
    email: string,
    password: string | undefined
}

export type ForumUserResult = Result<ForumUser, string>