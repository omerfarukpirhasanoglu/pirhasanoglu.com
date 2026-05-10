export const API_CONFIG = {
  CHROMA_API_URL:  process.env.NEXT_PUBLIC_API_URL,
  CHUNKER_API_URL: process.env.NEXT_PUBLIC_CHUNKING_API_URL,
  ENDPOINTS: {
    ANALYZE_IMAGE: "/api/analyze-image",
    CHUNK_TEXT:    "/chunk",
  },
} as const;
