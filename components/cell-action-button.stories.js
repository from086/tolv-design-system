// CellActionButton — .tolv-cell-action-button（Cell 用アイコンボタン：Edit / Undo / Submit × Default / Hover / Disabled）
import { pencil, undo, check } from './_icons.js';

const TYPES = {
  edit: { icon: pencil, label: '編集' },
  undo: { icon: undo, label: '元に戻す' },
  submit: { icon: check, label: '確定' },
};

const btn = ({ type, disabled }) =>
  `<button type="button" class="tolv-cell-action-button tolv-cell-action-button--${type}" aria-label="${TYPES[type].label}"${disabled ? ' disabled' : ''}>${TYPES[type].icon}</button>`;

export default {
  title: 'Components/CellActionButton',
  tags: ['autodocs'],
  render: btn,
  argTypes: {
    type: { control: 'inline-radio', options: Object.keys(TYPES), description: 'Edit（鉛筆・グレー）/ Undo / Submit（緑）' },
    disabled: { control: 'boolean' },
  },
  args: { type: 'edit', disabled: false },
};

export const Playground = {};

export const Overview = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => {
    const cap = (t) => `<div style="font:500 12px var(--font-sans);color:var(--color-fg-basic-secondary);margin-bottom:6px">${t}</div>`;
    const col = (title, disabled) => `<div>${cap(title)}<div style="display:flex;gap:8px">`
      + Object.keys(TYPES).map((type) => btn({ type, disabled })).join('')
      + `</div></div>`;
    return `<div style="display:flex;gap:40px">${col('Default（hover で地色）', false)}${col('Disabled', true)}</div>`;
  },
};
