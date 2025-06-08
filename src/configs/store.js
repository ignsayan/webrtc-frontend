import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../modules/auth/reducer';
import chatReducer from '../modules/chat/reducer';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        chat: chatReducer,
    },
});

export default store;