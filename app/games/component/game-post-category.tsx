'use client'

import {CategoryColor} from "@/constants/categories";

export default function GamePostCategory(params: { category: string, postType: string }) {
    const {category, postType} = params;
    function categoryEvent(e: React.MouseEvent<HTMLSpanElement>) {
        e.preventDefault();
        e.stopPropagation();
        alert(postType);
    }
    return (
        <span onClick={(e) => categoryEvent(e)} className={`px-2 py-1 text-xs rounded-sm ${CategoryColor[postType]}`}>{ category }</span>
    )
}