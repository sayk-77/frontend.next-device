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
            '4447c78071b0938a4a0890659dfd33ae.serveo.net',
        ],
    },
};

export default withPWA(nextConfig);
