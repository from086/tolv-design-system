// SortButton — .tolv-sort-button（並び替えアイコンボタン）
const ICON = {
  asc: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h5M5 12h9M5 16h13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M18 5v6M18 5l-2.5 2.5M18 5l2.5 2.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  desc: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h13M5 12h9M5 16h5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M18 19v-6M18 19l-2.5-2.5M18 19l2.5-2.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
};

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
