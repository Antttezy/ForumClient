import { useRedux } from "./redux/store"
import BannerScreen from "./screens/BannerScreen"
import HomeScreen from "./screens/HomeScreen"
import RegisterScreen from "./screens/RegisterScreen"

export default function Main() {

    const state = useRedux()

    if (!state.isTokenLoaded) {
        return <BannerScreen />
    }

    if (!state.isAuthenticated) {
        return <RegisterScreen />
    }

    return <HomeScreen />
}