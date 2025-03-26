const baseUrl = import.meta.env.VITE_API_URL;

export const auth = {
    register: `${baseUrl}/register/`,
    login: `${baseUrl}/login/`,
    refresh: `${baseUrl}/refresh/`,
}

export const user = {
    detail: (id: number) => `${baseUrl}/users/${id}`,
    update: (id: number) => `${baseUrl}/users/update/${id}`,
    delete: (id: number) => `${baseUrl}/users/delete/${id}`,
    company: (id: number) => `${baseUrl}/users/company/${id}`,
}
