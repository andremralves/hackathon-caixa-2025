import Constants from 'expo-constants';

export const API_URL: string =
  (Constants.expoConfig?.extra as any)?.apiUrl || process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_URL}${path}`;
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`HTTP ${res.status} ${res.statusText}: ${text}`);
  }

  if (res.status === 204) return undefined as unknown as T;
  return (await res.json()) as T;
}

export const http = {
  get: <T>(path: string, init?: RequestInit) => request<T>(path, { method: 'GET', ...(init || {}) }),
  post: <T>(path: string, body?: unknown, init?: RequestInit) =>
    request<T>(path, { method: 'POST', body: body !== undefined ? JSON.stringify(body) : undefined, ...(init || {}) }),
  put: <T>(path: string, body?: unknown, init?: RequestInit) =>
    request<T>(path, { method: 'PUT', body: body !== undefined ? JSON.stringify(body) : undefined, ...(init || {}) }),
  patch: <T>(path: string, body?: unknown, init?: RequestInit) =>
    request<T>(path, { method: 'PATCH', body: body !== undefined ? JSON.stringify(body) : undefined, ...(init || {}) }),
  delete: <T>(path: string, init?: RequestInit) => request<T>(path, { method: 'DELETE', ...(init || {}) }),
};

export default http;
