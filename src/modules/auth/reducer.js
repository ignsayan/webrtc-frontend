import { createSlice, isRejectedWithValue } from '@reduxjs/toolkit';
import registerUser from './slices/registerUser';
import attemptLogin from './slices/attemptLogin';
import logoutUser from './slices/logoutUser';

const initialState = {
    loading: false,
    loaderOrigin: null,
    isAuthenticated: localStorage.getItem('authToken') ? true : false,
    error: null,
};

export const authSlice = createSlice({
    'name': 'auth',
    initialState,
    reducers: {
        initiateLogin: (state, action) => {
            state.loading = true;
            state.loaderOrigin = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(attemptLogin.pending, (state) => {
                state.loading = true;
            })
            .addCase(attemptLogin.fulfilled, (state) => {
                state.isAuthenticated = true;
                state.loading = false;
            })
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isAuthenticated = false;
                state.loading = false;
            })
            .addMatcher(isRejectedWithValue, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
    }
});

export const { initiateLogin } = authSlice.actions;
export {
    registerUser,
    attemptLogin,
    logoutUser,
};

export default authSlice.reducer;
