import { cookies } from 'next/headers';
import {User} from "@/types/User";

export async function getUserFromCookie(): Promise<User | false> {
    const cookieStore = await cookies();
    const base64User = cookieStore.get('user-data');

    if (!base64User) {
        return false;
    }

    try {
        const decoded = Buffer.from(base64User.value, 'base64').toString('utf-8');
        return JSON.parse(decoded);
    } catch (error) {
        return false;
    }
}