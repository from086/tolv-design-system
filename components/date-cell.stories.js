// DateCell — .tolv-date-cell（カレンダーの日セル）
const cell = ({ day, state }) => {
  const cls = ['tolv-date-cell', state === 'selected' ? 'is-selected' : '', state === 'hover' ? 'is-active' : ''].filter(Boolean).join(' ');
  const dis = state === 'disabled' ? ' disabled' : '';
  return `<button type="button" class="${cls}"${dis}>${day}</button>`;
};

export default {
  title: 'Components/DateCell',
  tags: ['autodocs'],
  render: (args) => `<div style="padding:8px">${cell(args)}</div>`,
  argTypes: {
    day: { control: 'text' },
    state: { control: 'inline-radio', options: ['default', 'hover', 'selected', 'disabled'] },
  },
  args: { day: '10', state: 'default' },
};

export const Playground = {};

export const Overview = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => `<div style="display:flex;gap:20px;align-items:flex-end">`
    + ['default', 'hover', 'selected', 'disabled'].map((s) =>
      `<div style="text-align:center"><div style="font:500 12px var(--font-sans);color:var(--color-fg-basic-secondary);margin-bottom:6px">${s}</div>${cell({ day: '10', state: s })}</div>`
    ).join('')
    + `</div>`,
};
