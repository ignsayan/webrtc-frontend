import { createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../configs/firebase';

const getAvailableUsers = createAsyncThunk(
    'chat/getAvailableUsers',
    async (_, { rejectWithValue }) => {

        try {
            const userRef = collection(db, 'users');
            const userDoc = await getDocs(userRef);

            return userDoc.docs
                .map((doc) => doc.data())
                .filter((user) => user.uid !== localStorage.getItem('uid'));

        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch users');
        }
    });

export default getAvailableUsers;