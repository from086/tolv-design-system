/** @type { import('@storybook/html-vite').StorybookConfig } */
const config = {
  stories: ['../components/**/*.stories.@(js|mjs)'],
  addons: ['@storybook/addon-a11y'],
  framework: {
    name: '@storybook/html-vite',
    options: {},
  },
  // GitHub Pages のサブパス（/tolv-design-system/）配信でアセットが解決するよう相対ベースに
  viteFinal: async (config) => {
    config.base = './';
    return config;
  },
};

export default config;
