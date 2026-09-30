// Container — .tolv-container（要素を包む枠：base / primary / secondary、角丸切替）

const slot = () => `<div style="width:120px;height:120px;display:flex;align-items:center;justify-content:center;font:500 12px var(--font-sans);color:var(--color-fg-basic-secondary)">Slot</div>`;

const container = ({ style, square, hug }) => {
  const cls = ['tolv-container', style !== 'base' ? `tolv-container--${style}` : '', square ? 'tolv-container--square' : '', hug ? 'tolv-container--hug' : ''].filter(Boolean).join(' ');
  return `<div class="${cls}">${slot()}</div>`;
};

const caption = (text) => `<span style="font:500 12px var(--font-sans);color:var(--color-fg-basic-secondary)">${text}</span>`;
const texts = () => `<span class="tolv-text tolv-text--h3"><span class="tolv-text__label">見出し</span></span>`
  + `<span class="tolv-text tolv-text--body"><span class="tolv-text__label">本文のテキストが入ります</span></span>`
  + `<span class="tolv-text tolv-text--caption"><span class="tolv-text__label">キャプション</span></span>`;

export default {
  title: 'Components/Container',
  tags: ['autodocs'],
  render: container,
  parameters: {
    docs: {
      description: {
        component: [
          '**Spec**',
          '- 幅: 親の幅（既定）。`.tolv-container--hug` で中身に合わせる、または `width` を px 指定',
          '- 高さ: 中身に合わせる',
          '- 中身（Slot）: 幅いっぱい・高さは中身に合わせる・はみ出しは切る',
          '  - 並び方向: 縦（既定）… `.tolv-container--row` で横',
          '  - 寄せ: 左上（既定）… `.tolv-container--center` で中央',
          '  - 間隔: 0px（既定）… `style="--tolv-container-gap: 8px"` のように変更',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    style: { control: 'inline-radio', options: ['base', 'primary', 'secondary'] },
    square: { control: 'boolean', description: '角丸なし' },
    hug: { control: 'boolean', description: '幅を中身に合わせる（既定は親の幅）' },
  },
  args: { style: 'primary', square: false, hug: false },
};

export const Playground = {};

export const Overview = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => {
    // 幅は既定で親の幅 → 見比べやすいよう 200px の枠に入れる
    const cell = (label, args) => `<div style="width:200px;display:flex;flex-direction:column;gap:8px;align-items:center">`
      + container(args) + caption(label) + `</div>`;
    const block = (label, html) => `<div style="margin-top:24px;display:flex;flex-direction:column;gap:8px;align-items:flex-start;max-width:480px">${html}${caption(label)}</div>`;
    return `<div style="display:flex;flex-wrap:wrap;gap:24px">`
      + cell('base', { style: 'base' })
      + cell('primary', { style: 'primary' })
      + cell('secondary', { style: 'secondary' })
      + cell('primary / square', { style: 'primary', square: true })
      + `</div>`
      + block('中身が複数（既定：縦並び・左上寄せ・間隔 0px）', `<div class="tolv-container tolv-container--primary">${texts()}</div>`)
      + block('間隔を変更（--tolv-container-gap: 8px）', `<div class="tolv-container tolv-container--primary" style="--tolv-container-gap: 8px">${texts()}</div>`)
      + block('幅を中身に合わせる（.tolv-container--hug）', `<div class="tolv-container tolv-container--primary tolv-container--hug">${texts()}</div>`)
      + block('横並び・中央寄せ（--row / --center、間隔 8px）', `<div class="tolv-container tolv-container--primary tolv-container--row tolv-container--center" style="--tolv-container-gap: 8px">${texts()}</div>`);
  },
};
