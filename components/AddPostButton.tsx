import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Pressable, StyleSheet, Text } from "react-native";
import { PostsBarProps } from "../navigation/posts";

export default function AddPostButton({ navigation }: NativeStackScreenProps<PostsBarProps, 'List'>) {

    return (
        <Pressable style={styles.press} onPress={_ => navigation.navigate('AddPost')}>
            <Text style={styles.text}>
                +
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    press: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#474cff',
        borderRadius: 75,
        width: 75,
        height: 75,
        bottom: 100,
        right: 10,
        elevation: 15,
        overflow: 'visible'
    },
    text: {
        color: '#fff',
        fontSize: 80,
        top: -20,
        overflow: 'visible'
    }
})