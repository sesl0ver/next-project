import Link from "next/link";
import React from "react";
import {RiMessage2Line, RiThumbUpLine} from '@remixicon/react';
import {Categories} from "@/constants/categories";
import Pagination from "@/component/Pagination";
import {Post, PostPage} from "@/types/Post";
import {apiFetch} from "@/lib/apiFetch";
import GamePostCategory from "@/app/games/component/game-post-category";
import GamePostUsername from "@/app/games/component/game-post-username";

async function getGamePosts(gameId: string, page: string): Promise<PostPage> {
    return apiFetch(`${process.env.API_URL}/games/posts/${gameId}?page=${page ?? 1}`)
}

export default async function GamePostList(params: { gameId: string, page: string }) {
    const { gameId, page } = await params;
    const data: PostPage = await getGamePosts(gameId, page);
    return (
        <>
            <div className="rounded-lg p-1 mb-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex space-x-2"></div>
                    <div className="flex space-x-2">
                        <button className="px-3 py-1 text-sm bg-gray-800 rounded-full text-gray-300 hover:bg-gray-700">최신순</button>
                        <button className="px-3 py-1 text-sm bg-gray-800 rounded-full text-gray-300 hover:bg-gray-700">인기순</button>
                        <button className="px-3 py-1 text-sm bg-gray-800 rounded-full text-gray-300 hover:bg-gray-700">업데이트순</button>
                    </div>
                </div>

                <div className="space-y-4">
                    {
                        data.posts.map((post: Post, index: number) => (
                            <Link key={index} href={`/games/${post.app_id}/read/${post.post_id}` + ((page) ? `?page=${page}` : '')}
                                  className="block bg-gray-800 rounded-lg p-4 cursor-pointer duration-100
                                    hover:hover:bg-gray-700 hover:scale-105 active:animate-in active:hover:bg-gray-800">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center space-x-2">
                                        <GamePostCategory category={Categories[post.post_type]} postType={post.post_type} />
                                        <span className="text-sm font-medium">{ post.title }</span>
                                    </div>
                                    <span className="text-xs text-gray-400">{ post.created_date }</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center space-x-4 text-gray-400">
                                        <GamePostUsername username={post.author.username} authorId={post.author.account_id} />
                                        <span>조회 0</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="flex items-center space-x-1"><RiThumbUpLine /><span>0</span></span>
                                        <span className="flex items-center space-x-1"><RiMessage2Line /><span>{ post['_count'].comments }</span></span>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
            <Pagination data={data} />
        </>
    )
}