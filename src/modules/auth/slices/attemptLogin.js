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
            localStorage.setItem('uid', data.data.user._id);
            localStorage.setItem('token', data.data.token);
            return data;

        } catch (error) {
            return rejectWithValue(error);
        }
    });

export default attemptLogin;
