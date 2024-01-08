import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Board } from './Board';

export const App = () => {
  return (
    <Canvas camera={{ fov: 90, position: [0, -5, 2.5] }}>
      <OrbitControls />
      {/* <axesHelper args={[8]} /> */}
      {/* <ambientLight intensity={0.3} /> */}
      {/* <pointLight position={[0, -6, 0]} intensity={15} /> */}
      <spotLight position={[0, -5, 0]} intensity={20} color="white" />
      <spotLight position={[-2, -5, -2]} intensity={20} color="red" />
      <spotLight position={[2, -5, -2]} intensity={20} color="green" />
      <spotLight position={[-2, -5, 2]} intensity={20} color="blue" />
      <spotLight position={[2, -5, 2]} intensity={20} color="pink" />
      <Board />
      {/* <Suspense fallback={null}>
              <Model url={'./chess_knight_unicorn.stl'} />
            </Suspense> */}
      <OrbitControls />
    </Canvas>
  );
};
