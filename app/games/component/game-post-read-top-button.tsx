"use client"

import {RiMore2Fill} from "@remixicon/react";
import React, {useEffect, useRef, useState} from "react";
import Link from "next/link";
import RemovePostButton from "@/component/RemovePostButton";

export default function GamePostReadTopButton({ game_id, post_id, page = '1' }: { game_id: string, post_id: string, page: string }) {
    const [popupMenu, setPopupMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setPopupMenu(false);
            }
        };

        if (popupMenu) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [popupMenu]);


    return (
        <div className="relative" ref={menuRef}>
            <button className="text-gray-400 hover:text-primary post-menu-btn">
                <RiMore2Fill onClick={() => setPopupMenu(current => !current)} size={18} />
            </button>
            {
                (popupMenu) ? (
                    <div className="absolute right-0 top-full mt-2 w-32 bg-gray-700 rounded-lg shadow-lg overflow-hidden z-10 post-menu">
                        <Link href={`/games/${game_id}/modify/${post_id}` + ((page) ? `?page=${page}` : '')}
                              className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-600">수정하기</Link>
                        <RemovePostButton game_id={game_id} post_id={post_id} className="w-full px-4 py-2 text-left text-sm hover:bg-gray-600">
                            삭제하기
                        </RemovePostButton>
                    </div>
                ) : null
            }
        </div>
    )
}