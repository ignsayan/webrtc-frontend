import { createSlice, isRejectedWithValue } from '@reduxjs/toolkit';
import registerUser from './slices/registerUser';
import attemptLogin from './slices/attemptLogin';
import googleUserAuth from './slices/googleUserAuth';
import sendVerification from './slices/sendVerification';
import verifyOtp from './slices/verifyOtp';
import logoutUser from './slices/logoutUser';
import forgotPasswordEmail from './slices/forgotPasswordEmail';
import resetPassword from './slices/resetPassword';

const initialState = {
    user: null,
    loading: false,
    loaderOrigin: null,
    error: null,
    message: null,
};

export const authSlice = createSlice({
    'name': 'auth',
    initialState,
    reducers: {
        initiateLogin: (state, action) => {
            state.loading = true;
            state.loaderOrigin = action.payload;
        },
        clearFeedback: (state) => {
            state.message = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.fulfilled, (state, action) => {
                state.message = action.payload.message;
                state.loading = false;
            })
            .addCase(attemptLogin.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.message = action.payload.message;
                state.loading = false;
            })
            .addCase(googleUserAuth.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.message = action.payload.message;
                state.loading = false;
            })
            .addCase(sendVerification.pending, (state) => {
                state.loading = true;
            })
            .addCase(sendVerification.fulfilled, (state, action) => {
                state.message = action.payload.message;
                state.loading = false;
            })
            .addCase(verifyOtp.pending, (state) => {
                state.loading = true;
            })
            .addCase(verifyOtp.fulfilled, (state, action) => {
                const data = action.payload;
                if (data.channel === 'email') {
                    state.user.email_verified_at = data.user.email_verified_at;
                }
                if (data.channel === 'phone') {
                    state.user.phone_verified_at = data.user.phone_verified_at;
                }
                state.message = data.message;
                state.loading = false;
            })
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.user = null;
                state.message = action.payload.message;
                state.loading = false;
            })
            .addCase(forgotPasswordEmail.pending, (state) => {
                state.loading = true;
            })
            .addCase(forgotPasswordEmail.fulfilled, (state, action) => {
                state.message = action.payload.message;
                state.loading = false;
            })
            .addCase(resetPassword.pending, (state) => {
                state.loading = true;
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
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
    sendVerification,
    verifyOtp,
    logoutUser,
    forgotPasswordEmail,
    resetPassword,
};

export default authSlice.reducer;
