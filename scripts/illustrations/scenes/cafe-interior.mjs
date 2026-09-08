import { Scene, SANDSTONE, INK, PAPER, STONE, TERRACOTTA, MOSS, WHITE } from '../toolkit.mjs';

/** Inside a corner café on the ground floor of a tenement, square-on to the three tall street windows. */
export function cafeInterior() {
  const s = new Scene({
    width: 1600,
    height: 1200,
    title: 'Corner café interior',
    description:
      'The inside of a corner café in the ground floor of a tenement, seen square-on to three tall street windows, with a fixed sandstone bench under the windows, three small round tables with stools, a glazed timber screen to the kitchen on the right, a stone tiled floor and three pendant lights.',
  });

  // ---- one-point perspective set-up ----
  // The window wall is drawn flat at "depth 0"; everything nearer the viewer is scaled about the
  // vanishing point by D / (D - depth), with D the viewer's distance from the wall in metres.
  const VP = { x: 700, y: 520 },
    D = 7;
  const u = 183; // px per metre on the far wall
  const k = (d) => D / (D - d);
  const px = (x, d) => VP.x + (x - VP.x) * k(d);
  const py = (y, d) => VP.y + (y - VP.y) * k(d);
  const P = (x, y, d) => [px(x, d), py(y, d)];
  const WL = 200,
    WR = 1240,
    CEIL = 140,
    FLOOR = 800; // far wall extents (wall coordinates)
  const yAt = (h) => FLOOR - h * u; // wall-coordinate y for a height in metres above the floor
  const ellipse = (cx, cy, rx, ry, fill, opts) => {
    const pts = [];
    for (let i = 0; i < 40; i++) {
      const a = (i / 40) * Math.PI * 2;
      pts.push([cx + Math.cos(a) * rx, cy + Math.sin(a) * ry]);
    }
    return s.poly(pts, fill, opts);
  };

  // ---- ceiling ----
  s.rect(0, 0, s.w, s.h, PAPER);
  s.poly([P(WL, CEIL, 0), P(WR, CEIL, 0), P(WR, CEIL, 3.2), P(WL, CEIL, 3.2)], PAPER);
  s.poly([P(WL, CEIL, 0), P(WR, CEIL, 0), P(WR, CEIL, 3.2), P(WL, CEIL, 3.2)], STONE, {
    opacity: 0.12,
  });
  // ceiling darkens slightly towards the far wall
  for (let i = 0; i < 4; i++)
    s.poly(
      [
        P(WL, CEIL, i * 0.25),
        P(WR, CEIL, i * 0.25),
        P(WR, CEIL, i * 0.25 + 0.25),
        P(WL, CEIL, i * 0.25 + 0.25),
      ],
      INK,
      { opacity: 0.03 * (4 - i) },
    );

  // ---- floor: stone tiles with a faint grid ----
  s.poly([P(WL, FLOOR, 0), P(WR, FLOOR, 0), P(WR, FLOOR, 4.4), P(WL, FLOOR, 4.4)], STONE);
  s.poly([P(WL, FLOOR, 0), P(WR, FLOOR, 0), P(WR, FLOOR, 4.4), P(WL, FLOOR, 4.4)], INK, {
    opacity: 0.05,
  });
  const tile = 0.65;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 7; j++) {
      if ((i + j) % 2) continue;
      const x0 = WL + (i * (WR - WL)) / 8,
        x1 = x0 + (WR - WL) / 8,
        d0 = j * tile,
        d1 = d0 + tile;
      s.poly([P(x0, FLOOR, d0), P(x1, FLOOR, d0), P(x1, FLOOR, d1), P(x0, FLOOR, d1)], INK, {
        opacity: 0.035,
      });
    }
  }
  for (let i = 0; i <= 8; i++) {
    const x = WL + (i * (WR - WL)) / 8;
    const a = P(x, FLOOR, 0),
      b = P(x, FLOOR, 4.4);
    s.line(a[0], a[1], b[0], b[1], { opacity: 0.16, weight: 1.5 });
  }
  for (let d = tile; d < 4.4; d += tile) {
    const a = P(WL, FLOOR, d),
      b = P(WR, FLOOR, d);
    s.line(a[0], a[1], b[0], b[1], { opacity: 0.16, weight: 1.5 });
  }
  // light from the windows pooling on the floor
  for (let i = 0; i < 3; i++) {
    const x0 = WL + 95 + i * 315,
      x1 = x0 + 220;
    s.poly(
      [P(x0, FLOOR, 0.5), P(x1, FLOOR, 0.5), P(x1 + 40, FLOOR, 2.4), P(x0 - 40, FLOOR, 2.4)],
      PAPER,
      { opacity: 0.16 },
    );
  }

  // ---- left flank wall: plain plaster, in shade ----
  s.poly([P(WL, CEIL, 0), P(WL, FLOOR, 0), P(WL, FLOOR, 3.2), P(WL, CEIL, 3.2)], PAPER);
  s.poly([P(WL, CEIL, 0), P(WL, FLOOR, 0), P(WL, FLOOR, 3.2), P(WL, CEIL, 3.2)], INK, {
    opacity: 0.1,
  });
  // a picture rail and dado line along it
  for (const h of [2.4, 1.0]) {
    const a = P(WL, yAt(h), 0),
      b = P(WL, yAt(h), 3.2);
    s.line(a[0], a[1], b[0], b[1], { opacity: 0.2, weight: 3 });
  }

  // two framed prints hung on the left wall, and a timber coat rail below the picture rail
  const frameOn = (h0, h1, d0, d1) => {
    s.poly([P(WL, yAt(h1), d0), P(WL, yAt(h1), d1), P(WL, yAt(h0), d1), P(WL, yAt(h0), d0)], INK, {
      opacity: 0.8,
    });
    const inset = 0.05;
    s.poly(
      [
        P(WL, yAt(h1 - inset), d0 + inset),
        P(WL, yAt(h1 - inset), d1 - inset),
        P(WL, yAt(h0 + inset), d1 - inset),
        P(WL, yAt(h0 + inset), d0 + inset),
      ],
      PAPER,
    );
    s.poly(
      [
        P(WL, yAt(h1 - inset), d0 + inset),
        P(WL, yAt(h1 - inset), d1 - inset),
        P(WL, yAt(h0 + inset), d1 - inset),
        P(WL, yAt(h0 + inset), d0 + inset),
      ],
      SANDSTONE,
      { opacity: 0.6 },
    );
    s.poly(
      [
        P(WL, yAt(h1 - 0.5 * (h1 - h0)), d0 + inset),
        P(WL, yAt(h1 - 0.5 * (h1 - h0)), d1 - inset),
        P(WL, yAt(h0 + inset), d1 - inset),
        P(WL, yAt(h0 + inset), d0 + inset),
      ],
      MOSS,
      { opacity: 0.35 },
    );
  };
  frameOn(1.35, 2.05, 0.35, 0.95);
  frameOn(1.35, 2.15, 1.3, 2.1);
  const crA = P(WL, yAt(1.15), 0.2),
    crB = P(WL, yAt(1.15), 2.6);
  s.line(crA[0], crA[1], crB[0], crB[1], { opacity: 0.35, weight: 4 });
  for (const d of [0.4, 0.8, 1.2, 1.6, 2.0, 2.4]) {
    const q = P(WL, yAt(1.15), d);
    s.circle(q[0], q[1] + 8 * k(d), 3.5 * k(d), INK, { opacity: 0.6 });
  }

  // ---- window wall: plaster ----
  s.rect(WL, CEIL, WR - WL, FLOOR - CEIL, PAPER);
  s.light(WL, CEIL, WR - WL, FLOOR - CEIL, 0.3);
  s.shade(WL, yAt(1.0), WR - WL, FLOOR - yAt(1.0), 0.05); // slightly darker below dado
  s.line(WL, yAt(2.4), WR, yAt(2.4), { opacity: 0.16, weight: 3 }); // picture rail

  // ---- cornice: far wall and both flank walls ----
  const cornH = 0.17 * u;
  s.rect(WL, CEIL, WR - WL, cornH, PAPER);
  s.light(WL, CEIL, WR - WL, cornH, 0.5);
  s.shade(WL, CEIL + cornH * 0.45, WR - WL, cornH * 0.2, 0.1);
  s.shade(WL, CEIL + cornH, WR - WL, 8, 0.12);
  s.line(WL, CEIL + cornH, WR, CEIL + cornH, { opacity: 0.25 });
  for (const wx of [WL, WR]) {
    s.poly(
      [P(wx, CEIL, 0), P(wx, CEIL + cornH, 0), P(wx, CEIL + cornH, 3.2), P(wx, CEIL, 3.2)],
      PAPER,
    );
    s.poly(
      [P(wx, CEIL, 0), P(wx, CEIL + cornH, 0), P(wx, CEIL + cornH, 3.2), P(wx, CEIL, 3.2)],
      INK,
      { opacity: wx === WL ? 0.06 : 0.03 },
    );
    const a = P(wx, CEIL + cornH, 0),
      b = P(wx, CEIL + cornH, 3.2);
    s.line(a[0], a[1], b[0], b[1], { opacity: 0.25 });
  }

  // ---- three tall street windows ----
  const winW = 220,
    winY0 = yAt(3.3),
    winY1 = yAt(0.95),
    frame = 10,
    reveal = 18;
  const winXs = [WL + 95, WL + 95 + 315, WL + 95 + 630];
  for (const wx of winXs) {
    const wh = winY1 - winY0;
    // deep reveal of the tenement wall: shade on the left return, light on the right
    s.shade(wx - reveal, winY0 - reveal, winW + reveal * 2, wh + reveal, 0.1);
    s.shade(wx - reveal, winY0 - reveal, reveal, wh + reveal, 0.16);
    s.shade(wx - reveal, winY0 - reveal, winW + reveal * 2, reveal, 0.12);
    s.light(wx + winW, winY0 - reveal, reveal, wh + reveal, 0.22);
    // street beyond: paper sky, the sandstone tenement opposite, pavement at the foot
    s.rect(wx, winY0, winW, wh, WHITE);
    const fy = winY0 + wh * 0.3;
    s.rect(wx, fy, winW, wh * 0.62, SANDSTONE);
    s.rect(wx, fy, winW, 10, WHITE, { opacity: 0.6 }); // eaves cornice catching the sky
    for (let r = 0; r < 2; r++)
      for (let i = 0; i < 3; i++)
        s.rect(wx + 24 + i * 66, fy + 34 + r * 110, 40, 66, WHITE, { opacity: 0.55 });
    s.rect(wx, winY0 + wh * 0.92, winW, wh * 0.08, STONE);
    s.rect(wx, winY0 + wh * 0.92, winW, 5, WHITE, { opacity: 0.5 });
    // glass
    s.rect(wx, winY0, winW, wh, INK, { opacity: 0.82 });
    s.light(wx + 4, winY0 + 4, winW - 8, wh * 0.28, 0.12);
    s.light(wx + winW * 0.62, winY0 + 4, winW * 0.3, wh * 0.9, 0.05);
    // paper frame: outer, transom and mullion
    s.rect(wx - frame, winY0 - frame, winW + frame * 2, frame, WHITE);
    s.rect(wx - frame, winY1, winW + frame * 2, frame, WHITE);
    s.rect(wx - frame, winY0 - frame, frame, wh + frame * 2, WHITE);
    s.rect(wx + winW, winY0 - frame, frame, wh + frame * 2, WHITE);
    s.rect(wx, winY0 + wh * 0.3 - 4, winW, 8, WHITE);
    s.rect(wx + winW / 2 - 3, winY0, 6, wh, WHITE);
    s.shade(wx - frame, winY0 - frame, winW + frame * 2, 2, 0.15);
    s.shade(wx - frame, winY0 - frame, 2, wh + frame * 2, 0.15);
    s.shade(wx - frame, winY1 + frame, winW + frame * 2, 4, 0.12);
    // internal timber sill
    s.rect(wx - reveal - 6, winY1 + frame, winW + reveal * 2 + 12, 12, WHITE);
    s.shade(wx - reveal - 6, winY1 + frame, winW + reveal * 2 + 12, 12, 0.08);
    s.shade(wx - reveal - 6, winY1 + frame + 12, winW + reveal * 2 + 12, 6, 0.16);
  }

  // ---- kitchen screen on the right flank wall: full-height glazed timber screen ----
  const SD = 2.9; // screen depth visible (metres)
  const kitchenPoly = (h0, h1, d0, d1, fill, opts) =>
    s.poly(
      [P(WR, yAt(h1), d0), P(WR, yAt(h1), d1), P(WR, yAt(h0), d1), P(WR, yAt(h0), d0)],
      fill,
      opts,
    );
  // kitchen beyond the glass: pale tiled wall, worktop, hood and a shelf
  kitchenPoly(0, 3.6, 0, SD, WHITE);
  kitchenPoly(0.9, 2.1, 0, SD, STONE, { opacity: 0.35 }); // tiled splashback zone
  for (let h = 1.05; h < 2.1; h += 0.15) {
    const a = P(WR, yAt(h), 0),
      b = P(WR, yAt(h), SD);
    s.line(a[0], a[1], b[0], b[1], { opacity: 0.08 });
  }
  kitchenPoly(0.84, 0.92, 0, SD, STONE); // worktop edge
  kitchenPoly(0.86, 0.9, 0, SD, INK, { opacity: 0.35 });
  kitchenPoly(0, 0.84, 0, SD, INK, { opacity: 0.55 }); // base units
  kitchenPoly(0.92, 1.85, 2.15, 2.75, INK, { opacity: 0.4 }); // tall fridge at the near end
  kitchenPoly(1.75, 1.8, 0.2, 2.0, INK, { opacity: 0.35 }); // open shelf
  for (const d of [0.35, 0.6, 0.85, 1.25, 1.5]) kitchenPoly(1.8, 2.0, d, d + 0.12, STONE); // crockery on the shelf
  // glass tint and reflection
  kitchenPoly(0, 3.6, 0, SD, INK, { opacity: 0.08 });
  kitchenPoly(0.7, 3.6, 0.05, 0.75, PAPER, { opacity: 0.18 });
  kitchenPoly(0.7, 3.6, 1.65, 2.35, PAPER, { opacity: 0.12 });
  // moss timber framing: posts, head, transom, solid lower panel, slim glazing bars
  const postW = 0.07;
  const rail = (h0, h1) => kitchenPoly(h0, h1, 0, SD, MOSS);
  rail(0, 0.72); // solid panel
  rail(0.72, 0.8); // panel cap
  rail(2.4, 2.48); // transom
  rail(3.45, 3.6); // head
  const posts = [0, 0.75, 1.5, 2.25];
  for (const d of posts) kitchenPoly(0, 3.6, d, d + postW, MOSS);
  for (const d of posts) kitchenPoly(0, 3.6, d + postW, d + postW + 0.015, INK, { opacity: 0.25 });
  for (const d of posts) kitchenPoly(0, 3.6, d, d + 0.015, PAPER, { opacity: 0.18 });
  // slim glazing bars: one horizontal within the main light, one vertical in each bay
  const thin = (h0, h1, d0, d1) => kitchenPoly(h0, h1, d0, d1, MOSS);
  thin(1.6, 1.64, 0, SD);
  for (const d of posts) thin(0.8, 2.4, d + postW + 0.31, d + postW + 0.335);
  // panel shading: the screen faces away from the windows
  kitchenPoly(0, 3.6, 0, SD, INK, { opacity: 0.06 });
  // moss skirting return along the left wall too, so the base reads consistently
  const skA = P(WL, yAt(0.12), 0),
    skB = P(WL, yAt(0.12), 3.2);
  s.poly([P(WL, FLOOR, 0), P(WL, FLOOR, 3.2), skB, skA], MOSS);

  // ---- fixed perimeter bench: sandstone base, moss upholstered seat ----
  const seatH = 0.44,
    benchD = 0.55,
    cushion = 0.08;
  const BL = WL + benchD * u; // wall-x where the left return ends
  // seat top surfaces
  s.poly(
    [
      P(BL, yAt(seatH), 0),
      P(WR, yAt(seatH), 0),
      P(WR, yAt(seatH), benchD),
      P(BL, yAt(seatH), benchD),
    ],
    MOSS,
  ); // window wall
  s.poly(
    [P(WL, yAt(seatH), 0), P(BL, yAt(seatH), 0), P(BL, yAt(seatH), 3.0), P(WL, yAt(seatH), 3.0)],
    MOSS,
  ); // left return
  s.poly(
    [P(WL, yAt(seatH), 0), P(BL, yAt(seatH), 0), P(BL, yAt(seatH), 3.0), P(WL, yAt(seatH), 3.0)],
    PAPER,
    { opacity: 0.06 },
  );
  // seat top catches light from the windows
  s.poly(
    [
      P(BL, yAt(seatH), 0),
      P(WR, yAt(seatH), 0),
      P(WR, yAt(seatH), benchD),
      P(BL, yAt(seatH), benchD),
    ],
    PAPER,
    { opacity: 0.14 },
  );
  // front faces: window-wall bench
  const f0 = P(BL, yAt(seatH), benchD),
    f1 = P(WR, yAt(seatH), benchD),
    f2 = P(WR, FLOOR, benchD),
    f3 = P(BL, FLOOR, benchD);
  s.poly([f0, f1, f2, f3], SANDSTONE);
  s.poly(
    [f0, f1, [f1[0], f1[1] + cushion * u * k(benchD)], [f0[0], f0[1] + cushion * u * k(benchD)]],
    MOSS,
  ); // cushion edge
  s.poly(
    [
      [f0[0], f1[1] + cushion * u * k(benchD)],
      [f1[0], f1[1] + cushion * u * k(benchD)],
      [f1[0], f1[1] + (cushion + 0.02) * u * k(benchD)],
      [f0[0], f1[1] + (cushion + 0.02) * u * k(benchD)],
    ],
    INK,
    { opacity: 0.2 },
  );
  s.poly([[f3[0], f3[1] - 14], [f2[0], f2[1] - 14], f2, f3], INK, { opacity: 0.22 }); // recessed plinth
  // front face: left return (faces into the room, plane x = BL)
  const g = (h, d) => P(BL, yAt(h), d);
  s.poly([g(seatH, benchD), g(seatH, 3.0), g(0, 3.0), g(0, benchD)], SANDSTONE);
  s.poly([g(seatH, benchD), g(seatH, 3.0), g(0, 3.0), g(0, benchD)], INK, { opacity: 0.08 });
  s.poly(
    [g(seatH, benchD), g(seatH, 3.0), g(seatH - cushion, 3.0), g(seatH - cushion, benchD)],
    MOSS,
  );
  s.poly(
    [
      g(seatH - cushion, benchD),
      g(seatH - cushion, 3.0),
      g(seatH - cushion - 0.02, 3.0),
      g(seatH - cushion - 0.02, benchD),
    ],
    INK,
    { opacity: 0.25 },
  );
  s.poly([g(0.07, benchD), g(0.07, 3.0), g(0, 3.0), g(0, benchD)], INK, { opacity: 0.22 });
  // shadow of the bench on the floor
  s.poly(
    [
      P(BL, FLOOR, benchD),
      P(WR, FLOOR, benchD),
      P(WR, FLOOR, benchD + 0.14),
      P(BL, FLOOR, benchD + 0.14),
    ],
    INK,
    { opacity: 0.1 },
  );

  // ---- tables and stools ----
  const stool = (cx, d) => {
    const kk = k(d),
      w = 0.34 * u * kk,
      seatT = 0.05 * u * kk;
    const sx = px(cx, d),
      top = py(yAt(0.46), d),
      fl = py(FLOOR, d);
    s.line(sx - w * 0.36, top + seatT, sx - w * 0.42, fl, {
      color: INK,
      opacity: 0.85,
      weight: 3 * kk,
    });
    s.line(sx + w * 0.36, top + seatT, sx + w * 0.42, fl, {
      color: INK,
      opacity: 0.85,
      weight: 3 * kk,
    });
    s.line(sx - w * 0.3, top + (fl - top) * 0.6, sx + w * 0.3, top + (fl - top) * 0.6, {
      color: INK,
      opacity: 0.6,
      weight: 2 * kk,
    });
    s.rect(sx - w / 2, top, w, seatT, TERRACOTTA);
    s.rect(sx - w / 2, top + seatT, w, seatT * 0.45, INK, { opacity: 0.3 });
  };
  const table = (cx, d) => {
    const kk = k(d),
      rx = 0.38 * u * kk,
      ry = rx * 0.4,
      thick = 5 * kk;
    const tx = px(cx, d),
      ty = py(yAt(0.74), d),
      fl = py(FLOOR, d);
    stool(cx - 0.62 * u, d - 0.12);
    stool(cx + 0.62 * u, d - 0.12);
    // pedestal and base
    ellipse(tx + 10 * kk, fl + 2 * kk, rx * 0.95, ry * 0.9, INK, { opacity: 0.07 }); // soft floor shadow
    ellipse(tx, fl - 2 * kk, 0.2 * u * kk, 0.2 * u * kk * 0.4, INK, { opacity: 0.85 });
    ellipse(tx, fl - 2 * kk, 0.2 * u * kk, 0.2 * u * kk * 0.4, INK, { opacity: 0.15 }); // floor shadow deepening
    s.rect(tx - 4 * kk, ty, 8 * kk, fl - ty - 2 * kk, INK, { opacity: 0.85 });
    // top: pale marble disc with an ink edge
    ellipse(tx, ty + thick, rx, ry, INK, { opacity: 0.55 });
    ellipse(tx, ty, rx, ry, WHITE);
    ellipse(tx, ty, rx, ry, STONE, { opacity: 0.25 });
    ellipse(tx - rx * 0.12, ty - ry * 0.15, rx * 0.72, ry * 0.62, PAPER, { opacity: 0.5 });
  };
  // drawn far to near so overlaps are correct
  table(WL + 250, 1.3);
  table(WL + 720, 1.7);
  table(WL + 560, 3.6);

  // ---- pendant lights: thin ink cords from the ceiling, small shades ----
  const pendant = (cx, d, h = 2.0) => {
    const kk = k(d),
      x = px(cx, d),
      y = py(yAt(h), d);
    const topY = Math.max(py(CEIL, d), -10);
    s.line(x, topY, x, y, { color: INK, opacity: 0.75, weight: 2 * kk });
    s.circle(x, y + 30 * kk, 34 * kk, PAPER, { opacity: 0.14 }); // glow
    s.circle(x, y, 20 * kk, INK, { opacity: 0.92 });
    s.circle(x, y + 4 * kk, 16 * kk, MOSS, { opacity: 0.35 });
    s.circle(x, y + 9 * kk, 7 * kk, PAPER, { opacity: 0.95 });
  };
  pendant(WL + 250, 1.3);
  pendant(WL + 720, 1.7);
  pendant(WL + 560, 3.6, 2.35);

  return s;
}
