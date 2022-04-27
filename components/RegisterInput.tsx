import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Toast from "react-native-root-toast";
import { useDispatch } from "react-redux";
import { ForumUser } from "../lib/forumUser";
import { isAction, loginAction, registerAction } from "../redux/actions";
import { AppDispatch } from "../redux/store";

export default function RegisterInput() {
    const [usernameActive, setUsernameActive] = useState(false)
    const [emailActive, setEmailActive] = useState(false)
    const [passwordActive, setPasswordActive] = useState(false)
    const [repeatActive, setRepeatActive] = useState(false)
    const [registerDisabled, setRegisterDisabled] = useState(false)

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeat, setRepeat] = useState('')

    const usernameStyle = usernameActive ? { ...styles.input, ...styles.inputActive } : styles.input
    const emailStyle = emailActive ? { ...styles.input, ...styles.inputActive } : styles.input
    const passwordStyle = passwordActive ? { ...styles.input, ...styles.inputActive } : styles.input
    const repeatStyle = repeatActive ? { ...styles.input, ...styles.inputActive } : styles.input

    const dispatch = useDispatch<AppDispatch>()

    async function login(username: string, password: string) {
        try {

            const loginResult = await loginAction(username, password)

            if (isAction<string>(loginResult)) {

                dispatch(loginResult)

            } else {
                Toast.show(loginResult, {
                    position: Toast.positions.BOTTOM,
                    duration: Toast.durations.LONG
                })
            }

        } catch (e) {

        }
    }

    async function registerPress() {
        try {

            setRegisterDisabled(true)

            if (email === '' || username === '' || password.length < 8 || repeat.length < 8) {
                Toast.show('Fill all fields', {
                    position: Toast.positions.BOTTOM,
                    duration: Toast.durations.LONG
                })

                return
            }

            if (password !== repeat) {
                Toast.show('Passwords does not match', {
                    position: Toast.positions.BOTTOM,
                    duration: Toast.durations.LONG
                })

                return
            }

            const registerResult = await registerAction(username, email, password)

            if (isAction<ForumUser>(registerResult)) {

                dispatch(registerResult)
                await login(username, password)

            } else {
                Toast.show(registerResult, {
                    position: Toast.positions.BOTTOM,
                    duration: Toast.durations.LONG
                })
            }

        } catch (e) {

        } finally {
            setRegisterDisabled(false)
        }
    }

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
                    onEndEditing={() => setUsernameActive(false)}
                    value={username}
                    onChangeText={s => setUsername(s)} />

                <TextInput
                    placeholder="E-Mail"
                    keyboardType="email-address"
                    autoCompleteType="email"
                    textContentType="emailAddress"
                    style={emailStyle}
                    onFocus={() => setEmailActive(true)}
                    onEndEditing={() => setEmailActive(false)}
                    value={email}
                    onChangeText={s => setEmail(s)} />

                <TextInput
                    placeholder="Password"
                    autoCompleteType="password"
                    textContentType="password"
                    secureTextEntry={true}
                    style={passwordStyle}
                    onFocus={() => setPasswordActive(true)}
                    onEndEditing={() => setPasswordActive(false)}
                    value={password}
                    onChangeText={s => setPassword(s)} />

                <TextInput
                    placeholder="Repeat password"
                    autoCompleteType="password"
                    textContentType="password"
                    secureTextEntry={true}
                    style={repeatStyle}
                    onFocus={() => setRepeatActive(true)}
                    onEndEditing={() => setRepeatActive(false)}
                    value={repeat}
                    onChangeText={s => setRepeat(s)} />

            </View>
            <Pressable
                style={styles.button}
                onPress={registerPress}
                disabled={registerDisabled}>
                <Text style={{ color: '#efefef' }}>Register</Text>
            </Pressable>
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
    }
})