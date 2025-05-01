'use client'

import { atom } from 'jotai'

// 쿠키에서 theme 값을 읽어오는 유틸
function getCookieTheme(): 'dark' | '' {
    if (typeof document === 'undefined') return ''
    const m = document.cookie.match(/(?:^|;\s*)theme=(dark|)(?:;|$)/)
    return m ? (m[1] as 'dark' | '') : ''
}

// 쿠키에 theme 값을 쓰는 유틸
function setCookieTheme(value: 'dark' | '') {
    // 1년짜리, 경로 전체에 적용
    document.cookie = `theme=${value}; path=/; max-age=${60 * 60 * 24 * 365}`
}

// 테마 atom: 읽기 시 쿠키, 쓰기 시 쿠키 + html 클래스 적용
export const themeAtom = atom(
    getCookieTheme(),
    (_get, set, newTheme: 'dark' | '') => {
        // 1) 쿠키에 저장
        setCookieTheme(newTheme)
        // 2) <html> 클래스 토글
        document.documentElement.classList.toggle('dark', newTheme === 'dark')
        // 3) atom 상태 업데이트
        set(themeAtom, newTheme)
    }
)