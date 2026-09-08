import { Scene, PAPER, INK, SANDSTONE, STONE, TERRACOTTA } from '../toolkit.mjs';

// Deterministic pseudo-random in [0,1) from integer inputs (no Math.random).
const hash = (a, b, c = 0) => {
  let h = (a * 374761393 + b * 668265263 + c * 2147483647) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
};

/** Faint aggregate grain across a panel: short flecks at low opacity. */
function grain(s, x, y, w, h, seed, count, { dark = 0.06, pale = 0.06 } = {}) {
  for (let i = 0; i < count; i++) {
    const gx = x + hash(seed, i, 1) * (w - 6);
    const gy = y + hash(seed, i, 2) * (h - 4);
    const gw = 2 + Math.round(hash(seed, i, 3) * 5);
    const gh = 1 + Math.round(hash(seed, i, 4) * 2);
    const darkFleck = hash(seed, i, 5) < 0.55;
    s.rect(gx, gy, gw, gh, darkFleck ? INK : PAPER, { opacity: darkFleck ? dark : pale });
  }
}

/** A square mortar sample panel with a shaded edge and ink border. */
function panel(s, x, y, size, seed, { fill, shade = 0, light = 0 }) {
  // drop shadow so the tile lifts off the board
  s.shade(x + 5, y + 6, size, size, 0.08);
  s.rect(x, y, size, size, fill);
  if (shade) s.shade(x, y, size, size, shade);
  if (light) s.light(x, y, size, size, light);
  // trowelled surface: a few faint sweeps
  for (let k = 0; k < 3; k++) {
    const sy = y + 40 + k * 66 + hash(seed, k, 9) * 30;
    const sx = x + 16 + hash(seed, k, 10) * 40;
    const ex = x + size - 16 - hash(seed, k, 11) * 40;
    s.line(sx, sy, ex, sy + (hash(seed, k, 12) - 0.5) * 24, { opacity: 0.022, weight: 18 });
  }
  grain(s, x + 4, y + 4, size - 8, size - 8, seed, 190, { dark: 0.07, pale: 0.07 });
  // sample edge: thin lit top-left, shaded bottom-right returns
  s.light(x, y, size, 3, 0.35);
  s.light(x, y, 3, size, 0.35);
  s.shade(x, y + size - 4, size, 4, 0.14);
  s.shade(x + size - 4, y, 4, size, 0.14);
  // ink border
  s.rect(x, y, size, 3, INK, { opacity: 0.25 });
  s.rect(x, y + size - 3, size, 3, INK, { opacity: 0.25 });
  s.rect(x, y, 3, size, INK, { opacity: 0.25 });
  s.rect(x + size - 3, y, 3, size, INK, { opacity: 0.25 });
}

/** Rotate points (degrees) about the origin, then translate to (cx, cy). */
const place = (pts, deg, cx, cy) => {
  const a = (deg * Math.PI) / 180,
    c = Math.cos(a),
    sn = Math.sin(a);
  return pts.map(([x, y]) => [cx + x * c - y * sn, cy + x * sn + y * c]);
};

/** A sandstone offcut seen from above: chamfered slab with a lit top edge and shaded returns. */
function offcut(s, x, y, w, h, seed, { depth = 14, tone = 0, chamfer = 22 } = {}) {
  const top = [
    [x + chamfer, y],
    [x + w, y],
    [x + w, y + h],
    [x, y + h],
    [x, y + chamfer],
  ];
  // cast shadow
  s.poly(
    top.map(([px, py]) => [px + 8, py + 10]),
    INK,
    { opacity: 0.1 },
  );
  s.rect(x + 8, y + h, w, depth + 2, INK, { opacity: 0.1 });
  // returns: bottom face and right face
  s.rect(x, y + h, w, depth, SANDSTONE);
  s.shade(x, y + h, w, depth, 0.32);
  s.poly(
    [
      [x + w, y],
      [x + w + depth * 0.55, y + depth * 0.5],
      [x + w + depth * 0.55, y + h + depth],
      [x + w, y + h + depth],
    ],
    SANDSTONE,
  );
  s.poly(
    [
      [x + w, y],
      [x + w + depth * 0.55, y + depth * 0.5],
      [x + w + depth * 0.55, y + h + depth],
      [x + w, y + h + depth],
    ],
    INK,
    { opacity: 0.2 },
  );
  // top face
  s.poly(top, SANDSTONE);
  if (tone) s.poly(top, INK, { opacity: tone });
  grain(s, x + 4, y + chamfer, w - 8, h - chamfer - 4, seed, 70, { dark: 0.07, pale: 0.09 });
  // bedding planes
  s.line(x + 10, y + h * 0.4, x + w - 8, y + h * 0.44, { opacity: 0.1, weight: 2 });
  s.line(x + 16, y + h * 0.72, x + w - 14, y + h * 0.68, { opacity: 0.07, weight: 2 });
  // lit top-left edges, faint ink outline on the lower edges
  s.poly(
    [
      [x + chamfer, y],
      [x + w, y],
      [x + w, y + 3],
      [x + chamfer + 1, y + 3],
      [x + 3, y + chamfer + 1],
      [x, y + chamfer],
    ],
    PAPER,
    { opacity: 0.45 },
  );
  s.rect(x + w - 2, y, 2, h, INK, { opacity: 0.14 });
  s.rect(x, y + h - 2, w, 2, INK, { opacity: 0.14 });
}

/** Pointing trowel seen from above, blade pointing down, handle up, canted a few degrees. */
function trowel(s, cx, cy, deg = -14) {
  const P = (pts, fill, opt) => s.poly(place(pts, deg, cx, cy), fill, opt);
  const blade = [
    [-50, 0],
    [50, 0],
    [56, 34],
    [30, 126],
    [0, 236],
    [-30, 126],
    [-56, 34],
  ];
  const tang = [
    [-6, 6],
    [6, 6],
    [7, -70],
    [-7, -70],
  ];
  const ferrule = [
    [-14, -70],
    [14, -70],
    [17, -98],
    [-17, -98],
  ];
  const handle = [
    [-17, -98],
    [17, -98],
    [25, -150],
    [24, -236],
    [14, -268],
    [-14, -268],
    [-24, -236],
    [-25, -150],
  ];
  // cast shadows
  const drop = (pts) => pts.map(([x, y]) => [x + 9, y + 11]);
  P(drop(blade), INK, { opacity: 0.12 });
  P(drop(tang), INK, { opacity: 0.12 });
  P(drop(handle), INK, { opacity: 0.12 });
  // blade
  P(blade, INK, { opacity: 0.9 });
  P(
    [
      [-50, 0],
      [0, 0],
      [0, 236],
      [-30, 126],
      [-56, 34],
    ],
    PAPER,
    { opacity: 0.14 },
  ); // lit left facet
  P(
    [
      [-2, 4],
      [2, 4],
      [1, 220],
      [-1, 220],
    ],
    PAPER,
    { opacity: 0.22 },
  ); // centre ridge
  P(
    [
      [-50, 0],
      [50, 0],
      [50, 5],
      [-50, 5],
    ],
    PAPER,
    { opacity: 0.18 },
  ); // heel highlight
  // tang and ferrule
  P(tang, INK, { opacity: 0.9 });
  P(
    [
      [-2, 6],
      [2, 6],
      [2, -70],
      [-2, -70],
    ],
    PAPER,
    { opacity: 0.2 },
  );
  P(ferrule, STONE);
  P(
    [
      [0, -70],
      [14, -70],
      [17, -98],
      [0, -98],
    ],
    INK,
    { opacity: 0.22 },
  );
  P(
    [
      [-14, -70],
      [14, -70],
      [14, -74],
      [-14, -74],
    ],
    INK,
    { opacity: 0.3 },
  );
  // handle in sandstone-toned timber
  P(handle, SANDSTONE);
  P(
    [
      [0, -98],
      [17, -98],
      [25, -150],
      [24, -236],
      [14, -268],
      [0, -268],
    ],
    INK,
    { opacity: 0.16 },
  ); // shaded flank
  P(
    [
      [-17, -98],
      [-8, -98],
      [-14, -150],
      [-14, -236],
      [-8, -268],
      [-14, -268],
      [-24, -236],
      [-25, -150],
    ],
    PAPER,
    { opacity: 0.28 },
  ); // lit flank
  P(
    [
      [-4, -112],
      [0, -112],
      [1, -250],
      [-3, -250],
    ],
    TERRACOTTA,
    { opacity: 0.22 },
  ); // grain
  P(
    [
      [8, -120],
      [11, -120],
      [10, -240],
      [7, -240],
    ],
    TERRACOTTA,
    { opacity: 0.16 },
  );
  P(
    [
      [-25, -150],
      [25, -150],
      [25, -154],
      [-25, -154],
    ],
    INK,
    { opacity: 0.12 },
  ); // turned ring
  P(
    [
      [-14, -268],
      [14, -268],
      [12, -272],
      [-12, -272],
    ],
    INK,
    { opacity: 0.2 },
  ); // end cap
}

/** A board of nine lime-mortar sample panels with sandstone offcuts and a pointing trowel, from above. */
export function limeMortarSamples() {
  const s = new Scene({
    width: 1200,
    height: 1200,
    title: 'Lime mortar samples',
    description:
      'Nine square lime-mortar sample panels laid out in a grid on a paper board, seen from above, with a stack of three sandstone offcuts and a pointing trowel beside them.',
  });
  s.sky(PAPER);
  // faint paper tooth so the ground is not flat white
  grain(s, 0, 0, s.w, s.h, 77, 500, { dark: 0.035, pale: 0 });

  const size = 240,
    gap = 26;
  const gridW = size * 3 + gap * 2; // 772
  const gx0 = 76,
    gy0 = (s.h - gridW) / 2; // 214
  // the sample board: a slightly lighter card under the grid with a soft edge
  const pad = 30;
  s.shade(gx0 - pad + 8, gy0 - pad + 10, gridW + pad * 2, gridW + pad * 2, 0.07);
  s.rect(gx0 - pad, gy0 - pad, gridW + pad * 2, gridW + pad * 2, STONE, { opacity: 0.35 });
  s.rect(gx0 - pad, gy0 - pad, gridW + pad * 2, 2, INK, { opacity: 0.12 });
  s.rect(gx0 - pad, gy0 - pad, 2, gridW + pad * 2, INK, { opacity: 0.12 });
  // board thickness: bottom and right returns
  s.rect(gx0 - pad, gy0 + gridW + pad, gridW + pad * 2, 8, STONE);
  s.shade(gx0 - pad, gy0 + gridW + pad, gridW + pad * 2, 8, 0.3);
  s.rect(gx0 + gridW + pad, gy0 - pad + 4, 5, gridW + pad * 2 + 4, STONE);
  s.shade(gx0 + gridW + pad, gy0 - pad + 4, 5, gridW + pad * 2 + 4, 0.2);
  s.rect(gx0 - pad, gy0 + gridW + pad - 2, gridW + pad * 2, 2, INK, { opacity: 0.2 });
  s.rect(gx0 + gridW + pad - 2, gy0 - pad, 2, gridW + pad * 2, INK, { opacity: 0.2 });

  // nine mixes: warm to cool, pale to dark, reading left-to-right / top-to-bottom
  const mixes = [
    { fill: SANDSTONE, light: 0.35 },
    { fill: SANDSTONE, light: 0.15 },
    { fill: SANDSTONE },
    { fill: PAPER, shade: 0.05 },
    { fill: STONE, light: 0.2 },
    { fill: SANDSTONE, shade: 0.12 },
    { fill: STONE },
    { fill: STONE, shade: 0.18 },
    { fill: STONE, shade: 0.35 },
  ];
  mixes.forEach((m, i) => {
    const col = i % 3,
      row = Math.floor(i / 3);
    panel(s, gx0 + col * (size + gap), gy0 + row * (size + gap), size, 11 + i * 17, m);
  });

  // right-hand column: offcuts stacked above, trowel below
  const rx = gx0 + gridW + pad + 50; // ~928
  offcut(s, rx + 26, 214, 170, 96, 301, { tone: 0.08 });
  offcut(s, rx + 6, 286, 158, 90, 302, { tone: 0.0, chamfer: 16 });
  offcut(s, rx + 34, 352, 178, 104, 303, { tone: 0.12, chamfer: 26 });

  trowel(s, rx + 92, 750, -12);

  // a scatter of mortar crumbs around the offcuts and the trowel tip
  const crumbs = [
    [rx + 190, 512],
    [rx + 70, 500],
    [rx + 150, 540],
    [rx - 6, 1010],
    [rx + 60, 1040],
    [rx + 118, 1058],
    [rx + 200, 1030],
  ];
  crumbs.forEach(([x, y], i) => {
    s.circle(x, y, 3 + (i % 3), i % 2 ? SANDSTONE : STONE);
    s.circle(x, y, 3 + (i % 3), INK, { opacity: 0.12 });
  });
  return s;
}
