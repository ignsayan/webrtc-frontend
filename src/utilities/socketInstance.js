import { io } from 'socket.io-client';

let socket;

export const getSocket = () => {
    if (!socket) {
        socket = io(import.meta.env.VITE_API_URL, {
            autoConnect: true,
            transports: ['websocket'],
        });
    }
    return socket;
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};
