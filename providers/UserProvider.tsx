import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearUserAction, loadUserAction } from "../redux/actions";
import { AppDispatch, useRedux } from "../redux/store";

type Props = {
    children: ReactNode
}

export default function UserProvider({children}: Props) {

    const state = useRedux()
    const dispatch = useDispatch<AppDispatch>()


    useEffect(() => {

        async function fetchUser(accessToken: string) {
        
            const action = await loadUserAction(accessToken)

            if (action) {
                dispatch(action)
            }
        }

        if (!state.isTokenLoaded) {
            return
        }

        if (!state.isAuthenticated) {
            dispatch(clearUserAction())
        }

        fetchUser(state.accessToken!)

    }, [state.accessToken, state.isAuthenticated, state.isTokenLoaded])

    return <>{children}</>
}