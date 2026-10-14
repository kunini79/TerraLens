const STORAGE_KEYS = {
  records: "terralens.records.v1",
  assays: "terralens.assays.v1",
};

const seedRecords = [
  { id: "TL-R-001", name: "Pegmatite field observation", mineral: "Lithium", site: "Nasarawa pilot area", track: "Corporate", grade: "Screening-grade", source: "Illustrative field note", access: "Open", date: "2026-09-18" },
  { id: "TL-R-002", name: "Legacy map index", mineral: "Tin, columbite", site: "Jos Plateau example", track: "Corporate", grade: "Screening-grade", source: "Illustrative legacy record", access: "Licensed", date: "2026-09-12" },
  { id: "TL-R-003", name: "Cooperative sample batch", mineral: "Tin", site: "Cooperative-controlled area", track: "Cooperative", grade: "Screening-grade", source: "Illustrative sample record", access: "Cooperative-owned", shared: false, date: "2026-09-10" },
  { id: "TL-R-004", name: "Lab-checked reference sample", mineral: "Niobium", site: "Nasarawa pilot area", track: "Corporate", grade: "Reportable-grade", source: "Illustrative lab check", access: "Licensed", date: "2026-09-03" },
];

const seedAssays = [
  { sampleId: "DEMO-001", mineral: "Tin", method: "XRF", result: "Illustrative screening reading", grade: "Screening-grade", date: "2026-09-18" },
  { sampleId: "DEMO-002", mineral: "Lithium", method: "LIBS", result: "Illustrative — confirm with lab", grade: "Screening-grade", date: "2026-09-15" },
];

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const clone = (value) => JSON.parse(JSON.stringify(value));

function loadCollection(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return clone(fallback);
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) throw new Error("Stored data is not a list.");
    return parsed;
  } catch (error) {
    console.error(`Unable to load ${key} from local storage.`, error);
    showToast("Could not load saved data. Refresh to retry.");
    return clone(fallback);
  }
}

let records = loadCollection(STORAGE_KEYS.records, seedRecords);
let assays = loadCollection(STORAGE_KEYS.assays, seedAssays);
let toastTimer;

function persistCollection(key, collection) {
  try {
    localStorage.setItem(key, JSON.stringify(collection));
    return true;
  } catch (error) {
    console.error(`Unable to save ${key} to local storage.`, error);
    showToast("Save failed. Check browser storage and try again.");
    return false;
  }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character]);
}

function formatDate(value) {
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? "—" : new Intl.DateTimeFormat("en", { day: "numeric", month: "short", year: "numeric" }).format(date);
}

function showToast(message) {
  const toast = $("#toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.remove("hidden");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.add("hidden"), 3200);
}

function gradeBadge(grade) {
  const style = grade === "Reportable-grade" ? "reportable" : "screening";
  return `<span class="grade-tag ${style}">${escapeHtml(grade)}</span>`;
}

function accessBadge(record) {
  if (record.track === "Cooperative") {
    return record.shared
      ? '<span class="access-tag">Shared by consent</span>'
      : '<span class="access-tag private">Owner-only</span>';
  }
  return `<span class="access-tag">${escapeHtml(record.access || "Licensed")}</span>`;
}

function renderRecord(record, compact = false) {
  return `<div class="record-row">
    <span class="record-symbol">▤</span>
    <span class="record-primary"><strong>${escapeHtml(record.name)}</strong><small>${escapeHtml(record.source)} · ${formatDate(record.date)}</small></span>
    ${compact ? gradeBadge(record.grade) : ""}
  </div>`;
}

function renderTableRecord(record) {
  const trackClass = record.track === "Cooperative" ? "cooperative" : "";
  return `<tr>
    <td><span class="table-title">${escapeHtml(record.name)}</span><span class="table-subtitle">${escapeHtml(record.id)}</span></td>
    <td><span class="table-title">${escapeHtml(record.mineral)}</span><span class="table-subtitle">${escapeHtml(record.site)}</span></td>
    <td><span class="track-tag ${trackClass}">${escapeHtml(record.track)}</span></td>
    <td>${gradeBadge(record.grade)}</td>
    <td>${accessBadge(record)}</td>
    <td>${formatDate(record.date)}</td>
  </tr>`;
}

function renderAssay(assay) {
  return `<tr>
    <td><span class="table-title">${escapeHtml(assay.sampleId)}</span></td>
    <td>${escapeHtml(assay.mineral)}</td>
    <td>${escapeHtml(assay.method)}</td>
    <td>${escapeHtml(assay.result)}</td>
    <td>${gradeBadge(assay.grade)}${assay.qaQc ? '<span class="table-subtitle">QA/QC documented</span>' : ""}</td>
    <td>${formatDate(assay.date)}</td>
  </tr>`;
}

function renderCooperativeRecord(record) {
  const label = record.shared ? "Sharing on" : "Share record";
  const state = record.shared ? "shared" : "";
  return `<div class="cooperative-record">
    <span class="record-symbol">♧</span>
    <span class="record-primary"><strong>${escapeHtml(record.name)}</strong><small>${escapeHtml(record.mineral)} · ${escapeHtml(record.site)} · ${escapeHtml(record.grade)}</small></span>
    <button class="share-button ${state}" data-share-id="${escapeHtml(record.id)}" aria-pressed="${Boolean(record.shared)}">${label}</button>
  </div>`;
}

function render() {
  const query = ($("#record-search")?.value || "").trim().toLocaleLowerCase();
  const grade = $("#grade-filter")?.value || "all";
  const track = $("#track-filter")?.value || "all";
  const filtered = records.filter((record) => {
    const searchText = [record.id, record.name, record.mineral, record.site, record.source].join(" ").toLocaleLowerCase();
    return (!query || searchText.includes(query)) && (grade === "all" || record.grade === grade) && (track === "all" || record.track === track);
  });
  const cooperativeRecords = records.filter((record) => record.track === "Cooperative");

  $("#stat-records").textContent = records.length;
  $("#stat-reportable").textContent = records.filter((record) => record.grade === "Reportable-grade").length;
  $("#stat-cooperative").textContent = cooperativeRecords.length;
  $("#stat-assays").textContent = assays.length;
  $("#nav-record-count").textContent = records.length;
  $("#recent-records").innerHTML = records.slice(0, 4).map((record) => renderRecord(record, true)).join("");
  $("#record-table").innerHTML = filtered.map(renderTableRecord).join("");
  $("#records-empty").classList.toggle("hidden", filtered.length > 0);
  $("#assay-table").innerHTML = assays.map(renderAssay).join("");
  $("#assays-empty").classList.toggle("hidden", assays.length > 0);
  $("#cooperative-records").innerHTML = cooperativeRecords.map(renderCooperativeRecord).join("");
  $("#cooperative-empty").classList.toggle("hidden", cooperativeRecords.length > 0);
  $("#cooperative-count").textContent = `${cooperativeRecords.length} ${cooperativeRecords.length === 1 ? "record" : "records"}`;
}

function navigate(viewName) {
  $$(".view").forEach((view) => view.classList.toggle("active", view.id === `view-${viewName}`));
  $$(".nav-item").forEach((item) => item.classList.toggle("active", item.dataset.view === viewName));
  const current = $(`.nav-item[data-view="${viewName}"]`);
  $("#breadcrumb-current").textContent = current?.textContent.trim().replace(/\s+\d+$/, "") || "Overview";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openDialog(dialogId, formId, errorId) {
  const dialog = $(`#${dialogId}`);
  const form = $(`#${formId}`);
  form.reset();
  $(`#${errorId}`).classList.add("hidden");
  if (dialogId === "assay-dialog") updateQaChecklist();
  if (dialogId === "record-dialog") updateRecordOptions();
  dialog.showModal();
}

function closeDialogs() {
  $$("dialog").forEach((dialog) => dialog.close());
}

function updateQaChecklist() {
  const form = $("#assay-form");
  const reportable = form.elements.grade.value === "Reportable-grade";
  $("#qa-checklist").classList.toggle("hidden", !reportable);
}

function updateRecordOptions() {
  const form = $("#record-form");
  const cooperative = form.elements.track.value === "Cooperative";
  $("#corporate-access-option").classList.toggle("hidden", cooperative);
  $("#cooperative-consent-option").classList.toggle("hidden", !cooperative);
  $("#record-qa-checklist").classList.toggle("hidden", form.elements.grade.value !== "Reportable-grade");
}

function handleRecordSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const track = data.get("track");
  const grade = data.get("grade");
  const error = $("#record-error");
  if (grade === "Reportable-grade" && (!data.has("crm") || !data.has("duplicate") || !data.has("blank") || !data.has("lab"))) {
    error.textContent = "Reportable-grade requires CRM, duplicate, blank, accredited lab checks, and chain-of-custody confirmation.";
    error.classList.remove("hidden");
    return;
  }
  const shared = track === "Cooperative" && data.has("share");
  const record = {
    id: `TL-R-${String(Date.now()).slice(-6)}`,
    name: data.get("name").trim(),
    mineral: data.get("mineral").trim(),
    site: data.get("site").trim(),
    track,
    grade,
    source: data.get("source").trim(),
    access: track === "Cooperative" ? "Cooperative-owned" : data.get("access"),
    shared,
    qaQc: grade === "Reportable-grade" ? { crm: true, duplicate: true, blank: true, accreditedLabCheck: true, chainOfCustody: true } : undefined,
    date: new Date().toISOString().slice(0, 10),
  };
  const next = [record, ...records];
  if (!persistCollection(STORAGE_KEYS.records, next)) return;
  records = next;
  render();
  closeDialogs();
  showToast("Field record saved in this browser.");
}

function handleAssaySubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const mineral = data.get("mineral").trim();
  const method = data.get("method");
  const grade = data.get("grade");
  const error = $("#assay-error");
  const lithium = /lithium|\bli\b/i.test(mineral);
  if (lithium && method === "XRF") {
    error.textContent = "XRF cannot measure lithium. Select LIBS or an accredited laboratory.";
    error.classList.remove("hidden");
    return;
  }
  if (grade === "Reportable-grade" && (!data.has("crm") || !data.has("duplicate") || !data.has("blank") || !data.has("lab"))) {
    error.textContent = "Reportable-grade requires CRM, duplicate, blank, accredited lab check, and chain-of-custody confirmation.";
    error.classList.remove("hidden");
    return;
  }
  const assay = {
    sampleId: data.get("sampleId").trim(),
    mineral,
    method,
    result: data.get("result").trim(),
    grade,
    qaQc: grade === "Reportable-grade" ? { crm: true, duplicate: true, blank: true, accreditedLabCheck: true, chainOfCustody: true } : undefined,
    date: new Date().toISOString().slice(0, 10),
  };
  if (assays.some((item) => item.sampleId.toLocaleLowerCase() === assay.sampleId.toLocaleLowerCase())) {
    error.textContent = "That sample ID is already in the assay log. Use a unique ID.";
    error.classList.remove("hidden");
    return;
  }
  const next = [assay, ...assays];
  if (!persistCollection(STORAGE_KEYS.assays, next)) return;
  assays = next;
  render();
  closeDialogs();
  showToast("Sample saved in this browser.");
}

function toggleSharing(recordId) {
  const record = records.find((item) => item.id === recordId && item.track === "Cooperative");
  if (!record) {
    showToast("Could not update consent for this record.");
    return;
  }
  const next = records.map((item) => item.id === recordId ? { ...item, shared: !item.shared } : item);
  if (!persistCollection(STORAGE_KEYS.records, next)) return;
  records = next;
  render();
  showToast(record.shared ? "Sharing stopped. This record is owner-only." : "Sharing enabled by cooperative consent.");
}

document.addEventListener("click", (event) => {
  const nav = event.target.closest("[data-view]");
  if (nav) navigate(nav.dataset.view);

  const destination = event.target.closest("[data-navigate]");
  if (destination) navigate(destination.dataset.navigate);

  const shareButton = event.target.closest("[data-share-id]");
  if (shareButton) toggleSharing(shareButton.dataset.shareId);

  const action = event.target.closest("[data-action]")?.dataset.action;
  if (action === "new-record") openDialog("record-dialog", "record-form", "record-error");
  if (action === "new-assay") openDialog("assay-dialog", "assay-form", "assay-error");
  if (action === "close-dialog") closeDialogs();
  if (action === "dismiss-notice") event.target.closest(".notice-banner").remove();
});

$("#record-search").addEventListener("input", render);
$("#grade-filter").addEventListener("change", render);
$("#track-filter").addEventListener("change", render);
$("#record-form").addEventListener("submit", handleRecordSubmit);
$("#assay-form").addEventListener("submit", handleAssaySubmit);
$("#assay-form").elements.grade.addEventListener("change", updateQaChecklist);
$("#record-form").elements.grade.addEventListener("change", updateRecordOptions);
$("#record-form").elements.track.addEventListener("change", updateRecordOptions);

$$("dialog").forEach((dialog) => dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
}));

render();
