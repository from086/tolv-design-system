// Icons — ストーリー用アイコン集（_icons.js）の一覧。Figma ⚙️ Asset（Asset/Icon/*）に準拠。
// すべて fill:currentColor なので文字色に追従する。配信 CSS には含まれない。
import * as icons from './_icons.js';

const tile = (name, svg) =>
  `<div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:104px;padding:12px 4px;border-radius:8px">`
  + `<span style="display:inline-flex;width:24px;height:24px;color:var(--color-fg-basic-primary)">${svg.replace('<svg ', '<svg style="width:24px;height:24px" ')}</span>`
  + `<code style="font:500 11px var(--font-mono);color:var(--color-fg-basic-secondary);text-align:center;word-break:break-all">${name}</code>`
  + `</div>`;

export default {
  title: 'Foundations/Icons',
  tags: ['autodocs'],
  parameters: { controls: { disable: true }, layout: 'padded' },
};

export const Overview = {
  render: () => `<div style="display:flex;flex-wrap:wrap;gap:4px;max-width:960px">`
    + Object.entries(icons).filter(([, v]) => typeof v === 'string' && v.startsWith('<svg')).map(([k, v]) => tile(k, v)).join('')
    + `</div>`,
};
