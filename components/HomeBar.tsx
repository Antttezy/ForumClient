import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { clearUserAction, setAccessToken } from "../redux/actions";
import { AppDispatch, useRedux } from "../redux/store";
import UserContextMenu from "./UserContextMenu";

export default function HomeBar() {

    const [contextVisible, setContextVisible] = useState(false)
    const state = useRedux()
    const dispatch = useDispatch<AppDispatch>()

    function logout() {
        try {
            console.log('logout')
            dispatch(clearUserAction())
            dispatch(setAccessToken(undefined))
        } catch (e) {

        }
    }

    return (
        <View style={styles.container}>
            {state.user ?
                <>
                    <Pressable style={styles.roundLetterWrapper} onPress={() => setContextVisible(c => !c)}>
                        <Text style={styles.roundLetter}>{state.user.nickname[0]}</Text>
                    </Pressable>
                    <UserContextMenu enabled={contextVisible} onLogout={() => logout()} />
                </>
                : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 75,
        flexDirection: 'row',
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'absolute',
        bottom: 0
    },
    roundLetterWrapper: {
        backgroundColor: '#343434',
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
        padding: 0,
        margin: 0,
        borderRadius: 30
    },
    roundLetter: {
        fontSize: 48,
        padding: 0,
        margin: 0,
        top: -7,
        color: '#fff'
    }
})