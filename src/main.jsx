import React from 'react';
import ReactDOM from 'react-dom/client';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Canvas
    // flat
    // dpr={[1, 2]}
    // gl={{
    //   antialias: true,
    //   toneMapping: THREE.CineonToneMapping,
    //   outputColorSpace: THREE.SRGBColorSpace,
    // }}
    // camera={{
    //   fov: 75,
    //   near: 1,
    //   far: 200,
    //   position: [2, 3, 6],
    // }}
    >
      <Experience />
    </Canvas>
  </React.StrictMode>
);
