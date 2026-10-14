// FilterButton — .tolv-filter-button（絞り込みアイコンボタン。SortButton と同じ形）
// 未選択 = filter_alt outline（グレー）/ 選択中 = filter_alt fill（濃色）
import { filterAlt, filterAltFill } from './_icons.js';

const btn = ({ selected }) => {
  const cls = ['tolv-filter-button', selected ? 'is-selected' : ''].filter(Boolean).join(' ');
  return `<button type="button" class="${cls}" aria-label="絞り込み"${selected ? ' aria-pressed="true"' : ''}>${selected ? filterAltFill : filterAlt}</button>`;
};

export default {
  title: 'Components/FilterButton',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          '**Spec**',
          '- 24×24（アイコン 20px ＋ 余白 2px）・角丸 medium。hover で地色',
          '- 未選択: filter_alt の outline・グレー / 選択中（`.is-selected`）: filter_alt の fill・濃色',
          '- テーブル見出し（Cell の FilterableHead）に置き、押すと FilterPanel を開く（開閉は利用側で実装）',
        ].join('\n'),
      },
    },
  },
  render: btn,
  argTypes: { selected: { control: 'boolean', description: '絞り込み中' } },
  args: { selected: false },
};

export const Playground = {};

export const Overview = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => {
    const cell = (label, args) => `<div style="text-align:center"><div style="font:500 12px var(--font-sans);color:var(--color-fg-basic-secondary);margin-bottom:6px">${label}</div>${btn(args)}</div>`;
    return `<div style="display:flex;gap:24px;align-items:flex-end">`
      + cell('未選択', { selected: false })
      + cell('選択中（絞り込み中）', { selected: true })
      + `</div>`;
  },
};
