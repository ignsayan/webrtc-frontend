import { createAsyncThunk } from '@reduxjs/toolkit';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../../configs/firebase';

const attemptLogin = createAsyncThunk(
    'auth/attemptLogin',
    async (payload, { rejectWithValue }) => {

        try {
            const userData = {
                uid: payload.uid,
                name: payload.displayName,
                email: payload.email,
                photo: payload.photoURL,
            }

            const userRef = doc(db, 'users', payload.uid);
            const userDoc = await getDoc(userRef);

            if (!userDoc.exists()) {
                await setDoc(userRef, userData);
            }

            const token = await payload.getIdToken();
            localStorage.setItem('authToken', token);
            localStorage.setItem('uid', payload.uid);

            return userData;

        } catch (error) {
            return rejectWithValue(error.message || 'Failed to login');
        }
    });

export default attemptLogin;
