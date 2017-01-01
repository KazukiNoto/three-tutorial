let init = () => {

    //get window size
    let windowData = {
        width: window.innerWidth,
        height: window.innerHeight
    };

    //create scene
    let scene = new THREE.Scene();

    //create spotlight for the shadows
    let spotlight = new THREE.SpotLight(0xffffff);
    spotlight.position.set(600, 600, 600);
    spotlight.castShadow = true;
    spotlight.intensity = 2;

    scene.add(spotlight);

    //load OBJ,MTL files
    let mtlLoader = new THREE.MTLLoader();
    mtlLoader.setTexturePath( './assets/obj/city/' );
    mtlLoader.setPath( './assets/obj/city/' );
    mtlLoader.load( 'city.mtl', function( materials ) {

        materials.preload();

        let objLoader = new THREE.OBJLoader();
        objLoader.setMaterials( materials );
        objLoader.setPath( './assets/obj/city/' );
        objLoader.load( 'city.obj', function ( loadedMesh ) {

            //arrange the location
            loadedMesh.rotation.x = -0.3;
            loadedMesh.rotation.y = 0;
            loadedMesh.rotation.z = 0;
            loadedMesh.position.x = 500;
            loadedMesh.position.y = 250;
            loadedMesh.position.z = 1000;
            scene.add(loadedMesh);

        });

    });

    //create camera
    let camera = new THREE.PerspectiveCamera(
        45, windowData.width / windowData.height, 0.1, 3000
    );
    camera.position.x = 0;
    camera.position.y = 200;
    camera.position.z = 400;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    //create render
    let renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0xEEEEEE));

    renderer.setSize(windowData.width, windowData.height);
    renderer.shadowMap.enabled = true;
    renderer.setPixelRatio(window.devicePixelRatio);

    // add the output of the renderer to the html element
    document.getElementById('js-WebGL').appendChild(renderer.domElement);

    // call the render function
    let renderScene = () => {
        requestAnimationFrame(renderScene);
        renderer.render(scene, camera);
    };
    renderScene();

};

window.onload = init();