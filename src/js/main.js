import raf from 'raf';



function update{
	console.log("updating");
	raf(update);
}

raf(update);

function resize(){
	camera.aspect = window.innerWidth / window.innerHeight; 
	camera.updateProjectionMatrix();
}

window.addEventListener('resize', resize);