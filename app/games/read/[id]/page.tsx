import {GameRead} from "@/types/Game";
import GameSide from "@/app/games/component/game-side";
import {RiUserLine, RiEyeLine, RiThumbUpLine, RiMessageLine, RiShareLine, RiFlagLine} from "@remixicon/react";
import {getRelativeTime} from "@/lib/RelativeTime";
import {Categories} from "@/constants/categories";
import MarkdownReader from "@/component/MarkdownReader";

export const metadata = {
    title: 'Game'
}

async function getGameRead (post_id: string) {
    const response = await fetch(`${process.env.API_URL}/games/read/${post_id}`, { cache: 'force-cache', next: { revalidate: 1 } });
    return (!response || typeof response !== 'object') ? null : response.json();
}

export default async function GameReadPage({ params }: { params: Promise<{ id: string }>}) {
    const { id } = await params;
    const read: GameRead = await getGameRead(id);
    return (
        <div className="grid grid-cols-12 gap-6">
            <GameSide id={String(read.app_id)} />
            <div className="md:col-span-9 grid-cols-none">
                <div className="rounded-lg mb-6">
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 mb-6">

                        <div className="col-span-9">
                            <article className="bg-gray-800 rounded-lg p-6 mb-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-3">
                                        <div
                                            className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                                            <RiUserLine/>
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
                                        <span
                                            className="px-2 py-1 bg-indigo-500 text-xs rounded-full">{Categories[read.post_type]}</span>
                                        <h1 className="text-2xl font-bold">{read.title}</h1>
                                    </div>
                                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                                        <span
                                            className="flex items-center space-x-1"><RiEyeLine/><span>1,245</span></span>
                                        <span className="flex items-center space-x-1"><RiThumbUpLine/><span>1,245</span></span>
                                        <span className="flex items-center space-x-1"><RiMessageLine/><span>1,245</span></span>
                                    </div>
                                    <div className="prose prose-invert max-w-none">
                                        <MarkdownReader value={read.contents}/>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mt-8 pt-8 border-t border-gray-700">
                                    <div className="flex space-x-4">
                                        <button
                                            className="flex items-center space-x-2 px-4 py-2 bg-gray-700 rounded-button hover:bg-gray-600">
                                            <RiThumbUpLine/>
                                            <span>좋아요</span>
                                        </button>
                                        <button
                                            className="flex items-center space-x-2 px-4 py-2 bg-gray-700 rounded-button hover:bg-gray-600">
                                            <RiShareLine/>
                                            <span>공유하기</span>
                                        </button>
                                    </div>
                                    <button className="flex items-center space-x-2 text-gray-400 hover:text-indigo-500">
                                        <RiFlagLine/>
                                        <span>신고하기</span>
                                    </button>
                                </div>
                            </article>

                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center">
                                    <div
                                        className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center mr-3 hover:bg-gray-700">
                                        <div className="w-5 h-5 flex items-center justify-center"><a
                                            href={`/games/${read.app_id}`}>
                                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24"
                                                 height="24" fill="currentColor" className="remixicon ">
                                                <path
                                                    d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"></path>
                                            </svg>
                                        </a></div>
                                    </div>
                                    <h1 className="text-2xl font-bold text-white">글 작성</h1></div>
                                <div className="text-sm text-gray-400">자유게시판</div>
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
                </div>
            </div>
        </div>
    )
}