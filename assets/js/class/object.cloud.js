CLASS.Object.Cloud = class Clound{
    constructor(three, param){
        this.#create(param)
        this.#render(three)
    }

    #render(three){
        const group = new THREE.Group()
        group.add(this.mesh)

        three.scene.add(group)

        this.group = group
    }

    #create(param){
        this.#createGeometry(param)
        this.#createMaterial(param)
        const mesh = new THREE.Points(this.geometry, this.material)
        // mesh.rotation.x = 85 * radian
        mesh.rotation.x = 88 * radian
        mesh.layers.set(param.layers)
        this.mesh = mesh
    }

    #createGeometry(param){
        const sample = new THREE.CircleGeometry(param.radius, param.seg)
        const geometry = new THREE.Geometry()
        sample.vertices.forEach(e => {
            const x = e.x * (Math.random() * (1 - param.rand) + param.rand)
            const y = e.y * (Math.random() * (1 - param.rand) + param.rand)
            const z = Math.random() * 2 - 1
            geometry.vertices.push(new THREE.Vector3(x, y, z))
        })
        this.geometry = geometry
    }

    #createMaterial(param){
        const texture = new THREE.TextureLoader().load(param.texture)
        
        const material = new THREE.PointsMaterial({
            color: param.color,
            transparent: true,
            opacity: param.opacity,
            size: param.size,
            map: texture
        })
        this.material = material
    }

    rotationY(vel){
        this.group.rotation.y += vel
    }

    sinMove(time, vel, val){
        this.group.rotation.z = Math.sin(time * vel) * val
    }
}