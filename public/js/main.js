import * as THREE from 'https://cdn.skypack.dev/three@latest';
import { OrbitControls } from 'https://cdn.skypack.dev/three@latest/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@latest/examples/jsm/loaders/GLTFLoader.js';
import Plane from './classes/Plane.js';
import Cube from './classes/Cube.js';
import Loader from './classes/Loader.js';

let scene,
camera,
renderer,
controls,
gltfLoader,
textureLoader;

const init = () => {
    // Scene, Camera and Renderer
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    // OrbitControls, GLTFLoader and TextureLoader
    controls = new OrbitControls(camera, renderer.domElement);
    gltfLoader = new GLTFLoader();
    textureLoader = new THREE.TextureLoader();

    // PointLight
    const pointLight = new THREE.PointLight( 0xffffff, 1.5);
    pointLight.position.set(10, 15, 20);

    // Ground
    const ground = new Cube(20, 0.67, 20).create();
    ground.position.set(-0.5, -0.3, -0.5);
    textureLoader.load('/textures/floor/marble_01_spec_1k.png',
    (texture) => {
        ground.material = new THREE.MeshBasicMaterial({ map: texture });
    },
    (err) => console.error(`An error happend. ${err}`)
    );   

    // Sidewall
    const sidewall = new Cube(0.67, 10, 20).create();
    sidewall.position.set(-10.85, 4.36, -0.5);
    textureLoader.load('/textures/sandstone/sandstone_blocks_08_diff_1k.png',
    (texture) => {
        sidewall.material = new THREE.MeshBasicMaterial({ map: texture });
    },
    (err) => console.error(`An error happend. ${err}`)
    );   

    // Backwall
    const backwall = new Cube(20.67, 10, 0.67).create();
    backwall.position.set(-0.85, 4.36, -10.85);
    textureLoader.load('/textures/sandstone/sandstone_blocks_08_diff_1k.png',
    (texture) => backwall.material = new THREE.MeshBasicMaterial({ map: texture }),
    (err) => console.error(`An error happend. ${err}`)
    );   

    // First Floor
    const firstFloor = new Cube(10.2, 0.67, 20).create();
    firstFloor.position.set(4.4, 4.6, -0.5);

    const firstFloor2 = new Cube(9.8, 0.67, 13.7).create();
    firstFloor2.position.set(-5.6, 4.6, -3.7);
    textureLoader.load('/textures/floor/marble_01_spec_1k.png',
    (texture) => {
        firstFloor.material = new THREE.MeshBasicMaterial({ map: texture });
        firstFloor2.material = new THREE.MeshBasicMaterial({ map: texture });
    },
    (err) => console.error(`An error happend. ${err}`)
    );   
    
    // Furniture loading
    const couch = new Loader(gltfLoader, scene, 'modern_couch', 0.025, -5, -0.01, -4.5);
    const stairs = new Loader(gltfLoader, scene, 'stairs', 0.037, -7.7, -0.01, 8.8);
    const plant = new Loader(gltfLoader, scene, 'plant', 0.5, -9, 0, 8);
    const coffeTable = new Loader(gltfLoader, scene, 'coffe_table', 0.02, -3, 0, -3);
    const pottedPlant = new Loader(gltfLoader, scene, 'potted_plant', 0.05, -3, 0.85, -2.8);
    const bed = new Loader(gltfLoader, scene, 'cubes_bed', 3, -7.5, 5.85, -7, -Math.PI / 2);
    const cyberDesk = new Loader(gltfLoader, scene, 'cyber_desk', 0.6, 5, 4.6, -6.3);
    const modernTable = new Loader(gltfLoader, scene, 'modern_table', 0.01, 5, 0, 5, Math.PI / 2);
    const poolTable = new Loader(gltfLoader, scene, 'pool_table', 0.05, 5, 5.5, 0);
    const bar = new Loader(gltfLoader, scene, 'bar_table', 0.07, 6, 4.7, 7);
    const kitchen = new Loader(gltfLoader, scene, 'kitchen', 1.5, 4.5, 0, -9.7);

    // Adding to scene
    scene.add(
       pointLight,
       ground,
       sidewall,
       backwall,
       firstFloor,
       firstFloor2,
    );
    
    // Cameraposition
    camera.position.set(7, 5, 20);
    
    // Animate
    const animate = () => {
        requestAnimationFrame( animate );

        controls.update();

        renderer.render( scene, camera );
    };

    // Screen fits Window
    window.addEventListener('resize', onWindowResize, false);

    animate();
}

init();

// Functions

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
