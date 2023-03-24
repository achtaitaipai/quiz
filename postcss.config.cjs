const postcssPresetEnv = require("postcss-preset-env");

const config = {
  plugins: [
    postcssPresetEnv({
      stage: 3,
      features: {
        "nesting-rules": true,
      },
    }),
  ],
};

module.exports = config;
