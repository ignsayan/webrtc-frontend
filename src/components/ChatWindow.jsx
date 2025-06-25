import React, { Fragment, useEffect, useRef } from 'react';
import ChatWindowSkeleton from './loaders/ChatWindowSkeleton';

export default function ChatWindow({
    setSidebarOpen,
    sender,
    receiver,
    messages,
    handleReply,
}) {

    const messagesRef = useRef(null);

    useEffect(() => {
        const ref = messagesRef.current;
        if (ref) ref.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSubmit = (form) => {
        const data = {
            sender: sender?.id,
            receiver: receiver?._id,
            content: form.get('content'),
        };
        if (data.content) handleReply(data);
    };

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
                        src={receiver.photo || `https://ui-avatars.com/api/?name=${receiver.first_name}+${receiver.last_name}&background=random`} className="w-10 h-10 rounded-full object-cover"
                    />
                    <h2 className="text-lg font-semibold truncate">
                        {`${receiver.first_name} ${receiver.last_name}`}
                    </h2>
                </div>

                {/* Messages */}
                <div div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
                    {messages.map((message, index) => (
                        <Fragment key={index}>
                            {message.sender !== receiver._id ? (
                                <div className="flex justify-end">
                                    <div className="bg-gray-700 rounded-xl px-4 py-2 w-full sm:max-w-xs break-words">
                                        <p>{message.content}</p>
                                        <p className="text-xs text-gray-400 mt-1 text-right">
                                            {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex justify-start">
                                    <div className="bg-blue-600 rounded-xl px-4 py-2 max-w-xs break-words">
                                        <p>{message.content}</p>
                                        <p className="text-xs text-gray-300 mt-1 text-right">
                                            {new Date(message.createdAt).toLocaleTimeString([],{ hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </Fragment>
                    ))}
                    <div ref={messagesRef} />
                </div>

                {/* Reply Section */}
                <form className="bg-gray-800 p-3 border-t border-gray-700"
                    action={handleSubmit}>
                    <div className="flex items-center gap-2">
                        <input
                            type="text" name="content"
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

            </main >
        </>
    );
}
