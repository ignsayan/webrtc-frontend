import { createAsyncThunk } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';

const listenToMessage = createAsyncThunk(
    'chat/listenToMessage',
    async (_, { getState, rejectWithValue, dispatch }) => {

        try {
            const state = getState().chat;

            const socket = io(import.meta.env.VITE_API_URL, {
                autoConnect: true,
                transports: ['websocket'],
            });

            socket.emit('join:chatroom', state.chatroom);
            socket.off('message');

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