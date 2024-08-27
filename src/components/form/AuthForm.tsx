import { AuthFormType } from '@/models/loginModel'
import React from 'react'

export default function AuthForm({ onFormSubmit, pageType }: AuthFormType) {
    const [formState, setFormState] = React.useState({
        email: '',
        password: '',
        username: ''
    })
    return (
        <form className='flex flex-col w-full h-full justify-center justify-items-center'
            onSubmit={(e) => {
                e.preventDefault()
                onFormSubmit(formState)
            }}
        >
            <div className='login-inputcontainer flex flex-col justify-center justify-items-center text-center gap-y-2' data-name='login-input-first'>
                <div className='text-[40px] text-center'>Enter your email :D</div>
                <input className='inputborder login-input text-5xl pl-8 pr-8' type={formState.email === 'admin' ? `text` : `email`} autoFocus={true} name='email' onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                ></input>
            </div>
            <div className='login-inputcontainer flex flex-col justify-center justify-items-center text-center gap-y-2' data-name='login-input-second'>
                <div className='text-[40px] text-center'>Enter your password :v</div>
                <input className='inputborder login-input text-5xl pl-8 pr-8' type='password' name='password' onChange={(e) => setFormState({ ...formState, password: e.target.value })}
                ></input>
            </div>
            {pageType === "register" && <div className='login-inputcontainer flex flex-col justify-center justify-items-center text-center gap-y-2' data-name='login-input-second'>
                <div className='text-[40px] text-center'>Enter your username :0</div>
                <input className='inputborder login-input text-5xl pl-8 pr-8 w-1/2 self-center' type='text' name='username' onChange={(e) => setFormState({ ...formState, username: e.target.value })}
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
            <input className="login-submit-btn cursor-pointer text-[64px] w-4/5 h-[124px] mt-6 self-center border border-gray-400 hover:text-white hover:bg-black" type="submit" value={pageType === "register" ? "Register" : "Login"}></input>
        </form>
    )
}
