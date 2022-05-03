import { Image, Pressable, StyleSheet, Text, View } from "react-native"
import Markdown from "react-native-markdown-display"
import Toast from "react-native-root-toast"
import { useDispatch } from "react-redux"
import { ForumPost } from "../lib/post"
import { isAction, likePostAction, likePostRetractAction } from "../redux/actions"
import { AppDispatch, useRedux } from "../redux/store"


type Props = {
    post: ForumPost
}

export default function PostDetails({ post }: Props) {

    const date = new Date(Date.parse(post.createdAt))
    const state = useRedux()
    const dispatch = useDispatch<AppDispatch>()

    async function likePress() {
        try {
            const action = !post.liked ?
                await likePostAction(post.id, state.accessToken ?? '') :
                await likePostRetractAction(post.id, state.accessToken ?? '')

            console.log(action)

            if (!isAction(action)) {
                Toast.show(action, {
                    position: Toast.positions.BOTTOM,
                    duration: Toast.durations.LONG
                })

                return
            }

            if (post.liked) {
                post.liked = false;
                post.likes -= 1;
            } else {
                post.liked = true;
                post.likes += 1;
            }

            dispatch(action)

        } catch (e) {

        }
    }

    return (
        <View style={styles.wrapper}>
            <View style={styles.authorInfo}>
                <Text style={styles.infoText}>{post.author}</Text>
                <Text style={styles.infoText}>{date.toDateString()}</Text>
            </View>
            <Text style={styles.header}>{post.description}</Text>
            {/*@ts-ignore */}
            <Markdown>
                {post.text}
            </Markdown>
            <View style={styles.likeContainer}>
                <Pressable onPress={likePress}>
                    <Image style={styles.likeImage} width={30} height={30} source={post.liked ? require('../assets/upvote-on.png') : require('../assets/upvote-off.png')} />
                </Pressable>
                <Text style={styles.infoText}>{post.likes}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'column',
        width: '100%',
        borderRadius: 5,
        backgroundColor: '#fff',
        elevation: 10,
        padding: 10,
        marginBottom: 10
    },
    header: {
        fontSize: 20,
        textAlign: 'center'
    },
    authorInfo: {
        flexDirection: "row",
        justifyContent: 'flex-end'
    },
    infoText: {
        color: '#787878',
        marginHorizontal: 5
    },
    likeContainer: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center'
    },
    likeImage: {
        width: 30,
        height: 30
    }
})