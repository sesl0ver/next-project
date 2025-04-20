'use client'

export default function GamePostUsername(params: { username: string, authorId: number }) {
    const {username, authorId} = params;
    function authorEvent(e: React.MouseEvent<HTMLSpanElement>) {
        e.preventDefault();
        e.stopPropagation();
        alert(username);
    }
    return (
        <span onClick={(e) => authorEvent(e)} className="hover:text-orange-500">{ username }</span>
    )
}