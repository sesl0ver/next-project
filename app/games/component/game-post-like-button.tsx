"use client"

import {RiStarSmileFill} from "@remixicon/react";
import React, {useState} from "react";

export default function GamePostLikeButton() {
    const [count, setCount] = useState(0);
    return (
        <div className="flex justify-center">
            <button onClick={() => setCount(current => current + 1)}
                className="flex flex-col items-center gap-2 w-24 py-5 bg-gray-700 rounded-button hover:bg-amber-300 rounded-sm">
                <RiStarSmileFill size={24} className="text-pink-400" />
                <span className="text-sm">{count}</span>
            </button>
        </div>
    )
}