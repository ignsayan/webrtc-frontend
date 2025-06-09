const errorParser = (error) => {

    const data = error?.response?.data;
    const status = error?.response?.status || 500;

    if (data?.error && typeof data.error === 'object') {
        const simplifiedErrors = Object.fromEntries(
            Object.entries(data.error).map(([field, messages]) => [
                field,
                Array.isArray(messages) ? messages[0] : messages,
            ])
        );
        return {
            message: 'Validation error',
            status,
            errors: simplifiedErrors,
        };
    }

    const message = data?.error || error.message || 'Something went wrong';
    return {
        message,
        status,
        errors: null,
    };
};

export default errorParser;