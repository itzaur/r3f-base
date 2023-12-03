import { useMemo } from 'react';

export default function CustomGeometry() {
  const verticiesCount = 500 * 3;

  const positions = useMemo(() => {
    const positions = new Float32Array(verticiesCount * 3);

    for (let i = 0; i < verticiesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 3;
    }

    return positions;
  }, []);

  return (
    <mesh>
      <bufferGeometry>
        <bufferAttribute
          attach='attributes-position'
          itemSize={3}
          count={verticiesCount}
          array={positions}
        />
      </bufferGeometry>
      <meshBasicMaterial color={'red'} wireframe />
    </mesh>
  );
}
