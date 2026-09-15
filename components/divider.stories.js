// Divider — .tolv-divider（区切り線）
const render = ({ direction }) =>
  direction === 'vertical'
    ? `<div style="display:flex;align-items:stretch;height:48px;gap:16px;font:500 14px var(--font-sans)"><span style="align-self:center">左</span><div class="tolv-divider tolv-divider--vertical"></div><span style="align-self:center">右</span></div>`
    : `<div style="width:280px;font:500 14px var(--font-sans)"><div>上</div><hr class="tolv-divider" style="margin:12px 0"><div>下</div></div>`;

export default {
  title: 'Components/Divider',
  tags: ['autodocs'],
  render,
  argTypes: {
    direction: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
  },
  args: { direction: 'horizontal' },
};

export const Playground = {};

export const Overview = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => `<div style="display:flex;gap:48px;align-items:flex-start">`
    + `<div><div style="font:500 12px var(--font-sans);color:var(--color-fg-basic-secondary);margin-bottom:8px">Horizontal</div>${render({ direction: 'horizontal' })}</div>`
    + `<div><div style="font:500 12px var(--font-sans);color:var(--color-fg-basic-secondary);margin-bottom:8px">Vertical</div>${render({ direction: 'vertical' })}</div>`
    + `</div>`,
};
