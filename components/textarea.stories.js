// TextArea — .tolv-textarea（複数行テキスト入力。InputText と同じ枠・状態。既定の高さ 120px）
const box = (inner) => `<div style="width:365px">${inner}</div>`;

const SAMPLE = 'テキスト\n2行目のテキスト\n3行目のテキスト';

// status: 'default'（placeholder）| 'inputed' | 'disabled' | 'error'
const render = ({ status, value, placeholder }) => {
  const v = status === 'default' ? '' : value;
  const disabled = status === 'disabled';
  const error = status === 'error';
  return box(
    `<textarea class="tolv-textarea${error ? ' is-error' : ''}" placeholder="${placeholder}"`
    + `${disabled ? ' disabled' : ''}${error ? ' aria-invalid="true"' : ''}>${v}</textarea>`
  );
};

export default {
  title: 'Components/TextArea',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          '**Spec**',
          '- 幅: 親の幅いっぱい（Fill）または px 指定',
          '- 高さ: px 指定（既定 120px）。利用者が縦方向にリサイズ可',
        ].join('\n'),
      },
    },
  },
  render,
  argTypes: {
    status: { control: 'inline-radio', options: ['default', 'inputed', 'disabled', 'error'], description: 'Default(placeholder) / Inputed / Disabled / Error（Edit はフォーカス時）' },
    value: { control: 'text' },
    placeholder: { control: 'text' },
  },
  args: { status: 'inputed', value: SAMPLE, placeholder: 'テキスト' },
};

export const Playground = {};

export const Overview = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => {
    const row = (label, status) => `<tr><th style="font:500 12px var(--font-sans);color:var(--color-fg-basic-secondary);text-align:left;padding:8px 16px 8px 0;white-space:nowrap;vertical-align:top">${label}</th><td style="padding:8px 0">${render({ status, value: SAMPLE, placeholder: 'テキスト' })}</td></tr>`;
    return `<table style="border-collapse:collapse">`
      + row('Default（placeholder）', 'default')
      + row('Inputed', 'inputed')
      + row('Disabled', 'disabled')
      + row('Error', 'error')
      + `</table>`;
  },
};
