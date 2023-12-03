export default function Cube({ scale, size, color, position }) {
  return (
    <mesh scale={scale} position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} wireframe />
    </mesh>
  );
}
