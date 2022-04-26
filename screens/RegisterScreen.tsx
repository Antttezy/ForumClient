import { createMaterialTopTabNavigator, MaterialTopTabNavigationOptions } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { RegisterTabsProps } from "../navigation/register";
import LoginInput from "../components/LoginInput";
import RegisterInputScreen from "../components/RegisterInput";


const Tabs = createMaterialTopTabNavigator<RegisterTabsProps>()

export default function RegisterScreen() {
    return (
        <View style={styles.container}>
            <NavigationContainer>
                {/*@ts-ignore:next-line*/}
                <Tabs.Navigator
                    initialRouteName="Login"
                    tabBarPosition="bottom"
                    backBehavior="none"
                    screenOptions={navOptions}>
                    <Tabs.Screen name='Login' component={LoginInput} options={navChildOptions} />
                    <Tabs.Screen name='Register' component={RegisterInputScreen} options={navChildOptions} />
                </Tabs.Navigator>
            </NavigationContainer>
        </View>
    )
}

const navOptions: MaterialTopTabNavigationOptions = {
    swipeEnabled: true,
    tabBarShowIcon: false
}

const navChildOptions: MaterialTopTabNavigationOptions = {
    tabBarActiveTintColor: '#0084ff',
    tabBarInactiveTintColor: '#a8e4ff',
    tabBarIndicator: () => null
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