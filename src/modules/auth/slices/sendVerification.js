import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../utilities/axiosInstance';

const sendVerification = createAsyncThunk(
    'auth/sendVerification',
    async (payload, { rejectWithValue }) => {

        try {
            const response = await axiosInstance.post(
                '/auth/send-verification',
                payload
            );
            const data = response.data;
            return data;

        } catch (error) {
            return rejectWithValue(error);
        }
    });

export default sendVerification;