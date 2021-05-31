import * as THREE from 'https://cdn.skypack.dev/three@latest';
import { OrbitControls } from 'https://cdn.skypack.dev/three@latest/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@latest/examples/jsm/loaders/GLTFLoader.js';
import Plane from './classes/Plane.js';
import Loader from './classes/Loader.js';

let scene,
camera,
renderer,
controls,
gltfLoader;

const init = () => {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    controls = new OrbitControls(camera, renderer.domElement);
    gltfLoader = new GLTFLoader();

    const pointLight = new THREE.PointLight( 0xffffff, 1.5);
    pointLight.position.set(10, 15, 20);

    const ground = new Plane(16, 15, 0xffffff).create();
    ground.rotation.x = Math.PI / 2;

    const groundParam = ground.geometry.parameters;

    const sidewall = new Plane(15, 10, 0x50505f).create();
    sidewall.rotation.y = Math.PI / 2;
    sidewall.position.set(- groundParam.width / 2, groundParam.height / 3, 0);

    const backwall = new Plane(16, 10, 0x50505f).create();
    backwall.position.set(0, groundParam.height / 3, - groundParam.height / 2);

    const midLevel = new Plane(7, 15, 0xa59d9d).create();
    midLevel.rotation.x = Math.PI / 2;
    midLevel.position.set(groundParam.width / 3.5, groundParam.height / 3, 0);

    const couch = new Loader(gltfLoader, scene, 'modern_couch', 0.015, -5, 0.01, -4.5);
    const bookShelves = new Loader(gltfLoader, scene, 'book_shelves', 2, 5.9, 6.6, -7.35);
    const stairs = new Loader(gltfLoader, scene, 'stairs', 0.037, -7.7, 0.01, 8.8);

    scene.add(
       pointLight,
       ground,
       sidewall,
       backwall,
       midLevel
    );

    camera.position.set(5, 10, 20);

    const animate = function () {
        requestAnimationFrame( animate );

        controls.update();

        renderer.render( scene, camera );
    };

    window.addEventListener('resize', onWindowResize, false);

    animate();
}

init();

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

