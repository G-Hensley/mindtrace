export function getBaseUrl() {
  // In production, use the VERCEL_URL or custom domain
  if (process.env.NODE_ENV === 'production') {
    return process.env.NEXT_PUBLIC_SITE_URL || `https://${process.env.VERCEL_URL}` || 'https://yourdomain.com';
  }
  
  // In development, use localhost
  return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
}
