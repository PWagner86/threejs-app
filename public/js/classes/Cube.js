import * as THREE from 'https://cdn.skypack.dev/three@0.136';

export default class Cube{

    constructor(width, height, depth){
        this.width = width;
        this.height = height;
        this.depth = depth;
    };

    create(){
        const geometry = new THREE.BoxGeometry(this.width, this.height, this.depth);
        const material = new THREE.MeshPhongMaterial( { color: 0xa59d9d } );
        const cube = new THREE.Mesh( geometry, material );
        cube.castShadow = true;
        cube.receiveShadow = true;
        return cube;
    };
};