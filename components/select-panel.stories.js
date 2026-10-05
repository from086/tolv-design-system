// SelectPanel — .tolv-select-panel（Select の選択肢パネル：Container primary ＋ ListItem 一覧、選択中はチェック）
// Select 内では .tolv-select__menu を併記してポップオーバー表示する（select.stories.js 参照）。
import { check } from './_icons.js';

const panel = ({ selected }) => {
  const options = ['テキスト', 'テキスト2', 'テキスト3', 'テキスト4', 'テキスト5'];
  return `<div style="width:345px"><div class="tolv-select-panel" role="listbox">`
    + options.map((o) => `<div class="tolv-list-item${o === selected ? ' is-selected' : ''}" role="option" aria-selected="${o === selected}">`
      + `<span class="tolv-list-item__label">${o}</span><span class="tolv-list-item__check">${check}</span></div>`).join('')
    + `</div></div>`;
};

export default {
  title: 'Components/SelectPanel',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          '**Spec**',
          '- 幅: 親の幅（既定）… px 指定に変更可',
          '- 最小幅: 中身の幅（親が狭くても、選択肢やボタンを省略・折り返ししないところまで広がる）',
          '- 高さ: 中身に合わせる',
          '- 最大高さ: 320px（`--tolv-panel-max-height` で変更可）。超えたらパネル内でスクロール',
        ].join('\n'),
      },
    },
  },
  render: panel,
  argTypes: { selected: { control: 'inline-radio', options: ['', 'テキスト', 'テキスト2', 'テキスト3', 'テキスト4', 'テキスト5'], description: '選択中の項目' } },
  args: { selected: 'テキスト' },
};

export const Playground = {};

export const Overview = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => panel({ selected: 'テキスト' }),
};
