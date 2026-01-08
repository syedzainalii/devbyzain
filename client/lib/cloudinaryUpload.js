/**
 * Cloudinary Direct Upload Utility
 * Uploads files directly to Cloudinary from the browser
 * This is faster than uploading through the backend
 */

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = 'ml_default'; // Cloudinary's default unsigned preset

/**
 * Upload a single file directly to Cloudinary
 * @param {File} file - The file to upload
 * @param {Object} options - Upload options
 * @returns {Promise<Object>} - Upload result with url, public_id, etc.
 */
export async function uploadToCloudinary(file, options = {}) {
  if (!CLOUDINARY_CLOUD_NAME) {
    throw new Error('Cloudinary cloud name not configured. Set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME in your .env file.');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', options.upload_preset || CLOUDINARY_UPLOAD_PRESET);
  
  // Optional: Add folder organization
  if (options.folder) {
    formData.append('folder', options.folder);
  } else {
    formData.append('folder', 'portfolio');
  }

  // Optional: Add public_id (filename)
  if (options.public_id) {
    formData.append('public_id', options.public_id);
  } else {
    // Generate unique filename with timestamp
    const timestamp = Math.floor(Date.now() / 1000);
    const filename = file.name.replace(/\.[^/.]+$/, ''); // Remove extension
    formData.append('public_id', `${timestamp}_${filename}`);
  }

  // Optional: Add tags for organization
  if (options.tags) {
    formData.append('tags', options.tags.join(','));
  }

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Upload failed');
    }

    const data = await response.json();
    
    return {
      url: data.secure_url,
      publicId: data.public_id,
      cloudinaryId: data.public_id,
      width: data.width,
      height: data.height,
      format: data.format,
      size: data.bytes,
      thumbnail: data.eager?.[0]?.secure_url || data.secure_url,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error(`Failed to upload to Cloudinary: ${error.message}`);
  }
}

/**
 * Upload multiple files to Cloudinary
 * @param {File[]} files - Array of files to upload
 * @param {Object} options - Upload options
 * @returns {Promise<Object[]>} - Array of upload results
 */
export async function uploadMultipleToCloudinary(files, options = {}) {
  const uploadPromises = files.map(file => uploadToCloudinary(file, options));
  return Promise.all(uploadPromises);
}

/**
 * Delete an image from Cloudinary
 * Note: This requires backend API call because deletion needs authentication
 * @param {string} publicId - The Cloudinary public_id to delete
 * @returns {Promise<void>}
 */
export async function deleteFromCloudinary(publicId) {
  // This should still go through your backend for security
  // because it requires API secret
  const { uploadAPI } = await import('./api');
  return uploadAPI.delete(publicId);
}

/**
 * Generate Cloudinary transformation URL
 * @param {string} publicId - The Cloudinary public_id
 * @param {Object} transformations - Transformation options
 * @returns {string} - Transformed image URL
 */
export function getCloudinaryUrl(publicId, transformations = {}) {
  if (!CLOUDINARY_CLOUD_NAME) {
    return '';
  }

  const {
    width,
    height,
    crop = 'fill',
    quality = 'auto',
    format = 'auto',
  } = transformations;

  let transformString = [];
  
  if (width) transformString.push(`w_${width}`);
  if (height) transformString.push(`h_${height}`);
  if (crop) transformString.push(`c_${crop}`);
  if (quality) transformString.push(`q_${quality}`);
  if (format) transformString.push(`f_${format}`);

  const transform = transformString.length > 0 ? `${transformString.join(',')}/` : '';
  
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transform}${publicId}`;
}

/**
 * Check if direct upload is available
 * @returns {boolean}
 */
export function isCloudinaryConfigured() {
  return !!CLOUDINARY_CLOUD_NAME;
}
