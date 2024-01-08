// import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import unicorn from './chess_knight_unicorn.stl';
export const [BLACK_INDEX, WHITE_INDEX] = [0, 1] as const;
export const COLORS = ['black', 'white'] as const;
export const AXIS_SIGN = [1, -1] as const;

export const BOARD_INDEX = [...Array(8).keys()];
