const webpack = require('webpack');

module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    fallback: {
      ...config.resolve.fallback,
      stream: require.resolve('stream-browserify'),
      assert: require.resolve('assert/'),
      crypto: require.resolve('crypto-browserify'),
      buffer: require.resolve('buffer/'),
      process: require.resolve('process/browser'),
      zlib: require.resolve('browserify-zlib'),
      util: require.resolve('util/'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      os: require.resolve('os-browserify/browser'),
      path: require.resolve('path-browserify'),
    },
    preferRelative: true
  };

  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ];

  return config;
} 