import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../utilities/axiosInstance';

const googleUserAuth = createAsyncThunk(
    'auth/googleUserAuth',
    async (payload, { rejectWithValue }) => {

        try {
            const response = await axiosInstance.post(
                '/auth/google',
                payload,
            );

            const data = response.data;
            const user = data.data.user;

            localStorage.setItem('token', data.data.token);

            return {
                message: data.message,
                user: {
                    id: user._id,
                    first_name: user.first_name,
                    last_name: user.last_name || null,
                    email: user.email || null,
                    email_verified_at: user.email_verified_at,
                    phone: user.phone || null,
                    phone_verified_at: user.phone_verified_at,
                    avatar: user.avatar || null,
                    auth_provider: user.auth_provider,
                },
            };

        } catch (error) {
            return rejectWithValue(error);
        }
    });

export default googleUserAuth;