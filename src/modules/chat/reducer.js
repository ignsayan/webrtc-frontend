import { createSlice, isRejectedWithValue } from '@reduxjs/toolkit';
import getRecentChats from './slices/getRecentChats';
import generateRoom from './slices/generateRoom';
import getInboxDetail from './slices/getInboxDetail';
import sendMessage from './slices/sendMessage';
import listenToMessage from './slices/listenToMessage';
import searchUsers from './slices/searchUsers';
import logoutUser from '../auth/slices/logoutUser';

const initialState = {
    users: null,
    recentChats: null,
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
            .addCase(logoutUser.fulfilled, () => initialState)
            .addCase(getRecentChats.fulfilled, (state, action) => {
                state.recentChats = action.payload.recents;
                state.loading = false;
            })
            .addCase(searchUsers.fulfilled, (state, action) => {
                state.users = action.payload.users;
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
    getRecentChats,
    generateRoom,
    getInboxDetail,
    sendMessage,
    listenToMessage,
    searchUsers,
};

export default messageslice.reducer;