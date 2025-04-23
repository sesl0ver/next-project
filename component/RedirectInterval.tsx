'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

type RedirectIntervalProps = {
    url?: string;
    onRedirectAction: () => void;
    onFail?: () => void; // 실패 시 호출될 함수
    maxDurationMs?: number; // 무한 시도 방지 시간 (기본값 5000ms)
};

export default function RedirectInterval({url, onRedirectAction, onFail, maxDurationMs = 5000,}: RedirectIntervalProps) {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!url || url === '') return;

        const targetPath = url.startsWith('/')
            ? url
            : new URL(url, window.location.href).pathname;

        if (pathname === targetPath) return;

        const start = Date.now();

        const id = setInterval(() => {
            router.replace(url);
            // console.log('페이지 이동 시도!');

            const elapsed = Date.now() - start;

            // 무한 루프 방지 타임아웃
            if (elapsed > maxDurationMs) {
                clearInterval(id);
                // console.warn('페이지 이동 실패: 제한 시간 초과');
                onFail?.();
            }
        }, 100);

        // console.log('인터벌 시작!');

        return () => {
            const currentPath = window.location.pathname;
            if (currentPath === targetPath) {
                // console.log('클린업 시점: 페이지 이동 성공 감지');
                onRedirectAction();
            }
            clearInterval(id);
            // console.log('인터벌 클린업');
        };
    }, [url, pathname]);

    return null;
}
