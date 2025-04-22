export interface PostPage {
    totalCount: number,
    totalPages: number,
    currentPage: number,
    pageSize: number,
    posts: any[]
}

export interface PostPageProps {
    params: Promise<{ game_id: string, post_id: string }>
    searchParams: Promise<{ [key: string]: string | undefined }>
}

export interface Post {
    post_id: number
    title: string
    contents: string
    post_type: string
    author_id: number
    app_id: number
    created_date: string
    updated_date: string
    author: {
        account_id: number
        username: string
    }
    game: {
        app_id: number
        title: string
    }
    _count: {
        comments: number
    }
}