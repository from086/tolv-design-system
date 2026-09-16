// SuggestionPanel — .tolv-suggestion-panel（IncrementalSearch の候補パネル）
import { plus } from './_icons.js';

const items = (arr) =>
  `<div class="tolv-suggestion-panel" style="width:320px"><div class="tolv-suggestion-panel__items">`
  + arr.map((m) => `<button type="button" class="tolv-suggestion-panel__item">${m}</button>`).join('')
  + `</div></div>`;
const nodata = () =>
  `<div class="tolv-suggestion-panel" style="width:320px"><div class="tolv-suggestion-panel__nodata">`
  + `<p class="tolv-suggestion-panel__message">該当する項目がありません</p>`
  + `<button type="button" class="tolv-suggestion-panel__add"><span class="tolv-suggestion-panel__add-icon">${plus}</span><span class="tolv-suggestion-panel__add-label">マスターに追加</span></button>`
  + `</div></div>`;

const MASTER = ['マスターデータ1', 'マスターデータ2', 'マスターデータ3', 'マスターデータ4', 'マスターデータ5'];

const render = ({ type }) => (type === 'nodata' ? nodata() : items(MASTER));

export default {
  title: 'Components/SuggestionPanel',
  tags: ['autodocs'],
  render,
  argTypes: {
    type: { control: 'inline-radio', options: ['default', 'nodata'], description: 'Default（一覧）/ NoData（該当なし＋追加）' },
  },
  args: { type: 'default' },
};

export const Playground = {};

export const Overview = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => {
    const cap = (t) => `<div style="font:500 12px var(--font-sans);color:var(--color-fg-basic-secondary);margin-bottom:6px">${t}</div>`;
    return `<div style="display:flex;gap:40px;align-items:flex-start">`
      + `<div>${cap('Default（マスターデータ一覧）')}${items(MASTER)}</div>`
      + `<div>${cap('NoData（該当なし＋マスターに追加）')}${nodata()}</div>`
      + `</div>`;
  },
};
