import React from 'react';
import ReactDOM from 'react-dom/client';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience.jsx';
import Experience2 from './Experience2.jsx';
import Experience3 from './Experience3.jsx';
import Experience4 from './Experience4.jsx';
import Experience5 from './Experience5.jsx';
import Experience6 from './Experience6.jsx';
import Experience7 from './Experience7.jsx';
import Experience8 from './Experience8.jsx';

// const created = ({ gl }) => {
//   gl.setClearColor(0xffff00, 1);
// };

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Canvas
      flat
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
      // onCreated={created}
      shadows={true}
      // camera={{
      //   position: [0, 0, 2.9],
      // }}
    >
      {/* <Experience /> */}
      {/* <Experience3 /> */}
      {/* <Experience4 /> */}
      {/* <Experience5 /> */}
      {/* <Experience6 /> */}
      {/* <Experience7 /> */}
      <Experience8 />
    </Canvas>
  </React.StrictMode>
);
