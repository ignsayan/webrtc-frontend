import React, { Fragment, useEffect, useRef } from 'react';
import { getSocket } from '../../utilities/socketInstance';
import { IoSend } from 'react-icons/io5'

export default function ChatWindow({
    chatroom,
    activity,
    sidebarOpen,
    setSidebarOpen,
    sender,
    receiver,
    messages,
    handleReply,
}) {

    const messagesRef = useRef(null);
    const typingTimeoutRef = useRef(null);
    const socket = getSocket();

    useEffect(() => {
        const ref = messagesRef.current;
        if (ref) ref.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSubmit = (form) => {
        const data = {
            sender: sender.id,
            receiver: receiver._id,
            content: form.get('content'),
        };
        if (data.content) {
            handleReply(data);
            socket.emit('stop:typing', chatroom);
        }
    };

    const handleTyping = () => {
        socket.emit('start:typing', {
            chatroom,
            user: {
                id: sender.id,
                name: sender.first_name,
            },
            typing: true,
        });
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => {
            socket.emit('stop:typing', chatroom);
        }, 1500);
    };

    return (
        <>
            {/* Header Section */}
            <main className="flex-1 flex flex-col max-h-screen">
                <div
                    className={`
                        bg-gray-800 p-3 border-gray-700 gap-3 h-18 flex items-center
                        transition-all duration-200 ease-in-out
                        ${sidebarOpen ? 'opacity-0 -translate-y-0 pointer-events-none' : 'opacity-100 translate-y-0'}
                        md:opacity-100 md:translate-y-0 md:pointer-events-auto
                    `}
                >
                    <button
                        className="md:hidden p-2 text-white rounded hover:bg-gray-700"
                        onClick={() => setSidebarOpen(true)}
                    >
                        ☰
                    </button>
                    <img
                        src={receiver.avatar || `https://ui-avatars.com/api/?name=${receiver.first_name}+${receiver.last_name}&background=random`}
                        className="w-12 h-12 rounded-full object-cover shadow-sm"
                    />
                    <div className="relative flex flex-col justify-center truncate overflow-hidden">
                        <span className="text font-semibold mb-2">
                            {`${receiver.first_name} ${receiver.last_name}`}
                        </span>
                        <span className="text-md text-gray-400 leading-1 h-3">
                            {activity?.typing && activity.user.id !== sender.id ? 'typing...' : 'online'}
                        </span>
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 custom-scrollbar">
                    {messages && typeof (messages) === 'object' && messages.map((message, index) => (
                        <Fragment key={index}>
                            {message.sender !== receiver._id ? (
                                <div className="flex justify-end">
                                    <div className="bg-gray-700 rounded-xl px-3 py-2 sm:max-w-md break-words">
                                        <p>{message.content}</p>
                                        <p className="text-xs text-gray-400 mt-1 text-right">
                                            {new Date(message.createdAt).toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex justify-start">
                                    <div className="bg-teal-900 rounded-xl px-3 py-2 sm:max-w-md break-words">
                                        <p>{message.content}</p>
                                        <p className="text-xs text-gray-300 mt-1 text-right">
                                            {new Date(message.createdAt).toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </Fragment>
                    ))}
                    <div ref={messagesRef} />
                </div>

                {/* Reply Section */}
                <form className="bg-gray-900 px-4 mt-2 mb-4 border-gray-700"
                    action={handleSubmit}>
                    <div className="flex items-center gap-4">
                        <input
                            type="text" name="content"
                            placeholder="Type your message..."
                            className="flex-1 bg-gray-700 px-4 py-2 rounded-xl text-white focus:outline-none"
                            onChange={handleTyping}
                        />
                        <button
                            className="bg-teal-700 hover:bg-teal-600 p-3 rounded-full">
                            <IoSend className="w-5 h-5 text-white" />
                        </button>
                    </div>
                </form>
            </main>
        </>
    );
}
