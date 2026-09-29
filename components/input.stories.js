// InputText — .tolv-input（Type=Number は .tolv-input--number：等幅・右寄せ）
const box = (inner) => `<div style="width:320px">${inner}</div>`;

const input = ({ type = 'text', placeholder, value, disabled, error }) => {
  const cls = ['tolv-input', type === 'number' ? 'tolv-input--number' : '', error ? 'is-error' : ''].filter(Boolean).join(' ');
  const attrs = type === 'number' ? ' inputmode="decimal"' : '';
  return `<input class="${cls}"${attrs} placeholder="${placeholder}" value="${value}"${disabled ? ' disabled' : ''}${error ? ' aria-invalid="true"' : ''}>`;
};
const render = (args) => box(input(args));

export default {
  title: 'Components/InputText',
  tags: ['autodocs'],
  render,
  argTypes: {
    type: { control: 'inline-radio', options: ['text', 'number'], description: 'Type（number = 等幅・右寄せ）' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
  },
  args: { type: 'text', placeholder: 'テキスト', value: '', disabled: false, error: false },
};

export const Playground = {};

export const Overview = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => {
    const row = (label, html) => `<tr><th style="font:500 12px var(--font-sans);color:var(--color-fg-basic-secondary);text-align:left;padding:8px 16px 8px 0;white-space:nowrap">${label}</th><td style="width:320px;padding:8px 0">${html}</td></tr>`;
    const set = (type, placeholder, value) =>
      row(`${type === 'number' ? 'Number' : 'Text'} / Default (placeholder)`, input({ type, placeholder, value: '' }))
      + row(`${type === 'number' ? 'Number' : 'Text'} / Inputed`, input({ type, placeholder, value }))
      + row(`${type === 'number' ? 'Number' : 'Text'} / Disabled`, input({ type, placeholder, value, disabled: true }))
      + row(`${type === 'number' ? 'Number' : 'Text'} / Error`, input({ type, placeholder, value, error: true }));
    return `<table style="border-collapse:collapse">`
      + set('text', 'テキスト', 'テキスト')
      + set('number', '0', '1,234,567')
      + `</table>`
      + `<p style="font:500 12px var(--font-sans);color:var(--color-fg-basic-secondary);margin-top:12px">※ Edit（フォーカス）状態は実際にクリックすると focus リングで確認できます</p>`;
  },
};
