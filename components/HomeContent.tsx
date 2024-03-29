import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { PostsBarProps } from "../navigation/posts";
import { fetchPostsAction } from "../redux/actions";
import { AppDispatch, useRedux } from "../redux/store";
import PostView from "./PostView";

export default function HomeContent({ navigation, route }: NativeStackScreenProps<PostsBarProps, 'List'>) {
    const state = useRedux()
    const dispatch = useDispatch<AppDispatch>()
    const [start, setStart] = useState(1)
    const length = 20
    const [before] = useState(Math.floor(Date.now() / 1000))

    useEffect(() => {

        async function loadPosts(start: number, length: number, before: number, accessToken: string) {

            try {

                console.log('invoke fetch')
                const action = await fetchPostsAction(start, length, before, accessToken)
                dispatch(action)

            } catch (e) {

            }
        }

        if (state.accessToken) {
            loadPosts(start, length, before, state.accessToken)
        }


    }, [start, length, before, state.accessToken])

    if (!state.userLoaded || !state.user) {
        return (
            <View style={styles.wrapper}><Text>Loading ...</Text></View>
        )
    }

    if (!state.postsLoaded)
        return (
            <View style={styles.wrapper}>
                <Text>Loading ...</Text>
            </View>
        )

    return (
        <View style={styles.wrapper}>
            <ScrollView style={styles.postsScroll} contentContainerStyle={{ alignItems: 'center', padding: 5}}>
                {state.posts.map(post => <PostView key={post.id} postId={post.id} navigation={navigation} route={route} />)}
                <Pressable style={styles.loadMoreBtn} onPress={_ => setStart(s => s + length)}>
                    <Text style={styles.loadMoreText}>Load More</Text>
                </Pressable>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        marginBottom: 75,
        flexDirection: 'column',
        backgroundColor: '#efefef'
    },
    postsScroll: {
        flexDirection: 'column'
    },
    loadMoreBtn: {
        height :50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loadMoreText: {
        color: '#4596ff'
    }
})