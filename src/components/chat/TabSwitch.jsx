import React from 'react';
import { FaUserPlus } from 'react-icons/fa';

export default function TabSwitch({
    setSearchToggle,
    setIsGroup,
    isGroup,
}) {

    const inactiveTabStyle = 'bg-gray-700 text-gray-300 hover:bg-gray-600';
    const activeTabStyle = 'bg-amber-500 text-black';

    return (
        <>
            <div className="relative mb-5 flex justify-center">
                <div className="flex overflow-hidden rounded-full shadow-xl">
                    <button
                        onClick={() => setIsGroup(false)}
                        className={`px-4 py-2 text-sm font-medium w-28 text-center
                                    ${!isGroup ? activeTabStyle : inactiveTabStyle}`}
                    >
                        Inbox
                    </button>

                    <button
                        onClick={() => setIsGroup(true)}
                        className={`px-4 py-2 text-sm font-medium w-28 text-center
                                    ${isGroup ? activeTabStyle : inactiveTabStyle}`}
                    >
                        Group
                    </button>
                </div>
                <button
                    onClick={() => setSearchToggle(true)}
                    className="absolute -top-2 bg-teal-500 text-black w-13 h-13 rounded-full
                    flex items-center justify-center border-6 border-gray-700"
                >
                    <FaUserPlus className="text-2xl" />
                </button>
            </div>
        </>
    );
}
