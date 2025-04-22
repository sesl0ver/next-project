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
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const form = new IncomingForm({
            // 업로드 디렉토리 설정
            uploadDir: path.join(process.cwd(), 'uploads'), // 업로드 경로 설정
            keepExtensions: true, // 파일 확장자 유지
            maxFiles: 10, // 최대 10개 파일 첨부 가능
        });

        // 업로드 디렉토리가 존재하지 않으면 생성
        const uploadDir = path.join(process.cwd(), 'uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }

        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error('파일 처리 중 오류:', err);
                return res.status(500).json({ success: false, message: '파일 처리 중 오류가 발생했습니다.' });
            }

            // form-data 생성
            const formData = new FormData();

            // 텍스트 필드 추가
            Object.entries(fields).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    for (const v of value) {
                        formData.append(key, v);
                    }
                } else {
                    formData.append(key, value);
                }
            });

            // 파일 추가
            const { fileTypeFromBuffer } = await import('file-type');
            const fileList = Array.isArray(files.files) ? files.files : [files.files];
            for (const file of fileList) {
                if (!file) continue;

                const buffer = await readFile(file.filepath);
                const fileType = await fileTypeFromBuffer(buffer);

                const filename = file.originalFilename ?? file.newFilename ?? 'untitled';
                const blob = new Blob([buffer], { type: fileType?.mime });

                formData.append('files', blob, filename);
            }

            try {
                const response = await fetch(`${process.env.API_URL}/games/${formData.get('app_id')}/posts`, {
                    method: 'POST',
                    // headers: {
                    //     Authorization: `Bearer ${yourAccessToken}`,
                    //     'x-custom-header': 'example-value',
                    //     // ⚠️ Content-Type은 생략
                    // },
                    body: formData,
                });

                const result = await response.json();

                // ✅ 성공 시 파일 삭제
                if (response.ok) {
                    await Promise.all(
                        fileList.map(async (file) => {
                            try {
                                await fsp.unlink(file.filepath);
                                console.log('파일 삭제 성공');
                            } catch (err) {
                                console.error('파일 삭제 실패:', err);
                            }
                        })
                    );
                }

                res.status(200).json({success: true});
            } catch (err) {
                console.error(err);
                res.status(500).json({ message: 'Upload failed', error: String(err) });
            }
        });
    } else if (req.method === 'PUT') {

    } else if (req.method === 'DELETE') {

    } else {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
}
