'use client'

import { useEffect, useCallback, memo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hook";

import { updateAuth } from "@/redux/slices/authSlice/authSlice";
import { updateUser } from "@/redux/slices/userSlice/userSlice";

import Cookies from "js-cookie";
import getUserInfo from "@/api/auth/getUserInfo";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    const router = useRouter();

    const userId = useAppSelector((state) => state.userSlice.currentUser.userId);

    const fetchAuthData = useCallback(async () => {
        if (pathname !== '/login' && pathname !== '/register') {
            try {
                const user = await getUserInfo();
                if (user) {
                    dispatch(updateUser({
                        email: user.email,
                        username: user.username,
                        userId: user.id
                    }))
                }
            } catch (error) {
                console.error('Authentication error:', error);
                dispatch(updateUser({
                    email: '',
                    username: '',
                    userId: null
                }))
                if (pathname !== '/') {
                    router.push('/login');
                }
            }
        }
    }, [pathname, router, dispatch]);

    useEffect(() => {
        if (!userId) {
            fetchAuthData();
        }
    }, [fetchAuthData, userId]);

    return <>
        {children}
    </>;
};

export default memo(AuthGuard);