// Record — .tolv-record（テーブル行：Header / Default / Selected）
// Default の「詳細」ボタンはスクロール領域の右端に sticky で固定され、Slot に重なる。
import { chevronRight as CHEVRON, checkboxBlank, checkboxChecked } from './_icons.js';

const checkbox = (checked) =>
  `<label class="tolv-checkbox"><input type="checkbox" class="tolv-checkbox__input"${checked ? ' checked' : ''}>`
  + `<span class="tolv-checkbox__glyph"><span class="tolv-checkbox__blank">${checkboxBlank}</span><span class="tolv-checkbox__checked">${checkboxChecked}</span></span></label>`;

// 横スクロールを起こすため幅広の内容にする
const cells = (bold) => `<div style="display:flex;min-width:0">`
  + ['商品名', 'カテゴリ', '数量', '単価', '担当者', '更新日時'].map((t) => `<div class="tolv-cell${bold ? ' tolv-cell--head' : ''}" style="width:180px;flex:none"><span class="tolv-cell__value">${t}</span></div>`).join('')
  + `</div>`;

const detail = () => `<div class="tolv-record__action"><div class="tolv-record__action-inner">`
  + `<button type="button" class="tolv-record__detail"><span class="tolv-record__detail-label">詳細</span><span class="tolv-record__detail-icon">${CHEVRON}</span></button>`
  + `</div></div>`;

// status: 'header' | 'default' | 'selected'
const record = ({ status }) => {
  const cls = ['tolv-record', status === 'header' ? 'tolv-record--header' : '', status === 'selected' ? 'is-selected' : ''].filter(Boolean).join(' ');
  return `<div class="${cls}">`
    + checkbox(status === 'selected')
    + `<div class="tolv-record__content">${cells(status === 'header')}</div>`
    + (status === 'header' ? '' : detail())
    + `</div>`;
};

// 横スクロール領域（利用側で用意する外側コンテナ）
const scroller = (rows) => `<div style="max-width:560px;overflow-x:auto;border:1px solid var(--color-border-basic-primary);border-radius:var(--radius-medium)"><div style="min-width:1120px">${rows}</div></div>`;

export default {
  title: 'Components/Record',
  tags: ['autodocs'],
  render: (args) => scroller(record(args)),
  argTypes: {
    status: { control: 'inline-radio', options: ['header', 'default', 'selected'] },
  },
  args: { status: 'default' },
};

// 横スクロールしても「詳細」ボタンが右端に固定される
export const Playground = {};

export const Overview = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => `<div style="font:500 12px var(--font-sans);color:var(--color-fg-basic-secondary);margin-bottom:8px">← 横スクロールすると「詳細」は右端に固定されたまま</div>`
    + scroller(record({ status: 'header' }) + record({ status: 'default' }) + record({ status: 'selected' }) + record({ status: 'default' })),
};
