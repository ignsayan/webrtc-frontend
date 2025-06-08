import React, { useState } from 'react';

export default function ChatLayout() {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen flex bg-gray-900 text-white overflow-hidden">
            <aside
                className={`
                    fixed inset-y-0 left-0 bg-gray-800 p-4 overflow-y-auto h-screen w-64
                    transform transition-transform duration-300 ease-in-out
                    md:relative md:translate-x-0
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                `}
            >
                <button
                    className="md:hidden mb-4 px-2 py-1 bg-gray-700 rounded hover:bg-gray-600"
                    onClick={() => setSidebarOpen(false)}
                >
                    Close ✕
                </button>
                <h2 className="text-xl font-semibold mb-4">Chats</h2>
                <ul className="space-y-3">
                    {[...Array(20)].map((_, i) => (
                        <li key={i} className="p-3 bg-gray-700 rounded-xl hover:bg-gray-600 cursor-pointer">
                            <div className="font-medium">User {i + 1}</div>
                            <div className="text-sm text-gray-400 truncate">Last message preview...</div>
                        </li>
                    ))}
                </ul>
            </aside>

            {/* Main Chat Area */}
            <main className="flex-1 flex flex-col max-h-screen">
                {/* Chat Header */}
                <div className="bg-gray-800 p-4 border-b border-gray-700 flex items-center">
                    {/* Hamburger button for mobile */}
                    <button
                        className="md:hidden mr-4 p-2 text-white rounded hover:bg-gray-700"
                        onClick={() => setSidebarOpen(true)}
                    >
                        ☰
                    </button>
                    <h2 className="text-lg font-semibold">Chat with Jane Doe</h2>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
                    {/* Example messages */}
                    <div className="flex justify-start">
                        <div className="bg-gray-700 rounded-xl px-4 py-2 max-w-xs">
                            <p>Hello! 👋</p>
                            <p className="text-xs text-gray-400 mt-1">10:00 AM</p>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <div className="bg-blue-600 rounded-xl px-4 py-2 max-w-xs">
                            <p>Hi! How can I help?</p>
                            <p className="text-xs text-gray-300 mt-1 text-right">10:02 AM</p>
                        </div>
                    </div>
                    {/* Add more messages here */}
                </div>

                {/* Input */}
                <form className="bg-gray-800 p-3 border-t border-gray-700">
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            className="flex-1 bg-gray-700 px-4 py-2 rounded-xl text-white focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-xl font-semibold"
                        >
                            Send
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}
