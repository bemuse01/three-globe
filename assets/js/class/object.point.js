CLASS.Object.Point = class Point{
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
        mesh.layers.set(param.layers)
        this.mesh = mesh
    }

    #createGeometry(param){
        const geometry = new THREE.Geometry()
        // const position = []
        grid.forEach((e, i) => {
            const {lat, lon} = e
            const {x, y, z} = util.toSphereCoordinates(lat, lon, param.radius)
            geometry.vertices.push(new THREE.Vector3(-x, -y, -z))
            // position[i * 3] = -x
            // position[i * 3 + 1] = -y
            // position[i * 3 + 2] = -z
        })
        // const vertices = new Float32Array(position)
        // geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3))
        this.geometry = geometry
        console.log(geometry)
    }

    #createMaterial(param){
        const texture = new THREE.TextureLoader().load(param.texture)

        const material = new THREE.PointsMaterial({
            color: param.color,
            transparent: true,
            opacity: param.opacity,
            size: param.size,
            blending: THREE.AdditiveBlending,
            map: texture,
            // sizeAttenuation: false
        })
        // const material = new THREE.ShaderMaterial({
        //     vertexShader: shader.point.vertexShader,
        //     fragmentShader: shader.point.fragmentShader,
        //     transparent: true,
        //     uniforms: {
        //         color: {value: new THREE.Color(param.color)}
        //     },
        //     // blending: THREE.AdditiveBlending
        // })
        this.material = material
    }

    getGroup(){
        return this.group
    }

    dispose(three){
        const object = three.scene.getObjectById(this.group.uuid)
        three.scene.remove(object)
        this.geometry.dispose()
        this.material.dispose()
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