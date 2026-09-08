// ListItem — .tolv-list-item（Select / Search のメニュー行）
import { check } from './_icons.js';

const item = ({ label, selected, disabled, active }) => {
  const cls = ['tolv-list-item', selected ? 'is-selected' : '', disabled ? 'is-disabled' : '', active ? 'is-active' : ''].filter(Boolean).join(' ');
  return `<div class="${cls}"${disabled ? ' aria-disabled="true"' : ''}>`
    + `<span class="tolv-list-item__label">${label}</span>`
    + `<span class="tolv-list-item__check">${check}</span>`
    + `</div>`;
};
// 枠付きコンテナに入れて見せる
const box = (inner) => `<div style="width:320px;border:1px solid var(--color-border-basic-primary);border-radius:var(--radius-medium);overflow:hidden">${inner}</div>`;

const render = (args) => box(item(args));

export default {
  title: 'Components/ListItem',
  tags: ['autodocs'],
  render,
  argTypes: {
    label: { control: 'text' },
    selected: { control: 'boolean' },
    active: { control: 'boolean', description: 'hover 相当（is-active）' },
    disabled: { control: 'boolean' },
  },
  args: { label: 'テキスト', selected: false, active: false, disabled: false },
};

export const Playground = {};

export const Overview = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => box(
    item({ label: 'Default', selected: false })
    + item({ label: 'Hover (is-active)', active: true })
    + item({ label: 'Selected', selected: true })
    + item({ label: 'Disabled', disabled: true })
  ),
};
