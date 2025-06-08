import React from 'react';

export default function ResetPassword() {

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
            <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-sm text-white">
                <h1 className="text-2xl font-bold text-center mb-6">Reset Password</h1>
                <p className="text-sm text-gray-400 text-center mb-6">
                    Enter your email and we’ll send you a reset link.
                </p>

                <form className="space-y-4 text-left">
                    <div>
                        <label className="block text-sm mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold"
                    >
                        Send Reset Link
                    </button>
                </form>

                <div className="mt-6 text-sm text-center text-gray-400">
                    Remembered your password?{' '}
                    <a href="/login" className="text-blue-400 hover:underline">
                        Log In
                    </a>
                </div>
            </div>
        </div>
    );
}
