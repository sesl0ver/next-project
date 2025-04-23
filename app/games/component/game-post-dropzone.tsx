'use client'

import React, { useCallback, useRef, useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import {RiUpload2Line} from "@remixicon/react";

type Props = {
    handleUploadAction: (file: File) => void;
}

export default function DropHandler({ handleUploadAction }: Props) {
    const [isDragging, setIsDragging] = useState(false)
    const dragCounter = useRef(0)

    const onDrop = useCallback((acceptedFiles: File[]) => {
        for (const file of acceptedFiles) {
            validateImage(file).then((res) => {
                if (res) {
                    handleUploadAction(file);
                }
            });
        }
        setIsDragging(false)
    }, [handleUploadAction])

    const validateImage = (file: File) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = (event) => {
                resolve(true);
            }
            img.onerror = () => reject(false);
            img.src = URL.createObjectURL(file);
        });
    };

    const {
        getRootProps,
        getInputProps,
        open: openFileDialog,
    } = useDropzone({
        noClick: true,
        noKeyboard: true,
        maxFiles: 10,
        maxSize: 10245760,
        accept: {
            'image/png': [],
            'image/jpeg': [],
            'image/gif': [],
            'image/webp': [],
        },
        onDrop,
    })

    // 드래그 상태 추적
    const handleDragEnter = (e: DragEvent) => {
        e.preventDefault()
        dragCounter.current++
        setIsDragging(true)
    }

    const handleDragLeave = (e: DragEvent) => {
        e.preventDefault()
        dragCounter.current--
        if (dragCounter.current === 0) setIsDragging(false)
    }

    const handleDrop = (e: DragEvent) => {
        e.preventDefault()
        dragCounter.current = 0
        setIsDragging(false)
    }

    const handleDragOver = (e: DragEvent) => e.preventDefault()

    useEffect(() => {
        window.addEventListener('dragenter', handleDragEnter)
        window.addEventListener('dragleave', handleDragLeave)
        window.addEventListener('drop', handleDrop)
        window.addEventListener('dragover', handleDragOver)

        return () => {
            window.removeEventListener('dragenter', handleDragEnter)
            window.removeEventListener('dragleave', handleDragLeave)
            window.removeEventListener('drop', handleDrop)
            window.removeEventListener('dragover', handleDragOver)
        }
    }, [])

    return (
        isDragging && (
            <div {...getRootProps()} className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center pointer-events-auto">
                <input {...getInputProps()} />
                <div className="flex flex-col items-center justify-center h-full text-white text-2xl space-y-4">
                    <div className="w-12 h-12 mx-auto bg-gray-600 rounded-full flex items-center justify-center text-gray-400">
                        <RiUpload2Line className="ri-2x" />
                    </div>
                    <div>여기에 파일을 올려놓으세요</div>
                </div>
            </div>
        )
    )
}
