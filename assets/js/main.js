const navItems = [
  { href: "index.html", label: "Home" },
  { href: "home2.html", label: "Home 2" },
  { href: "about.html", label: "About" },
  { href: "services.html", label: "Services" },
  { href: "pricing.html", label: "Pricing" },
  { href: "blog.html", label: "Blog" },
  { href: "contact.html", label: "Contact" },
  { href: "dashboard.html", label: "Dashboard" },
  { href: "signup.html", label: "Sign Up", isButton: true, icon: "user-plus" }
];

const footerGroups = [
  {
    title: "Expertise",
    links: [
      ["Chrome Extensions", "services.html#chrome"],
      ["Firefox Add-ons", "services.html#firefox"],
      ["Store Optimization", "services.html#store"],
      ["Analytics Setup", "services.html#analytics"]
      
    ]
  },
  {
    title: "Resources",
    links: [
      ["Permissions Guide", "blog.html#permissions"],
      ["Publishing Workflow", "blog.html#publishing"],
      ["Review Samples", "blog.html#reviews"],
      ["Security Notes", "about.html#security"]
    ]
  },
  {
    title: "Client Hub",
    links: [
      ["Dashboard", "dashboard.html"],
      ["Beta Versions", "dashboard.html#beta"],
      ["Reports", "dashboard.html#reports"],
      ["Contact", "contact.html"]
    ]
  }
];

const chartPresets = {
  installs: { type: "line", data: [28, 34, 38, 47, 52, 63, 71, 86, 94], accent: "primary" },
  retention: { type: "bar", data: [42, 50, 57, 62, 68, 73, 78], accent: "secondary" },
  ratings: { type: "donut", data: [78, 14, 8], accent: "primary" },
  crash: { type: "line", data: [9, 7, 6, 5, 4, 3, 2, 2, 1], accent: "secondary", invert: true },
  growth: { type: "bar", data: [32, 46, 55, 64, 82, 96], accent: "primary" },
  revenue: { type: "line", data: [18, 24, 38, 45, 58, 69, 88], accent: "secondary" },
  reviews: { type: "bar", data: [18, 28, 45, 64, 86], accent: "secondary" }
};

function icon(name, className = "w-4 h-4") {
  return `<i data-lucide="${name}" class="${className}" aria-hidden="true"></i>`;
}

function currentPage() {
  const page = window.location.pathname.split("/").pop() || "index.html";
  return page.toLowerCase();
}

function renderHeader() {
  const root = document.getElementById("site-header");
  if (!root) return;

  const page = currentPage();
  const getNavHtml = (isMobile = false) => {
    return navItems
      .map((item) => {
        if (item.isButton) {
          const iconHtml = !isMobile && item.icon ? icon(item.icon, "w-4 h-4") : "";
          return `<a class="btn btn-primary btn-sm" href="${item.href}">${iconHtml}<span>${item.label}</span></a>`;
        }
        const active = page === item.href || (page === "" && item.href === "index.html");
        return `<a class="nav-link ${active ? "active" : ""}" href="${item.href}">${item.label}</a>`;
      })
      .join("");
  };

  const desktopNavHtml = getNavHtml(false);
  const mobileNavHtml = getNavHtml(true);

  root.innerHTML = `
    <header class="site-header">
      <div class="container-wide flex min-h-[76px] items-center justify-between gap-4">
        <a href="index.html" class="flex shrink-0 items-center gap-3" aria-label="Freelance Browser Extension Developer home">
          <span class="brand-mark">${icon("blocks", "w-5 h-5")}</span>
          <span class="leading-tight">
            <span class="block font-heading text-lg font-extrabold">Alex Rivers</span>
          </span>
        </a>

        <nav class="desktop-nav hidden items-center justify-center gap-3 xl:gap-5 lg:flex mx-auto px-4" aria-label="Primary navigation">
          ${desktopNavHtml}
        </nav>

        <div class="flex items-center gap-2">
          <button class="icon-btn" type="button" data-theme-toggle aria-label="Toggle dark mode"></button>
          <button class="text-btn" type="button" data-rtl-toggle aria-label="Toggle RTL">RTL</button>
          <button class="icon-btn mobile-only" type="button" data-menu-toggle aria-label="Open navigation" aria-expanded="false">
            ${icon("menu", "w-5 h-5")}
          </button>
        </div>
      </div>
    </header>

    <div class="mobile-backdrop" data-menu-backdrop></div>
    <aside class="mobile-menu" data-mobile-menu aria-label="Mobile navigation">
      <div class="mb-8 flex items-center justify-between gap-3">
        <a href="index.html" class="flex items-center gap-3">
          <span class="brand-mark">${icon("blocks", "w-5 h-5")}</span>
          <span class="font-heading text-lg font-extrabold">Alex Rivers</span>
        </a>
        <button class="icon-btn" type="button" data-menu-close aria-label="Close navigation">${icon("x", "w-5 h-5")}</button>
      </div>
      <nav class="grid gap-4" aria-label="Mobile primary navigation">${mobileNavHtml}</nav>
    </aside>
  `;
}

function renderFooter() {
  const root = document.getElementById("site-footer");
  if (!root) return;

  const page = currentPage();

  const footerNavHtml = navItems
    .filter((item) => !item.isButton)
    .map((item) => {
      const active = page === item.href || (page === "" && item.href === "index.html");
      return `<li><a class="footer-nav-link ${active ? "active" : ""}" href="${item.href}">${item.label}</a></li>`;
    })
    .join("");

  const groupsHtml = footerGroups
    .map((group) => `
      <div>
        <h3 class="mb-4 font-heading text-base font-extrabold">${group.title}</h3>
        <ul class="grid gap-3 text-sm font-semibold text-slate-500 dark:text-slate-400">
          ${group.links.map(([label, href]) => `<li><a class="hover:text-primary" href="${href}">${label}</a></li>`).join("")}
        </ul>
      </div>
    `)
    .join("");

  root.innerHTML = `
    <footer class="footer">
      <div class="container-wide py-14">
        <div class="grid gap-10 lg:grid-cols-[1.25fr_2fr]">
          <div>
            <a href="index.html" class="mb-5 flex items-center gap-3">
              <span class="brand-mark">${icon("blocks", "w-5 h-5")}</span>
              <span>
                <span class="block font-heading text-xl font-extrabold">Alex Rivers</span>
              </span>
            </a>
            <p class="max-w-md text-sm text-slate-500 dark:text-slate-400">
              I provide premium Chrome and Firefox extension strategy, build, launch, analytics, and maintenance for product teams that need dependable browser-native workflows.
            </p>
            <div class="mt-6 flex flex-wrap gap-3">
              <span class="platform-chip">${icon("globe-2")}Chrome</span>
              <span class="platform-chip">${icon("shield-check")}Firefox</span>
              <span class="platform-chip">${icon("bar-chart-3")}Analytics</span>
            </div>
          </div>
          <div class="grid gap-8 sm:grid-cols-3">${groupsHtml}</div>
        </div>


        <div class="mt-8 flex flex-col gap-4 border-t border-slate-200 pt-6 text-sm font-semibold text-slate-500 dark:border-slate-800 dark:text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>&copy; <span data-year></span> Alex Rivers. Built for secure extension delivery.</p>
          <div class="flex gap-4">
            <a class="hover:text-primary" href="signup.html">Signup</a>
            <a class="hover:text-primary" href="contact.html">Book consultation</a>
            <a class="hover:text-primary" href="dashboard.html">Dashboard</a>
          </div>
        </div>
      </div>
    </footer>
  `;
}

function refreshIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function updateToggleButtons() {
  const isDark = document.documentElement.classList.contains("dark");
  const isRtl = document.documentElement.getAttribute("dir") === "rtl";

  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    const isIconBtn = button.classList.contains("icon-btn");
    const iconHtml = isIconBtn ? icon(isDark ? "sun" : "moon", "w-4 h-4") : "";
    button.innerHTML = `${iconHtml}<span class="${isIconBtn ? "sr-only" : ""}">${isDark ? "Light" : "Dark"}</span>`;
    button.setAttribute("aria-pressed", String(isDark));
  });

  document.querySelectorAll("[data-rtl-toggle]").forEach((button) => {
    const isTextBtn = button.classList.contains("text-btn") || button.classList.contains("btn");
    if (isTextBtn) {
      button.textContent = isRtl ? "LTR" : "RTL";
    } else {
      button.innerHTML = `${icon("align-right", "w-4 h-4")}<span class="sr-only">${isRtl ? "LTR" : "RTL"}</span>`;
    }
    button.setAttribute("aria-pressed", String(isRtl));
  });

  refreshIcons();
}

function initThemeControls() {
  updateToggleButtons();

  document.addEventListener("click", (event) => {
    const themeButton = event.target.closest("[data-theme-toggle]");
    const rtlButton = event.target.closest("[data-rtl-toggle]");

    if (themeButton) {
      document.documentElement.classList.toggle("dark");
      localStorage.setItem("extensionfolio-theme", document.documentElement.classList.contains("dark") ? "dark" : "light");
      updateToggleButtons();
      drawAllCharts();
    }

    if (rtlButton) {
      const nextDir = document.documentElement.getAttribute("dir") === "rtl" ? "ltr" : "rtl";
      document.documentElement.setAttribute("dir", nextDir);
      localStorage.setItem("extensionfolio-dir", nextDir);
      updateToggleButtons();
    }
  });
}

function initMenus() {
  const mobileMenu = document.querySelector("[data-mobile-menu]");
  const backdrop = document.querySelector("[data-menu-backdrop]");
  const menuButton = document.querySelector("[data-menu-toggle]");

  const closeMenu = () => {
    if (!mobileMenu) return;
    mobileMenu.classList.remove("open");
    backdrop?.classList.remove("open");
    document.body.classList.remove("nav-open");
    menuButton?.setAttribute("aria-expanded", "false");
  };

  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-menu-toggle]")) {
      mobileMenu?.classList.add("open");
      backdrop?.classList.add("open");
      document.body.classList.add("nav-open");
      menuButton?.setAttribute("aria-expanded", "true");
    }

    if (event.target.closest("[data-menu-close]") || event.target.matches("[data-menu-backdrop]")) {
      closeMenu();
    }

    if (event.target.closest(".mobile-menu a")) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

function initRevealAnimations() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });

  items.forEach((item) => observer.observe(item));
}

function initCounters() {
  const counters = document.querySelectorAll("[data-counter]");
  if (!counters.length) return;

  const animateCounter = (el) => {
    const target = Number(el.dataset.counter || "0");
    const suffix = el.dataset.suffix || "";
    const prefix = el.dataset.prefix || "";
    const duration = 1100;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);
      el.textContent = `${prefix}${current.toLocaleString()}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  if (!("IntersectionObserver" in window)) {
    counters.forEach(animateCounter);
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.35 });

  counters.forEach((counter) => observer.observe(counter));
}

function cssColor(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function drawChart(canvas) {
  const preset = chartPresets[canvas.dataset.chart];
  if (!preset) return;

  const parentWidth = canvas.parentElement?.clientWidth || canvas.clientWidth;
  if (parentWidth < 40) return;

  const height = Number(canvas.dataset.chartHeight || 210);
  const ratio = window.devicePixelRatio || 1;
  canvas.width = parentWidth * ratio;
  canvas.height = height * ratio;
  canvas.style.height = `${height}px`;

  const ctx = canvas.getContext("2d");
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  ctx.clearRect(0, 0, parentWidth, height);

  const primary = cssColor("--primary");
  const secondary = cssColor("--secondary");
  const muted = document.documentElement.classList.contains("dark") ? "rgba(226,232,240,0.14)" : "rgba(15,23,42,0.12)";
  const text = document.documentElement.classList.contains("dark") ? "rgba(226,232,240,0.72)" : "rgba(15,23,42,0.62)";
  const accent = preset.accent === "secondary" ? secondary : primary;
  const other = preset.accent === "secondary" ? primary : secondary;
  const data = preset.data;
  const max = Math.max(...data) * 1.12;
  const min = preset.invert ? 0 : Math.min(0, ...data);
  const pad = 24;
  const width = parentWidth;
  const innerWidth = width - pad * 2;
  const innerHeight = height - pad * 2;

  ctx.lineWidth = 1;
  ctx.strokeStyle = muted;
  for (let i = 0; i < 4; i += 1) {
    const y = pad + (innerHeight / 3) * i;
    ctx.beginPath();
    ctx.moveTo(pad, y);
    ctx.lineTo(width - pad, y);
    ctx.stroke();
  }

  ctx.fillStyle = text;
  ctx.font = "600 11px Inter, sans-serif";

  if (preset.type === "donut") {
    const total = data.reduce((sum, value) => sum + value, 0);
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 3.3;
    let start = -Math.PI / 2;
    [accent, other, muted].forEach((color, index) => {
      const slice = (data[index] / total) * Math.PI * 2;
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 18;
      ctx.arc(centerX, centerY, radius, start, start + slice);
      ctx.stroke();
      start += slice;
    });
    ctx.fillStyle = cssColor("--text");
    ctx.font = "800 24px Space Grotesk, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(`${data[0]}%`, centerX, centerY + 8);
    return;
  }

  if (preset.type === "bar") {
    const gap = 12;
    const barWidth = Math.max(12, (innerWidth - gap * (data.length - 1)) / data.length);
    data.forEach((value, index) => {
      const x = pad + index * (barWidth + gap);
      const barHeight = (value / max) * innerHeight;
      const y = height - pad - barHeight;
      const gradient = ctx.createLinearGradient(0, y, 0, height - pad);
      gradient.addColorStop(0, accent);
      gradient.addColorStop(1, other);
      ctx.fillStyle = gradient;
      roundRect(ctx, x, y, barWidth, barHeight, 7);
      ctx.fill();
    });
    return;
  }

  const points = data.map((value, index) => {
    const x = pad + (innerWidth / (data.length - 1)) * index;
    const normalized = (value - min) / (max - min);
    const y = height - pad - normalized * innerHeight;
    return [x, y];
  });

  const area = ctx.createLinearGradient(0, pad, 0, height - pad);
  area.addColorStop(0, preset.accent === "secondary" ? "rgba(249,115,22,0.24)" : "rgba(37,99,235,0.24)");
  area.addColorStop(1, "rgba(37,99,235,0)");

  ctx.beginPath();
  points.forEach(([x, y], index) => {
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.lineTo(points[points.length - 1][0], height - pad);
  ctx.lineTo(points[0][0], height - pad);
  ctx.closePath();
  ctx.fillStyle = area;
  ctx.fill();

  ctx.beginPath();
  points.forEach(([x, y], index) => {
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = accent;
  ctx.stroke();

  points.forEach(([x, y]) => {
    ctx.beginPath();
    ctx.fillStyle = cssColor("--surface-strong");
    ctx.strokeStyle = other;
    ctx.lineWidth = 3;
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  });
}

function roundRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function drawAllCharts() {
  document.querySelectorAll("canvas[data-chart]").forEach(drawChart);
}

function initAccordions() {
  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-accordion-trigger]");
    if (!button) return;
    const item = button.closest(".faq-item");
    const isOpen = item.classList.toggle("open");
    button.setAttribute("aria-expanded", String(isOpen));
  });
}

function initTabs() {
  document.addEventListener("click", (event) => {
    const tabButton = event.target.closest("[data-showcase-tab]");
    if (!tabButton) return;

    const group = tabButton.dataset.showcaseGroup;
    const target = tabButton.dataset.showcaseTab;
    document.querySelectorAll(`[data-showcase-group="${group}"]`).forEach((button) => {
      button.classList.toggle("btn-primary", button.dataset.showcaseTab === target);
      button.classList.toggle("btn-ghost", button.dataset.showcaseTab !== target);
    });
    document.querySelectorAll(`[data-showcase-panel-group="${group}"]`).forEach((panel) => {
      panel.hidden = panel.dataset.showcasePanel !== target;
    });
    drawAllCharts();
  });
}

function initBlogFilters() {
  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-blog-filter]");
    if (!button) return;

    const value = button.dataset.blogFilter;
    document.querySelectorAll("[data-blog-filter]").forEach((filter) => {
      filter.classList.toggle("btn-primary", filter === button);
      filter.classList.toggle("btn-ghost", filter !== button);
    });

    document.querySelectorAll("[data-article-category]").forEach((article) => {
      article.hidden = value !== "all" && article.dataset.articleCategory !== value;
    });
  });
}

function initTipCarousel() {
  const slides = Array.from(document.querySelectorAll("[data-tip-slide]"));
  if (!slides.length) return;
  let index = slides.findIndex((slide) => slide.classList.contains("active"));
  if (index < 0) index = 0;

  const show = (nextIndex) => {
    index = (nextIndex + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => slide.classList.toggle("active", slideIndex === index));
  };

  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-tip-next]")) show(index + 1);
    if (event.target.closest("[data-tip-prev]")) show(index - 1);
  });
}

function initReadingProgress() {
  const bar = document.querySelector("[data-reading-progress]");
  const header = document.querySelector(".site-header");

  const update = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;

    if (bar) {
      bar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    }

    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 20);
    }
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
}

function initDashboard() {
  const sidebar = document.querySelector("[data-dashboard-sidebar]");
  if (!sidebar) return;

  const mobileBackdrop = document.querySelector("[data-dashboard-backdrop]");
  const closeSidebar = () => {
    sidebar.classList.remove("open");
    mobileBackdrop?.classList.remove("open");
    document.body.classList.remove("sidebar-open");
  };

  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-sidebar-collapse]")) {
      sidebar.classList.toggle("collapsed");
      sidebar.closest(".dashboard-shell")?.classList.toggle("sidebar-collapsed", sidebar.classList.contains("collapsed"));
    }

    if (event.target.closest("[data-sidebar-open]")) {
      sidebar.classList.add("open");
      mobileBackdrop?.classList.add("open");
      document.body.classList.add("sidebar-open");
    }

    if (event.target.matches("[data-dashboard-backdrop]")) {
      closeSidebar();
    }

    const tab = event.target.closest("[data-dashboard-tab]");
    if (tab) {
      const target = tab.dataset.dashboardTab;
      document.querySelectorAll("[data-dashboard-tab]").forEach((item) => item.classList.toggle("active", item === tab));
      document.querySelectorAll("[data-dashboard-panel]").forEach((panel) => panel.classList.toggle("active", panel.dataset.dashboardPanel === target));
      closeSidebar();
      window.history.replaceState(null, "", `#${target}`);
      setTimeout(drawAllCharts, 80);
    }

    if (event.target.closest("[data-notification-toggle]")) {
      document.querySelector("[data-notification-menu]")?.classList.toggle("open");
    }

    const filter = event.target.closest("[data-dashboard-filter]");
    if (filter) {
      const status = filter.dataset.dashboardFilter;
      document.querySelectorAll("[data-dashboard-filter]").forEach((item) => {
        item.classList.toggle("btn-primary", item === filter);
        item.classList.toggle("btn-ghost", item !== filter);
      });
      document.querySelectorAll("[data-filter-card]").forEach((card) => {
        card.hidden = status !== "all" && card.dataset.filterCard !== status;
      });
    }

    if (event.target.closest("[data-download-report]")) {
      downloadReport(event.target.closest("[data-download-report]"));
    }

    if (event.target.closest("[data-print-report]")) {
      window.print();
    }
  });

  const hash = window.location.hash.replace("#", "");
  if (hash) {
    const targetTab = document.querySelector(`[data-dashboard-tab="${hash}"]`);
    targetTab?.click();
  }
}

function initUploads() {
  document.querySelectorAll("[data-upload-input]").forEach((input) => {
    input.addEventListener("change", () => {
      const label = document.querySelector(`[data-upload-label="${input.id}"]`);
      if (!label) return;
      label.textContent = input.files?.[0]?.name || "Drop a beta build or select a file";
    });
  });
}

function downloadReport(button) {
  const fileName = button.dataset.fileName || "extension-report.csv";
  const rows = [
    ["Metric", "Value"],
    ["Active Extensions", "12"],
    ["Total Installs", "148320"],
    ["User Retention", "78%"],
    ["Average Rating", "4.8"]
  ];
  const csv = rows.map((row) => row.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function initForms() {
  document.querySelectorAll("[data-demo-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const status = form.querySelector("[data-form-status]");
      if (status) {
        status.textContent = "Request captured. The dashboard consultation workflow is ready for review.";
      }
      form.reset();
    });
  });
}

function initPasswordToggles() {
  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-password-toggle]");
    if (!button) return;
    const target = document.getElementById(button.dataset.passwordToggle);
    if (!target) return;
    target.type = target.type === "password" ? "text" : "password";
    button.innerHTML = icon(target.type === "password" ? "eye" : "eye-off", "w-4 h-4");
    refreshIcons();
  });
}

function setYear() {
  document.querySelectorAll("[data-year]").forEach((item) => {
    item.textContent = String(new Date().getFullYear());
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();
  setYear();
  initThemeControls();
  initMenus();
  initRevealAnimations();
  initCounters();
  initAccordions();
  initTabs();
  initBlogFilters();
  initTipCarousel();
  initReadingProgress();
  initDashboard();
  initUploads();
  initForms();
  initPasswordToggles();
  refreshIcons();
  drawAllCharts();
});

window.addEventListener("resize", () => {
  window.clearTimeout(window.__alexRiversChartTimer);
  window.__alexRiversChartTimer = window.setTimeout(drawAllCharts, 120);
});
