import { useState } from 'react';
import axiosInstance from '../utilities/axiosInstance';

const useAxios = () => {

    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const apiHandler = async ({
        url,
        method = 'get',
        data = {},
        params = {},
        headers = {},
    }) => {

        setLoading(true);
        setResponse(null);
        setError(null);
        try {
            const result = await axiosInstance({
                url,
                method,
                data,
                params,
                headers,
            });
            setResponse(result.data);

        } catch (error) {
            setError(error);

        } finally {
            setLoading(false);
        }
    };

    return {
        apiHandler,
        loading,
        response,
        error,
    };
};

export default useAxios;
