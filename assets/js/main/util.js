const util = {
    toSphereCoordinates(lat, lng, radius) {
        const phi = (90 - lat) * radian
        const theta = (180 - lng) * radian
        const x = radius * Math.sin(phi) * Math.cos(theta)
        const y = radius * Math.cos(phi)
        const z = radius * Math.sin(phi) * Math.sin(theta)
        return {x, y, z}
    }
}