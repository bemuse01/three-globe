param.object = {
    point: {
        radius: 45,
        size: 1.0,
        color: 0x39faff,
        opacity: 1.0,
        texture: 'assets/src/point.png',
        layers: PROCESS
    },
    globe: {
        radius: 45,
        seg: 64,
        color: 0x39faff,
        opacity: 0.5,
        layers: NORMAL
    },
    marker: {
        radius: 48,
        size: {
            center: 0.5,
            border: 1.0,
            glow: 0.8
        },
        dist: 0.25,
        seg: 6,
        color: {
            center: 0xffffff,
            border: 0x7dd0ff,
            glow: 0x7dd0ff
        },
        scale: 1,
        opacity: {
            center: 1,
            border: 1,
            glow: 0
        },
        layers: {
            center: PROCESS,
            border: PROCESS,
            glow: NORMAL
        }
    },
    line: {
        radius: 48,
        start: 1.0,
        end: 1.3,
        color: 0x39faff,
        opacity: 1,
        layers: NORMAL
    },
    border: {
        radius: 48,
        size: 1.0,
        color: 0x416eff,
        opacity: 1.0,
        texture: 'assets/src/point.png',
        layers: PROCESS
    },
    ring: {
        radius: 66,
        seg: 256,
        opacity: 1.0,
        color: 0x53fbff,
        layers: NORMAL
    },
    hexagon: {
        radius: {
            icosa: 19,
            sample: 19,
            circle: 1.5,
            border: 1.5
        },
        seg: {
            icosa: 1,
            sample: 1,
            circle: 6,
            border: 6
        },
        // color: 0x7dd0ff,
        color: 0x39faff,
        size: 0.2,
        opacity: {
            icosa: 0.080,
            circle: 0.125,
            border: 1.0
        },
        layers: PROCESS
    },
    cloud: [
        {
            radius: 82,
            seg: 256,
            rand: 0.9,
            size: 0.25,
            color: 0xffffff,
            opacity: 1.0,
            vel: {
                rot: -0.0005,
                sin: 0.00005
            },
            // rotation: {
            //     min: 65,
            //     max: 20
            // },
            texture: 'assets/src/point.png',
            layers: NORMAL
        },
        {
            radius: 88,
            seg: 256,
            rand: 0.9,
            size: 0.25,
            color: 0xffffff,
            opacity: 1.0,
            vel: {
                rot: -0.00075,
                sin: -0.00004
            },
            // rotation: {
            //     min: 65,
            //     max: 20
            // },
            texture: 'assets/src/point.png',
            layers: NORMAL
        },
        {
            radius: 94,
            seg: 256,
            rand: 0.9,
            size: 0.25,
            color: 0xffffff,
            opacity: 1.0,
            vel: {
                rot: -0.001,
                sin: 0.00003
            },
            // rotation: {
            //     min: 65,
            //     max: 20
            // },
            texture: 'assets/src/point.png',
            layers: NORMAL
        }
    ],
    postprocess: {
        exposure: 1,
        bloomStrength: 3,
        bloomThreshold: 0,
        bloomRadius: 0.5
    }
}