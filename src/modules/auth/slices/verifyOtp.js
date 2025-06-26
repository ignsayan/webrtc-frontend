import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../utilities/axiosInstance';

const verifyOtp = createAsyncThunk(
    'auth/otpVerification',
    async (payload, { rejectWithValue, getState }) => {

        try {
            const response = await axiosInstance.post(
                '/auth/verify',
                payload,
            );
            const data = response.data;

            const existing = getState().auth.user;
            const channel = payload.channel;
            let user = response.data.data.user;

            user = {
                ...existing,
                email_verified_at: user.email_verified_at,
                phone_verified_at: user.phone_verified_at,
            };

            return {
                message: data.message,
                channel,
                user,
            };

        } catch (error) {
            return rejectWithValue(error);
        }
    });

export default verifyOtp;