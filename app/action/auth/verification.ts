'use server';

import { revalidatePath } from 'next/cache';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export async function authVerification(method: HttpMethod, data: any, postId?: string) {
    // API 키 준비
    const API_KEY = process.env.NESTJS_API_KEY;
    const baseUrl = 'https://api.yourdomain.com/posts';

    try {
        // 2. 메소드별 처리
        switch (method) {
            case 'GET': {
                return { error: '지원되지 않는 메소드입니다1' };
            }

            case 'POST': {
                return { error: '지원되지 않는 메소드입니다2' };
            }

            case 'PUT': {
                return { error: '지원되지 않는 메소드입니다3' };
            }

            case 'DELETE': {
                return { error: '지원되지 않는 메소드입니다4' };
            }

            default:
                return { error: '지원되지 않는 메소드입니다' };
        }
    } catch (error) {
        console.error('API 요청 오류:', error);
        return { error: '서버 오류가 발생했습니다' };
    }
}