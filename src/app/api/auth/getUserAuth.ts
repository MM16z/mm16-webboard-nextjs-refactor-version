import { authAxios } from "../axios/authInterceptors";
import { cookies } from 'next/headers'

const getUserAuth = async () => {
    const cookieStore = cookies()
    const jwtToken = cookieStore.get('token')

    try {
        const response = await authAxios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/jwtauth`,
            JSON.stringify({}),
            {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${jwtToken}`,
                },
            }
        )
        return response
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to get user auth: ${error.message}`);
        } else {
            throw new Error(`Failed to get user auth: ${String(error)}`);
        }
    }
};


export default getUserAuth;
