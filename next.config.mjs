import nextPWA from 'next-pwa';

const withPWA = nextPWA({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disableDevLogs: false,
    buildExcludes: [/app-build-manifest\.json$/]
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            '127.0.0.1',
            '192.168.0.102',
            'localhost',
            '89138ce6da0a9719d3c33a68f5773c90.serveo.net',
        ],
    },
};

export default withPWA(nextConfig);
