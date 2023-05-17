/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/SearchPage/:query',
        destination: '/SearchPage?query=:query',
      },
    ];
  },
};