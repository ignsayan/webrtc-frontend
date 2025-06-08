import React from 'react'

export default function FriendListSkeleton() {

    return (
        <ul className="space-y-3 flex-1 overflow-y-auto animate-pulse">
            {Array.from({ length: 3 }).map((_, i) => (
                <li key={i} className="p-3 bg-gray-700 rounded-xl">
                    <div className="h-4 bg-gray-600 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-600 rounded w-1/2"></div>
                </li>
            ))}
        </ul>
    );
}
