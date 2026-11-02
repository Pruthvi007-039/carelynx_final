// ============================================================
// CARELYNX DEVELOPERS PAGE — THEME & FOOTER
// ============================================================

const devToggle = document.getElementById("themeToggle");
const devYear = document.getElementById("devYear");

const savedTheme = localStorage.getItem("carelynx-theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
  document.body.classList.add("dark");
}

function updateDevTheme() {
  const dark = document.body.classList.contains("dark");

  if (devToggle) {
    devToggle.textContent = dark ? "☀" : "☾";
  }
}

updateDevTheme();

if (devToggle) {
  devToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    localStorage.setItem(
      "carelynx-theme",
      document.body.classList.contains("dark") ? "dark" : "light",
    );

    updateDevTheme();
  });
}

if (devYear) {
  devYear.textContent = new Date().getFullYear();
}

// ............ END DEVELOPERS PAGE SCRIPT ............
