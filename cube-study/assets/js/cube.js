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

    //create cube
    let geometry = new THREE.BoxGeometry(100, 100, 100);
    let material = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true
    });
    let cube = new THREE.Mesh(geometry, material);

    scene.add(cube);

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

    // //TrackballControls
    // let controls = new THREE.TrackballControls(camera);

    //render
    renderer.render(scene, camera);

    // call the render function
    // let renderScene = () => {
    //     controls.update();
    //     requestAnimationFrame(renderScene);
    //     renderer.render(scene, camera);
    // };
    // renderScene();

}
;

window.onload = init();