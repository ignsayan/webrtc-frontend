import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../utilities/axiosInstance';

const getInboxDetail = createAsyncThunk(
    'chat/getInboxDetail',
    async (payload, { rejectWithValue }) => {

        try {
            const { chatroom, sender } = payload;
            
            const response = await axiosInstance.get(
                '/chat/inbox', {
                params: {
                    chatroom,
                    sender,
                }
            });

            const data = await response.data.data;
            return data;

        } catch (error) {
            return rejectWithValue(error);
        }
    });

export default getInboxDetail;