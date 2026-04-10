/** @type {import('next').NextConfig} */
const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

const remotePatterns = [];
if (strapiUrl) {
  try {
    const parsed = new URL(strapiUrl);
    remotePatterns.push({
      protocol: parsed.protocol.replace(':', ''),
      hostname: parsed.hostname,
      port: parsed.port,
      pathname: '/uploads/**',
    });

    if (parsed.hostname.endsWith('.strapiapp.com')) {
      const mediaHostname = parsed.hostname.replace('.strapiapp.com', '.media.strapiapp.com');
      remotePatterns.push({
        protocol: parsed.protocol.replace(':', ''),
        hostname: mediaHostname,
        port: parsed.port,
        pathname: '/**',
      });
    }
  } catch {
    // Invalid URL should not block app startup.
  }
}

const nextConfig = {
  images: {
    remotePatterns,
  },
};
export default nextConfig;
