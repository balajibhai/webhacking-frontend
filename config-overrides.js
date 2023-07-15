const fallback = require.resolve("timers-browserify");

module.exports = {
  webpack: (config) => {
    config.resolve.fallback = { timers: fallback };
    return config;
  },
};
