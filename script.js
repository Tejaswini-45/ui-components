const table = document.querySelector(".data-table");
const thead = table.querySelector("thead");
const tbody = table.querySelector("tbody");

let sortKey = null;
let asc = true;

// Sorting
thead.addEventListener("click", (e) => {
  const th = e.target.closest("th[data-sort]");
  if (!th) return;

  const key = th.dataset.sort;
  if (sortKey === key) asc = !asc;
  else {
    sortKey = key;
    asc = true;
  }

  const rows = [...tbody.querySelectorAll("tr")];
  rows.sort((a, b) => {
    const aText = a.querySelector(`td:nth-child(${th.cellIndex + 1})`).textContent.trim();
    const bText = b.querySelector(`td:nth-child(${th.cellIndex + 1})`).textContent.trim();
    return asc ? aText.localeCompare(bText) : bText.localeCompare(aText);
  });
  
  tbody.innerHTML = "";
  rows.forEach((r) => tbody.appendChild(r));
});

// Row Selection
const selectAll = document.getElementById("select-all");
selectAll.addEventListener("change", () => {
  const checkboxes = tbody.querySelectorAll("input[type='checkbox']");
  checkboxes.forEach((cb) => (cb.checked = selectAll.checked));
});

// Empty/Loading state helpers
function setLoadingState(loading) {
  document.querySelector(".loading-state").hidden = !loading;
  table.hidden = loading;
}

function setEmptyState(empty) {
  document.querySelector(".empty-state").hidden = !empty;
  table.hidden = empty;
}
