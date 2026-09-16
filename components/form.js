/*
 * tolv Design System — Form behavior  (v0.11.1)
 * =====================================================================
 * 依存なしの素のJS。form.css の Select / Search / InputTime に挙動を付与する。
 * プログレッシブエンハンス：読み込むだけで既存マークアップを自動初期化。
 *
 * 使い方:
 *   <script src="…/components/form.js" defer></script>
 *   // 動的に追加した要素は TolvForm.init(親要素) で再初期化
 *   // IncrementalSearch は <div class="tolv-search" data-suggestions='["A","B"]'> で
 *   //   マスターデータを渡すと SuggestionPanel 版で動作する
 *
 * イベント（bubbles）:
 *   .tolv-select → 'tolv:change'  detail: { value, item }
 *   .tolv-search → 'tolv:select'  detail: { value|item }（候補選択）
 *   .tolv-search → 'tolv:additem' detail: { value }（マスターに追加）
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

  // Figma 実アセット（Asset/Icon/add）に準拠。fill:currentColor。
  var ADD_ICON = '<svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M9.32882 10.7631H4.32882V9.09647H9.32882V4.09647H10.9955V9.09647H15.9955V10.7631H10.9955V15.7631H9.32882V10.7631Z"/></svg>';
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; });
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

  // IncrementalSearch（SuggestionPanel 版）：入力でマスターデータを絞り込み表示。
  // 一致0件で「該当なし＋マスターに追加」。追加/選択で確定・確定イベントを発火。
  function initSuggestionSearch(sr) {
    var input = sr.querySelector('.tolv-search__input');
    if (!input) return;
    var clear = sr.querySelector('.tolv-search__icon--clear');
    var master;
    try { master = JSON.parse(sr.getAttribute('data-suggestions') || '[]'); } catch (e) { master = []; }
    if (!Array.isArray(master)) master = [];
    var panel = sr.querySelector('.tolv-search__panel');
    if (!panel) { panel = document.createElement('div'); panel.className = 'tolv-suggestion-panel tolv-search__panel'; sr.appendChild(panel); }

    var disabled = function () { return sr.classList.contains('is-disabled') || input.disabled; };

    function render() {
      var q = (input.value || '').trim();
      sr.classList.toggle('is-filled', q !== '');
      var matches = master.filter(function (m) { return !q || String(m).toLowerCase().indexOf(q.toLowerCase()) !== -1; });
      if (matches.length) {
        panel.innerHTML = '<div class="tolv-suggestion-panel__items">'
          + matches.map(function (m) { return '<button type="button" class="tolv-suggestion-panel__item" data-value="' + esc(m) + '">' + esc(m) + '</button>'; }).join('')
          + '</div>';
      } else {
        panel.innerHTML = '<div class="tolv-suggestion-panel__nodata">'
          + '<p class="tolv-suggestion-panel__message">該当する項目がありません</p>'
          + (q ? '<button type="button" class="tolv-suggestion-panel__add"><span class="tolv-suggestion-panel__add-icon">' + ADD_ICON + '</span><span class="tolv-suggestion-panel__add-label">マスターに追加</span></button>' : '')
          + '</div>';
      }
    }
    var open = function () { if (disabled()) return; render(); sr.classList.add('is-open'); };
    var close = function () { sr.classList.remove('is-open'); };

    input.addEventListener('focus', open);
    input.addEventListener('input', function () { render(); if (!disabled()) sr.classList.add('is-open'); });
    if (clear) clear.addEventListener('click', function (e) {
      e.stopPropagation();
      input.value = '';
      render();
      input.focus();
      sr.classList.add('is-open');
    });

    panel.addEventListener('click', function (e) {
      var item = e.target.closest('.tolv-suggestion-panel__item');
      if (item) {
        input.value = item.getAttribute('data-value');
        sr.classList.add('is-filled');
        close();
        sr.dispatchEvent(new CustomEvent('tolv:select', { bubbles: true, detail: { value: input.value } }));
        return;
      }
      var add = e.target.closest('.tolv-suggestion-panel__add');
      if (add) {
        var v = (input.value || '').trim();
        if (!v) return;
        if (master.indexOf(v) === -1) master.push(v);
        sr.setAttribute('data-suggestions', JSON.stringify(master));
        input.value = v;
        sr.classList.add('is-filled');
        close();
        sr.dispatchEvent(new CustomEvent('tolv:additem', { bubbles: true, detail: { value: v } }));
        return;
      }
    });

    sr.classList.toggle('is-filled', (input.value || '').trim() !== '');
  }

  function initSearch(sr) {
    if (sr.hasAttribute('data-suggestions')) { initSuggestionSearch(sr); return; }
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

  // InputTime: 数字のみ／時=0-23・分=0-59 に制限（data-max で上書き可）
  function initTime(t) {
    t.querySelectorAll('.tolv-time__seg').forEach(function (seg, i) {
      var max = parseInt(seg.getAttribute('data-max'), 10);
      if (isNaN(max)) max = i === 0 ? 23 : 59;
      seg.addEventListener('input', function () {
        var v = seg.value.replace(/\D/g, '').slice(0, 2);
        if (v !== '' && parseInt(v, 10) > max) v = String(max);
        seg.value = v;
      });
      seg.addEventListener('blur', function () {
        if (seg.value !== '') seg.value = String(parseInt(seg.value, 10)).padStart(2, '0');
      });
    });
  }

  var TolvForm = {
    init: function (root) {
      root = root || document;
      bindDocumentOnce();
      root.querySelectorAll('.tolv-select:not([data-tolv-init])').forEach(function (el) { el.setAttribute('data-tolv-init', ''); initSelect(el); });
      root.querySelectorAll('.tolv-search:not([data-tolv-init])').forEach(function (el) { el.setAttribute('data-tolv-init', ''); initSearch(el); });
      root.querySelectorAll('.tolv-time:not([data-tolv-init])').forEach(function (el) { el.setAttribute('data-tolv-init', ''); initTime(el); });
    },
  };

  if (document.readyState !== 'loading') TolvForm.init();
  else document.addEventListener('DOMContentLoaded', function () { TolvForm.init(); });

  global.TolvForm = TolvForm;
})(typeof window !== 'undefined' ? window : this);
