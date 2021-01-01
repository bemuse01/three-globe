CLASS.Object.Ring = class Ring{
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
        const mesh = new THREE.Line(this.geometry, this.material)
        mesh.rotation.x = 85 * radian
        // mesh.rotation.y = 25 * radian
        mesh.layers.set(param.layers)
        this.mesh = mesh
    }

    #createGeometry(param){
        const sample = new THREE.CircleGeometry(param.radius, param.seg)
        // const geometry = new THREE.Geometry()
        // sample.vertices.forEach((e, i) => {
        //     if(i !== 0) geometry.vertices.push(e)
        //     if(i === sample.vertices.length - 1) geometry.vertices.push(sample.vertices[1])
        // })
        // this.geometry = geometry
        const geometry = new THREE.BufferGeometry()
        const position = []
        this.opacity = new Float32Array(sample.vertices.length)
        sample.vertices.forEach((e, i, l) => {
            if(i !== 0){
                position[i * 3] = e.x
                position[i * 3 + 1] = e.y
                position[i * 3 + 2] = e.z
            }
            if(i === sample.vertices.length - 1){
                position[i * 3] = l[1].x
                position[i * 3 + 1] = l[1].y
                position[i * 3 + 2] = l[1].z
            }
            // if(i < sample.vertices.length - 1) opacity[i] = Math.random() * 0.75 + 0.25
            // else opacity.push(opacity[0]) 
            if(i === 0) this.opacity[i] = 0.0
            else this.opacity[i] = 1.0
        })
        geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(position), 3))
        geometry.setAttribute('opacity', new THREE.BufferAttribute(this.opacity, 1))
        geometry.idx = [0, 1, 2, 3]
        this.geometry = geometry
        console.log(this.opacity)
    }

    #createMaterial(param){
        // const material = new THREE.LineBasicMaterial({
        //     color: param.color,
        //     transparent: true,
        //     opacity: param.opacity
        // })
        const material = new THREE.ShaderMaterial({
            vertexShader: shader.ring.vertexShader,
            fragmentShader: shader.ring.fragmentShader,
            transparent: true,
            uniforms: {
                color: {
                  value: new THREE.Color(param.color)
                },
                time: {
                    value: window.performance.now() * 0.001
                }
            }
        })
        this.material = material
    }

    sinMove(time, vel, val){
        this.group.rotation.z = Math.sin(time * vel) * val
    }

    updateOpacity(){
        for(let i = 0; i < this.opacity.length; i++) this.opacity[i] = 1.0
        for(let i = 0; i < this.geometry.idx.length; i++){
            this.opacity[this.geometry.idx[i]] = 0.0
            this.geometry.idx[i] = (this.geometry.idx[i] + 1) % this.opacity.length
        }
        this.geometry.attributes.opacity.needsUpdate = true
    }
}