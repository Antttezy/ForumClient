import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";


export default function LoginInput({ navigation }: MaterialTopTabBarProps) {
    const [usernameActive, setUsernameActive] = useState(false)
    const [passwordActive, setPasswordActive] = useState(false)

    const usernameStyle = usernameActive ? { ...styles.input, ...styles.inputActive } : styles.input
    const passwordStyle = passwordActive ? { ...styles.input, ...styles.inputActive } : styles.input

    return (
        <View style={styles.container}>
            <View style={styles.inputWrapper}>
                <TextInput
                    placeholder="Username"
                    keyboardType="default"
                    autoCompleteType="username"
                    textContentType="username"
                    style={usernameStyle}
                    onFocus={() => setUsernameActive(true)}
                    onEndEditing={() => setUsernameActive(false)} />

                <TextInput
                    placeholder="Password"
                    autoCompleteType="password"
                    textContentType="password"
                    secureTextEntry={true}
                    style={passwordStyle}
                    onFocus={() => setPasswordActive(true)}
                    onEndEditing={() => setPasswordActive(false)} />

            </View>
            <Pressable style={styles.button}>
                <Text style={{ color: '#efefef' }}>Login</Text>
            </Pressable>
            <View style={styles.registerWrapper}>
                <Pressable style={styles.register} onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.registerText}>Not Registered?</Text>
                </Pressable>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: "#efefef"
    },
    inputWrapper: {
        marginTop: '33%',
        width: '60%'
    },
    input: {
        width: '100%',
        height: 40,
        margin: 5,
        borderColor: '#ababab',
        borderBottomWidth: 1,
        color: '#343434'
    },
    inputActive: {
        borderColor: '#343434',
        borderBottomWidth: 2
    },
    button: {
        marginTop: 20,
        backgroundColor: '#343434',
        padding: 10,
        width: '80%',
        alignItems: 'center',
        borderRadius: 5
    },
    registerWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    register: {
        margin: 20,
        padding: 5
    },
    registerText: {
        color: '#0084ff'
    }
})