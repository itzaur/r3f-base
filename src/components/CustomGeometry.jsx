import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

export default function CustomGeometry() {
  const geometryRef = useRef();

  const verticiesCount = 10 * 3;

  const positions = useMemo(() => {
    const positions = new Float32Array(verticiesCount * 3);

    for (let i = 0; i < verticiesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 3;
    }

    return positions;
  }, []);

  useEffect(() => {
    geometryRef.current.computeVertexNormals();
  }, []);

  return (
    <mesh>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          attach='attributes-position'
          itemSize={3}
          count={verticiesCount}
          array={positions}
        />
      </bufferGeometry>
      <meshBasicMaterial
        color={'red'}
        wireframe={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
