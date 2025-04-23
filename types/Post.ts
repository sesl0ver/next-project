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

export interface CategorySelectProps {
    setCategoryAction: (value: string) => void;
    exclude?: string[];
}

export interface UploadFile {
    file_id?: number;
    prevUrl: string,
    filename: string,
    size: number,
    realFile?: File
}

export interface FileUploadProps {
    files: UploadFile[];
    setFiles: React.Dispatch<React.SetStateAction<UploadFile[]>>;
    handleImageInsert: (imageUrl: string) => void;
}

export interface FileListProps {
    files: UploadFile[];
    removeUpload: (index: number) => void;
}

