'use client';

import { useEffect } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { isDirtyAtom } from '@/atoms/isDirtyAtom';
import { isNavigatingAtom } from '@/atoms/isNavigatingAtom';

export const usePreventLinkNavigation = () => {
    const isDirty = useAtomValue(isDirtyAtom);
    const setIsDirty = useSetAtom(isDirtyAtom);
    const setIsNavigating = useSetAtom(isNavigatingAtom);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const anchor = target.closest('a');

            if (!anchor || !anchor.href || anchor.target === '_blank') return;

            const isInternal = anchor.href.startsWith(window.location.origin);
            if (!isInternal) return;

            if (isDirty) {
                e.preventDefault();
                e.stopPropagation();

                const confirmed = confirm('변경 사항이 저장되지 않았습니다. 이동하시겠습니까?');

                if (confirmed) {
                    setIsDirty(false);
                    setIsNavigating(true);

                    const href = anchor.getAttribute('href');
                    if (href) {
                        // ✅ 브라우저가 상태 반영 전에 unload 하지 않게 약간 지연
                        setTimeout(() => {
                            window.location.href = href;
                        }, 0);
                    }
                }
            }
        };

        document.addEventListener('click', handleClick, true);

        return () => {
            document.removeEventListener('click', handleClick, true);
        };
    }, [isDirty, setIsDirty, setIsNavigating]);
};
