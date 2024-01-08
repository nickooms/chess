import { simplify } from '../simplify.js';
import { ShapeUtils } from '../node_modules/three/src/extras/ShapeUtils.js';

const NS_SVG = 'http://www.w3.org/2000/svg';
const SAMPLE_COUNT = 1000;
const ORDER = ['pawn', 'knight', 'rook', 'bishop', 'queen', 'king'];

const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

const run = () => {
  let offset = 0;
  const paths = $$('path');
  const bboxes = paths.map((path) => path.getBBox()).toSorted((a, b) => a.height - b.height);
  const maxHeight = bboxes.at(-1).height;
  const maxWidth = Math.max(...bboxes.map((bbox) => bbox.width));
  // console.log(bboxes);
  const svg = $('svg');
  paths.map((path, i) => {
    const pathLength = path.getTotalLength();
    const bbox = path.getBBox();
    // console.dir(bbox);
    const offsetX = Math.round(bbox.x + bbox.width / 2);
    const offsetY = Math.round(bbox.y + (bbox.height - maxHeight));
    const simplified = simplify(
      [...new Array(SAMPLE_COUNT).keys()]
        .map((key) => path.getPointAtLength(pathLength * (key / SAMPLE_COUNT)))
        .map(({ x, y }) => ({
          x: x - offsetX,
          y: y - offsetY,
        }))
        .map(({ x, y }) => ({ x: Math.max(0, x), y }))
    ).map(({ x, y }) => ({ x: Math.round(x), y: Math.round(y) }));
    const g = document.createElementNS(NS_SVG, 'g');
    g.setAttribute('fill', 'none');
    const polygon = document.createElementNS(NS_SVG, 'polygon');
    const points = (
      ShapeUtils.isClockWise(simplified.map(({ x, y }) => [x, y]))
        ? simplified
        : simplified.reverse()
    )
      .map(({ x, y }) => `${x},${y}`)
      .join(' ');
    polygon.setAttribute('points', points);
    polygon.setAttribute('fill', 'none');
    polygon.setAttribute('stroke', 'red');
    polygon.setAttribute('stroke-width', 1);
    polygon.setAttribute('transform', `translate(${offset})`);
    offset += bbox.width;
    svg.appendChild(g);
    g.appendChild(polygon);
    // const coordinates = ;
    // const x = Math.max(...simplified.map(({ x }) => x));
    const yRange = simplified.map(({ y }) => y);
    // console.log(yRange);
    const minY = Math.min(...yRange);
    const maxY = Math.max(...yRange);
    const y = maxY - minY;
    console.groupCollapsed(ORDER[i]);
    console.log(
      JSON.stringify(
        simplified
          .map((point) => [
            Number((point.x / y).toFixed(3)),
            Number(((point.y - minY) / y + 1).toFixed(3)),
          ])
          .reverse()
      )
        .split('],[')
        .join('],\n[')
    );
    console.groupEnd();
    return simplified;
  });
  svg.setAttribute('viewBox', [-maxWidth / 2, 0, offset, maxHeight * 2].join(' '));
};

document.addEventListener('DOMContentLoaded', run);
