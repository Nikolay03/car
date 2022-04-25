const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})
const withImages = require('next-images')
const withPlugins = require('next-compose-plugins')

const config = {
  future: {
    webpack5: true
  },
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true
  }
}

module.exports = withPlugins([withImages, withBundleAnalyzer], config)
