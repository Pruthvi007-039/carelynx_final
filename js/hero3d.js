/* ============================================================
   CARELYNX — LIVING HEALTHCARE CITY
   Three.js 3D Miniature Healthcare Ecosystem

   Hospital + Patient + Pharmacy + Laboratory
                      |
                   CareLynx
                      |
             Floating 3D Smartphone

   Original CareLynx colors and city design preserved.
   ============================================================ */

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.1/build/three.module.js";

import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.160.1/examples/jsm/controls/OrbitControls.js";

const host = document.getElementById("carelynx3d");

if (host) {
  initHealthcareCity(host);
}

function initHealthcareCity(host) {
  /* ============================================================
     SECTION 1: SCENE, CAMERA AND RENDERER
     ============================================================ */

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 200);

  camera.position.set(13, 16, 21);
  camera.lookAt(0, 0, 0);

  let renderer;

  try {
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
  } catch (error) {
    console.warn("3D rendering unavailable:", error);
    return;
  }

  const isMobile = window.matchMedia("(max-width: 700px)").matches;

  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio || 1, isMobile ? 1.75 : 2),
  );

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.35;

  renderer.setClearColor(0x000000, 0);

  host.prepend(renderer.domElement);

  const fallback = document.getElementById("hero3dFallback");

  if (fallback) fallback.remove();

  /* ................ END SECTION 1 ................ */

  /* ============================================================
     SECTION 2: CARELYNX COLORS AND MATERIALS
     ============================================================ */

  const colors = {
    navy: 0x071b35,
    teal: 0x12c5b2,
    gold: 0xe3bb65,
    white: 0xf5f9fc,
    glass: 0x6dcad5,
    road: 0x183a4b,
    green: 0x258b75,
  };

  function material(color, metalness = 0, roughness = 0.65) {
    return new THREE.MeshStandardMaterial({
      color,
      metalness,
      roughness,
    });
  }

  const white = material(colors.white);
  const navy = material(colors.navy);
  const teal = material(colors.teal, 0.25, 0.3);
  const gold = material(colors.gold, 0.35, 0.3);
  const glass = material(colors.glass, 0.2, 0.2);
  const road = material(colors.road);
  const green = material(colors.green);

  /* ................ END SECTION 2 ................ */

  /* ============================================================
     SECTION 3: LIGHTING
     ============================================================ */

  scene.add(new THREE.HemisphereLight(0xe5fbff, 0x274153, 2.5));

  const sunlight = new THREE.DirectionalLight(0xffffff, 3.5);

  sunlight.position.set(-5, 12, 9);
  sunlight.castShadow = true;

  sunlight.shadow.mapSize.set(1024, 1024);
  sunlight.shadow.camera.left = -12;
  sunlight.shadow.camera.right = 12;
  sunlight.shadow.camera.top = 12;
  sunlight.shadow.camera.bottom = -12;

  scene.add(sunlight);

  const hubLight = new THREE.PointLight(colors.teal, 18, 10);

  hubLight.position.set(0, 3, 0);
  scene.add(hubLight);

  /* ................ END SECTION 3 ................ */

  /* ============================================================
     SECTION 4: REUSABLE 3D OBJECT FUNCTIONS
     ============================================================ */

  function box(parent, width, height, depth, mat, x, y, z) {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(width, height, depth),
      mat,
    );

    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    parent.add(mesh);

    return mesh;
  }

  function cylinder(parent, radius, height, mat, x, y, z) {
    const mesh = new THREE.Mesh(
      new THREE.CylinderGeometry(radius, radius, height, 64),
      mat,
    );

    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    parent.add(mesh);

    return mesh;
  }

  function sphere(parent, radius, mat, x, y, z) {
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(radius, 12, 10), mat);

    mesh.position.set(x, y, z);
    mesh.castShadow = true;

    parent.add(mesh);

    return mesh;
  }

  // Floating building labels.
  function createLabel(text, width = 3.0) {
    const canvas = document.createElement("canvas");

    canvas.width = 512;
    canvas.height = 128;

    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "rgba(7,27,53,0.94)";

    ctx.beginPath();
    ctx.roundRect(8, 8, 496, 112, 24);
    ctx.fill();

    ctx.strokeStyle = "#12c5b2";
    ctx.lineWidth = 5;
    ctx.stroke();

    ctx.font = "bold 43px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#ffffff";

    ctx.fillText(text, 256, 65);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;

    const sprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        depthTest: false,
      }),
    );

    sprite.scale.set(width, width / 4, 1);
    sprite.renderOrder = 10;

    return sprite;
  }

  /* ................ END SECTION 4 ................ */

  /* ============================================================
     SECTION 5: CITY PLATFORM AND ROADS
     ============================================================ */

  const city = new THREE.Group();
  scene.add(city);

  box(city, 15.5, 0.35, 12, material(0x15394a), 0, -0.2, 0);

  box(city, 15.1, 0.12, 11.6, material(0x244d56), 0, 0.03, 0);

  // Main roads.
  box(city, 14, 0.04, 1.15, road, 0, 0.12, 0);
  box(city, 1.15, 0.04, 10.5, road, 0, 0.13, 0);

  // Road markings.
  for (let x = -6; x <= 6; x += 1.4) {
    if (Math.abs(x) < 2) continue;

    box(city, 0.55, 0.015, 0.035, white, x, 0.15, 0);
  }

  // Four landscaping pads.
  const positions = [
    [-4.3, -3.2],
    [4.3, -3.2],
    [-4.3, 3.2],
    [4.3, 3.2],
  ];

  positions.forEach(([x, z]) => {
    box(city, 5.2, 0.16, 3.7, material(0x406b70), x, 0.18, z);
  });

  /* ................ END SECTION 5 ................ */

  /* ============================================================
     SECTION 6: HOSPITAL, PHARMACY AND LABORATORY
     ============================================================ */

  function createBuilding(name, x, z, options = {}) {
    const group = new THREE.Group();

    group.position.set(x, 0.3, z);
    city.add(group);

    const w = options.width || 3.4;
    const h = options.height || 2.5;
    const d = options.depth || 2.1;

    // Building structure.
    box(group, w, h, d, white, 0, h / 2, 0);

    // Roof border.
    box(group, w + 0.2, 0.18, d + 0.2, navy, 0, h + 0.08, 0);

    // Decorative teal roof.
    box(group, w * 0.65, 0.12, d * 0.5, teal, 0, h + 0.21, 0);

    // Front glass entrance.
    box(group, 0.85, 1.2, 0.05, glass, 0, 0.6, d / 2 + 0.04);

    // Entrance frame.
    box(group, 1.05, 0.12, 0.2, navy, 0, 1.25, d / 2 + 0.08);

    // Windows.
    for (let row = 0; row < 2; row++) {
      for (let col = -1; col <= 1; col++) {
        const wx = col * 0.9;

        if (row === 0 && col === 0) continue;

        box(
          group,
          0.55,
          0.52,
          0.06,
          glass,
          wx,
          0.65 + row * 0.95,
          d / 2 + 0.04,
        );
      }
    }

    // Side windows.
    for (let row = 0; row < 2; row++) {
      box(group, 0.06, 0.48, 0.65, glass, w / 2 + 0.04, 0.7 + row * 0.9, 0);
    }

    // Medical cross.
    box(group, 0.48, 0.13, 0.08, teal, 0, h - 0.42, d / 2 + 0.08);

    box(group, 0.13, 0.48, 0.08, teal, 0, h - 0.42, d / 2 + 0.09);

    // Building label.
    const label = createLabel(name, 3.2);

    label.position.set(0, h + 1.1, 0);

    group.add(label);

    return group;
  }

  // Hospital.
  const hospital = createBuilding("HOSPITAL", -4.3, -3.2, {
    width: 3.5,
    height: 3.0,
    depth: 2.2,
  });

  // Pharmacy.
  const pharmacy = createBuilding("PHARMACY", -4.3, 3.2, {
    width: 3.4,
    height: 2.0,
    depth: 2.2,
  });

  // Laboratory.
  const laboratory = createBuilding("LABORATORY", 4.3, 3.2, {
    width: 3.4,
    height: 2.4,
    depth: 2.2,
  });

  // Laboratory rooftop equipment.
  box(laboratory, 0.65, 0.45, 0.65, glass, -0.8, 2.75, 0);

  /* ................ END SECTION 6 ................ */

  /* ============================================================
     SECTION 7: PATIENT AREA
     ============================================================ */

  const patientArea = new THREE.Group();

  patientArea.position.set(4.3, 0.3, -3.2);

  city.add(patientArea);

  // Patient reception building.
  box(patientArea, 3.1, 1.6, 1.7, white, 0, 0.8, -0.35);

  box(patientArea, 3.4, 0.18, 2, navy, 0, 1.7, -0.35);

  box(patientArea, 1.4, 1.1, 0.05, glass, 0, 0.65, 0.53);

  const patientLabel = createLabel("PATIENT", 3);

  patientLabel.position.set(0, 2.8, 0);

  patientArea.add(patientLabel);

  // Small 3D human figures.
  function createPerson(parent, x, z, shirtColor) {
    const person = new THREE.Group();

    person.position.set(x, 0, z);

    const shirt = material(shirtColor);
    const skin = material(0xe6b18e);
    const pants = material(0x253e54);

    // Legs.
    box(person, 0.12, 0.42, 0.14, pants, -0.12, 0.21, 0);

    box(person, 0.12, 0.42, 0.14, pants, 0.12, 0.21, 0);

    // Body.
    box(person, 0.43, 0.55, 0.24, shirt, 0, 0.7, 0);

    // Head.
    sphere(person, 0.19, skin, 0, 1.17, 0);

    // Arms.
    box(person, 0.12, 0.46, 0.15, skin, -0.3, 0.7, 0);

    box(person, 0.12, 0.46, 0.15, skin, 0.3, 0.7, 0);

    parent.add(person);

    return person;
  }

  createPerson(patientArea, -0.9, 1.1, colors.teal);

  createPerson(patientArea, 0.1, 1.15, 0x315f95);

  createPerson(patientArea, 1.0, 0.95, 0xe3bb65);

  /* ................ END SECTION 7 ................ */

  /* ============================================================
     SECTION 8: CENTRAL CARELYNX 3D HUB
     ============================================================ */

  const hub = new THREE.Group();

  city.add(hub);

  // Original circular raised central platform.
  cylinder(hub, 1.85, 0.4, navy, 0, 0.4, 0);

  cylinder(hub, 1.7, 0.18, teal, 0, 0.7, 0);

  cylinder(hub, 1.52, 0.65, white, 0, 1.05, 0);

  // Gold decorative ring.
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(1.75, 0.045, 10, 90),
    gold,
  );

  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.83;

  hub.add(ring);

  /* ............ END ORIGINAL CENTRAL PLATFORM ............ */

  /* ============================================================
     SECTION 8A: CREATE FLOATING 3D SMARTPHONE

     This replaces the original center logo sprite only.
     The original circular platform remains unchanged.
     ============================================================ */

  function roundedPhoneShape(width, height, radius) {
    const shape = new THREE.Shape();

    const x = -width / 2;
    const y = -height / 2;

    shape.moveTo(x + radius, y);
    shape.lineTo(x + width - radius, y);

    shape.quadraticCurveTo(x + width, y, x + width, y + radius);

    shape.lineTo(x + width, y + height - radius);

    shape.quadraticCurveTo(
      x + width,
      y + height,
      x + width - radius,
      y + height,
    );

    shape.lineTo(x + radius, y + height);

    shape.quadraticCurveTo(x, y + height, x, y + height - radius);

    shape.lineTo(x, y + radius);

    shape.quadraticCurveTo(x, y, x + radius, y);

    return shape;
  }

  /* ............ END ROUNDED PHONE SHAPE ............ */

  /* ============================================================
     SECTION 8B: PHONE BODY AND MATERIALS
     ============================================================ */

  function createCareLynxPhone() {
    const phone = new THREE.Group();

    phone.name = "CareLynx Floating Smartphone";

    const phoneWidth = 1.45;
    const phoneHeight = 2.85;
    const phoneDepth = 0.16;

    // Titanium-style phone frame.
    const titaniumMaterial = new THREE.MeshStandardMaterial({
      color: 0x586d7b,
      metalness: 0.88,
      roughness: 0.24,
    });

    // Dark screen glass.
    const darkGlassMaterial = new THREE.MeshStandardMaterial({
      color: 0x050c15,
      metalness: 0.2,
      roughness: 0.15,
    });

    // Real 3D rounded phone body.
    const frameGeometry = new THREE.ExtrudeGeometry(
      roundedPhoneShape(phoneWidth, phoneHeight, 0.21),
      {
        depth: phoneDepth,
        steps: 1,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.03,
        bevelSegments: 4,
        curveSegments: 12,
      },
    );

    const frame = new THREE.Mesh(frameGeometry, titaniumMaterial);

    frame.position.z = -phoneDepth / 2;

    frame.castShadow = true;
    frame.receiveShadow = true;

    phone.add(frame);

    // Front black glass.
    const frontGlass = new THREE.Mesh(
      new THREE.ShapeGeometry(roundedPhoneShape(1.39, 2.79, 0.18)),
      darkGlassMaterial,
    );

    frontGlass.position.z = phoneDepth / 2 + 0.034;

    phone.add(frontGlass);

    /* ............ END PHONE BODY ............ */

    /* ==========================================================
       SECTION 8C: CARELYNX PHONE SCREEN
       ========================================================== */

    const screenCanvas = document.createElement("canvas");

    screenCanvas.width = 1024;
    screenCanvas.height = 2048;

    const ctx = screenCanvas.getContext("2d");

    const screenTexture = new THREE.CanvasTexture(screenCanvas);

    screenTexture.colorSpace = THREE.SRGBColorSpace;

    screenTexture.anisotropy = Math.min(
      8,
      renderer.capabilities.getMaxAnisotropy(),
    );

    const screen = new THREE.Mesh(
      new THREE.PlaneGeometry(1.33, 2.73),
      new THREE.MeshBasicMaterial({
        map: screenTexture,
        transparent: true,
        depthWrite: false,
        toneMapped: false,
      }),
    );

    screen.position.z = phoneDepth / 2 + 0.038;

    phone.add(screen);

    // Draw screen and CareLynx branding.
    function drawPhoneScreen(logoImage = null) {
      ctx.clearRect(0, 0, 1024, 2048);

      ctx.save();

      ctx.beginPath();
      ctx.roundRect(0, 0, 1024, 2048, 110);
      ctx.clip();

      // Original CareLynx gradient.
      const background = ctx.createLinearGradient(0, 0, 1024, 2048);

      background.addColorStop(0, "#071b35");

      background.addColorStop(0.58, "#0a354b");

      background.addColorStop(1, "#0b5860");

      ctx.fillStyle = background;

      ctx.fillRect(0, 0, 1024, 2048);

      // Soft teal glow.
      const glow = ctx.createRadialGradient(512, 1020, 50, 512, 1020, 710);

      glow.addColorStop(0, "rgba(18,197,178,0.32)");

      glow.addColorStop(1, "rgba(18,197,178,0)");

      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, 1024, 2048);

      // Phone status bar.
      ctx.fillStyle = "#ffffff";
      ctx.font = "600 39px Arial";
      ctx.textAlign = "left";

      ctx.fillText("9:41", 96, 108);

      // Signal indicators.
      ctx.fillStyle = "#12c5b2";

      for (let i = 0; i < 4; i++) {
        ctx.fillRect(826 + i * 22, 98 - i * 10, 14, 15 + i * 10);
      }

      // White card behind logo.
      ctx.fillStyle = "#ffffff";

      ctx.beginPath();
      ctx.roundRect(108, 680, 808, 670, 65);
      ctx.fill();

      // Draw original CareLynx logo.
      if (logoImage && logoImage.naturalWidth && logoImage.naturalHeight) {
        const maxWidth = 730;
        const maxHeight = 570;

        const scale = Math.min(
          maxWidth / logoImage.naturalWidth,
          maxHeight / logoImage.naturalHeight,
        );

        const imageWidth = logoImage.naturalWidth * scale;

        const imageHeight = logoImage.naturalHeight * scale;

        ctx.drawImage(
          logoImage,
          512 - imageWidth / 2,
          1015 - imageHeight / 2,
          imageWidth,
          imageHeight,
        );
      } else {
        // Temporary text before logo loads.
        ctx.fillStyle = "#071b35";

        ctx.font = "bold 100px Arial";
        ctx.textAlign = "center";

        ctx.fillText("CareLynx", 512, 1040);
      }

      // CareLynx tagline.
      ctx.textAlign = "center";
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 51px Arial";

      ctx.fillText("One Window. One Step.", 512, 1495);

      ctx.fillStyle = "#7ae8dc";
      ctx.font = "34px Arial";

      ctx.fillText("Connected Healthcare", 512, 1560);

      ctx.restore();

      screenTexture.needsUpdate = true;
    }

    // Display initial screen immediately.
    drawPhoneScreen();

    // Load the original CareLynx logo.
    const phoneLogo = new Image();

    phoneLogo.onload = () => {
      drawPhoneScreen(phoneLogo);
    };

    phoneLogo.onerror = () => {
      console.warn(
        "CareLynx phone logo not found: assets/images/carelynx-hero-logo.png",
      );
    };

    phoneLogo.src = "assets/images/carelynx-hero-logo.png";

    /* ............ END PHONE SCREEN ............ */

    /* ==========================================================
       SECTION 8D: PHONE CAMERA AND DETAILS
       ========================================================== */

    // Front Dynamic Island-style detail.
    const island = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.048, 0.19, 4, 12),
      darkGlassMaterial,
    );

    island.rotation.z = Math.PI / 2;

    island.position.set(0, 1.24, phoneDepth / 2 + 0.045);

    phone.add(island);

    // Rear titanium panel.
    const backPanel = new THREE.Mesh(
      new THREE.ShapeGeometry(roundedPhoneShape(1.38, 2.78, 0.18)),
      titaniumMaterial,
    );

    backPanel.rotation.y = Math.PI;

    backPanel.position.z = -phoneDepth / 2 - 0.033;

    phone.add(backPanel);

    // Rear camera module.
    box(phone, 0.56, 0.63, 0.08, darkGlassMaterial, -0.37, 0.94, -0.15);

    const lensMaterial = new THREE.MeshStandardMaterial({
      color: 0x0a182a,
      metalness: 0.48,
      roughness: 0.12,
    });

    const lensPositions = [
      [-0.51, 1.1],
      [-0.23, 1.1],
      [-0.51, 0.83],
    ];

    for (const [x, y] of lensPositions) {
      const lens = new THREE.Mesh(
        new THREE.CylinderGeometry(0.105, 0.105, 0.025, 28),
        lensMaterial,
      );

      lens.rotation.x = Math.PI / 2;

      lens.position.set(x, y, -0.205);

      phone.add(lens);
    }

    // Metallic side buttons.
    box(phone, 0.045, 0.32, 0.085, titaniumMaterial, -0.77, 0.64, 0);

    box(phone, 0.045, 0.24, 0.085, titaniumMaterial, -0.77, 0.17, 0);

    box(phone, 0.045, 0.45, 0.085, titaniumMaterial, 0.77, 0.46, 0);

    return phone;
  }

  /* ............ END CREATE 3D PHONE ............ */

  /* ============================================================
     SECTION 8E: PHONE POSITION ABOVE CENTER HUB
     ============================================================ */

  const carePhone = createCareLynxPhone();

  const phoneBaseY = 2.95;

  carePhone.position.set(0, phoneBaseY, 0);

  hub.add(carePhone);

  // Original glowing accents remain unchanged.
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;

    sphere(
      hub,
      0.065,
      teal,
      Math.cos(angle) * 1.76,
      0.85,
      Math.sin(angle) * 1.76,
    );
  }

  /* ................ END SECTION 8 ................ */

  /* ============================================================
     SECTION 9: ANIMATED HEALTHCARE CONNECTIONS
     ============================================================ */

  const connectionTargets = [
    [-4.3, -3.2],
    [4.3, -3.2],
    [-4.3, 3.2],
    [4.3, 3.2],
  ];

  const connections = [];

  connectionTargets.forEach(([x, z], index) => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.94, 0),

      new THREE.Vector3(x * 0.42, 1.2, z * 0.42),

      new THREE.Vector3(x * 0.8, 0.55, z * 0.8),

      new THREE.Vector3(x, 0.5, z),
    ]);

    const line = new THREE.Mesh(
      new THREE.TubeGeometry(curve, 70, 0.035, 8, false),
      new THREE.MeshBasicMaterial({
        color: colors.teal,
      }),
    );

    city.add(line);

    // Animated gold particle.
    const particle = new THREE.Mesh(
      new THREE.SphereGeometry(0.12, 12, 12),
      new THREE.MeshBasicMaterial({
        color: colors.gold,
      }),
    );

    city.add(particle);

    connections.push({
      curve,
      particle,
      offset: index * 0.25,
    });
  });

  /* ................ END SECTION 9 ................ */

  /* ============================================================
     SECTION 10: TREES AND LANDSCAPING
     ============================================================ */

  function createTree(x, z, scale = 1) {
    const tree = new THREE.Group();

    tree.position.set(x, 0.14, z);
    tree.scale.setScalar(scale);

    cylinder(tree, 0.09, 0.75, material(0x765642), 0, 0.4, 0);

    sphere(tree, 0.5, green, 0, 1.05, 0);

    sphere(tree, 0.38, green, -0.24, 0.85, 0.1);

    city.add(tree);
  }

  [
    [-6.8, -5],
    [-2.0, -4.7],
    [2.0, -4.7],
    [6.8, -5],
    [-6.8, 5],
    [-2.0, 4.9],
    [2.0, 4.9],
    [6.8, 5],
  ].forEach(([x, z], i) => {
    createTree(x, z, 0.65 + (i % 3) * 0.1);
  });

  /* ................ END SECTION 10 ................ */

  /* ============================================================
     SECTION 11: RESPONSIVE CAMERA + TOUCH CONTROLS
     ============================================================ */

  const mobileView = window.matchMedia("(max-width: 700px)").matches;

  camera.position.set(
    mobileView ? 12 : 10,
    mobileView ? 16 : 11,
    mobileView ? 13 : 10,
  );

  const controls = new OrbitControls(camera, renderer.domElement);

  // Smooth camera movement.
  controls.enableDamping = true;
  controls.dampingFactor = 0.045;

  // Full 360-degree rotation.
  controls.minAzimuthAngle = -Infinity;
  controls.maxAzimuthAngle = Infinity;

  // Vertical angle limits.
  controls.minPolarAngle = 0.3;
  controls.maxPolarAngle = 1.45;

  // Zoom controls.
  controls.enableZoom = true;
  controls.zoomSpeed = 0.85;
  controls.minDistance = 13;
  controls.maxDistance = 42;

  // Disable sideways panning.
  controls.enablePan = false;

  controls.target.set(0, 0.9, 0);

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  // Automatic city rotation.
  controls.autoRotate = !reducedMotion;
  controls.autoRotateSpeed = 0.8;

  // Mobile touch controls.
  controls.touches.ONE = THREE.TOUCH.ROTATE;
  controls.touches.TWO = THREE.TOUCH.DOLLY_ROTATE;

  // Desktop mouse controls.
  controls.mouseButtons.LEFT = THREE.MOUSE.ROTATE;

  controls.mouseButtons.MIDDLE = THREE.MOUSE.DOLLY;

  controls.mouseButtons.RIGHT = THREE.MOUSE.ROTATE;

  controls.update();

  /* ................ END SECTION 11 ................ */

  /* ============================================================
     SECTION 12: RESPONSIVE 3D CAMERA AUTO-FIT
     ============================================================ */

  const cityBounds = new THREE.Box3().setFromObject(city);

  const cityCenter = cityBounds.getCenter(new THREE.Vector3());

  controls.target.copy(cityCenter);

  const min = cityBounds.min;
  const max = cityBounds.max;

  const corners = [];

  for (const x of [min.x, max.x]) {
    for (const y of [min.y, max.y]) {
      for (const z of [min.z, max.z]) {
        corners.push(new THREE.Vector3(x, y, z));
      }
    }
  }

  // Calculate camera distance.
  function getFitDistance(direction, aspect, fov) {
    const verticalFov = THREE.MathUtils.degToRad(fov);

    const tanV = Math.tan(verticalFov / 2);

    const tanH = tanV * aspect;

    const forward = direction.clone().normalize();

    const right = new THREE.Vector3()
      .crossVectors(new THREE.Vector3(0, 1, 0), forward)
      .normalize();

    const up = new THREE.Vector3().crossVectors(forward, right).normalize();

    let distance = 0;

    for (const corner of corners) {
      const point = corner.clone().sub(cityCenter);

      const depth = point.dot(forward);

      const horizontal = Math.abs(point.dot(right));

      const vertical = Math.abs(point.dot(up));

      distance = Math.max(
        distance,
        depth + horizontal / tanH,
        depth + vertical / tanV,
      );
    }

    return distance;
  }

  // Resize the city view.
  function resizeCity() {
    const width = host.clientWidth;
    const height = host.clientHeight;

    if (!width || !height) return;

    const mobile = width <= 700;

    renderer.setSize(width, height, false);

    camera.aspect = width / height;
    camera.fov = mobile ? 48 : 44;

    camera.updateProjectionMatrix();

    const currentDirection = camera.position
      .clone()
      .sub(controls.target)
      .normalize();

    const polar = Math.acos(THREE.MathUtils.clamp(currentDirection.y, -1, 1));

    let requiredDistance = 0;

    // Check 36 positions for safe rotation.
    for (let i = 0; i < 36; i++) {
      const angle = (i / 36) * Math.PI * 2;

      const direction = new THREE.Vector3(
        Math.sin(polar) * Math.cos(angle),
        Math.cos(polar),
        Math.sin(polar) * Math.sin(angle),
      );

      requiredDistance = Math.max(
        requiredDistance,
        getFitDistance(direction, camera.aspect, camera.fov),
      );
    }

    const safeDistance = requiredDistance * 1.08;

    controls.minDistance = safeDistance;
    controls.maxDistance = safeDistance * 2;

    camera.position.copy(
      controls.target.clone().addScaledVector(currentDirection, safeDistance),
    );

    controls.update();
  }

  const resizeObserver = new ResizeObserver(resizeCity);

  resizeObserver.observe(host);

  resizeCity();

  /* ................ END SECTION 12 ................ */

  /* ============================================================
     SECTION 13: USER INTERACTION
     ============================================================ */

  const clock = new THREE.Clock();

  let lastInteraction = -100;
  let userInteracting = false;

  // Pause auto-rotation during interaction.
  controls.addEventListener("start", () => {
    userInteracting = true;

    lastInteraction = clock.getElapsedTime();

    controls.autoRotate = false;
  });

  // Record when interaction ends.
  controls.addEventListener("end", () => {
    userInteracting = false;

    lastInteraction = clock.getElapsedTime();
  });

  /* ................ END SECTION 13 ................ */

  /* ============================================================
     SECTION 14: SMOOTH CINEMATIC ANIMATION
     ============================================================ */

  let visible = true;

  const visibilityObserver = new IntersectionObserver(
    (entries) => {
      visible = entries[0].isIntersecting;
    },
    {
      threshold: 0.01,
    },
  );

  visibilityObserver.observe(host);

  function animate() {
    requestAnimationFrame(animate);

    if (!visible || document.hidden) {
      clock.getDelta();
      return;
    }

    const delta = Math.min(clock.getDelta(), 0.05);

    const time = clock.elapsedTime;

    // Resume automatic rotation after 1.5 seconds.
    if (!reducedMotion && !userInteracting && time - lastInteraction > 1.5) {
      controls.autoRotate = true;
    }

    // Existing connection particle animation.
    if (!reducedMotion) {
      connections.forEach((connection) => {
        const progress = (time * 0.16 + connection.offset) % 1;

        connection.particle.position.copy(connection.curve.getPoint(progress));
      });

      // Original hub lighting animation.
      hubLight.intensity = 16 + Math.sin(time * 1.2) * 1.5;
    } else {
      controls.autoRotate = false;

      connections.forEach((connection) => {
        connection.particle.position.copy(connection.curve.getPoint(0.5));
      });
    }

    /* ==========================================================
       SECTION 14A: FLOATING PHONE ANIMATION

       Phone floats gently up and down.
       Phone slowly rotates left and right.
       Phone screen follows the moving camera.
       ========================================================== */

    if (!reducedMotion) {
      // Smooth vertical floating.
      carePhone.position.y = phoneBaseY + Math.sin(time * 1.05) * 0.1;

      // Face the moving camera.
      const cameraFacingAngle = Math.atan2(
        camera.position.x - carePhone.position.x,
        camera.position.z - carePhone.position.z,
      );

      // Slow left-right rotation.
      carePhone.rotation.y = cameraFacingAngle + Math.sin(time * 0.42) * 0.25;

      // Small natural tilt.
      carePhone.rotation.z = Math.sin(time * 0.62) * 0.025;

      carePhone.rotation.x = -0.045;
    }

    /* ............ END PHONE ANIMATION ............ */

    // Smooth OrbitControls movement.
    controls.update(delta);

    // Render the complete 3D city.
    renderer.render(scene, camera);
  }

  animate();

  /* ................ END SECTION 14 ................ */
}

/* ============================================================
   END CARELYNX LIVING HEALTHCARE CITY
   ============================================================ */
