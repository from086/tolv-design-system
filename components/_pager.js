// Storybook ストーリー用の Pager マークアップ（Pager / TableBar で共用）。配信CSSには含まれない補助モジュール。
import { chevronLeft, chevronRight } from './_icons.js';

const fmt = (n) => Number(n).toLocaleString('ja-JP');

// from〜to / total。先頭ページなら「前へ」、最終ページなら「次へ」を disabled に
export const pager = ({ from = 1, to = 100, total = 2000 } = {}) => {
  const atFirst = from <= 1;
  const atLast = to >= total;
  const nav = (dir, icon, label, disabled) =>
    `<button type="button" class="tolv-btn tolv-btn--sm tolv-btn--tertiary" data-pager="${dir}" aria-label="${label}"${disabled ? ' disabled' : ''}><span class="tolv-btn__icon">${icon}</span></button>`;
  return `<nav class="tolv-pager" aria-label="ページ送り">`
    + nav('prev', chevronLeft, '前へ', atFirst)
    + `<span class="tolv-pager__counter">`
    + `<span class="tolv-number tolv-number--body">${fmt(from)}</span>`
    + `<span class="tolv-text tolv-text--body">-</span>`
    + `<span class="tolv-number tolv-number--body">${fmt(to)}</span>`
    + `<span class="tolv-text tolv-text--body">/</span>`
    + `<span class="tolv-number tolv-number--body">${fmt(total)}</span>`
    + `</span>`
    + nav('next', chevronRight, '次へ', atLast)
    + `</nav>`;
};
