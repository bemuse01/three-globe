CLASS.Object.Globe = class Globe{
    constructor(three, param){
        this.#create(param)
        this.#render(three)
    }
    
    #render(three){
        const group = new THREE.Group()
        group.add(this.mesh)

        three.scene.add(group)
    }

    #create(param){
        this.#createGeometry(param)
        this.#createMaterial(param)
        const mesh = new THREE.Mesh(this.geometry, this.material)
        mesh.layers.set(param.layers)
        this.mesh = mesh
    }

    #createGeometry(param){
        const geometry = new THREE.SphereGeometry(param.radius, param.seg, param.seg)
        this.geometry = geometry
    }

    #createMaterial(param){
        const material = new THREE.ShaderMaterial({
            vertexShader: shader.globe.vertexShader,
            fragmentShader: shader.globe.fragmentShader,
            transparent: true,
            uniforms: {color: {value: new THREE.Color(param.color)}},
            blending: THREE.AdditiveBlending
        })
        this.material = material
    }

    getGroup(){
        return this.group
    }

    rotationX(vel){
        this.group.rotation.x += vel
    }

    rotationY(vel){
        this.group.rotation.y += vel
    }

    rotation(vel){
        this.group.rotation.x += vel
        this.group.rotation.y += vel
    }
}