// DropArea — .tolv-drop-area（ドラッグ&ドロップ領域：basic-secondary の地色＋強調境界。角丸あり / なし）

// 幅・高さは利用側で指定（Figma は Fixed 152×152）
const dropArea = ({ label, square, width = 152, height = 152 }) => `<div class="tolv-drop-area${square ? ' tolv-drop-area--square' : ''}" style="width:${width}px;height:${height}px">`
  + `<span style="text-align:center;font:500 12px var(--font-sans);color:var(--color-fg-basic-secondary)">${label}</span>`
  + `</div>`;

export default {
  title: 'Components/DropArea',
  tags: ['autodocs'],
  render: dropArea,
  parameters: {
    docs: {
      description: {
        component: [
          '**Spec**',
          '- 幅・高さ: 固定（利用側で `width` / `height` を指定）。余白なし',
          '- 中身（Slot）: 全面に広がり、縦並び・中央寄せ',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    square: { control: 'boolean', description: '角丸なし（Figma Radius=False）' },
    width: { control: { type: 'number', min: 48, step: 8 } },
    height: { control: { type: 'number', min: 48, step: 8 } },
  },
  args: { label: 'ここにドロップ', square: false, width: 152, height: 152 },
};

export const Playground = {};

export const Overview = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => {
    const cell = (caption, args) => `<div style="display:flex;flex-direction:column;gap:8px;align-items:center">${dropArea(args)}`
      + `<span style="font:500 12px var(--font-sans);color:var(--color-fg-basic-secondary)">${caption}</span></div>`;
    return `<div style="display:inline-flex;gap:24px;align-items:flex-start">`
      + cell('Radius=True', { label: 'ここにドロップ', square: false })
      + cell('Radius=False（--square）', { label: 'ここにドロップ', square: true })
      + cell('サイズ指定（320×120）', { label: 'ファイルをここにドロップ', width: 320, height: 120 })
      + `</div>`;
  },
};
