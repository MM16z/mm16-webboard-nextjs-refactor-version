import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../slices/userSlice/userSlice'
import authSlice from '../slices/authSlice/authSlice'

export const makeStore = () => {
    return configureStore({
        reducer: { userSlice, authSlice }
    })
}

export const store = makeStore()

export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']