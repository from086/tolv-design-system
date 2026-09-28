// Text — .tolv-text（見出し／本文。h1/h2/h3 に TrailingIconButton を配置可。文字色は --primary|secondary|brand|caution|success）
import { help } from './_icons.js';

// Help はグレー（Figma: icon-color Secondary）
const trailingBtn = `<button type="button" class="tolv-trailing-icon-button tolv-trailing-icon-button--secondary" aria-label="ヘルプ">${help}</button>`;

const text = ({ type, color, label, trailing }) =>
  `<span class="tolv-text tolv-text--${type}${color && color !== 'default' ? ` tolv-text--${color}` : ''}"><span class="tolv-text__label">${label}</span>${trailing ? trailingBtn : ''}</span>`;

export default {
  title: 'Components/Text',
  tags: ['autodocs'],
  render: text,
  argTypes: {
    type: { control: 'inline-radio', options: ['h1', 'h2', 'h3', 'body', 'caption'] },
    color: { control: 'inline-radio', options: ['default', 'primary', 'secondary', 'brand', 'caution', 'success'], description: '文字色（default = Type の既定色）' },
    label: { control: 'text' },
    trailing: { control: 'boolean', description: '末尾アイコンボタン（h1/h2/h3 で使用）' },
  },
  args: { type: 'h1', color: 'default', label: '見出しテキスト', trailing: true },
};

export const Playground = {};

export const Overview = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => `<div style="display:flex;flex-direction:column;gap:14px;align-items:flex-start">`
    + [['h1', '見出し h1'], ['h2', '見出し h2'], ['h3', '見出し h3'], ['body', '本文 body'], ['caption', 'キャプション caption']]
      .map(([t, l]) => text({ type: t, label: l, trailing: ['h1', 'h2', 'h3'].includes(t) }))
      .join('')
    + `<div style="display:flex;gap:16px;margin-top:8px">`
    + ['primary', 'secondary', 'brand', 'caution', 'success'].map((c) => text({ type: 'body', color: c, label: c })).join('')
    + `</div></div>`,
};
