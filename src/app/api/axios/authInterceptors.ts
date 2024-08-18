import axios, { AxiosError } from "axios";
import refreshTokenAuth from "../auth/refreshToken";

export const authAxios = axios.create();

let refreshTokenPromise: Promise<string> | null = null;
const refreshToken = refreshTokenAuth();

authAxios.interceptors.response.use(
    response => response,
    async (error) => {
        if (error.response.status === 403) {
            if (!refreshTokenPromise) {
                refreshTokenPromise = refreshToken().then(
                    (newAccessToken: string) => {
                        refreshTokenPromise = null;
                        return newAccessToken;
                    },
                    (error: AxiosError) => {
                        refreshTokenPromise = null;
                        return Promise.reject(error);
                    }
                );
            }

            return refreshTokenPromise && refreshTokenPromise.then((newAccessToken: string) =>
                axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/jwtauth`,
                    JSON.stringify({}),
                    {
                        headers: {
                            "Content-Type": "application/json",
                            authorization: `Bearer ${newAccessToken}`,
                        },
                    }
                )
            );
        }
        return Promise.reject(error);
    }
);
