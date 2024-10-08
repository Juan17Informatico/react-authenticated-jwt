import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Api } from '../services';

// Se eliminan las interfaces y los tipos

const initialState = {
    token: null,
    user: null,
    isLogged: false,
    isLoading: false
}

export const loginUser = createAsyncThunk('auth/loginUser', async (data) => {
    const response = await Api.post('/auth/login', data); 

    if( response.statusCode === 200) {
        window.localStorage.setItem('token', response.dataResponse.token);
        return response.dataResponse;
    }

    throw new Error("Error");
});

export const registerUser = createAsyncThunk("auth/registerUser", async (data, thunkApi) => {

    const response = await Api.post("/auth/register", data);

    if(response.statusCode === 201) {
        window.localStorage.setItem('token', response.dataResponse.token);
        return response.dataResponse;
    }

    return thunkApi.rejectWithValue(response.dataResponse); 

});

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(loginUser.fulfilled, (state, { payload }) => {
            state.isLoading = false; 
            state.isLogged = true;
            state.token = payload.token;
            state.user =  payload.user;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false; 
            state.isLogged = false;
            state.token = null;
            state.user = null;
        })
        .addCase(registerUser.pending, ( state, { payload }) => {
            state.isLoading = true; 
        })
        .addCase(registerUser.fulfilled, ( state, { payload }) => {
            state.isLoading = false;
            state.isLogged = true; 
            state.token = payload.token;
            state.user = payload.user; 
        })
        .addCase(registerUser.rejected, ( state, { payload }) => {
            state.isLoading = false; 
            state.isLogged = false;
            state.token = null;
            state.user = null;
        });
    }, 
});

// Exportar el reducer generado
export default authSlice.reducer;
