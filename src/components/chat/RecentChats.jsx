import React, { useEffect, useRef, useState } from 'react';
import TabSwitch from './TabSwitch';
import PersonalChats from './PersonalChats';
import GroupChats from './GroupChats';
import Button from '../common/Button';

export default function RecentChats({
    setSearchToggle,
    sidebarOpen,
    setSidebarOpen,
    recents,
    openInbox,
    handleLogout,
    loading,
}) {

    const [isGroup, setIsGroup] = useState(false);
    const sidebarRef = useRef(null);

    useEffect(() => {
        const handler = (event) => {
            const current = sidebarRef.current;
            if (current && !current.contains(event.target)) {
                setSidebarOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [sidebarOpen]);


    return (
        <>
            <aside
                ref={sidebarRef}
                className={`
                    fixed inset-y-0 left-0 bg-gray-800 p-4 h-screen w-65 flex flex-col
                    transform transition-transform duration-300 ease-in-out
                    md:relative md:translate-x-0 border-r border-gray-700
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                `}
            >
                {/* Switch Tabs & Search */}
                <TabSwitch
                    setSearchToggle={setSearchToggle}
                    setIsGroup={setIsGroup}
                    isGroup={isGroup} />

                {/* Contact List */}
                <ul className="space-y-3 flex-1 mb-4 overflow-y-auto scrollbar-hidden">
                    {!isGroup
                        ? <PersonalChats
                            openInbox={openInbox}
                            recents={recents}
                        />
                        : <GroupChats
                            openInbox={openInbox}
                            recents={recents}
                        />
                    }
                </ul>

                {/* Logout Button */}
                <Button
                    onClick={handleLogout}
                    buttonColor="bg-rose-600"
                    hoverColor="bg-rose-500"
                    loading={loading}
                    label="Logout"
                />
            </aside>
        </>
    );
}
