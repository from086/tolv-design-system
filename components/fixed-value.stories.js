// FixedValue — .tolv-fixed-value（読み取り専用の値表示）
const render = ({ text }) => `<div class="tolv-fixed-value">${text}</div>`;

export default {
  title: 'Components/FixedValue',
  tags: ['autodocs'],
  render,
  argTypes: { text: { control: 'text' } },
  args: { text: 'テキスト' },
};

export const Playground = {};

export const Overview = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => {
    // 入力と並べて高さ・行揃えが一致することを示す
    return `<div style="display:flex;flex-direction:column;gap:8px;width:280px">`
      + `<label class="tolv-field__label">ラベル</label>`
      + `<div class="tolv-fixed-value">確定済みの値</div>`
      + `<div style="color:var(--color-fg-basic-secondary);font:500 12px var(--font-sans)">↑ 枠なし・入力と同じ 32px 高さ／余白</div>`
      + `</div>`;
  },
};
