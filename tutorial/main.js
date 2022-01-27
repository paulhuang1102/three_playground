let scene;

scene = new THREE.Scene();

let boxGeometry = new THREE.BoxGeometry(20, 20, 20);
let isoGeometry = new THREE.IcosahedronGeometry(200, 1);

let basicMaterial = new THREE.MeshBasicMaterial({ color: 0x0095DD });
let material = new THREE.MeshStandardMaterial({ color: 0x000000, wireframe: true, wireframeLinewidth: 2 });

let wireframeBasicMaterial = new THREE.MeshBasicMaterial({
  color: 0x0095DD,
  wireframe: true,
  wireframeLinewidth: 2
});

let cubeMesh = new THREE.Mesh(boxGeometry, basicMaterial);
cubeMesh.rotation.set(0.4, 0.2, 0);

let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 1000);

camera.position.z = 50;

scene.add(camera)
scene.add(cubeMesh)

var light = new THREE.AmbientLight(0x404040);
scene.add(light);


let renderer = new THREE.WebGLRenderer({
  antialias:true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

document.body.appendChild(renderer.domElement);

