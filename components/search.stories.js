// IncrementalSearch — .tolv-search（SuggestionPanel 版）
// 入力するとマスターデータを絞り込んで下に SuggestionPanel を表示。
// 0件なら「該当なし＋マスターに追加」。挙動は form.js（data-suggestions を渡す）。
import { search, close, plus } from './_icons.js';

const MASTER = ['りんご', 'みかん', 'ぶどう', 'もも', 'いちご'];
const box = (inner) => `<div style="width:320px">${inner}</div>`;

const panelItems = (arr) =>
  `<div class="tolv-suggestion-panel tolv-search__panel"><div class="tolv-suggestion-panel__items">`
  + arr.map((m) => `<button type="button" class="tolv-suggestion-panel__item" data-value="${m}">${m}</button>`).join('')
  + `</div></div>`;
const panelNoData = () =>
  `<div class="tolv-suggestion-panel tolv-search__panel"><div class="tolv-suggestion-panel__nodata">`
  + `<p class="tolv-suggestion-panel__message">該当する項目がありません</p>`
  + `<button type="button" class="tolv-suggestion-panel__add"><span class="tolv-suggestion-panel__add-icon">${plus}</span><span class="tolv-suggestion-panel__add-label">マスターに追加</span></button>`
  + `</div></div>`;

const field = ({ value, placeholder, open, disabled, error, panel, isStatic }) => {
  const cls = ['tolv-search', value ? 'is-filled' : '', open ? 'is-open' : '', disabled ? 'is-disabled' : '', error ? 'is-error' : ''].filter(Boolean).join(' ');
  return `<div class="${cls}" data-suggestions='${JSON.stringify(MASTER)}'${isStatic ? ' data-tolv-init' : ''}>`
    + `<div class="tolv-search__control">`
    + `<input class="tolv-search__input" placeholder="${placeholder}" value="${value}"${disabled ? ' disabled' : ''}${error ? ' aria-invalid="true"' : ''}>`
    + `<span class="tolv-search__icon tolv-search__icon--search">${search}</span>`
    + `<span class="tolv-search__icon tolv-search__icon--clear">${close}</span></div>`
    + (panel || '')
    + `</div>`;
};

// Playground: フォーカス/入力で form.js が SuggestionPanel を生成（マスター = りんご/みかん/…）
const render = ({ value, placeholder, disabled, error }) => box(field({ value, placeholder, disabled, error }));

export default {
  title: 'Components/IncrementalSearch',
  tags: ['autodocs'],
  render,
  argTypes: {
    value: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
  },
  args: { value: '', placeholder: 'テキスト（例: り）', disabled: false, error: false },
};

export const Playground = {};

export const Overview = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => {
    const row = (label, html) => `<tr><th style="font:500 12px var(--font-sans);color:var(--color-fg-basic-secondary);text-align:left;padding:8px 16px 8px 0;white-space:nowrap">${label}</th><td style="padding:8px 0">${html}</td></tr>`;
    const cap = (t) => `<div style="font:500 12px var(--font-sans);color:var(--color-fg-basic-secondary);margin-bottom:6px">${t}</div>`;
    return `<table style="border-collapse:collapse">`
      + row('Default', box(field({ value: '', placeholder: 'テキスト', isStatic: true })))
      + row('Inputed', box(field({ value: 'りんご', placeholder: 'テキスト', isStatic: true })))
      + row('Disabled', box(field({ value: 'りんご', placeholder: 'テキスト', disabled: true, isStatic: true })))
      + row('Error', box(field({ value: 'りんご', placeholder: 'テキスト', error: true, isStatic: true })))
      + `</table>`
      + `<div style="display:flex;gap:40px;align-items:flex-start;min-height:260px;margin-top:16px">`
      + `<div>${cap('入力あり・候補一致（SuggestionPanel / Default）')}${box(field({ value: 'り', placeholder: 'テキスト', open: true, isStatic: true, panel: panelItems(['りんご']) }))}</div>`
      + `<div>${cap('入力あり・候補なし（SuggestionPanel / NoData）')}${box(field({ value: 'ばなな', placeholder: 'テキスト', open: true, isStatic: true, panel: panelNoData() }))}</div>`
      + `</div>`;
  },
};
