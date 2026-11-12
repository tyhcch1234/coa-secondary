/* ============================================================
   香港中學資助則例 · 導讀 — 共用介面腳本
   ============================================================ */
(function () {
  "use strict";

  var NAV = [
    { group: "開始", items: [
      { id: "index", href: "index.html", n: "00", label: "總覽與導讀" }
    ]},
    { group: "第一部 · 引言", items: [
      { id: "intro", href: "intro.html", n: "01", label: "法律地位與管治" },
      { id: "grants", href: "grants.html", n: "02", label: "津貼制度與收費" }
    ]},
    { group: "第二部 · 人力與財務", items: [
      { id: "staffing", href: "staffing.html", n: "03", label: "教職員編制與薪級" },
      { id: "personnel", href: "personnel.html", n: "04", label: "聘任、晉升與離職" },
      { id: "leave", href: "leave.html", n: "05", label: "假期、代課與替假" },
      { id: "accounts", href: "accounts.html", n: "06", label: "津貼運用、帳目與審計" }
    ]},
    { group: "第三部 · 學校行政", items: [
      { id: "schooladmin", href: "schooladmin.html", n: "07", label: "收生、停學與校舍" },
      { id: "appendices", href: "appendices.html", n: "08", label: "二十個附錄詳解" }
    ]},
    { group: "參考", items: [
      { id: "resources", href: "resources.html", n: "09", label: "相關指引與表格" },
      { id: "reference", href: "reference.html", n: "10", label: "條文索引（可搜尋）" }
    ]}
  ];

  function buildSidebar() {
    var host = document.getElementById("sidebar");
    if (!host) return;
    var page = document.body.getAttribute("data-page");
    var html = '<div class="brand">' +
      '<span class="badge">EDB · 1994 年 9 月</span>' +
      '<h1>中學資助則例</h1>' +
      '<p>Code of Aid for Secondary Schools</p>' +
      '</div><nav class="nav">';

    NAV.forEach(function (g) {
      html += '<div class="nav-group"><span>' + g.group + '</span>';
      g.items.forEach(function (it) {
        html += '<a href="' + it.href + '"' + (it.id === page ? ' class="active"' : '') + '>' +
                '<span class="n">' + it.n + '</span><span>' + it.label + '</span></a>';
      });
      html += "</div>";
    });

    html += '</nav><div class="sidebar-foot">' +
      '資料來源：<a href="https://www.edb.gov.hk/tc/sch-admin/regulations/codes-of-aid/index.html" target="_blank" rel="noopener">教育局 · 資助則例</a><br>' +
      '本網站為條文導讀與整理，非官方出版物。一切以教育局原文為準。' +
      '</div>';
    host.innerHTML = html;
  }

  function bindMenu() {
    var btn = document.getElementById("menuBtn");
    if (btn) {
      btn.addEventListener("click", function () {
        document.body.classList.toggle("nav-open");
      });
    }
    document.addEventListener("click", function (e) {
      if (document.body.classList.contains("nav-open") &&
          !e.target.closest(".sidebar") && !e.target.closest("#menuBtn")) {
        document.body.classList.remove("nav-open");
      }
    });
  }

  function bindPrint() {
    var b = document.getElementById("printBtn");
    if (b) b.addEventListener("click", function () { window.print(); });
  }

  /* ---- generic table filter: <input data-filter="tableId"> ---- */
  function bindFilters() {
    document.querySelectorAll("[data-filter]").forEach(function (input) {
      var table = document.getElementById(input.getAttribute("data-filter"));
      if (!table) return;
      var rows = Array.prototype.slice.call(table.tBodies[0].rows);
      var counter = input.parentNode.querySelector(".search-count");
      input.addEventListener("input", function () {
        var q = input.value.trim().toLowerCase();
        var shown = 0;
        rows.forEach(function (r) {
          var hit = !q || r.textContent.toLowerCase().indexOf(q) !== -1;
          r.style.display = hit ? "" : "none";
          if (hit) shown++;
        });
        if (counter) counter.textContent = q ? "顯示 " + shown + " / " + rows.length + " 條" : "";
      });
    });
  }

  /* ---- numeric range filter for staffing table ---- */
  function bindStaffing() {
    var input = document.getElementById("classInput");
    var table = document.getElementById("staffTable");
    if (!input || !table) return;
    var rows = Array.prototype.slice.call(table.tBodies[0].rows);
    var out = document.getElementById("staffResult");
    function apply() {
      var v = parseInt(input.value, 10);
      if (!v || v < 7) { v = null; }
      var shown = 0;
      rows.forEach(function (r) {
        var n = parseInt(r.cells[0].textContent, 10);
        var hit = !v || n === v;
        r.style.display = hit ? "" : "none";
        if (hit) shown++;
      });
      if (out) {
        if (v) {
          var found = rows.filter(function (r) { return parseInt(r.cells[0].textContent, 10) === v; })[0];
          out.textContent = found
            ? "教職員編制 " + v + " 人 → 校長 1、SGM " + found.cells[1].textContent.trim() +
              "、GM " + found.cells[2].textContent.trim() + "（教學職位合計 " + found.cells[3].textContent.trim() + "）"
            : "未有此編制數目的對應行（表中由 7 至 101）。";
        } else {
          out.textContent = "輸入 7–101 之間的教職員編制數目，即可定位對應職級分佈。";
        }
      }
    }
    input.addEventListener("input", apply);
    apply();
  }

  /* ---- in-page TOC scrollspy ---- */
  function bindTOC() {
    var links = document.querySelectorAll(".page-toc a[href^='#']");
    if (!links.length || !("IntersectionObserver" in window)) return;
    var map = {};
    links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && map[en.target.id]) {
          links.forEach(function (a) { a.style.fontWeight = ""; a.style.color = ""; });
          map[en.target.id].style.fontWeight = "700";
          map[en.target.id].style.color = "var(--teal)";
        }
      });
    }, { rootMargin: "-88px 0px -70% 0px" });
    Object.keys(map).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) obs.observe(el);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    buildSidebar();
    bindMenu();
    bindPrint();
    bindFilters();
    bindStaffing();
    bindTOC();
  });
})();
