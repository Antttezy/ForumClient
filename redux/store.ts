import { configureStore } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { reducer } from './reducer'
import { IState } from './reducer'

const store = configureStore({
    reducer: reducer
})

export type AppDispatch = typeof store.dispatch
export const useRedux = () => useSelector((s: IState) => s)

export default store