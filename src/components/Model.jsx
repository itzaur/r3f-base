import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';
import { useGLTF, Clone } from '@react-three/drei';

const modelURL = './Parrot.glb';

export default function Model() {
  //   const model = useLoader(GLTFLoader, './Parrot.glb', (loader) => {
  //     console.log(loader);
  //   });

  const model = useGLTF(modelURL);

  return (
    <>
      <Clone object={model.scene} scale={0.05} position-x={4} />
      <Clone object={model.scene} scale={0.05} position-x={0} />
      <Clone object={model.scene} scale={0.05} position-x={-4} />
    </>
  );
}

useGLTF.preload(modelURL);
