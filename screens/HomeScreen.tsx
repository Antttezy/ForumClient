import { StyleSheet, Text, View } from "react-native"
import { useRedux } from "../redux/store"

export default function HomeScreen() {
    const state = useRedux()

    if (!state.userLoaded || !state.user) {
        return (
            <View style={styles.container}><Text>Loading ...</Text></View>
        )
    }

    return (
        <View style={styles.container}>
            <Text>Welcome {state.user.nickname}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#efefef'
    }
})