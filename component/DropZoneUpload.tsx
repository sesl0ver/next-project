import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import {RiDeleteBinLine, RiImageLine, RiFileTextLine, RiUpload2Line} from "@remixicon/react";
import {filesize} from "filesize";


export default function DropZoneUpload() {
    const [files, setFiles] = useState<File[]>([]);
    const removeUpload = (x: number) => {
        const newFiles = files.filter((_, i) => i !== x);
        setFiles(newFiles);
    }

    const validateImage = (file: File) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => reject(false);
            img.src = URL.createObjectURL(file);
        });
    };

    const onDrop = useCallback((acceptedFiles: File[]) => {
        for (const file of acceptedFiles) {
            validateImage(file).then((res) => {
                if (res) {
                    setFiles((current: File[]) => [...current, ...acceptedFiles]);
                }
            });
        }
    }, [])
    const {getRootProps, getInputProps} = useDropzone({onDrop,
        maxFiles: 10,
        maxSize: 10245760,
        accept: {
            'image/*': [],
        },
    })
    return (
        <>
            <div className="file-drop-area bg-gray-700 rounded p-6 text-center">
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <div className="mb-3">
                        <div className="w-12 h-12 mx-auto bg-gray-600 rounded-full flex items-center justify-center text-gray-400">
                            <RiUpload2Line className="ri-2x" />
                        </div>
                    </div>
                    <p className="text-gray-300 mb-2">파일을 여기에 끌어다 놓거나</p>
                    <button type="button" id="file-select-btn" className="bg-gray-600 hover:bg-gray-500 text-white
                                            px-4 py-2 !rounded-button whitespace-nowrap">파일 선택</button>
                    <input type="file" id="file-input" className="hidden"/>
                    <p className="text-xs text-gray-400 mt-2">이미지 파일만 업로드 가능합니다.</p>
                </div>
            </div>

            <div className="mt-4 space-y-2">
                {
                    files.map((file, idx) => (
                        <div key={idx} className="file-item flex items-center justify-between p-3 rounded">
                            <div className="flex items-center">
                                <div
                                    className="w-8 h-8 flex items-center justify-center bg-blue-500/10 text-blue-500 rounded mr-3">
                                    <i className="ri-file-text-line"></i>
                                    <RiImageLine />
                                </div>
                                <div>
                                    <p className="text-sm text-white">{file.name}</p>
                                    <p className="text-xs text-gray-400">{filesize(file.size, {standard: 'jedec'})}</p>
                                </div>
                            </div>
                            <button type="button" className="text-gray-400 hover:text-red-400">
                                <div className="w-6 h-6 flex items-center justify-center">
                                    <RiDeleteBinLine onClick={() => removeUpload(idx)} />
                                </div>
                            </button>
                        </div>
                    ))
                }

            </div>
        </>
    )
}