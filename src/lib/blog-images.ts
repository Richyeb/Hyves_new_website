export const BLOG_FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80";

const GOOGLE_DRIVE_IMAGE_SIZE = 1600;

const getGoogleDriveFileId = (url: URL) => {
  if (!/(^|\.)drive\.google\.com$/i.test(url.hostname)) return "";

  const pathMatch = url.pathname.match(/\/file\/d\/([^/]+)/);
  const queryId = url.searchParams.get("id");

  return pathMatch?.[1] || queryId || "";
};

export const normalizeBlogImageUrl = (imageUrl?: string) => {
  const trimmedUrl = imageUrl?.trim();
  if (!trimmedUrl) return BLOG_FALLBACK_IMAGE;

  try {
    const url = new URL(trimmedUrl);
    const googleDriveFileId = getGoogleDriveFileId(url);

    if (googleDriveFileId) {
      return `https://drive.google.com/thumbnail?id=${encodeURIComponent(googleDriveFileId)}&sz=w${GOOGLE_DRIVE_IMAGE_SIZE}`;
    }
  } catch {
    return trimmedUrl;
  }

  return trimmedUrl;
};
