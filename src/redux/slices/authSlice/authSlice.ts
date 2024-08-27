import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Auth {
    token: string
}

const initialState: Auth = {
    token: ''
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateAuth: (state, action: PayloadAction<Auth>) => {
            state.token = action.payload.token
        },
        logOut: (state) => {
            state.token = ''
        }
    },
})

export const { updateAuth, logOut } = authSlice.actions


export default authSlice.reducer