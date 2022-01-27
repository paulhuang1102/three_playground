const HEIGHT = window.innerHeight;
const WIDTH = window.innerWidth;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 70;
// camera.position.set(0,35,70);

const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(WIDTH, HEIGHT);


const R = 35;
const D_THETA = 2 * Math.PI / 1000;

let earth;
let clouds;
let stars;
let moon;
let THETA = 0;


const ambientLight = new THREE.AmbientLight(0xf1f1f1);
scene.add(ambientLight);

const spotLight = new THREE.DirectionalLight(0xffffff);
spotLight.position.set(50,50,50);
scene.add(spotLight);
// const earthMaterial = new THREE.MeshPhongMaterial({
//   color: 0xaaaaaa
// });

const textureLoader = new THREE.TextureLoader();
textureLoader.load("asset/earth_texture.jpeg", (texture) => {
  const earthGeo = new THREE.SphereGeometry(10, 50, 50);

  const earthMaterial = new THREE.MeshPhongMaterial({
    map: texture,
    // color: 0xaaaaaa,
    // specular: 0x333333,
    shininess: 25,
  });

  earth = new THREE.Mesh(earthGeo, earthMaterial);
  scene.add(earth);

});

textureLoader.load("asset/clouds.jpeg", (texture) => {

  const cloudMaterial = new THREE.MeshPhongMaterial({
    map: texture,
    transparent: true,
    opacity: 0.3
  });

  const cloudGeometry = new THREE.SphereGeometry(10.3, 50, 50);

  clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
  scene.add(clouds);
});

textureLoader.load('asset/galaxy_starfield.png', (texture) => {
  const starGeometry = new THREE.SphereGeometry(1000, 50, 50);
  const starMaterial = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide,
  });

  stars = new THREE.Mesh(starGeometry, starMaterial);
  scene.add(stars);

});

textureLoader.load('asset/moon_texture.jpeg', (texture) => {
  const moonGeometry = new THREE.SphereGeometry(3.5, 50, 50);
  const moonMaterial = new THREE.MeshPhongMaterial({
    map: texture
  });
  moon = new THREE.Mesh(moonGeometry, moonMaterial);
  moon.position.set(35, 0, 0);
  scene.add(moon);
});

const orbit = new THREE.OrbitControls(camera, renderer.domElement)

document.body.appendChild(renderer.domElement);

function render() {

  if (earth) {
    earth.rotation.y -= .0007;
  }

  if (clouds) {
    clouds.rotation.y -= .0005;
  }

  if (moon) {
    moon.rotation.y -= .007;
    moon.rotation.z -= .005;
    
    THETA += D_THETA;
    moon.position.x = R * Math.cos(THETA);
    moon.position.z = R * Math.sin(THETA);
    moon.position.y = R * Math.cos(THETA) * 0.3;
  }

  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();