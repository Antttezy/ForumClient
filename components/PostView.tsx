import { NativeStackNavigatorProps, NativeStackScreenProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import Toast from "react-native-root-toast";
import { useDispatch } from "react-redux";
import { PostsBarProps } from "../navigation/posts";
import { isAction, likePostAction, likePostRetractAction } from "../redux/actions";
import { AppDispatch, useRedux } from "../redux/store";

type Props = {
    postId: number
}

export default function PostView({ postId, navigation }: Props & NativeStackScreenProps<PostsBarProps, 'List'>) {

    const state = useRedux()
    const post = state.posts.find(p => p.id === postId)
    const dispatch = useDispatch<AppDispatch>()

    async function likePress() {
        if (!post)
            return

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

            dispatch(action)

        } catch (e) {

        }
    }

    function postPress() {
        navigation.navigate('Post', {
            postId: post!.id
        })
    }

    if (!post)
        return null

    return (
        <Pressable style={styles.container} onPress={_ => postPress()}>
            <View style={styles.summary}>
                <Text style={styles.author}>{post.author}</Text>
                <Text style={styles.description}>{post.description}</Text>
            </View>
            <View style={styles.likesContainer}>
                <Pressable style={styles.likeImage} onPress={likePress}>
                    {/* @ts-ignore*/}
                    <Image style={styles.likeImage} width={50} height={50} source={post.liked ? require('../assets/upvote-on.png') : require('../assets/upvote-off.png')} />
                </Pressable>
                <Text>{post.likes}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
        borderRadius: 10,
        elevation: 10,
        backgroundColor: 'white',
        padding: 10,
        minHeight: 90,
        flexDirection: 'row'
    },
    summary: {
        flexGrow: 1
    },
    author: {
        color: '#787878',
        fontSize: 14
    },
    description: {
        color: '#333',
        fontSize: 18
    },
    likesContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
    },
    likeImage: {
        width: 50,
        height: 50,
        backgroundColor: '#00000000'
    }
})