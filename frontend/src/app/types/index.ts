export interface Link {
  id: number;
  original_url: string;
  short_code: string;
  clicks: number;
  created_at: string;
  updated_at: string;
}

export interface CreateLinkPayload {
  original_url: string;
}
