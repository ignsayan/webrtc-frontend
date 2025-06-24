import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../utilities/axiosInstance';

const getChatroom = createAsyncThunk(
    'chat/getChatroom',
    async (payload, { rejectWithValue }) => {

        try {
            const { sender, receiver } = payload;

            const response = await axiosInstance.get(
                '/chat/room', {
                params: {
                    receiver,
                    sender,
                }
            });

            const data = await response.data.data;
            return data;

        } catch (error) {
            return rejectWithValue(error);
        }
    });

export default getChatroom;