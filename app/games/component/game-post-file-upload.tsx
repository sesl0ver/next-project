import { FileUploadProps } from "@/types/Post";
import {RiUpload2Line} from "@remixicon/react";
import React from "react";
import GlobalDropZone from "@/app/games/component/game-post-dropzone";
import {toast} from "sonner";

const GamePostFileUpload: React.FC<FileUploadProps> = ({ files, setFiles, handleImageInsert }) => {
    const handleUploadAction = async (file: File) => {
        if (! file) {
            return;
        }
        if (files.find(f => f.size === file.size && f.filename === file.name)) {
            toast.error(`동일한 파일이 제외되었습니다.\n(${file.name}`);
            return;
        }

        const objectUrl = URL.createObjectURL(file); // 임시 미리보기 URL 생성
        setFiles(current => [...current, {
            prevUrl: objectUrl,
            filename: file.name,
            size: file.size,
            realFile: file
        }]);
        handleImageInsert(objectUrl);
    };

    return (
        <div className="file-drop-area bg-gray-700 rounded p-6 text-center">
            <div className="mb-3">
                <div className="w-12 h-12 mx-auto bg-gray-600 rounded-full flex items-center justify-center text-gray-400">
                    <RiUpload2Line className="ri-2x" />
                </div>
            </div>
            <GlobalDropZone handleUploadAction={handleUploadAction} />
            <p className="text-gray-300 mb-2">파일을 페이지에 끌어다 놓아 파일 첨부</p>
            <p className="text-xs text-gray-400 mt-2">10MB 이하. Webp, Png, Gif, Jpg 파일만 업로드 가능합니다.</p>
        </div>
    );
};

export default GamePostFileUpload;
