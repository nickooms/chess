import { useEffect, useRef } from 'react';
import { Mesh } from 'three';
import { useLoader, useThree } from '@react-three/fiber';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';

export const Model = ({ url }: { url: string }) => {
  const geom = useLoader(STLLoader, url);

  const ref = useRef<Mesh | null>(null);
  const { camera } = useThree();

  useEffect(() => {
    camera.lookAt(ref.current!.position);
  });

  return (
    <>
      <mesh ref={ref}>
        <primitive object={geom} attach="geometry" />
        <meshStandardMaterial color={'orange'} />
      </mesh>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
    </>
  );
};
