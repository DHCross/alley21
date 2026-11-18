// Alley 21 Living Doc Editor
// Hydrates and edits business-goals.html and alley21-brochure.html via /api/docs (Vercel Blob).

const DOC_ID = document.body.dataset.livingDoc;
const API_URL = "/api/docs";
const AUTHOR_STORAGE_KEY = "alley21.livingDocAuthor";
const AUTHORS = ["Dan", "Stephanie"];

const ALLOWED_ELEMENTS = [
  "header", "nav", "section", "article", "aside", "footer",
  "h1", "h2", "h3", "h4", "p", "div", "span",
  "b", "strong", "i", "em", "u", "s", "small", "code", "pre", "blockquote",
  "ul", "ol", "li", "dl", "dt", "dd",
  "table", "caption", "thead", "tbody", "tfoot", "tr", "th", "td",
  "a", "br", "hr", "details", "summary", "time",
];

const ALLOWED_ATTRIBUTES = [
  "class", "id", "href", "download", "target", "rel", "open", "datetime",
];

const BADGE_VARIANTS = [
  { cls: "b-active", label: "Active / Core" },
  { cls: "b-info", label: "Developing" },
  { cls: "b-draft", label: "Draft" },
  { cls: "b-wait", label: "Waiting / Sent" },
  { cls: "b-no", label: "Closed / No" },
  { cls: "b-plain", label: "Plain / Inactive" },
];

let domPurifyPromise = null;

function loadDOMPurify() {
  domPurifyPromise ??= import("https://cdn.jsdelivr.net/npm/dompurify@3.2.4/dist/purify.es.mjs")
    .then((mod) => mod.default ?? mod);
  return domPurifyPromise;
}

async function safeSetHTML(el, html) {
  if ("setHTML" in Element.prototype) {
    el.setHTML(html, {
      sanitizer: {
        elements: ALLOWED_ELEMENTS,
        attributes: ALLOWED_ATTRIBUTES,
      },
    });
  } else {
    const DOMPurify = await loadDOMPurify();
    el.innerHTML = DOMPurify.sanitize(html, {
      ALLOWED_TAGS: [...ALLOWED_ELEMENTS, "#text"],
      ALLOWED_ATTR: ALLOWED_ATTRIBUTES,
      ALLOW_ARIA_ATTR: false,
      ALLOW_DATA_ATTR: false,
      KEEP_CONTENT: false,
    });
  }
}

function hydrateTableCellLabels(root) {
  root.querySelectorAll("table").forEach((table) => {
    const headers = Array.from(table.querySelectorAll("thead th")).map((th) =>
      th.textContent.trim(),
    );
    if (!headers.length) return;
    table.querySelectorAll("tbody tr").forEach((tr) => {
      const cells = Array.from(tr.children).filter((c) => c.tagName === "TD");
      cells.forEach((td, idx) => {
        if (idx === 0) {
          td.removeAttribute("data-l");
        } else if (headers[idx]) {
          td.setAttribute("data-l", headers[idx]);
        }
      });
    });
  });
}

function formatCentralStamp(date = new Date()) {
  const datePart = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
  const timePart = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(date);
  return `${datePart} · ${timePart}`;
}

function formatShortStamp(isoString) {
  if (!isoString) return "";
  const d = new Date(isoString);
  if (Number.isNaN(d.getTime())) return isoString;
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(d);
}

function todayIsoCentral() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const map = Object.fromEntries(parts.map((p) => [p.type, p.value]));
  return `${map.year}-${map.month}-${map.day}`;
}

function getStoredAuthor() {
  try {
    const saved = localStorage.getItem(AUTHOR_STORAGE_KEY);
    if (saved && AUTHORS.includes(saved)) return saved;
  } catch {
    // ignore storage errors
  }
  return "Dan";
}

function setStoredAuthor(author) {
  try {
    localStorage.setItem(AUTHOR_STORAGE_KEY, author);
  } catch {
    // ignore storage errors
  }
}

function installDialogLightDismissFallback(dialog) {
  if ("closedBy" in HTMLDialogElement.prototype) return;
  const outside = (e) => {
    const r = dialog.getBoundingClientRect();
    return (
      e.clientX < r.left ||
      e.clientX > r.right ||
      e.clientY < r.top ||
      e.clientY > r.bottom
    );
  };
  let pressedOutside = false;
  dialog.addEventListener("pointerdown", (e) => {
    pressedOutside = outside(e);
  });
  dialog.addEventListener("pointerup", (e) => {
    if (pressedOutside && outside(e)) dialog.close();
  });
}

function installToolbarRovingFallback(toolbar) {
  if ("focusGroup" in HTMLElement.prototype) return;
  const getItems = () =>
    Array.from(toolbar.querySelectorAll("button")).filter(
      (b) => b.offsetParent !== null,
    );
  const syncTabStops = (active) => {
    const items = getItems();
    items.forEach((b, idx) => {
      b.tabIndex = active ? (b === active ? 0 : -1) : idx === 0 ? 0 : -1;
    });
  };
  syncTabStops();
  toolbar.addEventListener("focusin", ({ target }) => {
    const items = getItems();
    if (items.includes(target)) syncTabStops(target);
  });
  toolbar.addEventListener("keydown", (e) => {
    const items = getItems();
    const currentIdx = items.indexOf(document.activeElement);
    if (currentIdx === -1) return;
    const rtl = getComputedStyle(toolbar).direction === "rtl";
    const steps = { ArrowRight: rtl ? -1 : 1, ArrowLeft: rtl ? 1 : -1 };
    let nextIdx = null;
    if (e.key in steps) {
      nextIdx = (currentIdx + steps[e.key] + items.length) % items.length;
    } else if (e.key === "Home") {
      nextIdx = 0;
    } else if (e.key === "End") {
      nextIdx = items.length - 1;
    }
    if (nextIdx !== null) {
      e.preventDefault();
      syncTabStops(items[nextIdx]);
      items[nextIdx].focus();
    }
  });
}

function makeEl(tag, attrs = {}, text = "") {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v !== null && v !== undefined) el.setAttribute(k, v);
  }
  if (text) el.textContent = text;
  return el;
}

function init() {
  if (!DOC_ID) return;
  const docRoot = document.getElementById("living-doc-root");
  if (!docRoot) return;

  const baselineHtml = docRoot.innerHTML;
  hydrateTableCellLabels(docRoot);

  const state = {
    version: 0,
    updatedAt: null,
    updatedBy: null,
    summary: "",
    editing: false,
    dirty: false,
    saving: false,
    author: getStoredAuthor(),
    activeBadge: null,
    activeLink: null,
    pendingConflict: null,
  };

  // ---------- Build top editor bar ----------
  const barWrap = makeEl("div", { class: "ld-bar-wrap", "data-editor-ui": "1" });
  const bar = makeEl("div", { class: "ld-bar" });

  const metaBox = makeEl("div", { class: "ld-meta" });
  const pill = makeEl("span", { class: "ld-pill" });
  const pillDot = makeEl("span", { class: "ld-pill-dot", "aria-hidden": "true" });
  const pillLabel = makeEl("span", {}, "Connecting…");
  pill.append(pillDot, pillLabel);
  const metaText = makeEl("span", { class: "ld-meta-text" }, "");
  metaBox.append(pill, metaText);

  const toolbar = makeEl("div", {
    class: "ld-toolbar",
    role: "toolbar",
    focusgroup: "toolbar wrap",
    "aria-label": "Document editor controls",
    "aria-controls": "living-doc-root",
  });

  const groupEdit = makeEl("div", { class: "ld-group", role: "group", "aria-label": "Author and editing" });
  const authorBtn = makeEl(
    "button",
    { type: "button", class: "ld-btn", title: "Switch who is editing (Dan or Stephanie)" },
    `Editing as: ${state.author}`,
  );
  const editToggleBtn = makeEl(
    "button",
    { type: "button", class: "ld-btn", "aria-pressed": "false" },
    "Edit doc",
  );
  groupEdit.append(authorBtn, editToggleBtn);

  const sep1 = makeEl("span", { class: "ld-sep", role: "separator", "aria-orientation": "vertical" });

  const groupSave = makeEl("div", { class: "ld-group", role: "group", "aria-label": "Save and history" });
  const saveBtn = makeEl(
    "button",
    { type: "button", class: "ld-btn ld-btn-primary", "aria-disabled": "true" },
    "Save",
  );
  const discardBtn = makeEl(
    "button",
    { type: "button", class: "ld-btn ld-btn-danger", "aria-disabled": "true" },
    "Discard",
  );
  const historyBtn = makeEl("button", { type: "button", class: "ld-btn" }, "History");
  groupSave.append(saveBtn, discardBtn, historyBtn);

  const sep2 = makeEl("span", { class: "ld-sep", role: "separator", "aria-orientation": "vertical" });

  const groupExport = makeEl("div", { class: "ld-group", role: "group", "aria-label": "Export and print" });
  const downloadBtn = makeEl("button", { type: "button", class: "ld-btn" }, "Download HTML");
  const printBtn = makeEl("button", { type: "button", class: "ld-btn" }, "Print / PDF");
  groupExport.append(downloadBtn, printBtn);

  toolbar.append(groupEdit, sep1, groupSave, sep2, groupExport);
  bar.append(metaBox, toolbar);

  const saveDrawer = makeEl("div", { class: "ld-save-drawer", hidden: "" });
  const summaryInput = makeEl("input", {
    type: "text",
    class: "ld-summary-input",
    maxlength: "160",
    placeholder: "Optional edit note (e.g. Updated Cove Chronicle ad status, added phone number)",
    "aria-label": "Edit summary note",
  });
  const drawerSaveBtn = makeEl("button", { type: "button", class: "ld-btn ld-btn-primary" }, "Save changes (⌘S)");
  saveDrawer.append(summaryInput, drawerSaveBtn);

  barWrap.append(bar, saveDrawer);

  const srStatus = makeEl("p", { class: "ld-status-sr", role: "status", "aria-live": "polite" });
  const toast = makeEl("div", { class: "ld-toast", hidden: "", "data-editor-ui": "1" });

  // ---------- Dialogs ----------
  const historyDialog = makeEl("dialog", {
    id: "ld-history-dialog",
    class: "ld-dialog",
    closedby: "any",
    "aria-labelledby": "ld-history-title",
    "data-editor-ui": "1",
  });
  historyDialog.innerHTML = `
    <div class="ld-dlg-head">
      <h2 id="ld-history-title">Revision history</h2>
      <button type="button" class="ld-btn" data-close>Close</button>
    </div>
    <div class="ld-dlg-body" id="ld-history-body">Loading…</div>
    <div class="ld-dlg-foot">
      <button type="button" class="ld-btn ld-btn-danger" id="ld-reset-baseline-btn">Reset to repo baseline</button>
      <button type="button" class="ld-btn" data-close>Done</button>
    </div>
  `;

  const badgeDialog = makeEl("dialog", {
    id: "ld-badge-dialog",
    class: "ld-dialog is-compact",
    closedby: "any",
    "aria-labelledby": "ld-badge-title",
    "data-editor-ui": "1",
  });
  badgeDialog.innerHTML = `
    <div class="ld-dlg-head">
      <h2 id="ld-badge-title">Edit status badge</h2>
      <button type="button" class="ld-btn" data-close>Close</button>
    </div>
    <div class="ld-dlg-body">
      <div class="ld-field">
        <label for="ld-badge-text">Badge label</label>
        <input id="ld-badge-text" type="text" maxlength="60" />
      </div>
      <div class="ld-field">
        <label>Badge style</label>
        <div class="ld-badge-swatches" id="ld-badge-swatches"></div>
      </div>
    </div>
    <div class="ld-dlg-foot">
      <button type="button" class="ld-btn ld-btn-danger" id="ld-badge-delete">Remove badge</button>
      <button type="button" class="ld-btn" data-close>Cancel</button>
      <button type="button" class="ld-btn ld-btn-primary" id="ld-badge-apply">Apply</button>
    </div>
  `;

  const linkDialog = makeEl("dialog", {
    id: "ld-link-dialog",
    class: "ld-dialog is-compact",
    closedby: "any",
    "aria-labelledby": "ld-link-title",
    "data-editor-ui": "1",
  });
  linkDialog.innerHTML = `
    <div class="ld-dlg-head">
      <h2 id="ld-link-title">Edit link</h2>
      <button type="button" class="ld-btn" data-close>Close</button>
    </div>
    <div class="ld-dlg-body">
      <div class="ld-field">
        <label for="ld-link-text">Link text</label>
        <input id="ld-link-text" type="text" />
      </div>
      <div class="ld-field">
        <label for="ld-link-href">URL or anchor (e.g. https://... or #goals)</label>
        <input id="ld-link-href" type="text" />
      </div>
    </div>
    <div class="ld-dlg-foot">
      <button type="button" class="ld-btn" id="ld-link-open">Open link</button>
      <button type="button" class="ld-btn ld-btn-danger" id="ld-link-unlink">Unlink</button>
      <button type="button" class="ld-btn ld-btn-primary" id="ld-link-apply">Apply</button>
    </div>
  `;

  const conflictDialog = makeEl("dialog", {
    id: "ld-conflict-dialog",
    class: "ld-dialog is-compact",
    "aria-labelledby": "ld-conflict-title",
    "data-editor-ui": "1",
  });
  conflictDialog.innerHTML = `
    <div class="ld-dlg-head">
      <h2 id="ld-conflict-title">Newer update detected</h2>
    </div>
    <div class="ld-dlg-body" id="ld-conflict-body"></div>
    <div class="ld-dlg-foot">
      <button type="button" class="ld-btn" id="ld-conflict-reload">Reload latest version</button>
      <button type="button" class="ld-btn ld-btn-danger" id="ld-conflict-force">Overwrite with mine</button>
    </div>
  `;

  document.body.prepend(barWrap);
  document.body.append(srStatus, toast, historyDialog, badgeDialog, linkDialog, conflictDialog);

  installToolbarRovingFallback(toolbar);
  [historyDialog, badgeDialog, linkDialog].forEach((d) => {
    installDialogLightDismissFallback(d);
    d.querySelectorAll("[data-close]").forEach((btn) => {
      btn.addEventListener("click", () => d.close());
    });
  });

  // Populate badge swatches
  const swatchesWrap = badgeDialog.querySelector("#ld-badge-swatches");
  let selectedBadgeClass = "b-active";
  BADGE_VARIANTS.forEach((variant) => {
    const sw = makeEl(
      "button",
      { type: "button", class: `ld-swatch-btn badge ${variant.cls}`, "aria-pressed": "false", "data-cls": variant.cls },
      variant.label,
    );
    sw.addEventListener("click", () => {
      selectedBadgeClass = variant.cls;
      swatchesWrap.querySelectorAll("button").forEach((b) => {
        b.setAttribute("aria-pressed", b === sw ? "true" : "false");
      });
    });
    swatchesWrap.append(sw);
  });

  let toastTimer = null;
  function notify(message, isError = false) {
    srStatus.textContent = message;
    toast.textContent = message;
    toast.classList.toggle("is-error", isError);
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.hidden = true;
    }, 3600);
  }

  function refreshBarUI() {
    pill.classList.toggle("is-dirty", state.dirty);
    if (state.dirty) {
      pillLabel.textContent = "Unsaved edits";
    } else if (state.version > 0) {
      pillLabel.textContent = `Live · v${state.version}`;
    } else {
      pillLabel.textContent = "Baseline";
    }

    if (state.updatedAt) {
      const who = state.updatedBy || "Partner";
      metaText.textContent = `Last saved by ${who} · ${formatShortStamp(state.updatedAt)}`;
    } else {
      metaText.textContent = "Not yet edited online";
    }

    authorBtn.textContent = `Editing as: ${state.author}`;
    editToggleBtn.setAttribute("aria-pressed", state.editing ? "true" : "false");
    editToggleBtn.textContent = state.editing ? "Done editing" : "Edit doc";

    saveBtn.setAttribute("aria-disabled", state.dirty && !state.saving ? "false" : "true");
    saveBtn.textContent = state.saving ? "Saving…" : "Save";
    discardBtn.setAttribute("aria-disabled", state.dirty && !state.saving ? "false" : "true");

    saveDrawer.hidden = !(state.editing && state.dirty);
    document.body.classList.toggle("ld-editing", state.editing);
  }

  function markDirty() {
    if (!state.dirty) {
      state.dirty = true;
      refreshBarUI();
    }
  }

  // ---------- Editor instrumentation inside #living-doc-root ----------
  function stripEditorUi(root) {
    root.querySelectorAll("[data-editor-ui]").forEach((el) => el.remove());
    root.querySelectorAll("[contenteditable]").forEach((el) => el.removeAttribute("contenteditable"));
  }

  function serializeCleanHtml() {
    const clone = docRoot.cloneNode(true);
    stripEditorUi(clone);
    return clone.innerHTML.trim();
  }

  function updateDocumentTimestampsForSave() {
    const stamp = formatCentralStamp(new Date());
    if (DOC_ID === "business-goals") {
      const checkedEl = docRoot.querySelector("header .checked");
      if (checkedEl) {
        checkedEl.replaceChildren(
          document.createTextNode("Last updated: "),
          makeEl("b", {}, stamp),
          document.createTextNode(` · by ${state.author}`),
        );
      }
      const updateMute = docRoot.querySelector("#update > p.muted");
      if (updateMute) {
        updateMute.replaceChildren(
          document.createTextNode("Last updated "),
          makeEl("b", {}, stamp),
          document.createTextNode(` (by ${state.author}). Detail for everything below is in the sections underneath — this is the short version.`),
        );
      }
    } else if (DOC_ID === "alley21-brochure") {
      const footer = docRoot.querySelector("footer p");
      if (footer) {
        let span = footer.querySelector("#brochure-updated");
        if (!span) {
          footer.append(document.createElement("br"));
          span = makeEl("span", { id: "brochure-updated" });
          footer.append(span);
        }
        span.textContent = `Last edited online: ${stamp} by ${state.author}.`;
      }
    }
  }

  const EDITABLE_SELECTOR = [
    ".kicker", "h1", ".tagline", ".lede", ".draft-banner",
    ".fact dt", ".fact dd",
    "section h2", "section h3",
    "section p:not(.checked)",
    "section li", "section dt", "section dd",
    "section td:not([data-editor-ui])", "section th:not([data-editor-ui])", "section caption",
    ".principle .lbl", ".callout .lbl", ".update-card .lbl",
    ".review-note p", "footer p",
  ].join(",");

  function applyEditableAttributes() {
    stripEditorUi(docRoot);
    if (!state.editing) {
      hydrateTableCellLabels(docRoot);
      return;
    }

    docRoot.querySelectorAll(EDITABLE_SELECTOR).forEach((el) => {
      if (el.closest("[data-editor-ui]") || el.classList.contains("checked")) return;
      el.setAttribute("contenteditable", "true");
    });

    // 1. Checklists (ul.checks)
    docRoot.querySelectorAll("ul.checks").forEach((ul) => {
      ul.querySelectorAll(":scope > li").forEach((li) => attachCheckItemControls(li));
      const addStep = makeEl("button", { type: "button", class: "ld-add-btn", "data-editor-ui": "1" }, "+ Add step");
      addStep.addEventListener("click", () => {
        const li = document.createElement("li");
        li.innerHTML = `<b>New step:</b> describe the action. <span class="why">Why it matters or status note.</span>`;
        ul.append(li);
        li.setAttribute("contenteditable", "true");
        attachCheckItemControls(li);
        markDirty();
        li.focus();
      });
      ul.after(addStep);
    });

    // 2. Update cards (.update-card)
    docRoot.querySelectorAll(".update-card").forEach((card) => {
      const ul = card.querySelector("ul");
      if (!ul) return;
      ul.querySelectorAll(":scope > li").forEach((li) => attachListDeleteBtn(li));
      const addBtn = makeEl("button", { type: "button", class: "ld-add-btn", "data-editor-ui": "1" }, "+ Add item");
      addBtn.addEventListener("click", () => {
        const li = document.createElement("li");
        li.innerHTML = `<b>New item</b> — update details here.`;
        ul.append(li);
        li.setAttribute("contenteditable", "true");
        attachListDeleteBtn(li);
        markDirty();
        li.focus();
      });
      ul.after(addBtn);
    });

    // 3. Principles ordered list (brochure)
    docRoot.querySelectorAll("ol.principles").forEach((ol) => {
      ol.querySelectorAll(":scope > li").forEach((li) => attachListDeleteBtn(li));
      const addBtn = makeEl("button", { type: "button", class: "ld-add-btn", "data-editor-ui": "1" }, "+ Add principle");
      addBtn.addEventListener("click", () => {
        const li = document.createElement("li");
        li.textContent = "New operating principle.";
        ol.append(li);
        li.setAttribute("contenteditable", "true");
        attachListDeleteBtn(li);
        markDirty();
        li.focus();
      });
      ol.after(addBtn);
    });

    // 4. Badges (.badges)
    docRoot.querySelectorAll(".badges").forEach((wrap) => {
      const addBadgeBtn = makeEl("button", { type: "button", class: "ld-add-badge-btn", "data-editor-ui": "1" }, "+ Badge");
      addBadgeBtn.addEventListener("click", () => {
        const badge = makeEl("span", { class: "badge b-info" }, "New status");
        wrap.insertBefore(badge, addBadgeBtn);
        markDirty();
        openBadgeEditor(badge);
      });
      wrap.append(addBadgeBtn);
    });

    // 5. Tables (.tblwrap)
    docRoot.querySelectorAll(".tblwrap table").forEach((table) => {
      const headRow = table.querySelector("thead tr");
      const tbody = table.querySelector("tbody");
      if (!tbody) return;
      const colCount = headRow ? headRow.children.length : (tbody.rows[0]?.cells.length || 2);
      if (headRow) {
        const actTh = makeEl("th", { "data-editor-ui": "1", "aria-label": "Row actions" });
        headRow.append(actTh);
      }
      Array.from(tbody.rows).forEach((tr) => attachTableRowDelete(tr));

      const isDecisions = Boolean(table.closest("#decisions"));
      const addRowBtn = makeEl(
        "button",
        { type: "button", class: "ld-add-btn", "data-editor-ui": "1" },
        isDecisions ? "+ Add decision" : "+ Add row",
      );
      addRowBtn.addEventListener("click", () => {
        const tr = document.createElement("tr");
        for (let i = 0; i < colCount; i++) {
          const td = document.createElement("td");
          if (isDecisions && i === 0) {
            td.className = "mono";
            td.textContent = todayIsoCentral();
          } else if (isDecisions && i === 1) {
            td.innerHTML = "<b>Decision summary.</b> Details here.";
          } else {
            td.textContent = i === 0 ? "New entry" : "Details";
          }
          td.setAttribute("contenteditable", "true");
          tr.append(td);
        }
        if (isDecisions && tbody.firstChild) {
          tbody.insertBefore(tr, tbody.firstChild);
        } else {
          tbody.append(tr);
        }
        attachTableRowDelete(tr);
        hydrateTableCellLabels(docRoot);
        markDirty();
        const focusCell = isDecisions ? tr.cells[1] : tr.cells[0];
        focusCell?.focus();
      });
      table.closest(".tblwrap").after(addRowBtn);
    });

    // 6. Goal cards, service cards, record cards
    docRoot.querySelectorAll(".goal, .record, .grid > .card").forEach((card) => {
      attachCardRemoveControl(card);
    });

    docRoot.querySelectorAll(".goals").forEach((grid) => {
      const addGoalBtn = makeEl("button", { type: "button", class: "ld-add-btn", "data-editor-ui": "1" }, "+ Add goal card");
      addGoalBtn.addEventListener("click", () => {
        const article = makeEl("article", { class: "goal" });
        article.innerHTML = `
          <div class="badges"><span class="badge b-info">Developing</span></div>
          <h3>New goal</h3>
          <p>Describe the goal and scope here.</p>
          <p class="next"><b>Next step:</b> add the immediate milestone.</p>
        `;
        grid.append(article);
        markDirty();
        applyEditableAttributes();
        article.querySelector("h3")?.focus();
      });
      grid.after(addGoalBtn);
    });

    docRoot.querySelectorAll(".grid").forEach((grid) => {
      const addCardBtn = makeEl("button", { type: "button", class: "ld-add-btn", "data-editor-ui": "1" }, "+ Add service card");
      addCardBtn.addEventListener("click", () => {
        const card = makeEl("div", { class: "card" });
        card.innerHTML = `
          <h3>New service</h3>
          <p>Describe what Alley 21 offers here.</p>
        `;
        grid.append(card);
        markDirty();
        applyEditableAttributes();
        card.querySelector("h3")?.focus();
      });
      grid.after(addCardBtn);
    });

    // 7. Brochure draft banner & reviewer note quick remove
    docRoot.querySelectorAll(".draft-banner, .review-note").forEach((box) => {
      const barRow = makeEl("div", { class: "ld-card-actions", "data-editor-ui": "1" });
      const del = makeEl("button", { type: "button", class: "ld-mini-btn is-del" }, "Remove block");
      del.addEventListener("click", () => {
        if (!confirm("Remove this banner/note block from the document?")) return;
        box.remove();
        markDirty();
      });
      barRow.append(del);
      box.prepend(barRow);
    });

    hydrateTableCellLabels(docRoot);
  }

  function attachCheckItemControls(li) {
    const checkBtn = makeEl("button", {
      type: "button",
      class: "ld-check-btn",
      contenteditable: "false",
      "data-editor-ui": "1",
      "aria-label": li.classList.contains("done") ? "Mark step incomplete" : "Mark step complete",
      "aria-pressed": li.classList.contains("done") ? "true" : "false",
      title: "Toggle completed",
    });
    checkBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const done = li.classList.toggle("done");
      checkBtn.setAttribute("aria-pressed", done ? "true" : "false");
      checkBtn.setAttribute("aria-label", done ? "Mark step incomplete" : "Mark step complete");
      markDirty();
    });

    const delBtn = makeEl("button", {
      type: "button",
      class: "ld-mini-btn is-del ld-row-del",
      contenteditable: "false",
      "data-editor-ui": "1",
      "aria-label": "Remove step",
      title: "Remove step",
    }, "×");
    delBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      li.remove();
      markDirty();
    });

    li.prepend(checkBtn);
    li.append(delBtn);
  }

  function attachListDeleteBtn(li) {
    const delBtn = makeEl("button", {
      type: "button",
      class: "ld-mini-btn is-del ld-row-del",
      contenteditable: "false",
      "data-editor-ui": "1",
      "aria-label": "Remove item",
      title: "Remove item",
    }, "×");
    delBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      li.remove();
      markDirty();
    });
    li.append(delBtn);
  }

  function attachTableRowDelete(tr) {
    const td = makeEl("td", { class: "ld-td-actions", "data-editor-ui": "1" });
    const delBtn = makeEl("button", {
      type: "button",
      class: "ld-mini-btn is-del",
      "aria-label": "Remove row",
      title: "Remove row",
    }, "×");
    delBtn.addEventListener("click", () => {
      tr.remove();
      markDirty();
    });
    td.append(delBtn);
    tr.append(td);
  }

  function attachCardRemoveControl(card) {
    const actions = makeEl("div", { class: "ld-card-actions", "data-editor-ui": "1" });
    const delBtn = makeEl("button", {
      type: "button",
      class: "ld-mini-btn is-del",
      title: "Remove card",
    }, "Remove card");
    delBtn.addEventListener("click", () => {
      const heading = card.querySelector("h3")?.textContent?.trim() || "this card";
      if (!confirm(`Remove "${heading}"?`)) return;
      card.remove();
      markDirty();
    });
    actions.append(delBtn);
    card.prepend(actions);
  }

  function openBadgeEditor(badge) {
    state.activeBadge = badge;
    const input = badgeDialog.querySelector("#ld-badge-text");
    input.value = badge.textContent.trim();
    selectedBadgeClass =
      BADGE_VARIANTS.find((v) => badge.classList.contains(v.cls))?.cls || "b-plain";
    swatchesWrap.querySelectorAll("button").forEach((b) => {
      b.setAttribute("aria-pressed", b.dataset.cls === selectedBadgeClass ? "true" : "false");
    });
    badgeDialog.showModal();
    input.focus();
    input.select();
  }

  badgeDialog.querySelector("#ld-badge-apply").addEventListener("click", () => {
    if (!state.activeBadge) return;
    const text = badgeDialog.querySelector("#ld-badge-text").value.trim();
    if (text) state.activeBadge.textContent = text;
    BADGE_VARIANTS.forEach((v) => state.activeBadge.classList.remove(v.cls));
    state.activeBadge.classList.add(selectedBadgeClass);
    markDirty();
    badgeDialog.close();
  });

  badgeDialog.querySelector("#ld-badge-delete").addEventListener("click", () => {
    if (!state.activeBadge) return;
    state.activeBadge.remove();
    markDirty();
    badgeDialog.close();
  });

  function openLinkEditor(anchor) {
    state.activeLink = anchor;
    linkDialog.querySelector("#ld-link-text").value = anchor.textContent;
    linkDialog.querySelector("#ld-link-href").value = anchor.getAttribute("href") || "";
    linkDialog.showModal();
    linkDialog.querySelector("#ld-link-href").focus();
  }

  linkDialog.querySelector("#ld-link-apply").addEventListener("click", () => {
    if (!state.activeLink) return;
    const text = linkDialog.querySelector("#ld-link-text").value.trim();
    const href = linkDialog.querySelector("#ld-link-href").value.trim();
    if (text) state.activeLink.textContent = text;
    if (href) state.activeLink.setAttribute("href", href);
    markDirty();
    linkDialog.close();
  });

  linkDialog.querySelector("#ld-link-open").addEventListener("click", () => {
    const href = linkDialog.querySelector("#ld-link-href").value.trim();
    if (href) window.open(href, "_blank", "noopener,noreferrer");
  });

  linkDialog.querySelector("#ld-link-unlink").addEventListener("click", () => {
    if (!state.activeLink) return;
    const textNode = document.createTextNode(state.activeLink.textContent);
    state.activeLink.replaceWith(textNode);
    markDirty();
    linkDialog.close();
  });

  // Delegate clicks & input inside #living-doc-root
  docRoot.addEventListener("input", (e) => {
    if (!state.editing) return;
    if (e.target.closest("[data-editor-ui]")) return;
    markDirty();
  });

  docRoot.addEventListener("click", (e) => {
    if (!state.editing) return;
    if (e.target.closest("[data-editor-ui]")) return;
    const badge = e.target.closest(".badge");
    if (badge) {
      e.preventDefault();
      openBadgeEditor(badge);
      return;
    }
    const anchor = e.target.closest("a");
    if (anchor) {
      e.preventDefault();
      openLinkEditor(anchor);
    }
  });

  // ---------- Cloud Load / Save / History ----------
  async function applySnapshot(snapshot) {
    state.version = snapshot.version ?? 0;
    state.updatedAt = snapshot.updatedAt ?? null;
    state.updatedBy = snapshot.updatedBy ?? null;
    state.summary = snapshot.summary ?? "";

    if (snapshot.html) {
      await safeSetHTML(docRoot, snapshot.html);
    } else {
      await safeSetHTML(docRoot, baselineHtml);
    }
    state.dirty = false;
    applyEditableAttributes();
    refreshBarUI();
  }

  async function loadFromCloud({ silent = false } = {}) {
    try {
      const res = await fetch(`${API_URL}?doc=${encodeURIComponent(DOC_ID)}`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      await applySnapshot(data);
    } catch (err) {
      console.error("[living-doc] load failed", err);
      pillLabel.textContent = "Baseline (offline)";
      if (!silent) notify("Could not reach cloud storage — showing repository baseline.", true);
    }
  }

  async function saveToCloud({ force = false } = {}) {
    if (!state.dirty || state.saving) return;
    state.saving = true;
    refreshBarUI();

    try {
      updateDocumentTimestampsForSave();
      const html = serializeCleanHtml();
      const summary = summaryInput.value.trim();

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "save",
          doc: DOC_ID,
          html,
          expectedVersion: state.version,
          updatedBy: state.author,
          summary,
          force,
        }),
      });

      const data = await res.json();
      if (res.status === 409) {
        state.saving = false;
        refreshBarUI();
        openConflictModal(data.current);
        return;
      }
      if (!res.ok) {
        throw new Error(data.error || `HTTP ${res.status}`);
      }

      summaryInput.value = "";
      await applySnapshot(data);
      notify(`Saved v${data.version} as ${data.updatedBy}.`);
    } catch (err) {
      console.error("[living-doc] save failed", err);
      notify(err instanceof Error ? err.message : "Save failed.", true);
    } finally {
      state.saving = false;
      refreshBarUI();
    }
  }

  function openConflictModal(current) {
    state.pendingConflict = current;
    const body = conflictDialog.querySelector("#ld-conflict-body");
    const who = current?.updatedBy ?? "your partner";
    const when = formatShortStamp(current?.updatedAt);
    const p1 = document.createElement("p");
    p1.append(
      makeEl("b", {}, who),
      document.createTextNode(" saved version "),
      makeEl("b", {}, `v${current?.version ?? "?"}`),
      document.createTextNode(` (${when}) while you were editing.`),
    );
    const p2 = makeEl(
      "p",
      {},
      "You can reload their latest version (discarding your unsaved edits) or overwrite with your edits (their version stays recoverable in History).",
    );
    body.replaceChildren(p1, p2);
    conflictDialog.showModal();
  }

  conflictDialog.querySelector("#ld-conflict-reload").addEventListener("click", async () => {
    if (state.pendingConflict) {
      await applySnapshot(state.pendingConflict);
      notify("Loaded latest version.");
    } else {
      await loadFromCloud();
    }
    conflictDialog.close();
  });

  conflictDialog.querySelector("#ld-conflict-force").addEventListener("click", async () => {
    conflictDialog.close();
    await saveToCloud({ force: true });
  });

  async function openHistoryModal() {
    const body = historyDialog.querySelector("#ld-history-body");
    body.textContent = "Loading history…";
    historyDialog.showModal();
    try {
      const res = await fetch(`${API_URL}?doc=${encodeURIComponent(DOC_ID)}&history=1`, {
        cache: "no-store",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
      const entries = data.entries || [];
      if (!entries.length) {
        body.innerHTML = "<p>No cloud revisions saved yet. Edit and save to create v1.</p>";
        return;
      }

      const list = makeEl("ul", { class: "ld-history-list" });
      entries.forEach((entry) => {
        const item = makeEl("li", { class: "ld-history-item" });
        const meta = makeEl("div", { class: "ld-history-meta" });
        const isCurrent = entry.version === state.version;
        meta.append(makeEl("b", {}, `v${entry.version}`));
        if (isCurrent) {
          meta.append(document.createTextNode(" "), makeEl("span", { class: "badge b-active" }, "Current"));
        }
        meta.append(
          document.createTextNode(` · ${entry.updatedBy || "Partner"} · ${formatShortStamp(entry.updatedAt)}`),
        );
        if (entry.summary) {
          meta.append(makeEl("div", {}, entry.summary));
        }
        const actions = makeEl("div", { class: "ld-group" });
        if (!isCurrent) {
          const restoreBtn = makeEl("button", { type: "button", class: "ld-btn" }, "Restore");
          restoreBtn.addEventListener("click", async () => {
            if (!confirm(`Restore version v${entry.version} as a new revision?`)) return;
            await restoreVersion(entry.version);
          });
          actions.append(restoreBtn);
        }
        item.append(meta, actions);
        list.append(item);
      });
      body.replaceChildren(list);
    } catch (err) {
      body.textContent = err instanceof Error ? err.message : "Could not load history.";
    }
  }

  async function restoreVersion(targetVersion) {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "restore",
          doc: DOC_ID,
          targetVersion,
          expectedVersion: state.version,
          updatedBy: state.author,
          force: true,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
      await applySnapshot(data);
      historyDialog.close();
      notify(`Restored v${targetVersion} as v${data.version}.`);
    } catch (err) {
      notify(err instanceof Error ? err.message : "Restore failed.", true);
    }
  }

  historyDialog.querySelector("#ld-reset-baseline-btn").addEventListener("click", async () => {
    if (!confirm("Reset this live page back to the repository baseline? (Previous edits remain in History.)")) {
      return;
    }
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "reset",
          doc: DOC_ID,
          expectedVersion: state.version,
          updatedBy: state.author,
          force: true,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
      await applySnapshot(data);
      historyDialog.close();
      notify("Reset to repository baseline.");
    } catch (err) {
      notify(err instanceof Error ? err.message : "Reset failed.", true);
    }
  });

  function downloadStandaloneHtml() {
    const cleanBody = serializeCleanHtml();
    const styles = Array.from(document.head.querySelectorAll("style"))
      .map((s) => s.outerHTML)
      .join("\n");
    const fontLinks = Array.from(document.head.querySelectorAll('link[href*="fonts.googleapis"], link[href*="fonts.gstatic"]'))
      .map((l) => l.outerHTML)
      .join("\n");
    const title = document.title;
    const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<meta name="color-scheme" content="light dark" />
<link rel="icon" href="data:," />
<title>${title}</title>
${fontLinks}
${styles}
</head>
<body>
<div class="wrap">
${cleanBody}
</div>
</body>
</html>`;
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = makeEl("a", { href: url, download: `${DOC_ID}.html` });
    document.body.append(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    notify(`Downloaded ${DOC_ID}.html`);
  }

  // ---------- Toolbar bindings ----------
  authorBtn.addEventListener("click", () => {
    const next = state.author === "Dan" ? "Stephanie" : "Dan";
    state.author = next;
    setStoredAuthor(next);
    refreshBarUI();
    notify(`Editing as ${next}`);
  });

  editToggleBtn.addEventListener("click", () => {
    state.editing = !state.editing;
    applyEditableAttributes();
    refreshBarUI();
    notify(state.editing ? "Edit mode on — click any text, badge, or table to edit." : "View mode");
  });

  saveBtn.addEventListener("click", () => {
    if (saveBtn.getAttribute("aria-disabled") === "true") return;
    saveToCloud();
  });

  drawerSaveBtn.addEventListener("click", () => saveToCloud());

  discardBtn.addEventListener("click", async () => {
    if (discardBtn.getAttribute("aria-disabled") === "true") return;
    if (!confirm("Discard unsaved edits and reload the last saved version?")) return;
    await loadFromCloud();
    notify("Unsaved edits discarded.");
  });

  historyBtn.addEventListener("click", () => openHistoryModal());
  downloadBtn.addEventListener("click", () => downloadStandaloneHtml());
  printBtn.addEventListener("click", () => window.print());

  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
      if (state.editing && state.dirty) {
        e.preventDefault();
        saveToCloud();
      }
    }
  });

  window.addEventListener("beforeunload", (e) => {
    if (state.dirty) {
      e.preventDefault();
      e.returnValue = "";
    }
  });

  // Sync gently when returning to a non-dirty tab so partner edits show up automatically
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible" && !state.dirty && !state.saving) {
      loadFromCloud({ silent: true });
    }
  });

  refreshBarUI();
  loadFromCloud({ silent: true });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
