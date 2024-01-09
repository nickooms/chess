import { FC } from 'react';
// import { ChessMaterialProps } from './ChessMaterial';

export const ChessMaterial: FC<ChessMaterialProps> = ({ color = 'white', wireframe = false }) => (
  <meshPhysicalMaterial
    color={color}
    flatShading={false}
    metalness={0}
    roughness={0}
    clearcoat={50}
    // reflectivity={50}
    // transmission={0.8}
    // thickness={0.5}
    wireframe={wireframe}
    sheen={1}
  />
);
export interface ChessMaterialProps {
  color?: 'black' | 'white' | string;
  wireframe?: boolean;
}
