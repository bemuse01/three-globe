new Vue({
    el: '#wrap',
    data(){
        return{
            util: {
                width: window.innerWidth,
                height: window.innerHeight,
                ratio: window.devicePixelRatio,
                radian: Math.PI / 180
            }
        }
    },
    computed: {

    },
    mounted(){
        this.init()
    },
    methods: {
        // init
        init(){
            console.log(border)
            this.threeInit()
            this.animate()
            window.addEventListener('resize', this.onWindowResize, false)
        },


        // three
        threeInit(){
            const canvas = document.querySelector('#canvas')

            CLASS.Object.Three.init(canvas, param.three, this.util)
            CLASS.Object.Three.postprocess(param.three, this.util, param.object.postprocess)
            this.objects()
            this.threeTweens()
        },
        objects(){
            this.objectGlobe()
            this.objectPoint()
            this.objectMarker()
            this.objectLine()
            // this.objectBorder()
            this.objectRing()
            this.objectHexagon()
            this.objectCloud()
        },
        moves(){
            const time = window.performance.now()

            param.three.object.point.rotationY(0.002)
            param.three.object.marker.rotationY(0.002)
            param.three.object.line.rotationY(0.002)
            // param.three.object.border.rotationY(0.002)
            param.three.object.ring.sinMove(time, 0.0005, 0.1)
            param.three.object.ring.updateOpacity()
            param.three.object.hexagon.rotation(0.002)

            param.three.object.cloud.forEach((e, i) => {
                e.rotationY(param.object.cloud[i].vel.rot)
                e.sinMove(time, param.object.cloud[i].vel.sin, 0.1)
            })
        },
        objectPoint(){
            const object = new CLASS.Object.Point(param.three, param.object.point)
            param.three.object.point = object
        },
        objectGlobe(){
            const object = new CLASS.Object.Globe(param.three, param.object.globe)
            param.three.object.globe = object
        },
        objectMarker(){
            const object = new CLASS.Object.Marker(param.three, param.object.marker)
            param.three.object.marker = object
        },
        objectLine(){
            const object = new CLASS.Object.Line(param.three, param.object.line)
            param.three.object.line = object
        },
        objectBorder(){
            const object = new CLASS.Object.Border(param.three, param.object.border)
            param.three.object.border = object
        },
        objectRing(){
            const object = new CLASS.Object.Ring(param.three, param.object.ring)
            param.three.object.ring = object
        },
        objectHexagon(){
            const object = new CLASS.Object.Hexagon(param.three, param.object.hexagon)
            param.three.object.hexagon = object
        },
        objectCloud(){
            const object = []
            param.object.cloud.forEach(e => {
                object.push(new CLASS.Object.Cloud(param.three, e))
            })
            param.three.object.cloud = object
        },


        // tween
        threeTweens(){
            new CLASS.Tween.Glow(param.three.object.marker.getGroup(), param.tween.glow)
        },


        // util
        onWindowResize(){
            this.util.width = window.innerWidth
            this.util.height = window.innerHeight

            CLASS.Object.Three.resize(param.three, this.util)
        },


        // render
        render(){
            CLASS.Object.Three.render(param.three)
            this.moves()
            TWEEN.update()
        },
        animate(){
            this.render()
            requestAnimationFrame(this.animate)
        }
    }
})