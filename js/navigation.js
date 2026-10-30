/* ================================================================
   START: CARELYNX ACTIVE SECTION NAVIGATION (SCROLL-SPY)
   Automatically updates the highlighted header link while scrolling.
   ================================================================ */
(() => {
  "use strict";

  function initializeActiveNavigation() {
    const header = document.querySelector(".site-header");
    const nav = document.getElementById("mainNavigation");
    if (!header || !nav) return;

    const links = Array.from(nav.querySelectorAll("a[href]"));

    /* Map every named homepage section to its closest header link.
       Team belongs to About, FAQ belongs to Contact, while the
       roadmap remains within Platform until the partnership section. */
    const sectionMap = [
      { section: "home", href: "#home" },
      { section: "about", href: "#about" },
      { section: "team", href: "#about" },
      { section: "platform", href: "#platform" },
      { section: "partners", href: "partnership.html" },
      { section: "faq", href: "#contact" },
      { section: "contact", href: "#contact" },
    ].map(({section, href}) => ({ element: document.getElementById(section), href }))
      .filter(({element}) => Boolean(element));

    if (!sectionMap.length) return;

    function highlight(href) {
      links.forEach((link) => {
        const isActive = link.getAttribute("href") === href;
        link.classList.toggle("is-active", isActive);
        if (isActive) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    }

    function updateActiveLink() {
      // Determine the section just beneath the header, not the page center.
      const offset = header.getBoundingClientRect().height + 110;
      let activeHref = sectionMap[0].href;

      for (const item of sectionMap) {
        if (item.element.getBoundingClientRect().top <= offset) {
          activeHref = item.href;
        }
      }

      // Account for short final sections at the bottom of the page.
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) {
        activeHref = sectionMap[sectionMap.length - 1].href;
      }
      highlight(activeHref);
    }

    let frameRequested = false;
    function onScroll() {
      if (frameRequested) return;
      frameRequested = true;
      requestAnimationFrame(() => {
        frameRequested = false;
        updateActiveLink();
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("hashchange", onScroll);
    window.addEventListener("load", onScroll);
    updateActiveLink();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeActiveNavigation, { once: true });
  } else {
    initializeActiveNavigation();
  }
})();
/* ........................ END OF ACTIVE SECTION NAVIGATION ........................ */
