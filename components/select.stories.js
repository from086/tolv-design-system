// Select — .tolv-select
import { chevronDown, check } from './_icons.js';

const listItem = (label, selected) =>
  `<div class="tolv-list-item${selected ? ' is-selected' : ''}" role="option"${selected ? ' aria-selected="true"' : ''}>`
  + `<span class="tolv-list-item__label">${label}</span>`
  + `<span class="tolv-list-item__check">${check}</span></div>`;

const box = (inner) => `<div style="width:320px">${inner}</div>`;

const render = ({ value, placeholder, open, disabled, error }) => {
  const cls = ['tolv-select', open ? 'is-open' : '', disabled ? 'is-disabled' : '', error ? 'is-error' : ''].filter(Boolean).join(' ');
  const valueAttr = value ? '' : ` data-placeholder="${placeholder}"`;
  const options = ['りんご', 'みかん', 'ぶどう'];
  return box(
    `<div class="${cls}">`
    + `<button type="button" class="tolv-select__control"${disabled ? ' disabled' : ''} aria-haspopup="listbox" aria-expanded="${open ? 'true' : 'false'}">`
    + `<span class="tolv-select__value"${valueAttr}>${value}</span>`
    + `<span class="tolv-select__icon">${chevronDown}</span></button>`
    + `<div class="tolv-select__menu" role="listbox">`
    + options.map((o) => listItem(o, o === value)).join('')
    + `</div></div>`
  );
};

export default {
  title: 'Components/Select',
  tags: ['autodocs'],
  render,
  argTypes: {
    value: { control: 'text', description: '選択値（空でプレースホルダー）' },
    placeholder: { control: 'text' },
    open: { control: 'boolean', description: 'メニュー展開（is-open）' },
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
      + row('Default (closed)', { value: '', placeholder: 'テキスト' })
      + row('Selected', { value: 'りんご' })
      + row('Open', { value: 'りんご', open: true })
      + row('Disabled', { value: 'りんご', disabled: true })
      + `</table>`;
  },
};
