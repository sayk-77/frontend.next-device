import nextPWA from 'next-pwa';

const isDev = process.env.NODE_ENV === 'development';

const pwaConfig = {
    dest: 'public',
    register: false,
    skipWaiting: true,
    disableDevLogs: false,
    cleanupOutdatedCaches: true,
    buildExcludes: [/app-build-manifest\.json$/],

    runtimeCaching: [
        {
            urlPattern: /\/success.*/i,
            handler: 'NetworkOnly',
            options: {
                cacheName: 'success-route',
                networkTimeoutSeconds: 5,
                plugins: [
                    {
                        handlerDidError: async () => {
                            return Response.error();
                        },
                    },
                ],
            },
        },
        {
            urlPattern: /^https:\/\/.*\/api\/.*$/,
            handler: 'NetworkFirst',
            options: {
                cacheName: 'api-cache',
                expiration: {
                    maxEntries: 100,
                    maxAgeSeconds: 24 * 60 * 60,
                },
            },
        },
        {
            urlPattern: /\.(?:js|css)$/i,
            handler: 'StaleWhileRevalidate',
            options: {
                cacheName: 'static-resources',
                expiration: {
                    maxEntries: 100,
                    maxAgeSeconds: 7 * 24 * 60 * 60,
                },
            },
        },
        {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/i,
            handler: 'CacheFirst',
            options: {
                cacheName: 'images',
                expiration: {
                    maxEntries: 100,
                    maxAgeSeconds: 30 * 24 * 60 * 60,
                },
            },
        },
        {
            urlPattern: /\.(?:eot|ttf|woff|woff2)$/i,
            handler: 'CacheFirst',
            options: {
                cacheName: 'fonts',
                expiration: {
                    maxEntries: 50,
                    maxAgeSeconds: 60 * 24 * 60 * 60,
                },
            },
        },
        {
            urlPattern: /\/$/,
            handler: 'NetworkFirst',
            options: {
                cacheName: 'html-cache',
                expiration: {
                    maxEntries: 50,
                    maxAgeSeconds: 24 * 60 * 60,
                },
            },
        },
        {
            urlPattern: /.*/i,
            handler: 'NetworkFirst',
            options: {
                cacheName: 'others',
                expiration: {
                    maxEntries: 100,
                    maxAgeSeconds: 24 * 60 * 60,
                },
                networkTimeoutSeconds: 10,
            },
        },
    ],

    fallbacks: {
        document: '/offline.html',
    },
};

const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        domains: [
            '127.0.0.1',
            '192.168.0.102',
            'localhost',
            '7f0b6a46c1fc8256cf0c734882cee2b9.serveo.net',
        ],
        unoptimized: true,
    }
};

const finalConfig = isDev
    ? nextConfig
    : nextPWA(pwaConfig)(nextConfig);

export default finalConfig;
