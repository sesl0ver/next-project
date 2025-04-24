import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { IncomingForm } from 'formidable';
import fs, { promises as fsp } from 'fs';
import { readFile } from 'fs/promises';
import path from 'path';
import { FormData, fetch } from 'undici';

// Next.js 기본 bodyParser 비활성화
export const config = {
    api: {
        bodyParser: false, // body parser 비활성화
    },
};

// 게시글 작성 및 파일 업로드 처리
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST' || req.method === 'PUT') {
        const uploadPath = path.join(process.cwd(), 'uploads');
        const form = new IncomingForm({
            // 업로드 디렉토리 설정
            uploadDir: uploadPath, // 업로드 경로 설정
            keepExtensions: true, // 파일 확장자 유지
            maxFiles: 10, // 최대 10개 파일 첨부 가능
        });

        // 업로드 디렉토리가 존재하지 않으면 생성
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
        }

        const parseForm = (): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
            return new Promise((resolve, reject) => {
                form.parse(req, (err, fields, files) => {
                    if (err) reject(err);
                    else resolve({ fields, files });
                });
            });
        };

        try {
            const { fields, files } = await parseForm();

            const formData = new FormData();

            Object.entries(fields).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    value.forEach(v => formData.append(key, v));
                } else {
                    formData.append(key, value);
                }
            });

            const { fileTypeFromBuffer } = await import('file-type');
            const fileList = Array.isArray(files.files) ? files.files : [files.files];
            for (const file of fileList) {
                if (!file) continue;
                const buffer = await readFile(file.filepath);
                const fileType = await fileTypeFromBuffer(buffer);
                if (!fileType?.mime?.startsWith('image/')) {
                    return res.status(400).json({ success: false, message: '허용되지 않은 파일 형식입니다.' });
                }
                const filename = file.originalFilename ?? file.newFilename ?? 'untitled';
                const blob = new Blob([buffer], { type: fileType.mime });
                formData.append('files', blob, filename);
            }

            const response = await fetch(`${process.env.API_URL}/games/${formData.get('app_id')}/posts`, {
                method: req.method,
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                await Promise.all(
                    fileList.map(async (file) => {
                        if (file) {
                            await fsp.unlink(file.filepath).catch(console.error);
                        }
                    })
                );
            }

            return res.status(200).json({ success: true, data: result });

        } catch (err) {
            console.error('업로드 실패:', err);
            return res.status(500).json({ success: false, message: err.message, error: String(err) });
        }
    } else if (req.method === 'DELETE') {
        try {
            const { game_id, post_id } = req.query;
            const response = await fetch(`${process.env.API_URL}/games/${game_id}/posts?post_id=${post_id}`, {
                method: 'DELETE'
            });
            if (! response.ok) {
                throw new Error('글 삭제 중 오류가 발생했습니다.');
            }
            const result = await response.json();

            return res.status(200).json({success: true, data: result });
        } catch (err) {
            return res.status(500).json({ success: false, message: err.message, error: String(err) });
        }
    } else {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
}
