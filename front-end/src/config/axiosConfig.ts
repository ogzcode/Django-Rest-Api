import axios, { type AxiosInstance } from 'axios';

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const setupInterceptors = (api: AxiosInstance) => {
    api.interceptors.request.use(
        (config) => {   
            const token = localStorage.getItem('django-crm-token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
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
            if (error.response.status === 401) {
                localStorage.removeItem('django-crm-token');
                window.location.href = '/login';
            }
            return Promise.reject(error);
        }
    )
}
