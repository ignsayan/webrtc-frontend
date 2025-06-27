import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { disconnectSocket } from '../utilities/socketInstance';
import SearchUser from '../components/chat/SearchUser';
import RecentChats from '../components/chat/RecentChats';
import ChatWindow from '../components/chat/ChatWindow';
import ToastNotifier from '../components/common/ToastNotifier';
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
    const [searchToggle, setSearchToggle] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const {
        recents,
        users,
        chatroom,
        receiver,
        messages,
        activity,
        loading,
        error,
        toast,
    } = useSelector((state) => state.chat);

    useEffect(() => {
        if (!user.email_verified_at) return navigate('/verification/email');
        if (!user.phone_verified_at) return navigate('/verification/phone');
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
        setSearchToggle(false);
        dispatch(resetMessages());
        const response = await dispatch(generateRoom({
            sender: user.id, receiver,
        })).unwrap();
        await dispatch(getInboxDetail({
            chatroom: response.room,
            sender: user.id,
        })).unwrap();
        await dispatch(listenToMessage(
            response.room,
        )).unwrap();
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
                        <RecentChats
                            sidebarOpen={sidebarOpen}
                            setSidebarOpen={setSidebarOpen}
                            setSearchToggle={setSearchToggle}
                            isGroup={isGroup}
                            setIsGroup={setIsGroup}
                            recents={recents}
                            openInbox={openInbox}
                            handleLogout={handleLogout}
                            loading={loading}
                        />
                        {searchToggle || !receiver
                            ? <SearchUser
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
