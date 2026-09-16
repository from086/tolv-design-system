// Record — .tolv-record（テーブル行：Header / Default / Selected）
import { check as CHECK, chevronRight as CHEVRON } from './_icons.js';
const MINUS = '<svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M5 10.8333V9.16667H15V10.8333H5Z"/></svg>';

const checkbox = (checked) =>
  `<label class="tolv-checkbox"><input type="checkbox" class="tolv-checkbox__input"${checked ? ' checked' : ''}>`
  + `<span class="tolv-checkbox__box"><span class="tolv-checkbox__mark tolv-checkbox__mark--check">${CHECK}</span><span class="tolv-checkbox__mark tolv-checkbox__mark--minus">${MINUS}</span></span></label>`;

const cells = (bold) => `<div style="display:flex;flex:1 0 0;min-width:0">`
  + ['商品名', '数量', '担当'].map((t) => `<div class="tolv-cell${bold ? ' tolv-cell--head' : ''}" style="width:160px"><span class="tolv-cell__value">${t}</span></div>`).join('')
  + `</div>`;

const detail = () => `<div class="tolv-record__action"><button type="button" class="tolv-record__detail"><span class="tolv-record__detail-label">詳細</span><span class="tolv-record__detail-icon">${CHEVRON}</span></button></div>`;

// status: 'header' | 'default' | 'selected'
const record = ({ status }) => {
  const cls = ['tolv-record', status === 'header' ? 'tolv-record--header' : '', status === 'selected' ? 'is-selected' : ''].filter(Boolean).join(' ');
  return `<div class="${cls}">`
    + checkbox(status === 'selected')
    + `<div class="tolv-record__content">${cells(status === 'header')}</div>`
    + (status === 'header' ? '' : detail())
    + `</div>`;
};

const wrap = (inner) => `<div style="width:640px">${inner}</div>`;

export default {
  title: 'Components/Record',
  tags: ['autodocs'],
  render: (args) => wrap(record(args)),
  argTypes: {
    status: { control: 'inline-radio', options: ['header', 'default', 'selected'] },
  },
  args: { status: 'default' },
};

export const Playground = {};

export const Overview = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => wrap(record({ status: 'header' }) + record({ status: 'default' }) + record({ status: 'selected' }) + record({ status: 'default' })),
};
