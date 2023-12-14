import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Glitch,
  Noise,
  Vignette,
  SSR,
} from '@react-three/postprocessing';
import { BlendFunction, GlitchMode, NoiseEffect } from 'postprocessing';
import { Perf } from 'r3f-perf';
import { useControls } from 'leva';
import Drunk from './components/Drunk.jsx';

export default function Experience6() {
  const cube = useRef();

  const [isHovered, setIsHovered] = useState(false);

  useFrame((state, delta) => {
    const speed = isHovered ? 3 : 1;
    cube.current.rotation.y += delta * speed;
  });

  const { emissiveIntensity, color } = useControls({
    emissiveIntensity: {
      value: 3,
      min: 0,
      max: 20,
      step: 0.01,
    },
    color: 'mediumpurple',
  });

  // const ssrProps = useControls({
  //   temporalResolve: true,
  //   STRETCH_MISSED_RAYS: true,
  //   USE_MRT: true,
  //   USE_NORMALMAP: true,
  //   USE_ROUGHNESSMAP: true,
  //   ENABLE_JITTERING: true,
  //   ENABLE_BLUR: true,
  //   temporalResolveMix: { value: 0.9, min: 0, max: 1 },
  //   temporalResolveCorrectionMix: { value: 0.25, min: 0, max: 1 },
  //   maxSamples: { value: 0, min: 0, max: 1 },
  //   resolutionScale: { value: 1, min: 0, max: 1 },
  //   blurMix: { value: 0.5, min: 0, max: 1 },
  //   blurKernelSize: { value: 8, min: 0, max: 8 },
  //   blurSharpness: { value: 0.5, min: 0, max: 1 },
  //   rayStep: { value: 0.3, min: 0, max: 1 },
  //   intensity: { value: 1, min: 0, max: 5 },
  //   maxRoughness: { value: 0.1, min: 0, max: 1 },
  //   jitter: { value: 0.7, min: 0, max: 5 },
  //   jitterSpread: { value: 0.45, min: 0, max: 1 },
  //   jitterRough: { value: 0.1, min: 0, max: 1 },
  //   roughnessFadeOut: { value: 1, min: 0, max: 1 },
  //   rayFadeOut: { value: 0, min: 0, max: 1 },
  //   MAX_STEPS: { value: 20, min: 0, max: 20 },
  //   NUM_BINARY_SEARCH_STEPS: { value: 5, min: 0, max: 10 },
  //   maxDepthDifference: { value: 3, min: 0, max: 10 },
  //   maxDepth: { value: 1, min: 0, max: 1 },
  //   thickness: { value: 10, min: 0, max: 10 },
  //   ior: { value: 1.45, min: 0, max: 2 },
  // });
  const drunkProps = useControls({
    frequency: {
      value: 5,
      min: 0,
      max: 20,
      step: 0.01,
    },
    amplitude: {
      value: 0.1,
      min: 0,
      max: 1,
      step: 0.01,
    },
  });

  const drunkRef = useRef();

  return (
    <>
      <Perf position='top-left' />

      <OrbitControls makeDefault />

      <color args={[0xffffff]} attach='background' />

      <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <EffectComposer>
        {/* <Vignette
          darkness={0.8}
          offset={0.5}
          blendFunction={BlendFunction.LUMINOSITY}
        /> */}
        {/* <Glitch
          delay={[0.5, 1]}
          duration={[0.1, 0.3]}
          strength={[0.2, 0.4]}
          mode={GlitchMode.SPORADIC}
        /> */}
        {/* <Noise blendFunction={BlendFunction.SOFT_LIGHT} premultiply /> */}
        <Bloom mipmapBlur />
        {/* <DepthOfField
          focusDistance={0.025}
          focalLength={0.025}
          bokehScale={2}
        /> */}
        {/* <SSR {...ssrProps} /> */}
        <Drunk
          ref={drunkRef}
          {...drunkProps}
          blendFunction={BlendFunction.DARKEN}
        />
      </EffectComposer>

      <mesh
        castShadow
        position={[2, -0.5, 0]}
        ref={cube}
        onPointerEnter={(e) => (e.stopPropagation(), setIsHovered(true))}
        onPointerLeave={() => setIsHovered(false)}
      >
        <boxGeometry />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={emissiveIntensity}
          toneMapped={false}
        />
      </mesh>

      <mesh position={[-2, 0, 0]} castShadow>
        <sphereGeometry />
        <meshStandardMaterial color='orange' />
      </mesh>

      <mesh
        position={[0, -1, 0]}
        rotation-x={-Math.PI * 0.5}
        scale={10}
        receiveShadow
      >
        <planeGeometry />
        <meshStandardMaterial color='lightgreen' metalness={0} roughness={0} />
      </mesh>
    </>
  );
}
