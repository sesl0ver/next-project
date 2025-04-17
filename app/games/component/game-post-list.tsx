import Link from "next/link";
import {RiMessage2Line, RiThumbUpLine} from '@remixicon/react';
import React from "react";

async function getGamePosts(gameId): Promise<any> {
    const response = await fetch(`http://localhost:3333/games/posts/${gameId}`);
    return response.json();
}

export default async function GamePostList(params) {
    const { gameId } = await params;
    const posts = await getGamePosts(gameId);
    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">최신 게시글</h2>
                <div className="flex space-x-2">
                    <button className="px-3 py-1 text-sm bg-gray-800 rounded-full text-gray-300 hover:bg-gray-700">최신순</button>
                    <button className="px-3 py-1 text-sm bg-gray-800 rounded-full text-gray-300 hover:bg-gray-700">인기순</button>
                </div>
            </div>

            <div className="space-y-4">
                {
                    posts.map((post, index: number) => (
                        <div key={index} className="bg-gray-800 rounded-lg p-4 cursor-pointer
                            duration-100 hover:hover:bg-gray-700 hover:scale-105 active:animate-in active:hover:bg-gray-800">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                    <span className="px-2 py-1 bg-blue-500 text-xs rounded-full">{ post['port_type'] }</span>
                                    <Link href={`/games/read/${post['post_id']}`} className="text-sm font-medium">{ post['title'] }</Link>
                                </div>
                                <span className="text-xs text-gray-400">{ post['create_date'] }</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center space-x-4 text-gray-400">
                                    <span>{ post['author'].username }</span>
                                    <span>조회 0</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="flex items-center space-x-1"><RiThumbUpLine /><span>0</span></span>
                                    <span className="flex items-center space-x-1"><RiMessage2Line /><span>{ post['_count'].comments }</span></span>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}