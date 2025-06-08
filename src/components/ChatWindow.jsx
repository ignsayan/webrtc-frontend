import React, { Fragment, useEffect, useRef } from 'react';
import ChatWindowSkeleton from './loaders/ChatWindowSkeleton';

export default function ChatWindow({
    setSidebarOpen,
    activeChatUser,
    chats,
    handleReply,
}) {

    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chats]);

    if (!activeChatUser) return <ChatWindowSkeleton />;

    return (
        <>
            {/* Main Chat Area */}
            <main className="flex-1 flex flex-col max-h-screen">
                <div className="bg-gray-800 p-4 border-b border-gray-700 flex items-center gap-3">
                    <button
                        className="md:hidden p-2 text-white rounded hover:bg-gray-700"
                        onClick={() => setSidebarOpen(true)}
                    >
                        ☰
                    </button>
                    <img
                        src={activeChatUser.photo || `https://i.pravatar.cc/150?u=${activeChatUser.uid}`}
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <h2 className="text-lg font-semibold truncate">{activeChatUser.name}</h2>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
                    {chats.map((chat, index) => (
                        <Fragment key={index}>
                            {chat.sender !== activeChatUser.uid ? (
                                <div className="flex justify-end">
                                    <div className="bg-gray-700 rounded-xl px-4 py-2 max-w-xs">
                                        <p>{chat.message}</p>
                                        <p className="text-xs text-gray-400 mt-1">10:00 AM</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex justify-start">
                                    <div className="bg-blue-600 rounded-xl px-4 py-2 max-w-xs">
                                        <p>{chat.message}</p>
                                        <p className="text-xs text-gray-300 mt-1 text-right">10:02 AM</p>
                                    </div>
                                </div>
                            )}
                        </Fragment>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Reply Section */}
                <form className="bg-gray-800 p-3 border-t border-gray-700"
                    action={handleReply(activeChatUser.uid)}>
                    <div className="flex items-center gap-2">
                        <input
                            type="text" name="message"
                            placeholder="Type your message..."
                            className="flex-1 bg-gray-700 px-4 py-2 rounded-xl text-white focus:outline-none"
                        />
                        <button
                            className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-xl font-semibold"
                        >
                            Send
                        </button>
                    </div>
                </form>
            </main>
        </>
    );
}
