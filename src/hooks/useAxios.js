import { useState, useMemo } from 'react';
import axios from 'axios';

const useAxios = () => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const prefix = 'api';

    const axiosInstance = useMemo(() => {

        const instance = axios.create({
            baseURL: `${import.meta.env.VITE_API_URL}/${prefix}`,
        });
        instance.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('token'); // Get latest token on every request
                config.headers['Accept'] = 'application/json';
                if (token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );
        instance.interceptors.response.use(
            (response) => response,
            (error) => Promise.reject(error)
        );
        return instance;

    }, [prefix]);

    const apiHandler = async ({
        url,
        headers = {},
        method = 'get',
        data = {},
        params = {},
    }) => {
        setLoading(true);
        setError(null);
        setResponse(null);

        try {
            const result = await axiosInstance({
                url,
                method,
                headers,
                data,
                params,
            });
            setResponse(result.data);
        } catch (err) {
            setError(err?.response?.data?.errors || err.message || 'Unknown error');
        } finally {
            setLoading(false);
        }
    };

    return { response, error, loading, apiHandler }
};

export default useAxios;
