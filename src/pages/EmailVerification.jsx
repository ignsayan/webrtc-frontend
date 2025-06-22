import React from 'react';
import OtpInput from '../components/OtpInput';
import { useDispatch, useSelector } from 'react-redux';
import ToastNotifier from '../components/ToastNotifier';
import {
    sendVerification,
    verifyOtp,
} from '../modules/auth/reducer';

export default function EmailVerification() {

    const dispatch = useDispatch();
    const {
        user,
        loading,
        message,
        error
    } = useSelector((state) => state.auth);

    const verifyEmail = async (code) => {
        const data = { code, channel: 'email' };
        await dispatch(verifyOtp(data)).unwrap();
    };

    const resendCode = async () => {
        const data = { attribute: user.email };
        await dispatch(sendVerification(data)).unwrap();
    };

    return (
        <>
            <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
                <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-sm text-white">
                    <h1 className="text-2xl font-bold text-center mb-6">Email Verification</h1>
                    <p className="text-sm text-gray-400 text-center mb-6">
                        Enter the 6-digit code sent to your email.
                    </p>

                    <OtpInput
                        handleVerification={verifyEmail}
                        loading={loading} />

                    <div className="mt-6 text-sm text-center text-gray-400">
                        Didn’t get the code?{' '}
                        <button className="text-blue-400 hover:underline" type="button"
                            onClick={resendCode}>
                            Resend
                        </button>
                    </div>
                </div>
            </div>
            <ToastNotifier
                message={message}
                error={error}
            />
        </>
    );
}
