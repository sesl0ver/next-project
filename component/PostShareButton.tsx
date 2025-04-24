'use client';

import {usePathname} from "next/navigation";
import {toast} from "sonner";
import React from "react";

export default function PostShareButton({children, title, className}: {children: React.ReactNode, title?: string, className?: string}) {
    const pathname = usePathname();

    const handleCopy = async () => {
        const fullUrl = `${window.location.origin}${pathname}`;
        try {
            await navigator.clipboard.writeText(fullUrl);
            toast.success("클립보드에 현재 주소를 복사했습니다.");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <button onClick={handleCopy} title={title} className={className}>
            {children}
        </button>
    );
}
