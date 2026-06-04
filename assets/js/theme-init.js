(() => {
  const root = document.documentElement;
  const savedTheme = localStorage.getItem("extensionfolio-theme");
  const savedDir = localStorage.getItem("extensionfolio-dir");
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    root.classList.add("dark");
  }

  root.setAttribute("dir", savedDir === "rtl" ? "rtl" : "ltr");
})();
