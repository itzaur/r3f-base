export default function Plane({ size, position, rotation, color, scale }) {
  return (
    <mesh position={position} rotation={rotation} scale={scale}>
      <planeGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
