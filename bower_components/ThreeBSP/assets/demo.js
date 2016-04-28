var renderer, scene, camera, light;

console.log("Demo will load 1 second after the DOM");

document.addEventListener("DOMContentLoaded", setTimeout(function() {

	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.getElementById('viewport').appendChild(renderer.domElement);

	scene = new THREE.Scene();

	light = new THREE.DirectionalLight( 0xffffff );
	light.position.set( 1, 1, 1 ).normalize();
	scene.add( light );

	camera = new THREE.PerspectiveCamera(
		35,
		window.innerWidth / window.innerHeight,
		1,
		1000
	);
	camera.position.set( 5, 5, 15 );
	camera.lookAt( scene.position );
	scene.add( camera );

	// Example #1 - Cube (mesh) subtract Sphere (mesh)
	(function() {
		var start_time = (new Date()).getTime();

		var cube_geometry = new THREE.CubeGeometry( 3, 3, 3 );
		var cube_mesh = new THREE.Mesh( cube_geometry );
		cube_mesh.position.x = -7;
		var start, stop;
		start = Date.now();
		p = {};
		var cube_bsp = new ThreeBSP( cube_mesh, {timeout: 2000, progress: function(c,t) {
		  percent = Math.round(c/t * 100)
		  if(p['P' + percent] === undefined) {
			p['P' + percent] = true;
			console.log(percent + "%");
		  }
		}});
		stop = Date.now();
		console.log("Elapsed(build cube): ", stop - start);


		var sphere_geometry = new THREE.SphereGeometry( 1.8, 32, 32 );
		var sphere_mesh = new THREE.Mesh( sphere_geometry );
		sphere_mesh.position.x = -7;
		start = Date.now();
		var sphere_bsp = new ThreeBSP( sphere_mesh, {timeout: 3000} );
		stop = Date.now();
		console.log("Elapsed(build sphere): ", stop - start);


		start = Date.now();
		var subtract_bsp = cube_bsp.subtract( sphere_bsp );
		stop = Date.now();
		console.log("Elapsed(cube - sphere): ", stop - start);
		start = Date.now();
		var result = subtract_bsp.toMesh( new THREE.MeshLambertMaterial({ shading: THREE.SmoothShading, map: THREE.ImageUtils.loadTexture('assets/texture.png') }) );
		stop = Date.now();
		console.log("Elapsed(toMesh): ", stop - start);
		result.geometry.computeVertexNormals();
		scene.add( result );

		console.log( 'Example 1: ' + ((new Date()).getTime() - start_time) + 'ms' );
	})();

	// Example #2 - Sphere (geometry) union Cube (geometry)
	(function() {
		var start_time = (new Date()).getTime();

		var sphere_geometry = new THREE.SphereGeometry( 2, 16, 16 );
		var sphere_bsp = new ThreeBSP( sphere_geometry );

		var cube_geometry = new THREE.CubeGeometry( 7, .5, 3 );
		var cube_bsp = new ThreeBSP( cube_geometry );

		var union_bsp = sphere_bsp.union( cube_bsp );

		var result = union_bsp.toMesh( new THREE.MeshLambertMaterial({ shading: THREE.SmoothShading, map: THREE.ImageUtils.loadTexture('assets/texture.png') }) );
		result.geometry.computeVertexNormals();
		scene.add( result );

		console.log( 'Example 2: ' + ((new Date()).getTime() - start_time) + 'ms' );
	})();


	// Example #3 - Sphere (geometry) intersect Sphere (mesh)
	(function() {
		var start_time = (new Date()).getTime();

		var sphere_geometry_1 = new THREE.SphereGeometry( 2, 64, 8 );
		var sphere_bsp_1 = new ThreeBSP( sphere_geometry_1 );

		var sphere_geometry_2 = new THREE.SphereGeometry( 2, 8, 32 );
		var sphere_mesh_2 = new THREE.Mesh( sphere_geometry_2 );
		sphere_mesh_2.position.x = 2;
		var sphere_bsp_2 = new ThreeBSP( sphere_mesh_2 );

		var intersect_bsp = sphere_bsp_1.intersect( sphere_bsp_2 );

		var result = intersect_bsp.toMesh( new THREE.MeshLambertMaterial({ shading: THREE.SmoothShading, map: THREE.ImageUtils.loadTexture('assets/texture.png') }) );
		result.position.x = 6;
		result.geometry.computeVertexNormals();
		scene.add( result );

		console.log( 'Example 3: ' + ((new Date()).getTime() - start_time) + 'ms' );
	})();

	(function render() {
		requestAnimationFrame( render );
		renderer.render(scene, camera);
	})();
}, 1000))