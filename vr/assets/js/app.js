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
    spotlight.intensity = 1;

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
            loadedMesh.rotation.x = -0.25;
            loadedMesh.rotation.y = 0;
            loadedMesh.rotation.z = 0;
            loadedMesh.position.x = 500;
            loadedMesh.position.y = 210;
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

    //TrackballControls
    // let controls = new THREE.TrackballControls(camera);

    //VR controls 
    let controls = new THREE.VRControls(camera);

    // VR effect (2 separated monitor)
    let effect = new THREE.VREffect(renderer);
    effect.setSize(windowData.width, windowData.height);

    // VR manager
    let manager = new WebVRManager(renderer, effect);

    let lastRender = 0;
    // call the render function
    let renderScene = (timestamp) => {

        let delta = Math.min(timestamp - lastRender, 500);
        lastRender = timestamp;

        controls.update();

        // VRマネージャを通してシーンをレンダリング
        manager.render(scene, camera, timestamp);

        camera.position.y += 0.25;
        camera.position.z += 0.5;

        requestAnimationFrame(renderScene);
        renderer.render(scene, camera);
    };

    renderScene(performance ? performance.now() : Date.now());

    let fog = () => {
        scene.fog = new THREE.FogExp2( 0xffffff, 0.00055); //color, depth
    };
    fog();

};

window.onload = init();