// CheckBox — .tolv-checkbox
import { check as CHECK } from './_icons.js';
const MINUS = '<svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M5 10.8333V9.16667H15V10.8333H5Z"/></svg>';

// checked: 'false' | 'true' | 'indeterminate'
const box = ({ checked, disabled, label }) => {
  const cls = ['tolv-checkbox', checked === 'indeterminate' ? 'is-indeterminate' : '', disabled ? 'is-disabled' : ''].filter(Boolean).join(' ');
  const inputAttrs = [checked === 'true' ? 'checked' : '', disabled ? 'disabled' : ''].filter(Boolean).join(' ');
  return `<label class="${cls}">`
    + `<input type="checkbox" class="tolv-checkbox__input" ${inputAttrs}>`
    + `<span class="tolv-checkbox__box">`
    + `<span class="tolv-checkbox__mark tolv-checkbox__mark--check">${CHECK}</span>`
    + `<span class="tolv-checkbox__mark tolv-checkbox__mark--minus">${MINUS}</span>`
    + `</span>`
    + (label ? `<span class="tolv-checkbox__label">${label}</span>` : '')
    + `</label>`;
};

export default {
  title: 'Components/CheckBox',
  tags: ['autodocs'],
  render: box,
  argTypes: {
    checked: { control: 'inline-radio', options: ['false', 'true', 'indeterminate'] },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: { checked: 'false', disabled: false, label: 'ラベル' },
};

export const Playground = {};

export const Overview = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => {
    const row = (label, disabled) => `<tr><th style="font:500 12px var(--font-sans);color:var(--color-fg-basic-secondary);text-align:left;padding:8px 16px 8px 0">${label}</th>`
      + ['false', 'true', 'indeterminate'].map((c) => `<td style="padding:4px 8px">${box({ checked: c, disabled, label: 'ラベル' })}</td>`).join('')
      + `</tr>`;
    return `<table style="border-collapse:collapse"><tr><th></th>`
      + ['False', 'True', 'Indeterminate'].map((h) => `<th style="font:500 12px var(--font-sans);color:var(--color-fg-basic-secondary);text-align:left;padding:0 8px">${h}</th>`).join('')
      + `</tr>`
      + row('Default', false)
      + row('Disabled', true)
      + `</table>`;
  },
};
