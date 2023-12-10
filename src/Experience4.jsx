import { OrbitControls } from '@react-three/drei';

export default function Experience4() {
  return (
    <>
      <OrbitControls makeDefault />

      <color args={['#030202']} attach='background' />

      <mesh scale={1.5}>
        <boxGeometry />
        <shaderMaterial />
      </mesh>
    </>
  );
}
