import { FC, MutableRefObject, useRef } from 'react';
import { MeshProps } from '@react-three/fiber';
import { BufferGeometry, Material, Mesh, NormalBufferAttributes } from 'three';
import { useSpring, a } from '@react-spring/three';

type MeshRef = Mesh<BufferGeometry<NormalBufferAttributes>, Material> | null;

type Position = [x: number, y: number, z: number];

interface BoxProps extends MeshProps {
  color: 'black' | 'white' | string;
  position?: Position;
}

const SIZE = [1, 1, 0.1];
const [WIDTH, HEIGHT, DEPTH] = SIZE;

export const Box: FC<BoxProps> = ({ position: [x, y, z] = [0, 0, 0], color, ...props }) => {
  const meshRef: MutableRefObject<MeshRef> = useRef<MeshRef>(null);
  const position: Position = [x + WIDTH / 2, y + HEIGHT / 2, z + DEPTH / 2];
  const [springs, api] = useSpring(
    () => ({
      color,
    }),
    []
  );

  return (
    <mesh
      {...props}
      ref={meshRef}
      position={position}
      onClick={() => api.start({ color: 'yellow' })}
      // onPointerOver={() => api.start({ color: 'hotpink' })}
      // onPointerOut={() => api.start({ color })}
    >
      <boxGeometry args={[WIDTH, HEIGHT, DEPTH]} />
      <a.meshPhysicalMaterial color={springs.color} />
      {props.children}
    </mesh>
  );
};
