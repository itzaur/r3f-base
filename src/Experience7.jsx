import * as THREE from 'three';
import {
  Center,
  ContactShadows,
  Environment,
  Float,
  Html,
  OrbitControls,
  PresentationControls,
  Text,
  Text3D,
  useGLTF,
  useMatcapTexture,
} from '@react-three/drei';
import { Perf } from 'r3f-perf';
import { useEffect } from 'react';

const geometry = new THREE.TorusGeometry(1, 0.6, 16, 32);
const material = new THREE.MeshMatcapMaterial();

export default function Experience7() {
  const backgroundColor = '#241A1A';

  const laptop = useGLTF(
    'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf'
  );

  const [matcapTexture] = useMatcapTexture('3B3C3F_DAD9D5_929290_ABACA8', 256);

  useEffect(() => {
    material.matcap = matcapTexture;
    material.needsUpdate = true;

    matcapTexture.colorSpace = THREE.SRGBColorSpace;
    matcapTexture.needsUpdate = true;
  }, []);

  return (
    <>
      <Perf position='top-left' />

      {/* <OrbitControls makeDefault /> */}

      <color args={[backgroundColor]} attach='background' />

      {/* <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight /> */}
      <Environment preset='city' />

      <ContactShadows position-y={-1.4} opacity={0.4} blur={2.4} scale={5} />

      <PresentationControls
        global
        rotation={[0.13, 0.1, 0]}
        polar={[-0.4, 0.2]}
        azimuth={[-2, 0.75]}
        config={{ mass: 2, tension: 400 }}
        snap={{ mass: 4, tension: 400 }}
      >
        <Float rotationIntensity={0.4}>
          <rectAreaLight
            width={2.5}
            height={1.65}
            intensity={65}
            color={0xffffff}
            position={[0, 0.55, -1.15]}
            rotation={[-0.1, Math.PI, 0]}
          />
          <primitive object={laptop.scene} position-y={-1.2} rotation-y={0.2}>
            <Html
              transform
              wrapperClass='html-screen'
              distanceFactor={1.17}
              position={[0, 1.56, -1.4]}
              rotation-x={-0.256}
            >
              <iframe src='https://app.rs.school/cv/64339fd9-b05b-459f-bbda-ae1b8e4d7839' />
            </Html>
          </primitive>

          <Text3D
            geometry={geometry}
            material={material}
            font='./font/Zekton Rg_Regular.json'
            height={0.2}
            size={0.75}
            scale={0.4}
            bevelEnabled
            bevelOffset={0}
            bevelSegments={5}
            bevelThickness={0.02}
            bevelSize={0.02}
            curveSegments={12}
            position={[1, 0.25, 0.75]}
            rotation-y={-0.8}
            width={2}
            wrapperClass='text'
          >
            itzaur
          </Text3D>
        </Float>
      </PresentationControls>
    </>
  );
}
