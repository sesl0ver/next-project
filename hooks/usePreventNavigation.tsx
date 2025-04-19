'use client';

import { useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { isDirtyAtom } from '@/atoms/isDirtyAtom';
import { isNavigatingAtom } from '@/atoms/isNavigatingAtom';

export const usePreventNavigation = () => {
    const isDirty = useAtomValue(isDirtyAtom);
    const isNavigating = useAtomValue(isNavigatingAtom);

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (isDirty && !isNavigating) {
                e.preventDefault();
                e.returnValue = '';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [isDirty, isNavigating]);
};
