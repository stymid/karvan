const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

if (!supabaseUrl) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL is not defined");
}

const { hostname } = new URL(supabaseUrl);
/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    // Allow Next.js <Image /> to load & optimize public images from Supabase Storage
    // (e.g. https://<project>.supabase.co/storage/v1/object/public/**)
    // Without this, next/image will throw "hostname is not configured" errors
    remotePatterns: [
      {
        protocol: "https",
        hostname,
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

module.exports = nextConfig;
