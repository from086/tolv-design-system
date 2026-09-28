// Container — .tolv-container（要素を包む枠：base / primary / secondary、角丸切替）

const slot = () => `<div style="width:120px;height:120px;display:flex;align-items:center;justify-content:center;font:500 12px var(--font-sans);color:var(--color-fg-basic-secondary)">Slot</div>`;

const container = ({ style, square }) => {
  const cls = ['tolv-container', style !== 'base' ? `tolv-container--${style}` : '', square ? 'tolv-container--square' : ''].filter(Boolean).join(' ');
  return `<div class="${cls}">${slot()}</div>`;
};

export default {
  title: 'Components/Container',
  tags: ['autodocs'],
  render: container,
  argTypes: {
    style: { control: 'inline-radio', options: ['base', 'primary', 'secondary'] },
    square: { control: 'boolean', description: '角丸なし' },
  },
  args: { style: 'primary', square: false },
};

export const Playground = {};

export const Overview = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => {
    const cell = (label, args) => `<div style="display:flex;flex-direction:column;gap:8px;align-items:center">`
      + container(args)
      + `<span style="font:500 12px var(--font-sans);color:var(--color-fg-basic-secondary)">${label}</span></div>`;
    return `<div style="display:flex;flex-wrap:wrap;gap:24px">`
      + cell('base', { style: 'base', square: false })
      + cell('primary', { style: 'primary', square: false })
      + cell('secondary', { style: 'secondary', square: false })
      + cell('primary / square', { style: 'primary', square: true })
      + `</div>`;
  },
};
