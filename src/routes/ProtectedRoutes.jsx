import React from 'react'
import { Route, Routes } from 'react-router-dom';
import ChatLayout from '../pages/ChatLayout';

export default function PublicRoutes() {
    return (
        <>
            <Routes>
                <Route
                    exact path="/"
                    element={<ChatLayout />}
                />
            </Routes>
        </>
    );
}
