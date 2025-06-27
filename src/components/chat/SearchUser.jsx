import React, { useState } from 'react';
import { FiUserPlus } from 'react-icons/fi';
import { MdChat } from 'react-icons/md';

export default function SearchUser({
    setSidebarOpen,
    findNewUsers,
    openInbox,
    users,
}) {

    const [key, setKey] = useState('');

    const handleFormInput = (event) => {
        setKey(event.target.value.trim());
        if (key.length > 3) findNewUsers(key);
    };

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
                        <div className="flex items-center bg-gray-700 rounded-xl overflow-hidden shadow-xl">
                            <input
                                type="text" required
                                placeholder="Search users..."
                                className="flex-1 px-4 py-2 bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
                                onChange={handleFormInput}
                            />
                            <span className="px-3 py-2 text-blue-400">
                                <FiUserPlus className="w-5 h-5" />
                            </span>
                        </div>

                        <div className="mt-4 max-h-84 overflow-y-auto bg-gray-700 rounded-xl shadow-xl scrollbar-hidden">
                            <ul>
                                {key.length > 3 && users && users.map((user, index) => (
                                    <li
                                        key={index} onClick={() => openInbox(user._id)}
                                        className="p-3 hover:bg-gray-600 cursor-pointer flex items-center space-x-3"
                                    >
                                        <img
                                            src={user.photo || `https://ui-avatars.com/api/?name=${user.first_name}+${user.last_name}&background=random`}
                                            className="w-8 h-8 rounded-full shadow-xl"
                                        />
                                        <span>{`${user.first_name} ${user.last_name}`}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
