import { createSlice, isRejectedWithValue } from '@reduxjs/toolkit';
import getContactList from './slices/getContactList';
import getChatroom from './slices/getChatroom';
import sendMessage from './slices/sendMessage';

const initialState = {
    contacts: null,
    chatroom: null,
    receiver: null,
    messages: [],
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
        setMessages: (state, action) => {
            state.messages.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getContactList.fulfilled, (state, action) => {
                state.contacts = action.payload.contacts;
                state.loading = false;
            })
            .addCase(getChatroom.fulfilled, (state, action) => {
                state.receiver = action.payload.receiver;
                state.messages = action.payload.messages;
                state.chatroom = action.payload.chatroom;
                state.loading = false;
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

export const { resetMessages, setMessages } = messageslice.actions
export {
    getContactList,
    getChatroom,
    sendMessage,
};

export default messageslice.reducer;