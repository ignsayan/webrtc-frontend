import { createAsyncThunk } from '@reduxjs/toolkit';
import { getSocket } from '../../../utilities/socketInstance.js';
import { setActivity } from '../reducer';

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
                    payload: message,
                });
            });

            socket.off('start:typing');
            socket.on('start:typing', (data) => {
                dispatch(setActivity(data));
            });

            socket.off('stop:typing');
            socket.on('stop:typing', () => {
                dispatch(setActivity(null));
            });

            return true;

        } catch (error) {
            return rejectWithValue(error);
        }
    });

export default listenToMessage;