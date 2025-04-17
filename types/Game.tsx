export interface Game {
    app_id: number,
    title: string,
    short_description: string,
    capsule_image: string,
    header_image: string,
    release_date: string,
    screenshots?: string[],
    developers: string[],
    publishers: string[],
    genres: string[]
}

export interface price {
    id: string;
    lowPrice: number; // 역대 최저가
    lowCut: number; // 역대 할인율
    currentPrice: number; // 현재 가격
    regularPrice: number; // 원래 가격
    cut: number; // 현재 할인율
    url: string;
}