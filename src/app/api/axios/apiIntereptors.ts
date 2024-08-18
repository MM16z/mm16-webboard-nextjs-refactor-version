import axios from "axios";
import { cookies } from 'next/headers'

export const apiAxios = axios.create(
    {
        baseURL: process.env.NEXT_PUBLIC_API_URL
    }
);

apiAxios.interceptors.response.use(
    response => response,
    async (error) => {
        console.log("API INTERCEPT ERR", error)

        if (error.response?.status === 401) {
            cookies().set('token', '', { secure: true })
            return Promise.reject(error);
        }
        return Promise.reject(error);
    }
)

const apiService = () => {
    const token = cookies().get('token')
    if (!token) {
        delete apiAxios.defaults.headers.common['Authorization']
    } else {
        apiAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
    return apiAxios;
}

export default apiService