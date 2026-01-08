'use client';
import { CldImage } from 'next-cloudinary';
import Image from 'next/image';
import { getCloudinaryPublicId, normalizeImageUrl } from '@/lib/imageHelper';

/**
 * OptimizedImage component that automatically uses CldImage for Cloudinary URLs
 * and falls back to Next.js Image for other sources
 */
export default function OptimizedImage({ src, alt, width, height, fill, className, ...props }) {
  if (!src) return null;

  // Check if it's a Cloudinary URL
  const isCloudinary = src.includes('res.cloudinary.com') || src.includes('cloudinary');
  
  if (isCloudinary) {
    // Extract public ID for Cloudinary
    const publicId = getCloudinaryPublicId(src);
    
    return (
      <CldImage
        src={publicId}
        alt={alt}
        width={width || 500}
        height={height || 500}
        className={className}
        crop={{
          type: 'auto',
          source: true
        }}
        {...props}
      />
    );
  }

  // Use standard Next.js Image for non-Cloudinary URLs
  const normalizedSrc = normalizeImageUrl(src);
  
  if (fill) {
    return (
      <Image
        src={normalizedSrc}
        alt={alt}
        fill
        className={className}
        unoptimized
        {...props}
      />
    );
  }

  return (
    <Image
      src={normalizedSrc}
      alt={alt}
      width={width || 500}
      height={height || 500}
      className={className}
      unoptimized
      {...props}
    />
  );
}
