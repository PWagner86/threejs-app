import * as THREE from 'https://cdn.skypack.dev/three@latest';

export default class Plane{

    constructor(width, height){
        this.width = width;
        this.height = height;
    };

    create(){
        const geometry = new THREE.PlaneGeometry( this.width, this.height );
        const material = new THREE.MeshBasicMaterial({ color: 0xa59d9d, side: THREE.DoubleSide } );
        const plane = new THREE.Mesh( geometry, material );
        plane.castShadow = true;
        plane.receiveShadow = true;
        return plane;
    };
};