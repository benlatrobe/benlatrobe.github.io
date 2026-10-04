import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

const root = document.getElementById('nfc-three-root');

if (root) {
  const fallback = root.querySelector('.nfc-three-fallback');

  try {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 1000);
    camera.position.set(92, 70, 112);
    camera.lookAt(0, 6, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    root.appendChild(renderer.domElement);

    const assembly = new THREE.Group();
    assembly.rotation.x = -0.18;
    assembly.rotation.y = 0.5;
    scene.add(assembly);

    const colors = {
      ink: 0x161817,
      paper: 0xf4f1e9,
      touch: 0xd8d7d1,
      host: 0x30332f,
      board: 0x9fb97b,
      shield: 0xd7d8d4,
      accent: 0xbbff49,
      copper: 0x7c5b35
    };

    const mat = (color, extra = {}) => new THREE.MeshStandardMaterial({
      color,
      roughness: 0.72,
      metalness: 0.08,
      ...extra
    });

    const host = new THREE.Mesh(
      new THREE.BoxGeometry(120, 1.2, 78),
      mat(colors.host, { transparent: true, opacity: 0.92 })
    );
    assembly.add(host);

    const touchpad = new THREE.Mesh(
      new THREE.BoxGeometry(92, 1.6, 58),
      mat(colors.touch, { transparent: true, opacity: 0.93 })
    );
    assembly.add(touchpad);

    const antenna = new THREE.Group();
    const loopMaterial = new THREE.LineBasicMaterial({ color: colors.accent });
    [0, 4, 8].forEach((inset) => {
      const w = 76 - inset * 2;
      const d = 44 - inset * 2;
      const pts = [
        new THREE.Vector3(-w/2, 0, -d/2),
        new THREE.Vector3(w/2, 0, -d/2),
        new THREE.Vector3(w/2, 0, d/2),
        new THREE.Vector3(-w/2, 0, d/2),
      ];
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const line = new THREE.LineLoop(geo, loopMaterial);
      antenna.add(line);
    });
    assembly.add(antenna);

    // Nominal envelope from the provided §10.2 drawing:
    // 10.0 mm wide x 17.0 mm long; PCB 0.40 mm; max envelope ~1.85 mm.
    const module = new THREE.Group();
    const pcb = new THREE.Mesh(
      new THREE.BoxGeometry(10, 0.4, 17),
      mat(colors.board)
    );
    module.add(pcb);

    const shield = new THREE.Mesh(
      new THREE.BoxGeometry(7.0, 0.8, 7.0),
      mat(colors.shield, { metalness: 0.36, roughness: 0.38 })
    );
    shield.position.set(0, 0.58, 0.7);
    module.add(shield);

    const ffc = new THREE.Mesh(
      new THREE.BoxGeometry(7.4, 0.7, 1.5),
      mat(colors.ink)
    );
    ffc.position.set(0, 0.54, -7.1);
    module.add(ffc);

    const lowerConnector = new THREE.Mesh(
      new THREE.BoxGeometry(3.0, 0.7, 2.2),
      mat(colors.ink)
    );
    lowerConnector.position.set(-1.4, 0.54, 6.2);
    module.add(lowerConnector);

    const pinMaterial = mat(colors.copper, { metalness: 0.35, roughness: 0.45 });
    for (let i = 0; i < 10; i++) {
      const pin = new THREE.Mesh(
        new THREE.BoxGeometry(0.34, 0.12, 0.9),
        pinMaterial
      );
      pin.position.set(-3.1 + i * 0.68, 0.85, -7.4);
      module.add(pin);
    }

    assembly.add(module);

    const cableCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(37, 1.2, 17),
      new THREE.Vector3(27, 3.5, 14),
      new THREE.Vector3(19, 7.0, 10),
      new THREE.Vector3(31, 8.5, 2),
    ]);
    const cable = new THREE.Mesh(
      new THREE.TubeGeometry(cableCurve, 36, 0.42, 8, false),
      mat(colors.ink)
    );
    assembly.add(cable);

    const floorGrid = new THREE.GridHelper(150, 15, 0x9aa08f, 0xcfd0c7);
    floorGrid.position.y = -8;
    floorGrid.material.transparent = true;
    floorGrid.material.opacity = 0.26;
    scene.add(floorGrid);

    const ambient = new THREE.HemisphereLight(0xffffff, 0x6d7068, 2.4);
    scene.add(ambient);

    const key = new THREE.DirectionalLight(0xffffff, 2.7);
    key.position.set(75, 110, 55);
    scene.add(key);

    const rim = new THREE.DirectionalLight(colors.accent, 1.25);
    rim.position.set(-80, 45, -50);
    scene.add(rim);

    const exploded = {
      host: new THREE.Vector3(0, -6, 0),
      touchpad: new THREE.Vector3(-10, 27, -2),
      antenna: new THREE.Vector3(-10, 12, -2),
      module: new THREE.Vector3(39, -1.5, 17)
    };

    const assembled = {
      host: new THREE.Vector3(0, -4, 0),
      touchpad: new THREE.Vector3(-10, 2.7, -2),
      antenna: new THREE.Vector3(-10, 1.55, -2),
      module: new THREE.Vector3(39, -2.1, 17)
    };

    let state = exploded;
    host.position.copy(exploded.host);
    touchpad.position.copy(exploded.touchpad);
    antenna.position.copy(exploded.antenna);
    module.position.copy(exploded.module);

    const setView = (mode) => {
      state = mode === 'assembled' ? assembled : exploded;
      document.querySelectorAll('[data-nfc-view]').forEach((btn) => {
        btn.classList.toggle('is-active', btn.dataset.nfcView === mode);
      });
    };

    document.querySelectorAll('[data-nfc-view]').forEach((btn) => {
      btn.addEventListener('click', () => setView(btn.dataset.nfcView));
    });

    let dragging = false;
    let px = 0;
    let py = 0;
    let targetRotX = assembly.rotation.x;
    let targetRotY = assembly.rotation.y;

    renderer.domElement.addEventListener('pointerdown', (e) => {
      dragging = true;
      px = e.clientX;
      py = e.clientY;
      renderer.domElement.setPointerCapture?.(e.pointerId);
    });

    renderer.domElement.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      const dx = e.clientX - px;
      const dy = e.clientY - py;
      px = e.clientX;
      py = e.clientY;
      targetRotY += dx * 0.008;
      targetRotX += dy * 0.006;
      targetRotX = Math.max(-0.9, Math.min(0.55, targetRotX));
    });

    const stopDrag = () => { dragging = false; };
    renderer.domElement.addEventListener('pointerup', stopDrag);
    renderer.domElement.addEventListener('pointercancel', stopDrag);
    renderer.domElement.addEventListener('pointerleave', stopDrag);

    const resize = () => {
      const w = Math.max(320, root.clientWidth);
      const h = Math.max(360, root.clientHeight);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(root);
    resize();

    if (fallback) fallback.style.display = 'none';

    let t = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      t += 0.005;

      const lerp = 0.075;
      host.position.lerp(state.host, lerp);
      touchpad.position.lerp(state.touchpad, lerp);
      antenna.position.lerp(state.antenna, lerp);
      module.position.lerp(state.module, lerp);

      assembly.rotation.x += (targetRotX - assembly.rotation.x) * 0.08;
      assembly.rotation.y += (targetRotY - assembly.rotation.y) * 0.08;

      if (!dragging) {
        assembly.rotation.y += Math.sin(t) * 0.00035;
      }

      renderer.render(scene, camera);
    };

    animate();
  } catch (error) {
    if (fallback) {
      fallback.innerHTML = '<span>3D ASSEMBLY</span><small>Interactive view unavailable — dimensions and layer diagram remain valid.</small>';
    }
  }
}
