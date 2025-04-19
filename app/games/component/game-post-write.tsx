"use client";

import {
    RiArrowLeftLine,
    RiCheckboxCircleLine,
    RiDeleteBinLine,
    RiImageLine,
    RiInformationLine,
    RiUpload2Line
} from '@remixicon/react';
import Link from "next/link";
import React, {useState,useEffect} from "react";
import { useRouter } from "next/navigation";
import MDEditor from '@uiw/react-md-editor';
import { Categories } from "@/constants/categories";
import {filesize} from "filesize";
import {UploadFile} from "@/types/UploadFile";
import { toast } from "sonner";
import { useAtom } from "jotai";
import { loadingAtom } from "@/atoms/loadingAtom";
import GlobalDropZone from "@/component/GlobalDropZone";
import { usePreventNavigation } from '@/hooks/usePreventNavigation';
import { isDirtyAtom } from '@/atoms/isDirtyAtom';
import {usePreventBackNavigation} from "@/hooks/usePreventBackNavigation";
import {usePreventLinkNavigation} from "@/hooks/usePreventLinkNavigation";


export default function GamePostWrite({ id }: {id: string}) {
    const [, setLoading] = useAtom(loadingAtom);
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [files, setFiles] = useState<UploadFile[]>([]);
    const [contents, setContents] = useState('');
    const [category, setCategory] = useState('TALK');
    const [isDirty, setIsDirty] = useAtom(isDirtyAtom);

    const handleImageInsert = (imageUrl: string) => {
        setContents(prev => `${prev}\n![첨부파일](${imageUrl})`);
    };

    const goBack = () => {
        if (isDirty) {
            if (!confirm('변경 사항이 저장되지 않았습니다. 이동하시겠습니까?')) return;
        }
        router.push(`/games/${id}`);
    };

    usePreventNavigation() // 새로고침, 페이지 닫기 감지
    usePreventBackNavigation() // 뒤로가기 감지
    usePreventLinkNavigation(); // 링크 클릭 막기

    useEffect(() => {
        if (title.length < 1 && contents.length < 1 && files.length < 1) {
            setIsDirty(false);
        } else {
            setIsDirty(true);
        }
    }, [title, contents, files]);

    const postProcess = async () => {
        if (title.length < 1) {
            toast.error("제목을 입력하세요.");
            return;
        }
        if (contents.length < 1) {
            toast.error("내용을 입력하세요.");
            return;
        }
        const formData = new FormData();
        formData.append('title', title);
        formData.append('contents', contents);
        formData.append('post_type', category);
        formData.append('author_id', String(2)); // TODO 임시값.
        formData.append('app_id', id);
        for (const file of files) {
            formData.append('prevUrl', file.prevUrl);
            formData.append('files', file.realFile);
        }
        try {
            setLoading(true);
            const res = await fetch(`${process.env.API_URL}/games/post`, {
                method: 'POST',
                body: formData,
            });
            if (res.ok) {
                router.push(`/games/${id}`);
                setLoading(false);
            }
        } catch (e) {
            console.error(e);
            setLoading(false);
        }
    }

    const handleUpload = async (file: File) => {
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
    const removeUpload = (x: number) => {
        const deleteFile = files.find((_, i) => i === x);
        setContents(contents.replaceAll(`![첨부파일](${deleteFile.prevUrl})`, ''));
        setFiles(files.filter((_, i) => i !== x));
    }


    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center mr-3 hover:bg-gray-700">
                        <div className="w-5 h-5 flex items-center justify-center">
                            <button onClick={goBack}><RiArrowLeftLine /></button>
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-white">글 작성</h1>
                </div>
                <div className="text-sm text-gray-400">
                    자유게시판
                </div>
            </div>

            <div className="bg-gray-800 rounded-lg overflow-hidden mb-6">
                <div className="p-6">
                    <div className="mb-6">
                        <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">카테고리</label>
                        <div className="relative">
                            <select id="category" onChange={(e) => setCategory(e.target.value)}
                                    className="custom-select bg-gray-700 text-gray-200 w-full px-4 py-3 rounded border-none focus:outline-none focus:ring-2 focus:ring-primary pr-10">
                                {Object.entries(Categories).map(([key, label]) => (
                                    (key !== 'NOTICE') ? <option key={key} value={key}>{label}</option> : null
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">제목</label>
                        <input type="text" id="title" placeholder="제목을 입력하세요" onChange={e => setTitle(e.target.value)}
                               className="bg-gray-700 text-gray-200 w-full px-4 py-3 rounded border-none focus:outline-none focus:ring-2 focus:ring-primary"/>
                    </div>

                    <div className="mb-6">
                        <div className="container text-xl">
                            <MDEditor value={contents} onChange={setContents} height={400} />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-300 mb-2">파일 첨부</label>

                        <div className="file-drop-area bg-gray-700 rounded p-6 text-center">
                            <div className="mb-3">
                                <div className="w-12 h-12 mx-auto bg-gray-600 rounded-full flex items-center justify-center text-gray-400">
                                    <RiUpload2Line className="ri-2x" />
                                </div>
                            </div>
                            <GlobalDropZone handleUpload={handleUpload} />
                            <p className="text-gray-300 mb-2">파일을 페이지에 끌어다 놓아 파일 첨부</p>
                            <p className="text-xs text-gray-400 mt-2">10MB 이하. Webp, Png, Gif, Jpg 파일만 업로드 가능합니다.</p>
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
                                                <p className="text-sm text-white">{file.filename}</p>
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
                    </div>

                    <div className="border-t border-gray-700 pt-6 mb-6">
                        <div className="flex flex-wrap gap-6">
                            <label className="flex items-center">
                                <input type="checkbox" className="custom-checkbox mr-2"/>
                                <span className="text-sm text-gray-300">댓글 허용</span>
                            </label>
                            <label className="flex items-center">
                                <input type="checkbox" className="custom-checkbox mr-2"/>
                                <span className="text-sm text-gray-300">비밀글</span>
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                        <button onClick={goBack} className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 !rounded-button whitespace-nowrap">취소</button>
                        <button onClick={postProcess}
                            className="bg-indigo-900 hover:bg-indigo-800/90 text-white px-6 py-3 !rounded-button whitespace-nowrap">등록</button>
                    </div>
                </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 mb-6">
                <h3 className="text-white font-medium mb-4 flex items-center">
                    <div className="w-5 h-5 flex items-center justify-center mr-2 text-yellow-500">
                        <RiInformationLine />
                    </div>
                    게시글 작성 가이드
                </h3>
                <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-start">
                        <div className="w-5 h-5 flex items-center justify-center mr-2 text-gray-400 flex-shrink-0 mt-0.5">
                            <RiCheckboxCircleLine />
                        </div>
                        <p>타인에게 불쾌감을 주는 내용이나 욕설, 비방 등은 삼가해 주세요.</p>
                    </li>
                    <li className="flex items-start">
                        <div className="w-5 h-5 flex items-center justify-center mr-2 text-gray-400 flex-shrink-0 mt-0.5">
                            <RiCheckboxCircleLine />
                        </div>
                        <p>개인정보 보호를 위해 실명, 전화번호, 주소 등의 개인정보 공유는 자제해 주세요.</p>
                    </li>
                    <li className="flex items-start">
                        <div className="w-5 h-5 flex items-center justify-center mr-2 text-gray-400 flex-shrink-0 mt-0.5">
                            <RiCheckboxCircleLine />
                        </div>
                        <p>저작권에 문제가 될 수 있는 자료의 무단 공유는 금지됩니다.</p>
                    </li>
                    <li className="flex items-start">
                        <div className="w-5 h-5 flex items-center justify-center mr-2 text-gray-400 flex-shrink-0 mt-0.5">
                            <RiCheckboxCircleLine />
                        </div>
                        <p>게시글 작성 후에도 수정 및 삭제가 가능합니다.</p>
                    </li>
                </ul>
            </div>
        </div>
    )
}