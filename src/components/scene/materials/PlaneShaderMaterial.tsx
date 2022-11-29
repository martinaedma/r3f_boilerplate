import { extend } from "@react-three/fiber";
import * as THREE from "three";
import { ShaderMaterial } from "three";

export const vertex = `
precision mediump float;

uniform float uSphereRadius;
uniform vec3 uSphereCenter;
varying vec3 vPosition;

void main(){
  vPosition = position;

  vec3 pos = position;
  
  float currentDistance = distance(pos, uSphereCenter);
  float scalarMultiplier = uSphereRadius / currentDistance;
  vec3 resizedVector = (pos / currentDistance) * (scalarMultiplier * 1.5);

  vec4 modelPosition = modelMatrix * vec4(resizedVector, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  gl_Position = projectedPosition;
}
`;

export const fragment = `
#define PI 3.1415926538
precision mediump float;

varying vec3 vPosition;

void main() {

	gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
}
`;

export class PlaneShaderMaterial extends ShaderMaterial {
  constructor() {
    super({
      vertexShader: vertex,
      fragmentShader: fragment,
      side: THREE.DoubleSide,
      uniforms: {
        uTime: {
          value: 0,
        },
        uTexture: {
          value: THREE.Texture,
        },
        uMouse: {
          value: new THREE.Vector2(0, 0),
        },
        uRes: {
          value: new THREE.Vector2(0, 0),
        },
        uSphereRadius: {
          value: 300.0
        },
        uSphereCenter: {
          value: new THREE.Vector3(0, 0, -18)
        }
      },
    });
  }
}

extend({ PlaneShaderMaterial });
