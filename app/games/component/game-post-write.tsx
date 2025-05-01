"use client";

import {RiArrowLeftLine} from '@remixicon/react';
import React, {useState,useEffect} from "react";
import { useRouter } from "next/navigation";
import MDEditor from '@uiw/react-md-editor';
import { toast } from "sonner";
import {useAtom, useAtomValue} from "jotai";
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import { loadingAtom } from "@/atoms/loadingAtom";
import { isDirtyAtom } from '@/atoms/isDirtyAtom';
import {markdownToolbarCommands, markdownYoutubeComponent} from "@/lib/utils";
import { usePreventNavigation } from '@/hooks/usePreventNavigation';
import {usePreventBackNavigation} from "@/hooks/usePreventBackNavigation";
import {usePreventLinkNavigation} from "@/hooks/usePreventLinkNavigation";
import GamePostCategorySelector from "@/app/games/component/game-post-category-selector";
import GamePostFileUpload from "@/app/games/component/game-post-file-upload";
import GamePostFileList from "@/app/games/component/game-post-file-list";
import GamePostGuide from "@/app/games/component/game-post-guide";
import {GameRead} from "@/types/Game";
import {UploadFile} from "@/types/Post";
import EnsuredNavigation from "ensured-navigation";
import {referrerAtom} from "@/atoms/referrerAtom";
import {removeFiles} from "@/app/action/games/posts/removeFiles";
import {writeGamePost} from "@/app/action/games/posts/writeGamePost";
import {getUserFromCookieClient} from "@/utils/getUserFromCookieClient";


export default function GamePostWrite({ game_id, modify_data }: {game_id: string, modify_data?: GameRead | null}) {
    const router = useRouter();
    const user = getUserFromCookieClient();
    if (! user) {
        router.push(`/login`);
    }
    const referrer = useAtomValue(referrerAtom);
    const [, setLoading] = useAtom(loadingAtom);
    const [title, setTitle] = useState('');
    const [files, setFiles] = useState<UploadFile[]>([]);
    const [contents, setContents] = useState('');
    const [category, setCategoryAction] = useState('TALK');
    const [isDirty, setIsDirty] = useAtom(isDirtyAtom);
    const [url, setUrl] = useState("");

    const handleImageInsert = (imageUrl: string) => {
        setContents(prev => `${prev}\n![첨부파일](${imageUrl})`);
    };

    const goBack = () => {
        if (isDirty) {
            if (!confirm('변경 사항이 저장되지 않았습니다. 이동하시겠습니까?')) return;
        }
        router.push(referrer ?? (modify_data) ? `/games/${game_id}/read/${modify_data?.post_id}` : `/games/${game_id}`);
    };

    function isValidInput(input: string): boolean {
        const cleaned = input.replace(/[\u200B-\u200D\uFEFF\s]/g, '');
        return cleaned.length > 0;
    }

    const removeUpload = async (x: number) => {
        const deleteFile = files.find((_, i) => i === x);
        if (deleteFile?.file_id) {
            if (!confirm('첨부한 파일을 삭제하는 경우 되돌릴수 없습니다. 삭제하시겠습니까?')) {
                return;
            }
        }
        if (deleteFile) {
            if (deleteFile?.file_id && modify_data) {
                // 실제 파일 삭제는 modify 모드에서만
                try {
                    const res = await removeFiles('DELETE', modify_data.post_id, deleteFile.file_id);
                    if (! res.success) {
                        toast.error(res.message);
                        return;
                    }
                    setContents(contents.replaceAll(`![첨부파일](${deleteFile.prevUrl})`, ''));
                    setFiles(files.filter((_, i) => i !== x));
                } catch (error) {
                    console.error(error);
                }
            }
        }
    }

    const customSchema = {
        ...defaultSchema,
        attributes: {
            ...defaultSchema.attributes,
            img: [
                ...(defaultSchema.attributes?.img || []),
                ['src', /^blob:/], // blob:을 src로 허용
            ],
        },
        protocols: {
            ...defaultSchema.protocols,
            src: [...(defaultSchema.protocols?.src || []), 'blob'],
        },
    };


    const postProcess = async () => {
        if (!isValidInput(title)) {
            toast.error("제목을 입력하세요.");
            return;
        }
        if (!isValidInput(contents)) {
            toast.error("내용을 입력하세요.");
            return;
        }
        const formData = new FormData();
        formData.append('title', title);
        formData.append('contents', contents);
        formData.append('post_type', category);
        formData.append('app_id', String(game_id));
        if (modify_data) {
            formData.append('post_id', String(modify_data.post_id));
        }
        for (const file of files) {
            if (file?.realFile) {
                formData.append('files', file.realFile);
                formData.append('prevUrl', file.prevUrl);
            }
        }

        setLoading(true);
        try {
            const res = await writeGamePost((modify_data) ? 'PUT' : 'POST', formData);
            if (! res.success) {
                toast.error((res.message));
                setLoading(false);
                return;
            }

            // 이미지 업로드 완료 후, blob 리소스 수동 해제
            for (const file of files) {
                if (file?.realFile) {
                    URL.revokeObjectURL(file.prevUrl); // 메모리 해제
                }
            }
            setIsDirty(false);
            toast.success((`${(modify_data) ? '글수정' : '글작성'}을 완료했습니다.`));
            setUrl(`/games/${game_id}/read/${res.data.post_id}`);
        } catch (e) {
            toast.error(e.message);
        }
    }

    useEffect(() => {
        if (modify_data && title === modify_data.title && contents === modify_data.contents) {
            setIsDirty(false);
        } else if (title.length < 1 && contents.length < 1) {
            setIsDirty(false);
        } else {
            setIsDirty(true);
        }
    }, [title, contents]);

    useEffect(() => {
        if (modify_data?.title) {
            setTitle(modify_data.title);
            setContents(modify_data.contents);
            setCategoryAction(modify_data.post_type);
            // 한 번에 모든 파일을 설정하도록 최적화
            const updatedFiles = modify_data.files.map(file => ({
                ...file,
                prevUrl: `${process.env.NEXT_PUBLIC_IMAGE_URL}/${file.filename}`
            }));
            setFiles(updatedFiles);
        }
    }, [modify_data]);

    usePreventNavigation() // 새로고침, 페이지 닫기 감지
    usePreventBackNavigation() // 뒤로가기 감지
    usePreventLinkNavigation(); // 링크 클릭 막기

    return (
        <div className="max-w-5xl mx-auto">
            <EnsuredNavigation url={url} options={{
                onSuccess: () => {
                    setLoading(false);
                },
            }} />
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <button onClick={goBack} className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center mr-3 hover:bg-gray-700">
                        <RiArrowLeftLine />
                    </button>
                    <h1 className="text-2xl font-bold text-white">글 { (modify_data !== null) ? '수정' : '작성' }</h1>
                </div>
                <div className="text-sm text-gray-400"></div>
            </div>

            <div className="bg-gray-800 rounded-lg overflow-hidden mb-6">
                <div className="p-6">
                    <GamePostCategorySelector setCategoryAction={setCategoryAction} />

                    <div className="mb-6">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">제목</label>
                        <input type="text" id="title" placeholder="제목을 입력하세요" value={title} onChange={e => setTitle(e.target.value)}
                               className="bg-gray-700 text-gray-200 w-full px-4 py-3 rounded border-none focus:outline-none focus:ring-2 focus:ring-primary"/>
                    </div>

                    <div className="mb-6">
                        <div className="container text-xl">
                            <MDEditor value={contents}
                                      // @ts-ignore
                                      onChange={setContents}
                                      height={400}
                                      commands={markdownToolbarCommands}
                                      preview='edit'
                                      previewOptions={{
                                          rehypePlugins: [[rehypeSanitize, customSchema]],
                                          components: markdownYoutubeComponent
                                      }}
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-300 mb-2">파일 첨부</label>

                        <GamePostFileUpload files={files} setFiles={setFiles} handleImageInsert={handleImageInsert} />

                        <GamePostFileList files={files} handleRemoveFiles={removeUpload} />
                    </div>

                    <div className="border-t border-gray-700 mb-6"></div>

                    <div className="flex justify-end space-x-3">
                        <button onClick={goBack} className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 !rounded-button whitespace-nowrap">취소</button>
                        <button onClick={postProcess} className="bg-indigo-900 hover:bg-indigo-800/90 text-white px-6 py-3 !rounded-button whitespace-nowrap">등록</button>
                    </div>
                </div>
            </div>

            <GamePostGuide />
        </div>
    )
}