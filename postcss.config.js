const tailwindcss = require('tailwindcss');
const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
  plugins: [
    tailwindcss,
    postcssPresetEnv({
      stage: 2,
      features: {
        'nesting-rules': true,
        'custom-properties': false, // keep native CSS vars at runtime
        'custom-media-queries': true,
      },
      autoprefixer: {
        flexbox: 'no-2009',
      },
    }),
  ],
};
