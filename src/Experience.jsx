import { useRef } from 'react';
import { extend, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './App.css';
import Cube from './components/Cube';
import Plane from './components/Plane';
import Sphere from './components/Sphere';
import CustomGeometry from './components/CustomGeometry';

extend({ OrbitControls });

export default function Experience() {
  // const groupRef = useRef();
  const cubeRef = useRef();

  const { camera, gl } = useThree();

  useFrame((state, delta) => {
    cubeRef.current.rotation.y += delta;
  });

  return (
    <>
      <orbitControls args={[camera, gl.domElement]} enabledDamping />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />
      <Sphere
        position={[-3, 0, 0]}
        scale={1}
        size={[1.5, 32, 32]}
        color={'orange'}
      />
      {/* <Cube
        innerRef={cubeRef}
        position={[3, 0, 0]}
        scale={1.5}
        size={[1.5, 1.5]}
        color={'red'}
      /> */}
      <mesh scale={1} position={[3, 0, 0]} ref={cubeRef}>
        <boxGeometry args={[1.5, 1.5]} />
        <meshStandardMaterial color={'mediumpurple'} />
      </mesh>
      <Plane
        position={[0, -2, 0]}
        size={[1, 1, 32, 32]}
        color={'green'}
        scale={10}
        rotation={[-Math.PI * 0.5, 0, 0]}
      />
      <CustomGeometry />
    </>
  );
}
