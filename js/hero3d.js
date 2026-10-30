/* ============================================================
   CARELYNX — LIVING HEALTHCARE CITY
   Three.js 3D miniature healthcare ecosystem.

   Hospital + Patient + Pharmacy + Laboratory
                     |
                  CareLynx

   Colors are based on the existing CareLynx theme.
   ============================================================ */

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.1/build/three.module.js";

import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.160.1/examples/jsm/controls/OrbitControls.js";

const host = document.getElementById("carelynx3d");

if (host) {
  initHealthcareCity(host);
}

function initHealthcareCity(host) {
  // ----------------------------------------------------------
  // SECTION 1: SCENE, CAMERA AND RENDERER
  // ----------------------------------------------------------

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

  /* ============================================================
   HIGH QUALITY 3D RENDERING
   ============================================================ */

  const isMobile = window.matchMedia("(max-width: 700px)").matches;

  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio || 1, isMobile ? 1.75 : 2),
  );

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  renderer.outputColorSpace = THREE.SRGBColorSpace;

  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.55;

  // ................. END HIGH QUALITY RENDERING .................

  renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.35;

  host.prepend(renderer.domElement);

  const fallback = document.getElementById("hero3dFallback");
  if (fallback) fallback.remove();

  // ................................ END SECTION 1 .............

  // ----------------------------------------------------------
  // SECTION 2: CARELYNX COLORS AND MATERIALS
  // ----------------------------------------------------------

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

  // ................................ END SECTION 2 .............

  // ----------------------------------------------------------
  // SECTION 3: LIGHTING
  // ----------------------------------------------------------

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

  // ................................ END SECTION 3 .............

  // ----------------------------------------------------------
  // SECTION 4: REUSABLE 3D OBJECT FUNCTIONS
  // ----------------------------------------------------------

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

  // Make a readable label that faces the camera.
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

  // ................................ END SECTION 4 .............

  // ----------------------------------------------------------
  // SECTION 5: CITY PLATFORM AND ROADS
  // ----------------------------------------------------------

  const city = new THREE.Group();
  scene.add(city);

  box(city, 15.5, 0.35, 12, material(0x15394a), 0, -0.2, 0);

  box(city, 15.1, 0.12, 11.6, material(0x244d56), 0, 0.03, 0);

  // Main road running through the city.
  box(city, 14, 0.04, 1.15, road, 0, 0.12, 0);
  box(city, 1.15, 0.04, 10.5, road, 0, 0.13, 0);

  // Small road markings.
  for (let x = -6; x <= 6; x += 1.4) {
    if (Math.abs(x) < 2) continue;

    box(city, 0.55, 0.015, 0.035, white, x, 0.15, 0);
  }

  // Four raised landscaping pads.
  const positions = [
    [-4.3, -3.2],
    [4.3, -3.2],
    [-4.3, 3.2],
    [4.3, 3.2],
  ];

  positions.forEach(([x, z]) => {
    box(city, 5.2, 0.16, 3.7, material(0x406b70), x, 0.18, z);
  });

  // ................................ END SECTION 5 .............

  // ----------------------------------------------------------
  // SECTION 6: 3D HOSPITAL / PHARMACY / LABORATORY
  // ----------------------------------------------------------

  function createBuilding(name, x, z, options = {}) {
    const group = new THREE.Group();
    group.position.set(x, 0.3, z);
    city.add(group);

    const w = options.width || 3.4;
    const h = options.height || 2.5;
    const d = options.depth || 2.1;

    // Main building structure.
    box(group, w, h, d, white, 0, h / 2, 0);

    // Dark roof border.
    box(group, w + 0.2, 0.18, d + 0.2, navy, 0, h + 0.08, 0);

    // Decorative teal roof section.
    box(group, w * 0.65, 0.12, d * 0.5, teal, 0, h + 0.21, 0);

    // Front glass entrance.
    box(group, 0.85, 1.2, 0.05, glass, 0, 0.6, d / 2 + 0.04);

    // Entrance frame.
    box(group, 1.05, 0.12, 0.2, navy, 0, 1.25, d / 2 + 0.08);

    // Windows on front facade.
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

    // Medical cross above entrance.
    box(group, 0.48, 0.13, 0.08, teal, 0, h - 0.42, d / 2 + 0.08);

    box(group, 0.13, 0.48, 0.08, teal, 0, h - 0.42, d / 2 + 0.09);

    // Floating building label.
    const label = createLabel(name, 3.2);
    label.position.set(0, h + 1.1, 0);
    group.add(label);

    return group;
  }

  const hospital = createBuilding("HOSPITAL", -4.3, -3.2, {
    width: 3.5,
    height: 3.0,
    depth: 2.2,
  });

  const pharmacy = createBuilding("PHARMACY", -4.3, 3.2, {
    width: 3.4,
    height: 2.0,
    depth: 2.2,
  });

  const laboratory = createBuilding("LABORATORY", 4.3, 3.2, {
    width: 3.4,
    height: 2.4,
    depth: 2.2,
  });

  // Laboratory rooftop equipment.
  box(laboratory, 0.65, 0.45, 0.65, glass, -0.8, 2.75, 0);

  // ................................ END SECTION 6 .............

  // ----------------------------------------------------------
  // SECTION 7: 3D PATIENT AREA
  // ----------------------------------------------------------

  const patientArea = new THREE.Group();
  patientArea.position.set(4.3, 0.3, -3.2);
  city.add(patientArea);

  // Small reception / patient service building.
  box(patientArea, 3.1, 1.6, 1.7, white, 0, 0.8, -0.35);

  box(patientArea, 3.4, 0.18, 2, navy, 0, 1.7, -0.35);

  box(patientArea, 1.4, 1.1, 0.05, glass, 0, 0.65, 0.53);

  const patientLabel = createLabel("PATIENT", 3);
  patientLabel.position.set(0, 2.8, 0);
  patientArea.add(patientLabel);

  // Small 3D human figure.
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

  // ................................ END SECTION 7 .............

  // ----------------------------------------------------------
  // SECTION 8: CENTRAL CARELYNX 3D HUB
  // ----------------------------------------------------------

  const hub = new THREE.Group();
  city.add(hub);

  // Circular raised central platform.
  cylinder(hub, 1.85, 0.4, navy, 0, 0.4, 0);

  cylinder(hub, 1.7, 0.18, teal, 0, 0.7, 0);

  cylinder(hub, 1.52, 0.65, white, 0, 1.05, 0);

  // Gold decorative circular ring.
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(1.75, 0.045, 10, 90),
    gold,
  );

  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.83;
  hub.add(ring);

  /* ============================================================
   CARELYNX CENTER LOGO — CAMERA FACING
   ============================================================ */

  const logoLoader = new THREE.TextureLoader();

  logoLoader.load(
    "assets/images/carelynx-hero-logo.png",

    function (texture) {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = Math.min(
        8,
        renderer.capabilities.getMaxAnisotropy(),
      );

      const logoMaterial = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        depthTest: false,
        depthWrite: false,
        toneMapped: false,
      });

      const logoSprite = new THREE.Sprite(logoMaterial);

      // Maintain the original image ratio.
      const img = texture.image;
      const aspect = img.width / img.height;

      const width = 3.4;
      logoSprite.scale.set(width, width / aspect, 1);

      // Position the logo above the central hub.
      logoSprite.position.set(0, 2.45, 0);
      logoSprite.renderOrder = 20;

      hub.add(logoSprite);
    },

    undefined,

    function (error) {
      console.error("CareLynx logo loading failed:", error);
    },
  );

  /* ................ END CARELYNX LOGO ................ */

  // Small glowing vertical accents.
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

  // ................................ END SECTION 8 .............

  // ----------------------------------------------------------
  // SECTION 9: ANIMATED HEALTHCARE CONNECTIONS
  // ----------------------------------------------------------

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

    // Animated light particle.
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

  // ................................ END SECTION 9 .............

  // ----------------------------------------------------------
  // SECTION 10: TREES AND LANDSCAPING
  // ----------------------------------------------------------

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

  // ................................ END SECTION 10 ............

  /* ============================================================
   SECTION 11: RESPONSIVE CAMERA + TOUCH CONTROLS
   ============================================================ */

  // Camera position for desktop and mobile.
  const mobileView = window.matchMedia("(max-width: 700px)").matches;

  camera.position.set(
    mobileView ? 12 : 10,
    mobileView ? 16 : 11,
    mobileView ? 13 : 10,
  );

  // Enable interactive camera movement.
  const controls = new OrbitControls(camera, renderer.domElement);

  // Rotate smoothly after dragging.
  controls.enableDamping = true;
  controls.dampingFactor = 0.055;

  // Allow complete horizontal 360-degree rotation.
  controls.minAzimuthAngle = -Infinity;
  controls.maxAzimuthAngle = Infinity;

  // Limit vertical movement to keep the city visible.
  controls.minPolarAngle = 0.25;
  controls.maxPolarAngle = 1.5;

  // Enable zoom.
  controls.enableZoom = true;
  controls.zoomSpeed = 0.85;
  controls.minDistance = 13;
  controls.maxDistance = 42;

  // Disable sideways camera panning.
  controls.enablePan = false;

  // Rotate around the city center.
  controls.target.set(0, 0.9, 0);

  // Automatic slow camera rotation.
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  /* ============================================================
   CARELYNX 3D CITY — AUTOMATIC 360° ROTATION
   ============================================================ */

  // Automatically rotate the entire city.
  controls.autoRotate = !reducedMotion;

  // Smooth and slow rotation.
  controls.autoRotateSpeed = 0.8;

  // Smooth camera movement.
  controls.enableDamping = true;
  controls.dampingFactor = 0.045;

  // Allow full horizontal rotation.
  controls.minAzimuthAngle = -Infinity;
  controls.maxAzimuthAngle = Infinity;

  // Keep a comfortable viewing angle.
  controls.minPolarAngle = 0.3;
  controls.maxPolarAngle = 1.45;

  /* ................ END AUTO ROTATION SETTINGS ................ */

  // Touch gestures.
  controls.touches.ONE = THREE.TOUCH.ROTATE;
  controls.touches.TWO = THREE.TOUCH.DOLLY_ROTATE;

  // Mouse gestures.
  controls.mouseButtons.LEFT = THREE.MOUSE.ROTATE;
  controls.mouseButtons.MIDDLE = THREE.MOUSE.DOLLY;
  controls.mouseButtons.RIGHT = THREE.MOUSE.ROTATE;

  controls.update();

  // ................................ END SECTION 11 .............

  /* ============================================================
   SECTION 12: RESPONSIVE RESIZING
   ============================================================ */

  /* ============================================================
   CARELYNX 3D CITY — AUTO FIT CAMERA
   Keep the complete city visible during 360° rotation.
   ============================================================ */

  // Calculate the full size of the 3D city.
  const cityBounds = new THREE.Box3().setFromObject(city);
  const citySize = cityBounds.getSize(new THREE.Vector3());

  // Include extra space for labels and animation.
  const cityRadius =
    Math.sqrt(citySize.x ** 2 + citySize.y ** 2 + citySize.z ** 2) / 2;

  // Center the camera around the city.
  const cityCenter = cityBounds.getCenter(new THREE.Vector3());

  controls.target.copy(cityCenter);

  // Save the current viewing direction.
  const cameraDirection = new THREE.Vector3()
    .subVectors(camera.position, controls.target)
    .normalize();

  function resizeCity() {
    const width = host.clientWidth;
    const height = host.clientHeight;

    if (!width || !height) return;

    renderer.setSize(width, height, false);

    camera.aspect = width / height;
    camera.fov = width < 700 ? 48 : 44;

    camera.updateProjectionMatrix();

    // Convert field of view to radians.
    const verticalFov = THREE.MathUtils.degToRad(camera.fov);

    const horizontalFov =
      2 * Math.atan(Math.tan(verticalFov / 2) * camera.aspect);

    // Calculate the distance required to fit the entire city.
    const fitFov = Math.min(verticalFov, horizontalFov);

    const fitDistance = cityRadius / Math.sin(fitFov / 2);

    // Add 15% breathing room.
    const safeDistance = fitDistance * 1.15;

    // Prevent zooming so close that the city is clipped.
    controls.minDistance = safeDistance;
    controls.maxDistance = safeDistance * 2.5;

    // Fit the camera to the entire city.
    camera.position.copy(
      controls.target.clone().addScaledVector(cameraDirection, safeDistance),
    );

    controls.update();
  }

  const resizeObserver = new ResizeObserver(resizeCity);
  resizeObserver.observe(host);

  resizeCity();

  /* ................ END AUTO FIT CAMERA ................ */

  // ................................ END SECTION 12 .............

  /* ============================================================
   SECTION 13: USER INTERACTION
   ============================================================ */

  const clock = new THREE.Clock();

  let lastInteraction = -100;
  let userInteracting = false;

  // Stop automatic rotation when the user touches the city.
  controls.addEventListener("start", () => {
    userInteracting = true;
    lastInteraction = clock.getElapsedTime();
    controls.autoRotate = false;
  });

  // Resume automatic rotation after inactivity.
  controls.addEventListener("end", () => {
    userInteracting = false;
    lastInteraction = clock.getElapsedTime();
  });

  // ................................ END SECTION 13 .............

  /* ============================================================
   SECTION 14: SMOOTH CINEMATIC ANIMATION
   ============================================================ */

  let visible = true;

  const visibilityObserver = new IntersectionObserver(
    (entries) => {
      visible = entries[0].isIntersecting;
    },
    { threshold: 0.01 },
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

    // Resume gentle automatic rotation after 7 seconds.
    if (!reducedMotion && !userInteracting && time - lastInteraction > 7) {
      controls.autoRotate = true;
    }

    if (!reducedMotion) {
      // Animate gold particles along the four connections.
      connections.forEach((connection) => {
        const progress = (time * 0.16 + connection.offset) % 1;

        connection.particle.position.copy(connection.curve.getPoint(progress));
      });

      // Gentle pulsing hub illumination.
      hubLight.intensity = 16 + Math.sin(time * 1.2) * 1.5;
    } else {
      controls.autoRotate = false;

      connections.forEach((connection) => {
        connection.particle.position.copy(connection.curve.getPoint(0.5));
      });
    }

    // Smooth OrbitControls movement.
    controls.update(delta);

    renderer.render(scene, camera);
  }

  animate();

  /* ................ END SMOOTH ANIMATION ................ */
}

/* ................ END CARELYNX 3D HEALTHCARE CITY ............ */
