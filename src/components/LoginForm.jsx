import React from 'react';
import Button from './Button';

export default function LoginForm({
    loading,
    handleLogin,
    error,
}) {

    const handleSubmit = (form) => {
        const data = {
            email: form.get('email'),
            password: form.get('password'),
        };
        handleLogin(data);
    };

    return (
        <>
            <form className="space-y-4 text-left" action={handleSubmit}>
                <div>
                    <label className="block text-sm mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        required
                        placeholder="you@example.com"
                        className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
                    />
                    {error?.email && <p className="text-red-500 text-sm mt-1">{error.email}</p>}
                </div>
                <div>
                    <label className="block text-sm mb-1">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        required
                        className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
                    />
                    {error?.password && <p className="text-red-500 text-sm mt-1">{error.password}</p>}
                </div>
                <Button
                    loading={loading}
                    label="Log in"
                />
            </form>
        </>
    );
}
