// CheckBox — .tolv-checkbox
const CHECK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6L9 17l-5-5" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const MINUS = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 12h12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>';

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
