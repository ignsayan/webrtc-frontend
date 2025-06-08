import React, { useState } from 'react';
import ManualAuth from '../components/ManualAuth';
import GoogleAuth from '../components/GoogleAuth';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../configs/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import {
    initiateLogin,
    attemptLogin,
} from '../modules/auth/reducer';

export default function AuthPage() {

    const [isRegister, setIsRegister] = useState(false);

    const { loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleGoogleAuthentication = async () => {
        dispatch(initiateLogin());
        const provider = new GoogleAuthProvider();
        const google = await signInWithPopup(auth, provider);
        dispatch(attemptLogin(google.user));
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
            <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-sm text-white">
                <ManualAuth
                    isRegister={isRegister}
                    setIsRegister={setIsRegister}
                />
                <GoogleAuth
                    labelPrefix={isRegister ? 'Register' : 'Login'}
                    handleGoogleAuthentication={handleGoogleAuthentication}
                    loading={loading}
                />

                <div className="mt-6 text-sm text-center text-gray-400">
                    Forgot your password?{' '}
                    <a href="#" className="text-blue-500">Reset</a>
                </div>
            </div>
        </div>
    );
}
