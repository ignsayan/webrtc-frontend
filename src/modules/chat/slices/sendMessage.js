import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../utilities/axiosInstance';

const sendMessage = createAsyncThunk(
    'chat/sendMessage',
    async (payload, { rejectWithValue }) => {

        try {
            const { sender, receiver, content, chatroom } = payload;
            
            const response = await axiosInstance.post(
                '/chat/send-message', {
                sender,
                receiver,
                content,
                chatroom,
            });

            const data = await response.data;
            return data;

        } catch (error) {
            return rejectWithValue(error);
        }
    });

export default sendMessage;
