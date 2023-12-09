import * as THREE from 'three';
import {
  OrbitControls,
  Stage,
  useHelper,
  SoftShadows,
} from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
import { Perf } from 'r3f-perf';
import { useRef } from 'react';
import { Suspense } from 'react';
import Model from './components/Model.jsx';
import Placeholder from './components/Placeholder.jsx';
import Parrot from './components/Parrot.jsx';
import Fox from './components/Fox.jsx';

export default function Experience2() {
  const cube = useRef();
  const directionalLight = useRef();

  useHelper(directionalLight, THREE.DirectionalLightHelper, 1, 'red');

  const { color, position } = useControls({
    color: '#eca1ff',
    position: { x: 2, y: 1, z: 0 },
  });

  const { envMapIntensity } = useControls({
    envMapIntensity: {
      value: 3.5,
      min: 0,
      max: 15,
      step: 0.01,
    },
  });

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    // cube.current.position.x = Math.sin(time) + 2;
  });

  return (
    <>
      <Perf position='top-left' />

      {/* <Stage
        shadows={{ type: 'contact', opacity: 1, blur: 3 }}
        environment='sunset'
        preset='portrait'
        intensity={12}
      > */}
      <OrbitControls makeDefault />

      <SoftShadows samples={17} frustum={3.75} size={5} near={9.5} rings={11} />

      {/* <color args={['ivory']} attach='background' /> */}

      {/* <mesh ref={cube} position={[position.x, position.y, position.z]}>
          <boxGeometry />
          <meshStandardMaterial
            color={color}
            envMapIntensity={envMapIntensity}
          />
        </mesh>
        <mesh position={[-2, 1.5, 0]}>
          <sphereGeometry />
          <meshStandardMaterial
            color={'mediumpurple'}
            envMapIntensity={envMapIntensity}
          />
        </mesh> */}
      <directionalLight
        castShadow
        position={[1, 5, 5]}
        intensity={1.5}
        ref={directionalLight}
        shadow-normalBias={0.05}
      />
      <ambientLight intensity={0.5} />

      <mesh
        rotation={[-Math.PI * 0.5, 0, 0]}
        position={[0, -1, 0]}
        scale={15}
        receiveShadow
      >
        <planeGeometry />
        <meshStandardMaterial color={color} envMapIntensity={envMapIntensity} />
      </mesh>

      <Suspense fallback={<Placeholder position-y={0.5} scale={[2, 3, 2]} />}>
        {/* <Model /> */}
        <Parrot scale={0.05} position-y={1} />
        <Fox />
      </Suspense>

      {/* </Stage> */}
    </>
  );
}
