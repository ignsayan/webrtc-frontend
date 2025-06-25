import { createAsyncThunk } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';

const listenToMessage = createAsyncThunk(
    'chat/listenToMessage',
    async (payload, { rejectWithValue, dispatch }) => {

        try {
            const socket = io(import.meta.env.VITE_API_URL, {
                autoConnect: true,
                transports: ['websocket'],
            });

            socket.emit('join:chatroom', payload);
            socket.off('listen:message');

            socket.on('listen:message', (message) => {
                dispatch({
                    type: 'chat/listenToMessage/fulfilled',
                    payload: message
                });
            });

            return true;

        } catch (error) {
            return rejectWithValue(error);
        }
    });

export default listenToMessage;