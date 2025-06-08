import React from 'react'

export default function ChatWindowSkeleton() {

    return (
        <>
            <main className="flex-1 flex flex-col max-h-screen animate-pulse bg-gray-800 text-white">
                {/* Header Skeleton */}
                <div className="bg-gray-800 p-4 border-b border-gray-700 flex items-center gap-3">
                    <div className="md:hidden w-8 h-8 bg-gray-700 rounded" />
                    <div className="w-10 h-10 bg-gray-700 rounded-full" />
                    <div className="h-5 bg-gray-700 rounded w-1/3" />
                </div>

                {/* Messages Skeleton */}
                <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                            <div className="bg-gray-700 rounded-xl px-4 py-3 max-w-xs w-3/4 h-5"></div>
                        </div>
                    ))}
                </div>

                {/* Input Skeleton */}
                <div className="bg-gray-800 p-3 border-t border-gray-700">
                    <div className="flex items-center gap-2">
                        <div className="flex-1 h-10 bg-gray-700 rounded-xl" />
                        <div className="w-20 h-10 bg-gray-700 rounded-xl" />
                    </div>
                </div>
            </main>
        </>
    );
}
