class Gaffer {
  ambientLight(color, intensity) {
    const light = new THREE.AmbientLight(color);
    if (intensity) {
      light.intensity = 0.5;
    }
    return light;
  }
}