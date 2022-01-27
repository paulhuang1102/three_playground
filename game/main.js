
let scene;
let camera

function setup() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);

  camera.position.z = 50;

}


function init() {

  setup();

  setUpPlayers();
  setUpBg();
  setLight();

  const renderer = new THREE.WebGLRenderer({
    antialias: true
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);

  var orbit = new THREE.OrbitControls(camera, renderer.domElement)


  document.body.appendChild(renderer.domElement);
}

function setUpPlayers() {
  const player1 = new Player('red');
  scene.add(player1.getModel());
}


function setUpBg() {
  const bg = new Background();

}

function setLight() {
  const light = new THREE.AmbientLight(0x404040);
  scene.add(light);
}

init();