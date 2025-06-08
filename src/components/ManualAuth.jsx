import React from 'react'

export default function ManualAuth({
    isRegister,
    setIsRegister,
}) {

    return (
        <>
            <h1 className="text-2xl font-bold text-center mb-6">
                {isRegister ? 'Create an Account' : 'Welcome Back'}
            </h1>

            {/* Tab Switch */}
            <div className="flex justify-center gap-4 mb-6">
                <button
                    className={`text-sm font-medium px-3 py-1 rounded ${!isRegister ? 'bg-gray-700' : 'hover:bg-gray-700'
                        }`}
                    onClick={() => setIsRegister(false)}
                >
                    Login
                </button>
                <button
                    className={`text-sm font-medium px-3 py-1 rounded ${isRegister ? 'bg-gray-700' : 'hover:bg-gray-700'
                        }`}
                    onClick={() => setIsRegister(true)}
                >
                    Register
                </button>
            </div>

            {/* Form */}
            <form className="space-y-4 text-left">
                {isRegister && (
                    <div>
                        <label className="block text-sm mb-1">Name</label>
                        <input
                            type="text"
                            placeholder="Your name"
                            className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
                        />
                    </div>
                )}
                <div>
                    <label className="block text-sm mb-1">Email</label>
                    <input
                        type="email"
                        placeholder="you@example.com"
                        className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm mb-1">Password</label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold"
                >
                    {isRegister ? 'Sign Up' : 'Log In'}
                </button>
            </form>

            <div className="my-4 text-center text-sm text-gray-400">or continue</div>
        </>
    );
}
