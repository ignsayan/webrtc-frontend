import React, { useState } from 'react';
import SignupForm from '../components/SignupForm';
import LoginForm from '../components/LoginForm';
import GoogleAuth from '../components/GoogleAuth';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../configs/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import {
    registerUser,
    initiateLogin,
    attemptLogin,
} from '../modules/auth/reducer';

export default function AuthPage() {

    const [isRegister, setIsRegister] = useState(false);

    const { loading, loaderOrigin } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleRegistration = (data) => {
        dispatch(initiateLogin('manual'));
        dispatch(registerUser(data));
        setIsRegister(false);
    };

    const handleLogin = (data) => {
        dispatch(initiateLogin('manual'));
        dispatch(attemptLogin(data));
    };

    const handleGoogleAuthentication = async () => {
        dispatch(initiateLogin('google'));
        const provider = new GoogleAuthProvider();
        const google = await signInWithPopup(auth, provider);
        dispatch(attemptLogin(google.user));
    };

    return (
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
                            handleRegistration={handleRegistration} />
                        : <LoginForm
                            loading={loading && loaderOrigin === 'manual'}
                            handleLogin={handleLogin} />
                }
                <div className="my-4 text-center text-sm text-gray-400">
                    or continue
                </div>
                <GoogleAuth
                    labelPrefix={isRegister ? 'Register' : 'Login'}
                    handleGoogleAuthentication={handleGoogleAuthentication}
                    loading={loading && loaderOrigin === 'google'}
                />

                <div className="mt-6 text-sm text-center text-gray-400">
                    Forgot your password?{' '}
                    <a href="#" className="text-blue-500">Reset</a>
                </div>
            </div>
        </div>
    );
}
