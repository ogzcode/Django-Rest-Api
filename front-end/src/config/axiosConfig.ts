import axios, { type AxiosInstance } from 'axios';
import { getCRMToken } from './tokenConfig';

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const setupInterceptors = (api: AxiosInstance) => {
    api.interceptors.request.use(
        async (config) => {   
            const token = await getCRMToken()
            if (token) {
                config.headers.Authorization = `Bearer ${token.access}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    )
    api.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error.response?.status === 401 && window.location.pathname !== '/login') {
                localStorage.removeItem('django-crm-token');
                window.location.href = '/login';
            }
            return Promise.reject(error);
        }
    )
}
