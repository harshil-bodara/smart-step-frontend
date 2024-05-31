import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    activeStep: 1,
}

const UniversitySlice = createSlice({
    name: "university",
    initialState,
    reducers: {
        updateActiveStep: (state, action) => {
            state.activeStep = action.payload;
        },
    }
})

export const { updateActiveStep } = UniversitySlice.actions

export default UniversitySlice.reducer;