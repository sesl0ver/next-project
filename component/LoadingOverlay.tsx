"use client";

import { useAtom } from 'jotai';
import { loadingAtom } from '@/atoms/loadingAtom';

export function LoadingOverlay() {
    const [isLoading] = useAtom(loadingAtom);

    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
            <div className="w-full h-full bg-black opacity-75"></div>
            <div className="absolute text-white text-xl animate-pulse"><img src="/bouncing-circles.svg" alt="Loading..." style={{width: '75px', height: '75px'}} /></div>
        </div>
    );
}