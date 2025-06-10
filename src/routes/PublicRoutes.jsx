import { useSelector } from 'react-redux';
import AuthLayout from '../pages/AuthLayout';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import {
    Navigate,
    Outlet,
    Route,
} from 'react-router-dom';

export default function PublicRoutes() {

    const Guard = () => {
        const { isAuthenticated } = useSelector((state) => state.auth);
        return !isAuthenticated ? <Outlet /> : <Navigate to='/' />;
    };

    return (
        <>
            <Route element={<Guard />}>
                <Route
                    exact path="/login"
                    element={<AuthLayout />}
                />
                <Route
                    exact path="/forgot-password"
                    element={<ForgotPassword />}
                />
                <Route
                    exact path="/reset-password"
                    element={<ResetPassword />}
                />
            </Route>
        </>
    );
}
