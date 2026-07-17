/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'i.ytimg.com' },
      { protocol: 'https', hostname: 'img.youtube.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  async redirects() {
    return [
      {
        source: '/articles/the-supreme-court-just-gutted-the-voting-rights-act-—-and-black-voters-will-pay-the-price',
        destination: '/articles/supreme-court-gutted-voting-rights-act-black-voters',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
