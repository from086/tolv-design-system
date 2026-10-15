// ToggleButton — .tolv-toggle-button（選択の ON/OFF を切り替えるボタン。Button Small と同じ形）
// 未選択 = 枠＋radio_button_unchecked / 選択中 = ブランド色の地＋check
import { radioUnchecked, check } from './_icons.js';

const icons = `<span class="tolv-toggle-button__icon tolv-toggle-button__icon--off">${radioUnchecked}</span>`
  + `<span class="tolv-toggle-button__icon tolv-toggle-button__icon--on">${check}</span>`;

// 推奨：ネイティブのチェックボックスで状態を持つ（JS 不要）
const toggle = ({ label, selected }) => `<label class="tolv-toggle-button">`
  + `<input type="checkbox" class="tolv-toggle-button__input"${selected ? ' checked' : ''}>`
  + icons + `<span class="tolv-toggle-button__label">${label}</span></label>`;
// <button aria-pressed> 版（切り替えは利用側）
const toggleBtn = ({ label, selected }) => `<button type="button" class="tolv-toggle-button" aria-pressed="${selected ? 'true' : 'false'}">`
  + icons + `<span class="tolv-toggle-button__label">${label}</span></button>`;

export default {
  title: 'Components/ToggleButton',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          '**Spec**',
          '- 形は Button Small と同じ（高さ 32px・余白 4/8・角丸 medium・Bold 14/20・アイコン 20px）。幅は中身に合わせる',
          '- 未選択: 枠（ブランド色）＋ radio_button_unchecked / hover でブランド色の地・白文字',
          '- 選択中: ブランド色の地 ＋ check・白文字',
          '',
          '状態は `<label>` ＋ `<input type="checkbox" class="tolv-toggle-button__input">`（推奨・JS 不要）、`<button aria-pressed>`、`.is-selected` のどれでも表せます。',
        ].join('\n'),
      },
    },
  },
  render: toggle,
  argTypes: {
    label: { control: 'text' },
    selected: { control: 'boolean', description: '選択中' },
  },
  args: { label: 'ラベル', selected: false },
};

// クリックで ON/OFF が切り替わる（チェックボックス版）
export const Playground = {};

export const Overview = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => {
    const cell = (cap, html) => `<div style="display:flex;flex-direction:column;gap:6px;align-items:flex-start"><span style="font:500 12px var(--font-sans);color:var(--color-fg-basic-secondary)">${cap}</span>${html}</div>`;
    return `<div style="display:flex;gap:24px;align-items:flex-end;flex-wrap:wrap">`
      + cell('未選択', toggle({ label: 'ラベル', selected: false }))
      + cell('選択中', toggle({ label: 'ラベル', selected: true }))
      + cell('&lt;button aria-pressed&gt; 版', toggleBtn({ label: 'ラベル', selected: true }))
      + `</div>`
      + `<div style="margin-top:24px">${cell('並べて使う例（複数選択）', `<div style="display:flex;gap:8px;flex-wrap:wrap">${['未入金', '入金済み', '一部入金', '保留'].map((l, i) => toggle({ label: l, selected: i === 1 })).join('')}</div>`)}</div>`;
  },
};
