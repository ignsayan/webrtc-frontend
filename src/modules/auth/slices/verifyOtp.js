import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../utilities/axiosInstance';

const verifyOtp = createAsyncThunk(
    'auth/otpVerification',
    async (payload, { rejectWithValue, getState }) => {

        try {
            const response = await axiosInstance.post(
                '/auth/verify',
                payload
            );
            const data = response.data;

            const existing = getState().auth.user;
            const user = response.data.data.user;

            localStorage.setItem('user', JSON.stringify({
                ...existing,
                email_verified_at: user.email_verified_at,
                phone_verified_at: user.phone_verified_at,
            }));

            const channel = payload.channel;
            return { ...data, channel };

        } catch (error) {
            return rejectWithValue(error);
        }
    });

export default verifyOtp;