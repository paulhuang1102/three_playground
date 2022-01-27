let camera, scene, renderer, cube, cube1;
let raycaster;
let mouse = new THREE.Vector2(), INTERSECTED = null;
const objects = [];


init();
animate();

function init() {

	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 100 );
	camera.position.z = 20;

	scene = new THREE.Scene();

	const geometry = new THREE.BoxBufferGeometry( 3, 3, 3 );
	const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	cube = new THREE.Mesh( geometry, material );
	cube.position.y = 5;

	scene.add( cube );

	const geometry1 = new THREE.BoxBufferGeometry( 3, 3, 3 );
	const material1 = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	cube1 = new THREE.Mesh( geometry1, material1 );

	scene.add( cube1 );

	raycaster = new THREE.Raycaster();
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	window.addEventListener( 'mousemove', onMouseMove, false );

}

function onMouseMove( event ) {

	event.preventDefault();
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	raycaster.setFromCamera( mouse, camera );

	//included in mousemove

	objects.push( cube );
	objects.push( cube1 );


	var intersects = raycaster.intersectObjects( objects, true );


	if ( intersects.length > 0 ) {

		var object = intersects[ 0 ].object;

		if ( object !== INTERSECTED ) 		{

			INTERSECTED = object;
			// gsap.to( INTERSECTED.scale, { duration: .7, x: 1.2, y: 1.2 } );
			

		}

	} else {
	
		if ( INTERSECTED !== null ) {
			
			// gsap.to( INTERSECTED.scale, { duration: .7, x: 1, y: 1 } );
			INTERSECTED = null;
	
		}
	
	}

}


function animate() {

	requestAnimationFrame( animate );
	renderer.render( scene, camera );

}
