let init = () => {

    //get window size
    let windowData = {
        width: window.innerWidth,
        height: window.innerHeight
    };

    //create scene
    let scene = new THREE.Scene();

    //create camera
    let camera = new THREE.PerspectiveCamera(
        45,windowData.width / windowData.height, 0.1 , 1000
    );

    //create render & set data
    let renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0xEEEEEE));
    renderer.setSize(windowData.width, windowData.height);
    renderer.shadowMapEnabled = true;

    // let axes = new THREE.AxisHelper(20);
    // scene.add(axes);

    // create the ground plane
    let planeGeometry = new THREE.PlaneGeometry(100, 20);
    let planeMaterial = new THREE.MeshLambertMaterial({
        color: 0xFFFFFF
    });
    let plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;

    //rotate and position the plane
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;

    scene.add(plane);

    // create a cube
    let cubeGeometry = new THREE.BoxGeometry(5, 20, 5);
    let cubeMaterial = new THREE.MeshLambertMaterial({
        color: 0xff0000, wireframe: false
    });
    let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;

    // position the cube
    cube.position.x = 4;
    cube.position.y = 0;
    cube.position.z = 20;

    scene.add(cube);

    // position and point the camera to the center of the scene
    camera.position.x = -50;
    camera.position.y = 5;
    camera.position.z = 0;
    camera.lookAt(scene.position);

    let controls = new THREE.TrackballControls(camera);

    // add spotlight for the shadows
    let spotlight = new THREE.SpotLight(0xffffff);
    spotlight.position.set(-20, 30, -5);
    spotlight.castShadow = true;

    scene.add(spotlight);

    // add the output of the renderer to the html element
    document.getElementById('js-WebGL').appendChild(renderer.domElement);

    // call the render function
    let renderScene = () => {
        controls.update();
        // stats.update();

        // camera.position.x += 0.01;


        requestAnimationFrame(renderScene);
        renderer.render(scene, camera);
    };
    renderScene();

};

window.onload = init();