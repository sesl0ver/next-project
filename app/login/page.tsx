import { cookies } from "next/headers";
import {redirect} from "next/navigation";

export const metadata = {
    title: 'Login'
}

async function getToken() {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token");
    const response = await fetch('http://localhost:3333/auth/verify', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token?.value}`,  // HTTPOnly 쿠키를 Authorization 헤더에 담기
        },
        credentials: 'include',
    });
    if (!response.ok) {
        return redirect('http://localhost:3333/auth/steam');
    }
    return response.json();
}

export default async function LoginPage() {
    const result = await getToken();
    return (
        <>
            로그인: { result.data?.user?.username }
        </>
    )
}