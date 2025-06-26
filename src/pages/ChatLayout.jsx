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
    getRecentChats,
    generateRoom,
    getInboxDetail,
    sendMessage,
    listenToMessage,
    searchUsers,
} from '../modules/chat/reducer';

export default function ChatLayout() {

    const [isGroup, setIsGroup] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const {
        users,
        recentChats,
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
            await dispatch(getRecentChats({ isGroup })).unwrap();
        })();
    }, [user, isGroup]);

    const findNewUsers = async (key) => {
        await dispatch(searchUsers({
            sender: user.id, key,
        })).unwrap();
    };

    const openInbox = async (receiver) => {
        dispatch(resetMessages());

        const response = await dispatch(generateRoom({
            sender: user.id, receiver,
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
                            recentChats={recentChats}
                            openInbox={openInbox}
                            handleLogout={handleLogout}
                            loading={loading}
                        />
                        {!receiver
                            ? <ChatStartScreen
                                setSidebarOpen={setSidebarOpen}
                                findNewUsers={findNewUsers}
                                openInbox={openInbox}
                                users={users}
                            />
                            : <ChatWindow
                                sidebarOpen={sidebarOpen}
                                setSidebarOpen={setSidebarOpen}
                                chatroom={chatroom}
                                sender={user}
                                receiver={receiver}
                                messages={messages}
                                handleReply={handleReply}
                                activity={activity}
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
