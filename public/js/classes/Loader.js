export default class Loader{

    constructor(loader, scene, model, size, x, y, z){
        this.loader = loader;
        this.scene = scene;
        this.model = model;
        this.size = size;
        this.x = x;
        this.y = y;
        this.z = z;
        this.loadModel();
    };

    loadModel(){
        this.loader.load(`/models/${this.model}/scene.gltf`, (gltf) => {
            this.scene.add(gltf.scene);
            gltf.scene.scale.set(this.size, this.size, this.size);
            gltf.scene.position.set(this.x, this.y, this.z);
            gltf.castShadow = true;
            gltf.receiveShadow = true;
        });
    };
};