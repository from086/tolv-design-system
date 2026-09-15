// DateSelect — .tolv-date-select（クリックでカレンダーをポップオーバー表示）
const calSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4.5" width="18" height="16" rx="2"/><path d="M3 9.5h18M8 3v3M16 3v3"/></svg>';

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
