// CalendarPanel — .tolv-calendar（TolvCalendar.init が data-tolv-calendar を描画）
const render = ({ selected }) => `<div data-tolv-calendar${selected ? ` data-selected="${selected}"` : ''}></div>`;

export default {
  title: 'Components/CalendarPanel',
  tags: ['autodocs'],
  render,
  argTypes: {
    selected: { control: 'text', description: '選択日（YYYY-MM-DD、空で未選択）' },
  },
  args: { selected: '2026-09-10' },
};

// 月送り（< >）・日クリック・年Select・削除/今日 が動作
export const Playground = {};

export const Overview = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => render({ selected: '2026-09-10' }),
};
