'use server';

import {ApiResponse} from "@/types/ApiFetch";
import {cookieVerify} from "@/utils/cookieVerify";

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export async function likePost(method: HttpMethod, post_id: number): Promise<ApiResponse> {
    const token = await cookieVerify()
    if (! token) {
        return {
            success: false,
            message: '유저 인증에 실패했습니다.'
        }
    }
    try {
        switch (method) {
            case 'POST': {
                const res = await fetch(`${process.env.API_URL}/games/posts/like/${post_id}`, {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!res.ok) {
                    if (res.status === 409) {
                        return {
                            success: false,
                            message: '이미 좋아요를 눌렀습니다.'
                        };
                    } else {
                        return {
                            success: false,
                            message: '좋아요 요청 중 오류가 발생했습니다.'
                        };
                    }
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