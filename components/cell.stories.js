// Cell — .tolv-cell（テーブルセル：Head / Default / Hover(編集) / Edit）
// Hover は値の直後に CellActionButton（Edit）。Edit は InputSlot：Form 系コンポーネント＋CellActionButton（Undo / Submit）。
import { pencil, check, sortDesc, chevronDown, calendar, clock, undo } from './_icons.js';
const box = (inner, w = 260) => `<div style="width:${w}px">${inner}</div>`;

// ---- Edit の中に入れる Form 系コンポーネント ----
const SLOT = {
  InputText: ({ text, error }) =>
    `<input class="tolv-input${error ? ' is-error' : ''}" value="${text}"${error ? ' aria-invalid="true"' : ''}>`,
  Select: ({ text }) =>
    `<div class="tolv-select"><button type="button" class="tolv-select__control" aria-haspopup="listbox" aria-expanded="false">`
    + `<span class="tolv-select__value">${text}</span><span class="tolv-select__icon">${chevronDown}</span></button>`
    + `<div class="tolv-select__menu" role="listbox">`
    + ['りんご', 'みかん', 'ぶどう'].map((o) => `<div class="tolv-list-item${o === text ? ' is-selected' : ''}" role="option"><span class="tolv-list-item__label">${o}</span><span class="tolv-list-item__check">${check}</span></div>`).join('')
    + `</div></div>`,
  DateSelect: () =>
    `<div class="tolv-date-select" data-value="2026-09-10"><span class="tolv-date-select__group">`
    + `<span class="tolv-date-select__seg">2026</span><span class="tolv-date-select__sep">/</span>`
    + `<span class="tolv-date-select__seg">09</span><span class="tolv-date-select__sep">/</span>`
    + `<span class="tolv-date-select__seg">10</span></span><span class="tolv-date-select__icon">${calendar}</span></div>`,
  InputTime: () =>
    `<div class="tolv-time"><span class="tolv-time__group">`
    + `<input class="tolv-time__seg" maxlength="2" inputmode="numeric" placeholder="--" value="09" data-max="23" aria-label="時">`
    + `<span class="tolv-time__sep">:</span>`
    + `<input class="tolv-time__seg" maxlength="2" inputmode="numeric" placeholder="--" value="30" data-max="59" aria-label="分">`
    + `</span><span class="tolv-time__icon">${clock}</span></div>`,
};

// CellActionButton
const actionBtn = (type, icon, label, disabled) =>
  `<button type="button" class="tolv-cell-action-button tolv-cell-action-button--${type}" aria-label="${label}"${disabled ? ' disabled' : ''}>${icon}</button>`;
// Undo / Submit。Submit は未変更なら disabled
const actions = (changed) => actionBtn('undo', undo, '元に戻す') + actionBtn('submit', check, '確定', !changed);

// status: 'head' | 'default' | 'editable' | 'edit'
const cell = ({ status, text, input = 'InputText', error = false, changed = true }) => {
  if (status === 'head') {
    return `<div class="tolv-cell tolv-cell--head"><span class="tolv-cell__value">${text}</span><span class="tolv-sort-button is-selected">${sortDesc}</span></div>`;
  }
  if (status === 'edit') {
    return `<div class="tolv-cell is-edit">${SLOT[input]({ text, error })}${actions(changed)}</div>`;
  }
  if (status === 'editable') {
    return `<div class="tolv-cell tolv-cell--editable"><span class="tolv-cell__value">${text}</span>${actionBtn('edit', pencil, '編集')}</div>`;
  }
  return `<div class="tolv-cell"><span class="tolv-cell__value">${text}</span></div>`;
};

const render = (args) => box(cell(args), args.status === 'edit' ? 320 : 260);

export default {
  title: 'Components/Cell',
  tags: ['autodocs'],
  render,
  argTypes: {
    status: { control: 'inline-radio', options: ['head', 'default', 'editable', 'edit'], description: 'Head / Default / Hover(編集可) / Edit' },
    text: { control: 'text' },
    input: { control: 'inline-radio', options: Object.keys(SLOT), description: 'Edit の中身（InputSlot）', if: { arg: 'status', eq: 'edit' } },
    error: { control: 'boolean', description: 'InputText のエラー', if: { arg: 'status', eq: 'edit' } },
    changed: { control: 'boolean', description: '変更あり（Submit を有効化）', if: { arg: 'status', eq: 'edit' } },
  },
  args: { status: 'edit', text: 'テキスト', input: 'InputText', error: false, changed: true },
};

export const Playground = {};

export const Overview = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => {
    const row = (label, args) => `<tr><th style="font:500 12px var(--font-sans);color:var(--color-fg-basic-secondary);text-align:left;padding:8px 16px 8px 0;white-space:nowrap">${label}</th><td style="padding:6px 0">${box(cell({ text: 'テキスト', ...args }), 320)}</td></tr>`;
    return `<table style="border-collapse:collapse">`
      + row('Head（並び替え）', { status: 'head' })
      + row('Default', { status: 'default' })
      + row('Hover（編集可・ホバーで編集ボタン）', { status: 'editable' })
      + row('Edit / InputText', { status: 'edit', input: 'InputText' })
      + row('Edit / InputText（未変更）', { status: 'edit', input: 'InputText', changed: false })
      + row('Edit / InputText（エラー）', { status: 'edit', input: 'InputText', error: true })
      + row('Edit / Select', { status: 'edit', input: 'Select', text: 'りんご' })
      + row('Edit / DateSelect', { status: 'edit', input: 'DateSelect' })
      + row('Edit / InputTime', { status: 'edit', input: 'InputTime' })
      + `</table>`;
  },
};
