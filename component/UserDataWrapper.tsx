import React from "react";
import UserProvider from './UserProvider';
import {cookies} from "next/headers";
import {User} from "@/types/User";

export default async function UserDataWrapper({ children, }: { children: React.ReactNode }) {
    const cookieStore = await cookies();
    const base64User = cookieStore.get('user-data');
    let user: User | null = null;
    if (base64User?.value) {
        const decoded = Buffer.from(base64User.value, 'base64').toString('utf-8');
        user = JSON.parse(decoded);
    }
    return (
        <UserProvider user={user}>
            {children}
        </UserProvider>
    )
}