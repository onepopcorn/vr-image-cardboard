import raf from 'raf';
import {Mesh, 
		Scene, 
		Texture, 
		ImageUtils, 
		WebGLRenderer, 
		SphereGeometry,
		PerspectiveCamera, 
		MeshBasicMaterial, 
		Vector2,
		RepeatWrapping,
		BackSide
		} from 'three';

import DeviceOrientationControls from './DeviceOrientationControls';

let width = window.innerWidth;
let height = window.innerHeight;
let box,
	scene,
	sphere,
	sphere2,
	control, 
	renderer, 
	texture_l, 
	texture_r, 
	container,
	cameraLeft, 
	cameraRight;

function init(){
	setup();

	texture_l = ImageUtils.loadTexture('images/texture_l.jpg');
	texture_r = ImageUtils.loadTexture('images/texture_l.jpg');

	let geom = new SphereGeometry(1000,32,32);
	let mat = new MeshBasicMaterial({map:texture_l});
	mat.side = BackSide;
	sphere = new Mesh(geom,mat);
	scene.add(sphere);

	let geom2 = new SphereGeometry(1000,32,32);
	let mat2 = new MeshBasicMaterial({map:texture_r});
	mat2.side = BackSide;
	sphere2 = new Mesh(geom,mat);
	sphere2.position.x = 5000;
	scene.add(sphere2);

	cameraLeft.position.z = 3000;
	cameraRight.position.z = 3000;

	control = new DeviceOrientationControls(cameraLeft);

	// Start render chain
	raf(update);
}

function setup(){
	container = document.getElementById('container');
	scene = new Scene();
	cameraLeft = new PerspectiveCamera(45,(width * 0.5)/height,0.1,10000);
	cameraRight = new PerspectiveCamera(45,(width * 0.5)/height,0.1,10000);
	cameraRight.position.x = 5000;
	renderer = new WebGLRenderer();
	renderer.setSize(width,height);	
	container.appendChild(renderer.domElement);
}

function preload(){

}

function update(){
	// sphere.rotation.y +=.005;
	// sphere2.rotation.y +=.005;
	control.update();
	render();
	raf(update);
}

function render(){
	renderer.setViewport(0, 0, Math.round(width * 0.5), height);
	renderer.setScissor(0, 0, Math.round(width * 0.5), height);
	renderer.enableScissorTest ( true );
	renderer.render(scene,cameraLeft);

	renderer.setViewport(width * 0.5, 0, Math.round(width * 0.5), height);
	renderer.setScissor(width * 0.5, 0, Math.round(width * 0.5), height);
	renderer.enableScissorTest ( true );
	renderer.render(scene,cameraRight);
}

function resize(){
	// camera.aspect = window.innerWidth / window.innerHeight; 
	// camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth,window.innerHeight);
}

window.addEventListener('resize', resize);

init();