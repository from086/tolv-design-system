// IncrementalSearch — .tolv-search
import { search, close, check } from './_icons.js';

const result = (label, selected) =>
  `<div class="tolv-list-item${selected ? ' is-selected' : ''}" role="option"${selected ? ' aria-selected="true"' : ''}>`
  + `<span class="tolv-list-item__label">${label}</span>`
  + `<span class="tolv-list-item__check">${check}</span></div>`;

const box = (inner) => `<div style="width:320px">${inner}</div>`;

const render = ({ value, placeholder, open, disabled, error }) => {
  const cls = ['tolv-search', open ? 'is-open' : '', disabled ? 'is-disabled' : '', error ? 'is-error' : ''].filter(Boolean).join(' ');
  const valueAttr = value ? '' : ` data-placeholder="${placeholder}"`;
  return box(
    `<div class="${cls}">`
    + `<div class="tolv-search__control">`
    + `<span class="tolv-search__value"${valueAttr}>${value}</span>`
    + `<span class="tolv-search__icon tolv-search__icon--search">${search}</span>`
    + `<span class="tolv-search__icon tolv-search__icon--clear">${close}</span></div>`
    + `<div class="tolv-search__menu" role="listbox">`
    + result('テキスト') + result('テキスト') + result('テキスト')
    + `</div></div>`
  );
};

export default {
  title: 'Components/IncrementalSearch',
  tags: ['autodocs'],
  render,
  argTypes: {
    value: { control: 'text', description: '入力値（空でプレースホルダー・虫めがね）' },
    placeholder: { control: 'text' },
    open: { control: 'boolean', description: '候補表示（is-open, 入力中は×アイコン）' },
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
      + row('Default (search)', { value: '', placeholder: 'テキスト' })
      + row('Open (results)', { value: 'テキスト', open: true })
      + row('Disabled', { value: 'テキスト', disabled: true })
      + row('Error', { value: 'テキスト', error: true })
      + `</table>`;
  },
};
