import React, { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { clearFeedback } from '../modules/auth/reducer';
import { useDispatch } from 'react-redux';

export default function ToastNotifier({
    message,
    error,
    position = 'bottom-center',
}) {

    const dispatch = useDispatch();
    const theme = {
        style: {
            border: '2px rgb(42, 55, 73) solid',
            padding: '16px',
            background: 'rgb(42, 55, 73)',
            color: '#fff',
        },
    };

    useEffect(() => {
        if (error && !error.errors) {
            toast.error(error.message, theme);
            dispatch(clearFeedback());
        }
        if (message) {
            toast.success(message, theme);
            dispatch(clearFeedback());
        }
    }, [error, message]);

    return (
        <>
            <Toaster position={position} />
        </>
    );
}
