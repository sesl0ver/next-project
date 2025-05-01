import { create } from 'zustand'
import { User } from '@/types/User'

type AuthState = {
    user: User | null;
    setUser: (user: User) => void;
    clearUser: () => void;
    isAuthenticated: () => boolean;  // 함수 타입으로 변경
};

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    setUser: (user: User) => set({ user }),
    clearUser: () => set({ user: null }),
    isAuthenticated: () => {
        const state = get();  // 현재 상태를 가져옴
        return !!state.user;  // user가 존재하면 true, 아니면 false 반환
    },
}));