import { LoginModelType, RegisterModelType } from "@/models/loginModel";
import apiService from "../axios/apiIntereptors";

const AUTH_BASE_URL = process.env.NEXT_PUBLIC_API_URL + '/auth';

export const authApiService = {
    Login,
    Register,
    Logout
}
async function Login(payload: LoginModelType) {
    const response = await apiService().post(`${AUTH_BASE_URL}/login`, JSON.stringify(payload), {
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true
    });
    return response;
}

async function Register(payload: RegisterModelType) {
    const response = await apiService().post(`${AUTH_BASE_URL}/register`, JSON.stringify(payload), {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response;
}

async function Logout() {
    const response = await apiService().post(`${AUTH_BASE_URL}/logout`, {
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true
    });
    return response;
}

