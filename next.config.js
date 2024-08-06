const { i18n } = require("./next-i18next.config");

const nextConfig = {
  i18n,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
    ],
    disableStaticImages: true,
  },
};

module.exports = nextConfig;
