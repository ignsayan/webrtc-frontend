import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FriendList from '../components/FriendList';
import ChatStartScreen from '../components/ChatStartScreen';
import ChatWindow from '../components/ChatWindow';
import { logoutUser } from '../modules/auth/reducer';
import {
    getAvailableUsers,
    getChatroomUser,
    getChatHistory,
    listenToMessages,
    resetChatState,
    sendMessage,
} from '../modules/chat/reducer';

export default function ChatLayout() {

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const {
        loading,
        users,
        activeChatRoom,
        activeChatUser,
        chats
    } = useSelector((state) => state.chat);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAvailableUsers());
    }, []);

    const openInbox = (uid) => () => {
        const currentUserId = localStorage.getItem('uid');
        dispatch(resetChatState());
        dispatch(getChatroomUser(uid));
        dispatch(getChatHistory({
            sender: currentUserId,
            receiver: uid,
        }));
        dispatch(listenToMessages({
            sender: currentUserId,
            receiver: uid,
        }));
    };

    const handleReply = (receiver) => (form) => {
        const chat = {
            sender: localStorage.getItem('uid'),
            receiver,
            message: form.get('message'),
        };
        dispatch(sendMessage(chat));
    };

    const handleLogout = () => {
        dispatch(resetChatState({ type: 'logout' }));
        dispatch(logoutUser());
    };

    return (
        <div className="min-h-screen flex bg-gray-900 text-white overflow-hidden">
            <FriendList
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                users={users}
                openInbox={openInbox}
                handleLogout={handleLogout}
                loading={loading}
            />
            {!activeChatRoom
                ? <ChatStartScreen setSidebarOpen={setSidebarOpen} />
                : <ChatWindow
                    setSidebarOpen={setSidebarOpen}
                    activeChatUser={activeChatUser}
                    chats={chats}
                    handleReply={handleReply}
                />
            }
        </div>
    );
}
