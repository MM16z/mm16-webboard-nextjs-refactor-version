"use client"
// import React from 'react'

import { silkscreen } from '@/fonts/fonts'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { useCallback, useEffect, useRef } from 'react'
import { logOut } from '@/redux/slices/authSlice/authSlice'
import { authApiService } from '@/api/auth/auth'
import Swal from 'sweetalert2'
import MobileMenu from './MobileMenu'
import HamButton from './HamButton'

export default function Navbar() {
    const router = useRouter()
    const getUserData = useAppSelector((state) => state.userSlice.currentUser)
    const hamButtonRef = useRef<SVGSVGElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);

    const dispatch = useAppDispatch()

    const onLogout = async () => {
        try {
            const response = await authApiService.Logout()
            if (response.status === 200) {
                dispatch(logOut())
                window.location.href = '/'
                Swal.fire({
                    title: 'Success',
                    text: 'Logout success',
                    icon: 'success'
                })
            }
        } catch (error) {
            console.log(error)
            Swal.fire({
                title: 'Error',
                text: `Failed to logout ${error}`,
                icon: 'error'
            })
        }
    }

    const onHamButtonClick = () => {
        hamButtonRef.current?.classList.toggle("active");
        mobileMenuRef.current?.classList.toggle("active");
    }

    return (
        <nav
            className={`nav-container ${silkscreen.className} h-[66px] flex flex-row justify-between items-center`}>
            <MobileMenu hamButtonRef={hamButtonRef} mobileMenuRef={mobileMenuRef} />
            <HamButton onHamButtonClick={onHamButtonClick} hamButtonRef={hamButtonRef} />
            {/* nav-item1 */}
            <div className='ml-10 z-10 cursor-pointer text-center' onClick={() => { router.push('/', { scroll: false }) }}>
                <div className='nav-logo text-[40px] tracking-[-5px] mt-[-10px]'>MM16STUDIO</div>
                <div className='nav-logo-sub text-[20px] tracking-[-1px] text-white mt-[-15px]'>Webboard</div>
            </div>
            {/* nav-item2 */}
            <div>
                <div className='current-user text-[20px] tracking-[-4px] text-center hidden sm:block'>
                    /Home, Howdy! :D @User : {getUserData.username ? getUserData.username : "Anonymous"}
                </div>
            </div>
            {/* nav-item3 */}
            <div className='mr-10 text-[20px] flex-row gap-x-2 cursor-pointer text-white hidden sm:flex'>
                {getUserData.userId ? <div onClick={() => { router.push('/user-dashboard', { scroll: false }) }}>Dashboard</div> : null}
                {getUserData.userId ? <div>|</div> : null}
                {getUserData.userId ? null : <>
                    <div onClick={() => { router.push('/register', { scroll: false }) }}>Register</div>
                    <div>|</div>
                    <div onClick={() => { router.push('/login', { scroll: false }) }}>Login</div>
                </>}
                {getUserData.userId ? <div className='text-red-600' onClick={onLogout}>Logout</div> : null}
            </div>
        </nav>
    )
}
