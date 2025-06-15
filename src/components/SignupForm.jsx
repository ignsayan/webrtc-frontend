import React, { useRef } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Button from './Button';

export default function SignupForm({
    loading,
    handleRegistration,
    error,
}) {

    const phoneRef = useRef(null);

    const handleSubmit = (form) => {
        const data = {
            first_name: form.get('first_name'),
            last_name: form.get('last_name'),
            email: form.get('email'),
            phone: form.get('phone').replace(/[^+\d]/g, ''),
            password: form.get('password'),
            password_confirmation: form.get('password_confirmation'),
        };
        handleRegistration(data);
    };

    return (
        <>
            <form className="space-y-4 text-left" action={handleSubmit}>
                <label className="block text-sm mb-1">Full Name</label>
                <div className="flex gap-4">
                    <div className="w-1/2">
                        <input
                            type="text"
                            name="first_name"
                            placeholder="First name"
                            required
                            className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
                        />
                        {error?.first_name && <p className="text-red-500 text-sm mt-1">{error.first_name}</p>}
                    </div>
                    <div className="w-1/2">
                        <input
                            type="text"
                            name="last_name"
                            placeholder="Last name"
                            required
                            className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
                        />
                        {error?.last_name && <p className="text-red-500 text-sm mt-1">{error.last_name}</p>}
                    </div>
                </div>
                <div>
                    <label className="block text-sm mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        required
                        className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
                    />
                    {error?.email && <p className="text-red-500 text-sm mt-1">{error.email}</p>}
                </div>
                <div>
                    <label className="block text-sm mb-1">Phone Number</label>
                    <PhoneInput country="in"
                        onChange={() => phoneRef.current?.focus()}
                        inputProps={{
                            name: 'phone',
                            ref: phoneRef,
                        }}
                    />
                    {error?.phone && <p className="text-red-500 text-sm mt-1">{error.phone}</p>}
                </div>
                <div>
                    <label className="block text-sm mb-1">New Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        required
                        className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
                    />
                    {error?.password && <p className="text-red-500 text-sm mt-1">{error.password}</p>}
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
                    loading={loading}
                    label="Sign up"
                />
            </form>
        </>
    );
}
