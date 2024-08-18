'use client'
import '@/app/styles/login/login.css'

// react
import React, { useEffect } from 'react'
import { useFormState } from 'react-dom'

// fonts
import { silkscreen } from '@/app/fonts'

// components
import AuthForm from '@/app/components/auth/AuthForm'

// actions
import { registerAction } from '@/app/actions/register/registerAction'

// utils
import swal from "sweetalert2";

function RegisterPage() {
    const initialState = { isSubmited: false, error: false, message: '', code: undefined, errorCode: undefined }
    const [serverState, formActions] = useFormState(registerAction, initialState)

    useEffect(() => {
        if (serverState?.isSubmited) {
            if (serverState?.errorCode) {
                swal.fire({
                    icon: 'error',
                    title: 'xdding?',
                    text: `${serverState.message}`,
                })
                return
            }
            swal.fire({
                icon: 'success',
                title: 'xdding?',
                text: `Register success!`,
            })
            return
        }
    }, [serverState])

    return (
        <div className={`${silkscreen.className} flex flex-col w-full h-full justify-center justify-items-center p-8 gap-y-4`}>
            <AuthForm pageType='register' onFormSubmit={formActions} />
        </div>
    )
}

export default RegisterPage