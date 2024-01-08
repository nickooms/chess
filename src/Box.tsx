import { FC, MutableRefObject, useRef, useState } from 'react';
import { MeshProps } from '@react-three/fiber';
import { BufferGeometry, Material, Mesh, NormalBufferAttributes } from 'three';
import { ChessMaterial } from './ChessMaterial';

type MeshRef = Mesh<BufferGeometry<NormalBufferAttributes>, Material> | null;

type Position = [x: number, y: number, z: number];

interface BoxProps extends MeshProps {
  color: 'black' | 'white';
  active?: boolean;
  position?: Position;
}

const [BOX_WIDTH, BOX_HEIGHT, BOX_DEPTH] = [1, 1, 0.1] as const;
const COLOR = {
  HOVERED: 'pink',
  ACTIVE_HOVERED: 'hotpink',
  ACTIVE: 'yellow',
} as const;
const DEFAULTS = {
  ACTIVE: false,
  POSITION: [0, 0, 0],
} as const;

export const Box: FC<BoxProps> = ({
  active: defaultActive = DEFAULTS.ACTIVE,
  position: [x, y, z] = DEFAULTS.POSITION,
  ...props
}) => {
  const meshRef: MutableRefObject<MeshRef> = useRef<MeshRef>(null);
  const [active, setActive] = useState<boolean>(defaultActive);
  const [hovered, setHover] = useState<boolean>(false);

  const position: Position = [x + BOX_WIDTH / 2, y + BOX_HEIGHT / 2, z + BOX_DEPTH / 2];
  const color = hovered
    ? active
      ? COLOR.ACTIVE_HOVERED
      : COLOR.HOVERED
    : active
    ? COLOR.ACTIVE
    : props.color;

  return (
    <mesh
      {...props}
      ref={meshRef}
      position={position}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[BOX_WIDTH, BOX_HEIGHT, BOX_DEPTH]} />
      <ChessMaterial color={color} />
      {props.children}
    </mesh>
  );
};
