import type {NextApiRequest} from "next";
import {jwtVerify} from "jose";
import {User} from "@/types/User";

export async function verificationUser (req: NextApiRequest): Promise<false | User> {
    const cookies = req.cookies;
    const tokenValue = cookies['access_token'];
    if (! tokenValue) {
        return false
    }

    try {
        const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
        await jwtVerify(tokenValue, JWT_SECRET);
    } catch (error) {
        return false
    }

    // 인증에 성공했으면 유저데이터도 있을테니
    const base64User = cookies['user-data'];
    if (!base64User) {
        return false
    }
    try {
        const decoded = Buffer.from(base64User, 'base64').toString('utf-8');
        return JSON.parse(decoded);
    } catch (error) {
        return false;
    }
}