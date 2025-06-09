import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../utilities/axiosInstance';

const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, { rejectWithValue }) => {

        try {
            const response = await axiosInstance.post(
                '/auth/logout'
            );
            const data = response.data;
            if (response.status === 200) {
                localStorage.removeItem('uid');
                localStorage.removeItem('token');
            }
            return data;

        } catch (error) {
            return rejectWithValue(error);
        }
    });

export default logoutUser;