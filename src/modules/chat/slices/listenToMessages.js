import { createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db, generateChatRoom } from '../../../configs/firebase';
import { setMessages } from '../reducer';

let unsubscribe = null;

const listenToMessages = createAsyncThunk(
    'chat/listenToMessages',
    async ({ sender, receiver }, { dispatch, rejectWithValue }) => {

        try {
            const chatRoom = generateChatRoom(sender, receiver);
            const messagesRef = collection(db, 'chats', chatRoom, 'messages');

            const builder = query(messagesRef, orderBy('timestamp', 'asc'));
            if (unsubscribe) unsubscribe();

            unsubscribe = onSnapshot(builder, (snapshot) => {
                const messages = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    timestamp: doc.data().timestamp?.toDate().toISOString() ?? null,
                }));
                dispatch(setMessages(messages));
            });

        } catch (error) {
            return rejectWithValue(error.message);
        }
    });

export default listenToMessages;
