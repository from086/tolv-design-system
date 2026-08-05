// グローバル読み込み：配信物の tokens / component CSS をそのまま使う
import '../tokens/tokens.css';
import '../components/button.css';

/** ツールバーのテーマ切替に応じて :root[data-theme] を設定 */
const withTheme = (story, context) => {
  const theme = context.globals.theme ?? 'light';
  const root = document.documentElement;
  if (theme === 'auto') {
    delete root.dataset.theme; // OS 設定 (prefers-color-scheme) に追従
  } else {
    root.dataset.theme = theme;
  }
  // Storybook のキャンバス背景をトークンに合わせる
  document.documentElement.style.background = 'var(--color-bg-basic-primary)';
  document.body.style.color = 'var(--color-fg-basic-primary)';
  document.body.style.fontFamily = 'var(--font-sans)';
  return story();
};

/** @type { import('@storybook/html-vite').Preview } */
const preview = {
  globalTypes: {
    theme: {
      description: 'カラーテーマ',
      toolbar: {
        title: 'Theme',
        icon: 'contrast',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
          { value: 'auto', title: 'Auto (OS)' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
  decorators: [withTheme],
  parameters: {
    layout: 'centered',
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
    a11y: { test: 'todo' },
  },
};

export default preview;
