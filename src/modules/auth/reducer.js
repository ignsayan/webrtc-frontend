import { createSlice, isRejectedWithValue } from '@reduxjs/toolkit';
import attemptLogin from './slices/attemptLogin';
import logoutUser from './slices/logoutUser';

const initialState = {
    loading: false,
    isAuthenticated: localStorage.getItem('authToken') ? true : false,
    error: null,
};

export const authSlice = createSlice({
    'name': 'auth',
    initialState,
    reducers: {
        initiateLogin: (state) => {
            state.loading = true;
        },
    },
    extraReducers: (builder) => {
        builder
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
    attemptLogin,
    logoutUser,
};

export default authSlice.reducer;
