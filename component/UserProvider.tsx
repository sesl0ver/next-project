"use client"

import React, {useEffect} from "react";
import {User} from "@/types/User";
import {useAuthStore} from "@/store/authStore";

export default function UserProvider({ user, children }: { user: User | null, children: React.ReactNode }) {
    const { setUser, clearUser } = useAuthStore();

    useEffect(() => {
        if (user) {
            setUser(user); // 쿠키에서 받아온 user 정보를 Zustand에 저장
        } else {
            clearUser(); // 쿠키가 없거나 만료된 경우 상태 초기화
        }
    }, [user, setUser, clearUser]);
    return (
        <>
            {children}
        </>
    )
}