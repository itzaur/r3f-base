export default function Sphere({ scale, size, color, position }) {
  return (
    <mesh scale={scale} position={position}>
      <sphereGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
