import { ReactNode, useEffect } from "react"
import { AsyncStorage } from "react-native"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../redux/store"
import { setAccessToken } from "../redux/actions"
import axios from "axios"
import { isSuccess, Result } from "./lib/result"

export type TokenProviderProps = {
    children: ReactNode
}

const API_URL = process.env.REACT_APP_API_URL!

export default function TokenProvider({ children }: TokenProviderProps) {

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

    return <>{children}</>
}