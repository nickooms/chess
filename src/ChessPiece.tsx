import { Euler, Vector3 } from '@react-three/fiber';
import { Vector2 } from 'three';
import { ChessMaterial } from './ChessMaterial';
import { animated, useSpring } from '@react-spring/three';

const SECTIONS = 4;

const AnimatedChessMaterial = animated(ChessMaterial); 

type ChessPieceProps = {
  color: string;
  position: Vector3;
  points: Vector2[];
  wireframe?: boolean;
}


export const ChessPiece = ({
  color,
  position,
  points,
  wireframe = false,
}: ChessPieceProps) => {
  const [springs, api] = useSpring(
    () => ({
      color,
      config: (key) => {
        switch (key) {
          case 'scale':
          case 'color':
            return {
              mass: 4,
              friction: 10,
              // tension: 200,
            };

          case 'position':
            return { mass: 4, friction: 220 };

          default:
            return {};
        }
      },
    }),
    []
  );

  const rotation:Euler = [Math.PI / 2, 0, 0];

  return (
    <mesh
      position={position}
      rotation={rotation}
      onPointerOver={() => api.start({ color: 'hotpink' })}
      onPointerOut={() => api.start({ color })}
    >
      <latheGeometry args={[points, SECTIONS]} />
      <AnimatedChessMaterial color={springs.color} wireframe={wireframe} />
    </mesh>
  );
};
