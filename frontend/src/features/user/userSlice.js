import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";

const initialState = {
    users: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const getUserById = createAsyncThunk('user/getById', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await userService.getUserById(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserById.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUserById.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.users = action.payload
            })
            .addCase(getUserById.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = userSlice.actions
export default userSlice.reducer