// InputTime — .tolv-time（HH : MM ＋ 時計アイコン）
import { clock } from './_icons.js';

const render = ({ hh, mm, disabled }) => {
  const cls = ['tolv-time', disabled ? 'is-disabled' : ''].filter(Boolean).join(' ');
  const seg = (val, label) =>
    `<input class="tolv-time__seg" maxlength="2" inputmode="numeric" placeholder="--" value="${val}"${disabled ? ' disabled' : ''} aria-label="${label}">`;
  return `<div class="${cls}">`
    + `<span class="tolv-time__group">${seg(hh, '時')}<span class="tolv-time__sep">:</span>${seg(mm, '分')}</span>`
    + `<span class="tolv-time__icon">${clock}</span>`
    + `</div>`;
};

export default {
  title: 'Components/InputTime',
  tags: ['autodocs'],
  render,
  argTypes: {
    hh: { control: 'text', description: '時（空でプレースホルダー --）' },
    mm: { control: 'text', description: '分' },
    disabled: { control: 'boolean' },
  },
  args: { hh: '09', mm: '30', disabled: false },
};

export const Playground = {};

export const Overview = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => {
    const cell = (label, args) => `<div style="display:flex;align-items:center;gap:16px;padding:8px 0"><span style="font:500 12px var(--font-sans);color:var(--color-fg-basic-secondary);width:120px">${label}</span>${render(args)}</div>`;
    return cell('Default', { hh: '09', mm: '30' })
      + cell('Placeholder', { hh: '', mm: '' })
      + cell('Disabled', { hh: '09', mm: '30', disabled: true });
  },
};
