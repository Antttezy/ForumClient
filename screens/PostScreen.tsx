import { NativeStackScreenProps } from "@react-navigation/native-stack/lib/typescript/src/types"
import axios from "axios"
import { useEffect, useMemo, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import PostDetails from "../components/PostDetails"
import { API_URL } from "../const/api"
import { ForumPost, ForumPostResult } from "../lib/post"
import { isSuccess } from "../lib/result"
import { PostsBarProps } from "../navigation/posts"
import { useRedux } from "../redux/store"

export default function PostScreen({ route }: NativeStackScreenProps<PostsBarProps, 'Post'>) {

    const [post, setPost] = useState<ForumPost | undefined>()
    const [postLoading, setPostLoading] = useState(true)
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

        fetchPost(route.params.postId)

    }, [route.params.postId, state.accessToken])

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
        <View style={styles.container}>
            <PostDetails post={post} />
        </View>
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