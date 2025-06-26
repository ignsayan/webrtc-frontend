import { createSlice, isRejectedWithValue } from '@reduxjs/toolkit';
import getContactList from './slices/getContactList';
import generateRoom from './slices/generateRoom';
import getInboxDetail from './slices/getInboxDetail';
import sendMessage from './slices/sendMessage';
import listenToMessage from './slices/listenToMessage';

const initialState = {
    contacts: null,
    chatroom: null,
    receiver: null,
    messages: [],
    activity: null,
    loading: false,
    error: null,
    toast: null,
};

export const messageslice = createSlice({
    'name': 'chat',
    initialState,
    reducers: {
        resetMessages: (state, { payload } = {}) => {
            state.messages = [];
            if (payload?.type === 'logout') {
                state.receiver = null;
            }
        },
        setActivity: (state, action) => {
            state.activity = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getContactList.fulfilled, (state, action) => {
                state.contacts = action.payload.contacts;
                state.loading = false;
            })
            .addCase(generateRoom.fulfilled, (state, action) => {
                state.chatroom = action.payload.room;
                state.loading = false;
            })
            .addCase(getInboxDetail.fulfilled, (state, action) => {
                state.receiver = action.payload.receiver;
                state.messages = action.payload.messages;
                state.loading = false;
            })
            .addCase('chat/listenToMessage/fulfilled', (state, action) => {
                state.messages.push(action.payload);
            })
            .addMatcher(isRejectedWithValue, (state, action) => {
                state.error = {
                    message: action.payload.message,
                    status: action.payload.status,
                    errors: action.payload.errors,
                };
                state.loading = false;
            })
    }
});

export const { resetMessages, setActivity } = messageslice.actions
export {
    getContactList,
    generateRoom,
    getInboxDetail,
    sendMessage,
    listenToMessage,
};

export default messageslice.reducer;