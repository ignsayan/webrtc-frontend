import React from 'react'
import { MdChat } from 'react-icons/md';

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
                <div className="flex-1 flex flex-col items-center justify-center">
                    <div className="flex flex-col items-center space-y-4">
                        <MdChat className="w-20 h-20 text-gray-500" />
                        <p className="text-gray-400 text-lg">Select a chat to start messaging</p>
                    </div>
                </div>
            </div>
        </>
    );
}
