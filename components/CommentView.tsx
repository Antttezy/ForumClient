import { useMemo } from "react"
import { Image, Pressable, StyleSheet, Text, View } from "react-native"
import Markdown from "react-native-markdown-display"
import Toast from "react-native-root-toast"
import { likeComment, likeCommentRetract, PostComment } from "../lib/comment"
import { useRedux } from "../redux/store"

type Props = {
    comment: PostComment,
    commentUpdated: (comment: PostComment) => void
}

export default function CommentView({ comment, commentUpdated }: Props) {

    const date = new Date(Date.parse(comment.createdAt))
    const state = useRedux()

    async function likePress() {

        if (!state.accessToken) {
            return;
        }

        const success = !comment.liked ?
            await likeComment(comment.id, state.accessToken) :
            await likeCommentRetract(comment.id, state.accessToken)

        if (!success) {
            Toast.show('An error occured', {
                position: Toast.positions.BOTTOM,
                duration: Toast.durations.LONG
            })

            return
        }

        if (comment.liked) {
            comment.liked = false;
            comment.likes -= 1;

        } else {
            comment.liked = true;
            comment.likes += 1;
        }

        commentUpdated(comment)
    }

    return (
        <View style={styles.wrapper}>
            <View style={styles.authorInfo}>
                <Text style={styles.infoText}>{comment.author}</Text>
                <Text style={styles.infoText}>{date.toDateString()}</Text>
            </View>
            {/*@ts-ignore */}
            <Markdown>
                {comment.text}
            </Markdown>
            <View style={styles.likeContainer}>
                <Pressable onPress={likePress}>
                    <Image style={styles.likeImage} width={30} height={30} source={comment.liked ? require('../assets/upvote-on.png') : require('../assets/upvote-off.png')} />
                </Pressable>
                <Text style={styles.infoText}>{comment.likes}</Text>
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
        padding: 10
    },
    authorInfo: {
        flexDirection: "row",
        justifyContent: 'flex-start'
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