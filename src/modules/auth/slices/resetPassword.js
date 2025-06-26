import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../utilities/axiosInstance';

const resetPassword = createAsyncThunk(
    'auth/resetPassword',
    async (payload, { rejectWithValue }) => {

        try {
            const response = await axiosInstance.post(
                '/auth/reset-password',
                payload,
            );
            const data = response.data;
            return data;
        
        } catch (error) {
            return rejectWithValue(error);
        }
    });

export default resetPassword;