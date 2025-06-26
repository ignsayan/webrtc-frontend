import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { disconnectSocket } from '../utilities/socketInstance';
import ContactList from '../components/ContactList';
import ChatStartScreen from '../components/ChatStartScreen';
import ChatWindow from '../components/ChatWindow';
import ToastNotifier from '../components/ToastNotifier';
import { logoutUser } from '../modules/auth/reducer';
import {
    resetMessages,
    getContactList,
    generateRoom,
    getInboxDetail,
    sendMessage,
    listenToMessage,
} from '../modules/chat/reducer';

export default function ChatLayout() {

    const [isGroup, setIsGroup] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const {
        contacts,
        chatroom,
        receiver,
        messages,
        activity,
        loading,
        error,
        toast,
    } = useSelector((state) => state.chat);

    useEffect(() => {
        if (!user.email_verified_at) navigate('/verification/email');
        if (!user.phone_verified_at) navigate('/verification/phone');
        (async () => {
            await dispatch(getContactList({ isGroup })).unwrap();
        })();
    }, [user, isGroup]);

    const openInbox = (receiver) => async () => {
        dispatch(resetMessages());

        const response = await dispatch(generateRoom({
            sender: user.id,
            receiver,
        })).unwrap();

        await dispatch(getInboxDetail({
            chatroom: response.room,
            sender: user.id,
        })).unwrap();

        await dispatch(listenToMessage(response.room)).unwrap();
    };

    const handleReply = async (data) => {
        const body = { ...data, chatroom };
        await dispatch(sendMessage(body)).unwrap();
    };

    const handleLogout = async () => {
        dispatch(resetMessages({ type: 'logout' }));
        await dispatch(logoutUser()).unwrap();
        disconnectSocket();
    };

    return (
        <>
            {user?.email_verified_at && user?.phone_verified_at &&
                <>
                    <div className="min-h-screen flex bg-gray-900 text-white overflow-hidden">
                        <ContactList
                            sidebarOpen={sidebarOpen}
                            setSidebarOpen={setSidebarOpen}
                            isGroup={isGroup}
                            setIsGroup={setIsGroup}
                            contacts={contacts}
                            openInbox={openInbox}
                            handleLogout={handleLogout}
                            loading={loading}
                        />
                        {!receiver
                            ? <ChatStartScreen setSidebarOpen={setSidebarOpen} />
                            : <ChatWindow
                                chatroom={chatroom}
                                activity={activity}
                                sidebarOpen={sidebarOpen}
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
