import { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box } from './Box';
import { KING_POINTS } from './KING_POINTS';
import { PAWN_POINTS } from './PAWN_POINTS';
import { QUEEN_POINTS } from './QUEEN_POINTS';
import { TOWER_POINTS } from './TOWER_POINTS';
import { ROOK_POINTS } from './ROOK_POINTS.1';
import { ChessPiece } from './ChessPiece';
import { BOARD_INDEX, AXIS_SIGN, COLORS, BLACK_INDEX, WHITE_INDEX } from './constants';

export function Board() {
  const ref = useRef<THREE.Group | null>(null);
  const [isRotating, setIsRotating] = useState<boolean>(false);

  useEffect(() => {
    const onKeyPress = (event: KeyboardEvent) => {
      if (event.key === ' ') {
        setIsRotating((prev) => !prev);
      }

      if (event.code === 'ArrowLeft') {
        ref.current!.rotation.z += Math.PI / 2;
      }

      if (event.code === 'ArrowRight') {
        ref.current!.rotation.z -= Math.PI / 2;
      }

      console.log(event);
      // ref.current!.rotation.z
    };

    window.addEventListener('keyup', onKeyPress);

    return () => {
      window.removeEventListener('keyup', onKeyPress);
    };
  }, []);

  useFrame((_, delta) => {
    if (isRotating) {
      ref.current!.rotation.z += 0.5 * delta;
    }
  });

  return (
    <group ref={ref}>
      {BOARD_INDEX.map((x) =>
        BOARD_INDEX.map((y) => (
          <Box
            key={`${x}_${y}`}
            position={[x - 4, y - 4, 0]}
            color={(x + y) % 2 === 0 ? 'white' : 'black'}
          />
        ))
      )}
      {[BLACK_INDEX, WHITE_INDEX].map((colorIndex) => {
        const y = AXIS_SIGN[colorIndex];
        const color = COLORS[colorIndex];
        return (
          <>
            <ChessPiece
              key={`${color}-tower-left`}
              position={[-3.5, y * 3.5, 0.1 - 1]}
              points={TOWER_POINTS}
              color={color}
            />
            <ChessPiece
              key={`${color}-tower-right`}
              position={[3.5, y * 3.5, 0.1 - 1]}
              points={TOWER_POINTS}
              color={color}
            />
            <ChessPiece
              key={`${color}-rook-left`}
              position={[-1.5, y * 3.5, 0.1 - 1]}
              points={ROOK_POINTS}
              color={color}
            />
            <ChessPiece
              key={`${color}-rook-right`}
              position={[1.5, y * 3.5, 0.1 - 1]}
              points={ROOK_POINTS}
              color={color}
            />
            <ChessPiece
              key={`${color}-queen`}
              position={[0.5, y * 3.5, 0.1 - 1]}
              points={QUEEN_POINTS}
              color={color}
            />
            <ChessPiece
              key={`${color}-king`}
              position={[-0.5, y * 3.5, 0.1 - 1]}
              points={KING_POINTS}
              color={color}
            />
            {BOARD_INDEX.map((x) => (
              <ChessPiece
                key={`pawn-${x}-${color}`}
                position={[x - 3.5, y * 2.5, 0.1 - 1]}
                points={PAWN_POINTS}
                color={color}
              />
            ))}
          </>
        );
      })}
    </group>
  );
}
