import * as THREE from "three";
import { GLTF, GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const AVATAR_MODEL = "models/utkarsh.glb";
const SCANDI_MODEL = "models/scandi.glb";
const COFFEE_MODEL = "models/coffee.glb";
const LAPTOP_MODEL = "models/laptop.glb";
const PLANT_MODEL = "models/plant.glb";

const IFRAME_URL = "models/laptop-screen.webp";

export const TOTAL_DOWNLOAD_BYTES = 271147137;

export async function loadModel(
  callback: () => void,
  progressCallback: (e: ProgressEvent) => void
) {
  const loader = new GLTFLoader();

  const avatar = await loader.loadAsync(AVATAR_MODEL, progressCallback);
  const scandi = await loader.loadAsync(SCANDI_MODEL, progressCallback);
  const coffee = await loader.loadAsync(COFFEE_MODEL, progressCallback);
  const laptop = await loader.loadAsync(LAPTOP_MODEL, progressCallback);
  const plant = await loader.loadAsync(PLANT_MODEL, progressCallback);

  callback();
  setupScene(avatar, scandi, coffee, laptop, plant);
  (document.getElementById("avatar-loading") as HTMLElement).style.display =
    "none";
}

export function setupScene(
  avatarGltf: GLTF,
  scandiGltf: GLTF,
  coffeeGltf: GLTF,
  laptopGltf: GLTF,
  plantGltf: GLTF
) {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const container = document.getElementById("avatar-container") as HTMLElement;
  renderer.setSize(
    window.innerWidth <= 800 ? 320 : container.clientWidth,
    window.innerWidth <= 800 ? 380 : 600
  );
  renderer.setPixelRatio(window.devicePixelRatio);

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  container.appendChild(renderer.domElement);

  // Camera setup
  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight
  );
  camera.position.set(0.2, 0.5, 1);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.enableZoom = false;
  controls.minDistance = 3;
  controls.minPolarAngle = 1.4;
  controls.maxPolarAngle = 1.4;
  controls.target = new THREE.Vector3(0, 0.75, 0);
  controls.update();

  // Scene setup
  const scene = new THREE.Scene();

  // Lighting setup
  scene.add(new THREE.AmbientLight());

  const spotlight = new THREE.SpotLight(0xffffff, 20, 8, 1);
  spotlight.penumbra = 0.5;
  spotlight.position.set(0, 4, 2);
  spotlight.castShadow = true;
  scene.add(spotlight);

  const keyLight = new THREE.DirectionalLight(0xffffff, 2);
  keyLight.position.set(1, 1, 2);
  keyLight.lookAt(new THREE.Vector3());
  scene.add(keyLight);

  // Load avatar
  const avatar = avatarGltf.scene;
  avatar.traverse((child: any) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  avatar.position.x -= 0.45;
  scene.add(avatar);

  // load scandi
  const scandi = scandiGltf.scene;
  scandi.traverse((child: any) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  scandi.position.x += 0.45;
  scene.add(scandi);

  // load coffee
  const coffee = coffeeGltf.scene;
  coffee.traverse((child: any) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  coffee.position.x += 0.75;
  coffee.position.y += 0.75;
  scene.add(coffee);

  // load laptop
  const laptop = laptopGltf.scene;
  laptop.traverse((child: any) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  laptop.scale.set(0.15, 0.15, 0.15);
  laptop.position.x += 0.35;
  laptop.position.y += 0.7;
  laptop.position.z += 0.1;
  laptop.rotation.y = -(Math.PI / 16);

  // add website on the laptop screen
  const laptopScreenGeometry = new THREE.PlaneGeometry(0.45, 0.25);
  const laptopScreenMaterial = new THREE.MeshBasicMaterial({
    opacity: 1,
    map: new THREE.TextureLoader().load(IFRAME_URL),
  });
  const laptopScreenMesh = new THREE.Mesh(
    laptopScreenGeometry,
    laptopScreenMaterial
  );
  laptopScreenMesh.position.set(
    laptop.position.x + 0.04,
    laptop.position.y + 0.24,
    laptop.position.z - 0.202
  );
  laptopScreenMesh.rotation.x = -(Math.PI / 13);
  laptopScreenMesh.rotation.y = -(Math.PI / 16);
  laptopScreenMesh.rotation.z = -(Math.PI / 64);

  scene.add(laptop);
  scene.add(laptopScreenMesh);

  // load plant
  const plant = plantGltf.scene;
  plant.traverse((child: any) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  plant.scale.set(
    0.4 * plant.scale.x,
    0.4 * plant.scale.y,
    0.4 * plant.scale.z
  );
  plant.position.x -= 0.8;
  plant.position.z += 0.8;
  scene.add(plant);

  // Create floor
  const groundGeometry = new THREE.BoxGeometry(2, 0.1, 1.2);
  const groundMaterial = new THREE.MeshStandardMaterial();
  const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
  groundMesh.castShadow = false;
  groundMesh.receiveShadow = true;
  groundMesh.position.y -= 0.05;
  groundMesh.position.x += 0.05;
  scene.add(groundMesh);

  // Load animations
  const mixer = new THREE.AnimationMixer(avatar);
  const clips = avatarGltf.animations;
  const waveClip = THREE.AnimationClip.findByName(clips, "standing happy");
  const stumbleClip = THREE.AnimationClip.findByName(clips, "stumble");
  const waveAction = mixer.clipAction(waveClip);
  const stumbleAction = mixer.clipAction(stumbleClip);

  let isStumbling = false;
  const raycaster = new THREE.Raycaster();
  container.addEventListener("mousedown", (ev) => {
    const coords = {
      x: (ev.offsetX / container.clientWidth) * 2 - 1,
      y: -(ev.offsetY / container.clientHeight) * 2 + 1,
    } as THREE.Vector2;

    raycaster.setFromCamera(coords, camera);
    const intersections = raycaster.intersectObject(avatar);

    if (intersections.length > 0) {
      if (isStumbling) return;

      isStumbling = true;
      stumbleAction.reset();
      stumbleAction.play();
      waveAction.crossFadeTo(stumbleAction, 0.3, false);

      setTimeout(() => {
        waveAction.reset();
        waveAction.play();
        stumbleAction.crossFadeTo(waveAction, 1, false);
        setTimeout(() => (isStumbling = false), 1000);
      }, 4000);
    }
  });

  window.addEventListener("resize", () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });

  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    mixer.update(clock.getDelta());
    renderer.render(scene, camera);
  }

  animate();
  waveAction.play();
}
