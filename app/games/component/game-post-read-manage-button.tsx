"use client"

import Link from "next/link";
import {RiDeleteBinLine, RiEdit2Line, RiListView} from "@remixicon/react";
import React from "react";
import RemovePostButton from "@/component/RemovePostButton";
import {User} from "@/types/User";

export default function GamePostReadManageButton({ permissions, game_id, post_id, page = '1' }: { permissions: boolean, game_id: string, post_id: string, page: string }) {
    return (
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
                <Link href={`/games/${game_id}` + ((page) ? `?page=${page}` : '')}
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-700 rounded-button hover:bg-gray-600 rounded-sm">
                    <RiListView size={18}/>
                    <span>목록</span>
                </Link>
            </div>
            <div className="flex items-center gap-2">
                {
                    (! permissions) ? null : (
                        <>
                            <Link href={`/games/${game_id}/modify/${post_id}` + ((page) ? `?page=${page}` : '')}
                                  className="flex items-center space-x-2 px-4 py-2 bg-green-700 rounded-button hover:bg-green-600 rounded-sm">
                                <RiEdit2Line size={18} />
                                <span>수정</span>
                            </Link>
                            <RemovePostButton game_id={game_id} post_id={post_id} className="flex items-center space-x-2 px-4 py-2 bg-red-700 rounded-button hover:bg-red-600 rounded-sm">
                                <RiDeleteBinLine size={18} />
                                <span>삭제</span>
                            </RemovePostButton>
                        </>
                    )
                }
            </div>
        </div>
    )
}