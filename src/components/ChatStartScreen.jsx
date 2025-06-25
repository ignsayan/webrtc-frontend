import React from 'react';
import { MdChat } from 'react-icons/md';
import { FiUserPlus } from 'react-icons/fi';

export default function ChatStartScreen({ setSidebarOpen }) {
    return (
        <>
            <div className="flex-1 flex flex-col bg-gray-800 text-white">
                <div className="p-4 flex items-center">
                    <button
                        className="md:hidden mr-4 p-2 text-white rounded hover:bg-gray-700"
                        onClick={() => setSidebarOpen(true)}
                    >
                        ☰
                    </button>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center space-y-6">
                    <div className="flex flex-col items-center space-y-4">
                        <MdChat className="w-20 h-20 text-gray-500" />
                        <p className="text-gray-400 text-lg text-center px-4">
                            Select a chat to start messaging<br />or add a new user
                        </p>
                    </div>

                    <div className="w-full max-w-sm px-4">
                        <div className="flex items-center bg-gray-700 rounded-xl overflow-hidden">
                            <input
                                type="text"
                                placeholder="Search users..."
                                className="flex-1 px-4 py-2 bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
                            />
                            <button className="px-3 py-2 text-blue-400 hover:text-blue-300">
                                <FiUserPlus className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
