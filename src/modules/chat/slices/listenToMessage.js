import { createAsyncThunk } from '@reduxjs/toolkit';
import { getSocket } from '../../../utilities/socketInstance.js';

const listenToMessage = createAsyncThunk(
    'chat/listenToMessage',
    async (payload, { rejectWithValue, dispatch }) => {

        try {
            const socket = getSocket();

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