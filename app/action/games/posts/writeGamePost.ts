'use server';

import {ApiResponse} from "@/types/ApiFetch";
import {cookieVerify} from "@/utils/cookieVerify";

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export async function writeGamePost(method: HttpMethod, formData: FormData): Promise<ApiResponse> {
    const token = await cookieVerify()
    if (! token) {
        return {
            success: false,
            message: '유저 인증에 실패했습니다.'
        }
    }
    try {
        switch (method) {
            case 'POST':
            case 'PUT': {
                const res = await fetch(`${process.env.API_URL}/games/${formData.get('app_id')}/posts`, {
                    method: method,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    body: formData,
                });
                if (! res.ok) {
                    return {
                        success: false,
                        message: '글 작성 중 오류가 발생했습니다.'
                    }
                }
                const json = await res.json();
                return {
                    success: true,
                    data: json.data
                }
            }
            default:
                return {
                    success: false,
                    message: '지원되지 않는 메소드입니다.'
                };
        }
    } catch (error) {
        console.error('API 요청 오류:', error);
        return {
            success: false,
            message: '서버 오류가 발생했습니다'
        };
    }
}