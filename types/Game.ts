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

export interface GamePage {
    totalCount: number,
    totalPages: number,
    currentPage: number,
    pageSize: number,
    games: Game[]
}

export interface Price {
    id: string;
    lowPrice: number; // 역대 최저가
    lowCut: number; // 역대 할인율
    currentPrice: number; // 현재 가격
    regularPrice: number; // 원래 가격
    cut: number; // 현재 할인율
    url: string;
}

export interface GameRead {
    app_id: number;
    author: {
        author_id: number;
        username: string;
    }
    contents: string;
    created_date: string;
    game: {
        app_id: number;
        title: string;
    }
    files: {
        file_id: number;
        filename: string;
        size: number;
    }[]
    post_id: number;
    post_type: 'TALK' | 'QUESTION' | 'TIP' | 'GUIDE' | 'REVIEW' | 'NOTICE';
    title: string;
    updated_date: string;
}

export interface GamePageProps {
    searchParams: Promise<{ [key: string]: string | undefined }>
}