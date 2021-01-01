CLASS.Object.Line = class Line{
    constructor(three, param){
        this.#create(param)
        this.#render(three)
    }

    #render(three){
        three.scene.add(this.group)
    }

    #create(param){
        const group = new THREE.Group()
        countries.forEach(e => {
            const {CapitalLatitude, CapitalLongitude} = e
            const {x, y, z} = util.toSphereCoordinates(CapitalLatitude, CapitalLongitude, param.radius)

            const geometry = this.#createGeometry(x, y, z, param)
            const material = this.#createMaterial(x, y, z, param)
            const mesh = new THREE.Line(geometry, material)

            group.add(mesh)
        })
        this.group = group
    }

    #createGeometry(x, y, z, param){
        const geometry = new THREE.Geometry()
        
        geometry.vertices.push(new THREE.Vector3(-x / param.start, y / param.start, -z / param.start))
        geometry.vertices.push(new THREE.Vector3(-x * param.end, y * param.end, -z * param.end))

        return geometry
    }

    #createMaterial(x, y, z, param){
        // const material = new THREE.LineBasicMaterial({
        //     color: param.color,
        //     transparent: true,
        //     opacity: param.opacity
        // })

        const material = new THREE.ShaderMaterial({
            vertexShader: shader.line.vertexShader,
            fragmentShader: shader.line.fragmentShader,
            transparent: true,
            uniforms: {
                color: {
                  value: new THREE.Color(param.color)
                },
                origin: {
                  value: new THREE.Vector3(-x / param.start, y / param.start, -z / param.start)
                },
                limitDistance:{
                  value: 13.5
                }
            }
        })

        return material
    }

    rotationY(vel){
        this.group.rotation.y += vel
    }
}