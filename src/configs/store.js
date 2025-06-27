import { combineReducers, configureStore } from '@reduxjs/toolkit';
import chatReducer from '../modules/chat/reducer';
import authReducer from '../modules/auth/reducer';
import storage from 'redux-persist/lib/storage';
import {
    FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,
    persistStore, persistReducer,
} from 'redux-persist';

const reducers = combineReducers({
    auth: authReducer,
    chat: chatReducer,
});

const config = {
    key: 'root',
    storage,
    whitelist: ['auth'],
};

const persistedReducer = persistReducer(config, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [
                FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER
            ],
        },
    }),
});

export const persistor = persistStore(store);