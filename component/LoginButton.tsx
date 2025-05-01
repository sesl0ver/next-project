"use client"

import {RiSteamFill} from "@remixicon/react";
import Link from "next/link";
import {useAuthStore} from "@/store/authStore";
import {useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import {getUserFromCookieClient} from "@/utils/getUserFromCookieClient"

export default function LoginButton () {
    const { user, setUser, clearUser } = useAuthStore();
    const pathname = usePathname();

    useEffect(() => {
        const current = getUserFromCookieClient();
        if (! current) {
            clearUser(); // 쿠키가 없거나 만료된 경우 상태 초기화
        } else {
            setUser(current); // 쿠키에서 받아온 user 정보를 Zustand에 저장
        }
    }, [pathname]);

    return (
        (user) ? (
            <Link href="/login" className="px-4 py-2 text-gray-500 rounded-xl text-sm hover:text-gray-200"><RiSteamFill /> <span>{ user.username }</span></Link>
        ) : (
            <Link href="/login" className="px-4 py-2 text-gray-500 rounded-xl text-sm hover:text-gray-200"><RiSteamFill /> <span>로그인</span></Link>
        )
    )
}