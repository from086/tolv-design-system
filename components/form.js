/*
 * tolv Design System — Form behavior  (v0.6.0)
 * =====================================================================
 * 依存なしの素のJS。form.css の Select / Search に開閉・選択の挙動を付与する。
 * プログレッシブエンハンス：読み込むだけで既存マークアップを自動初期化。
 *
 * 使い方:
 *   <script src="…/components/form.js" defer></script>
 *   // 動的に追加した要素は TolvForm.init(親要素) で再初期化
 *
 * イベント（bubbles）:
 *   .tolv-select → 'tolv:change'  detail: { value, item }
 *   .tolv-search → 'tolv:select'  detail: { item }
 */
(function (global) {
  'use strict';

  var docBound = false;
  function bindDocumentOnce() {
    if (docBound) return;
    docBound = true;
    // 外側クリックで閉じる
    document.addEventListener('click', function (e) {
      document.querySelectorAll('.tolv-select.is-open, .tolv-search.is-open').forEach(function (el) {
        if (!el.contains(e.target)) el.classList.remove('is-open');
      });
    });
    // Escape で閉じる
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      document.querySelectorAll('.tolv-select.is-open, .tolv-search.is-open').forEach(function (el) {
        el.classList.remove('is-open');
      });
    });
  }

  function labelOf(item) {
    var el = item.querySelector('.tolv-list-item__label');
    return (el ? el.textContent : item.textContent).trim();
  }
  function itemDisabled(item) {
    return item.classList.contains('is-disabled') || item.getAttribute('aria-disabled') === 'true' || item.hidden;
  }

  function initSelect(sel) {
    var control = sel.querySelector('.tolv-select__control');
    var value = sel.querySelector('.tolv-select__value');
    var menu = sel.querySelector('.tolv-select__menu');
    if (!control) return;

    var disabled = function () { return sel.classList.contains('is-disabled') || control.disabled; };
    var open = function () { if (disabled()) return; sel.classList.add('is-open'); control.setAttribute('aria-expanded', 'true'); };
    var close = function () { sel.classList.remove('is-open'); control.setAttribute('aria-expanded', 'false'); };

    control.addEventListener('click', function (e) {
      e.preventDefault();
      sel.classList.contains('is-open') ? close() : open();
    });
    control.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
    });

    if (menu) {
      menu.addEventListener('click', function (e) {
        var item = e.target.closest('.tolv-list-item');
        if (!item || itemDisabled(item)) return;
        menu.querySelectorAll('.tolv-list-item').forEach(function (li) {
          li.classList.remove('is-selected');
          if (li.hasAttribute('aria-selected')) li.setAttribute('aria-selected', 'false');
        });
        item.classList.add('is-selected');
        if (item.getAttribute('role') === 'option') item.setAttribute('aria-selected', 'true');
        if (value) value.textContent = labelOf(item);
        sel.dispatchEvent(new CustomEvent('tolv:change', { bubbles: true, detail: { value: value ? value.textContent : null, item: item } }));
        close();
        control.focus();
      });
    }
  }

  function initSearch(sr) {
    var control = sr.querySelector('.tolv-search__control');
    var input = sr.querySelector('input.tolv-search__input');
    var value = sr.querySelector('.tolv-search__value');
    var menu = sr.querySelector('.tolv-search__menu');
    var clear = sr.querySelector('.tolv-search__icon--clear');

    var disabled = function () { return sr.classList.contains('is-disabled'); };
    var text = function () { return input ? input.value : (value ? value.textContent : ''); };
    var setText = function (t) { if (input) input.value = t; else if (value) value.textContent = t; };

    // 入力でメニューを絞り込み、候補があれば開く
    function filter() {
      if (!menu) return false;
      var q = text().trim().toLowerCase();
      var any = false;
      menu.querySelectorAll('.tolv-list-item').forEach(function (li) {
        var show = !q || labelOf(li).toLowerCase().indexOf(q) !== -1;
        li.hidden = !show;
        if (show) any = true;
      });
      return any;
    }
    var open = function () { if (disabled()) return; if (menu && menu.querySelector('.tolv-list-item:not([hidden])')) sr.classList.add('is-open'); };
    var close = function () { sr.classList.remove('is-open'); };

    if (control) control.addEventListener('click', function () { if (input) input.focus(); open(); });
    if (input) {
      input.addEventListener('focus', function () { filter(); open(); });
      input.addEventListener('input', function () { filter() ? open() : close(); });
    }
    if (clear) clear.addEventListener('click', function (e) {
      e.stopPropagation();
      setText('');       // 入力をクリアし、
      filter();          // 全候補を表示して
      if (input) input.focus();
      open();            // 開いたまま（やり直しやすく）
    });
    if (menu) menu.addEventListener('click', function (e) {
      var item = e.target.closest('.tolv-list-item');
      if (!item || itemDisabled(item)) return;
      setText(labelOf(item));
      sr.dispatchEvent(new CustomEvent('tolv:select', { bubbles: true, detail: { item: item } }));
      close();
    });
  }

  var TolvForm = {
    init: function (root) {
      root = root || document;
      bindDocumentOnce();
      root.querySelectorAll('.tolv-select:not([data-tolv-init])').forEach(function (el) { el.setAttribute('data-tolv-init', ''); initSelect(el); });
      root.querySelectorAll('.tolv-search:not([data-tolv-init])').forEach(function (el) { el.setAttribute('data-tolv-init', ''); initSearch(el); });
    },
  };

  if (document.readyState !== 'loading') TolvForm.init();
  else document.addEventListener('DOMContentLoaded', function () { TolvForm.init(); });

  global.TolvForm = TolvForm;
})(typeof window !== 'undefined' ? window : this);
