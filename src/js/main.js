import raf from 'raf';
import {Mesh, 
		Scene, 
		Texture, 
		ImageUtils, 
		// StereoEffect,
		WebGLRenderer, 
		// SphereGeometry,
		BoxGeometry, 
		PerspectiveCamera, 
		MeshBasicMaterial, 
		// MeshPhongMaterial, 
		// MeshLambertMaterial, 
		// DeviceOrientationControls
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

	let boxGeom = new BoxGeometry(1,1,1);
	let boxMat = new MeshBasicMaterial({color:0xfb4466});
	
	box = new Mesh(boxGeom,boxMat);

	scene.add(box);

	camera.position.z = 5;

	// Start render chain
	raf(update);
}

function update(){
	box.rotation.y +=.01;
	box.rotation.x +=.01;
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