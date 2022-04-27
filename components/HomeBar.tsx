import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRedux } from "../redux/store";

export default function HomeBar() {

    const state = useRedux()

    return (
        <View style={styles.container}>
            {state.user ? 
            <Pressable style={styles.roundLetterWrapper}>
                <Text style={styles.roundLetter}>{state.user.nickname[0]}</Text>
            </Pressable>
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
        justifyContent: 'flex-start'
    },
    roundLetterWrapper: {
        backgroundColor: '#6063f7',
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