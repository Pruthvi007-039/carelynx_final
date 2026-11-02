// ============================================================
// CARELYNX MOBILE GRID MENU
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.getElementById("clmOpenBtn");
  const closeBtn = document.getElementById("clmCloseBtn");
  const drawer = document.getElementById("clmDrawer");
  const overlay = document.getElementById("clmOverlay");

  const mobileTheme = document.getElementById("clmThemeBtn");
  const originalTheme = document.getElementById("themeToggle");

  const mobileLang = document.getElementById("clmLanguageSelect");
  const originalLang = document.getElementById("languageSelect");

  if (!openBtn || !closeBtn || !drawer || !overlay) return;

  const mobileQuery = window.matchMedia("(max-width: 768px)");

  // ==========================================================
  // OPEN MENU
  // ==========================================================

  function openMenu() {
    if (!mobileQuery.matches) return;

    drawer.classList.add("is-open");
    overlay.classList.add("is-open");

    document.body.classList.add("clm-lock");

    drawer.inert = false;
    drawer.setAttribute("aria-hidden", "false");
    openBtn.setAttribute("aria-expanded", "true");

    updateActive();
    updateTheme();
    closeBtn.focus();
  }

  // ==========================================================
  // CLOSE MENU
  // ==========================================================

  function closeMenu(restoreFocus = true) {
    const wasOpen = drawer.classList.contains("is-open");

    drawer.classList.remove("is-open");
    overlay.classList.remove("is-open");

    document.body.classList.remove("clm-lock");

    if (restoreFocus && wasOpen && mobileQuery.matches) {
      openBtn.focus();
    }

    drawer.inert = true;
    drawer.setAttribute("aria-hidden", "true");
    openBtn.setAttribute("aria-expanded", "false");
  }

  openBtn.addEventListener("click", openMenu);
  closeBtn.addEventListener("click", () => closeMenu());
  overlay.addEventListener("click", () => closeMenu());

  // ==========================================================
  // KEYBOARD ACCESSIBILITY
  // ==========================================================

  document.addEventListener("keydown", (e) => {
    if (!drawer.classList.contains("is-open")) return;

    if (e.key === "Escape") {
      closeMenu();
      return;
    }

    if (e.key !== "Tab") return;

    const elements = Array.from(
      drawer.querySelectorAll(
        "a[href], button:not([disabled]), select:not([disabled])",
      ),
    );

    if (!elements.length) return;

    const first = elements[0];
    const last = elements[elements.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  // ==========================================================
  // ACTIVE NAVIGATION
  // ==========================================================

  function updateActive() {
    const page = location.pathname.split("/").pop() || "index.html";
    const hash = location.hash || "#home";

    drawer.querySelectorAll(".clm-card").forEach((link) => {
      const url = new URL(link.href, location.href);
      const linkPage = url.pathname.split("/").pop() || "index.html";

      const active =
        linkPage === page && (page === "index.html" ? url.hash === hash : true);

      link.classList.toggle("is-active", active);

      if (active) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  updateActive();

  window.addEventListener("hashchange", updateActive);

  drawer.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => closeMenu(false));
  });

  mobileQuery.addEventListener("change", (e) => {
    if (!e.matches) closeMenu(false);
  });

  // ==========================================================
  // DARK MODE - USE ORIGINAL WEBSITE TOGGLE
  // ==========================================================

  function isDark() {
    return (
      document.body.classList.contains("dark") ||
      document.body.classList.contains("dark-mode") ||
      document.documentElement.classList.contains("dark") ||
      document.documentElement.getAttribute("data-theme") === "dark" ||
      document.body.getAttribute("data-theme") === "dark"
    );
  }

  function updateTheme() {
    if (!mobileTheme) return;

    const dark = isDark();

    const icon = mobileTheme.querySelector(".clm-theme-icon");
    const label = mobileTheme.querySelector(".clm-theme-label");

    if (icon) icon.textContent = dark ? "☀" : "☾";
    if (label) label.textContent = dark ? "Light mode" : "Dark mode";

    mobileTheme.setAttribute("aria-pressed", String(dark));
  }

  if (mobileTheme && originalTheme) {
    mobileTheme.addEventListener("click", () => {
      originalTheme.click();
      updateTheme();
    });

    const observer = new MutationObserver(updateTheme);

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    updateTheme();
  }

  // ==========================================================
  // LANGUAGE - USE ORIGINAL WEBSITE SELECTOR
  // ==========================================================

  if (mobileLang && originalLang) {
    mobileLang.value = originalLang.value;

    mobileLang.addEventListener("change", () => {
      originalLang.value = mobileLang.value;

      originalLang.dispatchEvent(new Event("change", { bubbles: true }));
    });

    originalLang.addEventListener("change", () => {
      mobileLang.value = originalLang.value;
    });
  }
});

// ............ END CARELYNX MOBILE GRID MENU ............
