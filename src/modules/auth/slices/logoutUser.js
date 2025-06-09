import { createAsyncThunk } from '@reduxjs/toolkit';

const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, { rejectWithValue }) => {

        try {
            localStorage.removeItem('uid');
            localStorage.removeItem('authToken');
            return true;

        } catch (error) {
            return rejectWithValue(error);
        }
    });

export default logoutUser;