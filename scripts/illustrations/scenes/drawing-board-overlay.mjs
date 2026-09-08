import { Scene, PAPER, INK, SANDSTONE, STONE, TERRACOTTA, MOSS, WHITE } from '../toolkit.mjs';

/** A drafting table from above: a rotated A1 plan of a tenement flat with a tracing-paper overlay of proposed works, scale rule, pencil and mug. */
export function drawingBoardOverlay() {
  const s = new Scene({
    width: 1600,
    height: 1200,
    title: 'Drawing board overlay',
    description:
      'A drafting table seen from above with a large sheet showing a tenement flat plan in ink lines, a translucent tracing sheet marking a proposed opening and extension in green, a scale rule, a pencil and a mug.',
  });

  // ---- local helpers: rotate local sheet coordinates about a centre ----
  const rot = (cx, cy, deg) => {
    const a = (deg * Math.PI) / 180,
      c = Math.cos(a),
      sn = Math.sin(a);
    return (x, y) => [cx + x * c - y * sn, cy + x * sn + y * c];
  };
  const polyT = (T, pts, fill, opts) =>
    s.poly(
      pts.map((p) => T(p[0], p[1])),
      fill,
      opts,
    );
  const lineT = (T, x1, y1, x2, y2, opts) => {
    const a = T(x1, y1),
      b = T(x2, y2);
    return s.line(a[0], a[1], b[0], b[1], opts);
  };
  /** Wall as a pair of parallel lines, thickness t, in local coords. */
  const wall = (T, x1, y1, x2, y2, t, opts) => {
    const dx = x2 - x1,
      dy = y2 - y1,
      L = Math.hypot(dx, dy) || 1;
    const nx = (-dy / L) * (t / 2),
      ny = (dx / L) * (t / 2);
    lineT(T, x1 + nx, y1 + ny, x2 + nx, y2 + ny, opts);
    lineT(T, x1 - nx, y1 - ny, x2 - nx, y2 - ny, opts);
    // closed ends
    lineT(T, x1 + nx, y1 + ny, x1 - nx, y1 - ny, opts);
    lineT(T, x2 + nx, y2 + ny, x2 - nx, y2 - ny, opts);
  };
  /** Door swing: leaf line plus a quarter arc of 6 segments. hinge at (hx,hy), leaf along angle a0 (deg), swinging to a0+90*dir. */
  const door = (T, hx, hy, r, a0, dir, opts) => {
    const rad = (d) => (d * Math.PI) / 180;
    lineT(T, hx, hy, hx + r * Math.cos(rad(a0)), hy + r * Math.sin(rad(a0)), opts);
    let px = hx + r * Math.cos(rad(a0)),
      py = hy + r * Math.sin(rad(a0));
    for (let i = 1; i <= 6; i++) {
      const a = rad(a0 + dir * 15 * i);
      const qx = hx + r * Math.cos(a),
        qy = hy + r * Math.sin(a);
      lineT(T, px, py, qx, qy, { ...opts, weight: (opts.weight || 1) * 0.8 });
      px = qx;
      py = qy;
    }
  };

  // ---- table surface ----
  s.rect(0, 0, s.w, s.h, PAPER);
  s.rect(0, 0, s.w, s.h, INK, { opacity: 0.9 });
  // faint table-edge rail along the bottom
  s.rect(0, s.h - 34, s.w, 34, STONE, { opacity: 0.12 });
  s.rect(0, s.h - 34, s.w, 3, PAPER, { opacity: 0.18 });

  // ---- A1 sheet: 841 x 594 proportion, rotated 6 degrees ----
  const SW = 1180,
    SH = 834;
  const T0 = rot(770, 590, 6);
  const T = (x, y) => T0(x, y - 52); // plan frame: sheet frame shifted up so the extension fits below the rear wall
  const sheet = [
    [-SW / 2, -SH / 2],
    [SW / 2, -SH / 2],
    [SW / 2, SH / 2],
    [-SW / 2, SH / 2],
  ];
  // drop shadow (offset down-right)
  s.poly(
    sheet.map((p) => {
      const q = T0(p[0], p[1]);
      return [q[0] + 14, q[1] + 18];
    }),
    INK,
    { opacity: 0.55 },
  );
  polyT(T0, sheet, PAPER);
  // masking tape at two corners
  const tape = (x, y) =>
    polyT(
      T0,
      [
        [x - 40, y - 14],
        [x + 40, y - 14],
        [x + 40, y + 14],
        [x - 40, y + 14],
      ],
      SANDSTONE,
      { opacity: 0.75 },
    );
  tape(-SW / 2 + 70, -SH / 2 + 4);
  tape(SW / 2 - 70, SH / 2 - 4);

  // ---- plan of a tenement flat (local coords; long hallway with rooms off it) ----
  const ink = { weight: 1.6, opacity: 0.85 };
  const thin = { weight: 1, opacity: 0.55 };
  const EXT = 14,
    INT = 7;
  // footprint: x -470..430, y -260..300; hallway y -30..30 running x -410..300
  // outer envelope, with a bay to the street (top) on the parlour
  wall(T, -470, -260, -180, -260, EXT, ink); // front wall, parlour section
  wall(T, -180, -260, 430, -260, EXT, ink); // front wall continued
  wall(T, -470, -260, -470, 300, EXT, ink); // left gable
  wall(T, 430, -260, 430, 300, EXT, ink); // right (close) wall
  wall(T, -470, 300, 430, 300, EXT, ink); // rear wall
  // bay window on the parlour, projecting above the front wall
  wall(T, -420, -260, -390, -320, EXT, ink);
  wall(T, -390, -320, -230, -320, EXT, ink);
  wall(T, -230, -320, -200, -260, EXT, ink);
  // window glazing lines inside the bay and on the other front rooms
  lineT(T, -385, -300, -235, -300, thin);
  lineT(T, -410, -262, -380, -318, thin);
  lineT(T, -240, -318, -210, -262, thin);
  const win = (x1, x2, y) => {
    lineT(T, x1, y - 4, x2, y - 4, thin);
    lineT(T, x1, y + 4, x2, y + 4, thin);
    lineT(T, x1, y - 8, x1, y + 8, thin);
    lineT(T, x2, y - 8, x2, y + 8, thin);
  };
  win(-100, 10, -260);
  win(120, 230, -260);
  win(-400, -290, 300);
  win(-90, 20, 300);
  win(140, 260, 300);

  // hallway walls (y = -30 top side, y = 30 bottom side), leaving door gaps
  // top hall wall, x -410..300 with doors to parlour (-360..-290), bedroom (-60..10) and kitchen (170..240)
  wall(T, -410, -30, -360, -30, INT, ink);
  wall(T, -290, -30, -60, -30, INT, ink);
  wall(T, 10, -30, 170, -30, INT, ink);
  wall(T, 240, -30, 300, -30, INT, ink);
  // bottom hall wall with doors to rear bedroom (-380..-310), bathroom (-190..-140), bedroom (-30..40)
  wall(T, -410, 30, -380, 30, INT, ink);
  wall(T, -310, 30, -190, 30, INT, ink);
  wall(T, -140, 30, -30, 30, INT, ink);
  wall(T, 40, 30, 300, 30, INT, ink);
  // hall ends: flat entrance at the close (right), a cupboard at the left end
  wall(T, -410, -30, -410, 30, INT, ink);
  wall(T, -410, -30, -470, -30, INT, ink);
  wall(T, -410, 30, -470, 30, INT, ink);
  wall(T, 300, -30, 300, -6, INT, ink); // entrance door opening in the hall end
  wall(T, 300, 54, 300, 30, INT, ink);
  // room partitions off the hallway (front rooms)
  wall(T, -180, -260, -180, -30, INT, ink); // parlour / front bedroom
  wall(T, 90, -260, 90, -30, INT, ink); // front bedroom / kitchen
  // rear rooms
  wall(T, -230, 30, -230, 300, INT, ink); // rear bedroom / bathroom
  wall(T, -100, 30, -100, 300, INT, ink); // bathroom / rear bedroom
  wall(T, 90, 30, 90, 300, INT, ink); // rear bedroom / scullery
  // close: stair and landing on the right of the flat's entrance wall
  wall(T, 300, -260, 300, -30, INT, ink);
  wall(T, 300, 54, 300, 300, INT, ink);
  // stair as parallel treads between x 320..410, rising along y
  for (let i = 0; i < 12; i++) lineT(T, 320, 80 + i * 18, 410, 80 + i * 18, thin);
  lineT(T, 365, 80, 365, 278, thin); // centre string line
  // upper landing lines
  lineT(T, 320, -180, 410, -180, thin);
  lineT(T, 320, -120, 410, -120, thin);

  // doors: leaf from hinge with a quarter arc
  door(T, -290, -30, 70, 180, -1, thin); // parlour, swings into parlour
  door(T, -60, -30, 70, 180, -1, thin); // front bedroom
  door(T, 170, -30, 70, 0, -1, thin); // kitchen
  door(T, -380, 30, 70, 0, 1, thin); // rear bedroom
  door(T, -140, 30, 50, 180, 1, thin); // bathroom
  door(T, 40, 30, 70, 180, 1, thin); // rear bedroom right
  door(T, 300, -6, 60, 180, 1, thin); // flat entrance door opening into hall

  // fixtures in ink: bath, wc, kitchen range, press cupboards
  lineT(T, -215, 120, -215, 280, thin);
  lineT(T, -165, 120, -165, 280, thin);
  lineT(T, -215, 120, -165, 120, thin);
  lineT(T, -215, 280, -165, 280, thin); // bath
  lineT(T, -150, 60, -110, 60, thin);
  lineT(T, -150, 60, -150, 100, thin);
  lineT(T, -110, 60, -110, 100, thin);
  lineT(T, -150, 100, -110, 100, thin); // wc
  lineT(T, 100, -250, 290, -250, thin);
  lineT(T, 100, -200, 290, -200, thin); // kitchen worktop
  lineT(T, 100, -200, 100, -250, thin);
  lineT(T, 290, -200, 290, -250, thin);
  lineT(T, -460, -250, -460, -60, thin);
  lineT(T, -440, -250, -440, -60, thin); // bed recess press

  // title block corner: a plain rectangle frame only (no text)
  lineT(T0, SW / 2 - 230, SH / 2 - 130, SW / 2 - 40, SH / 2 - 130, thin);
  lineT(T0, SW / 2 - 230, SH / 2 - 130, SW / 2 - 230, SH / 2 - 40, thin);
  lineT(T0, SW / 2 - 230, SH / 2 - 40, SW / 2 - 40, SH / 2 - 40, thin);
  lineT(T0, SW / 2 - 40, SH / 2 - 130, SW / 2 - 40, SH / 2 - 40, thin);
  lineT(T0, SW / 2 - 230, SH / 2 - 85, SW / 2 - 40, SH / 2 - 85, thin);
  // border line of the sheet
  const B = 24;
  lineT(T0, -SW / 2 + B, -SH / 2 + B, SW / 2 - B, -SH / 2 + B, thin);
  lineT(T0, -SW / 2 + B, SH / 2 - B, SW / 2 - B, SH / 2 - B, thin);
  lineT(T0, -SW / 2 + B, -SH / 2 + B, -SW / 2 + B, SH / 2 - B, thin);
  lineT(T0, SW / 2 - B, -SH / 2 + B, SW / 2 - B, SH / 2 - B, thin);

  // ---- tracing-paper overlay: laid over the rear-right of the plan at a slightly different angle ----
  const T2 = rot(990, 665, 2.5);
  const TW = 780,
    TH = 700;
  const trace = [
    [-TW / 2, -TH / 2],
    [TW / 2, -TH / 2],
    [TW / 2, TH / 2],
    [-TW / 2, TH / 2],
  ];
  s.poly(
    trace.map((p) => {
      const q = T2(p[0], p[1]);
      return [q[0] + 6, q[1] + 8];
    }),
    INK,
    { opacity: 0.3 },
  );
  polyT(T2, trace, PAPER, { opacity: 0.55 });
  // a soft curl at the top-left corner of the trace
  polyT(
    T2,
    [
      [-TW / 2, -TH / 2],
      [-TW / 2 + 90, -TH / 2],
      [-TW / 2, -TH / 2 + 70],
    ],
    WHITE,
    { opacity: 0.35 },
  );
  lineT(T2, -TW / 2 + 90, -TH / 2, -TW / 2, -TH / 2 + 70, { weight: 1, opacity: 0.25 });

  // proposal in moss, drawn in the PLAN's coordinate frame so it registers with the plan below
  const moss = { weight: 3, color: MOSS, opacity: 0.95 };
  // new opening between rear bedroom and scullery (wall at x 90, y 30..300): mark the removed section and new lintel
  lineT(T, 84, 110, 84, 250, moss);
  lineT(T, 96, 110, 96, 250, moss);
  lineT(T, 70, 110, 110, 110, moss);
  lineT(T, 70, 250, 110, 250, moss);
  // cross hatch through the wall to be removed
  for (let i = 0; i < 7; i++) lineT(T, 78, 120 + i * 18, 102, 132 + i * 18, { ...moss, weight: 2 });
  // proposed rear extension beyond the rear wall (y 300), x -90..300
  lineT(T, -90, 300, -90, 436, moss);
  lineT(T, 300, 300, 300, 436, moss);
  lineT(T, -90, 436, 300, 436, moss);
  lineT(T, -76, 314, -76, 422, moss);
  lineT(T, 286, 314, 286, 422, moss);
  lineT(T, -76, 422, 286, 422, moss);
  // new wide opening in the rear wall into the extension (x 0..250 of the rear wall)
  lineT(T, 0, 290, 0, 310, moss);
  lineT(T, 250, 290, 250, 310, moss);
  lineT(T, 0, 320, 250, 320, moss);
  // rooflight and glazing lines in the extension
  lineT(T, -60, 422, -60, 330, { ...moss, weight: 2 });
  lineT(T, 40, 345, 200, 345, { ...moss, weight: 2 });
  lineT(T, 40, 400, 200, 400, { ...moss, weight: 2 });
  lineT(T, 40, 345, 40, 400, { ...moss, weight: 2 });
  lineT(T, 200, 345, 200, 400, { ...moss, weight: 2 });
  // glazed door in the extension's rear wall, swinging inward
  door(T, 250, 429, 56, 180, 1, { ...moss, weight: 2 });

  // ---- scale rule: long sandstone bar with ink ticks, lower-left, angled ----
  const R = rot(330, 1010, -22);
  const RW = 700,
    RH = 40;
  s.poly(
    [
      [-RW / 2, -RH / 2],
      [RW / 2, -RH / 2],
      [RW / 2, RH / 2],
      [-RW / 2, RH / 2],
    ].map((p) => {
      const q = R(p[0], p[1]);
      return [q[0] + 8, q[1] + 10];
    }),
    INK,
    { opacity: 0.55 },
  );
  polyT(
    R,
    [
      [-RW / 2, -RH / 2],
      [RW / 2, -RH / 2],
      [RW / 2, RH / 2],
      [-RW / 2, RH / 2],
    ],
    SANDSTONE,
  );
  polyT(
    R,
    [
      [-RW / 2, 6],
      [RW / 2, 6],
      [RW / 2, RH / 2],
      [-RW / 2, RH / 2],
    ],
    INK,
    { opacity: 0.12 },
  ); // bevel
  for (let i = 0; i <= 60; i++) {
    const x = -RW / 2 + 20 + i * 11;
    const h = i % 10 === 0 ? 16 : i % 5 === 0 ? 11 : 6;
    lineT(R, x, -RH / 2, x, -RH / 2 + h, { weight: 1.2, opacity: 0.8 });
  }
  lineT(R, -RW / 2 + 20, -RH / 2 + 17, RW / 2 - 20, -RH / 2 + 17, { weight: 1, opacity: 0.5 });

  // ---- pencil: thin moss polygon with a sandstone sharpened tip and ink point, upper right ----
  const P = rot(1240, 235, 28);
  const PL = 360,
    PW = 16;
  s.poly(
    [
      [-PL / 2, -PW / 2],
      [PL / 2 - 40, -PW / 2],
      [PL / 2 - 40, PW / 2],
      [-PL / 2, PW / 2],
    ].map((p) => {
      const q = P(p[0], p[1]);
      return [q[0] + 6, q[1] + 8];
    }),
    INK,
    { opacity: 0.55 },
  );
  polyT(
    P,
    [
      [-PL / 2, -PW / 2],
      [PL / 2 - 40, -PW / 2],
      [PL / 2 - 40, PW / 2],
      [-PL / 2, PW / 2],
    ],
    MOSS,
  );
  polyT(
    P,
    [
      [-PL / 2, -PW / 2],
      [PL / 2 - 40, -PW / 2],
      [PL / 2 - 40, -PW / 6],
      [-PL / 2, -PW / 6],
    ],
    PAPER,
    { opacity: 0.22 },
  ); // facet highlight
  polyT(
    P,
    [
      [-PL / 2, PW / 6],
      [PL / 2 - 40, PW / 6],
      [PL / 2 - 40, PW / 2],
      [-PL / 2, PW / 2],
    ],
    INK,
    { opacity: 0.3 },
  ); // lower facet
  polyT(
    P,
    [
      [PL / 2 - 40, -PW / 2],
      [PL / 2, 0],
      [PL / 2 - 40, PW / 2],
    ],
    SANDSTONE,
  ); // sharpened cone
  polyT(
    P,
    [
      [PL / 2 - 12, -PW / 6],
      [PL / 2, 0],
      [PL / 2 - 12, PW / 6],
    ],
    INK,
  ); // graphite point
  polyT(
    P,
    [
      [-PL / 2, -PW / 2],
      [-PL / 2 + 28, -PW / 2],
      [-PL / 2 + 28, PW / 2],
      [-PL / 2, PW / 2],
    ],
    STONE,
  ); // ferrule
  polyT(
    P,
    [
      [-PL / 2 - 18, -PW / 2 + 1],
      [-PL / 2, -PW / 2 + 1],
      [-PL / 2, PW / 2 - 1],
      [-PL / 2 - 18, PW / 2 - 1],
    ],
    TERRACOTTA,
  ); // eraser

  // ---- mug from above: two circles, with a handle and a shadow, lower right on the table ----
  const mx = 1440,
    my = 990,
    mr = 84;
  s.circle(mx + 12, my + 16, mr + 4, INK, { opacity: 0.6 });
  // handle
  s.circle(mx + mr + 26, my - 10, 40, STONE);
  s.circle(mx + mr + 26, my - 10, 24, INK, { opacity: 0.9 });
  s.circle(mx, my, mr, STONE);
  s.circle(mx, my, mr - 12, TERRACOTTA);
  s.circle(mx, my, mr - 12, INK, { opacity: 0.6 }); // coffee
  s.circle(mx - 22, my - 26, 14, PAPER, { opacity: 0.16 }); // reflection

  // ---- lamp light fall across the whole board and a shadow at the bottom edge ----
  s.shade(0, s.h - 120, s.w, 120, 0.12);
  return s;
}
