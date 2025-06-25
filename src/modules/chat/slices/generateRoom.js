import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../utilities/axiosInstance';

const generateRoom = createAsyncThunk(
    'chat/generateRoom',
    async (payload, { rejectWithValue }) => {

        try {
            const { sender, receiver } = payload;

            const response = await axiosInstance.post(
                '/chat/room', {
                receiver,
                sender,
            });

            const data = response.data.data;
            return data;

        } catch (error) {
            return rejectWithValue(error);
        }
    });

export default generateRoom;