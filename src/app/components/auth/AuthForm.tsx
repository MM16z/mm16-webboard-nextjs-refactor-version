import { AuthFormType } from '@/app/models/loginModel'
import React from 'react'

export default function AuthForm({ onFormSubmit, pageType }: AuthFormType) {
    return (
        <form className='flex flex-col w-full h-full justify-center justify-items-center'
            action={onFormSubmit}
        >
            <div className='flex flex-col justify-center justify-items-center text-center gap-y-2' data-name='login-input-first'>
                <div className='text-[40px] text-center'>Enter your email :D</div>
                <input className='login-input text-5xl pl-8 pr-8' type='email' autoFocus={true} name='email'
                ></input>
            </div>
            <div className='flex flex-col justify-center justify-items-center text-center gap-y-2' data-name='login-input-second'>
                <div className='text-[40px] text-center'>Enter your password :v</div>
                <input className='login-input text-5xl pl-8 pr-8' type='password' name='password'
                ></input>
            </div>
            {pageType === "register" && <div className='flex flex-col justify-center justify-items-center text-center gap-y-2' data-name='login-input-second'>
                <div className='text-[40px] text-center'>Enter your username :0</div>
                <input className='login-input text-5xl pl-8 pr-8 w-1/2 self-center' type='text' name='username'
                ></input>
            </div>}
            {pageType === "login" && <div className="text-center pt-4">
                <div
                    className='toregisref opacity-60'
                >
                    or try an global account? admin:1234 or
                </div>
                <div className='font-bold cursor-pointer'
                >Click here</div>
            </div>}
            <input className="login-submit-btn cursor-pointer text-[64px] w-4/5 h-[124px] mt-6 self-center border border-gray-400" type="submit" value={pageType === "register" ? "Register" : "Login"}></input>
        </form>
    )
}
