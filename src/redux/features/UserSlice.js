import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    totalCompletedTask: 0,
    userProfile: null,
}

const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateTotalCompletedTask: (state, action) => {
            state.totalCompletedTask = action.payload;
        },
        updateUserProfile: (state, action) => {
            state.userProfile = action.payload;
        }
    }
})

export const { updateTotalCompletedTask, updateUserProfile } = UserSlice.actions

export default UserSlice.reducer;