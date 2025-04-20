import {ApiOptions, ApiResponse} from "@/types/ApiFetch";

export async function apiFetch<T>(url: string, options: ApiOptions = {}): Promise<T> {
  const {
    method = 'GET',
    headers,
    body,
    next,
    cache,
  } = options;

  const fetchOptions: RequestInit = {
    method,
    headers: headers,
    body: body ? body : undefined,
    cache,
    next,
  };

  const res = await fetch(url, fetchOptions);

  const result: ApiResponse<T> = await res.json();

  if (!res.ok || !result.success) {
    const error = new Error(result.message || 'API Error');
    (error as any).statusCode = result.statusCode || res.status;
    throw error;
  }

  return result.data;
}
