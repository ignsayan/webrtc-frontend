import React from 'react';
import { FaUserPlus } from 'react-icons/fa';
import Button from '../common/Button';

export default function RecentChats({
    isGroup,
    setIsGroup,
    sidebarOpen,
    setSidebarOpen,
    setSearchToggle,
    recents,
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
                    fixed inset-y-0 left-0 bg-gray-800 p-4 h-screen w-65 flex flex-col
                    transform transition-transform duration-300 ease-in-out
                    md:relative md:translate-x-0 border-r border-gray-700
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                `}
            >
                {/* Close Button (responsive only) */}
                <button
                    className="md:hidden mb-5 px-4 py-1 bg-gray-700 rounded hover:bg-gray-600 shadow-xl"
                    onClick={() => setSidebarOpen(false)}
                >
                    Close ✕
                </button>

                {/* Tab Switch */}
                <div className="relative mb-5 flex justify-center">
                    <div className="flex overflow-hidden rounded-full shadow-xl">
                        <button
                            onClick={() => setIsGroup(false)}
                            className={`px-4 py-2 text-sm font-medium w-28 text-center
                                ${!isGroup ? activeTabStyle : inactiveTabStyle}`}
                        >
                            Inbox
                        </button>

                        <button
                            onClick={() => setIsGroup(true)}
                            className={`px-4 py-2 text-sm font-medium w-28 text-center
                                ${isGroup ? activeTabStyle : inactiveTabStyle}`}
                        >
                            Group
                        </button>
                    </div>
                    <button
                        onClick={() => setSearchToggle(true)}
                        className="absolute -top-2 bg-teal-500 text-black w-13 h-13 rounded-full flex items-center justify-center border-6 border-gray-700"
                    >
                        <FaUserPlus className="text-2xl" />
                    </button>
                </div>

                {/* Contact List */}
                <ul className="space-y-3 flex-1 mb-4 overflow-y-auto scrollbar-hidden">
                    {recents.map((recent, index) => (
                        <li
                            key={index} onClick={() => openInbox(recent.participants[0]?._id)}
                            className="flex items-center gap-3 p-3 bg-gray-700 rounded-full hover:bg-gray-600 cursor-pointer shadow-xl"
                        >
                            <img
                                src={recent.participants[0]?.avatar || `https://ui-avatars.com/api/?name=${recent.participants[0]?.first_name}+${recent.participants[0]?.last_name}&background=random`} className="w-10 h-10 rounded-full object-cover"
                            />
                            <div className="flex-1">
                                <div className="font-medium">
                                    {`${recent.participants[0]?.first_name} ${recent.participants[0]?.last_name}`}
                                </div>
                                <div className="text-sm text-gray-400 truncate">
                                    {recent.message?.content?.length > 15
                                        ? `${recent.message.content.substring(0, 18)} ...`
                                        : recent.message?.content || 'No messages yet'}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>

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
