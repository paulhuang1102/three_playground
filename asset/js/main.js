let scene;
let renderer;
let camera;
let light;

let control;
let cube;
clock = new THREE.Clock();

let mixer;
let mixer2;

const hugoCat = {
  face: {
    type: 1,
    mesh: null
  }
}

async function init() {
  width = window.innerWidth;
  height = window.innerHeight;

  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(width, height);
  // renderer.setClearColor(0xffffff, 1);

  document.getElementById('main').appendChild(renderer.domElement);
  scene = new THREE.Scene();

  setUpCamera();
  setUpLight();


  // setUpCube();


  setUpHugo();
  setUpScene();

  const light = ambientLight(0x404040);
  scene.add(light);

  animate();
}

const render = () => {
  var delta = clock.getDelta();

  if (mixer) mixer.update(delta);
  if (mixer2) mixer2.update(delta);

  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;

  renderer.render(scene, camera)
};


const animate = () => {
  requestAnimationFrame(animate);

  render();
};


init();

function setUpCamera() {
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;
  control = new THREE.OrbitControls(camera, renderer.domElement);


  // camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
  // camera.position.set(5, 5, 3);
  // scene.add(camera);

}

function setUpCube() {
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

}


function setUpLight() {
  // const light = new THREE.PointLight()
  // light.position.set(0.8, 1.4, 1.0)
  // scene.add(light)
  var hemiLight = new THREE.HemisphereLight(0xffffff, 0x000000, 1);
  hemiLight.position.set(0, 100, 0);
  scene.add(hemiLight);

  // const ambientLight = new THREE.AmbientLight()
  // scene.add(ambientLight)
}

function setUpScene() {
  // Load machine
  loadMTLFile('./asset/model/scene_04_machine.mtl')
    .then((materials) => {
      return loadOBJFile('./asset/model/scene_04_machine.obj', materials)
    })
    .then((obj) => {
      scene.add(obj)
    })
    .catch(e => {
      console.error(e)
    })

  // loadMTLFile('./asset/model/scene_04_production_line.mtl')
  //   .then((materials) => {
  //     return loadOBJFile('./asset/model/scene_04_production_line.obj', materials)
  //   })
  //   .then((obj) => {
  //     // obj.position.set(0, 1, 0)
  //     scene.add(obj)
  //   })
  //   .catch(e => {
  //     console.error(e)
  //   })


  // loadGLTFFile('./asset/model/scene_04_production_line.gltf').then((gltf) => {
  //   scene.add(gltf.scene)
  // });
  // scene_04_production_line.gltf
  loadGLTFFile('./asset/model/scene_04_production_line.gltf').then((gltf) => {
    scene.add(gltf.scene)

    // gltf.scene.position.set(-0.08, 0, 1.5)
    // gltf.scene.rotation.y = Math.PI;


    mixer = new THREE.AnimationMixer(gltf.scene);
    // console.log(gltf.animations)

    gltf.animations.forEach((clip) => {

      mixer.clipAction(clip).play();

    });
  });

  loadGLTFFile('./asset/model/test_man3.gltf').then((gltf) => {
    scene.add(gltf.scene)

    gltf.scene.position.set(-0.08, 0, 1.5)
    gltf.scene.rotation.y = Math.PI;


    mixer2 = new THREE.AnimationMixer(gltf.scene);
    console.log(gltf.animations)

    gltf.animations.forEach((clip) => {

      mixer2.clipAction(clip).play();

    });
  });
}

function setUpHugo() {
  const group = new THREE.Group();

  const img = loadTextureFile('./asset/model/Face_01.png');

  loadFBXFile('./asset/model/Face_01.fbx')
    .then((obj) => {
      obj.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          // apply texture
          child.material.map = img
          child.material.needsUpdate = true;
        }
      });
      hugoCat.face.mesh = obj;
      hugoCat.face.type = 1;

      // scene.add(obj);

      group.add(obj);
    });

  loadFBXFile('./asset/model/Ring_01.fbx').then((obj) => {
    // scene.add(obj);
    group.add(obj);

  });

  loadFBXFile('./asset/model/Pipe_01.fbx').then((obj) => {
    // scene.add(obj);
    group.add(obj);

  });

  loadFBXFile('./asset/model/Leg_01.fbx').then((obj) => {
    // scene.add(obj);
    group.add(obj)

  });

  scene.add(group);

  group.position.set(-2, 2, 0);

  // loadFBXFile('./asset/model/Accessories_01.fbx').then((obj) => {

  //   scene.add(obj);

  // });
}

function changeFace() {
  // console.log('Swich face')
  hugoCat.face.type = hugoCat.face.type === 1 ? 2 : 1;
  let img;

  if (hugoCat.face.type === 2) {
    img = loadTextureFile('./asset/model/Face_02.png');
  } else {
    img = loadTextureFile('./asset/model/Face_01.png');
  }

  hugoCat.face.mesh.traverse(function (child) {
    if (child instanceof THREE.Mesh) {
      // apply texture
      child.material.map = img
      child.material.needsUpdate = true;
    }
  });
}