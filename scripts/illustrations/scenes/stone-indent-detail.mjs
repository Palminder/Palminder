import { Scene, SANDSTONE, INK, PAPER, STONE, TERRACOTTA, WHITE } from '../toolkit.mjs';

/** Close-up of a sandstone indent repair: one stone cut out of ashlar coursing, a new block half bedded in, tools on the scaffold board below. */
export function stoneIndentDetail() {
  const s = new Scene({
    width: 1200,
    height: 1200,
    title: 'Sandstone indent repair',
    description:
      'Close-up of an ashlar sandstone wall where one weathered stone has been cut out, showing the rubble core behind, with a new indent stone half inserted on a lime bed and a mallet, chisel and trowel resting on a scaffold board below.',
  });
  const W = s.w,
    H = s.h;
  const course = 150,
    stone = 380,
    joint = 8,
    pitch = course + joint;
  // Rows are placed so the pocket stone sits just above centre and the board covers the bottom 18%.
  const rowY0 = 490 - 3 * pitch; // row 3 spans 490–640
  const pocket = { x: 410, y: 490, w: stone, h: course };

  // ---- ashlar coursing (local, so stone positions are known exactly) ----
  s.rect(0, 0, W, H, STONE); // lime joints
  s.shade(0, 0, W, H, 0.06);
  const stones = [];
  for (let r = -1; r < 9; r++) {
    const y = rowY0 + r * pitch;
    if (y > H) break;
    const start = r % 2 ? 22 : -172; // odd rows put a stone at 410–790
    for (let x = start - stone - joint; x < W; x += stone + joint) {
      const sx = Math.max(x, 0),
        ex = Math.min(x + stone, W);
      const sy = Math.max(y, 0),
        ey = Math.min(y + course, H);
      if (ex <= sx || ey <= sy) continue;
      stones.push({ x: sx, y: sy, w: ex - sx, h: ey - sy, r, c: Math.round((x + 400) / 388) });
    }
  }
  for (const st of stones) {
    const isPocket = st.x === pocket.x && st.y === pocket.y;
    s.rect(st.x, st.y, st.w, st.h, SANDSTONE);
    const tone = ((st.r * 5 + st.c * 3 + 20) % 6) * 0.03;
    if (tone) s.shade(st.x, st.y, st.w, st.h, tone);
    if (isPocket) continue;
    // subtle tooled-face arris: light on top/left edge, shade on bottom/right edge
    s.light(st.x, st.y, st.w, 5, 0.35);
    s.light(st.x, st.y, 4, st.h, 0.25);
    s.shade(st.x, st.y + st.h - 6, st.w, 6, 0.14);
    s.shade(st.x + st.w - 5, st.y, 5, st.h, 0.1);
    // weathering: soft tonal patches, varied by row/column so no two neighbours repeat
    const k = (st.r * 7 + st.c * 11 + 40) % 5;
    const cx = st.x + st.w * (0.25 + 0.15 * k),
      cy = st.y + st.h * (0.35 + 0.1 * (k % 3));
    if (k === 0)
      s.poly(
        [
          [cx - 90, cy - 20],
          [cx + 40, cy - 45],
          [cx + 120, cy + 10],
          [cx + 60, cy + 50],
          [cx - 60, cy + 40],
        ],
        INK,
        { opacity: 0.04 },
      );
    if (k === 1)
      s.poly(
        [
          [cx - 60, cy - 40],
          [cx + 80, cy - 30],
          [cx + 110, cy + 30],
          [cx - 20, cy + 45],
          [cx - 90, cy + 5],
        ],
        PAPER,
        { opacity: 0.07 },
      );
    if (k === 2)
      s.poly(
        [
          [cx - 120, cy + 10],
          [cx + 30, cy - 30],
          [cx + 90, cy + 40],
          [cx - 40, cy + 55],
        ],
        INK,
        { opacity: 0.035 },
      );
    if (k === 3)
      s.poly(
        [
          [cx - 40, cy - 30],
          [cx + 60, cy - 50],
          [cx + 130, cy],
          [cx + 10, cy + 40],
        ],
        PAPER,
        { opacity: 0.06 },
      );
    if (k === 4)
      s.poly(
        [
          [cx - 30, cy - 10],
          [cx + 20, cy - 22],
          [cx + 46, cy + 12],
          [cx + 4, cy + 30],
        ],
        INK,
        { opacity: 0.06 },
      );
    // a few small pits along the lower arris
    if (k % 2 === 0)
      for (let i = 0; i < 3; i++)
        s.circle(
          st.x + 60 + i * 110 + k * 20,
          st.y + st.h - 30 - (i % 2) * 20,
          5 + (i % 2) * 2,
          INK,
          { opacity: 0.09 },
        );
  }

  // ---- weathered neighbours with terracotta staining (iron run-off from the bed joints) ----
  const stainA = stones.find((st) => st.r === 2 && st.x < pocket.x + 100 && st.x + st.w > pocket.x); // above-left
  const stainB = stones.find(
    (st) => st.r === 4 && st.x > pocket.x + 100 && st.x < pocket.x + stone + 200,
  ); // below-right
  const stain = (st, side) => {
    if (!st) return;
    const x = side < 0 ? st.x + st.w - 230 : st.x + 40;
    // decayed face: a soft darker patch below the bed joint, with iron run-off bleeding down from it
    s.poly(
      [
        [x - 10, st.y],
        [x + 220, st.y],
        [x + 236, st.y + 70],
        [x + 190, st.y + st.h - 30],
        [x + 60, st.y + st.h - 10],
        [x - 16, st.y + 90],
      ],
      INK,
      { opacity: 0.06 },
    );
    s.poly(
      [
        [x, st.y],
        [x + 210, st.y],
        [x + 200, st.y + 40],
        [x + 120, st.y + 62],
        [x + 30, st.y + 50],
      ],
      TERRACOTTA,
      { opacity: 0.18 },
    );
    // tapered streaks: wide at the joint, thinning out and fading down the face
    const streaks = [
      [4, 22, 96],
      [30, 12, 138],
      [50, 26, 70],
      [86, 16, st.h - 18],
      [108, 8, 104],
      [124, 24, 122],
      [156, 10, 60],
      [174, 20, 112],
      [202, 12, 84],
    ];
    for (const [dx, w, len] of streaks) {
      const L = Math.min(len, st.h);
      // slow taper: full width for the top third, then narrowing to a soft foot
      s.poly(
        [
          [x + dx, st.y],
          [x + dx + w, st.y],
          [x + dx + w * 0.9, st.y + L * 0.35],
          [x + dx + w * 0.7, st.y + L * 0.8],
          [x + dx + w * 0.55, st.y + L],
          [x + dx + w * 0.35, st.y + L * 0.8],
          [x + dx + w * 0.1, st.y + L * 0.35],
        ],
        TERRACOTTA,
        { opacity: 0.16 },
      );
      s.poly(
        [
          [x + dx + w * 0.3, st.y],
          [x + dx + w * 0.7, st.y],
          [x + dx + w * 0.6, st.y + L * 0.55],
          [x + dx + w * 0.4, st.y + L * 0.55],
        ],
        TERRACOTTA,
        { opacity: 0.16 },
      );
    }
    // scaling flakes
    s.poly(
      [
        [x + 70, st.y + 60],
        [x + 130, st.y + 70],
        [x + 116, st.y + 112],
        [x + 60, st.y + 104],
      ],
      INK,
      { opacity: 0.1 },
    );
    s.poly(
      [
        [x + 74, st.y + 60],
        [x + 130, st.y + 70],
        [x + 100, st.y + 76],
      ],
      PAPER,
      { opacity: 0.2 },
    );
    s.poly(
      [
        [x + 140, st.y + 100],
        [x + 176, st.y + 96],
        [x + 170, st.y + 130],
        [x + 132, st.y + 126],
      ],
      INK,
      { opacity: 0.1 },
    );
  };
  stain(stainA, -1);
  stain(stainB, 1);

  // ---- the pocket ----
  const { x: px, y: py, w: pw, h: ph } = pocket;
  s.rect(px, py, pw, ph, STONE);
  s.shade(px, py, pw, ph, 0.4);
  s.shade(px, py, pw, ph, 0.2);
  // rubble core: irregular stone lumps
  const core = [
    [
      [px + 12, py + 24],
      [px + 70, py + 14],
      [px + 92, py + 52],
      [px + 48, py + 70],
      [px + 10, py + 58],
    ],
    [
      [px + 60, py + 74],
      [px + 128, py + 62],
      [px + 150, py + 104],
      [px + 100, py + 130],
      [px + 52, py + 112],
    ],
    [
      [px + 6, py + 88],
      [px + 50, py + 82],
      [px + 58, py + 128],
      [px + 18, py + 142],
    ],
    [
      [px + 96, py + 18],
      [px + 160, py + 22],
      [px + 172, py + 58],
      [px + 132, py + 74],
      [px + 100, py + 56],
    ],
    [
      [px + 140, py + 100],
      [px + 196, py + 92],
      [px + 210, py + 136],
      [px + 160, py + 146],
    ],
    [
      [px + 168, py + 42],
      [px + 222, py + 36],
      [px + 236, py + 86],
      [px + 190, py + 96],
    ],
    [
      [px + 20, py + 6],
      [px + 96, py + 4],
      [px + 88, py + 16],
      [px + 30, py + 20],
    ],
  ];
  for (const [i, pts] of core.entries()) {
    s.poly(pts, STONE);
    s.poly(pts, INK, { opacity: 0.22 + (i % 3) * 0.08 });
    // top-left facet catching a little light
    s.poly([pts[0], pts[1], [(pts[0][0] + pts[2][0]) / 2, (pts[0][1] + pts[2][1]) / 2]], PAPER, {
      opacity: 0.1,
    });
  }
  // dark cavity in the deep core, behind and between the lumps
  s.poly(
    [
      [px + 92, py + 54],
      [px + 132, py + 74],
      [px + 100, py + 58],
      [px + 108, py + 112],
      [px + 64, py + 78],
    ],
    INK,
    { opacity: 0.8 },
  );
  s.poly(
    [
      [px + 170, py + 96],
      [px + 236, py + 86],
      [px + 240, py + 140],
      [px + 212, py + 138],
      [px + 196, py + 92],
    ],
    INK,
    { opacity: 0.82 },
  );
  s.poly(
    [
      [px + 4, py + 60],
      [px + 48, py + 70],
      [px + 50, py + 82],
      [px + 6, py + 88],
    ],
    INK,
    { opacity: 0.7 },
  );
  // pocket returns: top underside deep in shade, left cut face lit, bottom bed lit
  s.shade(px, py, pw, 18, 0.3);
  s.light(px, py, 10, ph, 0.2);
  s.rect(px + 10, py, 3, ph, INK, { opacity: 0.35 });
  s.shade(px, py + ph - 6, pw, 6, 0.2);

  // ---- new indent stone, half inserted from the right ----
  const nx = px + 232,
    nw = pw - 232 + 34,
    ny = py + 6,
    nh = ph - 14; // proud of the face by 34 px, 6 px lime bed below
  // cast shadow of the proud stone onto the neighbour and joint
  s.shade(nx + nw - 34, ny + 8, 44, nh + 6, 0.14);
  s.shade(nx, ny + nh, nw, 12, 0.28);
  s.rect(nx, ny, nw, nh, SANDSTONE);
  s.light(nx, ny, nw, nh, 0.35);
  // its visible end (return face) on the left, in shade — reads as the block's depth
  s.rect(nx, ny, 28, nh, SANDSTONE);
  s.shade(nx, ny, 28, nh, 0.2);
  s.light(nx + 28, ny, nw - 28, 5, 0.4);
  // crisp new arrises
  s.rect(nx + 28, ny, 2, nh, INK, { opacity: 0.25 });
  s.rect(nx, ny + nh - 2, nw, 2, INK, { opacity: 0.18 });
  // fine tooling marks on the new face
  for (let i = 0; i < 9; i++)
    s.line(nx + 52 + i * 14, ny + 14, nx + 46 + i * 14, ny + nh - 14, { opacity: 0.06 });
  // thin paper lime bed under the stone
  s.rect(nx, ny + nh, nw, 5, PAPER);
  s.rect(nx, ny + nh, nw, 5, WHITE, { opacity: 0.6 });
  // squeezed-out lime along the bed edge
  s.poly(
    [
      [nx - 6, ny + nh + 5],
      [nx + 60, ny + nh + 2],
      [nx + 90, ny + nh + 8],
      [nx + 40, ny + nh + 12],
      [nx - 4, ny + nh + 10],
    ],
    PAPER,
    { opacity: 0.85 },
  );

  // ---- scaffold board across the bottom 18%, seen slightly from above ----
  const by = H * 0.82; // 984
  const topH = 70,
    faceH = 48;
  s.shade(0, by - 34, W, 34, 0.14); // shadow cast up the wall behind the board
  s.rect(0, by, W, topH, SANDSTONE); // top face, lit
  s.light(0, by, W, topH, 0.22);
  for (let i = 0; i < 4; i++) s.line(0, by + 14 + i * 15, W, by + 14 + i * 15, { opacity: 0.06 });
  s.rect(0, by + topH, W, faceH, SANDSTONE); // front edge in shade
  s.shade(0, by + topH, W, faceH, 0.28);
  s.line(0, by + topH + 18, W, by + topH + 18, { opacity: 0.1 });
  s.line(0, by + topH + 34, W, by + topH + 34, { opacity: 0.1 });
  s.rect(0, by + topH, W, 3, INK, { opacity: 0.25 });
  // steel end bands
  for (const bx of [46, 1130]) {
    s.rect(bx, by, 22, topH + faceH, INK, { opacity: 0.6 });
    s.rect(bx, by, 22, topH, PAPER, { opacity: 0.12 });
    s.rect(bx + 8, by + 24, 6, 6, PAPER, { opacity: 0.4 });
    s.rect(bx + 8, by + topH + 20, 6, 6, PAPER, { opacity: 0.4 });
  }
  // knot on the top face
  s.circle(880, by + 42, 12, INK, { opacity: 0.14 });
  s.circle(882, by + 42, 5, INK, { opacity: 0.22 });
  // below the board: dark void with a scaffold tube and a second board edge
  const uy = by + topH + faceH; // 1102
  s.rect(0, uy, W, H - uy, INK, { opacity: 0.72 });
  s.rect(0, uy, W, 12, INK, { opacity: 0.4 });
  s.rect(0, uy + 24, W, 34, STONE); // tube
  s.shade(0, uy + 24, W, 34, 0.32);
  s.rect(0, uy + 30, W, 8, PAPER, { opacity: 0.35 });
  s.shade(0, uy + 46, W, 12, 0.35);
  s.rect(0, uy + 72, W, H - uy - 72, SANDSTONE, { opacity: 0.35 }); // lower board catching a little light
  s.shade(0, uy + 72, W, 5, 0.4);

  // ---- tools resting on the top face of the board ----
  const ty = by + 12; // where objects sit
  // mallet: beech head lying on its side, handle towards the left
  s.shade(120, ty + 34, 330, 22, 0.16);
  s.rect(140, ty + 18, 200, 16, INK); // handle
  s.rect(140, ty + 18, 200, 4, PAPER, { opacity: 0.22 });
  s.rect(140, ty + 30, 200, 3, INK, { opacity: 0.6 });
  s.rect(126, ty + 14, 18, 24, INK); // handle end knob
  s.rect(330, ty - 44, 130, 96, SANDSTONE); // head
  s.light(330, ty - 44, 130, 96, 0.15);
  s.rect(330, ty - 44, 130, 8, PAPER, { opacity: 0.4 }); // top arris
  s.shade(330, ty + 26, 130, 26, 0.2); // underside
  s.shade(446, ty - 44, 14, 96, 0.14); // end grain return
  s.rect(330, ty - 44, 12, 96, PAPER, { opacity: 0.18 });
  for (let i = 0; i < 4; i++)
    s.line(342, ty - 30 + i * 20, 446, ty - 30 + i * 20, { opacity: 0.08 });
  s.circle(395, ty + 4, 9, INK, { opacity: 0.35 }); // handle socket showing through
  // chisel: thin ink bar, mushroomed head at left, bright edge at right
  s.shade(500, ty + 30, 300, 12, 0.16);
  s.rect(506, ty + 8, 270, 20, INK);
  s.rect(506, ty + 8, 270, 5, PAPER, { opacity: 0.25 });
  s.poly(
    [
      [776, ty + 8],
      [830, ty + 13],
      [830, ty + 23],
      [776, ty + 28],
    ],
    STONE,
  ); // cutting edge
  s.light(776, ty + 8, 54, 8, 0.45);
  s.rect(484, ty + 2, 26, 32, INK); // burred head
  s.rect(484, ty + 2, 26, 6, PAPER, { opacity: 0.18 });
  s.rect(484, ty + 30, 26, 4, INK, { opacity: 0.5 });
  // small pointing trowel, blade to the left, handle rising to the right
  s.shade(860, ty + 30, 280, 14, 0.16);
  s.poly(
    [
      [840, ty + 14],
      [930, ty - 6],
      [1040, ty - 6],
      [1040, ty + 34],
      [930, ty + 34],
    ],
    STONE,
  ); // pointing blade, tip to the left
  s.poly(
    [
      [840, ty + 14],
      [930, ty - 6],
      [1040, ty - 6],
      [1040, ty + 14],
    ],
    PAPER,
    { opacity: 0.4 },
  );
  s.poly(
    [
      [840, ty + 14],
      [1040, ty + 14],
      [1040, ty + 34],
      [930, ty + 34],
    ],
    INK,
    { opacity: 0.08 },
  );
  s.rect(1036, ty - 6, 4, 40, INK, { opacity: 0.25 });
  s.rect(980, ty - 30, 12, 34, INK, { opacity: 0.9 }); // shank
  s.rect(1000, ty - 40, 130, 24, INK); // handle
  s.rect(1000, ty - 40, 130, 6, PAPER, { opacity: 0.22 });
  s.rect(984, ty - 42, 22, 28, SANDSTONE); // ferrule
  s.shade(984, ty - 42, 22, 28, 0.1);
  s.rect(1124, ty - 44, 10, 32, INK, { opacity: 0.8 }); // handle end
  // stone dust and chips on the board
  const chips = [
    [90, 8],
    [470, 12],
    [560, 6],
    [840, 10],
    [1090, 10],
    [1150, 6],
    [250, 5],
    [640, 7],
    [740, 5],
  ];
  for (const [cx, r] of chips) {
    s.poly(
      [
        [cx, ty + 40],
        [cx + r * 2, ty + 36],
        [cx + r * 3.2, ty + 43],
        [cx + r, ty + 46],
      ],
      SANDSTONE,
    );
    s.poly(
      [
        [cx, ty + 40],
        [cx + r * 2, ty + 36],
        [cx + r * 1.6, ty + 41],
      ],
      PAPER,
      { opacity: 0.4 },
    );
    s.shade(cx + 2, ty + 46, r * 3, 3, 0.15);
  }
  s.rect(180, ty + 44, 300, 5, PAPER, { opacity: 0.3 }); // dust drift
  s.rect(560, ty + 46, 220, 4, PAPER, { opacity: 0.25 });
  s.rect(1000, ty + 44, 160, 5, PAPER, { opacity: 0.25 });

  // a little lime dust and chippings on the bed joint below the pocket, from cutting out
  s.rect(px - 10, py + ph, pw + 20, joint, PAPER, { opacity: 0.35 });
  for (let i = 0; i < 5; i++)
    s.poly(
      [
        [px + 20 + i * 70, py + ph + 8],
        [px + 40 + i * 70, py + ph],
        [px + 58 + i * 70, py + ph + 8],
      ],
      STONE,
    );
  return s;
}
