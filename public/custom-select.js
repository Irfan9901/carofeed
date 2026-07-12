(function () {
  'use strict';

  /* ---- native value descriptor cache ---- */
  let _nativeValueDesc = null;
  try {
    _nativeValueDesc = Object.getOwnPropertyDescriptor(
      HTMLSelectElement.prototype,
      'value'
    );
  } catch (e) {
    /* not available */
  }

  /* ---- CustomSelect ---- */
  class CustomSelect {
    static _uid = 0;

    constructor(select) {
      if (select._cs) return;
      select._cs = true;

      this.select = select;
      this.id = select.id || 'cs-' + (++CustomSelect._uid);
      this._open = false;

      this._buildDOM();
      this._syncOptions();
      this._syncFromSelect();
      this._bindEvents();
      this._proxyValue();
      this._watchOptions();
    }

    /* ---- DOM ---- */
    _buildDOM() {
      var wrap = document.createElement('div');
      wrap.className = 'cs';

      var trig = document.createElement('button');
      trig.className = 'cs-trigger';
      trig.type = 'button';
      trig.setAttribute('aria-haspopup', 'listbox');
      trig.setAttribute('aria-expanded', 'false');

      this._text = document.createElement('span');
      this._text.className = 'cs-text';
      trig.appendChild(this._text);

      this._arrow = document.createElement('span');
      this._arrow.className = 'cs-arrow';
      this._arrow.innerHTML =
        '<svg width="14" height="14" viewBox="0 0 14 14"><path d="M4 6l3 3 3-3" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      trig.appendChild(this._arrow);

      var menu = document.createElement('div');
      menu.className = 'cs-menu';
      menu.setAttribute('role', 'listbox');
      menu.id = this.id + '-menu';

      this.select.style.display = 'none';
      this.select.parentNode.insertBefore(wrap, this.select);
      wrap.appendChild(this.select);
      wrap.appendChild(trig);
      wrap.appendChild(menu);

      this.wrap = wrap;
      this.trig = trig;
      this.menu = menu;
    }

    /* ---- options ---- */
    _syncOptions() {
      var opts = Array.from(this.select.options);
      this.menu.innerHTML = opts
        .map(function (o, i) {
          var val = CustomSelect._escapeAttr(o.value);
          var label = CustomSelect._escapeHtml(o.label || o.text);
          var sel = o.selected ? ' aria-selected="true"' : '';
          var dis = o.disabled ? ' aria-disabled="true"' : '';
          return (
            '<div class="cs-option' +
            (o.disabled ? ' cs-option-disabled' : '') +
            '" role="option" data-value="' +
            val +
            '" data-index="' +
            i +
            '"' +
            sel +
            dis +
            '>' +
            label +
            '</div>'
          );
        })
        .join('');

      this._opts = Array.from(this.menu.children);
      this._opts.forEach((el) => {
        el.addEventListener('click', (e) => {
          e.stopPropagation();
          if (el.getAttribute('aria-disabled') === 'true') return;
          this.selectOption(el.getAttribute('data-value'));
          this.close();
        });
      });
    }

    /* ---- value sync (select → UI) ---- */
    _syncFromSelect() {
      var val = this.select.value;
      this._opts.forEach(function (el) {
        var match = el.getAttribute('data-value') === val;
        el.toggleAttribute('aria-selected', match);
      });
      this._updateText();
    }

    _updateText() {
      var idx = this.select.selectedIndex;
      if (idx >= 0 && this.select.options[idx]) {
        this._text.textContent =
          this.select.options[idx].label || this.select.options[idx].text;
        this._text.classList.toggle('cs-placeholder', !this.select.value);
      }
    }

    /* ---- events ---- */
    _bindEvents() {
      this.trig.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggle();
      });

      document.addEventListener('click', (e) => {
        if (!this.wrap.contains(e.target)) this.close();
      });

      this.trig.addEventListener('keydown', (e) => {
        this._onTriggerKey(e);
      });

      this.menu.addEventListener('keydown', (e) => {
        this._onMenuKey(e);
      });
    }

    toggle() {
      this._open ? this.close() : this.open();
    }

    open() {
      if (this._open) return;
      this._open = true;
      this.wrap.classList.add('cs-open');
      this.trig.setAttribute('aria-expanded', 'true');
      this.menu.style.display = 'block';
      this._highlightCurrent();
    }

    close() {
      if (!this._open) return;
      this._open = false;
      this.wrap.classList.remove('cs-open');
      this.trig.setAttribute('aria-expanded', 'false');
      this.menu.style.display = 'none';
      this.trig.focus({ preventScroll: true });
    }

    selectOption(value) {
      if (this.select.value === value) return;
      this.select.value = value;
      this._syncFromSelect();
      this._emitChange();
    }

    _emitChange() {
      var ev = new Event('change', { bubbles: true });
      this.select.dispatchEvent(ev);
    }

    /* ---- value proxy (JS write → UI) ---- */
    _proxyValue() {
      if (!_nativeValueDesc) return;
      var self = this;
      var nativeGet = _nativeValueDesc.get;
      var nativeSet = _nativeValueDesc.set;

      Object.defineProperty(this.select, 'value', {
        get: function () {
          return nativeGet.call(this);
        },
        set: function (v) {
          nativeSet.call(this, v);
          self._syncFromSelect();
        },
        configurable: true,
      });
    }

    /* ---- observe option mutations ---- */
    _watchOptions() {
      this._mo = new MutationObserver(() => {
        var prev = this.select.value;
        this._syncOptions();
        try {
          this.select.value = prev;
        } catch (e) {
          /* value no longer valid, ignore */
        }
        this._syncFromSelect();
      });
      this._mo.observe(this.select, { childList: true, subtree: true });
    }

    /* ---- keyboard ---- */
    _onTriggerKey(e) {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          this.open();
          this._highlightNext(1);
          break;
        case 'ArrowUp':
          e.preventDefault();
          this.open();
          this._highlightNext(-1);
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          this.toggle();
          if (this._open) this._selectHighlighted();
          break;
        case 'Escape':
          e.preventDefault();
          this.close();
          break;
      }
    }

    _onMenuKey(e) {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          this._highlightNext(1);
          break;
        case 'ArrowUp':
          e.preventDefault();
          this._highlightNext(-1);
          break;
        case 'Enter':
          e.preventDefault();
          this._selectHighlighted();
          this.close();
          break;
        case 'Escape':
          e.preventDefault();
          this.close();
          break;
        case 'Tab':
          this.close();
          break;
      }
    }

    _highlightNext(dir) {
      var items = this._opts.filter(function (el) {
        return el.getAttribute('aria-disabled') !== 'true';
      });
      if (!items.length) return;
      var cur = items.findIndex(function (el) {
        return el.classList.contains('cs-highlighted');
      });
      var next = cur === -1 ? 0 : cur + dir;
      if (next < 0) next = items.length - 1;
      if (next >= items.length) next = 0;
      items.forEach(function (el) {
        el.classList.remove('cs-highlighted');
      });
      items[next].classList.add('cs-highlighted');
      items[next].scrollIntoView({ block: 'nearest' });
    }

    _selectHighlighted() {
      var el = this.menu.querySelector('.cs-option.cs-highlighted');
      if (el) this.selectOption(el.getAttribute('data-value'));
    }

    _highlightCurrent() {
      var val = this.select.value;
      this._opts.forEach(function (el) {
        var match = el.getAttribute('data-value') === val;
        el.classList.toggle('cs-highlighted', match);
        if (match) el.scrollIntoView({ block: 'nearest' });
      });
    }

    /* ---- static helpers ---- */
    static _escapeHtml(str) {
      var d = document.createElement('div');
      d.textContent = str;
      return d.innerHTML;
    }

    static _escapeAttr(str) {
      return String(str).replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    }
  }

  /* ---- init ---- */
  function init() {
    var selects = document.querySelectorAll('select');
    selects.forEach(function (el) {
      new CustomSelect(el);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
