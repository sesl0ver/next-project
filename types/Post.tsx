export interface PostPage {
    totalCount: number,
    totalPages: number,
    currentPage: number,
    pageSize: number,
    posts: any[]
}

export interface PostPageProps {
    params: Promise<{ id: string }>
    searchParams: Promise<{ [key: string]: string | undefined }>
}