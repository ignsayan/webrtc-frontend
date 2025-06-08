import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../utilities/axiosInstance';

const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (payload, { rejectWithValue }) => {

        try {
            const response = await axiosInstance.post(
                '/auth/register',
                payload
            );
            const data = await response.data;
            return data;

        } catch (error) {
            return rejectWithValue(error.message || 'Failed to register');
        }
    });

export default registerUser;
