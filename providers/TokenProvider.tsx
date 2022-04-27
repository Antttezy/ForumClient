import { ReactNode, useEffect } from "react"
import { AsyncStorage } from "react-native"
import { useDispatch } from "react-redux"
import { AppDispatch, useRedux } from "../redux/store"
import { setAccessToken } from "../redux/actions"
import axios from "axios"
import { isSuccess, Result } from "../lib/result"
import { API_URL } from "../const/api"

export type TokenProviderProps = {
    children: ReactNode
}

export default function TokenProvider({ children }: TokenProviderProps) {

    const state = useRedux()
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {

        async function loadValues() {
            const token = await AsyncStorage.getItem('AUTH_USER_TOKEN')

            if (token) {
                try {

                    const regenerateResponse = await axios.post<Result<string, string>>(`${API_URL}/auth/regenerate`, {
                        token
                    })

                    const response = regenerateResponse.data
                    console.log(response)

                    if (isSuccess(response)) {
                        console.log('Access token regenerated')
                        dispatch(setAccessToken(response.result))
                    } else {
                        dispatch(setAccessToken(undefined))
                    }

                } catch (e) {
                    dispatch(setAccessToken(undefined))
                }

            } else {
                dispatch(setAccessToken(undefined))
            }
        }

        loadValues()

    }, [])

    useEffect(() => {

        async function saveToken(token: string) {
            await AsyncStorage.setItem('AUTH_USER_TOKEN', token)
        }

        async function clearToken() {
            await AsyncStorage.removeItem('AUTH_USER_TOKEN')
        }

        if (!state.isAuthenticated) {
            clearToken()
        } else {
            saveToken(state.accessToken!)
        }

    }, [state.accessToken, state.isAuthenticated])

    return <>{children}</>
}