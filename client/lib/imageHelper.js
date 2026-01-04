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

  // If it's in the old /uploads/ format, convert to new format
  if (imageUrl.startsWith('/uploads/')) {
    const filename = imageUrl.replace('/uploads/', '');
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    
    // Use /api/files endpoint for serving
    return `${apiUrl}/api/files/${filename}`;
  }

  // If it's a relative path without /uploads/, assume it's a filename
  if (!imageUrl.startsWith('/')) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
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
