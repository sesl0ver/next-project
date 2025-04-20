'use client'

export default function GamePostCategory(params: { category: string, postType: string }) {
    const {category, postType} = params;
    function categoryEvent(e: React.MouseEvent<HTMLSpanElement>) {
        e.preventDefault();
        e.stopPropagation();
        alert(postType);
    }
    return (
        <span onClick={(e) => categoryEvent(e)} className="px-2 py-1 bg-blue-500 hover:bg-blue-700 text-xs rounded-full">{ category }</span>
    )
}