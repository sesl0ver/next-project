import { cookies } from 'next/headers';
import {jwtVerify} from "jose";

export async function cookieVerify(): Promise<string | false> {
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;
    if (! token) {
        return false;
    }
    try {
        const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
        await jwtVerify(token, JWT_SECRET);
        return token;
    } catch (error) {
        return false;
    }
}