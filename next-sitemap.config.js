/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://next-device.publicvm.com',
    generateRobotsTxt: true,
    exclude: ['/dashboard', '/dashboard/*'],
    sitemapSize: 5000,
}