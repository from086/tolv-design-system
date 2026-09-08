// Storybook ストーリー用の共通アイコン（18px, currentColor）。配信CSSには含まれない補助モジュール。
const svg = (inner) => `<svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18">${inner}</svg>`;
const stroke = (d) => svg(`<path d="${d}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`);

export const chevronDown = stroke('M6 9l6 6 6-6');
export const search = svg('<circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2"/><path d="M20 20l-3.5-3.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>');
export const close = stroke('M6 6l12 12M18 6L6 18');
export const check = stroke('M20 6L9 17l-5-5');
export const errorMark = svg('<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 7v6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="16.5" r="1.1" fill="currentColor"/>');
