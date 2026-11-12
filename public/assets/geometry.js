// A regular dodecahedron: its Cartesian coordinates are built from φ and 1/φ.
export const phi = (1 + Math.sqrt(5)) / 2;
export const vertices = [];
for (const x of [-1, 1]) for (const y of [-1, 1]) for (const z of [-1, 1]) vertices.push([x, y, z]);
for (const a of [-1, 1]) for (const b of [-1, 1]) {
  vertices.push([0, a / phi, b * phi], [a / phi, b * phi, 0], [b * phi, 0, a / phi]);
}
export const edges = [];
for (let i = 0; i < vertices.length; i++) for (let j = i + 1; j < vertices.length; j++) {
  const distance = Math.hypot(...vertices[i].map((n, axis) => n - vertices[j][axis]));
  if (Math.abs(distance - 2 / phi) < 1e-6) edges.push([i, j]);
}
function rotate([x, y, z], phase) {
  const pitch = -.32 + Math.sin(phase * .7) * .12;
  const yaw = .57 + phase;
  const roll = .14;
  const y1 = y * Math.cos(pitch) - z * Math.sin(pitch);
  const z1 = y * Math.sin(pitch) + z * Math.cos(pitch);
  const x2 = x * Math.cos(yaw) + z1 * Math.sin(yaw);
  const z2 = -x * Math.sin(yaw) + z1 * Math.cos(yaw);
  return [x2 * Math.cos(roll) - y1 * Math.sin(roll), x2 * Math.sin(roll) + y1 * Math.cos(roll), z2];
}
function project(point, phase) {
  const [x, y, z] = rotate(point, phase);
  const scale = 105 * 7 / (7 - z);
  return [250 + x * scale, 250 + y * scale, z];
}
export function frame(phase = 0) {
  const points = vertices.map(p => project(p, phase));
  const rings = [0, 1].map(plane => Array.from({length:97}, (_, i) => {
    const t = i / 96 * Math.PI * 2;
    const point = plane === 0 ? [2.12 * Math.cos(t), 0, 2.12 * Math.sin(t)] : [2.12 * Math.cos(t), 2.12 * Math.sin(t), 0];
    const p = project(point, phase * .35);
    return `${i ? 'L' : 'M'}${p[0].toFixed(2)},${p[1].toFixed(2)}`;
  }).join(''));
  return {points, rings};
}
export function initialGeometry() {
  const {points, rings} = frame();
  return `<g class="wire-orbits">${rings.map(d=>`<path d="${d}"/>`).join('')}</g><g class="wire-edges">${edges.map(([a,b],i)=>`<line data-edge="${i}" class="wire-color-${i%4}" x1="${points[a][0]}" y1="${points[a][1]}" x2="${points[b][0]}" y2="${points[b][1]}" opacity="${.3 + (points[a][2]+points[b][2]+3.5)/7*.6}"/>`).join('')}</g><g class="wire-vertices">${points.map((p,i)=>`<circle data-vertex="${i}" cx="${p[0]}" cy="${p[1]}" r="2.4"/>`).join('')}</g>`;
}
