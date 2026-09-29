// DropArea — .tolv-drop-area（ドラッグ&ドロップ領域：basic-secondary の地色＋強調境界。角丸あり / なし）

const dropArea = ({ label, square }) => `<div class="tolv-drop-area${square ? ' tolv-drop-area--square' : ''}">`
  + `<div style="width:120px;height:120px;display:flex;align-items:center;justify-content:center;text-align:center;font:500 12px var(--font-sans);color:var(--color-fg-basic-secondary)">${label}</div>`
  + `</div>`;

export default {
  title: 'Components/DropArea',
  tags: ['autodocs'],
  render: dropArea,
  argTypes: {
    label: { control: 'text' },
    square: { control: 'boolean', description: '角丸なし（Figma Radius=False）' },
  },
  args: { label: 'ここにドロップ', square: false },
};

export const Playground = {};

export const Overview = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => {
    const cell = (caption, args) => `<div style="display:flex;flex-direction:column;gap:8px;align-items:center">${dropArea(args)}`
      + `<span style="font:500 12px var(--font-sans);color:var(--color-fg-basic-secondary)">${caption}</span></div>`;
    return `<div style="display:inline-flex;gap:24px">`
      + cell('Radius=True', { label: 'ここにドロップ', square: false })
      + cell('Radius=False（--square）', { label: 'ここにドロップ', square: true })
      + `</div>`;
  },
};
