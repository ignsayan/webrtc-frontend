import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../utilities/axiosInstance';

const getContactList = createAsyncThunk(
    'chat/getContactList',
    async (_, { getState, rejectWithValue }) => {

        try {
            const state = getState().auth;

            const response = await axiosInstance.get(
                '/chat/contacts', {
                params: {
                    exclude: state.user.id
                }
            });

            const data = await response.data.data;
            return data;

        } catch (error) {
            return rejectWithValue(error);
        }
    });

export default getContactList;