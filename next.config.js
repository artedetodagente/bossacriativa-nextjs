// next.config.js
const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');

const nextConfig = {
  images: {
    domains: ['wp-admin.bossacriativa.artedetodagente.com.br'],
  },
};

module.exports = withPlugins([[withImages]], nextConfig);
// module.exports = withImages();
