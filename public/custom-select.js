class CustomSelect {
  constructor(selectId) {
    this.select = document.getElementById(selectId);
    if (!this.select) return;

    this.select.style.display = "none";

    const wrap = document.createElement("div");
    wrap.className = "custom-select";

    this.btn = document.createElement("button");
    this.btn.type = "button";
    this.btn.className =
      "input-field w-full rounded-lg px-3 py-2.5 text-sm flex items-center gap-2 text-left";
    this.btn.innerHTML =
      '<span class="flex-1 truncate"></span><i class="ti ti-chevron-down text-xs shrink-0"></i>';

    this.panel = document.createElement("div");
    this.panel.className = "custom-select-panel";

    this.select.parentNode.insertBefore(wrap, this.select.nextSibling);
    wrap.appendChild(this.btn);
    wrap.appendChild(this.panel);

    this.mut = new MutationObserver(() => this.refresh());
    this.mut.observe(this.select, { childList: true, subtree: true });

    this.refresh();

    this.btn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.toggle();
    });
    document.addEventListener("click", () => this.close());
    this.select.addEventListener("change", () => this.syncDisplay());
  }

  getDisplayText() {
    return this.select.options[this.select.selectedIndex]?.text || "";
  }

  syncDisplay() {
    this.btn.querySelector("span").textContent = this.getDisplayText();
    this.panel
      .querySelectorAll(".selected")
      .forEach((el) => el.classList.remove("selected"));
    const sel = this.panel.querySelector(
      `[data-value="${this.select.value.replace(/"/g, "&quot;")}"]`
    );
    if (sel) sel.classList.add("selected");
  }

  refresh() {
    const opts = Array.from(this.select.options);
    const cw = this.containerWidth();

    let maxTextWidth = 0;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    for (const o of opts) {
      ctx.font = "14px Inter, sans-serif";
      const w = ctx.measureText(o.text).width;
      if (w > maxTextWidth) maxTextWidth = w;
    }
    const available = cw - 24;
    let fs = 14;
    if (maxTextWidth > available) {
      const scaled = (available / maxTextWidth) * 14;
      fs = Math.max(11, Math.floor(scaled * 10) / 10);
    }

    this.panel.innerHTML = "";
    for (const o of opts) {
      const d = document.createElement("div");
      d.className = "option" + (o.selected ? " selected" : "");
      d.style.fontSize = fs + "px";
      d.dataset.value = o.value;
      d.textContent = o.text;
      if (o.value !== "") {
        d.addEventListener("click", (e) => {
          e.stopPropagation();
          this.select.value = o.value;
          this.select.dispatchEvent(new Event("change"));
          this.close();
        });
      }
      this.panel.appendChild(d);
    }
    this.syncDisplay();
  }

  containerWidth() {
    const rect = this.btn.getBoundingClientRect();
    return rect.width;
  }

  toggle() {
    this.panel.classList.toggle("open");
    this.btn.classList.toggle("active");
  }

  close() {
    this.panel.classList.remove("open");
    this.btn.classList.remove("active");
  }
}
