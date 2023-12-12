import * as THREE from 'three';
import {
  OrbitControls,
  meshBounds,
  useGLTF,
  useHelper,
} from '@react-three/drei';
import { Perf } from 'r3f-perf';
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';

export default function Experience5() {
  const directionalLight = useRef();
  useHelper(directionalLight, THREE.DirectionalLightHelper, 1, 'blue');

  const cube = useRef();

  useFrame((_, delta) => {
    const speed = isHovered ? 2 : 1;
    cube.current.rotation.y += delta * speed;
  });

  const eventHandler = () => {
    cube.current.material.color.set(`hsl(${Math.random() * 360}, 100%, 75%)`);
    console.log(cube.current.material);
  };

  const hamburger = useGLTF('./hamburger.glb');

  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <Perf position='top-left' />

      <OrbitControls makeDefault />

      {/* <color args={[0xffff00]} attach='background' /> */}

      <directionalLight ref={directionalLight} position={[0, 1, 2]} />
      <ambientLight />

      <mesh
        position={[2, -0.5, 0]}
        ref={cube}
        onClick={eventHandler}
        onPointerEnter={(e) => (e.stopPropagation(), setIsHovered(true))}
        onPointerLeave={(e) => setIsHovered(false)}
        // raycast={meshBounds}
      >
        <boxGeometry />
        <meshStandardMaterial color='mediumpurple' />
      </mesh>
      <mesh
        position={[-2, 0, 0]}
        // onPointerEnter={(e) => (e.stopPropagation(), setIsHovered(true))}
        // onPointerLeave={(e) => setIsHovered(false)}
      >
        <sphereGeometry />
        <meshStandardMaterial
          color='orange'
          // wireframe={isHovered ? true : false}
        />
      </mesh>
      <mesh rotation-x={-Math.PI * 0.5} scale={10} position-y={-1}>
        <planeGeometry />
        <meshStandardMaterial color='lightgreen' />
      </mesh>
      <primitive
        object={hamburger.scene}
        scale={0.2}
        position={[0, -1, 2]}
        onClick={(e) => e.stopPropagation()}
      />
    </>
  );
}
