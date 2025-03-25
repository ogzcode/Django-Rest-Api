import { api } from '@/config/axiosConfig';
import { user } from '@/services/url';

export const getUserById = async (id: string) => {
    return await api.get(`${user}/${id}`);
}

export const updateUserById = async (id: string, data: any) => {
    return await api.put(`${user}/${id}`, data);
}

export const deleteUserById = async (id: string) => {
    return await api.delete(`${user}/${id}`);
}
