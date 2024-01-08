const pathToPoints = (numSamples = 100, scale = 1) => {
  const path = document.querySelector('path');
  const pathLength = path.getTotalLength();
  const step = Math.ceil(pathLength / numSamples);
  const points = [...new Array(numSamples).keys()]
    .map((i) => path.getPointAtLength(i * step))
    .map(({ x, y }) => [x, y]);
  const scaleFactor = scale / Math.max(...points.flat());
  return points
    .map(([x, y]) => [x * scaleFactor, y * scaleFactor])
    .map(([x, y]) => [Number(x.toFixed(3)), Number(y.toFixed(3))]);
};

document.addEventListener('DOMContentLoaded', () => {
  const points = pathToPoints(20);
  console.log(JSON.stringify(points, null));
});
