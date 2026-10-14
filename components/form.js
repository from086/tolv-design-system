/*
 * tolv Design System — Form behavior  (v0.30.0)
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
 * SelectPanel / SuggestionPanel は最前面（Popover API の top layer）に表示し、親の overflow で切れない（TolvLayer）。
 *   位置はフィールドの下 4px・左端そろえ（.tolv-select--align-end は右端そろえ）。入りきらなければ上 / 反対側にそろえる。
 *   幅は最小でフィールドの幅、中身が長ければ広がる。スクロール・リサイズに追従し、フィールドが見えなくなったら閉じる。
 *
 * イベント（bubbles）:
 *   .tolv-select → 'tolv:change'  detail: { value, item }
 *   .tolv-search → 'tolv:select'  detail: { value|item }（候補選択）
 *   .tolv-search → 'tolv:additem' detail: { value }（マスターに追加）
 */
(function (global) {
  'use strict';

  // ==== TolvLayer：ポップオーバーを最前面に表示する共通の仕組み ====================
  // （calendar.js / form.js に同じ定義を置き、先に読み込まれた方を共有する。変更するときは両方そろえる）
  // パネルを Popover API（top layer）で重ね、位置は基準の要素（anchor）に合わせて JS で決める。
  //   既定は anchor の下 4px・左端そろえ。下に入りきらなければ上、右にはみ出すなら右端そろえ（画面端から 16px 以上）。
  //   ページ・親のスクロール、画面サイズの変更に追従し、anchor が見えなくなったら閉じる（onAutoClose）。
  // パネルは DOM 上は anchor の中に置いたままなので、anchor.contains() で「その部品の一部」と判定できる。
  // Popover API 非対応ブラウザは position:fixed ＋ z-index で重ねる（CSS の [data-tolv-layer]）。
  var TolvLayer = global.TolvLayer || (global.TolvLayer = (function () {
    var EDGE = 16;
    var SUPPORTS = typeof HTMLElement !== 'undefined' && Object.prototype.hasOwnProperty.call(HTMLElement.prototype, 'showPopover');
    var opened = [];
    var bound = false;

    // el が実際に見えている範囲（画面と、overflow で切り取る祖先の枠の重なり）
    function visibleRect(el) {
      var de = document.documentElement;
      var r = { top: 0, left: 0, right: de.clientWidth, bottom: de.clientHeight };
      for (var p = el.parentElement; p && p !== document.body && p !== de; p = p.parentElement) {
        var cs = getComputedStyle(p);
        if (/(auto|scroll|hidden|clip)/.test(cs.overflowX + ' ' + cs.overflowY)) {
          var b = p.getBoundingClientRect();
          r = { top: Math.max(r.top, b.top), left: Math.max(r.left, b.left), right: Math.min(r.right, b.right), bottom: Math.min(r.bottom, b.bottom) };
        }
      }
      return r;
    }

    function place(L) {
      if (!L.isOpen) return;
      var a = L.anchor.getBoundingClientRect();
      var v = visibleRect(L.anchor);
      if (a.bottom <= v.top || a.top >= v.bottom || a.right <= v.left || a.left >= v.right) {   // anchor が見えなくなったら閉じる
        close(L);
        if (L.onAutoClose) L.onAutoClose();
        return;
      }
      var de = document.documentElement, vw = de.clientWidth, vh = de.clientHeight;
      if (L.matchWidth) L.panel.style.minWidth = a.width + 'px';   // 最小幅 = anchor の幅（中身が長ければ広がる）
      var w = L.panel.offsetWidth, h = L.panel.offsetHeight;
      var top = a.bottom + L.gap, y = 'bottom';
      if (top + h > vh - EDGE && a.top - L.gap - h >= EDGE) { top = a.top - L.gap - h; y = 'top'; }
      var end = (typeof L.align === 'function' ? L.align() : L.align) === 'end';
      var left, x;
      if (end) { left = a.right - w; x = 'end'; if (left < EDGE) { left = a.left; x = 'start'; } }
      else { left = a.left; x = 'start'; if (left + w > vw - EDGE) { left = a.right - w; x = 'end'; } }
      left = Math.max(EDGE, Math.min(left, vw - EDGE - w));
      L.panel.style.top = top + 'px';
      L.panel.style.left = left + 'px';
      L.panel.setAttribute('data-placement', y + '-' + x);
    }

    function bind() {
      if (bound) return; bound = true;
      var follow = function () { opened.slice().forEach(place); };
      window.addEventListener('scroll', follow, true);   // capture: 親要素のスクロールも拾う
      window.addEventListener('resize', follow);
    }

    function open(L) {
      if (L.isOpen) { place(L); return; }
      L.isOpen = true;
      if (SUPPORTS) { try { L.panel.showPopover(); } catch (err) { /* 未接続など */ } }
      opened.push(L);
      bind();
      place(L);
    }

    function close(L) {
      if (!L.isOpen) return;
      L.isOpen = false;
      if (SUPPORTS) { try { L.panel.hidePopover(); } catch (err) { /* 既に閉じている */ } }
      opened = opened.filter(function (o) { return o !== L; });
    }

    // anchor: 位置の基準 / panel: 重ねる要素（anchor の子孫のまま）
    // opts: { gap = 4, align = 'start'|'end'|() => …, matchWidth = false, onAutoClose }
    function attach(anchor, panel, opts) {
      opts = opts || {};
      var L = { anchor: anchor, panel: panel, gap: opts.gap != null ? opts.gap : 4, align: opts.align || 'start', matchWidth: !!opts.matchWidth, onAutoClose: opts.onAutoClose, isOpen: false };
      panel.setAttribute('data-tolv-layer', '');
      if (SUPPORTS) panel.setAttribute('popover', 'manual');   // 開閉は各部品のスクリプトで管理（外側クリック・Esc）
      if (typeof ResizeObserver !== 'undefined') new ResizeObserver(function () { place(L); }).observe(panel);   // 中身が変わって大きさが変わったら取り直す
      return {
        open: function () { open(L); },
        close: function () { close(L); },
        place: function () { place(L); },
        isOpen: function () { return L.isOpen; },
      };
    }

    // node が最前面に重ねたパネルの中か
    function contains(node) {
      var el = node && node.nodeType === 3 ? node.parentElement : node;
      return !!(el && el.closest && el.closest('[data-tolv-layer]'));
    }

    return { attach: attach, contains: contains, supportsPopover: SUPPORTS };
  })());
  // ==== /TolvLayer =================================================================

  function closeEl(el) { if (el.__tolvClose) el.__tolvClose(); else el.classList.remove('is-open'); }

  var docBound = false;
  function bindDocumentOnce() {
    if (docBound) return;
    docBound = true;
    // 外側クリックで閉じる
    document.addEventListener('click', function (e) {
      document.querySelectorAll('.tolv-select.is-open, .tolv-search.is-open').forEach(function (el) {
        if (!el.contains(e.target)) closeEl(el);
      });
    });
    // Escape で閉じる
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      document.querySelectorAll('.tolv-select.is-open, .tolv-search.is-open').forEach(function (el) {
        closeEl(el);
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
    var layer = null;
    var close = function () { sel.classList.remove('is-open'); control.setAttribute('aria-expanded', 'false'); if (layer) layer.close(); };
    var open = function () { if (disabled()) return; sel.classList.add('is-open'); control.setAttribute('aria-expanded', 'true'); if (layer) layer.open(); };
    if (menu) {
      layer = TolvLayer.attach(sel, menu, {
        matchWidth: true,
        align: function () { return sel.classList.contains('tolv-select--align-end') ? 'end' : 'start'; },
        onAutoClose: close,
      });
      sel.__tolvClose = close;
      if (sel.classList.contains('is-open')) layer.open();   // 最初から開いた状態で置かれたもの（表示例など）
    }

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
    var layer = null;
    var close = function () { sr.classList.remove('is-open'); if (layer) layer.close(); };
    var open = function () { if (disabled()) return; render(); sr.classList.add('is-open'); layer.open(); };
    layer = TolvLayer.attach(sr, panel, { matchWidth: true, onAutoClose: close });
    sr.__tolvClose = close;

    input.addEventListener('focus', open);
    input.addEventListener('input', function () { if (!disabled()) open(); else render(); });
    if (clear) clear.addEventListener('click', function (e) {
      e.stopPropagation();
      input.value = '';
      input.focus();
      open();
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

  // node が Select / Search（最前面に出したパネルを含む）の一部か。外側クリックで閉じる処理用
  function contains(node) {
    var el = node && node.nodeType === 3 ? node.parentElement : node;
    return !!(el && el.closest && el.closest('.tolv-select, .tolv-search'));
  }

  var TolvForm = {
    contains: contains,
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
