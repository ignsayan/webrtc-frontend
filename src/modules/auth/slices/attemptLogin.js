import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../utilities/axiosInstance';

const attemptLogin = createAsyncThunk(
    'auth/attemptLogin',
    async (payload, { rejectWithValue }) => {

        try {
            const response = await axiosInstance.post(
                '/auth/login',
                payload
            );

            const data = response.data;
            localStorage.setItem('token', data.data.token);

            const user = response.data.data.user;
            localStorage.setItem('user', JSON.stringify({
                uid: user._id,
                email: user.email || null,
                email_verified_at: user.email_verified_at,
                phone: user.phone || null,
                phone_verified_at: user.phone_verified_at,
            }));

            return data;

        } catch (error) {
            return rejectWithValue(error);
        }
    });

export default attemptLogin;
