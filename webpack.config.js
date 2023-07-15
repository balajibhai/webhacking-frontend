// At the top of the file
const Buffer = require("buffer").Buffer;

// Inside the module.exports object
module.exports = {
  // ...
  resolve: {
    fallback: {
      buffer: require.resolve("buffer/"),
      timers: require.resolve("timers-browserify/"),
    },
  },
};
