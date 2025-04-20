export const Categories = {
    TALK: "게임이야기",
    QUESTION: "질문하기",
    TIP: "꿀팁",
    GUIDE: "유저공략",
    REVIEW: "유저후기",
    NOTICE: "공지사항"
} as const;

export const CategoryColor = {
    TALK: "bg-lime-600 hover:bg-lime-700",
    QUESTION: "bg-orange-600 hover:bg-orange-700",
    TIP: "bg-violet-600 hover:bg-violet-700",
    GUIDE: "bg-slate-600 hover:bg-slate-700",
    REVIEW: "bg-cyan-600 hover:bg-cyan-700",
    NOTICE: "bg-yellow-600 hover:bg-yellow-700"
};

export type CategoryKey = keyof typeof Categories;
export type CategoryLabel = typeof Categories[CategoryKey];