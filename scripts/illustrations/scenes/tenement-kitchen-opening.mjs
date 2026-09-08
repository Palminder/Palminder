import { Scene, SANDSTONE, INK, PAPER, MOSS, WHITE } from '../toolkit.mjs';

/** Interior of a reordered tenement flat: a wide new opening cut through the wall between kitchen and dining room, seen square-on. */
export function tenementKitchenOpening() {
  const s = new Scene({
    width: 1600,
    height: 1200,
    title: 'Tenement kitchen opening',
    description:
      'A wide new opening in a plastered tenement wall with a retained cornice, looking through to a kitchen with moss-green cabinetry, a tall sash window and timber floorboards.',
  });
  // One-point perspective: vanishing point at eye level in the middle of the picture.
  const VP = [800, 600];
  const P = (x, y, k) => [VP[0] + (x - VP[0]) * k, VP[1] + (y - VP[1]) * k]; // point at depth factor k
  // Far room envelope at the near picture plane (k = 1): walls at x 280/1320, ceiling y 200, floor y 900.
  const L = 280,
    R = 1320,
    C = 200,
    F = 900;
  const KR = 0.9; // inner face of the reveal (wall thickness)
  const KF = 0.55; // far wall

  // ---- room beyond (drawn first, the near wall is laid over it) ----
  s.rect(0, 0, s.w, s.h, PAPER);
  // ceiling
  s.poly([[L, C], [R, C], P(R, C, KF), P(L, C, KF)], PAPER);
  s.poly([[L, C], [R, C], P(R, C, KF), P(L, C, KF)], PAPER, { opacity: 0.4 });
  s.light(0, 0, s.w, P(0, C, KF)[1], 0.3);
  // far wall
  const fw = { x: P(L, 0, KF)[0], y: P(0, C, KF)[1], w: (R - L) * KF, h: (F - C) * KF };
  s.rect(fw.x, fw.y, fw.w, fw.h, PAPER);
  s.shade(fw.x, fw.y, fw.w, fw.h, 0.05);
  s.line(fw.x, fw.y, fw.x + fw.w, fw.y, { opacity: 0.14 });
  // right wall, plain plaster in half shade
  s.poly([P(R, C, KF), [R, C], [R, F], P(R, F, KF)], PAPER);
  s.shade(...[Math.min(P(R, C, KF)[0], R), C, R - P(R, C, KF)[0], F - C], 0.1);
  s.poly([P(R, F - 14, KF), [R, F - 14], [R, F], P(R, F, KF)], INK, { opacity: 0.22 }); // right skirting
  // floor beyond: timber boards running away from the viewer
  s.poly([[L, F], [R, F], P(R, F, KF), P(L, F, KF)], SANDSTONE);
  for (let x = L; x <= R; x += 24) {
    const a = [x, F],
      b = P(x, F, KF);
    s.line(a[0], a[1], b[0], b[1], { opacity: 0.16 });
  }
  s.shade(fw.x, fw.y + fw.h - 6, fw.w, 6, 0.1); // far skirting shadow
  s.rect(fw.x, fw.y + fw.h - 14, fw.w, 14, PAPER); // far skirting
  s.shade(fw.x, fw.y + fw.h - 14, fw.w, 14, 0.22);
  // tall sash window on the far wall, to the right of centre, letting light in
  const wx = 845,
    wy = 415,
    ww = 170,
    wh = 300;
  s.window(wx, wy, ww, wh, { reveal: 10, lit: true });
  s.light(wx - 10, wy - 10, ww + 20, wh + 10, 0.1);
  // upper sash pane divisions
  s.rect(wx + ww / 2 - 1.5, wy, 3, wh, PAPER, { opacity: 0.7 });
  s.rect(wx, wy + wh * 0.25, ww, 3, PAPER, { opacity: 0.55 });
  s.rect(wx, wy + wh * 0.75, ww, 3, PAPER, { opacity: 0.55 });
  // pool of window light on the far floor
  s.light(fw.x + 250, fw.y + fw.h, 300, 20, 0.2);

  // full-height painted cabinetry on the left wall, running from the opening to the far wall
  s.poly([[L, C], P(L, C, KF), P(L, F, KF), [L, F]], MOSS);
  s.shade(...bbox([[L, C], P(L, C, KF), P(L, F, KF), [L, F]]), 0.08);
  // door divisions (verticals converging on the vanishing plane)
  const doors = 6;
  for (let i = 0; i <= doors; i++) {
    const k = KF + (1 - KF) * (i / doors);
    const a = P(L, C, k),
      b = P(L, F, k);
    s.line(a[0], a[1], b[0], b[1], { color: PAPER, opacity: 0.55, weight: 2 });
  }
  // worktop line and tall-unit split
  const split = (f) => {
    const a = P(L, C + (F - C) * f, 1),
      b = P(L, C + (F - C) * f, KF);
    s.line(a[0], a[1], b[0], b[1], { color: PAPER, opacity: 0.55, weight: 2 });
  };
  split(0.4);
  split(0.78);
  for (let i = 0; i < doors; i++) {
    const k = KF + (1 - KF) * ((i + 0.5) / doors);
    const [hx, hy] = P(L, C + (F - C) * 0.5, k);
    const [, hy2] = P(L, C + (F - C) * 0.44, k);
    const d = 6 * k;
    s.rect(hx - 1, hy2 - d, 2, hy - hy2 + d, INK, { opacity: 0.5 });
  }
  // plinth at the foot of the cabinets
  s.poly([[L, F - 16], P(L, F - 16, KF), P(L, F, KF), [L, F]], INK, { opacity: 0.3 });
  // cabinetry top shadow under the ceiling line
  s.poly([[L, C], P(L, C, KF), P(L, C + 12, KF), [L, C + 12]], INK, { opacity: 0.12 });

  // pendant light hanging in the room beyond
  const [px, py] = P(700, C, 0.75);
  s.line(px, py, px, py + 172, { color: INK, opacity: 0.85, weight: 2 });
  s.circle(px, py + 196, 28, INK);
  s.circle(px - 6, py + 190, 12, PAPER, { opacity: 0.1 });

  // ---- the near wall with the opening cut through it ----
  const ox = 320,
    oy = 240,
    oW = 960,
    oH = F - oy; // opening at the near face
  const [ix0, iy0] = P(ox, oy, KR),
    [ix1, iy1] = P(ox + oW, F, KR); // inner face of the reveal
  s.rect(0, 0, ox, F, PAPER); // left pier
  s.rect(ox + oW, 0, s.w - ox - oW, F, PAPER); // right pier
  s.rect(0, 0, s.w, oy, PAPER); // lintel zone
  // reveal returns
  s.poly(
    [
      [ox, oy],
      [ox + oW, oy],
      [ix1, iy0],
      [ix0, iy0],
    ],
    PAPER,
  ); // head
  s.shade(
    ...bbox([
      [ox, oy],
      [ox + oW, oy],
      [ix1, iy0],
      [ix0, iy0],
    ]),
    0,
  );
  s.poly(
    [
      [ox, oy],
      [ox + oW, oy],
      [ix1, iy0],
      [ix0, iy0],
    ],
    INK,
    { opacity: 0.2 },
  );
  s.poly(
    [
      [ox, oy],
      [ix0, iy0],
      [ix0, iy1],
      [ox, F],
    ],
    PAPER,
  ); // left jamb
  s.poly(
    [
      [ox, oy],
      [ix0, iy0],
      [ix0, iy1],
      [ox, F],
    ],
    INK,
    { opacity: 0.12 },
  );
  s.poly(
    [
      [ox + oW, oy],
      [ix1, iy0],
      [ix1, iy1],
      [ox + oW, F],
    ],
    PAPER,
  ); // right jamb
  s.poly(
    [
      [ox + oW, oy],
      [ix1, iy0],
      [ix1, iy1],
      [ox + oW, F],
    ],
    INK,
    { opacity: 0.12 },
  );
  // crisp inner arris
  s.line(ix0, iy0, ix1, iy0, { opacity: 0.35, weight: 1.5 });
  s.line(ix0, iy0, ix0, iy1, { opacity: 0.35, weight: 1.5 });
  s.line(ix1, iy0, ix1, iy1, { opacity: 0.35, weight: 1.5 });
  // threshold: boards run through
  s.poly(
    [
      [ox, F],
      [ix0, iy1],
      [ix1, iy1],
      [ox + oW, F],
    ],
    SANDSTONE,
  );
  s.light(ox, iy1, oW, F - iy1, 0.15);
  // near wall is unevenly lit: a wash of daylight around the opening
  s.light(ox - 60, oy - 40, oW + 120, F - oy + 40, 0.12);
  // skirting on the near wall
  s.rect(0, F - 30, ox, 30, PAPER);
  s.shade(0, F - 30, ox, 30, 0.3);
  s.rect(ox + oW, F - 30, s.w - ox - oW, 30, PAPER);
  s.shade(ox + oW, F - 30, s.w - ox - oW, 30, 0.3);
  s.line(0, F - 30, ox, F - 30, { opacity: 0.25 });
  s.line(ox + oW, F - 30, s.w, F - 30, { opacity: 0.25 });

  // retained cornice: a stepped band along the top of the wall
  const cy = 36;
  s.rect(0, 0, s.w, cy, PAPER);
  s.shade(0, 0, s.w, cy, 0.07); // ceiling margin
  // each step projects further than the one above, so its top face catches light and it throws a shadow below
  const steps = [
    [cy, 34, 0.02, 0.2],
    [cy + 34, 22, 0.05, 0.16],
    [cy + 56, 14, 0.09, 0.12],
  ];
  for (const [y, h, tone, sh] of steps) {
    s.rect(0, y, s.w, h, PAPER);
    s.shade(0, y, s.w, h, tone);
    s.rect(0, y, s.w, 3, WHITE); // lit top edge
    s.shade(0, y + h, s.w, h * 0.5, sh);
  }
  s.line(0, cy, s.w, cy, { opacity: 0.22 });

  // ---- near floor: timber boards ----
  s.rect(0, F, s.w, s.h - F, SANDSTONE);
  for (let x = -600; x <= s.w + 600; x += 24) {
    // boards recede toward the vanishing point; clip to the floor band
    const t = (s.h - F) / (s.h - VP[1]);
    const x2 = x + (VP[0] - x) * t;
    s.line(x, s.h, x2, F, { opacity: 0.16 });
  }
  s.shade(0, F, s.w, 10, 0.16); // shadow at the foot of the wall
  s.rect(0, F, s.w, 2, INK, { opacity: 0.3 });
  // daylight spilling through the opening onto the near floor
  s.poly(
    [
      [ox, F],
      [ox + oW, F],
      [ox + oW + 160, s.h],
      [ox - 160, s.h],
    ],
    PAPER,
    { opacity: 0.16 },
  );
  s.shade(0, F, ox - 160, s.h - F, 0.05);
  s.shade(ox + oW + 160, F, s.w - ox - oW - 160, s.h - F, 0.05);
  return s;
}

function bbox(pts) {
  const xs = pts.map((p) => p[0]),
    ys = pts.map((p) => p[1]);
  const x = Math.min(...xs),
    y = Math.min(...ys);
  return [x, y, Math.max(...xs) - x, Math.max(...ys) - y];
}
