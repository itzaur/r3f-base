import {
  ContactShadows,
  Environment,
  Float,
  Html,
  OrbitControls,
  PresentationControls,
  useGLTF,
} from '@react-three/drei';
import { useControls } from 'leva';
import { Perf } from 'r3f-perf';

export default function Experience8() {
  const laptop = useGLTF(
    'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf'
  );

  const { position, rotation, color } = useControls({
    position: {
      x: 0,
      y: 1.56,
      z: -1.4,
    },
    rotation: {
      x: -0.256,
      y: 0,
      z: 0,
    },
    color: '#0a1d34',
  });

  const shadowProps = useControls('shadowProps', {
    // position: {
    //   x: 0,
    //   y: -1.4,
    //   z: 0,
    // },
    opacity: {
      value: 0.33,
      min: 0,
      max: 1,
    },
    blur: { value: 3.4, min: 0, max: 10 },
    scale: { value: 6.6, min: 1, max: 20 },
  });

  const rectAreaLightProps = useControls('rectAreaLightProps', {
    width: { value: 2.5, min: 0, max: 10 },
    height: { value: 1.65, min: 0, max: 10 },
    intensity: { value: 65, min: 0, max: 100 },
    color: 'hsl(181, 73%, 60%)',
    // position: {
    //   value: { x: 0, y: 0.55, z: -1.15 },
    //   step: 0.01,
    // },
    // rotation: {
    //   value: { x: -0.1, y: Math.PI, z: 0 },
    //   step: 0.01,
    // },
  });

  return (
    <>
      <Perf position='top-left' />

      {/* <OrbitControls makeDefault /> */}

      <color args={[color]} attach='background' />

      <Environment preset='forest' />

      <ContactShadows position-y={-2.2} {...shadowProps} />

      <PresentationControls
        global
        polar={[0, 0.4]}
        rotation={[0, 0.2, 0]}
        azimuth={[-0.9, 1, 0.5]}
        config={{ mass: 2, tension: 400, friction: 26 }}
        snap={{ mass: 4, tension: 400, friction: 26 }}
      >
        <Float>
          <rectAreaLight
            {...rectAreaLightProps}
            position={[0, 0.55, -1.15]}
            rotation={[-0.1, Math.PI, 0]}
          />
          <primitive
            object={laptop.scene}
            position-y={-1.4}
            rotation-x={0.2}
            scale={1.5}
          >
            <Html
              wrapperClass='html-screen'
              transform
              distanceFactor={1.17}
              position={[position.x, position.y, position.z]}
              rotation={[rotation.x, rotation.y, rotation.z]}
            >
              <iframe src='https://odyssey4165.vercel.app/' />
            </Html>
          </primitive>
        </Float>
      </PresentationControls>
    </>
  );
}
