import { type } from "../url";
import { api } from "@/config/axiosConfig";

export const getAllTypes = async () => {
    return await api.get(type.getAll);
}

export const createType = async (data: any) => {
    return await api.post(type.create, data);
}

export const updateType = async (id: number, data: any) => {
    return await api.put(type.update(id), data);
}

export const deleteType = async (id: number) => {
    return await api.delete(type.delete(id));
}


