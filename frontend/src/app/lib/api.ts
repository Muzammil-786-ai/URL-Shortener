import type { Link, CreateLinkPayload } from '../types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${url}`, {
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    ...options,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new ApiError(body?.message || `Request failed (${res.status})`, res.status);
  }

  if (res.status === 204) return undefined as T;
  return res.json();
}

export function getLinks(): Promise<Link[]> {
  return request<Link[]>('/links');
}

export function createLink(data: CreateLinkPayload): Promise<Link> {
  return request<Link>('/links', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function deleteLink(id: number): Promise<void> {
  return request<void>(`/links/${id}`, { method: 'DELETE' });
}
