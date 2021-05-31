import * as THREE from 'https://cdn.skypack.dev/three@latest';

export default class Plane{

    constructor(width, height, color){
        this.width = width;
        this.height = height;
        this.color = color
    };

    create(){
        const geometry = new THREE.PlaneGeometry( this.width, this.height );
        const material = new THREE.MeshPhongMaterial( {color: this.color, side: THREE.DoubleSide} );
        const plane = new THREE.Mesh( geometry, material );
        plane.castShadow = true;
        plane.receiveShadow = true;
        return plane;
    };
};