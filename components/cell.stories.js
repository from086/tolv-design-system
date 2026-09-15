// Cell — .tolv-search--cell（テーブルセル型の検索/選択）
import { search, close, check } from './_icons.js';

const result = (label) =>
  `<div class="tolv-list-item" role="option"><span class="tolv-list-item__label">${label}</span><span class="tolv-list-item__check">${check}</span></div>`;
const box = (inner) => `<div style="width:320px">${inner}</div>`;

const render = ({ value, placeholder, open, disabled, error }) => {
  const cls = ['tolv-search', 'tolv-search--cell', open ? 'is-open' : '', disabled ? 'is-disabled' : '', error ? 'is-error' : ''].filter(Boolean).join(' ');
  return box(
    `<div class="${cls}">`
    + `<div class="tolv-search__control">`
    + `<input class="tolv-search__input" placeholder="${placeholder}" value="${value}"${disabled ? ' disabled' : ''}${error ? ' aria-invalid="true"' : ''}>`
    + `<span class="tolv-search__icon tolv-search__icon--search">${search}</span>`
    + `<span class="tolv-search__icon tolv-search__icon--clear">${close}</span></div>`
    + `<div class="tolv-search__menu" role="listbox">${result('りんご') + result('みかん') + result('ぶどう')}</div>`
    + `</div>`
  );
};

export default {
  title: 'Components/Cell',
  tags: ['autodocs'],
  render,
  argTypes: {
    value: { control: 'text' },
    placeholder: { control: 'text' },
    open: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
  },
  args: { value: '', placeholder: 'テキスト', open: false, disabled: false, error: false },
};

export const Playground = {};

export const Overview = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => {
    const row = (label, args) => `<tr><th style="font:500 12px var(--font-sans);color:var(--color-fg-basic-secondary);text-align:left;padding:8px 16px 8px 0;white-space:nowrap;vertical-align:top">${label}</th><td style="padding:8px 0">${render(args)}</td></tr>`;
    return `<table style="border-collapse:collapse">`
      + row('Default', { value: '', placeholder: 'テキスト' })
      + row('Inputed', { value: 'みかん' })
      + row('Disabled', { value: 'みかん', disabled: true })
      + row('Error', { value: 'みかん', error: true })
      + `</table>`;
  },
};
