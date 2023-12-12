import * as THREE from 'three';
import {
  Center,
  OrbitControls,
  Sparkles,
  shaderMaterial,
  useGLTF,
  useTexture,
} from '@react-three/drei';
import fragmentShader from '../src/shaders/portal/fragment.glsl';
import vertexShader from '../src/shaders/portal/vertex.glsl';
import { extend, useFrame } from '@react-three/fiber';
import { useRef } from 'react';

const PortalMaterial = shaderMaterial({
  uTime: 0,
  uColorStart: new THREE.Color(0xffffff),
  uColorEnd: new THREE.Color(0x000000),
  fragmentShader,
  vertexShader,
});

extend({ PortalMaterial });

export default function Experience4() {
  const { nodes } = useGLTF('./model/portal.glb');
  const texture = useTexture('./model/baked.jpg');
  texture.flipY = false;

  const portalMaterial = useRef();

  useFrame((_, delta) => {
    portalMaterial.current.uTime += delta;
  });

  return (
    <>
      <OrbitControls makeDefault />

      <color args={['#030202']} attach='background' />

      {/* <mesh scale={1.5}>
        <boxGeometry />
        <shaderMaterial />
      </mesh> */}

      <Center>
        <mesh geometry={nodes.baked.geometry}>
          <meshBasicMaterial map={texture} />
        </mesh>

        <mesh
          geometry={nodes.poleLightA.geometry}
          position={nodes.poleLightA.position}
        />
        <mesh
          geometry={nodes.poleLightB.geometry}
          position={nodes.poleLightB.position}
        />
        <mesh
          geometry={nodes.portalLight.geometry}
          position={nodes.portalLight.position}
          rotation={nodes.portalLight.rotation}
        >
          {/* <shaderMaterial
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
            uniforms={{
              uTime: { value: 0 },
              uColorStart: { value: new THREE.Color(0xffffff) },
              uColorEnd: { value: new THREE.Color(0x000000) },
            }}
          /> */}
          <portalMaterial ref={portalMaterial} />
        </mesh>
        <Sparkles size={[4, 2, 4]} scale={3} position-y={1} speed={0.2} />
      </Center>
    </>
  );
}
