import axios from "axios";
import Cookies from 'js-cookie'

export const apiAxios = axios.create(
    {
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        withCredentials: true
    }
);

apiAxios.interceptors.response.use(
    response => response,
    async (error) => {
        if (error.response?.status === 401) {
            Cookies.set('jwtToken', '', { secure: true })
            return Promise.reject(error);
        }
        return Promise.reject(error);
    }
)

const apiService = () => {
    return apiAxios;
}

export default apiService