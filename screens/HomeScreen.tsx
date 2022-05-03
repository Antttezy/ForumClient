import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackNavigationOptions, NativeStackScreenProps } from "@react-navigation/native-stack"
import { StyleSheet, Text, View } from "react-native"
import AddPostButton from "../components/AddPostButton"
import HomeBar from "../components/HomeBar"
import HomeContent from "../components/HomeContent"
import { PostsBarProps } from "../navigation/posts"
import AddPostScreen from "./AddPostScreen"
import PostScreen from "./PostScreen"

const Stack = createNativeStackNavigator<PostsBarProps>()

export default function HomeScreen() {

    return (
        <View style={styles.container}>
            <NavigationContainer>
                {/*@ts-ignore*/}
                <Stack.Navigator
                    initialRouteName="List">
                    <Stack.Screen name="List" component={PostList} options={listOptions} />
                    <Stack.Screen name="Post" component={PostScreen} options={postOptions} />
                    <Stack.Screen name="AddPost" component={AddPostScreen} options={newPostOptions} />
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    )


}

function PostList({ navigation, route }: NativeStackScreenProps<PostsBarProps, 'List'>) {
    return (
        <>
            <HomeContent navigation={navigation} route={route} />
            <AddPostButton navigation={navigation} route={route} />
            <HomeBar />
        </>
    )
}

const listOptions: NativeStackNavigationOptions = {
    header: () => null
}

const postOptions: NativeStackNavigationOptions = {
    headerBackground: () => <View style={{ backgroundColor: '#efefef' }}></View>,
    headerTitle: 'Post'
}

const newPostOptions: NativeStackNavigationOptions = {
    headerBackground: () => <View style={{ backgroundColor: '#efefef' }}></View>,
    headerTitle: 'New Post'
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