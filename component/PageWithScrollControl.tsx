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

    return null
}