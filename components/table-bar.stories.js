// TableBar — .tolv-table-bar（テーブル上部のバー：左スロット / 右スロット / Pager）
// 左スロットは残り幅いっぱい、右スロットは内容幅で右寄せ。各スロット内は 8px 間隔、全体は 16px 間隔。
import { pager } from './_pager.js';
import { chevronDown, check } from './_icons.js';

// 右スロットの例：表示件数の Select（Figma: Select Status=Unset・幅 120）。画面の右寄りなのでパネルは右端そろえ（--align-end）
const perPage = () =>
  `<div class="tolv-select tolv-select--align-end" style="width:120px"><button type="button" class="tolv-select__control" aria-haspopup="listbox" aria-expanded="false">`
  + `<span class="tolv-select__value" data-placeholder="100件表示"></span><span class="tolv-select__icon">${chevronDown}</span></button>`
  + `<div class="tolv-select-panel tolv-select__menu" role="listbox">`
  + ['50件表示', '100件表示', '200件表示'].map((o) => `<div class="tolv-list-item" role="option"><span class="tolv-list-item__label">${o}</span><span class="tolv-list-item__check">${check}</span></div>`).join('')
  + `</div></div>`;

const tableBar = ({ selected }) =>
  `<div class="tolv-table-bar">`
  + `<div class="tolv-table-bar__leading"><span class="tolv-text tolv-text--body tolv-text--secondary">${selected ? `${selected}件選択中` : '未選択'}</span></div>`
  + `<div class="tolv-table-bar__trailing">${perPage()}</div>`
  + pager({ from: 1, to: 100, total: 2000 })
  + `</div>`;

export default {
  title: 'Components/TableBar',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          '**Spec**',
          '- 幅: 親の幅いっぱい（Fill）',
          '- 高さ: 中身に合わせる',
        ].join('\n'),
      },
    },
  },
  render: tableBar,
  argTypes: { selected: { control: 'number', description: '選択件数（0 で「未選択」）' } },
  args: { selected: 0 },
};

export const Playground = {};

export const Overview = {
  parameters: { controls: { disable: true } },
  render: () => `<div style="display:flex;flex-direction:column;gap:24px;max-width:1258px">${tableBar({ selected: 0 })}${tableBar({ selected: 3 })}</div>`,
};
