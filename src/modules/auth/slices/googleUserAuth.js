import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../utilities/axiosInstance';

const googleUserAuth = createAsyncThunk(
    'auth/googleUserAuth',
    async (payload, { rejectWithValue }) => {

        try {
            const response = await axiosInstance.post(
                '/auth/google',
                payload
            );
            const data = response.data;
            localStorage.setItem('uid', data.data.user._id);
            localStorage.setItem('authToken', data.data.token);
            return data;

        } catch (error) {
            return rejectWithValue(error);
        }
    });

export default googleUserAuth;