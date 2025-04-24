"use client"

import {RiFlagLine, RiShareLine} from "@remixicon/react";
import React from "react";
import PostShareButton from "@/component/PostShareButton";

export default function GamePostReadButton() {
    return (
        <div className="flex items-center justify-between">
            <div className="flex space-x-4">
            </div>
            <div className="flex space-x-4">
                <PostShareButton className="flex items-center space-x-2 text-gray-400 hover:text-indigo-500">
                    <RiShareLine size={18}/>
                    <span className="text-sm">공유하기</span>
                </PostShareButton>
                <button className="flex items-center space-x-2 text-gray-400 hover:text-indigo-500">
                    <RiFlagLine size={18}/>
                    <span className="text-sm">신고하기</span>
                </button>
            </div>
        </div>
    )
}