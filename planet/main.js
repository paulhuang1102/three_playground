let camera, scene, renderer;
let raycaster;
let mouse = new THREE.Vector2(), INTERSECTED = null;
const objects = [];

const pinkR = 20;
let pinkPlanet;

let yellowPlanet;

init();

async function init() {

  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 20;

  scene = new THREE.Scene();

  await setUpPlanet();

  raycaster = new THREE.Raycaster();
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  window.addEventListener('mousemove', onMouseMove, false);

  animate();

}



function onMouseMove(event) {

  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);

  //included in mousemove

  const intersects = raycaster.intersectObjects(objects, true);
  
  pinkPlanet.position.x = 6 - mouse.x;
  pinkPlanet.position.y = 4 - mouse.y;
  pinkPlanet.position.z = -mouse.y * 3;


  yellowPlanet.position.x = -5 + mouse.x;
  yellowPlanet.position.y = 0 - mouse.y;
  yellowPlanet.position.z = mouse.y * 2;

  if (intersects.length > 0) {

    var object = intersects[0].object;

    if (object !== INTERSECTED) {

      INTERSECTED = object;
      // gsap.to( INTERSECTED.scale, { duration: .7, x: 1.2, y: 1.2 } );

    }

  } else {

    if (INTERSECTED !== null) {

      // gsap.to( INTERSECTED.scale, { duration: .7, x: 1, y: 1 } );
      INTERSECTED = null;

    }

  }

}


function animate() {

  requestAnimationFrame(animate);
  renderer.render(scene, camera);

}

async function setUpPlanet() {
  const pink = await loadTextureFile('asset/pink_planet.png');
  const plane = new THREE.PlaneGeometry(5, 5, 5, 5);
  const pinkMaterial = new THREE.MeshBasicMaterial({
    map: pink,
    transparent: true,
  })

  pinkPlanet = new THREE.Mesh(plane, pinkMaterial);
  pinkPlanet.position.x = 6;
  pinkPlanet.position.y = 4;

  scene.add(pinkPlanet);

  const yellow = await loadTextureFile('asset/yellow_planet.png');
  const yellowMaterial = new THREE.MeshBasicMaterial({
    map: yellow,
    transparent: true,
  });

  const plane2 = new THREE.PlaneGeometry(3, 3, 3, 3);

  yellowPlanet = new THREE.Mesh(plane2, yellowMaterial);
  yellowPlanet.position.x = -5;
  scene.add(yellowPlanet);
}