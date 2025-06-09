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
            const data = await response.data.data;
            localStorage.setItem('uid', data._id);
            localStorage.setItem('authToken', data.token);
            return data;

        } catch (error) {
            return rejectWithValue(error.message || 'Failed to login');
        }
    });

export default googleUserAuth;