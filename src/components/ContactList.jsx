import React from 'react';
import ContactListSkeleton from './loaders/ContactListSkeleton';
import Button from './Button';

export default function ContactList({
    isGroup,
    setIsGroup,
    sidebarOpen,
    setSidebarOpen,
    recentChats,
    openInbox,
    handleLogout,
    loading,
}) {

    const activeTabStyle = 'bg-amber-500 text-black';
    const inactiveTabStyle = 'bg-gray-700 text-gray-300 hover:bg-gray-600';

    return (
        <>
            <aside
                className={`
                    fixed inset-y-0 left-0 bg-gray-800 p-4 h-screen w-64 flex flex-col
                    transform transition-transform duration-300 ease-in-out
                    md:relative md:translate-x-0 border-r border-gray-700
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                `}
            >
                {/* Close Button (responsive only) */}
                <button
                    className="md:hidden mb-4 px-4 py-1 bg-gray-700 rounded hover:bg-gray-600 shadow-xl"
                    onClick={() => setSidebarOpen(false)}
                >
                    Close ✕
                </button>

                {/* Tab Switch */}
                <div className="flex justify-between mb-4">
                    <button
                        onClick={() => setIsGroup(false)}
                        className={`w-1/2 px-2 py-2 rounded-l-full text-center text-sm font-medium shadow-xl
                        ${!isGroup ? activeTabStyle : inactiveTabStyle}`}
                    >
                        Inbox
                    </button>
                    <button
                        onClick={() => setIsGroup(true)}
                        className={`w-1/2 px-2 py-2 rounded-r-full text-center text-sm font-medium shadow-xl
                        ${isGroup ? activeTabStyle : inactiveTabStyle}`}
                    >
                        Group
                    </button>
                </div>

                {/* Contact List */}
                {recentChats
                    ? <ul className="space-y-3 flex-1 mb-4 overflow-y-auto scrollbar-hidden">
                        {recentChats.map((user, index) => (
                            <li
                                key={index} onClick={() => openInbox(user._id)}
                                className="flex items-center gap-3 p-3 bg-gray-700 rounded-full hover:bg-gray-600 cursor-pointer shadow-xl"
                            >
                                <img
                                    src={user.photo || `https://ui-avatars.com/api/?name=${user.first_name}+${user.last_name}&background=random`} className="w-10 h-10 rounded-full object-cover"
                                />
                                <div className="flex-1">
                                    <div className="font-medium">
                                        {`${user.first_name} ${user.last_name}`}
                                    </div>
                                    <div className="text-sm text-gray-400 truncate">
                                        {user.last_message || 'No messages yet'}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    : <ContactListSkeleton />
                }

                {/* Logout Button */}
                <Button
                    onClick={handleLogout}
                    buttonColor="bg-rose-600"
                    hoverColor="bg-rose-500"
                    loading={loading}
                    label="Logout"
                />
            </aside>
        </>
    );
}
