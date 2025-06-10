import { createRoot } from 'react-dom/client';
import '../assets/css/index.css';
import { Provider } from 'react-redux';
import store from '../configs/store';
import { BrowserRouter, Routes } from 'react-router-dom';
import ProtectedRoutes from '../routes/ProtectedRoutes';
import PublicRoutes from '../routes/PublicRoutes';

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                {ProtectedRoutes()}
                {PublicRoutes()}
            </Routes>
        </BrowserRouter>
    </Provider>
);