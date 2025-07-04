import React, { useState } from 'react';
import SignupForm from '../components/auth/SignupForm';
import LoginForm from '../components/auth/LoginForm';
import GoogleAuth from '../components/auth/GoogleAuth';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../configs/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import ToastNotifier from '../components/common/ToastNotifier';
import { Link } from 'react-router-dom';
import {
    googleUserAuth,
    registerUser,
    initiateLogin,
    attemptLogin,
} from '../modules/auth/reducer';

export default function AuthPage() {

    const [isRegister, setIsRegister] = useState(false);
    const dispatch = useDispatch();
    const {
        loading,
        loaderOrigin,
        error,
        toast,
    } = useSelector((state) => state.auth);

    const handleRegistration = async (data) => {
        dispatch(initiateLogin('manual'));
        await dispatch(registerUser(data)).unwrap();
        setIsRegister(false);
    };

    const handleLogin = async (data) => {
        dispatch(initiateLogin('manual'));
        await dispatch(attemptLogin(data)).unwrap();
    };

    const handleGoogleAuthentication = async () => {
        dispatch(initiateLogin('google'));
        const provider = new GoogleAuthProvider();
        const google = await signInWithPopup(auth, provider);
        const name = google.user.displayName?.split(' ') || [];
        const data = {
            first_name: name.shift(),
            last_name: name.join(' ') || null,
            email: google.user.email,
        };
        await dispatch(googleUserAuth(data)).unwrap();
    };

    return (
        <>
            <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
                <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-sm text-white">
                    <h1 className="text-2xl font-bold text-center mb-6">
                        {isRegister ? 'Create an Account' : 'Welcome Back'}
                    </h1>

                    {/* Tab Switch */}
                    <div className="flex justify-center gap-4 mb-6">
                        <button
                            className={`text-sm font-medium px-3 py-1 rounded
                        ${isRegister ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                            onClick={() => setIsRegister(true)}
                        >
                            Register
                        </button>
                        <button
                            className={`text-sm font-medium px-3 py-1 rounded
                        ${!isRegister ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                            onClick={() => setIsRegister(false)}
                        >
                            Login
                        </button>
                    </div>
                    {
                        isRegister
                            ? <SignupForm
                                loading={loading && loaderOrigin === 'manual'}
                                handleRegistration={handleRegistration}
                                error={error?.errors} />
                            : <LoginForm
                                loading={loading && loaderOrigin === 'manual'}
                                handleLogin={handleLogin}
                                error={error?.errors} />
                    }
                    <div className="my-6 flex items-center text-gray-400 text-sm">
                        <div className="flex-grow border-t border-gray-600"></div>
                        <span className="mx-4">OR</span>
                        <div className="flex-grow border-t border-gray-600"></div>
                    </div>
                    <GoogleAuth
                        labelPrefix={isRegister ? 'Signup' : 'Login'}
                        handleGoogleAuthentication={handleGoogleAuthentication}
                        loading={loading && loaderOrigin === 'google'}
                    />

                    <div className="mt-6 text-sm text-center text-gray-400">
                        Forgot your password?{' '}
                        <Link to="/forgot-password" className="text-blue-500">Reset</Link>
                    </div>
                </div>
            </div>
            <ToastNotifier
                message={toast}
                error={error}
            />
        </>
    );
}
