// TrailingIconButton — .tolv-trailing-icon-button（末尾アイコンボタン）
import { arrowDown, arrowUp, infoCircle, help } from './_icons.js';

const ICON = { 'arrow-down': arrowDown, 'arrow-up': arrowUp, Info: infoCircle, Help: help };
const btn = ({ type }) => `<button type="button" class="tolv-trailing-icon-button" aria-label="${type}">${ICON[type]}</button>`;

export default {
  title: 'Components/TrailingIconButton',
  tags: ['autodocs'],
  render: btn,
  argTypes: {
    type: { control: 'inline-radio', options: ['arrow-down', 'arrow-up', 'Info', 'Help'] },
  },
  args: { type: 'arrow-down' },
};

export const Playground = {};

export const Overview = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => `<div style="display:flex;gap:12px;align-items:center">`
    + ['arrow-down', 'arrow-up', 'Info', 'Help'].map((t) => `<div style="text-align:center"><div style="font:500 12px var(--font-sans);color:var(--color-fg-basic-secondary);margin-bottom:6px">${t}</div>${btn({ type: t })}</div>`).join('')
    + `</div>`,
};
