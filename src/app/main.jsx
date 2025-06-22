import { createRoot } from 'react-dom/client';
import '../assets/css/index.css';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes } from 'react-router-dom';
import ProtectedRoutes from '../routes/ProtectedRoutes';
import PublicRoutes from '../routes/PublicRoutes';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '../configs/store';

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <Routes>
                    {ProtectedRoutes()}
                    {PublicRoutes()}
                </Routes>
            </BrowserRouter>
        </PersistGate>
    </Provider>
);