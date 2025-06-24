import React from 'react';
import Button from '../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPasswordEmail } from '../modules/auth/reducer';
import ToastNotifier from '../components/ToastNotifier';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {

    const dispatch = useDispatch();
    const {
        loading,
        error,
        toast,
    } = useSelector((state) => state.auth);

    const getPasswordResetLink = async (event) => {
        event.preventDefault();
        const form = new FormData(event.target);
        const data = {
            email: form.get('email'),
        };
        await dispatch(forgotPasswordEmail(data)).unwrap();
    };

    return (
        <>
            <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
                <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-sm text-white">
                    <h1 className="text-2xl font-bold text-center mb-6">Forgot Password</h1>
                    <p className="text-sm text-gray-400 text-center mb-6">
                        Enter your email and we’ll send you a reset link.
                    </p>

                    <form className="space-y-4 text-left" onSubmit={getPasswordResetLink}>
                        <div>
                            <label className="block text-sm mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                required
                                className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
                            />
                            {error?.errors?.email && <p className="text-red-500 text-sm mt-1">{error?.errors?.email}</p>}
                        </div>
                        <Button
                            loading={loading}
                            label="Send reset link"
                        />
                    </form>

                    <div className="mt-6 text-sm text-center text-gray-400">
                        Remembered your password?{' '}
                        <Link to="/login" className="text-blue-400 hover:underline">Login</Link>
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
