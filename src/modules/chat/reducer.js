import { createSlice, isRejectedWithValue } from '@reduxjs/toolkit';
import getAvailableUsers from './slices/getAvailableUsers';
import getChatroomUser from './slices/getChatroomUser';
import getChatHistory from './slices/getChatHistory';
import listenToMessages from './slices/listenToMessages';
import sendMessage from './slices/sendMessage';

const initialState = {
    users: [],
    chats: [],
    activeChatRoom: false,
    activeChatUser: {},
    error: null,
};

export const chatSlice = createSlice({
    'name': 'chat',
    initialState,
    reducers: {
        resetChatState: (state, { payload } = {}) => {
            state.chats = [];
            if (payload?.type === 'logout') {
                state.activeChatRoom = false;
                state.activeChatUser = {};
            }
        },
        setMessages: (state, action) => {
            state.chats = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAvailableUsers.fulfilled, (state, action) => {
                state.users = action.payload;
            })
            .addCase(getChatroomUser.fulfilled, (state, action) => {
                state.activeChatUser = action.payload;
                state.activeChatRoom = true;
            })
            .addCase(getChatHistory.fulfilled, (state, action) => {
                state.chats = action.payload;
            })
            .addMatcher(isRejectedWithValue, (state, action) => {
                state.error = action.payload;
            })
    }
});

export const { resetChatState, setMessages } = chatSlice.actions
export {
    getAvailableUsers,
    getChatroomUser,
    getChatHistory,
    listenToMessages,
    sendMessage,
};

export default chatSlice.reducer;