// RadioButton — .tolv-radio（Figma グリフ Asset/Icon/radio_button*）
import { radioUnchecked, radioChecked } from './_icons.js';

const glyph = `<span class="tolv-radio__glyph">`
  + `<span class="tolv-radio__off">${radioUnchecked}</span>`
  + `<span class="tolv-radio__on">${radioChecked}</span></span>`;

const radio = ({ checked, disabled, label, name }) => {
  const cls = ['tolv-radio', disabled ? 'is-disabled' : ''].filter(Boolean).join(' ');
  const inputAttrs = [checked ? 'checked' : '', disabled ? 'disabled' : ''].filter(Boolean).join(' ');
  return `<label class="${cls}">`
    + `<input type="radio" class="tolv-radio__input" name="${name || 'r'}" ${inputAttrs}>`
    + glyph
    + (label ? `<span class="tolv-radio__label">${label}</span>` : '')
    + `</label>`;
};

export default {
  title: 'Components/RadioButton',
  tags: ['autodocs'],
  render: radio,
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: { checked: false, disabled: false, label: 'ラベル' },
};

export const Playground = {};

export const Overview = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => {
    const row = (label, disabled) => `<tr><th style="font:500 12px var(--font-sans);color:var(--color-fg-basic-secondary);text-align:left;padding:8px 16px 8px 0">${label}</th>`
      + [false, true].map((c, i) => `<td style="padding:4px 8px">${radio({ checked: c, disabled, label: 'ラベル', name: 'ov' + (disabled ? 'd' : '') + i })}</td>`).join('')
      + `</tr>`;
    return `<table style="border-collapse:collapse"><tr><th></th>`
      + ['False', 'True'].map((h) => `<th style="font:500 12px var(--font-sans);color:var(--color-fg-basic-secondary);text-align:left;padding:0 8px">${h}</th>`).join('')
      + `</tr>`
      + row('Default', false)
      + row('Disabled', true)
      + `</table>`;
  },
};
