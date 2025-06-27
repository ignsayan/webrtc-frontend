import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../utilities/axiosInstance';

const getRecentChats = createAsyncThunk(
    'chat/getRecentChats',
    async (payload, { rejectWithValue }) => {

        try {
            const response = await axiosInstance.get(
                '/chat/recents', {
                params: {
                    sender: payload.sender,
                }
            });

            const data = await response.data.data;
            return data;

        } catch (error) {
            return rejectWithValue(error);
        }
    });

export default getRecentChats;