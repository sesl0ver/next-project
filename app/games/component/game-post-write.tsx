"use client";

import {
    RiArrowLeftLine, RiCheckboxCircleLine, RiDeleteBinLine, RiFileExcelLine, RiFileTextLine,
    RiInformationLine, RiUpload2Line
} from '@remixicon/react';
import Link from "next/link";
import React, {useState} from "react";
import { useRouter } from "next/navigation";
import DropZoneUpload from "@/component/DropZoneUpload";
import MDEditor from '@uiw/react-md-editor';
import { useLoading } from "@/lib/LoadingContext";

export default function GamePostWrite({ id }: {id: string}) {
    const { setLoading } = useLoading();
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');
    const goBackOrHome = () => {
        if (document.referrer && document.referrer.includes(window.location.host)) {
            router.back(); // 같은 도메인이라면 back
        } else {
            router.push("/"); // 그 외에는 홈으로
        }
    };
    const postProcess = async () => {
        // TODO title, contents 빈 내용 체크하도록 개선 필요.
        if (title.length < 1) {
            return;
        }
        if (contents.length < 1) {
            return;
        }
        setLoading(true);
        const res = await fetch('http://localhost:3333/games/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                contents: contents,
                post_type: 'TIP',
                author_id: 2,
                app_id: Number(id),
            }),
        });
        if (res.ok) {
            router.push(`/games/${id}`);
            setLoading(false);
        }
    }
    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center mr-3 hover:bg-gray-700">
                        <div className="w-5 h-5 flex items-center justify-center">
                            <Link href={`/games/${id}`}><RiArrowLeftLine /></Link>
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
                            <select id="category"
                                    className="custom-select bg-gray-700 text-gray-200 w-full px-4 py-3 rounded border-none focus:outline-none focus:ring-2 focus:ring-primary pr-10">
                                <option value="free">자유</option>
                                <option value="question">질문</option>
                                <option value="info">정보</option>
                                <option value="humor">유머</option>
                                <option value="screenshot">스크린샷</option>
                                <option value="guide">공략/가이드</option>
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
                        <DropZoneUpload />
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
                        <button onClick={goBackOrHome} className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 !rounded-button whitespace-nowrap">취소</button>
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