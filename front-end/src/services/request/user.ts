import { api } from '@/config/axiosConfig';
import { user } from '@/services/url';

export const getUserById = async (id: number) => {
    return await api.get(user.detail(id));
}

export const updateUserById = async (id: number, data: any) => {
    return await api.put(user.update(id), data);
}

export const deleteUserById = async (id: number) => {
    return await api.delete(user.delete(id));
}

export const getUserCompanyById = async (id: number) => {
    return await api.get(user.company(id));
}
