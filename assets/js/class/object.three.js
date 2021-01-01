CLASS.Object.Three = class Three{
    static init(canvas, three, util){
        three.scene = new THREE.Scene()

        three.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true, canvas: canvas})
        three.renderer.shadowMap.enabled = true
        three.renderer.setPixelRatio(util.ratio)
        three.renderer.setSize(util.width, util.height)
        three.renderer.setClearColor(0x000000, 1.0)
        three.renderer.setClearAlpha(0.0)
    
        three.camera = new THREE.PerspectiveCamera(60, util.width / util.height, 0.1, 10000)
        three.camera.position.z = 100
        three.scene.add(three.camera)
    }
    static render(three){
        // three.camera.lookAt(three.scene.position)
        // three.renderer.render(three.scene, three.camera)

        // three.camera.layers.enable(NORMAL)
        // three.camera.layers.disable(PROCESS)

        // // three.renderer.setRenderTarget(three.target.normal)
        // three.renderer.render(three.scene, three.camera)

        // three.camera.layers.enable(PROCESS)
        // three.camera.layers.disable(NORMAL)

        // three.composer.render()

        three.renderer.autoClear = false
        three.renderer.clear()

        three.camera.layers.set(PROCESS)
        three.composer.render()
        
        three.renderer.clearDepth()
        three.camera.layers.set(NORMAL)
        three.renderer.render(three.scene, three.camera)
    }
    static resize(three, util){
        three.camera.aspect = util.width / util.height
        three.camera.updateProjectionMatrix()

        three.renderer.setSize(util.width, util.height)
    }
    static postprocess(three, util, param){
        three.target.process = new THREE.WebGLRenderTarget(util.width, util.height)

        const renderScene = new THREE.RenderPass(three.scene, three.camera)

        const copyShader = new THREE.ShaderPass(THREE.CopyShader)
        copyShader.renderToScreen = true

        // const unrealBloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(util.width, util.height), 0, 0, 0)
        // unrealBloomPass.threshold = param.bloomThreshold
        // unrealBloomPass.strength = param.bloomStrength
        // unrealBloomPass.radius = param.bloomRadius

        const filmPass = new THREE.FilmPass(0, 0, 0, false);

        const bloomPass = new THREE.BloomPass(2.25)

        const effectFXAA = new THREE.ShaderPass(THREE.FXAAShader)
        effectFXAA.uniforms['resolution'].value.set(1 / util.width, 1 / util.height)

        three.composer = new THREE.EffectComposer(three.renderer, three.target.process)
        three.composer.setSize(util.width, util.height)
        three.composer.addPass(renderScene)
        // three.composer.addPass(unrealBloomPass)
        // three.composer.addPass(copyShader)
        three.composer.addPass(bloomPass)
        three.composer.addPass(filmPass)
        // three.composer.addPass(effectFXAA)
    }
}