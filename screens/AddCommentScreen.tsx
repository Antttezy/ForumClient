import { NativeStackScreenProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Toast from "react-native-root-toast";
import { addComment, PostComment } from "../lib/comment";
import { PostsBarProps } from "../navigation/posts";
import { useRedux } from "../redux/store";

export default function AddCommentScreen({ navigation, route }: NativeStackScreenProps<PostsBarProps, 'AddComment'>) {

    const [text, setText] = useState('')
    const state = useRedux()

    function isComment(o: any): o is PostComment {

        return !!o && Object.entries(o).some(e => e[0] === 'text')
    }

    async function submitPress() {
        if (text === '') {
            Toast.show('Fill text field', {
                position: Toast.positions.BOTTOM,
                duration: Toast.durations.LONG
            })

            return
        }

        const result = await addComment(text, route.params.postId, state.accessToken!)

        if (!isComment(result)) {
            Toast.show(result, {
                position: Toast.positions.BOTTOM,
                duration: Toast.durations.LONG
            })

            return
        }

        navigation.navigate('List')
    }

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Full Text (Markdown)"
                style={styles.inputHigh}
                multiline={true}
                numberOfLines={1}
                value={text}
                onChangeText={t => setText(t)} />
            <Pressable style={styles.press} onPress={submitPress}>
                <Text style={styles.pressText}>&#10003;</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#efefef',
        padding: 5
    },
    inputHigh: {
        backgroundColor: '#fff',
        flex: 1,
        textAlignVertical: "top",
        padding: 5,
        marginBottom: 100,
        borderRadius: 5
    },
    press: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#343434',
        borderRadius: 75,
        width: 75,
        height: 75,
        bottom: 10,
        right: 10,
        elevation: 15,
        overflow: 'visible'
    },
    pressText: {
        color: '#fff',
        fontSize: 40,
        top: -5,
        overflow: 'visible'
    }
})