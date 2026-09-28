// DropArea — .tolv-drop-area（ドラッグ&ドロップ領域：brand 地色＋brand 境界）

const dropArea = ({ label }) => `<div class="tolv-drop-area">`
  + `<div style="width:120px;height:120px;display:flex;align-items:center;justify-content:center;text-align:center;font:500 12px var(--font-sans);color:var(--color-fg-basic-secondary)">${label}</div>`
  + `</div>`;

export default {
  title: 'Components/DropArea',
  tags: ['autodocs'],
  render: dropArea,
  argTypes: { label: { control: 'text' } },
  args: { label: 'ここにドロップ' },
};

export const Playground = {};

export const Overview = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => dropArea({ label: 'ここにドロップ' }),
};
