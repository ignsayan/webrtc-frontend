import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../utilities/axiosInstance';

const forgotPasswordEmail = createAsyncThunk(
    'auth/forgotPasswordEmail',
    async (payload, { rejectWithValue }) => {

        try {
            const response = await axiosInstance.post(
                '/auth/forgot-password',
                payload,
            );
            const data = response.data;
            return data;

        } catch (error) {
            return rejectWithValue(error);
        }
    });

export default forgotPasswordEmail;