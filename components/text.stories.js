// Text — .tolv-text（見出し／本文。h1/h2/h3 に TrailingIconButton を配置可）
import { help } from './_icons.js';

const trailingBtn = `<button type="button" class="tolv-trailing-icon-button" aria-label="ヘルプ">${help}</button>`;

const text = ({ type, label, trailing }) =>
  `<span class="tolv-text tolv-text--${type}"><span class="tolv-text__label">${label}</span>${trailing ? trailingBtn : ''}</span>`;

export default {
  title: 'Components/Text',
  tags: ['autodocs'],
  render: text,
  argTypes: {
    type: { control: 'inline-radio', options: ['h1', 'h2', 'h3', 'body', 'caption'] },
    label: { control: 'text' },
    trailing: { control: 'boolean', description: '末尾アイコンボタン（h1/h2/h3 で使用）' },
  },
  args: { type: 'h1', label: '見出しテキスト', trailing: true },
};

export const Playground = {};

export const Overview = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => `<div style="display:flex;flex-direction:column;gap:14px;align-items:flex-start">`
    + [['h1', '見出し h1'], ['h2', '見出し h2'], ['h3', '見出し h3'], ['body', '本文 body'], ['caption', 'キャプション caption']]
      .map(([t, l]) => text({ type: t, label: l, trailing: ['h1', 'h2', 'h3'].includes(t) }))
      .join('')
    + `</div>`,
};
