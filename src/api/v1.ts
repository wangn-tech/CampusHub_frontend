import { del, get, post, put } from "@/utils/http";

/** Canonical backend envelope. All v1 API modules return this shape. */
export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
  trace_id: string;
  /** HTTP response headers exposed by the request adapter when available. */
  _headers?: Record<string, string>;
}

export interface Page<T> {
  items: T[];
  pagination: { page: number; page_size: number; total: number };
}

export const query = (values: Record<string, unknown>) => {
  const params = new URLSearchParams();
  Object.entries(values).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") params.set(key, String(value));
  });
  const encoded = params.toString();
  return encoded ? `?${encoded}` : "";
};

export const v1Get = <T>(path: string, params: Record<string, unknown> = {}) =>
  get<ApiResponse<T>>(`/api/v1${path}${query(params)}`);
export const v1Post = <T>(path: string, data?: unknown) => post<ApiResponse<T>>(`/api/v1${path}`, data);
export const v1Put = <T>(path: string, data?: unknown) => put<ApiResponse<T>>(`/api/v1${path}`, data);
export const v1Delete = <T>(path: string) => del<ApiResponse<T>>(`/api/v1${path}`);
