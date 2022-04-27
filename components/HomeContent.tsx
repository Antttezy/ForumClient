import { StyleSheet, Text, View } from "react-native";
import { useRedux } from "../redux/store";

export default function HomeContent() {
    const state = useRedux()

    if (!state.userLoaded || !state.user) {
        return (
            <View style={styles.wrapper}><Text>Loading ...</Text></View>
        )
    }

    return (
        <View style={styles.wrapper}>
            <View>
                <Text>Welcome {state.user.nickname}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})