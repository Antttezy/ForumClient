import { useEffect, useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
    enabled: boolean,
    onLogout: () => void
}

export default function UserContextMenu({ enabled, onLogout }: Props) {

    function logout() {
        if (enabled)
            onLogout()
    }

    return (
        <View style={{ ...styles.wrapper, opacity: enabled ? 1 : 0 }}>
            <Pressable onPress={() => logout()}>
                <Text style={styles.text}>Logout</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({

    wrapper: {
        position: 'relative',
        flex: 0.6,
        backgroundColor: '#fff',
        height: 50,
        marginLeft: 10,
        borderRadius: 10,
        elevation: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 20,
        color: '#3f3f3f'
    }
})