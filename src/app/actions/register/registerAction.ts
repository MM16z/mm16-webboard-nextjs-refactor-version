'use server'

import { AxiosResponse } from "axios"
import { authApiService } from "../../api/auth/auth"

export const registerAction = async (prevState: any, formData: FormData) => {
    "use server"
    const getFormData = {
        email: formData.get('email')?.toString() || "",
        password: formData.get('password')?.toString() || "",
        username: formData.get('username')?.toString() || ""
    }
    try {
        const response: AxiosResponse = await authApiService.Register(getFormData)
        if (response.status === 200) {
            return {
                error: false,
                message: "register successfully",
                isSubmited: true
            }
        }
    } catch (error: any) {
        console.log("ERR", error)
        if (error.response.data.message.code) {
            return {
                error: true,
                code: error.response.status,
                errorCode: error.response.data.message.code,
                message: error.response.data.message.meta.target[0] ?
                    `this ${error.response.data.message.meta.target[0]} already exits` :
                    `Errror ${error.response.data.message.code} code`
                ,
                isSubmited: true
            }
        }
    }
}