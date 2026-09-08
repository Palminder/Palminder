/** Isometric projection helper (30°): plan x to the right-down, plan y to the left-down, z up. */
export function isoProjector({ originX, originY, scale }) {
  const c = Math.cos(Math.PI / 6);
  const s = Math.sin(Math.PI / 6);
  return (x, y, z = 0) => [
    originX + (x - y) * c * scale,
    originY + (x + y) * s * scale - z * scale,
  ];
}

/** Extrude a plan rectangle (x, y, w, h) to height z and return the three visible faces as point lists. */
export function isoBox(P, x, y, w, h, z) {
  const top = [P(x, y, z), P(x + w, y, z), P(x + w, y + h, z), P(x, y + h, z)];
  const right = [P(x + w, y, 0), P(x + w, y + h, 0), P(x + w, y + h, z), P(x + w, y, z)]; // face facing +x
  const front = [P(x, y + h, 0), P(x + w, y + h, 0), P(x + w, y + h, z), P(x, y + h, z)]; // face facing +y
  return { top, right, front };
}
