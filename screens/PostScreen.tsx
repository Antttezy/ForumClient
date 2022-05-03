import { NativeStackScreenProps } from "@react-navigation/native-stack/lib/typescript/src/types"
import axios from "axios"
import { useEffect, useMemo, useState } from "react"
import { ScrollView, StyleSheet, Text, View } from "react-native"
import CommentView from "../components/CommentView"
import PostDetails from "../components/PostDetails"
import { API_URL } from "../const/api"
import { PostComment, PostCommentList } from "../lib/comment"
import { ForumPost, ForumPostResult } from "../lib/post"
import { isSuccess } from "../lib/result"
import { PostsBarProps } from "../navigation/posts"
import { useRedux } from "../redux/store"

export default function PostScreen({ route }: NativeStackScreenProps<PostsBarProps, 'Post'>) {

    const [post, setPost] = useState<ForumPost | undefined>()
    const [postLoading, setPostLoading] = useState(true)

    const [comments, setComments] = useState<PostCommentList>([])
    const [commLoading, setCommLoading] = useState(true)

    const state = useRedux()

    useEffect(() => {

        async function fetchPost(postId: number) {

            try {
                setPostLoading(true)
                const result = await axios.get<ForumPostResult>(`${API_URL}/posts/details/${postId}`, {
                    headers: {
                        'Authorization': `Bearer ${state.accessToken}`
                    }
                })
                const post = result.data

                if (isSuccess(post)) {
                    setPost(post.result)
                }

                setPostLoading(false)

            } catch (e) {
                setPostLoading(false)
            }
        }

        async function fetchComments(postId: number) {

            try {
                setCommLoading(true)
                const result = await axios.get<PostCommentList>(`${API_URL}/posts/${postId}/comments?start=1&length=20`, {
                    headers: {
                        'Authorization': `Bearer ${state.accessToken}`
                    }
                })

                setComments(result.data)
                setCommLoading(false)

            } catch (e) {
                console.error(JSON.stringify(e))
                setCommLoading(false)
            }
        }

        fetchPost(route.params.postId)
        fetchComments(route.params.postId)

    }, [route.params.postId, state.accessToken])

    function updateComment(comment: PostComment) {
        setComments(comms => comms.map(c => {

            if (c.id !== comment.id) {
                return c
            }

            return comment
        }))
    }

    if (postLoading) {
        return (
            <View style={styles.centerer}>
                <Text>Loading</Text>
            </View>
        )
    }

    if (!post) {
        return (
            <View style={styles.centerer}>
                <Text>An Error occured while loading post</Text>
            </View>
        )
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <PostDetails post={post} />
            {commLoading ?
                <View style={styles.centerer}>
                    <Text>Loading comments</Text>
                </View> :
                comments.map(c => <CommentView key={c.id} comment={c} commentUpdated={updateComment} />)
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#efefef',
        padding: 5
    },
    centerer: {
        flex: 1,
        backgroundColor: '#efefef',
        alignItems: 'center',
        justifyContent: 'center'
    }
})