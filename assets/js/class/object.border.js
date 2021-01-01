CLASS.Object.Border = class Border{
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
        border.features.forEach(_geo => {
            _geo.geometry.coordinates.forEach(_crd => {
                _crd.forEach((e, ei) => {
                    if(Array.isArray(e[0])){
                        e.forEach((c, ci) => {
                            if(ci % 6 === 0){
                                const lat = c[0], lon = c[1]
                                const {x, y, z} = util.toSphereCoordinates(lon, lat, param.radius)
                                geometry.vertices.push(new THREE.Vector3(-x, y, -z))
                            }
                        })
                    }else{
                        if(ei % 6 === 0){
                            const lat = e[0], lon = e[1]
                            const {x, y, z} = util.toSphereCoordinates(lon, lat, param.radius)
                            geometry.vertices.push(new THREE.Vector3(-x, y, -z))
                        }
                    }
                })
            })
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
            blending: THREE.AdditiveBlending,
            map: texture,
            // sizeAttenuation: false
        })
        this.material = material
    }

    rotationY(vel){
        this.group.rotation.y += vel
    }
}