export const API_CONFIG = {
  CHROMA_API_URL:  process.env.NEXT_PUBLIC_API_URL,
  CHUNKER_API_URL: process.env.NEXT_PUBLIC_CHUNKING_API_URL,
  ENDPOINTS: {
    ANALYZE_IMAGE: "/analyze",
    CHUNK_TEXT:    "/chunk",
    CHUNK_FILE:    "/chunk/file",
  },
} as const;
