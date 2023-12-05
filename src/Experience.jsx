// import { useRef } from 'react';
// import { extend, useFrame, useThree } from '@react-three/fiber';
// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import './App.css';
// import Cube from './components/Cube';
// import Plane from './components/Plane';
// import Sphere from './components/Sphere';
// import CustomGeometry from './components/CustomGeometry';

// extend({ OrbitControls });

// export default function Experience() {
//   // const groupRef = useRef();
//   const cubeRef = useRef();

//   const { camera, gl } = useThree();

//   useFrame((state, delta) => {
//     cubeRef.current.rotation.y += delta;
//     // state.camera.position.x = Math.sin(state.clock.elapsedTime) * 8;
//     // state.camera.position.z = Math.cos(state.clock.elapsedTime) * 8;
//     // state.camera.lookAt(0, 0, 0);
//   });

//   return (
//     <>
//       <orbitControls args={[camera, gl.domElement]} enabledDamping />

//       <directionalLight position={[1, 2, 3]} intensity={1.5} />
//       <ambientLight intensity={0.5} />
//       <Sphere
//         position={[-3, 0, 0]}
//         scale={1}
//         size={[1.5, 32, 32]}
//         color={'orange'}
//       />
//       {/* <Cube
//         innerRef={cubeRef}
//         position={[3, 0, 0]}
//         scale={1.5}
//         size={[1.5, 1.5]}
//         color={'red'}
//       /> */}
//       <mesh scale={2} position={[3, 0, 0]} ref={cubeRef}>
//         <boxGeometry args={[1, 1]} />
//         <meshStandardMaterial color={'mediumpurple'} />
//       </mesh>
//       <Plane
//         position={[0, -2, 0]}
//         size={[1, 1, 32, 32]}
//         color={'lightgreen'}
//         scale={10}
//         rotation={[-Math.PI * 0.5, 0, 0]}
//       />
//       <CustomGeometry />
//     </>
//   );
// }
import { useRef } from 'react';
import './App.css';
import {
  OrbitControls,
  PivotControls,
  TransformControls,
  Html,
  Text,
  Float,
  MeshReflectorMaterial,
} from '@react-three/drei';
import { useControls, button } from 'leva';
import { Perf } from 'r3f-perf';

export default function Experience() {
  const cube = useRef();
  const sphere = useRef();

  const { perfVisivle } = useControls({
    perfVisivle: true,
  });

  const { position, color } = useControls('sphere', {
    position: {
      value: { x: -2, y: 0 },
      step: 0.01,
    },
    color: 'red',
    clickMe: button(() => {
      console.log('click');
    }),
    choice: {
      options: ['a', 'b', 'c'],
    },
  });

  const { cubeScale } = useControls('cube', {
    cubeScale: {
      value: 1.5,
      min: 0,
      max: 5,
      step: 0.01,
    },
  });

  return (
    <>
      {perfVisivle && (
        <Perf
          position='top-left'
          style={{ opacity: 0.8, backgroundColor: 'black' }}
        />
      )}

      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <mesh ref={cube} position={[2, 0, 0]} scale={cubeScale}>
        <boxGeometry />
        <meshStandardMaterial color='mediumpurple' />
      </mesh>
      <TransformControls object={cube} />

      <PivotControls anchor={[0, 0, 0]} depthTest={false}>
        <mesh ref={sphere} position={[position.x, position.y, 0]}>
          <sphereGeometry />
          <meshStandardMaterial color={color} />
          <Html
            wrapperClass='label'
            position={[1, 1, 0]}
            center
            distanceFactor={8}
            occlude={[cube, sphere]}
          >
            That's a sphere
          </Html>
        </mesh>
      </PivotControls>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        {/* <meshStandardMaterial color='greenyellow' /> */}
        <MeshReflectorMaterial
          color='greenyellow'
          resolution={512}
          blur={[1000, 1000]}
          mixBlur={1}
          mirror={0.5}
        />
      </mesh>

      <Float speed={3} floatIntensity={3}>
        <Text
          font='./ZEKTON RG.OTF'
          position={[0, 2, 0]}
          maxWidth={5}
          lineHeight={0.8}
        >
          Natalie is my crush
          <meshNormalMaterial />
        </Text>
      </Float>
    </>
  );
}
