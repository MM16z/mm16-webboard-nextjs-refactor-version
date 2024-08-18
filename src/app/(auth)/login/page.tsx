'use client'
import '@/app/styles/login/login.css'

// react, nextjs
import React, { useEffect } from 'react'
import { useFormState } from 'react-dom'
import { useRouter } from 'next/navigation'
// components
import AuthForm from '@/app/components/auth/AuthForm'
// actions
import { loginAction } from '@/app/actions/login/loginAction'
// fonts
import { silkscreen } from '@/app/fonts'
// utils
import swal from "sweetalert2";


function LoginPage() {
    const initialState = { isSubmitted: false, error: false, message: '' }
    const [serverState, formActions] = useFormState(loginAction, initialState)

    const router = useRouter()

    useEffect(() => {
        if (serverState?.isSubmitted) {
            if (serverState?.error) {
                swal.fire({
                    icon: 'error',
                    title: 'xdding?',
                    text: `Login failed! - Error ${serverState.message}`,
                })
                return
            } else {
                swal.fire({
                    icon: 'success',
                    title: 'xdding?',
                    text: `Login success!`,
                })
                router.push('/')
                return
            }
        }
    }, [serverState])

    return (
        <div className={`${silkscreen.className} flex flex-col w-full h-full justify-center justify-items-center p-8 gap-y-4`}>
            <AuthForm pageType='login' onFormSubmit={formActions} />
        </div>
    )
}

export default LoginPage