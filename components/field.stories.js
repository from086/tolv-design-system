// FormSet — .tolv-field（ラベル + コントロール + メッセージ）
import { errorMark } from './_icons.js';

const box = (inner) => `<div style="width:320px">${inner}</div>`;

const render = ({ label, supportText, value, placeholder, messageText, error }) => {
  const inputCls = ['tolv-input', error ? 'is-error' : ''].filter(Boolean).join(' ');
  const msgCls = ['tolv-field__message', error ? 'tolv-field__message--error' : ''].filter(Boolean).join(' ');
  return box(
    `<div class="tolv-field">`
    + `<label class="tolv-field__label">${label}</label>`
    + (supportText ? `<p class="tolv-field__support">${supportText}</p>` : '')
    + `<div class="tolv-field__control-set">`
    + `<input class="${inputCls}" placeholder="${placeholder}" value="${value}"${error ? ' aria-invalid="true"' : ''}>`
    + (messageText ? `<p class="${msgCls}"><span class="tolv-field__message-icon">${errorMark}</span>${messageText}</p>` : '')
    + `</div></div>`
  );
};

export default {
  title: 'Components/FormSet',
  tags: ['autodocs'],
  render,
  argTypes: {
    label: { control: 'text' },
    supportText: { control: 'text', description: '補足テキスト（空で非表示）' },
    value: { control: 'text' },
    placeholder: { control: 'text' },
    messageText: { control: 'text', description: 'バリデーション/ヒント（空で非表示）' },
    error: { control: 'boolean', description: 'エラー表示（枠・メッセージを赤に）' },
  },
  args: { label: 'ラベル', supportText: '補足テキスト', value: '', placeholder: 'テキスト', messageText: 'ヒントメッセージ', error: false },
};

export const Playground = {};

export const Overview = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => {
    const cell = (args) => `<div style="padding:8px 24px 8px 0">${render(args)}</div>`;
    return `<div style="display:flex;flex-wrap:wrap;gap:8px">`
      + cell({ label: 'ラベル', supportText: '', value: '', placeholder: 'テキスト', messageText: '', error: false })
      + cell({ label: 'ラベル', supportText: '補足テキスト', value: '', placeholder: 'テキスト', messageText: 'ヒントメッセージ', error: false })
      + cell({ label: 'ラベル', supportText: '', value: 'テキスト', placeholder: 'テキスト', messageText: 'エラーメッセージ', error: true })
      + `</div>`;
  },
};
