export interface ApiOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD';
    headers?: HeadersInit;
    body?: any;
    next?: {
        revalidate?: number;         // ISR
        tags?: string[];             // Tag-based cache
    };
    cache?: RequestCache;
    credentials?: RequestCredentials;
}

export interface ApiResponse {
    success: boolean;
    message?: string;
    statusCode?: number;
    data?: any;
}