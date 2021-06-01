export default class Loader{

    constructor(loader, scene, model, size, x, y, z, rotation = 0){
        this.loader = loader;
        this.scene = scene;
        this.model = model;
        this.size = size;
        this.x = x;
        this.y = y;
        this.z = z;
        this.rotation = rotation
        this.loadModel();
    };

    loadModel(){
        this.loader.load(`/models/${this.model}/scene.gltf`, (gltf) => {            
            this.scene.add(gltf.scene);
            gltf.scene.scale.set(this.size, this.size, this.size);
            gltf.scene.position.set(this.x, this.y, this.z);
            gltf.scene.rotation.y = this.rotation
            gltf.castShadow = true;
            gltf.receiveShadow = true;
        }, 
            (xhr) => {
                console.log( `${Math.floor( xhr.loaded / xhr.total * 100 )}% loaded` )
                if(xhr.loaded / xhr.total === 1){
                    console.log(`${this.model} completed`);
                };
            },
            (err) => console.log(`An error happend. ${err}`)
        );
    };
};