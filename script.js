/*
 * @author tristangemus / https://github.com/learnthreejs/three-js-boilerplate/blob/example-dragcontrols-finish/public/examples/draggable-objects-dragcontrols/assets/DragControls.js
 * @author mrdoob / http://mrdoob.com
 * Running this will allow you to drag three.js objects around the screen.
 */

const h_scr = window.innerWidth;
const v_scr = window.innerHeight; 


const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x434343 );
const camera = new THREE.PerspectiveCamera( 70, h_scr/v_scr, 1, 10000 );
var objects = [];

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

camera.position.x = 200;
camera.position.z = 1000;

var startColor;

function init() {
	scene.add( new THREE.AmbientLight( 0x0f0f0f ) );

	var light = new THREE.SpotLight( 0xffffff, 1.5 );
	light.position.set( 0, 500, 2000 );

	scene.add(light);

    //Geometries 
	var cubeG = new THREE.BoxGeometry( 40, 40, 40 );
	var boxhG = new THREE.BoxGeometry( 20, 80, 40 );
	var boxwG = new THREE.BoxGeometry( 100, 20, 40 );
    var cylinG = new THREE.CylinderGeometry( 20, 20, 80 );
    var roofG = new THREE.CylinderGeometry( 20, 40, 40 );
    var coneG = new THREE.ConeGeometry( 30, 80, 60 );

    //object, number of objects
	objectmaker(cubeG, 10);
    objectmaker(boxhG, 10);
    objectmaker(boxwG, 10);
    objectmaker(roofG, 5);
    objectmaker(cylinG, 10);
    objectmaker(coneG, 5);

	var controls = new THREE.DragControls( objects, camera, renderer.domElement );
    //coloring selected object
	controls.addEventListener( 'dragstart', dragStartCallback );
	controls.addEventListener( 'dragend', dragendCallback );
}

function objectmaker(geometry, numbers) {
    for (var i = 0; i < numbers; i++) {
        var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } ) );

        object.position.x = Math.random() * 10 + 500;
        object.position.y = Math.random() * 600 - 300;
        object.position.z = 500;
        //object.position.z = Math.random() * 800 - 400;

        object.castShadow = true;
        object.receiveShadow = true;

        scene.add( object );

        objects.push( object );
    }
}

function dragStartCallback(event) {
	startColor = event.object.material.color.getHex();
	event.object.material.color.setHex(0xf3f3f3 );
}
function dragendCallback(event) {
	event.object.material.color.setHex(startColor);
}

function animate() {
	requestAnimationFrame( animate );

	renderer.render(scene, camera);
};

init();
animate();