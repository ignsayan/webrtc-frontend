import { createRoot } from 'react-dom/client';
import '../assets/css/index.css';
import AuthLayout from '../pages/AuthLayout';
import ChatLayout from '../pages/ChatLayout';
import { Provider, useSelector } from 'react-redux';
import store from '../configs/store';

const container = document.getElementById('root')
const root = createRoot(container)

const App = () => {
    const { isAuthenticated } = useSelector((state) => state.auth)
    return !isAuthenticated ? <AuthLayout /> : <ChatLayout />
}

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);