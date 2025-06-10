import { useSelector } from 'react-redux';
import ChatLayout from '../pages/ChatLayout';
import {
    Navigate,
    Outlet,
    Route,
} from 'react-router-dom';

export default function ProtectedRoutes() {

    const Guard = () => {
        const { isAuthenticated } = useSelector((state) => state.auth);
        return isAuthenticated ? <Outlet /> : <Navigate to='/login' />;
    };

    return (
        <>
            <Route element={<Guard />}>
                <Route
                    exact path="/"
                    element={<ChatLayout />}
                />
            </Route>
        </>
    );
}

