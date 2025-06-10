import { createRoot } from 'react-dom/client';
import '../assets/css/index.css';
import { Provider, useSelector } from 'react-redux';
import store from '../configs/store';
import { BrowserRouter } from 'react-router-dom';
import ProtectedRoutes from '../routes/ProtectedRoutes';
import PublicRoutes from '../routes/PublicRoutes';

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
    <Provider store={store}>
        <BrowserRouter>
            {/* <ProtectedRoutes /> */}
            <PublicRoutes />
        </BrowserRouter>
    </Provider>
);