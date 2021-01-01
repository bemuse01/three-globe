CLASS.Object.Hexagon = class Hexagon{
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
            icosa: new THREE.IcosahedronGeometry(param.radius.icosa, param.seg.icosa),
            circle: new THREE.CircleGeometry(param.radius.circle, param.seg.circle),
            border: new THREE.RingGeometry(param.radius.border, param.radius.border + param.size, param.seg.border)
        }
        return geometry
    }

    #createMaterial(param){
        const material = {
            icosa: new THREE.MeshBasicMaterial({
                color: param.color,
                transparent: true,
                opacity: param.opacity.icosa,
                wireframe: true
            }),
            circle: new THREE.MeshBasicMaterial({
                color: param.color,
                transparent: true,
                opacity: param.opacity.circle,
                side: THREE.DoubleSide
            }),
            border: new THREE.MeshBasicMaterial({
                color: param.color,
                transparent: true,
                opacity: param.opacity.border,
                side: THREE.DoubleSide
            })
        }
        return material
    }

    #createMesh(three, param){
        const group = new THREE.Group()
        const sample = new THREE.IcosahedronGeometry(param.radius.sample, param.seg.sample)
        sample.vertices.forEach((e, idx) => {
            const local = new THREE.Group()
            const geometry = this.#createGeometry(param)
            const material = this.#createMaterial(param)
            const mesh = {
                icosa: new THREE.Mesh(geometry.icosa, material.icosa),
                // circle: new THREE.Mesh(geometry.circle, material.circle),
                // border: new THREE.Mesh(geometry.border, material.border)
            }
            for(let i in mesh){
                // if(i === 'icosa' && idx % 4 === 0) continue
                mesh[i].position.set(e.x, e.y, e.z)
                mesh[i].lookAt(three.scene.position)
                mesh[i].layers.set(param.layers)
                local.add(mesh[i])
            }
            group.add(local)
        })
        this.group = group
    }

    rotation(vel){
        // this.group.rotation.x += vel
        this.group.rotation.y += vel
    }
}