// DateSelect — .tolv-date-select（クリックでカレンダーをポップオーバー表示）
// カレンダーは最前面（top layer）に表示し、親の overflow で切れない（calendar.js）。
import { calendar as calSvg, radioUnchecked, radioChecked, undo, check } from './_icons.js';

const render = ({ value, disabled }) => {
  const has = !!value;
  const p = has ? value.split('-') : ['----', '--', '--'];
  const empty = has ? '' : ' data-empty';
  const cls = ['tolv-date-select', disabled ? 'is-disabled' : ''].filter(Boolean).join(' ');
  return `<div style="padding:8px 0">`
    + `<div class="${cls}"${has ? ` data-value="${value}"` : ''}>`
    + `<span class="tolv-date-select__group">`
    + `<span class="tolv-date-select__seg"${empty}>${p[0]}</span>`
    + `<span class="tolv-date-select__sep">/</span>`
    + `<span class="tolv-date-select__seg"${empty}>${p[1]}</span>`
    + `<span class="tolv-date-select__sep">/</span>`
    + `<span class="tolv-date-select__seg"${empty}>${p[2]}</span>`
    + `</span>`
    + `<span class="tolv-date-select__icon">${calSvg}</span>`
    + `</div></div>`;
};

export default {
  title: 'Components/DateSelect',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          '**Spec**',
          '- 幅: 150px（px 指定に変更可）/ 高さ: 32px',
          '- カレンダーは**最前面**（Popover API の top layer）に表示し、親の overflow（FilterPanel・Container・横スクロールのテーブルなど）で切れない',
          '- 位置: 日付欄の下 4px・左端そろえ。下に入りきらなければ上に、右にはみ出すなら右端そろえで開く（画面の端から 16px 以上離す）。ページ・親のスクロールや画面サイズの変更に追従し、日付欄が見えなくなったら閉じる',
          '- 外側クリック・Esc で閉じ、フォーカスは日付欄に戻る。Enter / Space でも開閉できる',
          '- 外側クリックで閉じる処理（FilterPanel など）からは `TolvCalendar.contains(node)` で DateSelect の一部か判定できる',
        ].join('\n'),
      },
    },
  },
  render,
  argTypes: {
    value: { control: 'text', description: '選択日（YYYY-MM-DD、空で未選択）' },
    disabled: { control: 'boolean' },
  },
  args: { value: '2026-09-10', disabled: false },
};

// クリックでカレンダーが開き、日を選ぶと確定（tolv:datechange）
export const Playground = {};

export const Overview = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => {
    const row = (label, args) => `<tr><th style="font:500 12px var(--font-sans);color:var(--color-fg-basic-secondary);text-align:left;padding:8px 16px 8px 0;white-space:nowrap">${label}</th><td>${render(args)}</td></tr>`;
    return `<table style="border-collapse:collapse">`
      + row('Default', { value: '2026-09-10' })
      + row('Unset', { value: '' })
      + row('Disabled', { value: '2026-09-10', disabled: true })
      + `</table>`;
  },
};

// ---- 最前面表示の確認用 ----
const ds = (value = '2026-09-10') => {
  const p = value.split('-');
  return `<div class="tolv-date-select" data-value="${value}"><span class="tolv-date-select__group">`
    + `<span class="tolv-date-select__seg">${p[0]}</span><span class="tolv-date-select__sep">/</span>`
    + `<span class="tolv-date-select__seg">${p[1]}</span><span class="tolv-date-select__sep">/</span>`
    + `<span class="tolv-date-select__seg">${p[2]}</span></span><span class="tolv-date-select__icon">${calSvg}</span></div>`;
};
const cap = (t) => `<div style="font:500 12px var(--font-sans);color:var(--color-fg-basic-secondary);margin-bottom:6px">${t}</div>`;
const radio = (label, checked) => `<label class="tolv-radio"><input type="radio" class="tolv-radio__input" name="ovf-period"${checked ? ' checked' : ''}>`
  + `<span class="tolv-radio__glyph"><span class="tolv-radio__off">${radioUnchecked}</span><span class="tolv-radio__on">${radioChecked}</span></span>`
  + `<span class="tolv-radio__label">${label}</span></label>`;

// 親の overflow の中：FilterPanel（overflow-y:auto）/ Container（overflow:hidden）/ 横スクロールのテーブルのセル編集
export const InsideOverflow = {
  name: '親の overflow の中',
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => {
    const filter = `<div class="tolv-filter-panel" style="--tolv-filter-panel-max-height: 260px">`
      + `<span class="tolv-field__label">期間指定</span>`
      + `<div class="tolv-filter-panel__items">${['指定なし', '今月', '前月'].map((l) => radio(l, false)).join('')}${radio('カスタム', true)}`
      + `<div class="tolv-filter-panel__range">${ds('2026-01-01')}<div class="tolv-fixed-value">〜</div>${ds('2026-01-31')}</div></div>`
      + `</div>`;
    const container = `<div class="tolv-container tolv-container--primary" style="height:120px">${ds()}</div>`;
    const actions = `<button type="button" class="tolv-cell-action-button tolv-cell-action-button--undo" aria-label="元に戻す">${undo}</button>`
      + `<button type="button" class="tolv-cell-action-button tolv-cell-action-button--submit" aria-label="確定">${check}</button>`;
    const table = `<div style="width:340px;overflow-x:auto;border:1px solid var(--color-border-basic-primary);border-radius:8px">`
      + `<div style="display:flex;width:720px">`
      + `<div class="tolv-cell" style="width:200px"><span class="tolv-cell__value">取引先</span></div>`
      + `<div class="tolv-cell is-edit" style="width:280px">${ds()}${actions}</div>`
      + `<div class="tolv-cell" style="width:240px"><span class="tolv-cell__value">備考</span></div>`
      + `</div></div>`;
    return `<div style="display:flex;gap:32px;align-items:flex-start;flex-wrap:wrap">`
      + `<div style="width:380px">${cap('FilterPanel（期間指定・カスタム）')}${filter}</div>`
      + `<div style="width:220px">${cap('Container（overflow:hidden・高さ 120px）')}${container}</div>`
      + `<div>${cap('横スクロールするテーブルのセル編集')}${table}</div>`
      + `</div>`;
  },
};

// 画面の端に近い DateSelect：下端は上に開く／右端は右端そろえで開く
export const NearEdges = {
  name: '画面の端の近く',
  parameters: { controls: { disable: true }, layout: 'fullscreen' },
  render: () => `<div style="position:relative;height:100vh;min-height:480px">`
    + `<div style="position:absolute;top:16px;right:16px">${cap('右上（右端そろえ）')}${ds()}</div>`
    + `<div style="position:absolute;bottom:16px;left:16px">${cap('左下（上に開く）')}${ds()}</div>`
    + `<div style="position:absolute;bottom:16px;right:16px">${cap('右下（上に・右端そろえ）')}${ds()}</div>`
    + `</div>`,
};

// スクロールへの追従：ページのスクロールと、親要素（overflow:auto）のスクロール
export const FollowScroll = {
  name: 'スクロールに追従',
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => {
    const filler = (h) => `<div style="height:${h}px;display:flex;align-items:center;justify-content:center;font:500 12px var(--font-sans);color:var(--color-fg-basic-secondary)">（スクロール用の余白）</div>`;
    return `<div style="display:flex;gap:32px;align-items:flex-start">`
      + `<div>${cap('親要素のスクロール（高さ 200px・overflow:auto）')}`
      + `<div style="width:260px;height:200px;overflow:auto;border:1px solid var(--color-border-basic-primary);border-radius:8px;padding:0 16px">`
      + filler(120) + ds() + filler(400) + `</div></div>`
      + `<div>${cap('ページのスクロール')}${filler(160)}${ds()}${filler(1200)}</div>`
      + `</div>`;
  },
};
