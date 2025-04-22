import type {NextApiRequest, NextApiResponse} from "next";
import {fetch} from "undici";
import {promises as fsp} from "fs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'DELETE') {
        const { post_id, file_id } = req.query;
        try {
            const response = await fetch(`${process.env.API_URL}/games/posts/${post_id}/files/${file_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    // 인증 헤더 필요 시 여기에 추가
                },
            });

            const result = await response.json();
            res.status(response.status).json(result);
        } catch (error) {
            console.error('API 요청 실패:', error);
            res.status(500).json({ message: '파일 삭제 요청 실패' });
        }
    } else {
    }
}