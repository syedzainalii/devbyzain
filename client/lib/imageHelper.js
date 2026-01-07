/**
 * Helper function to normalize image URLs for both old and new formats
 * Handles:
 * - Old format: /uploads/filename.png
 * - New format: https://backend-url/api/files/filename.png
 * - Absolute URLs
 */
export function normalizeImageUrl(imageUrl) {
  if (!imageUrl) return null;

  // If it's already an absolute URL (http:// or https://), return as is
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }

  // Determine the API URL based on environment
  // Check if we're in production by looking at the hostname
  let apiUrl = 'http://localhost:8000'; // Default for development
  
  if (typeof window !== 'undefined') {
    // In browser - check the hostname
    if (window.location.hostname.includes('vercel.app') || window.location.hostname === 'devbyzain.vercel.app') {
      apiUrl = 'https://devbyzain-backend.vercel.app';
    }
  } else if (process.env.NEXT_PUBLIC_API_URL) {
    // Server-side or env variable set
    apiUrl = process.env.NEXT_PUBLIC_API_URL;
  }

  // If it's in the old /uploads/ format, convert to new format
  if (imageUrl.startsWith('/uploads/')) {
    const filename = imageUrl.replace('/uploads/', '');
    return `${apiUrl}/api/files/${filename}`;
  }

  // If it's a relative path without /uploads/, assume it's a filename
  if (!imageUrl.startsWith('/')) {
    return `${apiUrl}/api/files/${imageUrl}`;
  }

  // Default: return as is
  return imageUrl;
}

/**
 * Check if an image URL is external (needs to be in Next.js domains config)
 */
export function isExternalImage(imageUrl) {
  if (!imageUrl) return false;
  return imageUrl.startsWith('http://') || imageUrl.startsWith('https://');
}
