import React from 'react'
import '@/app/styles/navbar/navbar.css'

import { silkscreen } from '@/app/fonts'
import { useRouter } from 'next/navigation'

export default function Navbar() {
    const router = useRouter()
    return (
        <nav
            className={`nav-container ${silkscreen.className} h-[66px] flex flex-row justify-between items-center`}>
            {/* nav-item1 */}
            <div className='ml-10 z-10 cursor-pointer text-center' onClick={() => { router.push('/', { scroll: false }) }}>
                <div className='nav-logo text-[40px] tracking-[-5px] mt-[-10px]'>MM16STUDIO</div>
                <div className='nav-logo-sub text-[20px] tracking-[-1px] text-white mt-[-15px]'>Webboard</div>
            </div>
            {/* nav-item2 */}
            <div>
                <div className='current-user text-[20px] tracking-[-4px] text-center'>
                    /Home, Howdy! :D @User : {null ? null : "Anonymous"}
                </div>
            </div>
            {/* nav-item3 */}
            <div className='mr-10 text-[20px] flex flex-row gap-x-2 cursor-pointer text-white'>
                <div onClick={() => { router.push('/register', { scroll: false }) }}>Register</div>
                <div>|</div>
                <div onClick={() => { router.push('/login', { scroll: false }) }}>Login</div>
            </div>
        </nav>
    )
}
