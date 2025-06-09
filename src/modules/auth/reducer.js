import { createSlice, isRejectedWithValue } from '@reduxjs/toolkit';
import registerUser from './slices/registerUser';
import attemptLogin from './slices/attemptLogin';
import googleUserAuth from './slices/googleUserAuth';
import logoutUser from './slices/logoutUser';

const initialState = {
    loading: false,
    loaderOrigin: null,
    isAuthenticated: localStorage.getItem('token') ? true : false,
    error: null,
    message: null,
};

export const authSlice = createSlice({
    'name': 'auth',
    initialState,
    reducers: {
        initiateLogin: (state, action) => {
            state.loading = true;
            state.loaderOrigin = action.payload
        },
        clearFeedback: (state) => {
            state.message = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.message = action.payload.message;
                state.loading = false;
            })
            .addCase(attemptLogin.pending, (state) => {
                state.loading = true;
            })
            .addCase(attemptLogin.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.message = action.payload.message;
                state.loading = false;
            })
            .addCase(googleUserAuth.pending, (state) => {
                state.loading = true;
            })
            .addCase(googleUserAuth.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.message = action.payload.message;
                state.loading = false;
            })
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.isAuthenticated = false;
                state.message = action.payload.message;
                state.loading = false;
            })
            .addMatcher(isRejectedWithValue, (state, action) => {
                state.error = {
                    message: action.payload.message,
                    status: action.payload.status,
                    errors: action.payload.errors,
                };
                state.loading = false;
            });
    }
});

export const { initiateLogin, clearFeedback } = authSlice.actions;
export {
    registerUser,
    attemptLogin,
    googleUserAuth,
    logoutUser,
};

export default authSlice.reducer;
