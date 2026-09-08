import { Scene, SANDSTONE, INK, PAPER, STONE, TERRACOTTA } from '../toolkit.mjs';

/** Rubble core exposed through an opened-up patch of a sandstone rear elevation, with ladder, sample blocks and bucket. */
export function siteInspectionReveal() {
  const s = new Scene({
    width: 1600,
    height: 1200,
    title: 'Site inspection opening-up',
    description:
      'A sandstone rear wall with two sash windows, a rectangular area of facing stone removed in the centre to expose the rubble core behind, a ladder leaning against the wall, and two stone samples and a bucket on the pavement.',
  });
  const ground = 1020;
  // deterministic jitter (integer hash, no Math.random) so the rubble never renders the same twice in a row
  const jit = (i, k, amp) =>
    (((((i * 73 + k * 151 + 17) * 2654435761) >>> 0) % 1000) / 1000) * amp - amp / 2;

  // ---- the wall: squared sandstone coursing over the whole frame ----
  s.coursing(0, -20, s.w, ground + 20, { course: 66, stone: 176, joint: 5 });
  s.shade(0, 0, 420, ground, 0.04); // slightly darker down the left
  s.light(1100, 0, 500, 520, 0.08); // top right catching the light
  for (let i = 0; i < 4; i++) s.shade(0, ground - 60 - i * 40, s.w, 40, 0.025 * (4 - i)); // damp staining low down

  // ---- sash windows at the top corners ----
  s.window(150, 110, 190, 330, { reveal: 10 });
  s.window(1260, 110, 190, 330, { reveal: 10 });

  // ---- the opening-up ----
  const ox = 520,
    oy = 440,
    ow = 560,
    oh = 400;
  const edge = [
    [ox, oy + 12],
    [ox + 60, oy],
    [ox + 150, oy + 8],
    [ox + 240, oy - 4],
    [ox + 330, oy + 6],
    [ox + 430, oy - 2],
    [ox + 500, oy + 10],
    [ox + ow, oy + 2],
    [ox + ow + 6, oy + 90],
    [ox + ow - 4, oy + 180],
    [ox + ow + 8, oy + 270],
    [ox + ow, oy + 340],
    [ox + ow - 6, oy + oh],
    [ox + 470, oy + oh + 8],
    [ox + 380, oy + oh - 2],
    [ox + 290, oy + oh + 6],
    [ox + 200, oy + oh],
    [ox + 110, oy + oh + 10],
    [ox + 30, oy + oh + 2],
    [ox - 8, oy + 320],
    [ox + 4, oy + 230],
    [ox - 6, oy + 140],
    [ox + 2, oy + 60],
  ];
  // thickness of the facing stone showing as a lit return on the bottom and right of the hole
  s.poly(
    edge.map(([x, y]) => [x + 14, y + 12]),
    SANDSTONE,
  );
  s.poly(
    edge.map(([x, y]) => [x + 14, y + 12]),
    PAPER,
    { opacity: 0.2 },
  );
  s.poly(edge, STONE); // exposed hearting mortar behind the facing
  s.poly(edge, INK, { opacity: 0.35 }); // the recess in shadow
  // dark cavity band running across the core (the void between outer leaf and hearting)
  s.poly(
    [
      [ox + 6, oy + 176],
      [ox + 120, oy + 166],
      [ox + 260, oy + 172],
      [ox + 420, oy + 162],
      [ox + ow - 6, oy + 170],
      [ox + ow - 6, oy + 246],
      [ox + 400, oy + 254],
      [ox + 230, oy + 244],
      [ox + 90, oy + 252],
      [ox + 6, oy + 240],
    ],
    INK,
    { opacity: 0.74 },
  );
  s.shade(ox + 6, oy + 246, ow - 12, 8, 0.2);

  // rubble hearting: irregular stones, roughly bedded in courses but of varied size and tilt
  const stone = (i, cx, cy, w, h, fill, tone) => {
    const pts = [];
    const nPts = 7;
    for (let k = 0; k < nPts; k++) {
      const a = (k / nPts) * Math.PI * 2 + jit(i, k, 0.5);
      const r = 1 + jit(i, k + 20, 0.32);
      pts.push([cx + Math.cos(a) * w * 0.5 * r, cy + Math.sin(a) * h * 0.5 * r]);
    }
    s.poly(pts, fill);
    if (tone) s.poly(pts, INK, { opacity: tone });
    // a lit top edge on each stone
    s.poly(
      pts
        .slice(3, 7)
        .map(([x, y]) => [x, y + 6])
        .concat(pts.slice(3, 7).reverse()),
      PAPER,
      { opacity: 0.12 },
    );
  };
  const rows = [
    { y: oy + 44, h: 74, tones: [0.06, 0.14, 0.1, 0.18] },
    { y: oy + 124, h: 78, tones: [0.2, 0.26, 0.22, 0.3] },
    { y: oy + 292, h: 80, tones: [0.28, 0.24, 0.32, 0.26] },
    { y: oy + 366, h: 66, tones: [0.12, 0.18, 0.14, 0.2] },
  ];
  let i = 0;
  rows.forEach((row, r) => {
    let x = ox + 20 + (r % 2 ? 40 : 0);
    let k = 0;
    while (x < ox + ow - 30) {
      const w = 96 + jit(i, 3, 70);
      const cx = Math.min(x + w / 2, ox + ow - 40);
      stone(
        i,
        cx,
        row.y + jit(i, 5, 14),
        Math.min(w, ox + ow - 8 - x),
        row.h + jit(i, 7, 18),
        (i + r) % 3 === 0 ? STONE : SANDSTONE,
        row.tones[k % 4],
      );
      x += w + 10 + jit(i, 9, 12);
      i++;
      k++;
    }
  });
  // small pinnings tucked between the larger stones
  for (let p = 0; p < 14; p++) {
    const px = ox + 40 + ((p * 97) % (ow - 80));
    const py = oy + 60 + ((p * 61) % 330);
    if (py > oy + 150 && py < oy + 260) continue;
    s.poly(
      [
        [px, py + 6],
        [px + 12, py],
        [px + 24, py + 8],
        [px + 18, py + 20],
        [px + 4, py + 18],
      ],
      SANDSTONE,
      { opacity: 0.55 },
    );
  }
  // top and left reveals of the hole in deeper shadow
  s.poly(
    [
      [ox - 8, oy - 4],
      [ox + ow + 8, oy - 4],
      [ox + ow + 8, oy + 24],
      [ox - 8, oy + 24],
    ],
    INK,
    { opacity: 0.22 },
  );
  s.poly(
    [
      [ox - 8, oy - 4],
      [ox + 22, oy - 4],
      [ox + 22, oy + oh + 12],
      [ox - 8, oy + oh + 12],
    ],
    INK,
    { opacity: 0.18 },
  );
  // dust and dropped debris on the coursing below the opening
  s.shade(ox - 20, oy + oh + 14, ow + 40, 34, 0.05);
  s.shade(ox + 10, oy + oh + 14, ow - 20, 12, 0.07);
  for (let d = 0; d < 5; d++) {
    const dx = ox + 40 + d * 118 + jit(d, 1, 60),
      dy = oy + oh + 24 + jit(d, 2, 12);
    s.poly(
      [
        [dx, dy + 8],
        [dx + 10, dy],
        [dx + 22, dy + 6],
        [dx + 16, dy + 14],
        [dx + 4, dy + 14],
      ],
      STONE,
      { opacity: 0.8 },
    );
  }

  // ---- pavement ----
  s.pavement(ground, { depth: 70 });
  s.rect(0, ground + 70, s.w, s.h - ground - 70, STONE);
  s.shade(0, ground + 70, s.w, s.h - ground - 70, 0.12);
  for (const fx of [200, 520, 840, 1160, 1480])
    s.line(fx, ground + 6, fx, ground + 70, { opacity: 0.12 });
  s.shade(0, ground, s.w, 14, 0.1); // wall foot shadow
  // ---- ladder leaning against the wall, left of the opening ----
  const foot = [286, ground + 34],
    top = [416, 96],
    gap = 62,
    rail = 9;
  const dx = top[0] - foot[0],
    dy = top[1] - foot[1];
  const len = Math.hypot(dx, dy);
  const ux = dx / len,
    uy = dy / len;
  const railPoly = (offset, shift, fill, opacity) =>
    s.poly(
      [
        [foot[0] + offset + shift, foot[1]],
        [foot[0] + offset + rail + shift, foot[1]],
        [top[0] + offset + rail + shift, top[1] + shift * 0.6],
        [top[0] + offset + shift, top[1] + shift * 0.6],
      ],
      fill,
      { opacity },
    );
  railPoly(0, 14, INK, 0.12); // soft cast shadow, sliding closer to the rails towards the foot
  railPoly(gap, 14, INK, 0.12);
  for (let d = 70; d < len - 40; d += 60) {
    const cx = foot[0] + ux * d,
      cy = foot[1] + uy * d,
      sh = 14 * (d / len) * 0.6 + 4;
    s.poly(
      [
        [cx + rail + 12, cy - 4 + sh],
        [cx + gap + 12, cy - 4 + sh],
        [cx + gap + 12, cy + 4 + sh],
        [cx + rail + 12, cy + 4 + sh],
      ],
      INK,
      { opacity: 0.12 },
    );
  }
  railPoly(0, 0, INK, 1);
  railPoly(gap, 0, INK, 1);
  for (let d = 70; d < len - 40; d += 60) {
    const cx = foot[0] + ux * d,
      cy = foot[1] + uy * d;
    s.poly(
      [
        [cx + rail - 1, cy - 4],
        [cx + gap + 1, cy - 4],
        [cx + gap + 1, cy + 4],
        [cx + rail - 1, cy + 4],
      ],
      INK,
    );
  }

  // ---- two sandstone sample blocks on the flags ----
  const block = (bx, by, bw, bh, bd) => {
    // cast shadow lying on the pavement, thrown to the right
    s.poly(
      [
        [bx + 4, by + bh],
        [bx + bw + bd + 30, by + bh - 10],
        [bx + bw + bd + 44, by + bh + 4],
        [bx + 8, by + bh + 10],
      ],
      INK,
      { opacity: 0.14 },
    );
    s.rect(bx, by, bw, bh, SANDSTONE); // front face
    s.poly(
      [
        [bx, by],
        [bx + bd, by - bd * 0.55],
        [bx + bw + bd, by - bd * 0.55],
        [bx + bw, by],
      ],
      SANDSTONE,
    ); // top
    s.poly(
      [
        [bx, by],
        [bx + bd, by - bd * 0.55],
        [bx + bw + bd, by - bd * 0.55],
        [bx + bw, by],
      ],
      PAPER,
      { opacity: 0.32 },
    );
    s.poly(
      [
        [bx + bw, by],
        [bx + bw + bd, by - bd * 0.55],
        [bx + bw + bd, by + bh - bd * 0.55],
        [bx + bw, by + bh],
      ],
      SANDSTONE,
    ); // right return
    s.poly(
      [
        [bx + bw, by],
        [bx + bw + bd, by - bd * 0.55],
        [bx + bw + bd, by + bh - bd * 0.55],
        [bx + bw, by + bh],
      ],
      INK,
      { opacity: 0.24 },
    );
    // tooled (droved) face: fine horizontal strokes
    s.line(bx + 8, by + bh * 0.5, bx + bw - 8, by + bh * 0.5, { opacity: 0.06 }); // bed line
    s.poly(
      [
        [bx, by + bh - 22],
        [bx + 18, by + bh],
        [bx, by + bh],
      ],
      STONE,
    ); // chipped arris
    s.shade(bx, by + bh - 6, bw, 6, 0.1);
  };
  block(1120, ground - 70, 150, 112, 40);
  block(1330, ground - 32, 110, 78, 32);

  // ---- terracotta bucket ----
  const bx = 900,
    bTop = ground - 106,
    bBot = ground + 44;
  s.poly(
    [
      [bx - 40, bBot],
      [bx + 40, bBot],
      [bx + 96, bBot - 8],
      [bx + 110, bBot + 2],
      [bx + 50, bBot + 10],
      [bx - 44, bBot + 8],
    ],
    INK,
    { opacity: 0.14 },
  );
  s.poly(
    [
      [bx - 62, bTop],
      [bx + 62, bTop],
      [bx + 46, bBot],
      [bx - 46, bBot],
    ],
    TERRACOTTA,
  );
  s.poly(
    [
      [bx + 10, bTop],
      [bx + 62, bTop],
      [bx + 46, bBot],
      [bx + 10, bBot],
    ],
    INK,
    { opacity: 0.18 },
  );
  s.poly(
    [
      [bx - 62, bTop],
      [bx - 34, bTop],
      [bx - 26, bBot],
      [bx - 46, bBot],
    ],
    PAPER,
    { opacity: 0.12 },
  );
  s.rect(bx - 66, bTop - 6, 132, 12, TERRACOTTA); // rim
  s.light(bx - 66, bTop - 6, 132, 5, 0.25);
  s.shade(bx - 66, bTop + 6, 132, 6, 0.2);
  // handle: two straight bars meeting a short top bar
  s.poly(
    [
      [bx - 62, bTop - 2],
      [bx - 56, bTop - 2],
      [bx - 12, bTop - 74],
      [bx - 18, bTop - 78],
    ],
    INK,
  );
  s.poly(
    [
      [bx + 62, bTop - 2],
      [bx + 56, bTop - 2],
      [bx + 12, bTop - 74],
      [bx + 18, bTop - 78],
    ],
    INK,
  );
  s.rect(bx - 18, bTop - 80, 36, 6, INK);

  return s;
}
