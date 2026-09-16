// CheckBox — .tolv-checkbox（Figma グリフ Asset/Icon/check_box*）
import { checkboxBlank, checkboxChecked, checkboxIndeterminate } from './_icons.js';

const glyph = `<span class="tolv-checkbox__glyph">`
  + `<span class="tolv-checkbox__blank">${checkboxBlank}</span>`
  + `<span class="tolv-checkbox__checked">${checkboxChecked}</span>`
  + `<span class="tolv-checkbox__indet">${checkboxIndeterminate}</span></span>`;

// checked: 'false' | 'true' | 'indeterminate'
const box = ({ checked, disabled, label }) => {
  const cls = ['tolv-checkbox', checked === 'indeterminate' ? 'is-indeterminate' : '', disabled ? 'is-disabled' : ''].filter(Boolean).join(' ');
  const inputAttrs = [checked === 'true' ? 'checked' : '', disabled ? 'disabled' : ''].filter(Boolean).join(' ');
  return `<label class="${cls}">`
    + `<input type="checkbox" class="tolv-checkbox__input" ${inputAttrs}>`
    + glyph
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
