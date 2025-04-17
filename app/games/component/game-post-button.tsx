import {RiPencilLine} from '@remixicon/react';
import React from "react";
import Link from "next/link";
export default function GamePostButton({ id }: { id: string }) {
    return (
        <Link href={`/games/${id}/write`} className="fixed bottom-8 right-8 w-12 h-12 bg-emerald-500 rounded-full flex cursor-pointer items-center justify-center
        duration-100  hover:bg-emerald-700 hover:scale-125 hover:text-rose-600 active:animate-in active:scale-100 active:text-rose-800">
            <RiPencilLine />
        </Link>
    )
}