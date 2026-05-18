const data = window.RESEARCH_HUB_DATA;

const topicCards = document.querySelector("#topicCards");
const topicFilter = document.querySelector("#topicFilter");
const statusFilter = document.querySelector("#statusFilter");
const tagFilter = document.querySelector("#tagFilter");
const searchInput = document.querySelector("#searchInput");
const resultCount = document.querySelector("#resultCount");
const literatureList = document.querySelector("#literatureList");
const resetFilters = document.querySelector("#resetFilters");

const statusMap = new Map(data.statuses.map((status) => [status.id, status.label]));
const topicMap = new Map(data.topics.map((topic) => [topic.id, topic]));

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderTopics() {
  topicCards.innerHTML = data.topics.map((topic) => {
    const count = data.literature.filter((item) => item.topicIds.includes(topic.id)).length;
    const focus = topic.focus.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("");

    return `
      <article class="topic-card">
        <div class="card-topline">
          <p>${escapeHtml(topic.shortTitle)}</p>
          <span>${count} 筆</span>
        </div>
        <h3>${escapeHtml(topic.title)}</h3>
        <p>${escapeHtml(topic.description)}</p>
        <div class="tag-row">${focus}</div>
      </article>
    `;
  }).join("");
}

function populateFilters() {
  data.topics.forEach((topic) => {
    topicFilter.insertAdjacentHTML("beforeend", `<option value="${escapeHtml(topic.id)}">${escapeHtml(topic.shortTitle)}</option>`);
  });

  data.statuses.forEach((status) => {
    statusFilter.insertAdjacentHTML("beforeend", `<option value="${escapeHtml(status.id)}">${escapeHtml(status.label)}</option>`);
  });

  const tags = [...new Set(data.literature.flatMap((item) => item.tags))].sort((a, b) => a.localeCompare(b, "zh-Hant"));
  tags.forEach((tag) => {
    tagFilter.insertAdjacentHTML("beforeend", `<option value="${escapeHtml(tag)}">${escapeHtml(tag)}</option>`);
  });
}

function getFilteredLiterature() {
  const topicValue = topicFilter.value;
  const statusValue = statusFilter.value;
  const tagValue = tagFilter.value;
  const query = searchInput.value.trim().toLowerCase();

  return data.literature.filter((item) => {
    const matchesTopic = topicValue === "all" || item.topicIds.includes(topicValue);
    const matchesStatus = statusValue === "all" || item.status === statusValue;
    const matchesTag = tagValue === "all" || item.tags.includes(tagValue);
    const searchableText = [
      item.title,
      item.translatedTitle,
      item.authors.join(" "),
      item.year,
      item.summary,
      item.relevance,
      item.tags.join(" ")
    ].join(" ").toLowerCase();
    const matchesSearch = !query || searchableText.includes(query);

    return matchesTopic && matchesStatus && matchesTag && matchesSearch;
  });
}

function renderLiterature() {
  const items = getFilteredLiterature();
  resultCount.textContent = `${items.length} 筆文獻`;

  if (!items.length) {
    literatureList.innerHTML = `<p class="empty-state">目前沒有符合條件的文獻。</p>`;
    return;
  }

  literatureList.innerHTML = items.map((item) => {
    const topics = item.topicIds
      .map((id) => topicMap.get(id)?.shortTitle)
      .filter(Boolean)
      .map((title) => `<span>${escapeHtml(title)}</span>`)
      .join("");
    const tags = item.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("");
    const links = item.links.map((link) => (
      `<a href="${escapeHtml(link.url)}" target="_blank" rel="noreferrer">${escapeHtml(link.label)}</a>`
    )).join("");

    return `
      <article class="literature-card">
        <div class="literature-head">
          <div>
            <p class="meta">${escapeHtml(item.authors.join(", "))} · ${escapeHtml(item.year)}</p>
            <h3>${escapeHtml(item.translatedTitle)}</h3>
            <p class="original-title">${escapeHtml(item.title)}</p>
          </div>
          <span class="status-pill">${escapeHtml(statusMap.get(item.status) || item.status)}</span>
        </div>
        <p>${escapeHtml(item.summary)}</p>
        <p class="relevance">${escapeHtml(item.relevance)}</p>
        <div class="topic-row">${topics}</div>
        <div class="tag-row">${tags}</div>
        <p class="citation">${escapeHtml(item.citation)}</p>
        <div class="link-row">${links}</div>
      </article>
    `;
  }).join("");
}

function resetAllFilters() {
  topicFilter.value = "all";
  statusFilter.value = "all";
  tagFilter.value = "all";
  searchInput.value = "";
  renderLiterature();
}

[topicFilter, statusFilter, tagFilter, searchInput].forEach((control) => {
  control.addEventListener("input", renderLiterature);
});
resetFilters.addEventListener("click", resetAllFilters);

renderTopics();
populateFilters();
renderLiterature();
