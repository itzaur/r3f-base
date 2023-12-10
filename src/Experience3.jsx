import * as THREE from 'three';
import {
  Center,
  Float,
  OrbitControls,
  Text3D,
  useMatcapTexture,
} from '@react-three/drei';
import { Perf } from 'r3f-perf';
import { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';

const geometry = new THREE.TorusGeometry(1, 0.6, 16, 32);
const material = new THREE.MeshMatcapMaterial();

export default function Experience3() {
  //   const [torusGeometry, setTorusGeometry] = useState();
  //   const [torusMaterial, setTorusMaterial] = useState();
  //   const donutsRef = useRef();
  const donuts = useRef([]);

  const [matcapTexture] = useMatcapTexture('736655_D9D8D5_2F281F_B1AEAB', 256);

  const tempArray = [...Array(100)];

  useEffect(() => {
    matcapTexture.colorSpace = THREE.SRGBColorSpace;
    matcapTexture.needsUpdate = true;

    material.matcap = matcapTexture;
    material.needsUpdate = true;
  }, []);

  useFrame((state, delta) => {
    for (const donut of donuts.current) {
      donut.rotation.y += delta;
    }
  });

  return (
    <>
      <Perf position='top-left' />
      <OrbitControls makeDefault />

      {/* <ambientLight />
      <directionalLight /> */}

      {/* <torusGeometry ref={setTorusGeometry} />
      <meshMatcapMaterial matcap={matcapTexture} ref={setTorusMaterial} /> */}

      <Float floatIntensity={5} speed={3}>
        <Center>
          <Text3D
            material={material}
            position={[0, 1, 0]}
            font='./font/Zekton Rg_Regular.json'
            scale={2}
            size={0.75}
            height={0.2}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
          >
            Dawn
            {/* <meshMatcapMaterial matcap={matcapTexture} /> */}
          </Text3D>
        </Center>
      </Float>

      {tempArray.map((el, i) => {
        return (
          <mesh
            key={i}
            ref={(element) => (donuts.current[i] = element)}
            position={[
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
            ]}
            scale={0.2 + Math.random() * 0.2}
            rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
            geometry={geometry}
            material={material}
          />
        );
      })}
    </>
  );
}
// import * as THREE from 'three';
// import {
//   Center,
//   OrbitControls,
//   Text3D,
//   Float,
//   useMatcapTexture,
// } from '@react-three/drei';
// import { Perf } from 'r3f-perf';
// import { useEffect, useRef } from 'react';
// import { useFrame } from '@react-three/fiber';

// const geometry = new THREE.TorusGeometry(1, 0.6, 16, 32);
// const material = new THREE.MeshMatcapMaterial();

// export default function Experience3() {
//   const donutsRef = useRef([]);
//   const tempArray = [...Array(100)];

//   const [texture] = useMatcapTexture('736655_D9D8D5_2F281F_B1AEAB', 256);

//   useEffect(() => {
//     material.matcap = texture;
//     material.needsUpdate = true;

//     texture.colorSpace = THREE.SRGBColorSpace;
//     texture.needsUpdate = true;
//   }, []);

//   useFrame((state, delta) => {
//     for (const donut of donutsRef.current) {
//       donut.rotation.y += delta;
//     }
//   });

//   return (
//     <>
//       <OrbitControls makeDefault />

//       <Perf position='top-left' />

//       <Float speed={3} floatIntensity={6}>
//         <Center>
//           <Text3D
//             geometry={geometry}
//             material={material}
//             font='./font/Zekton Rg_Regular.json'
//             scale={2}
//             height={0.2}
//             size={0.85}
//             curveSegments={12}
//             bevelEnabled
//             bevelOffset={0}
//             bevelSegments={5}
//             bevelSize={0.02}
//             bevelThickness={0.02}
//           >
//             Dawn
//           </Text3D>
//         </Center>
//       </Float>

//       {tempArray.map((el, i) => (
//         <mesh
//           ref={(element) => (donutsRef.current[i] = element)}
//           key={i}
//           geometry={geometry}
//           material={material}
//           scale={0.2 + Math.random() * 0.2}
//           position={[
//             (Math.random() - 0.5) * 10,
//             (Math.random() - 0.5) * 10,
//             (Math.random() - 0.5) * 10,
//           ]}
//           rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
//         />
//       ))}
//     </>
//   );
// }
