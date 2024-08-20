import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface userState {
    currentuser: any
}

const initialState: userState = {
    currentuser: {}
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action: PayloadAction<string>) => {
            state.currentuser = action.payload
        }
    },
})

export const { updateUser } = userSlice.actions

export default userSlice.reducer