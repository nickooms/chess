import { ChessBoardShaderMaterial } from './ChessBoardShaderMaterial';

export const ChessBoardMaterial = ({ transparent = false }) => (
  <shaderMaterial
    opacity={transparent ? 0.2 : 1}
    transparent={transparent}
    attach="material"
    args={[ChessBoardShaderMaterial]}
  />
);
