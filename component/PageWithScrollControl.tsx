'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import {useAtom} from "jotai";
import {referrerAtom} from "@/atoms/referrerAtom";
import {usePrevious} from "@/hooks/usePrevious";

export default function ScrollToTop() {
    const [referrer, setReferrer] = useAtom(referrerAtom);
    const pathname = usePathname()
    const previousPath = usePrevious(pathname);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (previousPath && previousPath !== pathname) {
            setReferrer(previousPath);
        }
    }, [pathname])

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const link = target.closest('a');
            const href = link?.getAttribute('href');

            if (href && /^https?:\/\//.test(href)) {
                const ok = window.confirm(
                    '외부 사이트로 이동합니다.\n피싱사이트 확인을 위해 URL을 다시 한번 확인해주세요.\n이동하시겠습니까?'
                );
                if (!ok) e.preventDefault();
            }
        };

        document.addEventListener('click', handler);
        return () => document.removeEventListener('click', handler);
    }, []);

    return null
}