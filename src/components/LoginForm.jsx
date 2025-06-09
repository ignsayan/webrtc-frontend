import React from 'react'

export default function LoginForm({
    loading,
    handleLogin,
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
                        type="email" name="email" required
                        placeholder="you@example.com"
                        className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm mb-1">Password</label>
                    <input
                        type="password" name="password" required
                        placeholder="••••••••"
                        className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 rounded bg-blue-600 text-white font-semibold flex items-center justify-center gap-2
                        ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-500'}`}
                >
                    {loading && (
                        <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12" cy="12" r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 
                                5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 
                                3 7.938l3-2.647z"
                            ></path>
                        </svg>
                    )}
                    Log in
                </button>
            </form>
        </>
    );
}
