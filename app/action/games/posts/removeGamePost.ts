'use server';

import {ApiResponse} from "@/types/ApiFetch";
import {cookieVerify} from "@/utils/cookieVerify";

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export async function removeGamePost(method: HttpMethod, game_id: number, post_id: number): Promise<ApiResponse> {
    const token = await cookieVerify()
    if (! token) {
        return {
            success: false,
            message: '유저 인증에 실패했습니다.'
        }
    }
    try {
        switch (method) {
            case 'DELETE': {
                const res = await fetch(`${process.env.API_URL}/games/${game_id}/posts?post_id=${post_id}`, {
                    method: method,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!res.ok) {
                    return {
                        success: false,
                        message: 'Api 요청 중 오류가 발생했습니다.'
                    };
                }
                const json = await res.json()
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