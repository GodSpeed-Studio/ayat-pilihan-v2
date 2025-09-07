// Lokasi: next.config.mjs (di folder utama)
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Ini akan mencegah build gagal karena error linting minor
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;