"use client"

import {RiStarSmileFill} from "@remixicon/react";
import React, {useState} from "react";
import {likePost} from "@/app/action/games/posts/likePost";
import {toast} from "sonner";
import {User} from "@/types/User";

export default function GamePostLikeButton({ permissions, post_id, current }: { permissions: boolean, post_id: string, current: number }) {
    const [likeCount, setlikeCount] = useState(current);
    return (
        <div className="flex justify-center">
            <button onClick={async () => {
                if (! permissions) {
                    toast.error("로그인이 필요합니다.");
                    return;
                }
                const res = await likePost('POST', Number(post_id));
                if (! res.success) {
                    toast.error(res.message);
                    return;
                }
                setlikeCount(res.data.count);
            }} className="flex flex-col items-center gap-2 w-24 py-5 bg-gray-700 rounded-button hover:bg-amber-300 rounded-sm">
                <RiStarSmileFill size={24} className="text-pink-400" />
                <span className="text-sm">{likeCount}</span>
            </button>
        </div>
    )
}