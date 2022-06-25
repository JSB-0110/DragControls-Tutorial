const h_scr = window.innerWidth;
const v_scr = window.innerHeight; 

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x434343 );
const camera = new THREE.PerspectiveCamera(45, h_scr/v_scr, 0.1, 1000);
camera.position.z = 10;

var objects = [];

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var startColor;

const geometry = new THREE.IcosahedronGeometry();
const material1 = new THREE.MeshPhongMaterial( { color: 0xff0000, shininess : 90.0 });
const obj = new THREE.Mesh( geometry, material1 );
scene.add(obj); 

objects.push(obj);

const light1 = new THREE.DirectionalLight(0xffffff, 0.5); 
	light1.position.set (0,0,10); 
	scene.add( light1 ); 

var controls = new THREE.DragControls( objects, camera, renderer.domElement );
//coloring selected object
controls.addEventListener( 'dragstart', dragStartCallback );
controls.addEventListener( 'dragend', dragendCallback );


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

animate();