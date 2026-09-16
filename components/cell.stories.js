// Cell — .tolv-cell（テーブルセル：Head / Default / Hover(編集) / Edit / Error）
const ICON = {
  pencil: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h4L18.5 9.5a2.1 2.1 0 0 0-3-3L5 17v3z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
  check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6L9 17l-5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  sort: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h13M5 12h9M5 16h5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
};
const box = (inner) => `<div style="width:220px">${inner}</div>`;

// status: 'head' | 'default' | 'editable' | 'edit' | 'error'
const cell = ({ status, text }) => {
  if (status === 'head') {
    return `<div class="tolv-cell tolv-cell--head"><span class="tolv-cell__value">${text}</span><span class="tolv-sort-button is-selected">${ICON.sort}</span></div>`;
  }
  if (status === 'edit') {
    return `<div class="tolv-cell tolv-cell--editable is-edit"><input class="tolv-cell__input" value="${text}"><span class="tolv-cell__icon">${ICON.check}</span></div>`;
  }
  if (status === 'error') {
    return `<div class="tolv-cell tolv-cell--editable is-error"><span class="tolv-cell__value">${text}</span><span class="tolv-cell__icon">${ICON.close}</span></div>`;
  }
  if (status === 'editable') {
    return `<div class="tolv-cell tolv-cell--editable"><span class="tolv-cell__value">${text}</span><span class="tolv-cell__icon">${ICON.pencil}</span></div>`;
  }
  return `<div class="tolv-cell"><span class="tolv-cell__value">${text}</span></div>`;
};

const render = (args) => box(cell(args));

export default {
  title: 'Components/Cell',
  tags: ['autodocs'],
  render,
  argTypes: {
    status: { control: 'inline-radio', options: ['head', 'default', 'editable', 'edit', 'error'], description: 'Head / Default / Hover(編集可) / Edit / Error' },
    text: { control: 'text' },
  },
  args: { status: 'default', text: 'テキスト' },
};

export const Playground = {};

export const Overview = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => {
    const row = (label, status) => `<tr><th style="font:500 12px var(--font-sans);color:var(--color-fg-basic-secondary);text-align:left;padding:8px 16px 8px 0;white-space:nowrap">${label}</th><td style="padding:6px 0">${box(cell({ status, text: 'テキスト' }))}</td></tr>`;
    return `<table style="border-collapse:collapse">`
      + row('Head（並び替え）', 'head')
      + row('Default', 'default')
      + row('Hover（編集可・ホバーで鉛筆）', 'editable')
      + row('Edit', 'edit')
      + row('Error', 'error')
      + `</table>`;
  },
};
