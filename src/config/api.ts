export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL,
  ENDPOINTS: {
    ANALYZE_IMAGE: "/api/analyze-image",
    CHUNK_TEXT:    "/api/chunk",
  },
} as const;
