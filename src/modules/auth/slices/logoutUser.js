import { createAsyncThunk } from '@reduxjs/toolkit';
import { signOut } from 'firebase/auth';
import { auth } from '../../../configs/firebase';

const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, { rejectWithValue }) => {

        try {
            signOut(auth).then(() => {
                localStorage.removeItem('uid');
                localStorage.removeItem('authToken');
            });
            return true;

        } catch (error) {
            return rejectWithValue(error.message || 'Failed to logout');
        }
    });

export default logoutUser;