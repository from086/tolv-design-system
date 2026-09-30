// Select — .tolv-select（選択肢は SelectPanel をフィールドの下にポップオーバー表示）
import { chevronDown, check } from './_icons.js';

const listItem = (label, selected) =>
  `<div class="tolv-list-item${selected ? ' is-selected' : ''}" role="option"${selected ? ' aria-selected="true"' : ''}>`
  + `<span class="tolv-list-item__label">${label}</span>`
  + `<span class="tolv-list-item__check">${check}</span></div>`;

const box = (inner) => `<div style="width:320px">${inner}</div>`;

const render = ({ value, placeholder, open, disabled, error }) => {
  const cls = ['tolv-select', open ? 'is-open' : '', disabled ? 'is-disabled' : '', error ? 'is-error' : ''].filter(Boolean).join(' ');
  const valueAttr = value ? '' : ` data-placeholder="${placeholder}"`;
  const options = ['りんご', 'みかん', 'ぶどう'];
  return box(
    `<div class="${cls}">`
    + `<button type="button" class="tolv-select__control"${disabled ? ' disabled' : ''} aria-haspopup="listbox" aria-expanded="${open ? 'true' : 'false'}">`
    + `<span class="tolv-select__value"${valueAttr}>${value}</span>`
    + `<span class="tolv-select__icon">${chevronDown}</span></button>`
    + `<div class="tolv-select-panel tolv-select__menu" role="listbox">`
    + options.map((o) => listItem(o, o === value)).join('')
    + `</div></div>`
  );
};

export default {
  title: 'Components/Select',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          '**Spec**',
          '- 幅: 親の幅いっぱい（Fill）または px 指定（親要素の幅で決める）',
          '- 高さ: 中身に合わせる',
          '- 選択肢パネル（SelectPanel）は Select と同じ幅で開く。幅の狭い Select は `.tolv-select--hug` で選択肢の長さに合わせて広げる（右寄せで開くなら `.tolv-select--align-end` も併記）',
        ].join('\n'),
      },
    },
  },
  render,
  argTypes: {
    value: { control: 'text', description: '選択値（空でプレースホルダー）' },
    placeholder: { control: 'text' },
    open: { control: 'boolean', description: 'SelectPanel を開く（is-open）' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
  },
  args: { value: '', placeholder: 'テキスト', open: false, disabled: false, error: false },
};

export const Playground = {};

export const Overview = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => {
    const cap = (t) => `<div style="font:500 12px var(--font-sans);color:var(--color-fg-basic-secondary);margin-bottom:6px">${t}</div>`;
    const narrow = (mod) => `<div style="width:120px"><div class="tolv-select is-open ${mod}">`
      + `<button type="button" class="tolv-select__control" aria-haspopup="listbox" aria-expanded="true">`
      + `<span class="tolv-select__value">100件表示</span><span class="tolv-select__icon">${chevronDown}</span></button>`
      + `<div class="tolv-select-panel tolv-select__menu" role="listbox">`
      + ['50件表示', '100件表示', '200件表示'].map((o) => listItem(o, o === '100件表示')).join('')
      + `</div></div></div>`;
    const row = (label, args) => `<tr><th style="font:500 12px var(--font-sans);color:var(--color-fg-basic-secondary);text-align:left;padding:8px 16px 8px 0;white-space:nowrap;vertical-align:top">${label}</th><td style="padding:8px 0">${render(args)}</td></tr>`;
    return `<table style="border-collapse:collapse">`
      + row('Unset (placeholder)', { value: '', placeholder: 'テキスト' })
      + row('Default (selected)', { value: 'りんご' })
      + row('Disabled', { value: 'りんご', disabled: true })
      + row('Open（SelectPanel）', { value: 'りんご', open: true })
      + `</table><div style="height:140px"></div>`   // ポップオーバー分の余白
      + `<div style="display:flex;gap:40px;align-items:flex-start;min-height:200px">`
      + `<div>${cap('幅の狭い Select（既定：Select と同じ幅）')}${narrow('')}</div>`
      + `<div>${cap('.tolv-select--hug（選択肢の長さに合わせて広がる）')}${narrow('tolv-select--hug')}</div>`
      + `</div>`;
  },
};
