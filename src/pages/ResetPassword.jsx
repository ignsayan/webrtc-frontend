import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/Button';
import { resetPassword } from '../modules/auth/reducer';
import ToastNotifier from '../components/ToastNotifier';
import { Link, useNavigate } from 'react-router-dom';

export default function ResetPassword() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        loading,
        error,
        message
    } = useSelector((state) => state.auth);

    const handleReset = async (event) => {
        event.preventDefault();
        const form = new FormData(event.target);
        const data = {
            token: new URLSearchParams(window.location.search).get('token'),
            email: new URLSearchParams(window.location.search).get('email'),
            password: form.get('password'),
            password_confirmation: form.get('password_confirmation'),
        };
        await dispatch(resetPassword(data)).unwrap();
        navigate('/login');
    };

    return (
        <>
            <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
                <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-sm text-white">
                    <h1 className="text-2xl font-bold text-center mb-6">Reset Password</h1>
                    <p className="text-sm text-gray-400 text-center mb-6">
                        Enter your new password below to reset it.
                    </p>

                    <form className="space-y-4 text-left" onSubmit={handleReset}>
                        <div>
                            <label className="block text-sm mb-1">New Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                required
                                className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
                            />
                            {error?.errors?.password && <p className="text-red-500 text-sm mt-1">{error?.errors?.password}</p>}
                        </div>
                        <div>
                            <label className="block text-sm mb-1">Confirm Password</label>
                            <input
                                type="password"
                                name="password_confirmation"
                                placeholder="••••••••"
                                required
                                className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
                            />
                        </div>
                        <Button
                            type="submit"
                            loading={loading}
                            label="Set new password"
                        />
                    </form>

                    <div className="mt-6 text-sm text-center text-gray-400">
                        Go back to{' '}
                        <Link to="/login" className="text-blue-400 hover:underline">Login</Link>
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
