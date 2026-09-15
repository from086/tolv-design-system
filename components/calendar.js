/*
 * tolv Design System — Calendar behavior  (v0.8.0)
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
 */
(function (global) {
  'use strict';

  var ICON = {
    left: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg>',
    right: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4.5" width="18" height="16" rx="2"/><path d="M3 9.5h18M8 3v3M16 3v3"/></svg>',
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
      + '<select class="tolv-calendar__year" aria-label="年">' + years + '</select>'
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

  function initDateSelects(root) {
    root.querySelectorAll('.tolv-date-select:not([data-tolv-init])').forEach(function (ds) {
      ds.setAttribute('data-tolv-init', '');
      if (ds.classList.contains('is-disabled')) return;
      var segs = ds.querySelectorAll('.tolv-date-select__seg');
      if (segs.length < 3) return;
      var pop = ds.querySelector('.tolv-date-select__popover');
      if (!pop) { pop = document.createElement('div'); pop.className = 'tolv-date-select__popover'; ds.appendChild(pop); }
      var calEl = document.createElement('div');
      pop.appendChild(calEl);

      function setSegs(v) {
        if (v) { var p = v.split('-'); segs[0].textContent = p[0]; segs[1].textContent = p[1]; segs[2].textContent = p[2]; segs.forEach(function (s) { s.removeAttribute('data-empty'); }); }
        else { segs[0].textContent = '----'; segs[1].textContent = '--'; segs[2].textContent = '--'; segs.forEach(function (s) { s.setAttribute('data-empty', ''); }); }
      }
      mount(calEl, {
        selected: ds.dataset.value || null,
        onSelect: function (v) { setSegs(v); ds.dataset.value = v; ds.classList.remove('is-open'); ds.dispatchEvent(new CustomEvent('tolv:datechange', { bubbles: true, detail: { value: v } })); },
        onClear: function () { setSegs(null); ds.dataset.value = ''; ds.classList.remove('is-open'); ds.dispatchEvent(new CustomEvent('tolv:datechange', { bubbles: true, detail: { value: null } })); },
      });
      ds.addEventListener('click', function (e) {
        if (pop.contains(e.target)) return;
        ds.classList.toggle('is-open');
      });
    });
  }

  var docBound = false;
  function bindDocumentOnce() {
    if (docBound) return; docBound = true;
    document.addEventListener('click', function (e) {
      document.querySelectorAll('.tolv-date-select.is-open').forEach(function (ds) { if (!ds.contains(e.target)) ds.classList.remove('is-open'); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') document.querySelectorAll('.tolv-date-select.is-open').forEach(function (ds) { ds.classList.remove('is-open'); });
    });
  }

  var TolvCalendar = {
    mount: mount,
    init: function (root) {
      root = root || document;
      bindDocumentOnce();
      initInline(root);
      initDateSelects(root);
    },
  };

  if (document.readyState !== 'loading') TolvCalendar.init();
  else document.addEventListener('DOMContentLoaded', function () { TolvCalendar.init(); });

  global.TolvCalendar = TolvCalendar;
})(typeof window !== 'undefined' ? window : this);
