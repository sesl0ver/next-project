'use client';

import { useEffect, useRef } from 'react';
import { useAtomValue } from 'jotai';
import { isDirtyAtom } from '@/atoms/isDirtyAtom';

export const usePreventBackNavigation = () => {
    const isDirty = useAtomValue(isDirtyAtom);
    const hasPushedState = useRef(false);

    useEffect(() => {
        const handlePopState = (e: PopStateEvent) => {
            if (isDirty) {
                const proceed = confirm('변경 사항이 저장되지 않았습니다. 이동하시겠습니까?');
                if (!proceed) {
                    // 다시 앞으로 되돌리기 (뒤로가기 취소)
                    history.pushState(null, '', window.location.href);
                } else {
                    // 사용자가 확인 눌렀으면 페이지 이동 허용 (더 이상 인터셉트 안 함)
                    window.removeEventListener('popstate', handlePopState);
                    history.back(); // 실제 뒤로가기 수행
                }
            }
        };

        // 최초에 한 번만 pushState
        if (!hasPushedState.current) {
            history.pushState(null, '', window.location.href);
            hasPushedState.current = true;
        }

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [isDirty]);
};
