import { createAsyncThunk } from '@reduxjs/toolkit';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, generateChatRoom } from '../../../configs/firebase';

const sendMessage = createAsyncThunk(
    'chat/sendMessage',
    async ({ sender, receiver, message }, { rejectWithValue }) => {

        try {
            const chatRoom = generateChatRoom(sender, receiver);
            const messagesRef = collection(db, 'chats', chatRoom, 'messages');

            const chat = {
                sender,
                receiver,
                message,
                timestamp: serverTimestamp(),
            };
            await addDoc(messagesRef, chat);

            const { timestamp, ...response } = chat;
            return response;

        } catch (error) {
            return rejectWithValue(error.message);
        }
    });

export default sendMessage;
