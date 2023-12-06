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
import './App.css';
import * as THREE from 'three';
import { useRef } from 'react';
import {
  OrbitControls,
  PivotControls,
  TransformControls,
  Html,
  Text,
  Float,
  MeshReflectorMaterial,
  useHelper,
  SoftShadows,
  AccumulativeShadows,
  RandomizedLight,
  ContactShadows,
  Sky,
  Environment,
  Lightformer,
  Stage,
} from '@react-three/drei';
import { useControls, button } from 'leva';
import { Perf } from 'r3f-perf';
import { useFrame } from '@react-three/fiber';

export default function Experience() {
  const cube = useRef();
  const sphere = useRef();
  const directionalLight = useRef();
  const ambientLight = useRef();

  useHelper(directionalLight, THREE.DirectionalLightHelper, 1, 'red');

  const { perfVisivle } = useControls({
    perfVisivle: true,
  });

  const { position, color } = useControls('sphere', {
    position: {
      value: { x: -2, y: 1 },
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

  const { opacity, colorShadow, blur } = useControls('contactShadow', {
    opacity: {
      value: 1,
      min: 0,
      max: 1,
      step: 0.01,
    },
    colorShadow: 'blue',
    blur: {
      value: 1,
      min: 0,
      max: 10,
      step: 0.01,
    },
  });

  const { sunPosition } = useControls('sky', {
    sunPosition: { value: [1, 2, 3] },
  });

  const { envMapIntensity } = useControls({
    envMapIntensity: {
      value: 3.5,
      min: 0,
      max: 10,
      step: 0.01,
    },
  });

  useFrame((state, delta) => {
    const angle = state.clock.elapsedTime;
    cube.current.position.x = Math.sin(angle) + 2;
    // cube.current.position.z = Math.cos(angle);
  });

  return (
    <>
      <color args={['ivory']} attach='background' />

      {/* <Environment
        background
        preset='forest'
        ground={{
          height: 7,
          scale: 100,
          radius: 28,
        }}
        // files={[
        //   './environmentMaps/0/px.jpg',
        //   './environmentMaps/0/nx.jpg',
        //   './environmentMaps/0/py.jpg',
        //   './environmentMaps/0/ny.jpg',
        //   './environmentMaps/0/pz.jpg',
        //   './environmentMaps/0/nz.jpg',
        // ]}
      >
        <color args={['#000000']} attach='background' />
        {/* <Lightformer
          position-z={-5}
          scale={10}
          color='red'
          form='ring'
          intensity={100}
        /> */}
      {/* <mesh position-z={-5} scale={10}>
          <planeGeometry />
          <meshBasicMaterial color={'red'} />
        </mesh> }
      </Environment> */}

      {/* <SoftShadows samples={17} frustum={3.75} size={5} near={9.5} rings={11} /> */}
      {/* <ContactShadows
        position={[0, 0, 0]}
        resolution={512}
        scale={10}
        far={10}
        opacity={opacity}
        color={colorShadow}
        blur={blur}
      /> */}

      {/* <Sky sunPosition={sunPosition} /> */}

      {/* {perfVisivle && (
        <Perf
          position='top-left'
          style={{ opacity: 0.8, backgroundColor: 'black' }}
        />
      )} */}

      <OrbitControls makeDefault />

      {/* <AccumulativeShadows></AccumulativeShadows> */}

      {/* <directionalLight
        castShadow
        ref={directionalLight}
        position={sunPosition}
        intensity={1.5}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={5}
        shadow-camera-right={5}
        shadow-camera-bottom={-5}
        shadow-camera-left={-5}
      />
      <ambientLight ref={ambientLight} intensity={0.5} /> */}

      {/* <mesh castShadow ref={cube} position={[2, 1, 0]} scale={cubeScale}>
        <boxGeometry />
        <meshStandardMaterial
          color='mediumpurple'
          envMapIntensity={envMapIntensity}
        />
      </mesh>
      <TransformControls object={cube} />

      <PivotControls anchor={[0, 0, 0]} depthTest={false}>
        <mesh castShadow ref={sphere} position={[position.x, position.y, 0]}>
          <sphereGeometry />
          <meshStandardMaterial
            color={color}
            envMapIntensity={envMapIntensity}
          />
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
      </PivotControls> */}

      {/* <mesh receiveShadow position-y={0} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial
          color='greenyellow'
          envMapIntensity={envMapIntensity}
        />
        {/* <MeshReflectorMaterial
          color='greenyellow'
          resolution={512}
          blur={[1000, 1000]}
          mixBlur={1}
          mirror={0.5}
        />}
      </mesh> */}

      <Stage
        shadows={{ type: 'contact', opacity: 0.3, blur: 3 }}
        environment='sunset'
        preset='portrait'
        intensity={12}
      >
        <Float speed={3} floatIntensity={3}>
          <Text
            font='./ZEKTON RG.OTF'
            position={[0, 3, 0]}
            maxWidth={5}
            lineHeight={0.8}
          >
            Natalie is my crush
            <meshNormalMaterial side={2} />
          </Text>
        </Float>

        <mesh castShadow ref={cube} position={[2, 1, 0]} scale={cubeScale}>
          <boxGeometry />
          <meshStandardMaterial
            color='mediumpurple'
            envMapIntensity={envMapIntensity}
          />
        </mesh>

        <mesh castShadow ref={sphere} position={[position.x, position.y, 0]}>
          <sphereGeometry />
          <meshStandardMaterial
            color={color}
            envMapIntensity={envMapIntensity}
          />
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
      </Stage>
    </>
  );
}
