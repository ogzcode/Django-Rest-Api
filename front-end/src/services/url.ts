const baseUrl = import.meta.env.VITE_API_URL;

export const auth = {
    register: `${baseUrl}/register`,
    login: `${baseUrl}/login`,
    refresh: `${baseUrl}/refresh`,
}

export const user = `${baseUrl}/user/`
