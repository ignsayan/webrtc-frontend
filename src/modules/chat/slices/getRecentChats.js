import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../utilities/axiosInstance';

const getRecentChats = createAsyncThunk(
    'chat/getRecentChats',
    async (payload, { getState, rejectWithValue }) => {

        try {
            const state = getState().auth;

            const response = await axiosInstance.get(
                '/chat/recents', {
                params: {
                    group: payload.isGroup,
                    sender: state.user.id,
                }
            });

            const data = await response.data.data;
            return data;

        } catch (error) {
            return rejectWithValue(error);
        }
    });

export default getRecentChats;