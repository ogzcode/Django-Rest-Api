import { api } from '@/config/axiosConfig';
import { auth } from '@/services/url';

export const register = async (data: any) => {
    return await api.post(auth.register, data);
}

export const login = async (data: any) => {
    return await api.post(auth.login, data);
}

export const refresh = async () => {
    return await api.post(auth.refresh);
}
