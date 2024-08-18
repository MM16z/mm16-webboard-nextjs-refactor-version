'use server'

import { AxiosResponse } from "axios"
import { cookies } from "next/headers"
import { authApiService } from "../../api/auth/auth"

export const loginAction = async (prevState: any, formData: FormData) => {
    "use server"
    const cookieStore = cookies()
    const getFormData = {
        email: formData.get('email')?.toString() || "",
        password: formData.get('password')?.toString() || "",
    }
    try {
        const response: AxiosResponse = await authApiService.Login(getFormData)
        if (response.status === 200) {
            const token = response.data.accessToken
            cookieStore.set('token', token, { secure: true })
            return {
                error: false,
                message: "login success",
                isSubmitted: true
            }
        }
    } catch (error: any) {
        if (error.response) {
            console.log(error)
            return {
                error: true,
                code: error.response.status,
                message: error.response.data.message,
                isSubmitted: true
            }
        }
    }
}