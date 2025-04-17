"use client";

import { useLoading } from "@/lib/LoadingContext";

export function LoadingOverlay() {
    const { isLoading } = useLoading();

    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 bg-black opacity-50 z-[9999] flex items-center justify-center">
            <div className="text-white text-xl animate-pulse">로딩 중...</div>
        </div>
    );
}