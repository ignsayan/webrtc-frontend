import axios from 'axios';
import errorParser from './errorParser';

const prefix = 'api';

const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/${prefix}`,
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    config.headers['Accept'] = 'application/json';
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));


axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const parsedError = errorParser(error);
        return Promise.reject(parsedError);
    }
);

export default axiosInstance;