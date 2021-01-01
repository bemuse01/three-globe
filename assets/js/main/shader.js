const shader = {
	globe: {},
	line: {},
	ring: {}
}



// globe shader
shader.globe.vertexShader = `
	varying vec3 vNormal;
	void main() {
		vNormal = normalize( normalMatrix * normal );
		gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
	}
`
shader.globe.fragmentShader = `
	varying vec3 vNormal;
    uniform vec3 color;
	void main() {
		float intensity = 1.05 - dot( vNormal, vec3( 0.0, 0.0, 1.0 ) );
		vec3 atmosphere = vec3( color ) * pow( intensity, 2.0 );
		gl_FragColor = vec4( atmosphere, 1.0 );
	}
`



// marker line shader
shader.line.vertexShader = `
	varying vec3 vPos;
    void main() {
	  	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      	vPos = position;
    }
`
shader.line.fragmentShader = `
	varying vec3 vPos;
	uniform vec3 origin;
    uniform vec3 color;
    uniform float limitDistance;
    void main() {
    	float distance = clamp(length(vPos - origin), 0.0, limitDistance);
      	float opacity = 1.0 - distance / limitDistance;
      	gl_FragColor = vec4(color, opacity);
    }
`



// globe ring shader
shader.ring.vertexShader = `
	attribute float opacity;
	varying float vOct;
	varying vec3 vPos;
	void main() {
		gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
		vPos = position;
		vOct = opacity;
	}
`
shader.ring.fragmentShader = `
	varying float vOct;
	varying vec3 vPos;
	uniform vec3 color;
	uniform float time;
	// uniform float opacity;
	float rand(vec2 co){
		return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
	}
	void main() {
		// float opacity = rand(vec2(vPos.x, vPos.y)) * 0.8;
		// gl_FragColor = vec4(color, opacity);
		// gl_FragColor = vec4(color, vOct * sin(time));
		gl_FragColor = vec4(color, vOct);
	}
`