import React from 'react';

export default function Button({
    type = 'submit',
    onClick,
    loading,
    label,
    buttonColor = 'bg-blue-600',
    hoverColor = 'bg-blue-500',
    shape = 'rounded-xl',
}) {

    return (
        <button
            type={type} disabled={loading} onClick={onClick}
            className={`w-full py-2 text-white shadow-full font-semibold flex items-center justify-center gap-2
                ${shape} ${buttonColor} ${loading ? `opacity-70 cursor-not-allowed` : `hover:${hoverColor}`}`}
        >
            {loading && (
                <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12" cy="12" r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 
                                5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 
                                3 7.938l3-2.647z"
                    ></path>
                </svg>
            )}
            {label}
        </button>
    );
}

