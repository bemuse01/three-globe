CLASS.Tween.Glow = class Glow{
    constructor(group, param){
        this.#init(group, param)
    }

    #init(group, param){
        group.children.forEach((_, idx) => {
            _.children.forEach((e, i) => {
                if(i === _.children.length - 1){
                    const start = {opacity: 0, scale: 1}, end = {opacity: param.opacity, scale: param.scale}
                    const delay = Math.random() * param.delay, repeat = Math.random() * param.delay

                    const tw = new TWEEN.Tween(start)
                        .to(end, param.time)
                        .onUpdate(() => {this.#onUpdate(e, start)})
                        .repeat(Infinity)
                        .delay(delay)
                        .repeatDelay(repeat)
                        .start()
                }
            })
        })
    }

    #onUpdate(e, start){
        e.material.opacity = start.opacity
        e.scale.set(start.scale, start.scale, 1)
    }
}