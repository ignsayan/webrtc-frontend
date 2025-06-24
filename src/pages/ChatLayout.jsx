import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import socket from '../utilities/socketInstance';
import ContactList from '../components/ContactList';
import ChatStartScreen from '../components/ChatStartScreen';
import ChatWindow from '../components/ChatWindow';
import ToastNotifier from '../components/ToastNotifier';
import { logoutUser } from '../modules/auth/reducer';
import {
    resetMessages,
    getContactList,
    getChatroom,
    sendMessage,
    setMessages,
} from '../modules/chat/reducer';

export default function ChatLayout() {

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const {
        contacts,
        chatroom,
        receiver,
        messages,
        loading,
        error,
        toast,
    } = useSelector((state) => state.chat);

    useEffect(() => {
        if (!user.email_verified_at) navigate('/verification/email');
        if (!user.phone_verified_at) navigate('/verification/phone');
        dispatch(getContactList());
    }, [user]);

    const openInbox = (receiver) => async () => {
        dispatch(resetMessages());
        const data = {
            sender: user.id,
            receiver,
        };
        const response = await dispatch(getChatroom(data)).unwrap();
        socket.emit('chatroom', response.chatroom);
        socket.off('message');
        socket.on('message', (message) => dispatch(setMessages(message)));
    };

    const handleReply = async (data) => {
        const body = { ...data, chatroom };
        await dispatch(sendMessage(body)).unwrap();
    };

    const handleLogout = async () => {
        dispatch(resetMessages({ type: 'logout' }));
        await dispatch(logoutUser()).unwrap();
    };

    return (
        <>
            {user?.email_verified_at && user?.phone_verified_at &&
                <>
                    <div className="min-h-screen flex bg-gray-900 text-white overflow-hidden">
                        <ContactList
                            sidebarOpen={sidebarOpen}
                            setSidebarOpen={setSidebarOpen}
                            contacts={contacts}
                            openInbox={openInbox}
                            handleLogout={handleLogout}
                            loading={loading}
                        />
                        {!receiver
                            ? <ChatStartScreen setSidebarOpen={setSidebarOpen} />
                            : <ChatWindow
                                setSidebarOpen={setSidebarOpen}
                                sender={user}
                                receiver={receiver}
                                messages={messages}
                                handleReply={handleReply}
                            />
                        }
                    </div>
                    <ToastNotifier
                        message={toast}
                        error={error}
                    />
                </>
            }
        </>
    );
}
