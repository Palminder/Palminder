import { Scene, SANDSTONE, STONE, INK, PAPER, TERRACOTTA, WHITE } from '../toolkit.mjs';

/** Close study of ashlar sandstone coursing with lime joints, decayed stones and one fresh indent. */
export function sandstoneCoursing() {
  const W = 1200,
    H = 1200;
  const s = new Scene({
    width: W,
    height: H,
    title: 'Sandstone coursing',
    description:
      'A close view of ashlar sandstone wall coursing with lime joints, three weathered darker stones with eroded lower edges and one pale newly indented replacement stone.',
  });
  const course = 110,
    stone = 300,
    joint = 8;
  const pitchY = course + joint,
    pitchX = stone + joint;

  // lime joints as the ground layer
  s.rect(0, 0, W, H, STONE);
  s.light(0, 0, W, H, 0.18);

  // decayed stones keyed by "row:col" (col counted from the offset origin), and the one indent
  const decayed = new Set(['2:1', '5:3', '8:2']);
  const indent = '4:2';

  const eroded = (x, y, w, h, depth) => {
    // ashlar with spalled corners and a gently scalloped lower arris
    const pts = [
      [x, y],
      [x + w, y],
      [x + w, y + h - depth * 1.8],
      [x + w - depth * 1.4, y + h - depth * 0.6],
    ];
    const bays = 5,
      bw = (w - depth * 2.8) / bays;
    for (let i = bays - 1; i >= 0; i--) {
      const k = (i * 3 + Math.round(x / 50)) % 3;
      const d = depth * (0.15 + k * 0.3);
      const bx = x + depth * 1.4 + bw * i;
      pts.push([bx + bw * 0.7, y + h - d * 0.4]);
      pts.push([bx + bw * 0.35, y + h - d]);
      pts.push([bx, y + h - d * 0.3]);
    }
    pts.push([x + depth * 0.6, y + h - depth * 0.9]);
    pts.push([x, y + h - depth * 2.2]);
    return pts;
  };
  const decayedFace = (sx, cy, w, ch, tone, v) => {
    const shape = eroded(sx, cy, w, ch, 14);
    s.poly(shape, SANDSTONE);
    s.poly(shape, INK, { opacity: 0.18 + tone });
    // laminated bedding planes showing through the weathered face
    for (let i = 1; i < 5; i++) s.rect(sx + 10, cy + i * 22, w - 20, 5, INK, { opacity: 0.06 });
    // terracotta iron-staining blooming up from the damp lower face
    const a = 0.12 + v * 0.18,
      b = 0.5 - v * 0.08;
    s.poly(
      [
        [sx + w * a, cy + ch - 10],
        [sx + w * (a + 0.1), cy + ch * b],
        [sx + w * 0.42, cy + ch * (b - 0.1)],
        [sx + w * 0.6, cy + ch * (b + 0.05)],
        [sx + w * (0.9 - v * 0.08), cy + ch * b],
        [sx + w * 0.9, cy + ch - 12],
      ],
      TERRACOTTA,
      { opacity: 0.16 },
    );
    s.poly(
      [
        [sx + w * 0.3, cy + ch - 12],
        [sx + w * 0.38, cy + ch * 0.65],
        [sx + w * 0.62, cy + ch * 0.62],
        [sx + w * 0.72, cy + ch - 14],
      ],
      TERRACOTTA,
      { opacity: 0.18 },
    );
    s.shade(sx, cy + ch - 30, w, 30, 0.12); // damp lower face
    s.shade(sx, cy, 12, ch, 0.12); // left return of the recess
    s.rect(sx, cy, w, 6, INK, { opacity: 0.24 }); // recess shadow under the bed above
  };

  let row = 0;
  for (let cy = 0; cy < H; cy += pitchY) {
    const offset = row % 2 ? stone / 2 : 0;
    const ch = Math.min(course, H - cy);
    let col = 0;
    for (let cx = -offset; cx < W; cx += pitchX) {
      const sx = Math.max(cx, 0),
        ex = Math.min(cx + stone, W);
      const key = `${row}:${col}`;
      if (ex > sx) {
        const w = ex - sx;
        const tone = ((row * 7 + col * 3) % 5) * 0.025;
        if (decayed.has(key)) {
          decayedFace(sx, cy, w, ch, tone, (row + col) % 3);
        } else if (key === indent) {
          // fresh replacement indent, crisp and pale
          s.rect(sx, cy, w, ch, SANDSTONE);
          s.light(sx, cy, w, ch, 0.35);
          s.rect(sx, cy, w, 2, WHITE, { opacity: 0.7 });
          s.rect(sx, cy, 2, ch, WHITE, { opacity: 0.55 });
          // fine sharp tooling lines on the new face
          for (let i = 1; i < 6; i++)
            s.line(sx + 18, cy + 12 + i * 14, sx + w - 18, cy + 12 + i * 14, { opacity: 0.05 });
        } else {
          s.rect(sx, cy, w, ch, SANDSTONE);
          if (tone) s.shade(sx, cy, w, ch, tone);
          // slight weathering darkening at the bottom of each bed, and a top arris catching light
          s.shade(sx, cy + ch - 26, w, 26, 0.05);
          s.light(sx, cy, w, 4, 0.35);
          // a faint stain patch on some ordinary stones to keep the field from reading as tiles
          const p = (row * 11 + col * 5) % 7;
          if (p === 3)
            (s.poly(
              [
                [sx + w * 0.5, cy + ch - 30],
                [sx + w * 0.58, cy + 22],
                [sx + w * 0.8, cy + 30],
                [sx + w * 0.92, cy + ch - 26],
              ],
              TERRACOTTA,
              { opacity: 0.045 },
            ),
              s.poly(
                [
                  [sx + w * 0.6, cy + ch - 32],
                  [sx + w * 0.66, cy + 40],
                  [sx + w * 0.8, cy + 46],
                  [sx + w * 0.86, cy + ch - 30],
                ],
                TERRACOTTA,
                { opacity: 0.04 },
              ));
          if (p === 5)
            s.poly(
              [
                [sx + 20, cy + ch - 6],
                [sx + 40, cy + ch * 0.5],
                [sx + w * 0.3, cy + ch * 0.42],
                [sx + w * 0.45, cy + ch * 0.6],
                [sx + w * 0.42, cy + ch - 6],
              ],
              INK,
              { opacity: 0.035 },
            );
        }
      }
      col++;
    }
    // raked joint shadow beneath the course
    if (cy + course < H) s.rect(0, cy + course, W, 6, INK, { opacity: 0.24 });
    row++;
  }
  // perpends (vertical joints) get a softer shadow on their left face
  row = 0;
  for (let cy = 0; cy < H; cy += pitchY) {
    const offset = row % 2 ? stone / 2 : 0;
    const ch = Math.min(course, H - cy);
    for (let cx = -offset + stone; cx < W; cx += pitchX) {
      if (cx + 3 > 0 && cx < W) s.rect(cx, cy, 3, ch, INK, { opacity: 0.12 });
    }
    row++;
  }
  return s;
}
