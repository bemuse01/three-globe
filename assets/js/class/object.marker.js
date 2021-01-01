CLASS.Object.Marker = class Marker{
    constructor(three, param){
        this.#create(three, param)
        this.#render(three)
    }

    #render(three){
        three.scene.add(this.group)
    }

    #create(three, param){
        this.#createMesh(three, param)
    }

    #createGeometry(param){
        const geometry = {
            // center: new THREE.CircleGeometry(param.size.center, param.seg),
            center: new THREE.RingGeometry(param.size.center, param.size.center + param.dist, param.seg),
            border: new THREE.RingGeometry(param.size.border, param.size.border + param.dist, param.seg),
            glow: new THREE.CircleGeometry(param.size.glow, param.seg)
        }
        return geometry
    }

    #createMaterial(param){
        const material = {
            center: new THREE.MeshBasicMaterial({
                color: param.color.center,
                transparent: true,
                opacity: param.opacity.center,
                side: THREE.DoubleSide
            }),
            border: new THREE.MeshBasicMaterial({
                color: param.color.border,
                transparent: true,
                opacity: param.opacity.border,
                side: THREE.DoubleSide
            }),
            glow: new THREE.MeshBasicMaterial({
                color: param.color.glow,
                transparent: true,
                opacity: param.opacity.glow,
                side: THREE.DoubleSide
            })
        }
        return material
    }

    #createMesh(three, param){
        const group = new THREE.Group()
        countries.forEach(e => {
            const local = new THREE.Group()

            const geometry = this.#createGeometry(param)
            const material = this.#createMaterial(param)
            const mesh = {
                center: new THREE.Mesh(geometry.center, material.center),
                border: new THREE.Mesh(geometry.border, material.border),
                glow: new THREE.Mesh(geometry.glow, material.glow)
            }

            const {CapitalLatitude, CapitalLongitude} = e
            const {x, y, z} = util.toSphereCoordinates(CapitalLatitude, CapitalLongitude, param.radius)

            for(let m in mesh) {
                mesh[m].position.set(-x, y, -z)
                mesh[m].lookAt(three.scene.position)
                mesh[m].layers.set(param.layers[m])
                local.add(mesh[m])
            }

            group.add(local)
        })
        this.group = group
    }

    getGroup(){
        return this.group
    }

    rotationY(vel){
        this.group.rotation.y += vel
    }
}