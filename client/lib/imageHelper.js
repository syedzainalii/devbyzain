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
  let apiUrl;
  
  // Priority 1: Use environment variable if set
  if (process.env.NEXT_PUBLIC_API_URL) {
    apiUrl = process.env.NEXT_PUBLIC_API_URL;
  }
  // Priority 2: Detect production by hostname (client-side)
  else if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname.includes('vercel.app') || hostname === 'devbyzain.vercel.app' || hostname === 'devbyzain.com') {
      apiUrl = 'https://devbyzain-backend.vercel.app';
    } else {
      apiUrl = 'http://localhost:8000';
    }
  }
  // Priority 3: Default to localhost for development
  else {
    apiUrl = 'http://localhost:8000';
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

// Helper to handle image load errors
export function handleImageError(e) {
  console.error('Image failed to load:', e.target.src);
  e.target.style.display = 'none';
}

/**
 * Check if an image URL is external (needs to be in Next.js domains config)
 */
export function isExternalImage(imageUrl) {
  if (!imageUrl) return false;
  return imageUrl.startsWith('http://') || imageUrl.startsWith('https://');
}
