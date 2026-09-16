// FormSet — .tolv-field（ラベル + コントロール + メッセージ）
import { information, errorMark, check } from './_icons.js';

const box = (inner) => `<div style="width:320px">${inner}</div>`;

// messageType: 'hint'（グレー） | 'error'（赤） | 'success'（Applied/緑）
const render = ({ label, supportText, value, placeholder, messageText, messageType }) => {
  const isError = messageType === 'error';
  const isSuccess = messageType === 'success';
  const inputCls = ['tolv-input', isError ? 'is-error' : ''].filter(Boolean).join(' ');
  const msgCls = ['tolv-field__message', isError ? 'tolv-field__message--error' : '', isSuccess ? 'tolv-field__message--success' : ''].filter(Boolean).join(' ');
  const icon = isError ? errorMark : isSuccess ? check : information;
  return box(
    `<div class="tolv-field">`
    + `<label class="tolv-field__label">${label}</label>`
    + (supportText ? `<p class="tolv-field__support">${supportText}</p>` : '')
    + `<div class="tolv-field__control-set">`
    + `<input class="${inputCls}" placeholder="${placeholder}" value="${value}"${isError ? ' aria-invalid="true"' : ''}>`
    + (messageText ? `<p class="${msgCls}"><span class="tolv-field__message-icon">${icon}</span>${messageText}</p>` : '')
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
    messageText: { control: 'text', description: 'メッセージ（空で非表示）' },
    messageType: { control: 'inline-radio', options: ['hint', 'error', 'success'], description: 'メッセージ種別（Normal/Error/Applied）' },
  },
  args: { label: 'ラベル', supportText: '補足テキスト', value: '', placeholder: 'テキスト', messageText: 'ヒントメッセージ', messageType: 'hint' },
};

export const Playground = {};

export const Overview = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => {
    const cell = (args) => `<div style="padding:8px 24px 8px 0">${render(args)}</div>`;
    return `<div style="display:flex;flex-wrap:wrap;gap:8px">`
      + cell({ label: 'ラベル', supportText: '', value: '', placeholder: 'テキスト', messageText: '', messageType: 'hint' })
      + cell({ label: 'ラベル', supportText: '補足テキスト', value: '', placeholder: 'テキスト', messageText: 'ヒントメッセージ', messageType: 'hint' })
      + cell({ label: 'ラベル', supportText: '', value: 'テキスト', placeholder: 'テキスト', messageText: 'エラーメッセージ', messageType: 'error' })
      + cell({ label: 'ラベル', supportText: '', value: 'テキスト', placeholder: 'テキスト', messageText: '入力を確認しました', messageType: 'success' })
      + `</div>`;
  },
};
