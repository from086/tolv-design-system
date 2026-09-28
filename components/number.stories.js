// Number — .tolv-number（等幅の数値表示：サイズ h1/h2/body/caption、符号色 plus/minus）

const number = ({ size, sign, value }) => {
  const cls = ['tolv-number', `tolv-number--${size}`, sign === 'minus' ? 'tolv-number--minus' : 'tolv-number--plus'].join(' ');
  return `<span class="${cls}">${value}</span>`;
};

export default {
  title: 'Components/Number',
  tags: ['autodocs'],
  render: number,
  argTypes: {
    size: { control: 'inline-radio', options: ['h1', 'h2', 'body', 'caption'] },
    sign: { control: 'inline-radio', options: ['plus', 'minus'] },
    value: { control: 'text' },
  },
  args: { size: 'h1', sign: 'plus', value: '1,234' },
};

export const Playground = {};

export const Overview = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => {
    const row = (label, size) => `<div style="display:flex;align-items:baseline;gap:24px">`
      + `<span style="width:72px;font:500 12px var(--font-sans);color:var(--color-fg-basic-secondary)">${label}</span>`
      + number({ size, sign: 'plus', value: '1,234' })
      + number({ size, sign: 'minus', value: '-567' })
      + `</div>`;
    return `<div style="display:flex;flex-direction:column;gap:12px">`
      + row('h1', 'h1') + row('h2', 'h2') + row('body', 'body') + row('caption', 'caption')
      + `</div>`;
  },
};
