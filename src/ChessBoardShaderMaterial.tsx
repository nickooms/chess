export const ChessBoardShaderMaterial = {
  uniforms: {
    u_time: { type: 'f', value: 0 },
  },
  vertexShader: `
    precision mediump float;
    varying vec2 vUv;
    void main() {
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.);
      gl_Position = projectionMatrix * mvPosition;
      vUv = uv;
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    uniform float u_time;

    void main() {
      vec2 uv = vUv;
      float cb = floor((uv.x + u_time) * 8.) + floor((uv.y + u_time) * 8.);
      gl_FragColor = vec4(1., 1., 1., mod(cb, 2.0));
    }
  `,
};
