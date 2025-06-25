import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../utilities/axiosInstance';

const sendMessage = createAsyncThunk(
    'chat/sendMessage',
    async (payload, { rejectWithValue }) => {

        try {
            const { chatroom, sender, receiver, content } = payload;

            const response = await axiosInstance.post(
                '/chat/send-message', {
                chatroom,
                sender,
                receiver,
                content,
            });

            const data = await response.data;
            return data;

        } catch (error) {
            return rejectWithValue(error);
        }
    });

export default sendMessage;
