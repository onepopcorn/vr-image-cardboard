import raf from 'raf';
import {Mesh, 
		Scene, 
		Texture, 
		ImageUtils, 
		WebGLRenderer, 
		SphereGeometry,
		PerspectiveCamera, 
		MeshBasicMaterial, 
		// DeviceOrientationControls
		DoubleSide
		} from 'three';

let width = window.innerWidth;
let height = window.innerHeight;
let box,
	scene, 
	camera, 
	sphere,
	renderer, 
	container;

function init(){
	container = document.getElementById('container');
	
	scene = new Scene();
	
	camera = new PerspectiveCamera(45,width/height,0.1,10000);
	
	renderer = new WebGLRenderer();
	renderer.setSize(width,height);
	
	container.appendChild(renderer.domElement);

	let geom = new SphereGeometry(1000,32,32);
	let mat = new MeshBasicMaterial({color:0xffffff});
	mat.side = DoubleSide;
	sphere = new Mesh(geom,mat);
	scene.add(sphere);

	camera.position.z = 30;

	// Start render chain
	raf(update);
}

function update(){
	// box.rotation.y +=.01;
	// box.rotation.x +=.01;
	render();
	raf(update);
}

function render(){
	renderer.render(scene,camera);
}

function resize(){
	camera.aspect = window.innerWidth / window.innerHeight; 
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth,window.innerHeight);
	console.log("resized");
}

window.addEventListener('resize', resize);

init();