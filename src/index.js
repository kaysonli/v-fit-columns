import "./styles.css";

function adjustColumnWidth(table, padding = 32) {
  const colgroup = table.querySelector("colgroup");
  const colDefs = [...colgroup.querySelectorAll("col")];
  colDefs.forEach((col) => {
    const clsName = col.getAttribute("name");
    const cells = [
      ...table.querySelectorAll(`td.${clsName}`),
      ...table.querySelectorAll(`th.${clsName}`),
    ];
    if (cells[0]?.classList?.contains?.("leave-alone")) {
      return;
    }
    const widthList = cells.map((el) => {
      return el.querySelector(".cell")?.scrollWidth || 0;
    });
    const max = Math.max(...widthList);
    table.querySelectorAll(`col[name=${clsName}]`).forEach((el) => {
      el.setAttribute("width", max + padding);
    });
  });
}

export default {
  install(Vue) {
    Vue.directive("fit-columns", {
      update() {},
      bind() {},
      inserted(el, binding) {
        setTimeout(() => {
          adjustColumnWidth(el, binding.value);
        }, 300);
      },
      componentUpdated(el, binding) {
        el.classList.add("r-table");
        setTimeout(() => {
          adjustColumnWidth(el, binding.value);
        }, 300);
      },
      unbind() {},
    });
  },
};
