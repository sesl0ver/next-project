import {
    RiEyeLine,
    RiFlagLine,
    RiMessageLine,
    RiShareLine,
    RiThumbUpLine,
    RiUserLine,
    RiDeleteBinLine,
    RiEdit2Line,
    RiListView
} from "@remixicon/react";
import {getRelativeTime} from "@/lib/RelativeTime";
import {Categories} from "@/constants/categories";
import MarkdownReader from "@/component/MarkdownReader";
import {apiFetch} from "@/lib/apiFetch";
import React, {Suspense} from "react";
import Loading from "@/component/SimpleLoading";
import GamePrice from "@/app/games/component/game-price";
import GameInformation from "@/app/games/component/game-information";
import GameHeader from "@/app/games/component/game-header";
import GamePostButton from "@/app/games/component/game-post-button";
import Link from "next/link";
import GamePostCategory from "@/app/games/component/game-post-category";
import {GameRead} from "@/types/Game";
import GamePostList from "@/app/games/component/game-post-list";
import {PostPageProps} from "@/types/Post";

async function getGameRead (post_id: string): Promise<GameRead> {
    return apiFetch(`${process.env.API_URL}/games/read/${post_id}`);
}

export default async function GameReadPage({ params, searchParams }: PostPageProps) {
    const { id, post_id } = await params;
    const { page } = await searchParams;
    const read: GameRead = await getGameRead(post_id);
    return (
        <div className="grid grid-cols-12 gap-6">
            <div className="hidden lg:block lg:col-span-3">
                <Suspense>
                    <GameInformation id={id} />
                </Suspense>
                <Suspense fallback={<Loading />}>
                    <GamePrice id={String(id)} />
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
                        <GameHeader id={id} />
                    </Suspense>
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 mb-6">

                        <div className="md:col-span-9 col-span-12">
                            <article className="bg-gray-800 rounded-lg p-6 mb-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                                            <RiUserLine />
                                        </div>
                                        <div>
                                            <h5 className="font-medium">{read.author.username}</h5>
                                            <span
                                                className="text-sm text-gray-400">{getRelativeTime(read.created_date)}{(read.created_date === read.updated_date) ? null : ` | ${getRelativeTime(read.updated_date)} (수정됨)`}</span>
                                        </div>
                                    </div>
                                    <button className="text-gray-400 hover:text-indigo-500">
                                        <i className="ri-more-2-fill"></i>
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-2">
                                        <GamePostCategory category={Categories[read.post_type]} postType={read.post_type} />
                                        <h1 className="text-2xl font-bold">{read.title}</h1>
                                    </div>
                                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                                        <span
                                            className="flex items-center space-x-1"><RiEyeLine size={18} /><span>1,245</span></span>
                                        <span className="flex items-center space-x-1"><RiThumbUpLine size={18} /><span>1,245</span></span>
                                        <span className="flex items-center space-x-1"><RiMessageLine size={18} /><span>1,245</span></span>
                                    </div>
                                    <div className="prose prose-invert max-w-none">
                                        <MarkdownReader value={read.contents} />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mt-8 pt-8 border-t border-gray-700">
                                    <div className="flex space-x-4">
                                        <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700 rounded-button hover:bg-gray-600 rounded-sm">
                                            <RiThumbUpLine size={18} />
                                            <span>좋아요</span>
                                        </button>
                                        <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700 rounded-button hover:bg-gray-600 rounded-sm">
                                            <RiShareLine size={18} />
                                            <span>공유하기</span>
                                        </button>
                                    </div>
                                    <button className="flex items-center space-x-2 text-gray-400 hover:text-indigo-500">
                                        <RiFlagLine size={18} />
                                        <span>신고하기</span>
                                    </button>
                                </div>
                            </article>

                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-2">
                                    <Link href={`/games/${id}` + ((page) ? `?page=${page}` : '')} className="flex items-center space-x-2 px-4 py-2 bg-gray-700 rounded-button hover:bg-gray-600 rounded-sm">
                                        <RiListView size={18} />
                                        <span>목록</span>
                                    </Link>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Link href={`#`} className="flex items-center space-x-2 px-4 py-2 bg-green-700 rounded-button hover:bg-green-600 rounded-sm">
                                        <RiEdit2Line size={18} />
                                        <span>수정</span>
                                    </Link>
                                    <Link href={`#`} className="flex items-center space-x-2 px-4 py-2 bg-red-700 rounded-button hover:bg-red-600 rounded-sm">
                                        <RiDeleteBinLine size={18} />
                                        <span>삭제</span>
                                    </Link>

                                </div>
                            </div>

                            <div className="bg-gray-800 rounded-lg p-6">
                                <h3 className="font-bold mb-6">댓글 89개</h3>
                                <div className="flex items-center space-x-4 mb-6">
                                    <div
                                        className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                                        <RiUserLine/>
                                    </div>
                                    <div className="flex-1">
                                        <textarea placeholder="댓글을 입력하세요"
                                                  className="w-full h-20 bg-gray-700 rounded-lg px-4 py-2 text-sm resize-none border-none"></textarea>
                                        <div className="flex justify-end mt-2">
                                            <button
                                                className="px-4 py-2 bg-indigo-500 text-white rounded-button text-sm hover:bg-opacity-90">등록
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div className="flex space-x-4">
                                        <div
                                            className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                                            <RiUserLine/>
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
                                            <RiUserLine/>
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
                    <GamePostList gameId={String(read.app_id)} page={page} />
                </div>
            </div>
            <GamePostButton id={id} />
        </div>
    )
}