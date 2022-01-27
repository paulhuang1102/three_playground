function loadTextureFile(path) {
  const texture = new THREE.TextureLoader().load(path);
  return texture;
}

function loadFBXFile(path) {
  const fbxLoader = new THREE.FBXLoader();

  return new Promise((resovle, reject) => {


    fbxLoader.load(
      path,
      (object) => {
        // object.traverse(function (child) {
        //     if ((child as THREE.Mesh).isMesh) {
        //         // (child as THREE.Mesh).material = material
        //         if ((child as THREE.Mesh).material) {
        //             ((child as THREE.Mesh).material as THREE.MeshBasicMaterial).transparent = false
        //         }
        //     }
        // })
        object.scale.set(.006, .006, .006)
        
        // scene.add(object)

        resovle(object);
  
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
      },
      (error) => {
        console.log(error)
        reject(error);
      }
    )
  })
}


function loadGLTFFile(path) {
  const loader = new THREE.GLTFLoader();

  return new Promise((resolve, reject) => {

    // Load a glTF resource
    loader.load(
      // resource URL
      path,
      // called when the resource is loaded
      function (gltf) {
        // gltf.setSize(100, 100)
        console.log(gltf)
  
        // scene.add(gltf.scene);
  
        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Group
        gltf.scenes; // Array<THREE.Group>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object

        resolve(gltf)
        
      },
      // called while loading is progressing
      (xhr) => {
  
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  
      },
      // called when loading has errors
      (error) => {
  
        console.log('An error happened');
        reject(error);
      }
    );
  })
}

function loadOBJFile(path, materials) {
  const loader = new THREE.OBJLoader();

  if (materials) {
    loader.setMaterials(materials)
  }

  return new Promise((resovle, reject) => {

    loader.load(
      // resource URL
      path,
      // called when resource is loaded
      (object) => {
        // scene.add(object);
        // First we want to clone our original geometry.
        // Just in case we want to get the low poly version back.
        // var smooth = THREE.GeometryUtils.clone(geometry);

        // // Next, we need to merge vertices to clean up any unwanted vertex.
        // smooth.mergeVertices();

        // // Create a new instance of the modifier and pass the number of divisions.
        // var modifier = new THREE.SubdivisionModifier(divisions);

        // // Apply the modifier to our cloned geometry.
        // modifier.modify(smooth);

        // // Finally, add our new detailed geometry to a mesh object and add it to our scene.
        // var mesh = new THREE.Mesh(smooth, new THREE.MeshPhongMaterial({ color: 0x222222 }));
        // scene.add(mesh);
        // resovle(mesh);
        
        resovle(object);
      },
      // called when loading is in progresses
      (xhr) => {

        console.log((xhr.loaded / xhr.total * 100) + '% loaded');

      },
      // called when loading has errors
      (error) => {

        console.log('An error happened');
        reject(error);
      }
    );
  })


}

function loadMTLFile(path) {
  const mtlLoader = new THREE.MTLLoader();

  return new Promise((resovle, reject) => {

    mtlLoader.load(
      path,
      (materials) => {
        materials.preload()
        resovle(materials);

      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
      },
      (error) => {
        console.log('An error happened')
        reject(error);
      }
    )
  })

}