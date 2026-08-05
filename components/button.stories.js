// tolv Button — Storybook stories (@storybook/html-vite)
// 素の HTML + button.css のクラスでレンダリングする。

const chevron = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const icon = `<span class="tolv-btn__icon">${chevron}</span>`;

/** args から <button> の HTML 文字列を生成 */
const renderButton = ({ type, size, label, prefixIcon, suffixIcon, disabled }) => {
  const classes = [
    'tolv-btn',
    size === 'Small' ? 'tolv-btn--sm' : '',
    `tolv-btn--${String(type).toLowerCase()}`,
  ].filter(Boolean).join(' ');
  return `<button class="${classes}"${disabled ? ' disabled' : ''}>`
    + (prefixIcon ? icon : '')
    + `<span class="tolv-btn__label">${label}</span>`
    + (suffixIcon ? icon : '')
    + `</button>`;
};

export default {
  title: 'Components/Button',
  tags: ['autodocs'],
  render: renderButton,
  argTypes: {
    type: { control: 'inline-radio', options: ['Primary', 'Secondary', 'Caution'], description: '種別' },
    size: { control: 'inline-radio', options: ['Medium', 'Small'], description: 'サイズ' },
    label: { control: 'text', description: 'ラベル文字列' },
    prefixIcon: { control: 'boolean', description: '先頭アイコン' },
    suffixIcon: { control: 'boolean', description: '末尾アイコン' },
    disabled: { control: 'boolean', description: '無効状態' },
  },
  args: {
    type: 'Primary',
    size: 'Medium',
    label: 'ラベル',
    prefixIcon: true,
    suffixIcon: true,
    disabled: false,
  },
};

// コントロールで自由に試せる基本ストーリー
export const Playground = {};

// 種別
export const Primary = { args: { type: 'Primary' } };
export const Secondary = { args: { type: 'Secondary' } };
export const Caution = { args: { type: 'Caution' } };

// サイズ
export const Small = { args: { size: 'Small' } };

// 状態
export const Disabled = { args: { disabled: true } };

// テキストのみ（アイコンなし）
export const LabelOnly = { args: { prefixIcon: false, suffixIcon: false } };

// 全バリアント一覧（Size × Type × State のマトリクス）
export const AllVariants = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => {
    const types = ['Primary', 'Secondary', 'Caution'];
    const states = [
      { name: 'Default', disabled: false },
      { name: 'Disabled', disabled: true },
    ];
    const sizes = ['Medium', 'Small'];
    const cell = (o) => `<td style="padding:10px 14px">${renderButton(o)}</td>`;
    let html = '<div style="font-family:var(--font-sans)">';
    for (const size of sizes) {
      html += `<h3 style="font-size:14px;color:var(--color-fg-basic-secondary);margin:16px 0 4px">Size = ${size}</h3>`;
      html += '<table style="border-collapse:collapse"><tr><th></th>'
        + types.map((t) => `<th style="font:500 12px var(--font-sans);color:var(--color-fg-basic-secondary);text-align:left;padding:0 14px">${t}</th>`).join('')
        + '</tr>';
      for (const st of states) {
        html += `<tr><th style="font:500 12px var(--font-sans);color:var(--color-fg-basic-secondary);text-align:left;padding:0 14px">${st.name}</th>`;
        for (const type of types) {
          html += cell({ type, size, label: 'ラベル', prefixIcon: true, suffixIcon: true, disabled: st.disabled });
        }
        html += '</tr>';
      }
      html += '</table>';
    }
    html += '</div>';
    return html;
  },
};
