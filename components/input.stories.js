// InputText — .tolv-input
const box = (inner) => `<div style="width:320px">${inner}</div>`;

const render = ({ placeholder, value, disabled, error }) => {
  const cls = ['tolv-input', error ? 'is-error' : ''].filter(Boolean).join(' ');
  return box(`<input class="${cls}" placeholder="${placeholder}" value="${value}"${disabled ? ' disabled' : ''}${error ? ' aria-invalid="true"' : ''}>`);
};

export default {
  title: 'Components/InputText',
  tags: ['autodocs'],
  render,
  argTypes: {
    placeholder: { control: 'text' },
    value: { control: 'text' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
  },
  args: { placeholder: 'テキスト', value: '', disabled: false, error: false },
};

export const Playground = {};

export const Overview = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => {
    const row = (label, html) => `<tr><th style="font:500 12px var(--font-sans);color:var(--color-fg-basic-secondary);text-align:left;padding:8px 16px 8px 0;white-space:nowrap">${label}</th><td style="width:320px;padding:8px 0">${html}</td></tr>`;
    return `<table style="border-collapse:collapse">`
      + row('Default (placeholder)', `<input class="tolv-input" placeholder="テキスト">`)
      + row('Inputed', `<input class="tolv-input" value="テキスト">`)
      + row('Disabled', `<input class="tolv-input" value="テキスト" disabled>`)
      + row('Error', `<input class="tolv-input is-error" value="テキスト" aria-invalid="true">`)
      + `</table>`
      + `<p style="font:500 12px var(--font-sans);color:var(--color-fg-basic-secondary);margin-top:12px">※ Edit（フォーカス）状態は実際にクリックすると focus リングで確認できます</p>`;
  },
};
