class Player {
  constructor(name) {
    this.name = name;
  }

  getModel() {
    const geometry = new THREE.BoxGeometry(10, 10, 10);
    const wireframeBasicMaterial = new THREE.MeshBasicMaterial({
      color: 0x0095DD,
      wireframe: true,
      wireframeLinewidth: 2
    });

    const cubeMesh = new THREE.Mesh(geometry, wireframeBasicMaterial);

    return cubeMesh;
  }
}