// Enables Metro (Expo) to load .woff and .woff2 font assets.
// After adding this file, restart the dev server with cache clear:
//   npx expo start -c
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Some Expo versions already include woff/woff2; push defensively if missing.
const extraExts = ['woff', 'woff2'];
extraExts.forEach(ext => {
  if (!config.resolver.assetExts.includes(ext)) {
    config.resolver.assetExts.push(ext);
  }
});

module.exports = config;