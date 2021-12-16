/** @type {import('next').NextConfig} */
const path = require('path')

// Next.js plugins
const withPlugins = require('next-compose-plugins')
const imagesPlugin = require('next-images')

module.exports = withPlugins([
  [imagesPlugin]
], {
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')]
  },
  devIndicators: {
    autoPrerender: false
  },
})
