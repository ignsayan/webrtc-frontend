import React from 'react';
import Button from './Button';

export default function OtpInput({
    loading,
    handleVerification,
}) {

    const inputs = React.useRef([]);

    const handleInput = (e, i) => {
        const value = e.target.value.replace(/\D/, '');
        e.target.value = value;

        if (value && i < 5) {
            inputs.current[i + 1].focus();
        }
    };

    const handleKeyDown = (e, i) => {
        if (e.key === 'Backspace' && !e.target.value && i > 0) {
            inputs.current[i - 1].focus();
        }
    };

    const verify = () => {
        const code = inputs.current.map((input) => input.value).join('');
        handleVerification(code);
    };

    return (
        <form className="space-y-6" action={verify}>
            <div className="flex justify-between space-x-2">
                {[...Array(6)].map((_, i) => (
                    <input
                        key={i} required
                        type="text"
                        maxLength={1}
                        inputMode="numeric"
                        pattern="[0-9]*"
                        onChange={(e) => handleInput(e, i)}
                        onKeyDown={(e) => handleKeyDown(e, i)}
                        ref={(el) => inputs.current[i] = el}
                        className="w-10 h-10 text-center text-xl font-bold rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-600 transition-all"
                    />
                ))}
            </div>
            <Button
                loading={loading}
                label="Verify code"
            />
        </form>
    );
}
