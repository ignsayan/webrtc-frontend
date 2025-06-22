import { useSelector } from 'react-redux';
import EmailVerification from '../pages/EmailVerification';
import PhoneVerification from '../pages/PhoneVerification';
import ChatLayout from '../pages/ChatLayout';
import {
    Navigate,
    Outlet,
    Route,
} from 'react-router-dom';

export default function ProtectedRoutes() {

    const Guard = () => {
        const { user } = useSelector((state) => state.auth);
        return user ? <Outlet /> : <Navigate to='/login' />;
    };

    return (
        <>
            <Route element={<Guard />}>
                <Route
                    exact path="/verification/email"
                    element={<EmailVerification />}
                />
                <Route
                    exact path="/verification/phone"
                    element={<PhoneVerification />}
                />
                <Route
                    exact path="/"
                    element={<ChatLayout />}
                />
            </Route>
        </>
    );
}

