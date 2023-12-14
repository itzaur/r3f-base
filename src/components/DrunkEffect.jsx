import { Effect } from 'postprocessing';
import { Uniform } from 'three';

const fragmentShader = /* glsl */ `
    uniform float amplitude;
    uniform float frequency;
    uniform float offset;

    void mainUv(inout vec2 uv) {
        uv.y += sin(uv.x * frequency + offset) * amplitude;
    }


    void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
        vec4 color = inputColor;
        color.rgb *= vec3(0.5, 1.5, 1.5);
        outputColor = vec4(uv, 1.0, 1.0);
        outputColor = color;
        outputColor = vec4(1.5, 0.5, 0.5, inputColor.a);
    }
`;

export default class DrunkEffect extends Effect {
  constructor({ frequency, amplitude, blendFunction }) {
    super('DrunkEffect', fragmentShader, {
      uniforms: new Map([
        ['frequency', new Uniform(frequency)],
        ['amplitude', new Uniform(amplitude)],
        ['offset', new Uniform(0)],
      ]),
      blendFunction,
    });
  }

  update(renderer, inputBuffer, deltaTime) {
    this.uniforms.get('offset').value += deltaTime;
  }
}
