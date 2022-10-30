import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import errandService from "./errandService";

const initialState = {
    errands: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const createErrand = createAsyncThunk('errands/create', async (errandData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await errandService.createErrand(errandData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getAllErrands = createAsyncThunk('errands/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await errandService.getAllErrands(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getErrandById = createAsyncThunk('errands/getById', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await errandService.getErrandById(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const errandSlice = createSlice({
    name: 'errand',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createErrand.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createErrand.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.errands.push(action.payload)
            })
            .addCase(createErrand.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getAllErrands.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllErrands.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.errands = action.payload
            })
            .addCase(getAllErrands.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getErrandById.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getErrandById.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.errands = action.payload
            })
            .addCase(getErrandById.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = errandSlice.actions
export default errandSlice.reducer