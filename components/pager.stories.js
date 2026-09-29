// Pager — .tolv-pager（前へ / 件数表示 / 次へ）
// ボタン = Button Small Tertiary（アイコンのみ）、数字 = Number body、「-」「/」= Text body。
import { pager } from './_pager.js';

export default {
  title: 'Components/Pager',
  tags: ['autodocs'],
  render: pager,
  argTypes: {
    from: { control: 'number', description: '表示中の先頭件' },
    to: { control: 'number', description: '表示中の末尾件' },
    total: { control: 'number', description: '総件数' },
  },
  args: { from: 1, to: 100, total: 2000 },
};

export const Playground = {};

export const Overview = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => {
    const row = (label, args) => `<div style="display:flex;align-items:center;gap:24px"><span style="width:96px;font:500 12px var(--font-sans);color:var(--color-fg-basic-secondary)">${label}</span>${pager(args)}</div>`;
    return `<div style="display:flex;flex-direction:column;gap:16px">`
      + row('先頭ページ', { from: 1, to: 100, total: 2000 })
      + row('途中', { from: 101, to: 200, total: 2000 })
      + row('最終ページ', { from: 1901, to: 2000, total: 2000 })
      + `</div>`;
  },
};
