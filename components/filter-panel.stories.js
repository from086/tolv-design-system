// FilterPanel — .tolv-filter-panel（テーブル見出しの FilterButton から開く絞り込みパネル）
// 並び替え（RadioButton 昇順/降順）＋ 区切り線 ＋ 絞り込み条件（検索＋CheckBox 一覧 / 期間指定）
import { radioUnchecked, radioChecked, checkboxBlank, checkboxChecked, checkboxIndeterminate, search, close, calendar } from './_icons.js';

const radio = (label, checked, name) => `<label class="tolv-radio">`
  + `<input type="radio" class="tolv-radio__input" name="${name}"${checked ? ' checked' : ''}>`
  + `<span class="tolv-radio__glyph"><span class="tolv-radio__off">${radioUnchecked}</span><span class="tolv-radio__on">${radioChecked}</span></span>`
  + `<span class="tolv-radio__label">${label}</span></label>`;
const checkbox = (label, checked) => `<label class="tolv-checkbox">`
  + `<input type="checkbox" class="tolv-checkbox__input"${checked ? ' checked' : ''}>`
  + `<span class="tolv-checkbox__glyph"><span class="tolv-checkbox__blank">${checkboxBlank}</span><span class="tolv-checkbox__checked">${checkboxChecked}</span><span class="tolv-checkbox__indet">${checkboxIndeterminate}</span></span>`
  + `<span class="tolv-checkbox__label">${label}</span></label>`;
const searchField = () => `<div class="tolv-search" data-suggestions='[]' data-tolv-init><div class="tolv-search__control">`
  + `<input class="tolv-search__input" placeholder="テキスト" value="">`
  + `<span class="tolv-search__icon tolv-search__icon--search">${search}</span>`
  + `<span class="tolv-search__icon tolv-search__icon--clear">${close}</span></div></div>`;
const dateSelect = (disabled) => `<div class="tolv-date-select${disabled ? ' is-disabled' : ''}" data-value="2026-01-01"><span class="tolv-date-select__group">`
  + `<span class="tolv-date-select__seg">2026</span><span class="tolv-date-select__sep">/</span>`
  + `<span class="tolv-date-select__seg">01</span><span class="tolv-date-select__sep">/</span>`
  + `<span class="tolv-date-select__seg">01</span></span><span class="tolv-date-select__icon">${calendar}</span></div>`;

const sort = (n) => `<div class="tolv-filter-panel__sort" role="radiogroup" aria-label="並び替え">${radio('昇順', false, n)}${radio('降順', true, n)}</div>`;

// Figma Type=Default：検索＋CheckBox 一覧（複数選択）
const listPanel = () => `<div class="tolv-filter-panel">`
  + sort('sort-a')
  + `<hr class="tolv-divider">`
  + `<div class="tolv-filter-panel__section">${searchField()}`
  + `<div class="tolv-filter-panel__items">${['ラベル', 'ラベル', 'ラベル', 'ラベル'].map((l) => checkbox(l, false)).join('')}</div></div>`
  + `</div>`;

// Figma Type=Period（期間指定）：見出し＋RadioButton 一覧＋カスタム期間（選ぶまで DateSelect は無効）
const periodPanel = (custom = false) => `<div class="tolv-filter-panel">`
  + sort('sort-b')
  + `<hr class="tolv-divider">`
  + `<div class="tolv-filter-panel__section"><span class="tolv-field__label">期間指定</span>`
  + `<div class="tolv-filter-panel__items" role="radiogroup" aria-label="期間指定">`
  + ['指定なし', '今月', '前月', '直近3ヶ月', '直近12ヶ月', 'カスタム'].map((l, i) => radio(l, custom ? l === 'カスタム' : i === 0, 'period' + (custom ? 'c' : ''))).join('')
  + `<div class="tolv-filter-panel__range">${dateSelect(!custom)}<div class="tolv-fixed-value">〜</div>${dateSelect(!custom)}</div>`
  + `</div></div>`
  + `</div>`;

export default {
  title: 'Components/FilterPanel',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          '**Spec**',
          '- 幅: 親の幅（既定）… px 指定に変更可',
          '- 最小幅: 中身の幅（親が狭くても、選択肢や入力欄を省略・折り返ししないところまで広がる）',
          '- 高さ: 中身に合わせる',
          '- 最大高さ: 480px（`--tolv-filter-panel-max-height` で変更可）。超えたらパネル内でスクロール',
          '',
          '**構成**: `__sort`（昇順/降順）→ `.tolv-divider` → `__section`（`.tolv-search` や `.tolv-field__label` ＋ `__items`）。カスタム期間は `__items` の最後に `__range` を置く',
          '',
          '開閉や絞り込みの実行は利用側で実装します（FilterButton から開く想定）。',
        ].join('\n'),
      },
    },
  },
  argTypes: { type: { control: 'inline-radio', options: ['list', 'period'], description: 'list（Figma Type=Default：検索＋CheckBox）/ period（Figma Type=Period：期間指定）' }, custom: { control: 'boolean', description: 'カスタム期間を選択', if: { arg: 'type', eq: 'period' } } },
  args: { type: 'list', custom: false },
  render: ({ type, custom }) => `<div style="width:360px">${type === 'period' ? periodPanel(custom) : listPanel()}</div>`,
};

export const Playground = {};

export const Overview = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => {
    const cap = (t) => `<div style="font:500 12px var(--font-sans);color:var(--color-fg-basic-secondary);margin-bottom:6px">${t}</div>`;
    return `<div style="display:flex;gap:32px;align-items:flex-start;flex-wrap:wrap">`
      + `<div style="width:360px">${cap('検索＋CheckBox 一覧（Figma Type=Default）')}${listPanel()}</div>`
      + `<div style="width:360px">${cap('期間指定（Figma Type=Period）')}${periodPanel(false)}</div>`
      + `<div style="width:160px">${cap('幅の狭い親（160px。中身の幅まで広がる）')}${periodPanel(true)}</div>`
      + `</div>`;
  },
};
