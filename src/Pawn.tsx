import { FC } from 'react';
import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';

interface PawnProps {
  position?: [x: number, y: number, z: number];
}

const Pawn: FC<PawnProps> = ({ position = [0, 0, 0] }) => {
  const svgMarkup = document.querySelector('svg')!.outerHTML;
  const loader = new SVGLoader();
  const svgData = loader.parse(svgMarkup);
  const svgGroup = new THREE.Group();

  const circle = new THREE.EllipseCurve(0, 0, 10, 10, 0, 2 * Math.PI, false, 0);
  const circlePoints = circle
    .getPoints(100)
    .map((point) => new THREE.Vector3(point.x, 0, -point.y));
  svgGroup.scale.y *= -1;
  svgGroup.rotateY(Math.PI / 4);
  const material = new THREE.MeshNormalMaterial();
  svgData.paths.forEach((path) => {
    const shapes = path.toShapes(true);
    shapes.forEach((shape) => {
      const geometry = new THREE.ExtrudeGeometry(shape, {
        depth: 1,
        bevelEnabled: false,
        extrudePath: new THREE.CatmullRomCurve3(circlePoints),
      });
      // geometry.center();
      const mesh = new THREE.Mesh(geometry, material);
      svgGroup.add(mesh);
    });
  });
  // const box = new THREE.Box3().setFromObject(svgGroup);
  // const size = new THREE.Vector3();
  // box.getSize(size);
  /* const yOffset = size.y / -2;
  const xOffset = size.x / -2;
  svgGroup.children.forEach((item) => {
    item.position.x = xOffset;
    item.position.y = yOffset;
  }); */
  return (
    <mesh position={position}>
      <primitive object={svgGroup} />
    </mesh>
  );
};

export default Pawn;
