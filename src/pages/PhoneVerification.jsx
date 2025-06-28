import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import OtpInput from '../components/common/OtpInput';
import ToastNotifier from '../components/common/ToastNotifier';
import {
    sendVerification,
    verifyOtp,
} from '../modules/auth/reducer';

export default function PhoneVerification() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        user,
        loading,
        error,
        toast,
    } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user.phone_verified_at) return navigate('/');
    }, [user, navigate, dispatch]);

    const verifyPhone = async (code) => {
        const data = { code, channel: 'phone' };
        await dispatch(verifyOtp(data)).unwrap();
    };

    const resendCode = async () => {
        const data = { attribute: user.phone };
        await dispatch(sendVerification(data)).unwrap();
    };

    return (
        <>
            <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
                <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-sm text-white">
                    <h1 className="text-2xl font-bold text-center mb-6">Phone Verification</h1>
                    <p className="text-sm text-gray-400 text-center mb-6">
                        Enter the 6-digit code sent to your phone.
                    </p>

                    <OtpInput
                        handleVerification={verifyPhone}
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
                message={toast}
                error={error}
            />
        </>
    );
}
