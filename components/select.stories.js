// Select — .tolv-select（選択肢は SelectPanel をフィールドの下にポップオーバー表示）
import { chevronDown, check, undo } from './_icons.js';

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
          '- 選択肢パネル（SelectPanel）は Select と同じ幅で開く。選択肢がそれより長いときは、省略せずに中身の幅まで広がる（右寄せで開くなら `.tolv-select--align-end`）',
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
      + `<div>${cap('幅の狭い Select（選択肢の長さまで広がる）')}${narrow('')}</div>`
      + `<div>${cap('右寄せで開く（.tolv-select--align-end）')}${narrow('tolv-select--align-end')}</div>`
      + `</div>`;
  },
};

// ---- 最前面表示の確認用（SelectPanel は親の overflow で切れない） ----
const ovfCap = (t) => `<div style="font:500 12px var(--font-sans);color:var(--color-fg-basic-secondary);margin-bottom:6px">${t}</div>`;
const selectEl = (value, mod = '') => `<div class="tolv-select ${mod}">`
  + `<button type="button" class="tolv-select__control" aria-haspopup="listbox" aria-expanded="false">`
  + `<span class="tolv-select__value">${value}</span><span class="tolv-select__icon">${chevronDown}</span></button>`
  + `<div class="tolv-select-panel tolv-select__menu" role="listbox">`
  + ['りんご', 'みかん', 'ぶどう', 'もも', 'いちご', 'メロン（長い選択肢の例：内容に合わせて広がる）'].map((o) => listItem(o, o === value)).join('')
  + `</div></div>`;

export const InsideOverflow = {
  name: '親の overflow の中',
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => {
    const container = `<div class="tolv-container tolv-container--primary" style="height:96px">${selectEl('りんご')}</div>`;
    const actions = `<button type="button" class="tolv-cell-action-button tolv-cell-action-button--undo" aria-label="元に戻す">${undo}</button>`
      + `<button type="button" class="tolv-cell-action-button tolv-cell-action-button--submit" aria-label="確定">${check}</button>`;
    const table = `<div style="width:340px;overflow-x:auto;border:1px solid var(--color-border-basic-primary);border-radius:8px">`
      + `<div style="display:flex;width:720px">`
      + `<div class="tolv-cell" style="width:200px"><span class="tolv-cell__value">取引先</span></div>`
      + `<div class="tolv-cell is-edit" style="width:280px">${selectEl('みかん')}${actions}</div>`
      + `<div class="tolv-cell" style="width:240px"><span class="tolv-cell__value">備考</span></div>`
      + `</div></div>`;
    const scroller = `<div style="width:240px;height:160px;overflow:auto;border:1px solid var(--color-border-basic-primary);border-radius:8px;padding:0 16px">`
      + `<div style="height:60px"></div>${selectEl('ぶどう')}<div style="height:400px"></div></div>`;
    return `<div style="display:flex;gap:32px;align-items:flex-start;flex-wrap:wrap">`
      + `<div style="width:240px">${ovfCap('Container（overflow:hidden・高さ 96px）')}${container}</div>`
      + `<div>${ovfCap('横スクロールするテーブルのセル編集')}${table}</div>`
      + `<div>${ovfCap('スクロールする親（追従・見えなくなると閉じる）')}${scroller}</div>`
      + `</div>`;
  },
};

export const NearEdges = {
  name: '画面の端の近く',
  parameters: { controls: { disable: true }, layout: 'fullscreen' },
  render: () => `<div style="position:relative;height:100vh;min-height:480px">`
    + `<div style="position:absolute;top:16px;right:16px;width:120px">${ovfCap('右上')}${selectEl('りんご')}</div>`
    + `<div style="position:absolute;bottom:16px;left:16px;width:200px">${ovfCap('左下（上に開く）')}${selectEl('りんご')}</div>`
    + `<div style="position:absolute;bottom:16px;right:16px;width:120px">${ovfCap('右下（--align-end）')}${selectEl('りんご', 'tolv-select--align-end')}</div>`
    + `</div>`,
};
