import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { useState } from "react"
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import Toast from "react-native-root-toast"
import { useDispatch } from "react-redux"
import { PostsBarProps } from "../navigation/posts"
import { addPostAction, isAction } from "../redux/actions"
import { AppDispatch, useRedux } from "../redux/store"

export default function AddPostScreen({ navigation }: NativeStackScreenProps<PostsBarProps, 'AddPost'>) {

    const [description, setDescription] = useState('')
    const [text, setText] = useState('')
    const state = useRedux()
    const dispatch = useDispatch<AppDispatch>()

    async function submitPress() {

        if (description === '' || text === '') {
            Toast.show('Fill every field', {
                position: Toast.positions.BOTTOM,
                duration: Toast.durations.LONG
            })

            return
        }

        const action = await addPostAction(description, text, state.accessToken!)

        if (!isAction(action)) {
            Toast.show(action, {
                position: Toast.positions.BOTTOM,
                duration: Toast.durations.LONG
            })

            return
        }

        dispatch(action)
        navigation.navigate('List')
    }

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Description"
                style={styles.input}
                numberOfLines={1}
                value={description}
                onChangeText={t => setDescription(t)} />
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
        backgroundColor: '#efefef'
    },
    input: {
        backgroundColor: '#fff',
        height: 50,
        marginBottom: 10,
        padding: 5
    },
    inputHigh: {
        backgroundColor: '#fff',
        flex: 1,
        textAlignVertical: "top",
        padding: 5
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