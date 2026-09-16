// SortButton — .tolv-sort-button（並び替えアイコンボタン）
import { sortAsc, sortDesc } from './_icons.js';
const ICON = { asc: sortAsc, desc: sortDesc };

const btn = ({ type, selected }) => {
  const cls = ['tolv-sort-button', selected ? 'is-selected' : ''].filter(Boolean).join(' ');
  return `<button type="button" class="${cls}" aria-label="${type === 'asc' ? '昇順' : '降順'}"${selected ? ' aria-pressed="true"' : ''}>${ICON[type]}</button>`;
};

export default {
  title: 'Components/SortButton',
  tags: ['autodocs'],
  render: btn,
  argTypes: {
    type: { control: 'inline-radio', options: ['asc', 'desc'] },
    selected: { control: 'boolean' },
  },
  args: { type: 'asc', selected: false },
};

export const Playground = {};

export const Overview = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => {
    const cell = (label, args) => `<div style="text-align:center"><div style="font:500 12px var(--font-sans);color:var(--color-fg-basic-secondary);margin-bottom:6px">${label}</div>${btn(args)}</div>`;
    return `<div style="display:flex;gap:24px;align-items:flex-end">`
      + cell('Asc / 未選択', { type: 'asc', selected: false })
      + cell('Asc / 選択', { type: 'asc', selected: true })
      + cell('Desc / 未選択', { type: 'desc', selected: false })
      + cell('Desc / 選択', { type: 'desc', selected: true })
      + `</div>`;
  },
};
