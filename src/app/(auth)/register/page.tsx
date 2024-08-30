'use client'

// react
import React, { useEffect } from 'react'

// fonts
import { silkscreen } from '@/fonts/fonts'

// components
import AuthForm from '@/components/form/AuthForm'

// actions

// utils
import swal from "sweetalert2";
import { AxiosResponse } from 'axios'
import { authApiService } from '@/api/auth/auth'
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

function RegisterPage() {
    const router = useRouter();
    const onSubmitHandler = async (value: any) => {
        try {
            const response: AxiosResponse = await authApiService.Register(value)
            if (response.status === 201) {

                swal.fire({
                    icon: 'success',
                    title: 'xdding?',
                    text: `Register success!`,
                })
                return router.push('/login')
            }
        } catch (error: any) {
            console.log("ERR", error)
            if (error) {
                return swal.fire({
                    icon: 'error',
                    title: 'xdding?',
                    text: error.response.data.message,
                })
            }
        }
    }

    useEffect(() => {
        const token = Cookies.get('u_auth_status')
        if (token === 'active') {
            router.push('/user-dashboard')
        }
    }, [router])

    return (
        <div className={`${silkscreen.className} flex flex-col w-full h-full justify-center justify-items-center p-8 gap-y-4`}>
            <AuthForm pageType='register' onFormSubmit={onSubmitHandler} />
        </div>
    )
}

export default RegisterPage