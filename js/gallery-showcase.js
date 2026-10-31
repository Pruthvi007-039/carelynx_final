// ============================================================
// START: CARELYNX INTERACTIVE GALLERY + 10 PROBLEMS
// No external library required
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  // ==========================================================
  // PART 1: PREMIUM CIRCULAR GALLERY
  // Balanced cards on both sides with smooth movement
  // ==========================================================

  const galleryWindow = document.getElementById("clGalleryWindow");

  const galleryCards = Array.from(
    document.querySelectorAll(".cl-gallery-card"),
  );

  const galleryPrev = document.getElementById("clGalleryPrev");
  const galleryNext = document.getElementById("clGalleryNext");
  const galleryPause = document.getElementById("clGalleryPause");
  const galleryCounter = document.getElementById("clGalleryCounter");

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  let galleryIndex = 0;
  let galleryPaused = reduceMotion;
  let galleryVisible = true;

  function currentLanguage() {
    const lang = document.getElementById("languageSelect")?.value;
    return ["gu", "hi"].includes(lang) ? lang : "en";
  }

  function updatePauseButton() {
    if (!galleryPause) return;

    const labels = {
      en: ["Pause", "Resume"],
      gu: ["થોભાવો", "ફરી ચાલુ કરો"],
      hi: ["रोकें", "फिर शुरू करें"],
    };

    const lang = currentLanguage();

    galleryPause.textContent = labels[lang][galleryPaused ? 1 : 0];

    galleryPause.setAttribute("aria-pressed", String(galleryPaused));
  }

  function pauseGallery(value = true) {
    galleryPaused = value;
    updatePauseButton();
  }

  // Calculate spacing between cards.
  function galleryStep() {
    if (window.innerWidth <= 650) {
      return window.innerWidth * 0.79;
    }

    return Math.min(365, Math.max(245, window.innerWidth * 0.245));
  }

  // Position all cards around the selected card.
  function renderGallery(index) {
    if (!galleryCards.length) return;

    const total = galleryCards.length;

    galleryIndex = (index + total) % total;

    const step = galleryStep();
    const half = Math.floor(total / 2);

    galleryCards.forEach((card, i) => {
      let offset = i - galleryIndex;

      // Circular positioning:
      // Last photo appears to the left of first photo.
      if (offset > half) offset -= total;
      if (offset < -half) offset += total;

      const distance = Math.abs(offset);
      const active = offset === 0;

      card.style.setProperty("--cl-shift", `${offset * step}px`);

      card.style.zIndex = String(10 - distance);

      card.classList.toggle("is-active", active);
      card.classList.toggle("is-near", distance === 1);
      card.classList.toggle("is-far", distance >= 2);

      card.setAttribute("aria-pressed", String(active));
      card.setAttribute(
        "aria-label",
        `${i + 1} of ${total}: ${card.querySelector("h3")?.textContent || "Gallery"}`,
      );
    });

    if (galleryCounter) {
      galleryCounter.textContent =
        String(galleryIndex + 1).padStart(2, "0") +
        " / " +
        String(total).padStart(2, "0");
    }
  }

  function moveGallery(direction) {
    renderGallery(galleryIndex + direction);
  }

  if (galleryWindow && galleryCards.length) {
    // Click any photo to bring it to the center.
    galleryCards.forEach((card, index) => {
      card.addEventListener("click", () => {
        if (Date.now() < suppressClickUntil) return;

        pauseGallery(true);
        renderGallery(index);
      });
    });

    // Previous / next buttons.
    galleryPrev?.addEventListener("click", () => {
      pauseGallery(true);
      moveGallery(-1);
    });

    galleryNext?.addEventListener("click", () => {
      pauseGallery(true);
      moveGallery(1);
    });

    // Pause / resume button.
    galleryPause?.addEventListener("click", () => {
      pauseGallery(!galleryPaused);
    });

    // Mobile swipe support.
    let touchStartX = 0;
    let touchStartY = 0;
    let suppressClickUntil = 0;

    galleryWindow.addEventListener(
      "touchstart",
      (event) => {
        touchStartX = event.changedTouches[0].screenX;
        touchStartY = event.changedTouches[0].screenY;
      },
      { passive: true },
    );

    galleryWindow.addEventListener(
      "touchend",
      (event) => {
        const dx = event.changedTouches[0].screenX - touchStartX;

        const dy = event.changedTouches[0].screenY - touchStartY;

        if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.2) {
          suppressClickUntil = Date.now() + 350;

          pauseGallery(true);

          moveGallery(dx < 0 ? 1 : -1);
        }
      },
      { passive: true },
    );

    // Keyboard navigation.
    galleryWindow.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        pauseGallery(true);
        moveGallery(-1);
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        pauseGallery(true);
        moveGallery(1);
      }
    });

    // Only autoplay while Gallery is visible.
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          galleryVisible = entries[0].isIntersecting;
        },
        { threshold: 0.15 },
      );

      observer.observe(galleryWindow);
    }

    // Slow autoplay: every 7 seconds.
    window.setInterval(() => {
      if (galleryPaused || !galleryVisible || document.hidden) {
        return;
      }

      moveGallery(1);
    }, 7000);

    // Recalculate spacing on screen resize.
    window.addEventListener("resize", () => {
      renderGallery(galleryIndex);
    });

    // Initial view.
    renderGallery(0);
    updatePauseButton();
  }

  // ............ END GALLERY ............

  // ==========================================================
  // PART 2: TEN HEALTHCARE PROBLEMS
  // All dashboard values are illustrative, not real data.
  // ==========================================================

  const problems = [
    {
      title: "Revenue Leakage",
      tag: "REVENUE WORKFLOW",
      description:
        "Explore how clearer billing visibility could help teams identify missed charges and follow up.",
      steps: [
        "Review unbilled items",
        "Coordinate follow-ups",
        "Track resolution",
      ],
      status: ["Review", "Tracked"],
    },

    {
      title: "Pharmacy Wastage",
      tag: "PHARMACY WORKFLOW",
      description:
        "Explore ways to monitor medicine stock, identify expiry risks and support better inventory planning.",
      steps: ["Review stock levels", "Flag expiry risks", "Plan replenishment"],
      status: ["Monitor", "Planned"],
    },

    {
      title: "Insurance",
      tag: "CLAIMS WORKFLOW",
      description:
        "Explore a clearer way to review claim progress, documentation and coordination between teams.",
      steps: [
        "Review claim status",
        "Check documents",
        "Coordinate next action",
      ],
      status: ["Review", "Tracked"],
    },

    {
      title: "Discharge",
      tag: "DISCHARGE WORKFLOW",
      description:
        "Explore how connected discharge tasks could support smoother communication between hospital teams.",
      steps: [
        "Review discharge tasks",
        "Connect care teams",
        "Track readiness",
      ],
      status: ["Pending", "Coordinated"],
    },

    {
      title: "Bed Management",
      tag: "HOSPITAL OPERATIONS",
      description:
        "Explore better visibility into bed occupancy, availability and turnover for hospital teams.",
      steps: [
        "Review occupancy",
        "Monitor bed turnover",
        "Coordinate allocation",
      ],
      status: ["Visible", "Tracked"],
    },

    {
      title: "Laboratory",
      tag: "LABORATORY WORKFLOW",
      description:
        "Explore connected sample tracking and report coordination from testing to result delivery.",
      steps: [
        "Track sample status",
        "Review report progress",
        "Coordinate delivery",
      ],
      status: ["Tracked", "Connected"],
    },

    {
      title: "Doctor Productivity",
      tag: "CLINICAL WORKFLOW",
      description:
        "Explore ways to simplify routine documentation and help clinicians focus on patient care.",
      steps: [
        "Simplify documentation",
        "Improve workflow visibility",
        "Support care time",
      ],
      status: ["Simplify", "Support"],
    },

    {
      title: "Patient Engagement",
      tag: "PATIENT WORKFLOW",
      description:
        "Explore reminders, communication and follow-up coordination throughout the patient journey.",
      steps: ["Plan reminders", "Coordinate follow-ups", "Track communication"],
      status: ["Planned", "Connected"],
    },

    {
      title: "Patient Identity",
      tag: "PATIENT RECORDS",
      description:
        "Explore ways to reduce duplicate records and support consistent patient information across workflows.",
      steps: [
        "Review identity records",
        "Reduce duplicate entries",
        "Coordinate records",
      ],
      status: ["Review", "Aligned"],
    },

    {
      title: "Prescription Coordination",
      tag: "CONNECTED PRESCRIPTIONS",
      description:
        "Explore how prescription information could connect doctors, patients and pharmacies more smoothly.",
      steps: [
        "Review prescriptions",
        "Connect pharmacy workflows",
        "Track medicine readiness",
      ],
      status: ["Connected", "Planned"],
    },
  ];

  // Localized names and descriptions for the new section.
  const translations = {
    en: {
      eyebrow: "WHY CARELYNX",
      heading1: "10 Problems.",
      heading2: "One Platform.",
      intro:
        "Explore the healthcare workflow challenges CareLynx aims to address.",
      disclaimer:
        "Illustrative concepts only. CareLynx features are under development/testing. This is not a live dashboard.",
      galleryHint: "Swipe, use the arrows or select a photo to explore.",
      concept: "Concept Preview",
      dashboard: "Workflow Overview",
      workflow: "WORKFLOW",
      coordination: "COORDINATION",
      status: "Concept status",
      chart: "Workflow Activity",
      illustrative: "Illustrative",
      connected: "Connected",
      demo: "DEMO UI",
    },

    gu: {
      eyebrow: "CARELYNX શા માટે",
      heading1: "10 સમસ્યાઓ.",
      heading2: "એક પ્લેટફોર્મ.",
      intro:
        "CareLynx કઈ આરોગ્યસેવા સંબંધિત સમસ્યાઓ માટે ઉકેલો વિકસાવવાનું લક્ષ્ય રાખે છે તે જાણો.",
      disclaimer:
        "આ ફક્ત સમજાવવા માટેના ઉદાહરણો છે. CareLynx ની સુવિધાઓ વિકાસ અને પરીક્ષણ હેઠળ છે. આ લાઇવ ડેશબોર્ડ નથી.",
      galleryHint: "ફોટા જોવા સ્વાઇપ કરો, એરો દબાવો અથવા ફોટો પસંદ કરો.",
      concept: "કલ્પનાત્મક પ્રિવ્યૂ",
      dashboard: "વર્કફ્લો ઝાંખી",
      workflow: "પ્રક્રિયા",
      coordination: "સંકલન",
      status: "ઉદાહરણ સ્થિતિ",
      chart: "પ્રક્રિયાની પ્રવૃત્તિ",
      illustrative: "ઉદાહરણ",
      connected: "જોડાયેલું",
      demo: "ડેમો UI",
      names: [
        "આવકનું નુકસાન",
        "ફાર્મસીમાં દવાઓનો બગાડ",
        "વીમા",
        "ડિસ્ચાર્જ",
        "બેડ મેનેજમેન્ટ",
        "લેબોરેટરી",
        "ડૉક્ટરની કાર્યક્ષમતા",
        "દર્દીઓ સાથે જોડાણ",
        "દર્દીની ઓળખ",
        "પ્રિસ્ક્રિપ્શન સંકલન",
      ],
      descriptions: [
        "બિલિંગમાં રહી ગયેલા ચાર્જ ઓળખવા અને યોગ્ય અનુસરણ માટે વધુ સ્પષ્ટ વ્યવસ્થા કેવી રીતે મદદરૂપ થઈ શકે તે જાણો.",
        "દવાઓનો સ્ટોક, એક્સપાયરીનું જોખમ અને ઇન્વેન્ટરી આયોજન વધુ સારી રીતે સંભાળવાના વિચારો.",
        "વીમા ક્લેમની સ્થિતિ, દસ્તાવેજો અને ટીમો વચ્ચેના સંકલનને વધુ સ્પષ્ટ બનાવવાના વિચારો.",
        "હોસ્પિટલની ટીમો વચ્ચે ડિસ્ચાર્જ સંબંધિત કાર્યોનું સંકલન સુધારવાના વિચારો.",
        "હોસ્પિટલમાં બેડની ઉપલબ્ધતા, ઉપયોગ અને ફેરબદલીની માહિતી વધુ સ્પષ્ટ બનાવવાના વિચારો.",
        "સેમ્પલ ટ્રેકિંગથી લઈને રિપોર્ટ પહોંચાડવા સુધીની પ્રક્રિયા જોડવાના વિચારો.",
        "નિયમિત દસ્તાવેજીકરણ સરળ બનાવી ડૉક્ટરોને દર્દીઓ માટે વધુ સમય આપવામાં મદદરૂપ વિચારો.",
        "દર્દીઓને રિમાઇન્ડર, માહિતી અને ફોલો-અપ દ્વારા વધુ સારી રીતે જોડવાના વિચારો.",
        "ડુપ્લિકેટ રેકોર્ડ ઘટાડવા અને દર્દીની માહિતી સુસંગત રાખવાના વિચારો.",
        "ડૉક્ટર, દર્દી અને ફાર્મસી વચ્ચે પ્રિસ્ક્રિપ્શનની માહિતી જોડવાના વિચારો.",
      ],
      steps: ["પ્રક્રિયાની સમીક્ષા", "ટીમો વચ્ચે સંકલન", "સ્થિતિની સ્પષ્ટતા"],
      statuses: ["સમીક્ષા", "સંકલન"],
    },

    hi: {
      eyebrow: "CARELYNX क्यों",
      heading1: "10 समस्याएँ.",
      heading2: "एक प्लेटफ़ॉर्म.",
      intro:
        "जानें कि CareLynx किन स्वास्थ्य सेवा प्रक्रियाओं की चुनौतियों का समाधान विकसित करना चाहता है।",
      disclaimer:
        "ये केवल उदाहरण हैं। CareLynx की सुविधाएँ विकास और परीक्षण के चरण में हैं। यह लाइव डैशबोर्ड नहीं है।",
      galleryHint: "फ़ोटो देखने के लिए स्वाइप करें, एरो दबाएँ या फ़ोटो चुनें।",
      concept: "कॉन्सेप्ट प्रीव्यू",
      dashboard: "वर्कफ़्लो अवलोकन",
      workflow: "प्रक्रिया",
      coordination: "समन्वय",
      status: "उदाहरण स्थिति",
      chart: "प्रक्रिया गतिविधि",
      illustrative: "उदाहरण",
      connected: "जुड़ा हुआ",
      demo: "डेमो UI",
      names: [
        "राजस्व में कमी",
        "फार्मेसी में दवाओं की बर्बादी",
        "बीमा",
        "डिस्चार्ज",
        "बेड मैनेजमेंट",
        "प्रयोगशाला",
        "डॉक्टर की उत्पादकता",
        "मरीजों से जुड़ाव",
        "मरीज की पहचान",
        "प्रिस्क्रिप्शन समन्वय",
      ],
      descriptions: [
        "छूटे हुए बिलिंग शुल्क पहचानने और उन पर कार्रवाई करने के लिए बेहतर जानकारी की संभावनाएँ।",
        "दवाओं के स्टॉक, एक्सपायरी जोखिम और इन्वेंटरी योजना को बेहतर बनाने के विचार।",
        "बीमा क्लेम की स्थिति, दस्तावेज़ और टीम समन्वय को अधिक स्पष्ट बनाने के विचार।",
        "अस्पताल की टीमों के बीच डिस्चार्ज से जुड़े कार्यों में बेहतर समन्वय के विचार।",
        "बेड की उपलब्धता, उपयोग और टर्नओवर को अधिक स्पष्ट रूप से देखने के विचार।",
        "सैंपल ट्रैकिंग से रिपोर्ट डिलीवरी तक प्रक्रियाओं को जोड़ने के विचार।",
        "दस्तावेज़ीकरण सरल करके डॉक्टरों को मरीजों के लिए अधिक समय देने में सहायता के विचार।",
        "रिमाइंडर, संचार और फ़ॉलो-अप से मरीजों के साथ बेहतर जुड़ाव के विचार।",
        "डुप्लिकेट रिकॉर्ड कम करने और मरीज की जानकारी को सुसंगत रखने के विचार।",
        "डॉक्टर, मरीज और फार्मेसी के बीच प्रिस्क्रिप्शन जानकारी जोड़ने के विचार।",
      ],
      steps: ["प्रक्रिया की समीक्षा", "टीमों में समन्वय", "स्थिति की स्पष्टता"],
      statuses: ["समीक्षा", "समन्वय"],
    },
  };

  const problemTabs = Array.from(document.querySelectorAll(".cl-problem-tab"));

  const problemPanel = document.getElementById("clProblemPanel");

  let selectedProblem = 0;

  function putText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  // Update text without removing an icon child.
  function putTrailingText(selector, value) {
    const el = document.querySelector(selector);
    if (!el) return;

    const last = Array.from(el.childNodes)
      .reverse()
      .find((node) => node.nodeType === Node.TEXT_NODE);

    if (last) {
      last.nodeValue = " " + value;
    }
  }

  function renderProblem(index) {
    if (!problemTabs.length || !problemPanel) return;

    selectedProblem = (index + problems.length) % problems.length;

    const item = problems[selectedProblem];
    const lang = currentLanguage();
    const ui = translations[lang];

    const title = ui.names?.[selectedProblem] || item.title;

    const description = ui.descriptions?.[selectedProblem] || item.description;

    const steps = ui.steps || item.steps;
    const statuses = ui.statuses || item.status;

    problemTabs.forEach((tab, i) => {
      const active = i === selectedProblem;

      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
      tab.setAttribute("tabindex", active ? "0" : "-1");

      const label = tab.querySelector(".cl-problem-label");
      if (label) {
        label.textContent = ui.names?.[i] || problems[i].title;
      }
    });

    problemPanel.setAttribute(
      "aria-labelledby",
      "clProblemTab" + selectedProblem,
    );

    putText(
      "clPreviewTag",
      lang === "en" ? item.tag : ui.dashboard.toUpperCase(),
    );

    putText("clPreviewTitle", title);
    putText("clPreviewDescription", description);

    putText("clStatOne", statuses[0]);
    putText("clStatTwo", statuses[1]);

    putText("clStepOne", steps[0]);
    putText("clStepTwo", steps[1]);
    putText("clStepThree", steps[2]);

    putText(
      "clPreviewCount",
      String(selectedProblem + 1).padStart(2, "0") +
        " / " +
        String(problems.length).padStart(2, "0"),
    );

    // Refresh subtle dashboard entrance animation.
    problemPanel.classList.remove("cl-switch");
    void problemPanel.offsetWidth;
    problemPanel.classList.add("cl-switch");
  }

  function updateSectionLanguage() {
    const lang = currentLanguage();
    const ui = translations[lang];

    putText("clProblemsEyebrow", ui.eyebrow);

    const heading = document.getElementById("clProblemsHeading");
    if (heading) {
      const accent = heading.querySelector("span");

      if (heading.firstChild) {
        heading.firstChild.nodeValue = ui.heading1 + " ";
      }

      if (accent) accent.textContent = ui.heading2;
    }

    putText("clProblemsIntro", ui.intro);
    putText("clProblemsDisclaimer", ui.disclaimer);

    const hint = document.querySelector(".cl-gallery-hint");
    if (hint) hint.textContent = ui.galleryHint;

    putText("clDashboardHeading", ui.dashboard);

    putTrailingText(".cl-preview-indicator", ui.concept);
    putTrailingText(".cl-dashboard-live", ui.connected);
    putTrailingText(".cl-chart-legend", ui.illustrative);

    const demo = document.querySelector(".cl-dashboard-demo");
    if (demo) demo.textContent = ui.demo;

    const statLabels = document.querySelectorAll(".cl-stat-card > span");

    if (statLabels[0]) statLabels[0].textContent = ui.workflow;
    if (statLabels[1]) statLabels[1].textContent = ui.coordination;

    document
      .querySelectorAll(".cl-stat-card small")
      .forEach((el) => (el.textContent = ui.status));

    const chartTitle = document.querySelector(
      ".cl-chart-top > span:first-child",
    );

    if (chartTitle) chartTitle.textContent = ui.chart;

    updatePauseButton();
    renderProblem(selectedProblem);
  }

  // Click problem tabs.
  problemTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      renderProblem(index);
    });

    // Accessible tab navigation.
    tab.addEventListener("keydown", (event) => {
      let next = null;

      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        next = (index + 1) % problemTabs.length;
      }

      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        next = (index - 1 + problemTabs.length) % problemTabs.length;
      }

      if (event.key === "Home") next = 0;
      if (event.key === "End") next = problemTabs.length - 1;

      if (next !== null) {
        event.preventDefault();
        renderProblem(next);
        problemTabs[next].focus();
      }
    });
  });

  // Previous and next problem buttons.
  document.getElementById("clProblemPrev")?.addEventListener("click", () => {
    renderProblem(selectedProblem - 1);
  });

  document.getElementById("clProblemNext")?.addEventListener("click", () => {
    renderProblem(selectedProblem + 1);
  });

  // Keep new section synchronized with existing language selector.
  document
    .getElementById("languageSelect")
    ?.addEventListener("change", updateSectionLanguage);

  // Initial language and dashboard.
  updateSectionLanguage();

  // ==========================================================
  // END: CARELYNX INTERACTIVE GALLERY + 10 PROBLEMS
  // ==========================================================
});
