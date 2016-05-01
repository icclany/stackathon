var THREEx	= THREEx	|| {}

THREEx.MontainsArena	= function(){
	var container	= new THREE.Object3D()
	// outside row
	THREEx.MontainsArena.buildArenaRow({
		container	: container,
		radius		: 90,
		nClusters	: 30,
		nPerCluster	: 3,
		heightMin	: 5,
		heightMax	: 10,
		radiusBottomMin	: 10,
		radiusBottomMax	: 15,
	})
	// outside row
	THREEx.MontainsArena.buildArenaRow({
		container	: container,
		radius		: 80,
		nClusters	: 10,
		nPerCluster	: 1,
		heightMin	: 2,
		heightMax	: 5,
		radiusBottomMin	: 10,
		radiusBottomMax	: 15,
	})
	// return container
	return container;
}

THREEx.MontainsArena.defaultMaterial = THREE.MeshPhongMaterial

THREEx.MontainsArena.buildArenaRow	= function(opts){
	// handle default arguments
	opts			= opts	|| {}
	var container		= opts.container	|| console.assert(false, 'This arguments is required')
	var radius		= opts.radius !== undefined		? opts.radius		: 10/20
	var nClusters		= opts.nCluster	!== undefined		? opts.nClusters	: 30
	var nPerCluster		= opts.nPerCluster !== undefined	? opts.nPerCluster	: 5
	var heightMin		= opts.heightMin !== undefined		? opts.heightMin	: 2/20
	var heightMax		= opts.heightMax !== undefined		? opts.heightMax	: 3/20
	var radiusBottomMin	= opts.radiusBottomMin !== undefined	? opts.radiusBottomMin	: 0.8/20
	var radiusBottomMax	= opts.radiusBottomMax !== undefined	? opts.radiusBottomMax	: 0.8/20
	
	var material		= new THREEx.MontainsArena.defaultMaterial({
		 map: THREE.ImageUtils.loadTexture('images/hay.jpg')
	})
	for(var i = 0; i < nClusters; i++ ){
		var angle	= (i / nClusters) * (Math.PI*2);
		for(var j = 0; j < nPerCluster; j++){
			var deltaAngle	= THREE.Math.randFloatSpread(2/nClusters) * (Math.PI*2);
			var height	= THREE.Math.randFloat( heightMin, heightMax );
			var radiusBottom= THREE.Math.randFloat( radiusBottomMin, radiusBottomMax );
			var geometry	= new THREE.BoxGeometry(radiusBottom, height, radiusBottom)
			var mesh	= new THREE.Mesh(geometry, material)
			mesh.position.y	= height/2
			mesh.position.x	= opts.radius * Math.cos(angle + deltaAngle)
			mesh.position.z	= opts.radius * Math.sin(angle + deltaAngle)
			opts.container.add(mesh)
		}
	}
	return opts.container;
}

