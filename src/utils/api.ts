/* eslint-disable @typescript-eslint/no-explicit-any */
// utils/api.ts
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface ApiRequestOptions {
  method?: HttpMethod;
  body?: any;
  headers?: Record<string, string>;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
}

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

export async function apiRequest<T = any>(
  url: string,
  options: ApiRequestOptions = {}
): Promise<ApiResponse<T>> {
  try {
    // Default options
    const defaultHeaders = {
      "Content-Type": "application/json",
    };

    // Merge default and custom headers
    const headers = {
      ...defaultHeaders,
      ...options.headers,
    };

    // Prepare fetch options
    const fetchOptions: RequestInit = {
      method: options.method || "GET",
      headers,
      cache: options.cache,
      next: options.next,
      ...(options.body && {
        body: JSON.stringify(options.body),
      }),
    };

    // Perform the fetch
    const response = await fetch(url, fetchOptions);

    // Parse the response
    const responseData = await response.json();

    // Check for error responses
    if (!response.ok) {
      return {
        data: null,
        error: responseData.error || "An unexpected error occurred",
      };
    }

    // Successful response
    return {
      data: responseData,
      error: null,
    };
  } catch (error) {
    console.error("API Request Error:", error);

    return {
      data: null,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

// Helper functions for common HTTP methods
export const apiGet = <T = any>(
  url: string,
  options: Omit<ApiRequestOptions, "method" | "body"> = {}
) => apiRequest<T>(url, { ...options, method: "GET" });

export const apiPost = <T = any>(
  url: string,
  body: any,
  options: Omit<ApiRequestOptions, "method" | "body"> = {}
) => apiRequest<T>(url, { ...options, method: "POST", body });

export const apiPut = <T = any>(
  url: string,
  body: any,
  options: Omit<ApiRequestOptions, "method" | "body"> = {}
) => apiRequest<T>(url, { ...options, method: "PUT", body });

export const apiDelete = <T = any>(
  url: string,
  options: Omit<ApiRequestOptions, "method"> = {}
) => apiRequest<T>(url, { ...options, method: "DELETE" });
