import { useState } from 'react';
import { Vector3 } from '@react-three/fiber';
import { Vector2 } from 'three';
import { ChessMaterial } from './ChessMaterial';

export const ChessPiece = ({
  color,
  position,
  points,
  wireframe = false,
}: {
  color: 'black' | 'white';
  position: Vector3;
  points: Vector2[];
  wireframe?: boolean;
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  return (
    <mesh
      position={position}
      rotation={[Math.PI / 2, 0, 0]}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      <latheGeometry args={[points, 24]} />
      <ChessMaterial color={isHovered ? 'hotpink' : color} wireframe={wireframe} />
    </mesh>
  );
};
