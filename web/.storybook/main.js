const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  stories: [
    '../**/__stories__/*.@(js|jsx|ts|tsx|mdx)',
    '../**/*.stories.@(js|jsx|ts|tsx|mdx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    // '@storybook/addon-a11y', // added
    // '@storybook/addon-storysource', // added
    // 'storybook-addon-apollo-client', // added
    // '@storybook/addon-docs', // added
    // 'storybook-addon-next-router', // added
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
          postcssOptions: {
            plugins: {
              tailwindcss: { config: './.storybook/tailwind.config.js' },
              autoprefixer: {},
            },
          },
        },
      },
    },
  ],
  typescript: {
    reactDocgenTypescriptOptions: {
      shouldRemoveUndefinedFromOptional: true,
      propFilter: {
        skipPropsWithoutDoc: false,
      },
    },
  },
  core: {
    builder: 'webpack5',
  },
  webpackFinal: (config) => {
    config.resolve.plugins = [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, '../tsconfig.json'),
      }),
    ];
    const ruleCssIndex = config.module.rules.findIndex(
      (rule) => rule.test.toString() === '/\\.css$/'
    );
    const cssRule = config.module.rules[ruleCssIndex];

    // sass rule
    const sassRule = {
      test: /\.s[ca]ss$/,
      use: [
        ...cssRule.use,
        {
          loader: require.resolve('sass-loader'),
        },
      ],
    };

    config.module.rules.push(sassRule);

    return config;
  },
};
