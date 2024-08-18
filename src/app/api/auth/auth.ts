import { LoginModelType, RegisterModelType } from "@/app/models/loginModel";
import apiService from "../axios/apiIntereptors";


export const authApiService = {
    Login,
    Register
}
async function Login(payload: LoginModelType) {
    const response = await apiService().post(`${process.env.NEXT_PUBLIC_API_URL}/login`, JSON.stringify(payload), {
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true
    });
    return response;
}

async function Register(payload: RegisterModelType) {
    const response = await apiService().post(`${process.env.NEXT_PUBLIC_API_URL}/register`, JSON.stringify(payload), {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response;
}