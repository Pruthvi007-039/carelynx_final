/* ============================================================
   CARELYNX — 10 PROBLEMS INTERACTIVE 3D SHOWCASE
   Separate from Hero 3D and Gallery
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("carelynx-problems");
  if (!root) return;

  // ----------------------------------------------------------
  // 1. TEN PROBLEMS CONTENT
  // ----------------------------------------------------------

  const data = [
    [
      "Revenue Leakage",
      "REVENUE WORKFLOW",
      "Explore how clearer billing visibility could help teams identify missed charges and follow up.",
    ],
    [
      "Pharmacy Wastage",
      "PHARMACY WORKFLOW",
      "Explore medicine stock visibility, expiry alerts and more informed inventory planning.",
    ],
    [
      "Insurance",
      "CLAIMS WORKFLOW",
      "Make claim documents, status updates and team coordination easier to understand.",
    ],
    [
      "Discharge",
      "DISCHARGE WORKFLOW",
      "Bring discharge tasks, care teams and readiness updates into a clearer workflow.",
    ],
    [
      "Bed Management",
      "HOSPITAL OPERATIONS",
      "Explore occupancy, availability and bed turnover in one coordinated view.",
    ],
    [
      "Laboratory",
      "LABORATORY WORKFLOW",
      "Follow sample processing and report coordination from collection to delivery.",
    ],
    [
      "Doctor Productivity",
      "CLINICAL WORKFLOW",
      "Simplify routine documentation and help doctors focus more on patient care.",
    ],
    [
      "Patient Engagement",
      "PATIENT WORKFLOW",
      "Explore connected reminders, communication and follow-up coordination.",
    ],
    [
      "Patient Identity",
      "PATIENT RECORDS",
      "Reduce duplicate records and improve consistency of patient information.",
    ],
    [
      "Prescription Coordination",
      "CONNECTED PRESCRIPTIONS",
      "Connect prescription information across doctors, patients and pharmacies.",
    ],
  ];

  // ----------------------------------------------------------
  // 2. ICONS FOR PROBLEM BUTTONS
  // ----------------------------------------------------------

  const icons = [
    // Revenue
    '<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v5c0 2 14 2 14 0V6M5 11v5c0 2 14 2 14 0v-5M5 16v3c0 2 14 2 14 0v-3"/>',

    // Pharmacy
    '<path d="M8 4a4 4 0 0 0-4 4v1a4 4 0 0 0 8 0V8a4 4 0 0 0-4-4ZM6 12l5-7M15 13l5 5M13 15a4 4 0 0 1 6-5l3 3a4 4 0 0 1-6 6l-3-3Z"/>',

    // Insurance
    '<path d="M12 2 4 5v6c0 5 3 8 8 11 5-3 8-6 8-11V5l-8-3Z"/><path d="m9 12 2 2 4-4"/>',

    // Discharge
    '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V2h6v2M9 10h6M9 14h6M9 18h4"/>',

    // Bed
    '<path d="M3 19V9M21 19V9M3 15h18M5 15V9h14v6M5 11h14M3 19v2M21 19v2"/>',

    // Laboratory
    '<path d="M9 2h6M10 2v7L4 19a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3L14 9V2M7 16h10"/>',

    // Doctor
    '<path d="M6 3v5a6 6 0 0 0 12 0V3M3 4h3M18 4h3M12 14v3a4 4 0 1 0 4-4"/><circle cx="16" cy="13" r="2"/>',

    // Engagement
    '<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2"/><path d="M2 21v-3a7 7 0 0 1 14 0v3M17 15a5 5 0 0 1 5 5v1"/>',

    // Identity
    '<rect x="2" y="4" width="20" height="16" rx="2"/><circle cx="8" cy="11" r="3"/><path d="M4 18c0-3 8-3 8 0M15 9h5M15 13h5M15 17h4"/>',

    // Prescription
    '<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M9 7h6M8 13h8M8 17h5"/>',
  ];

  // ----------------------------------------------------------
  // 3. LANGUAGE SUPPORT
  // ----------------------------------------------------------

  const translations = {
    gu: {
      names: [
        "આવકનું નુકસાન",
        "ફાર્મસીમાં બગાડ",
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
        "બિલિંગમાં રહી ગયેલા ચાર્જ અને અનુસરણની પ્રક્રિયા વધુ સ્પષ્ટ બનાવવાના વિચારો.",
        "દવાઓના સ્ટોક અને એક્સપાયરી વિશે વધુ સારી માહિતી મેળવવાના વિચારો.",
        "વીમા ક્લેમના દસ્તાવેજો અને સ્થિતિનું સંકલન સરળ બનાવવાના વિચારો.",
        "ડિસ્ચાર્જ સંબંધિત કાર્યો અને ટીમોનું સંકલન સુધારવાના વિચારો.",
        "બેડની ઉપલબ્ધતા, ઉપયોગ અને ફેરબદલીનું સંકલન સુધારવાના વિચારો.",
        "સેમ્પલથી રિપોર્ટ સુધીની પ્રક્રિયા જોડવાના વિચારો.",
        "નિયમિત દસ્તાવેજીકરણ સરળ બનાવી દર્દીઓ માટે વધુ સમય આપવાના વિચારો.",
        "રિમાઇન્ડર અને ફોલો-અપ દ્વારા દર્દીઓ સાથે જોડાણ સુધારવાના વિચારો.",
        "ડુપ્લિકેટ રેકોર્ડ ઘટાડીને દર્દીની માહિતી સુસંગત રાખવાના વિચારો.",
        "ડૉક્ટર, દર્દી અને ફાર્મસી વચ્ચે પ્રિસ્ક્રિપ્શન માહિતી જોડવાના વિચારો.",
      ],

      intro:
        "CareLynx જે આરોગ્યસેવા સંબંધિત પડકારો માટે ઉકેલો વિકસાવવાનું લક્ષ્ય રાખે છે.",

      disclaimer:
        "આ માત્ર કલ્પનાત્મક ઉદાહરણો છે. CareLynx ની સુવિધાઓ વિકાસ અને પરીક્ષણ હેઠળ છે.",

      preview: "3D કલ્પનાત્મક પ્રિવ્યૂ",
    },

    hi: {
      names: [
        "राजस्व में कमी",
        "फार्मेसी में बर्बादी",
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
        "छूटे हुए बिलिंग शुल्क और फ़ॉलो-अप को स्पष्ट बनाने के विचार।",
        "दवाओं के स्टॉक और एक्सपायरी की बेहतर जानकारी के विचार।",
        "बीमा क्लेम के दस्तावेज़ और स्थिति के बेहतर समन्वय के विचार।",
        "डिस्चार्ज कार्यों और टीम समन्वय को आसान बनाने के विचार।",
        "बेड की उपलब्धता और उपयोग की स्पष्ट जानकारी के विचार।",
        "सैंपल से रिपोर्ट तक की प्रक्रिया जोड़ने के विचार।",
        "दस्तावेज़ीकरण सरल करके मरीजों के लिए अधिक समय देने के विचार।",
        "रिमाइंडर और फ़ॉलो-अप के माध्यम से मरीजों से जुड़ाव के विचार।",
        "डुप्लिकेट रिकॉर्ड घटाने और मरीज की जानकारी एकसमान रखने के विचार।",
        "डॉक्टर, मरीज और फार्मेसी के बीच प्रिस्क्रिप्शन जानकारी जोड़ने के विचार।",
      ],

      intro:
        "CareLynx जिन स्वास्थ्य सेवा चुनौतियों के लिए समाधान विकसित करना चाहता है।",

      disclaimer:
        "ये केवल कॉन्सेप्ट उदाहरण हैं। CareLynx की सुविधाएँ विकास और परीक्षण के चरण में हैं।",

      preview: "3D कॉन्सेप्ट प्रीव्यू",
    },
  };

  // ----------------------------------------------------------
  // 4. DOM ELEMENTS
  // ----------------------------------------------------------

  const tabs = document.getElementById("cl3dTabs");
  const title = document.getElementById("cl3dTitle");
  const description = document.getElementById("cl3dDescription");
  const category = document.getElementById("cl3dCategory");
  const counter = document.getElementById("cl3dCounter");
  const dots = document.getElementById("cl3dDots");
  const stage = document.getElementById("cl3dStage");

  let selected = 0;
  let showScene = () => {};

  function currentLanguage() {
    const value =
      document.getElementById("languageSelect")?.value ||
      document.documentElement.lang;

    return ["gu", "hi"].includes(value) ? value : "en";
  }

  function iconSvg(path) {
    return `
      <svg viewBox="0 0 24 24"
           fill="none"
           stroke="currentColor"
           stroke-width="1.7"
           stroke-linecap="round"
           stroke-linejoin="round"
           aria-hidden="true">
        ${path}
      </svg>
    `;
  }

  // ----------------------------------------------------------
  // 5. CREATE BUTTONS AND PAGINATION
  // ----------------------------------------------------------

  tabs.innerHTML = data
    .map(
      (item, i) => `
    <button
      type="button"
      class="cl3d-tab"
      data-index="${i}"
      aria-pressed="false"
    >
      <span class="cl3d-tab-icon">
        ${iconSvg(icons[i])}
      </span>

      <span class="cl3d-tab-number">
        ${String(i + 1).padStart(2, "0")}
      </span>

      <span class="cl3d-tab-name"></span>
    </button>
  `,
    )
    .join("");

  dots.innerHTML = data
    .map(
      (item, i) => `
    <button
      type="button"
      data-index="${i}"
      aria-label="Show problem ${i + 1}"
    ></button>
  `,
    )
    .join("");

  // ----------------------------------------------------------
  // 6. UPDATE SELECTED PROBLEM
  // ----------------------------------------------------------

  function render(index, scrollTab = true) {
    selected = (index + data.length) % data.length;

    const language = currentLanguage();
    const translated = translations[language];
    const item = data[selected];

    document.getElementById("cl3dHeading").innerHTML =
      language === "gu"
        ? "10 સમસ્યાઓ. <span>એક પ્લેટફોર્મ.</span>"
        : language === "hi"
          ? "10 समस्याएँ. <span>एक प्लेटफ़ॉर्म.</span>"
          : "10 Problems. <span>One Platform.</span>";

    document.getElementById("cl3dIntro").textContent =
      translated?.intro ||
      "Explore the healthcare workflow challenges CareLynx aims to address.";

    document.getElementById("cl3dDisclaimer").textContent =
      translated?.disclaimer ||
      "Illustrative concepts only. CareLynx features are under development/testing. This is not a live dashboard.";

    document.getElementById("cl3dPreviewLabel").textContent =
      translated?.preview || "3D Concept Preview";

    title.textContent = translated?.names[selected] || item[0];

    description.textContent = translated?.descriptions[selected] || item[2];

    category.textContent = item[1];

    counter.textContent = `${String(selected + 1).padStart(2, "0")} / 10`;

    tabs.querySelectorAll("button").forEach((button, i) => {
      const active = i === selected;

      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));

      button.querySelector(".cl3d-tab-name").textContent =
        translated?.names[i] || data[i][0];
    });

    dots.querySelectorAll("button").forEach((button, i) => {
      button.classList.toggle("is-active", i === selected);

      button.setAttribute("aria-current", i === selected ? "true" : "false");
    });

    // Keep selected mobile tab in view.
    if (scrollTab && window.innerWidth < 700) {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      tabs.querySelector(`[data-index="${selected}"]`)?.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "nearest",
        inline: "center",
      });
    }

    // Change actual 3D model.
    showScene(selected);
  }

  tabs.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-index]");

    if (button) {
      render(Number(button.dataset.index));
    }
  });

  dots.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-index]");

    if (button) {
      render(Number(button.dataset.index));
    }
  });

  document
    .getElementById("cl3dPrev")
    .addEventListener("click", () => render(selected - 1));

  document
    .getElementById("cl3dNext")
    .addEventListener("click", () => render(selected + 1));

  document
    .getElementById("languageSelect")
    ?.addEventListener("change", () => render(selected, false));

  render(0, false);

  // ----------------------------------------------------------
  // 7. LOAD THREE.JS INDEPENDENTLY
  // ----------------------------------------------------------

  import("https://cdn.jsdelivr.net/npm/three@0.160.1/build/three.module.js")
    .then((THREE) => initThree(THREE))
    .catch((error) => {
      console.error("CareLynx 3D preview:", error);

      stage.innerHTML = `
        <div class="cl3d-fallback">
          CareLynx
          <small>3D preview unavailable</small>
        </div>
      `;
    });

  // ==========================================================
  // 8. REAL THREE.JS SCENE
  // ==========================================================

  function initThree(THREE) {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "low-power",
    });

    renderer.setPixelRatio(
      Math.min(
        window.devicePixelRatio || 1,
        window.innerWidth < 700 ? 1.25 : 1.6,
      ),
    );

    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    stage.querySelector(".cl3d-loading")?.remove();
    stage.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);

    // --------------------------------------------------------
    // LIGHTING
    // --------------------------------------------------------

    scene.add(new THREE.AmbientLight(0xffffff, 2.15));

    const keyLight = new THREE.DirectionalLight(0xffffff, 3);

    keyLight.position.set(-4, 8, 6);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0x00f2da, 65, 14);

    rimLight.position.set(3, 3, 2);
    scene.add(rimLight);

    // --------------------------------------------------------
    // MATERIALS
    // --------------------------------------------------------

    const metal = new THREE.MeshStandardMaterial({
      color: 0x244b69,
      metalness: 0.66,
      roughness: 0.29,
    });

    const white = new THREE.MeshStandardMaterial({
      color: 0xeafaff,
      metalness: 0.15,
      roughness: 0.3,
    });

    const teal = new THREE.MeshStandardMaterial({
      color: 0x00cfbd,
      emissive: 0x007a73,
      emissiveIntensity: 0.55,
      metalness: 0.3,
      roughness: 0.25,
    });

    const gold = new THREE.MeshStandardMaterial({
      color: 0xffc76b,
      metalness: 0.8,
      roughness: 0.2,
    });

    const blue = new THREE.MeshStandardMaterial({
      color: 0x4daeff,
      metalness: 0.28,
      roughness: 0.32,
    });

    const dark = new THREE.MeshStandardMaterial({
      color: 0x0b253b,
      metalness: 0.3,
      roughness: 0.35,
    });

    // --------------------------------------------------------
    // BASIC 3D SHAPE HELPERS
    // --------------------------------------------------------

    function mesh(group, geometry, material, x = 0, y = 0, z = 0) {
      const object = new THREE.Mesh(geometry, material);

      object.position.set(x, y, z);
      group.add(object);

      return object;
    }

    function box(group, w, h, d, x, y, z, material) {
      return mesh(group, new THREE.BoxGeometry(w, h, d), material, x, y, z);
    }

    function ball(group, radius, x, y, z, material) {
      return mesh(
        group,
        new THREE.SphereGeometry(radius, 18, 12),
        material,
        x,
        y,
        z,
      );
    }

    function cylinder(group, radius, height, x, y, z, material) {
      return mesh(
        group,
        new THREE.CylinderGeometry(radius, radius, height, 28),
        material,
        x,
        y,
        z,
      );
    }

    function ring(group, radius, x, y, z, material) {
      const object = mesh(
        group,
        new THREE.TorusGeometry(radius, 0.025, 8, 96),
        material,
        x,
        y,
        z,
      );

      object.rotation.x = Math.PI / 2;

      return object;
    }

    // --------------------------------------------------------
    // TEXT LABELS INSIDE 3D SPACE
    // --------------------------------------------------------

    function label(group, text, x, y, z, width = 1.3, color = "#d8ffff") {
      const canvas = document.createElement("canvas");

      canvas.width = 512;
      canvas.height = 128;

      const context = canvas.getContext("2d");

      context.fillStyle = color;
      context.font = "bold 54px Arial";
      context.textAlign = "center";

      context.fillText(text, 256, 82);

      const texture = new THREE.CanvasTexture(canvas);

      const sprite = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: texture,
          transparent: true,
          depthWrite: false,
        }),
      );

      sprite.position.set(x, y, z);

      sprite.scale.set(width, width / 4, 1);

      group.add(sprite);

      return sprite;
    }

    // --------------------------------------------------------
    // 3D DOCUMENT
    // --------------------------------------------------------

    function documentModel(group, x, y, z, material = white) {
      const model = new THREE.Group();

      model.position.set(x, y, z);
      group.add(model);

      box(model, 0.72, 0.96, 0.07, 0, 0, 0, material);

      for (let i = 0; i < 4; i++) {
        box(model, 0.47, 0.025, 0.01, 0, 0.24 - i * 0.14, 0.048, blue);
      }

      box(model, 0.18, 0.16, 0.02, 0.17, -0.28, 0.05, teal);

      return model;
    }

    // --------------------------------------------------------
    // 3D MEDICINE BOTTLE
    // --------------------------------------------------------

    function bottle(group, x, y, z, material = blue) {
      const model = new THREE.Group();

      model.position.set(x, y, z);
      group.add(model);

      cylinder(model, 0.19, 0.56, 0, 0.34, 0, material);

      cylinder(model, 0.14, 0.15, 0, 0.69, 0, white);

      box(model, 0.29, 0.15, 0.04, 0, 0.32, 0.18, white);

      return model;
    }

    // --------------------------------------------------------
    // 3D HOSPITAL BED
    // --------------------------------------------------------

    function bed(group, x, y, z) {
      const model = new THREE.Group();

      model.position.set(x, y, z);
      group.add(model);

      box(model, 1.15, 0.16, 0.58, 0, 0.39, 0, white);

      box(model, 1.2, 0.1, 0.62, 0, 0.28, 0, blue);

      box(model, 0.15, 0.58, 0.65, -0.57, 0.55, 0, metal);

      box(model, 0.11, 0.42, 0.65, 0.57, 0.47, 0, metal);

      box(model, 0.27, 0.09, 0.44, -0.35, 0.52, 0, teal);

      return model;
    }

    // --------------------------------------------------------
    // 3D LAB FLASK
    // --------------------------------------------------------

    function flask(group, x, y, z) {
      const model = new THREE.Group();

      model.position.set(x, y, z);
      group.add(model);

      cylinder(model, 0.1, 0.54, 0, 0.68, 0, white);

      const liquid = mesh(
        model,
        new THREE.ConeGeometry(0.4, 0.68, 32),
        teal,
        0,
        0.19,
        0,
      );

      liquid.rotation.z = Math.PI;

      cylinder(model, 0.12, 0.08, 0, 0.98, 0, blue);

      return model;
    }

    // --------------------------------------------------------
    // 3D INSURANCE SHIELD
    // --------------------------------------------------------

    function shield(group, x, y, z) {
      const shape = new THREE.Shape();

      shape.moveTo(0, 0.66);
      shape.lineTo(0.52, 0.38);
      shape.lineTo(0.45, -0.25);

      shape.quadraticCurveTo(0, -0.76, -0.45, -0.25);

      shape.lineTo(-0.52, 0.38);
      shape.closePath();

      const object = mesh(
        group,
        new THREE.ExtrudeGeometry(shape, {
          depth: 0.13,
          bevelEnabled: true,
          bevelThickness: 0.035,
          bevelSize: 0.03,
          bevelSegments: 2,
        }),
        blue,
        x,
        y,
        z,
      );

      label(group, "✓", x, y, z + 0.2, 0.5);

      return object;
    }

    // --------------------------------------------------------
    // 3D PERSON
    // --------------------------------------------------------

    function person(group, x, y, z) {
      ball(group, 0.22, x, y + 0.69, z, white);

      cylinder(group, 0.24, 0.6, x, y + 0.21, z, blue);
    }

    // --------------------------------------------------------
    // 3D ID CARD
    // --------------------------------------------------------

    function idCard(group, x, y, z) {
      const model = documentModel(group, x, y, z, white);

      ball(model, 0.13, -0.18, 0.09, 0.09, blue);

      box(model, 0.24, 0.04, 0.02, 0.14, 0.07, 0.09, teal);

      return model;
    }

    // ========================================================
    // 9. BUILD COMMON 3D LAPTOP AND PLATFORM
    // ========================================================

    const world = new THREE.Group();
    scene.add(world);

    // Circular 3D platform
    cylinder(world, 2.75, 0.12, 0, -0.12, 0, metal);

    const glowRing = ring(world, 2.75, 0, -0.035, 0, teal);

    const orbitRing = ring(world, 2.45, 0, 0.04, 0, teal);

    orbitRing.scale.set(1, 0.8, 1);

    // Main laptop
    const laptop = new THREE.Group();

    laptop.position.set(-0.7, 0, 0);
    world.add(laptop);

    const frame = box(laptop, 3.2, 1.96, 0.16, 0, 1.65, -0.35, metal);

    frame.rotation.x = -0.09;

    const display = box(laptop, 2.99, 1.75, 0.025, 0, 1.65, -0.255, white);

    display.rotation.x = -0.09;

    // Laptop keyboard and base
    box(laptop, 3.55, 0.1, 1.65, 0, 0.62, 0.48, metal);

    box(laptop, 2.6, 0.018, 0.82, 0, 0.68, 0.48, dark);

    // Laptop screen branding
    label(laptop, "CareLynx", -0.92, 2.33, -0.19, 0.95, "#074a64");

    box(laptop, 2.75, 0.03, 0.025, 0, 2.11, -0.22, teal);

    // Dashboard chart bars
    const bars = [];

    for (let i = 0; i < 7; i++) {
      const bar = box(
        laptop,
        0.23,
        0.65,
        0.035,
        -0.95 + i * 0.32,
        1.33,
        -0.2,
        teal,
      );

      bars.push(bar);
    }

    // Dashboard widgets
    for (let i = 0; i < 3; i++) {
      box(laptop, 0.55, 0.06, 0.028, -0.78 + i * 0.76, 1.97, -0.2, blue);
    }

    label(laptop, "WORKFLOW OVERVIEW", 0, 1.06, -0.19, 1.55, "#0c6171");

    // ========================================================
    // 10. UNIQUE 3D MODEL FOR EACH PROBLEM
    // ========================================================

    let currentModel = null;

    function makeModel(index) {
      // Remove previous model
      if (currentModel) {
        world.remove(currentModel);

        currentModel.traverse((object) => {
          if (object.geometry) {
            object.geometry.dispose();
          }

          // Dispose text textures.
          if (object.material && object.material.isSpriteMaterial) {
            object.material.map?.dispose();
            object.material.dispose();
          }
        });
      }

      const model = new THREE.Group();

      model.position.set(1.9, 0.18, 0.15);
      world.add(model);

      // ------------------------------------------------------
      // 01. REVENUE LEAKAGE — COINS + BILL
      // ------------------------------------------------------

      if (index === 0) {
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 4 + i; j++) {
            cylinder(
              model,
              0.3,
              0.11,
              -0.6 + i * 0.6,
              0.11 + j * 0.115,
              0,
              gold,
            );
          }
        }

        documentModel(model, 0.8, 0.9, 0.2);

        label(model, "REVENUE", 0, 1.9, 0.15, 1.4);
      }

      // ------------------------------------------------------
      // 02. PHARMACY — MEDICINE BOTTLES + CAPSULE
      // ------------------------------------------------------
      else if (index === 1) {
        bottle(model, -0.55, 0.05, 0);

        bottle(model, 0.15, 0.05, 0.1, teal);

        const capsule = box(model, 0.95, 0.32, 0.3, 0.55, 0.95, 0.1, white);

        capsule.rotation.z = -0.4;

        label(model, "PHARMACY", 0, 1.85, 0.15, 1.5);
      }

      // ------------------------------------------------------
      // 03. INSURANCE — SHIELD + CLAIM DOCUMENT
      // ------------------------------------------------------
      else if (index === 2) {
        shield(model, -0.45, 1, 0.2);

        documentModel(model, 0.7, 0.95, -0.1);

        label(model, "INSURANCE", 0, 1.9, 0.15, 1.5);
      }

      // ------------------------------------------------------
      // 04. DISCHARGE — BED + DISCHARGE DOCUMENT
      // ------------------------------------------------------
      else if (index === 3) {
        bed(model, 0, 0.12, 0);

        documentModel(model, 0.75, 1.35, 0.1);

        label(model, "DISCHARGE", 0, 2.1, 0.15, 1.5);
      }

      // ------------------------------------------------------
      // 05. BED MANAGEMENT — MULTIPLE BEDS
      // ------------------------------------------------------
      else if (index === 4) {
        bed(model, -0.45, 0.12, -0.2);

        const secondBed = bed(model, 0.55, 0.55, -0.35);

        secondBed.scale.set(0.7, 0.7, 0.7);

        label(model, "BED STATUS", 0, 1.9, 0.15, 1.5);
      }

      // ------------------------------------------------------
      // 06. LABORATORY — FLASK + SAMPLE BOTTLES
      // ------------------------------------------------------
      else if (index === 5) {
        flask(model, -0.5, 0.12, 0.2);

        for (let i = 0; i < 3; i++) {
          bottle(model, 0.25 + i * 0.25, 0.12, -0.25, i === 1 ? teal : blue);
        }

        label(model, "LAB REPORTS", 0, 1.9, 0.15, 1.5);
      }

      // ------------------------------------------------------
      // 07. DOCTOR PRODUCTIVITY — DOCTOR + RECORD
      // ------------------------------------------------------
      else if (index === 6) {
        person(model, -0.55, 0.4, 0);

        documentModel(model, 0.55, 1, 0.1);

        label(model, "DOCTORS", 0, 1.95, 0.15, 1.5);
      }

      // ------------------------------------------------------
      // 08. PATIENT ENGAGEMENT — PEOPLE + MESSAGE
      // ------------------------------------------------------
      else if (index === 7) {
        person(model, -0.6, 0.2, 0);

        person(model, 0.45, 0.2, -0.1);

        box(model, 0.75, 0.45, 0.1, 0.25, 1.6, 0.1, white);

        label(model, "FOLLOW UP", 0, 2.1, 0.15, 1.5);
      }

      // ------------------------------------------------------
      // 09. PATIENT IDENTITY — ID CARD + SHIELD
      // ------------------------------------------------------
      else if (index === 8) {
        idCard(model, -0.2, 1.05, 0.1);

        shield(model, 0.65, 0.65, 0.05);

        label(model, "PATIENT ID", 0, 1.95, 0.15, 1.5);
      }

      // ------------------------------------------------------
      // 10. PRESCRIPTION — RX DOCUMENT + MEDICINE
      // ------------------------------------------------------
      else if (index === 9) {
        documentModel(model, -0.4, 1.1, 0.1);

        bottle(model, 0.55, 0.2, 0, teal);

        label(model, "Rx", -0.4, 1.15, 0.23, 0.55, "#0c6171");

        label(model, "PRESCRIPTIONS", 0, 2, 0.15, 1.6);
      }

      currentModel = model;

      // Animate the newly selected model into view.
      model.scale.setScalar(reduceMotion ? 1 : 0.7);

      // Each problem gets a different chart pattern.
      bars.forEach((bar, i) => {
        bar.userData.target = 0.35 + ((i * 3 + index * 5) % 8) / 11;
      });
    }

    showScene = makeModel;

    // First model
    makeModel(selected);

    // ========================================================
    // 11. RESPONSIVE CAMERA
    // ========================================================

    function resize() {
      const width = Math.max(1, stage.clientWidth);
      const height = Math.max(1, stage.clientHeight);

      renderer.setSize(width, height, false);

      camera.aspect = width / height;

      camera.position.set(0, 3.65, width < 650 ? 9.7 : 8.4);

      camera.lookAt(0, 1, 0);
      camera.updateProjectionMatrix();
    }

    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(stage);

    // ========================================================
    // 12. ANIMATION LOOP
    // ========================================================

    let visible = true;
    let animationFrame = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting;

        if (visible && !animationFrame) {
          animationFrame = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.05 },
    );

    observer.observe(stage);

    const clock = new THREE.Clock();

    function animate() {
      animationFrame = 0;

      // Stop rendering while offscreen or tab is hidden.
      if (!visible || document.hidden) {
        return;
      }

      const time = clock.getElapsedTime();

      if (!reduceMotion) {
        // Moving glowing rings
        orbitRing.rotation.z = time * 0.17;
        glowRing.rotation.z = -time * 0.1;

        // Floating selected 3D model
        if (currentModel) {
          currentModel.position.y = 0.18 + Math.sin(time * 1.2) * 0.13;

          currentModel.rotation.y = Math.sin(time * 0.55) * 0.22;

          currentModel.scale.lerp(new THREE.Vector3(1, 1, 1), 0.06);
        }

        // Dashboard chart animation
        bars.forEach((bar, i) => {
          const target = bar.userData.target || 0.7;

          bar.scale.y = target * (0.92 + 0.08 * Math.sin(time * 1.5 + i * 0.7));
        });
      }

      renderer.render(scene, camera);

      animationFrame = requestAnimationFrame(animate);
    }

    // Resume rendering when browser tab becomes active.
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden && visible && !animationFrame) {
        animationFrame = requestAnimationFrame(animate);
      }
    });

    animationFrame = requestAnimationFrame(animate);
  }
});

/* ============================================================
   END: CARELYNX 10 PROBLEMS INTERACTIVE 3D SHOWCASE
   ============================================================ */
