import { StyleSheet, Text, View } from "react-native"
import HomeBar from "../components/HomeBar"
import HomeContent from "../components/HomeContent"

export default function HomeScreen() {

    return (
        <View style={styles.container}>
            <HomeContent />
            <HomeBar />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#efefef'
    }
})