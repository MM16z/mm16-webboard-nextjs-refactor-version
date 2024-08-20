import axios from "axios";
// import { cookies } from 'next/headers'
import Cookies from 'js-cookie'

export const refreshAxios = axios.create();


const refreshTokenAuth = () => {

    const refreshToken = async () => {

        const response = await refreshAxios.post(`${process.env.NEXT_PUBLIC_API_URL}/refreshjwtauth`,
            JSON.stringify({}), {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        });

        refreshAxios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`
        // cookies().set('token', response.data.accessToken, { secure: true })
        Cookies.set('token', response.data.accessToken, { secure: true })
        return response.data.accessToken;
    }
    return refreshToken;
}

export default refreshTokenAuth