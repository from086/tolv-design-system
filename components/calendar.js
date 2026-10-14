/*
 * tolv Design System — Calendar behavior  (v0.29.0)
 * =====================================================================
 * 依存なしの素のJS。calendar.css の CalendarPanel / DateSelect に挙動を付与。
 *   - .tolv-calendar     : 月送り / 日選択 / 削除 / 今日（年はSelect）
 *   - .tolv-date-select  : クリックでカレンダーをポップオーバー表示、日選択で確定
 *
 * 使い方:
 *   <script src="…/components/calendar.js" defer></script>
 *   // インラインカレンダー: <div data-tolv-calendar data-selected="2026-09-10"></div>
 *   // 手動: TolvCalendar.mount(el, { selected, onSelect })
 *
 * イベント（bubbles）: .tolv-date-select → 'tolv:datechange'  detail: { value: 'YYYY-MM-DD'|null }
 *
 * DateSelect のカレンダーは最前面（Popover API の top layer）に表示し、親の overflow で切れない。
 * 位置は日付欄の下 4px・左端そろえ（入りきらなければ上 / 右端そろえ）で、スクロール・リサイズに追従。
 * 外側クリック判定用: TolvCalendar.contains(node) … node が DateSelect（カレンダーを含む）の一部なら true
 * 手動開閉: TolvCalendar.open(ds) / TolvCalendar.close(ds)
 */
(function (global) {
  'use strict';

  // Figma 実アセット（Asset/Icon/arrow-*, date_edit）に準拠。fill:currentColor。
  var ICON = {
    left: '<svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M11.6667 15L6.66667 10L11.6667 5L12.8333 6.16667L9 10L12.8333 13.8333L11.6667 15Z"/></svg>',
    right: '<svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M10.5 10L6.66667 6.16667L7.83333 5L12.8333 10L7.83333 15L6.66667 13.8333L10.5 10Z"/></svg>',
    calendar: '<svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M4.16667 18.3333C3.70833 18.3333 3.31597 18.1701 2.98958 17.8437C2.66319 17.5174 2.5 17.125 2.5 16.6667V5C2.5 4.54167 2.66319 4.14931 2.98958 3.82292C3.31597 3.49653 3.70833 3.33333 4.16667 3.33333H5V1.66667H6.66667V3.33333H13.3333V1.66667H15V3.33333H15.8333C16.2917 3.33333 16.684 3.49653 17.0104 3.82292C17.3368 4.14931 17.5 4.54167 17.5 5V9.16667H15.8333V8.33333H4.16667V16.6667H10V18.3333H4.16667ZM4.16667 6.66667H15.8333V5H4.16667V6.66667ZM11.6667 18.3333V15.7708L16.2708 11.1875C16.3958 11.0625 16.5347 10.9722 16.6875 10.9167C16.8403 10.8611 16.9931 10.8333 17.1458 10.8333C17.3125 10.8333 17.4722 10.8646 17.625 10.9271C17.7778 10.9896 17.9167 11.0833 18.0417 11.2083L18.8125 11.9792C18.9236 12.1042 19.0104 12.2431 19.0729 12.3958C19.1354 12.5486 19.1667 12.7014 19.1667 12.8542C19.1667 13.0069 19.1389 13.1632 19.0833 13.3229C19.0278 13.4826 18.9375 13.625 18.8125 13.75L14.2292 18.3333H11.6667ZM12.9167 17.0833H13.7083L16.2292 14.5417L15.8542 14.1458L15.4583 13.7708L12.9167 16.2917V17.0833Z"/></svg>',
  };

  function pad(n) { return String(n).padStart(2, '0'); }
  function toISO(y, m0, d) { return y + '-' + pad(m0 + 1) + '-' + pad(d); }
  function parseISO(s) { var p = String(s).split('-'); return { y: +p[0], m: +p[1] - 1, d: +p[2] }; }

  // 指定年月（m0=0-based）の 7×n グリッドのセル配列を返す
  function buildCells(year, m0) {
    var startDow = new Date(year, m0, 1).getDay();        // 0=日
    var daysInMonth = new Date(year, m0 + 1, 0).getDate();
    var prevDays = new Date(year, m0, 0).getDate();
    var cells = [];
    for (var i = startDow - 1; i >= 0; i--) cells.push({ d: prevDays - i, outside: true });
    for (var d = 1; d <= daysInMonth; d++) cells.push({ d: d, outside: false });
    var next = 1;
    while (cells.length % 7 !== 0) cells.push({ d: next++, outside: true });
    return cells;
  }

  function setHTML(state) {
    var years = '';
    var base = new Date().getFullYear();
    var from = Math.min(base - 10, state.year), to = Math.max(base + 10, state.year);
    for (var y = from; y <= to; y++) years += '<option value="' + y + '"' + (y === state.year ? ' selected' : '') + '>' + y + '年</option>';

    var cells = buildCells(state.year, state.month);
    var weeks = '';
    for (var i = 0; i < cells.length; i += 7) {
      var row = '';
      for (var j = 0; j < 7; j++) {
        var c = cells[i + j];
        if (c.outside) {
          row += '<button type="button" class="tolv-date-cell" disabled>' + c.d + '</button>';
        } else {
          var isoD = toISO(state.year, state.month, c.d);
          var sel = state.selected === isoD ? ' is-selected' : '';
          row += '<button type="button" class="tolv-date-cell' + sel + '" data-date="' + isoD + '">' + c.d + '</button>';
        }
      }
      weeks += '<div class="tolv-calendar__week">' + row + '</div>';
    }

    return '<div class="tolv-calendar__set">'
      + '<div class="tolv-calendar__header">'
      + '<span class="tolv-calendar__year-wrap"><select class="tolv-calendar__year" aria-label="年">' + years + '</select></span>'
      + '<div class="tolv-calendar__month">'
      + '<button type="button" class="tolv-calendar__nav" data-nav="prev" aria-label="前の月">' + ICON.left + '</button>'
      + '<span class="tolv-calendar__month-label">' + (state.month + 1) + '月</span>'
      + '<button type="button" class="tolv-calendar__nav" data-nav="next" aria-label="次の月">' + ICON.right + '</button>'
      + '</div></div>'
      + '<div class="tolv-calendar__weeks">' + weeks + '</div>'
      + '<div class="tolv-calendar__actions">'
      + '<button type="button" class="tolv-calendar__action" data-action="clear">削除</button>'
      + '<button type="button" class="tolv-calendar__action tolv-calendar__action--today" data-action="today">今日</button>'
      + '</div></div>';
  }

  function mount(el, opts) {
    opts = opts || {};
    var b = opts.selected ? parseISO(opts.selected) : { y: new Date().getFullYear(), m: new Date().getMonth() };
    var state = {
      year: opts.year != null ? opts.year : b.y,
      month: opts.month != null ? opts.month : b.m,
      selected: opts.selected || null,
      onSelect: opts.onSelect || function () {},
      onClear: opts.onClear || function () {},
    };
    el.classList.add('tolv-calendar');
    var draw = function () { el.innerHTML = setHTML(state); };
    draw();

    if (el.__tolvBound) return { redraw: draw };
    el.__tolvBound = true;

    el.addEventListener('click', function (e) {
      // パネル内のクリックは外側クリック判定に伝播させない（月送り等でポップオーバーを閉じない）
      e.stopPropagation();
      var cell = e.target.closest('.tolv-date-cell');
      if (cell && cell.dataset.date && !cell.disabled) {
        state.selected = cell.dataset.date; draw(); state.onSelect(state.selected); return;
      }
      var nav = e.target.closest('[data-nav]');
      if (nav) {
        state.month += nav.dataset.nav === 'next' ? 1 : -1;
        if (state.month < 0) { state.month = 11; state.year--; }
        if (state.month > 11) { state.month = 0; state.year++; }
        draw(); return;
      }
      var act = e.target.closest('[data-action]');
      if (act) {
        if (act.dataset.action === 'today') {
          var t = new Date();
          state.year = t.getFullYear(); state.month = t.getMonth();
          state.selected = toISO(t.getFullYear(), t.getMonth(), t.getDate());
          draw(); state.onSelect(state.selected);
        } else if (act.dataset.action === 'clear') {
          state.selected = null; draw(); state.onClear();
        }
      }
    });
    el.addEventListener('change', function (e) {
      var yr = e.target.closest('.tolv-calendar__year');
      if (yr) { state.year = parseInt(yr.value, 10); draw(); }
    });
    return { redraw: draw, getState: function () { return state; } };
  }

  function initInline(root) {
    root.querySelectorAll('[data-tolv-calendar]:not([data-tolv-init])').forEach(function (el) {
      el.setAttribute('data-tolv-init', '');
      mount(el, { selected: el.dataset.selected || null });
    });
  }

  // ---- カレンダーを最前面に表示（親の overflow で切れないように） ----
  // Popover API（top layer）で重ね、位置は日付欄に合わせて JS で決める。
  // ポップオーバーは DOM 上は DateSelect の中に置いたままなので、ds.contains() で「DateSelect の一部」と判定できる。
  // Popover API 非対応ブラウザは position:fixed ＋ z-index で重ねる（calendar.css）。
  var GAP = 4;    // 日付欄との間隔（space/small）
  var EDGE = 16;  // 画面の端から離す距離（space/large）
  var SUPPORTS_POPOVER = typeof HTMLElement !== 'undefined' && Object.prototype.hasOwnProperty.call(HTMLElement.prototype, 'showPopover');
  var opened = [];

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

  // 既定は日付欄の下 4px・左端そろえ。下に入りきらなければ上、右にはみ出すなら右端そろえ（画面端から 16px 以上）
  function place(ds) {
    var pop = ds.__tolvPop;
    var a = ds.getBoundingClientRect();
    var v = visibleRect(ds);
    if (a.bottom <= v.top || a.top >= v.bottom || a.right <= v.left || a.left >= v.right) { close(ds, false); return; }  // 日付欄が見えなくなったら閉じる
    var vw = document.documentElement.clientWidth, vh = document.documentElement.clientHeight;
    var w = pop.offsetWidth, h = pop.offsetHeight;
    var top = a.bottom + GAP, y = 'bottom';
    if (top + h > vh - EDGE && a.top - GAP - h >= EDGE) { top = a.top - GAP - h; y = 'top'; }
    var left = a.left, x = 'start';
    if (left + w > vw - EDGE) { left = a.right - w; x = 'end'; }
    left = Math.max(EDGE, Math.min(left, vw - EDGE - w));
    pop.style.top = top + 'px';
    pop.style.left = left + 'px';
    pop.setAttribute('data-placement', y + '-' + x);
  }

  function open(ds) {
    if (!ds.__tolvPop || ds.classList.contains('is-open') || ds.classList.contains('is-disabled')) return;
    opened.slice().forEach(function (o) { close(o, false); });   // 同時に開くのは1つ
    ds.classList.add('is-open');
    ds.setAttribute('aria-expanded', 'true');
    if (SUPPORTS_POPOVER) { try { ds.__tolvPop.showPopover(); } catch (err) { /* 未接続など */ } }
    opened.push(ds);
    place(ds);
  }

  // restoreFocus: 閉じたあと日付欄にフォーカスを戻す
  function close(ds, restoreFocus) {
    if (!ds.classList.contains('is-open')) return;
    ds.classList.remove('is-open');
    ds.setAttribute('aria-expanded', 'false');
    if (SUPPORTS_POPOVER) { try { ds.__tolvPop.hidePopover(); } catch (err) { /* 既に閉じている */ } }
    opened = opened.filter(function (o) { return o !== ds; });
    if (restoreFocus) ds.focus({ preventScroll: true });
  }

  function initDateSelects(root) {
    root.querySelectorAll('.tolv-date-select:not([data-tolv-init])').forEach(function (ds) {
      ds.setAttribute('data-tolv-init', '');
      var segs = ds.querySelectorAll('.tolv-date-select__seg');
      if (segs.length < 3) return;
      var pop = ds.querySelector('.tolv-date-select__popover');
      if (!pop) { pop = document.createElement('div'); pop.className = 'tolv-date-select__popover'; ds.appendChild(pop); }
      if (SUPPORTS_POPOVER) pop.setAttribute('popover', 'manual');   // 開閉はこのスクリプトで管理（外側クリック・Esc）
      ds.__tolvPop = pop;
      var calEl = document.createElement('div');
      pop.appendChild(calEl);

      // キーボードで開けるように（マークアップは変えずに属性だけ補う）
      if (!ds.hasAttribute('tabindex')) ds.setAttribute('tabindex', ds.classList.contains('is-disabled') ? '-1' : '0');
      ds.setAttribute('aria-haspopup', 'dialog');
      ds.setAttribute('aria-expanded', 'false');

      function setSegs(v) {
        if (v) { var p = v.split('-'); segs[0].textContent = p[0]; segs[1].textContent = p[1]; segs[2].textContent = p[2]; segs.forEach(function (s) { s.removeAttribute('data-empty'); }); }
        else { segs[0].textContent = '----'; segs[1].textContent = '--'; segs[2].textContent = '--'; segs.forEach(function (s) { s.setAttribute('data-empty', ''); }); }
      }
      mount(calEl, {
        selected: ds.dataset.value || null,
        onSelect: function (v) { setSegs(v); ds.dataset.value = v; close(ds, true); ds.dispatchEvent(new CustomEvent('tolv:datechange', { bubbles: true, detail: { value: v } })); },
        onClear: function () { setSegs(null); ds.dataset.value = ''; close(ds, true); ds.dispatchEvent(new CustomEvent('tolv:datechange', { bubbles: true, detail: { value: null } })); },
      });
      ds.addEventListener('click', function (e) {
        if (pop.contains(e.target)) return;
        if (ds.classList.contains('is-open')) close(ds, false); else open(ds);
      });
      ds.addEventListener('keydown', function (e) {
        if (e.target !== ds || (e.key !== 'Enter' && e.key !== ' ')) return;
        e.preventDefault();
        if (ds.classList.contains('is-open')) close(ds, true); else open(ds);
      });
      // 月によって週の数が変わり高さが変わる → 位置を取り直す（上に開いているときに必要）
      if (typeof ResizeObserver !== 'undefined') new ResizeObserver(function () { if (ds.classList.contains('is-open')) place(ds); }).observe(pop);
    });
  }

  var docBound = false;
  function bindDocumentOnce() {
    if (docBound) return; docBound = true;
    document.addEventListener('click', function (e) {
      opened.slice().forEach(function (ds) {
        if (ds.contains(e.target)) return;
        // 外側クリックで閉じる。クリック先がフォーカスを取らなかったときだけ日付欄に戻す
        var ae = document.activeElement;
        close(ds, !ae || ae === document.body || ds.contains(ae));
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') opened.slice().forEach(function (ds) { close(ds, true); });
    });
    // ページ・親要素のスクロール（capture で全要素分を拾う）と画面サイズの変更に追従
    var follow = function () { opened.slice().forEach(place); };
    window.addEventListener('scroll', follow, true);
    window.addEventListener('resize', follow);
  }

  // node が DateSelect（カレンダーを含む）の一部か。外側クリックで閉じる処理（FilterPanel など）から使う
  function contains(node) {
    var el = node && node.nodeType === 3 ? node.parentElement : node;
    return !!(el && el.closest && el.closest('.tolv-date-select'));
  }

  var TolvCalendar = {
    mount: mount,
    init: function (root) {
      root = root || document;
      bindDocumentOnce();
      initInline(root);
      initDateSelects(root);
    },
    open: open,
    close: function (ds) { close(ds, false); },
    contains: contains,
  };

  if (document.readyState !== 'loading') TolvCalendar.init();
  else document.addEventListener('DOMContentLoaded', function () { TolvCalendar.init(); });

  global.TolvCalendar = TolvCalendar;
})(typeof window !== 'undefined' ? window : this);
