import { Image, StyleSheet, Text, View } from "react-native";

export default function BannerScreen() {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/forum_banner.png')} style={styles.image} />
            <Text style={styles.text}>IT Help</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    image: {
        width: '10%',
        height: '10%',
        resizeMode: 'contain',
        margin: 0,
        padding: 0
    },
    text: {
        fontSize: 18,
        margin: 0,
        padding: 0
    }
})