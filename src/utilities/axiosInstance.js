import axios from 'axios';

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
    (error) => Promise.reject(error)
);

export default axiosInstance;