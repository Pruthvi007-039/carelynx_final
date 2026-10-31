/* ============================================================
   CARELYNX — LIVE 3D DOCTOR PRESENTATION
   Built with Three.js — no static image
   ============================================================ */

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("clAboutLiveCanvas");
  if (!container) return;

  let THREE;

  try {
    THREE =
      await import("https://cdn.jsdelivr.net/npm/three@0.160.1/build/three.module.js");
  } catch (error) {
    console.error("CareLynx doctor 3D failed to load:", error);
    container.textContent = "3D preview unavailable";
    return;
  }

  // ----------------------------------------------------------
  // 1. SCENE AND CAMERA
  // ----------------------------------------------------------

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));

  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(0x000000, 0);

  container.appendChild(renderer.domElement);

  // ----------------------------------------------------------
  // 2. LIGHTING
  // ----------------------------------------------------------

  scene.add(new THREE.AmbientLight(0xffffff, 2.3));

  const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);

  keyLight.position.set(-3, 7, 8);
  scene.add(keyLight);

  const tealLight = new THREE.PointLight(0x00f3df, 35, 12);

  tealLight.position.set(2, 3, 3);
  scene.add(tealLight);

  const blueLight = new THREE.PointLight(0x4d9fff, 18, 10);

  blueLight.position.set(-4, 2, 1);
  scene.add(blueLight);

  // ----------------------------------------------------------
  // 3. MATERIALS
  // ----------------------------------------------------------

  const mat = {
    coat: new THREE.MeshStandardMaterial({
      color: 0xf3faff,
      roughness: 0.65,
    }),

    coatShade: new THREE.MeshStandardMaterial({
      color: 0xcadfe9,
      roughness: 0.7,
    }),

    skin: new THREE.MeshStandardMaterial({
      color: 0xd69a72,
      roughness: 0.8,
    }),

    hair: new THREE.MeshStandardMaterial({
      color: 0x172537,
      roughness: 0.85,
    }),

    shirt: new THREE.MeshStandardMaterial({
      color: 0x008e9a,
      roughness: 0.6,
    }),

    navy: new THREE.MeshStandardMaterial({
      color: 0x09243d,
      roughness: 0.5,
    }),

    teal: new THREE.MeshStandardMaterial({
      color: 0x25e8d4,
      emissive: 0x008b85,
      emissiveIntensity: 0.6,
      metalness: 0.3,
      roughness: 0.3,
    }),

    silver: new THREE.MeshStandardMaterial({
      color: 0xb8d7e1,
      metalness: 0.65,
      roughness: 0.3,
    }),

    black: new THREE.MeshStandardMaterial({
      color: 0x121820,
      roughness: 0.6,
    }),

    white: new THREE.MeshBasicMaterial({
      color: 0xffffff,
    }),
  };

  // ----------------------------------------------------------
  // 4. SHAPE HELPERS
  // ----------------------------------------------------------

  function sphere(parent, x, y, z, sx, sy, sz, material) {
    const object = new THREE.Mesh(
      new THREE.SphereGeometry(1, 24, 16),
      material,
    );

    object.position.set(x, y, z);
    object.scale.set(sx, sy, sz);

    parent.add(object);
    return object;
  }

  function box(parent, x, y, z, w, h, d, material) {
    const object = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);

    object.position.set(x, y, z);
    parent.add(object);

    return object;
  }

  function cylinder(
    parent,
    x,
    y,
    z,
    radiusTop,
    radiusBottom,
    height,
    material,
  ) {
    const object = new THREE.Mesh(
      new THREE.CylinderGeometry(radiusTop, radiusBottom, height, 20),
      material,
    );

    object.position.set(x, y, z);
    parent.add(object);

    return object;
  }

  function tube(parent, points, radius, material) {
    const curve = new THREE.CatmullRomCurve3(
      points.map((p) => new THREE.Vector3(...p)),
    );

    const object = new THREE.Mesh(
      new THREE.TubeGeometry(curve, 32, radius, 8, false),
      material,
    );

    parent.add(object);

    return object;
  }

  // ----------------------------------------------------------
  // 5. MAIN GROUP
  // ----------------------------------------------------------

  const world = new THREE.Group();
  scene.add(world);

  // ==========================================================
  // 6. CREATE THE ACTUAL 3D DOCTOR
  // ==========================================================

  const doctor = new THREE.Group();

  doctor.position.set(-2.1, -1.4, 0.25);
  world.add(doctor);

  // Torso and shirt

  sphere(doctor, 0, 1.18, 0, 0.69, 0.85, 0.36, mat.coat);

  box(doctor, 0, 1.22, 0.36, 0.42, 1.12, 0.06, mat.shirt);

  // White coat front panels

  const leftCoat = box(doctor, -0.38, 1.08, 0.33, 0.31, 1.37, 0.12, mat.coat);

  leftCoat.rotation.z = -0.08;

  const rightCoat = box(doctor, 0.38, 1.08, 0.33, 0.31, 1.37, 0.12, mat.coat);

  rightCoat.rotation.z = 0.08;

  // Coat lapels

  const lapelL = box(
    doctor,
    -0.19,
    1.64,
    0.42,
    0.18,
    0.58,
    0.04,
    mat.coatShade,
  );

  lapelL.rotation.z = -0.35;

  const lapelR = box(doctor, 0.19, 1.64, 0.42, 0.18, 0.58, 0.04, mat.coatShade);

  lapelR.rotation.z = 0.35;

  // Coat buttons

  for (let i = 0; i < 3; i++) {
    sphere(
      doctor,
      -0.08,
      1.1 - i * 0.24,
      0.45,
      0.025,
      0.025,
      0.015,
      mat.silver,
    );
  }

  // Neck

  cylinder(doctor, 0, 2.02, 0, 0.18, 0.2, 0.38, mat.skin);

  // ----------------------------------------------------------
  // HEAD GROUP — animated separately
  // ----------------------------------------------------------

  const head = new THREE.Group();

  head.position.set(0, 2.5, 0.02);
  doctor.add(head);

  // Face

  sphere(head, 0, 0, 0, 0.45, 0.56, 0.39, mat.skin);

  // Ears

  sphere(head, -0.43, -0.04, 0, 0.095, 0.16, 0.08, mat.skin);

  sphere(head, 0.43, -0.04, 0, 0.095, 0.16, 0.08, mat.skin);

  // Hair cap

  sphere(head, 0, 0.43, -0.06, 0.46, 0.24, 0.39, mat.hair);

  sphere(head, -0.18, 0.46, 0.17, 0.28, 0.16, 0.22, mat.hair);

  sphere(head, 0.19, 0.48, 0.15, 0.27, 0.15, 0.23, mat.hair);

  // Eyes

  [-0.18, 0.18].forEach((x) => {
    sphere(head, x, 0.06, 0.358, 0.09, 0.075, 0.045, mat.white);

    sphere(head, x + 0.012, 0.05, 0.405, 0.036, 0.046, 0.02, mat.black);

    // Eyebrows

    const brow = box(head, x, 0.19, 0.36, 0.19, 0.027, 0.03, mat.hair);

    brow.rotation.z = x < 0 ? -0.08 : 0.08;
  });

  // Nose

  sphere(head, 0, -0.09, 0.4, 0.075, 0.11, 0.09, mat.skin);

  // Animated mouth

  const mouth = sphere(head, 0, -0.3, 0.358, 0.115, 0.025, 0.018, mat.black);

  // Glasses

  const glassesMat = new THREE.MeshBasicMaterial({
    color: 0x142e43,
  });

  [-0.18, 0.18].forEach((x) => {
    const frame = new THREE.Mesh(
      new THREE.TorusGeometry(0.125, 0.015, 6, 32),
      glassesMat,
    );

    frame.position.set(x, 0.06, 0.415);
    frame.scale.y = 0.8;

    head.add(frame);
  });

  box(head, 0, 0.07, 0.424, 0.12, 0.018, 0.018, glassesMat);

  // ----------------------------------------------------------
  // STETHOSCOPE
  // ----------------------------------------------------------

  tube(
    doctor,
    [
      [-0.18, 1.86, 0.41],
      [-0.3, 1.52, 0.49],
      [-0.18, 1.28, 0.5],
      [0.02, 1.45, 0.52],
      [0.16, 1.73, 0.45],
    ],
    0.027,
    mat.navy,
  );

  sphere(doctor, -0.18, 1.28, 0.54, 0.085, 0.085, 0.035, mat.silver);

  // ----------------------------------------------------------
  // DOCTOR'S LEFT ARM — HOLDING TABLET
  // ----------------------------------------------------------

  const leftArm = new THREE.Group();

  leftArm.position.set(-0.63, 1.85, 0);
  doctor.add(leftArm);

  const leftSleeve = cylinder(
    leftArm,
    -0.2,
    -0.36,
    0.08,
    0.2,
    0.16,
    0.77,
    mat.coat,
  );

  leftSleeve.rotation.z = -0.4;

  sphere(leftArm, -0.36, -0.68, 0.16, 0.14, 0.17, 0.13, mat.skin);

  // Tablet

  const tablet = box(doctor, -0.65, 0.95, 0.48, 0.76, 0.5, 0.055, mat.navy);

  tablet.rotation.z = -0.12;

  box(doctor, -0.65, 0.95, 0.518, 0.66, 0.4, 0.01, mat.teal).rotation.z = -0.12;

  // ----------------------------------------------------------
  // DOCTOR'S RIGHT ARM — LIVE PRESENTATION GESTURE
  // ----------------------------------------------------------

  const rightArm = new THREE.Group();

  rightArm.position.set(0.63, 1.84, 0.02);
  doctor.add(rightArm);

  const upperArm = cylinder(
    rightArm,
    0.22,
    -0.26,
    0.08,
    0.2,
    0.17,
    0.62,
    mat.coat,
  );

  upperArm.rotation.z = 0.7;

  const forearm = cylinder(
    rightArm,
    0.53,
    -0.37,
    0.19,
    0.15,
    0.12,
    0.52,
    mat.coat,
  );

  forearm.rotation.z = -0.65;

  // Hand

  sphere(rightArm, 0.72, -0.17, 0.23, 0.16, 0.12, 0.09, mat.skin);

  // Fingers pointing toward hologram

  for (let i = 0; i < 3; i++) {
    const finger = cylinder(
      rightArm,
      0.86 + i * 0.012,
      -0.12 - i * 0.065,
      0.24,
      0.025,
      0.025,
      0.2,
      mat.skin,
    );

    finger.rotation.z = 1.2;
  }

  // ==========================================================
  // 7. HOLOGRAPHIC HEALTHCARE PLATFORM
  // ==========================================================

  const holo = new THREE.Group();

  holo.position.set(0.3, -0.05, 0);
  world.add(holo);

  // ----------------------------------------------------------
  // Canvas textures for live 3D panels
  // These are drawn in code — no external images.
  // ----------------------------------------------------------

  function makeTexture(title, symbol, main = false) {
    const canvas = document.createElement("canvas");

    canvas.width = 512;
    canvas.height = 512;

    const ctx = canvas.getContext("2d");

    // Rounded glass panel

    ctx.fillStyle = main ? "rgba(22, 221, 209, 0.95)" : "rgba(5, 66, 83, 0.94)";

    ctx.strokeStyle = main ? "#c0fffb" : "#43f3e3";

    ctx.lineWidth = 12;

    ctx.beginPath();
    ctx.roundRect(22, 22, 468, 468, 75);
    ctx.fill();
    ctx.stroke();

    // Icon

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillStyle = main ? "#063b50" : "#a9fff6";

    ctx.font = main ? "bold 155px Arial" : "bold 140px Arial";

    ctx.fillText(symbol, 256, 200);

    // Label

    ctx.font = main ? "bold 55px Arial" : "bold 43px Arial";

    ctx.fillText(title, 256, 353);

    const texture = new THREE.CanvasTexture(canvas);

    texture.colorSpace = THREE.SRGBColorSpace;

    return texture;
  }

  function createPanel(title, symbol, x, y, size, main = false) {
    const group = new THREE.Group();

    group.position.set(x, y, 0);
    holo.add(group);

    const material = new THREE.MeshBasicMaterial({
      map: makeTexture(title, symbol, main),
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    const panel = new THREE.Mesh(new THREE.PlaneGeometry(size, size), material);

    group.add(panel);

    // Glowing backing

    const glow = new THREE.Mesh(
      new THREE.PlaneGeometry(size * 1.09, size * 1.09),
      new THREE.MeshBasicMaterial({
        color: main ? 0x00d6c6 : 0x00a9b0,
        transparent: true,
        opacity: main ? 0.16 : 0.09,
        depthWrite: false,
      }),
    );

    glow.position.z = -0.04;
    group.add(glow);

    return group;
  }

  // Centre CareLynx hub

  const centre = createPanel("CareLynx", "+", 1.85, 1.5, 1.25, true);

  // Four connected services

  const panels = [
    createPanel("Patients", "P", 0.55, 2.85, 0.87),

    createPanel("Hospitals", "H", 3.16, 2.85, 0.87),

    createPanel("Pharmacies", "Rx", 0.55, 0.25, 0.87),

    createPanel("Laboratories", "L", 3.16, 0.25, 0.87),
  ];

  // ----------------------------------------------------------
  // CONNECTING LINES AND MOVING DATA PARTICLES
  // ----------------------------------------------------------

  const lineMaterial = new THREE.MeshBasicMaterial({
    color: 0x24eadb,
    transparent: true,
    opacity: 0.72,
  });

  const routes = [
    [
      [1.85, 1.5, -0.1],
      [1.2, 2.2, -0.1],
      [0.55, 2.85, -0.1],
    ],

    [
      [1.85, 1.5, -0.1],
      [2.5, 2.2, -0.1],
      [3.16, 2.85, -0.1],
    ],

    [
      [1.85, 1.5, -0.1],
      [1.2, 0.8, -0.1],
      [0.55, 0.25, -0.1],
    ],

    [
      [1.85, 1.5, -0.1],
      [2.5, 0.8, -0.1],
      [3.16, 0.25, -0.1],
    ],
  ];

  const movingDots = [];

  routes.forEach((points, index) => {
    const curve = new THREE.CatmullRomCurve3(
      points.map((p) => new THREE.Vector3(...p)),
    );

    const path = new THREE.Mesh(
      new THREE.TubeGeometry(curve, 30, 0.013, 6, false),
      lineMaterial,
    );

    holo.add(path);

    const dot = new THREE.Mesh(
      new THREE.SphereGeometry(0.055, 12, 8),
      new THREE.MeshBasicMaterial({
        color: 0xaafff6,
      }),
    );

    holo.add(dot);

    movingDots.push({
      dot,
      curve,
      offset: index * 0.23,
    });
  });

  // ----------------------------------------------------------
  // HOLOGRAPHIC PLATFORM UNDER THE PANELS
  // ----------------------------------------------------------

  const platform = new THREE.Group();

  platform.position.set(1.85, -0.55, -0.4);
  holo.add(platform);

  const platformBase = cylinder(platform, 0, 0, 0, 1.2, 1.35, 0.13, mat.navy);

  const rings = [];

  [0.85, 1.08].forEach((radius) => {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(radius, 0.022, 8, 80),
      new THREE.MeshBasicMaterial({
        color: 0x2fffe8,
      }),
    );

    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.1;

    platform.add(ring);
    rings.push(ring);
  });

  // ----------------------------------------------------------
  // FLOATING PARTICLES
  // ----------------------------------------------------------

  const particles = [];

  for (let i = 0; i < 18; i++) {
    const particle = sphere(
      holo,
      Math.sin(i * 2.3) * 1.6 + 1.85,
      (i * 0.37) % 3.3,
      -0.4,
      0.018,
      0.018,
      0.018,
      mat.teal,
    );

    particles.push({
      object: particle,
      baseY: particle.position.y,
      phase: i * 0.7,
    });
  }

  // ==========================================================
  // 8. RESPONSIVE CAMERA
  // ==========================================================

  function resize() {
    const width = Math.max(1, container.clientWidth);
    const height = Math.max(1, container.clientHeight);

    renderer.setSize(width, height, false);

    camera.aspect = width / height;

    const mobile = width < 600;

    world.scale.setScalar(mobile ? 0.67 : 0.88);

    camera.position.set(mobile ? 0.15 : 0, 1.15, mobile ? 10.8 : 9.3);

    camera.lookAt(mobile ? 0.1 : 0, 1.05, 0);

    camera.updateProjectionMatrix();
  }

  resize();

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);

  // ==========================================================
  // 9. MOUSE PARALLAX
  // ==========================================================

  let pointerX = 0;
  let pointerY = 0;

  container.addEventListener("pointermove", (event) => {
    if (event.pointerType === "touch") return;

    const rect = container.getBoundingClientRect();

    pointerX = (event.clientX - rect.left) / rect.width - 0.5;

    pointerY = (event.clientY - rect.top) / rect.height - 0.5;
  });

  container.addEventListener("pointerleave", () => {
    pointerX = 0;
    pointerY = 0;
  });

  // ==========================================================
  // 10. LIVE ANIMATION
  // ==========================================================

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const clock = new THREE.Clock();

  let visible = false;
  let frameId = null;

  const visibilityObserver = new IntersectionObserver(
    (entries) => {
      visible = entries[0].isIntersecting;

      if (visible && !document.hidden && frameId === null) {
        frameId = requestAnimationFrame(animate);
      }
    },
    { threshold: 0.05 },
  );

  visibilityObserver.observe(container);

  function animate() {
    frameId = null;

    if (!visible || document.hidden) return;

    const time = clock.getElapsedTime();

    if (!reducedMotion) {
      // Doctor gently moves while explaining.

      doctor.position.y = -1.4 + Math.sin(time * 1.15) * 0.025;

      // Presenting hand movement.

      rightArm.rotation.z = Math.sin(time * 1.6) * 0.18 - 0.1;

      rightArm.rotation.x = Math.sin(time * 0.8) * 0.09;

      // Head nodding.

      head.rotation.z = Math.sin(time * 0.75) * 0.035;

      head.rotation.x = Math.sin(time * 1.2) * 0.04;

      // Simulated speaking mouth movement.
      // No audio is generated.

      mouth.scale.y = 0.8 + Math.abs(Math.sin(time * 5.5)) * 1.2;

      // Hologram centre floating.

      centre.position.y = 1.5 + Math.sin(time * 1.25) * 0.07;

      centre.rotation.y = Math.sin(time * 0.55) * 0.1;

      // Four service panels move independently.

      panels.forEach((panel, index) => {
        const originalY = index < 2 ? 2.85 : 0.25;

        panel.position.y =
          originalY + Math.sin(time * 1.15 + index * 1.2) * 0.075;

        panel.rotation.y = Math.sin(time * 0.65 + index) * 0.1;
      });

      // Data flows through connecting lines.

      movingDots.forEach((item) => {
        const progress = (time * 0.16 + item.offset) % 1;

        item.dot.position.copy(item.curve.getPoint(progress));
      });

      // Soft platform rotation.

      rings[0].rotation.z = time * 0.18;
      rings[1].rotation.z = -time * 0.13;

      // Floating particles.

      particles.forEach((item) => {
        item.object.position.y =
          item.baseY + Math.sin(time + item.phase) * 0.13;
      });

      // Very subtle 3D parallax.

      world.rotation.y += (pointerX * 0.065 - world.rotation.y) * 0.04;

      world.rotation.x += (-pointerY * 0.035 - world.rotation.x) * 0.04;
    }

    renderer.render(scene, camera);

    if (!reducedMotion) {
      frameId = requestAnimationFrame(animate);
    }
  }

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && visible && frameId === null) {
      frameId = requestAnimationFrame(animate);
    }
  });
});

/* ============================================================
   END: CARELYNX LIVE 3D DOCTOR PRESENTATION
   ============================================================ */
