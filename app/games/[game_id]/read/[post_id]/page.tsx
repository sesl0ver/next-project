import {
    RiEyeLine, RiMessageLine, RiUserLine, RiDownloadLine,
    RiEmotionLine, RiImageLine, RiAttachment2, RiStarSmileFill
} from "@remixicon/react";
import React, {Suspense} from "react";
import Link from "next/link";
import {filesize} from "filesize";
import {GameRead} from "@/types/Game";
import {PostPageProps} from "@/types/Post";
import {Categories} from "@/constants/categories";
import {apiFetch} from "@/lib/apiFetch";
import {getRelativeTime} from "@/lib/RelativeTime";
import Loading from "@/component/SimpleLoading";
import MarkdownReader from "@/component/MarkdownReader";
import GamePrice from "@/app/games/component/game-price";
import GameInformation from "@/app/games/component/game-information";
import GameHeader from "@/app/games/component/game-header";
import GamePostButton from "@/app/games/component/game-post-button";
import GamePostCategory from "@/app/games/component/game-post-category";
import GamePostList from "@/app/games/component/game-post-list";
import GamePostReadButton from "@/app/games/component/game-post-read-button";
import GamePostReadManageButton from "@/app/games/component/game-post-read-manage-button";
import GamePostReadTopButton from "@/app/games/component/game-post-read-top-button";
import GamePostLikeButton from "@/app/games/component/game-post-like-button";

export async function getGamePostRead (game_id: string, post_id: string): Promise<GameRead> {
    return apiFetch(`${process.env.API_URL}/games/${game_id}/posts/${post_id}`);
}

export default async function GameReadPage({ params, searchParams }: PostPageProps) {
    const { game_id, post_id } = await params;
    const { page } = await searchParams;
    const read: GameRead = await getGamePostRead(game_id, post_id);
    return (
        <div className="grid grid-cols-12 gap-6">
            <div className="hidden lg:block lg:col-span-3">
                <Suspense>
                    <GameInformation id={game_id} />
                </Suspense>
                <Suspense fallback={<Loading />}>
                    <GamePrice id={String(game_id)} />
                </Suspense>
                <div className="bg-gray-800 rounded-lg p-4 mb-6">
                    <h3 className="font-bold mb-4">비슷한 게임 추천</h3>
                    <div className="space-y-4">
                    </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 mb-6">
                    <h3 className="font-bold mb-4">최근 업데이트 게시글</h3>
                    <div className="space-y-4">
                    </div>
                </div>
            </div>
            <div className="lg:col-span-9 col-span-12">
                <div className="rounded-lg p-4 mb-6">
                    <Suspense fallback={<Loading />}>
                        <GameHeader id={game_id} />
                    </Suspense>
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 mb-6">

                        <div className="md:col-span-9 col-span-12">
                            <article className="bg-gray-800 rounded-lg p-6 mb-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-3">
                                        <div
                                            className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                                            <RiUserLine/>
                                        </div>
                                        <div>
                                            <h5 className="font-medium">{read.author.username}</h5>
                                            <span className="text-sm text-gray-400" title={read.created_date}>{getRelativeTime(read.created_date)}</span><span className="text-sm text-gray-400" title={read.updated_date}>{(read.created_date === read.updated_date) ? null : ` · 수정됨 ${getRelativeTime(read.updated_date)}`}</span>
                                        </div>
                                    </div>
                                    <GamePostReadTopButton game_id={game_id} post_id={post_id} page={page ?? '1'} />
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-2">
                                        <GamePostCategory category={Categories[read.post_type]}
                                                          postType={read.post_type}/>
                                        <h1 className="text-2xl font-bold">{read.title}</h1>
                                    </div>
                                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                                        <span className="flex items-center space-x-1"><RiEyeLine size={18}/><span>1,245</span></span>
                                        <span className="flex items-center space-x-1"><RiStarSmileFill size={18}/><span>1,245</span></span>
                                        <span className="flex items-center space-x-1"><RiMessageLine size={18}/><span>1,245</span></span>
                                    </div>
                                    <div className="prose prose-invert max-w-none">
                                        <MarkdownReader value={read.contents}/>
                                    </div>
                                    <GamePostLikeButton />
                                </div>
                                {
                                    (read.files.length > 0) ? (
                                        <div className="mt-6 pt-6 border-t border-gray-700">
                                            <h4 className="text-xs font-medium mb-3">첨부파일 ({read.files.length})</h4>
                                            <div className="space-y-2 gap-2">
                                                {
                                                    read.files.map((file, idx) => {
                                                        return (
                                                            <Link href="#" key={idx} className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg hover:bg-gray-600">
                                                                <i className="ri-file-text-line text-xl"></i>
                                                                <div className="flex-1">
                                                                    <p className="text-sm">{file.filename}</p>
                                                                    <span className="text-xs text-gray-400">{filesize(file.size, {standard: 'jedec'})}</span>
                                                                </div>
                                                                <RiDownloadLine size={18} />
                                                            </Link>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    ) : null
                                }
                                <div className="mt-8 pt-8 border-t border-gray-700">
                                    <GamePostReadButton />
                                </div>
                            </article>

                            <GamePostReadManageButton page={page ?? '1'} game_id={game_id} post_id={post_id} />

                            <div className="bg-gray-800 rounded-lg p-6">
                                <h3 className="font-bold mb-6">댓글 89개</h3>
                                <div className="flex items-center space-x-4 mb-6">
                                    <div
                                        className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                                        <RiUserLine/>
                                    </div>
                                    <div className="flex-1">
                                        <textarea placeholder="댓글을 입력하세요" className="w-full h-20 bg-gray-700 rounded-lg px-4 py-2 text-sm resize-none border-none"></textarea>
                                        <div className="flex justify-between items-center mt-2">
                                            <div className="flex space-x-2">
                                                <button className="w-8 h-8 flex items-center justify-center bg-gray-700 rounded-full hover:bg-gray-600">
                                                    <RiEmotionLine size={18} />
                                                </button>
                                                <button className="w-8 h-8 flex items-center justify-center bg-gray-700 rounded-full hover:bg-gray-600">
                                                    <RiImageLine size={18} />
                                                </button>
                                                <button className="w-8 h-8 flex items-center justify-center bg-gray-700 rounded-full hover:bg-gray-600">
                                                    <RiAttachment2 size={18} />
                                                </button>
                                            </div>
                                            <button className="px-4 py-2 bg-indigo-500 text-white rounded-sm text-sm hover:bg-indigo-600">등록</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div className="flex space-x-4">
                                        <div
                                            className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                                            <RiUserLine />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2 mb-1">
                                                <span className="font-medium">이지훈</span>
                                                <span className="text-sm text-gray-400">2025-03-12 14:35</span>
                                            </div>
                                            <p className="text-sm mb-2">
                                                드디어 정식 출시네요! 기다리던 소식이라 너무 기쁩니다. 특히 신규 클래스가 기대되네요.
                                            </p>
                                            <div className="flex items-center space-x-4 text-sm">
                                                <button className="text-gray-400 hover:text-indigo-500">좋아요 12</button>
                                                <button className="text-gray-400 hover:text-indigo-500">답글</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex space-x-4">
                                        <div
                                            className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                                            <RiUserLine />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2 mb-1">
                                                <span className="font-medium">박서연</span>
                                                <span className="text-sm text-gray-400">2025-03-12 14:40</span>
                                            </div>
                                            <p className="text-sm mb-2">사전예약 보상이 너무 좋네요! 특히 탈것 디자인이 예쁠 것 같아요.</p>
                                            <div className="flex items-center space-x-4 text-sm">
                                                <button className="text-gray-400 hover:text-indigo-500">좋아요 8</button>
                                                <button className="text-gray-400 hover:text-indigo-500">답글</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <GamePostList game_id={String(read.app_id)} page={page ?? '1'} />
                </div>
            </div>
            <GamePostButton id={game_id} />
        </div>
    )
}