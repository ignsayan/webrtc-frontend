import React, { useEffect, useState } from 'react';

export default function PersonalChats({
    openInbox,
    recents,
}) {

    const [chats, setChats] = useState([]);

    useEffect(() => {
        const chats = recents.filter((recent) => !recent.isGroup)
            .map((recent) => {
                const { participants, ...rest } = recent;
                const [user] = participants;
                return { ...rest, user };
            });
        setChats(chats);
    }, [recents]);

    return (
        <>
            {chats && chats.map((chat, index) => (
                <li
                    key={index} onClick={() => openInbox(chat.user._id)}
                    className="flex items-center gap-3 p-3 bg-gray-700 rounded-full hover:bg-gray-600 cursor-pointer shadow-xl"
                >
                    <img
                        src={chat.user.avatar || `https://ui-avatars.com/api/?name=${chat.user.first_name}+${chat.user.last_name}&background=random`} className="w-10 h-10 rounded-full object-cover shadow-md"
                    />
                    <div className="flex-1">
                        <div className="font-medium">
                            {`${chat.user.first_name} ${chat.user.last_name}`}
                        </div>
                        <div className="text-sm text-gray-400 truncate">
                            {chat.message?.content?.length > 15
                                ? `${chat.message.content.substring(0, 18)} ...`
                                : chat.message?.content || 'No messages yet'}
                        </div>
                    </div>
                </li>
            ))}
        </>
    );
}
