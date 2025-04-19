export const Categories = {
    TALK: "게임 이야기",
    QUESTION: "도움 요청",
    TIP: "꿀팁",
    GUIDE: "유저 공략",
    REVIEW: "유저 후기",
    NOTICE: "공지사항"
} as const;

export type CategoryKey = keyof typeof Categories;
export type CategoryLabel = typeof Categories[CategoryKey];