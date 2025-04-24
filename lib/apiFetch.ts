import {ApiOptions, ApiResponse} from "@/types/ApiFetch";
import {toast} from "sonner";

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
    toast.error(`${error.message} (${(error as any).statusCode})`);
    throw error;
  }

  return result.data;
}
