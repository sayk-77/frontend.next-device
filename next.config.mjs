import nextPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['127.0.0.1', '192.168.0.102', 'localhost', '192.168.118.185'],
    },
    ...nextPWA({
        dest: 'public',
        register: true,
        skipWaiting: true,
    }),
};

export default nextConfig;