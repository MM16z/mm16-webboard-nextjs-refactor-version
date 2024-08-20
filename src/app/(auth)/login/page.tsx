'use client'
import '@/styles/login/login.css'

// react, nextjs
import React, { useEffect } from 'react'
import { useFormState } from 'react-dom'
import { useRouter } from 'next/navigation'
// components
import AuthForm from '@/components/auth/AuthForm'
// actions
import { loginAction } from '@/actions/login/loginAction'
// fonts
import { silkscreen } from '@/app/fonts'
// utils
import swal from "sweetalert2";
import { useAppDispatch } from '@/redux/hook'
import { updateUser } from "@/redux/slices/userSlice/userSlice"
import getUserAuth from '@/api/auth/getUserAuth'


function LoginPage() {
    const initialState = { isSubmitted: false, error: false, message: '', response: null }
    const [serverState, formActions] = useFormState(loginAction, initialState)

    const router = useRouter()

    const dispatch = useAppDispatch()

    const getCurrentUserData = async () => {
        try {
            const user = await getUserAuth()
            if (user) {
                dispatch(updateUser(user.data.decoded))
            }
            return
        } catch (error) {
            throw new Error(`Failed to get user auth: ${error}`)
        }
    }

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
                    html: `Login success! <a href='http://imm0rz16.thddns.net:8771' target='_blank' style='text-decoration: underline; font-weight: bold;'>http://imm0rz16.thddns.net:8771</a>`,
                })
                getCurrentUserData()
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