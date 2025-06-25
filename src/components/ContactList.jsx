import React, { useState } from 'react';
import ContactListSkeleton from './loaders/ContactListSkeleton';

export default function ContactList({
    isGroup,
    setIsGroup,
    sidebarOpen,
    setSidebarOpen,
    contacts,
    openInbox,
    handleLogout,
    loading,
}) {

    const activeTabStyle = 'bg-gray-700 text-white';
    const inactiveTabStyle = 'bg-gray-600 text-gray-300 hover:bg-gray-500';

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
                    className="md:hidden mb-4 px-4 py-1 bg-gray-700 rounded hover:bg-gray-600"
                    onClick={() => setSidebarOpen(false)}
                >
                    Close ✕
                </button>

                {/* Tab Switch */}
                <div className="flex justify-between mb-4">
                    <button
                        onClick={() => setIsGroup(false)}
                        className={`w-1/2 px-2 py-2 rounded-l-xl text-center text-sm font-medium
                        ${!isGroup ? activeTabStyle : inactiveTabStyle}`}
                    >
                        Inbox
                    </button>
                    <button
                        onClick={() => setIsGroup(true)}
                        className={`w-1/2 px-2 py-2 rounded-r-xl text-center text-sm font-medium
                        ${isGroup ? activeTabStyle : inactiveTabStyle}`}
                    >
                        Group
                    </button>
                </div>

                {/* Contact List */}
                {contacts && contacts.length > 0
                    ? <ul className="space-y-3 flex-1 overflow-y-auto">
                        {contacts.map((contact, i) => (
                            <li
                                key={i}
                                onClick={openInbox(contact._id)}
                                className="flex items-center gap-3 p-3 bg-gray-700 rounded-xl hover:bg-gray-600 cursor-pointer"
                            >
                                <img
                                    src={contact.photo || `https://ui-avatars.com/api/?name=${contact.first_name}+${contact.last_name}&background=random`} className="w-10 h-10 rounded-full object-cover"
                                />
                                <div className="flex-1">
                                    <div className="font-medium">
                                        {`${contact.first_name} ${contact.last_name}`}
                                    </div>
                                    <div className="text-sm text-gray-400 truncate">
                                        {contact.last_message || 'No messages yet'}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    : <ContactListSkeleton />
                }

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-500 rounded-xl font-semibold text-white"
                    disabled={loading}
                >
                    {loading ? (
                        <div className="flex items-center justify-center">
                            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Logout
                        </div>
                    ) : 'Logout'}
                </button>
            </aside>
        </>
    );
}
