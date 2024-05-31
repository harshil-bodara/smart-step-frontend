import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    userData: null,
    isLoggedIn: false,
    token: null,
}

const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        authLogin: (state, action) => {
            state.isLoggedIn = true;
            state.userData = action.payload.user;
            state.token = action.payload.token;
        },
        authLogout: (state) => {
            state.isLoggedIn = false;
            state.userData = null;
            state.token = null;
        }
    }
})

export const { authLogin, authLogout } = AuthSlice.actions

export default AuthSlice.reducer;