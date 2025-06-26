import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../utilities/axiosInstance';

const searchUsers = createAsyncThunk(
    'chat/searchUsers',
    async (payload, { rejectWithValue }) => {

        try {
            const response = await axiosInstance.get(
                '/chat/search-users', {
                params: payload,
            });

            const data = await response.data.data;
            return data;

        } catch (error) {
            return rejectWithValue(error);
        }
    });

export default searchUsers;