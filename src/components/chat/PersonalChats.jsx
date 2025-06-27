import React from 'react';

export default function PersonalChats({
    openInbox,
    recents,
}) {

    return (
        <>
            {recents.map((recent, index) => (
                <li
                    key={index} onClick={() => openInbox(recent.participants[0]?._id)}
                    className="flex items-center gap-3 p-3 bg-gray-700 rounded-full hover:bg-gray-600 cursor-pointer shadow-xl"
                >
                    <img
                        src={recent.participants[0]?.avatar || `https://ui-avatars.com/api/?name=${recent.participants[0]?.first_name}+${recent.participants[0]?.last_name}&background=random`} className="w-10 h-10 rounded-full object-cover shadow-md"
                    />
                    <div className="flex-1">
                        <div className="font-medium">
                            {`${recent.participants[0]?.first_name} ${recent.participants[0]?.last_name}`}
                        </div>
                        <div className="text-sm text-gray-400 truncate">
                            {recent.message?.content?.length > 15
                                ? `${recent.message.content.substring(0, 18)} ...`
                                : recent.message?.content || 'No messages yet'}
                        </div>
                    </div>
                </li>
            ))}
        </>
    );
}
