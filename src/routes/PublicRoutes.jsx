import React from 'react'
import { Route, Routes } from 'react-router-dom';
import AuthLayout from '../pages/AuthLayout';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import { useSelector } from 'react-redux';

export default function PublicRoutes() {

    const { isAuthenticated } = useSelector((state) => state.auth);
    
    return (
        <>
            <Routes>
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
            </Routes>
        </>
    );
}
