import { Scene, SANDSTONE, INK, PAPER, STONE, TERRACOTTA, WHITE } from '../toolkit.mjs';

/** A view across tenement roofs at eaves level: a foreground slate pitch with rooflights and a chimney stack, the ridge opposite with more stacks and a dormer, and a hazier terrace beyond. */
export function tenementRoofscape() {
  const s = new Scene({
    width: 1600,
    height: 1000,
    title: 'Tenement roofscape',
    description:
      'A view across Glasgow tenement roofs at eaves level under an overcast sky, with a foreground slate pitch, conservation rooflights, chimney stacks with terracotta pots, a dormer and rear sash windows.',
  });

  // ---- local helpers ----------------------------------------------------------------
  /** Chimney stack with a projecting cap, flaunching and terracotta pots that read as cylinders. */
  const stack = (x, y, w, h, pots, { potH = 40, shadeSide = 0.18, tone = 0.06 } = {}) => {
    s.rect(x, y, w, h, SANDSTONE);
    if (tone) s.shade(x, y, w, h, tone);
    s.shade(x + w * 0.62, y, w * 0.38, h, shadeSide); // one face in shade
    for (let cy = y + 26; cy < y + h; cy += 26) s.line(x, cy, x + w, cy, { opacity: 0.08 });
    // cap (drip course) with light top and shadow beneath
    const cap = Math.max(8, w * 0.08);
    s.rect(x - cap * 0.6, y, w + cap * 1.2, cap, SANDSTONE);
    s.light(x - cap * 0.6, y, w + cap * 1.2, cap, 0.35);
    s.shade(x - cap * 0.6, y + cap, w + cap * 1.2, cap * 0.8, 0.2);
    // flaunching
    s.rect(x, y - cap * 0.5, w, cap * 0.5, STONE);
    // pots
    const pw = w / (pots * 2 + 1);
    for (let i = 0; i < pots; i++) {
      const px = x + pw * (2 * i + 1);
      s.rect(px, y - potH, pw, potH, TERRACOTTA);
      s.shade(px + pw * 0.6, y - potH, pw * 0.4, potH, 0.22);
      s.light(px, y - potH, pw * 0.25, potH, 0.12);
      s.rect(px - pw * 0.08, y - potH, pw * 1.16, potH * 0.14, TERRACOTTA); // rim
      s.rect(px - pw * 0.08, y - potH, pw * 1.16, 3, INK, { opacity: 0.55 }); // open top
    }
    return s;
  };

  // ---- sky: top ~40% ----------------------------------------------------------------
  const horizon = 400;
  s.overcast(horizon + 20);
  // a few very faint cloud bands so the sky is not a dead field
  s.rect(0, 120, s.w, 70, STONE, { opacity: 0.08 });
  s.rect(0, 250, s.w, 40, STONE, { opacity: 0.06 });
  s.rect(0, 40, s.w, 60, WHITE, { opacity: 0.35 });

  // ---- background: distant terrace, lighter stone, hazy ----------------------------
  const farRidge = 372,
    farEaves = 428;
  s.rect(0, farRidge, s.w, farEaves - farRidge, STONE);
  s.shade(0, farRidge, s.w, farEaves - farRidge, 0.18);
  for (let cy = farRidge + 10; cy < farEaves; cy += 10)
    s.line(0, cy, s.w, cy, { color: PAPER, opacity: 0.1 });
  s.rect(0, farRidge, s.w, 3, PAPER, { opacity: 0.4 });
  s.rect(0, farEaves, s.w, 120, STONE); // wall below, largely hidden by the middle ridge
  s.shade(0, farEaves, s.w, 6, 0.15);
  // distant stacks on the far ridge
  for (const fx of [90, 330, 560, 790, 1020, 1250, 1480]) {
    s.rect(fx, farRidge - 36, 44, 40, STONE);
    s.shade(fx, farRidge - 36, 44, 40, 0.12);
    s.rect(fx - 3, farRidge - 36, 50, 5, STONE);
    for (let i = 0; i < 3; i++)
      s.rect(fx + 6 + i * 13, farRidge - 50, 7, 14, TERRACOTTA, { opacity: 0.6 });
  }
  // haze over everything distant
  s.light(0, 0, s.w, farEaves + 120, 0.38);

  // ---- middle ground: the terrace opposite -----------------------------------------
  const ridge = 470,
    eaves = 640;
  s.roof(-20, ridge, s.w + 40, eaves - ridge);
  s.shade(-20, ridge, s.w + 40, eaves - ridge, 0.08);
  // three chimney stacks on the ridge
  stack(150, ridge - 130, 120, 140, 4, { potH: 34 });
  stack(560, ridge - 120, 110, 130, 3, { potH: 32 });
  stack(960, ridge - 136, 130, 146, 4, { potH: 36 });

  // dormer: sandstone box with a small window and a slate cheek, on the slope
  {
    const dx = 760,
      dw = 96,
      dTop = 512,
      dBot = 634;
    // slate cheek (right return), trapezoid running back to the slope
    s.poly(
      [
        [dx + dw, dTop],
        [dx + dw + 54, dTop + 28],
        [dx + dw + 54, dBot - 4],
        [dx + dw, dBot],
      ],
      INK,
      { opacity: 0.72 },
    );
    for (let cy = dTop + 30; cy < dBot - 4; cy += 12)
      s.line(dx + dw, cy, dx + dw + 54, cy, { color: PAPER, opacity: 0.1 });
    // front face
    s.rect(dx, dTop, dw, dBot - dTop, SANDSTONE);
    s.line(dx, dTop + 40, dx + dw, dTop + 40, { opacity: 0.08 });
    s.line(dx, dTop + 80, dx + dw, dTop + 80, { opacity: 0.08 });
    // lead-covered flat top
    s.rect(dx - 5, dTop - 8, dw + 64, 10, STONE);
    s.light(dx - 5, dTop - 8, dw + 64, 10, 0.25);
    s.shade(dx - 5, dTop + 2, dw + 5, 6, 0.18);
    // small sash window
    s.window(dx + 22, dTop + 20, 52, 76, { reveal: 5, sill: true });
    // shadow of the dormer onto the slope
    s.shade(dx + dw + 54, dTop + 28, 22, dBot - dTop - 32, 0.16);
  }

  // eaves: gutter line and shadow beneath
  s.rect(-20, eaves - 6, s.w + 40, 10, INK, { opacity: 0.6 });
  s.rect(-20, eaves - 6, s.w + 40, 3, PAPER, { opacity: 0.3 });
  // rear elevation below the eaves
  s.facade(-20, eaves + 4, s.w + 40, s.h - eaves, { course: 32, tone: 0.06 });
  s.shade(-20, eaves + 4, s.w + 40, 26, 0.2); // eaves shadow
  // run of rear-elevation sash windows at the left, below the eaves
  for (const wx of [60, 200, 340, 480, 640]) s.window(wx, eaves + 60, 64, 110, { reveal: 7 });
  s.window(30, eaves + 230, 64, 110, { reveal: 7 });
  // downpipe reads as a dark stripe
  s.rect(140, eaves + 6, 8, 360, INK, { opacity: 0.55 });
  s.rect(140, eaves + 6, 3, 360, PAPER, { opacity: 0.15 });
  // the neighbouring close to the right is a plainer wall receding behind the pitch
  s.shade(620, eaves + 4, s.w, s.h - eaves, 0.05);

  // ---- foreground: slate pitch rising from the bottom right ------------------------
  const yAt = (x) => 860 - 0.2125 * x; // ridge line of the foreground pitch
  const pitch = [
    [-10, yAt(-10)],
    [s.w + 10, yAt(s.w + 10)],
    [s.w + 10, s.h + 10],
    [-10, s.h + 10],
  ];
  s.poly(pitch, INK);
  // slate courses parallel to the ridge
  for (let d = 14; d < 560; d += 14) {
    s.line(-10, yAt(-10) + d, s.w + 10, yAt(s.w + 10) + d, {
      color: PAPER,
      opacity: d < 200 ? 0.13 : 0.09,
    });
  }
  // slate joints: staggered short verticals for the nearest courses only
  for (let d = 0; d < 300; d += 14) {
    const step = 46,
      off = (((d / 14) % 2) * step) / 2;
    for (let x = -10 + off; x < s.w + 10; x += step)
      s.line(x, yAt(x) + d, x, yAt(x) + d + 14, { color: PAPER, opacity: 0.07 });
  }
  // a scatter of slightly paler slates (deterministic) so the pitch reads as slate, not a flat band
  for (let d = 14; d < 420; d += 14) {
    const row = d / 14,
      step = 46,
      off = ((row % 2) * step) / 2;
    for (let x = -10 + off; x < s.w + 10; x += step) {
      const k = (row * 11 + Math.round((x + 10) / step) * 7) % 13;
      if (k === 0 || k === 5)
        s.poly(
          [
            [x, yAt(x) + d],
            [x + step, yAt(x + step) + d],
            [x + step, yAt(x + step) + d + 14],
            [x, yAt(x) + d + 14],
          ],
          PAPER,
          { opacity: k === 0 ? 0.06 : 0.035 },
        );
    }
  }
  // ridge: lead-covered ridge highlight
  s.poly(
    [
      [-10, yAt(-10) - 5],
      [s.w + 10, yAt(s.w + 10) - 5],
      [s.w + 10, yAt(s.w + 10) + 6],
      [-10, yAt(-10) + 6],
    ],
    STONE,
    { opacity: 0.85 },
  );
  s.poly(
    [
      [-10, yAt(-10) - 5],
      [s.w + 10, yAt(s.w + 10) - 5],
      [s.w + 10, yAt(s.w + 10) - 1],
      [-10, yAt(-10) - 1],
    ],
    PAPER,
    { opacity: 0.5 },
  );
  // ink deepens toward the eaves at the bottom of the frame
  s.poly(
    [
      [-10, yAt(-10) + 260],
      [s.w + 10, yAt(s.w + 10) + 260],
      [s.w + 10, s.h + 10],
      [-10, s.h + 10],
    ],
    INK,
    { opacity: 0.18 },
  );

  // conservation rooflights: flush, framed, sheared to the slope
  const rooflight = (x, d, w, h) => {
    const y0 = yAt(x) + d,
      y1 = yAt(x + w) + d;
    s.poly(
      [
        [x - 5, y0 - 5],
        [x + w + 5, y1 - 5],
        [x + w + 5, y1 + h + 5],
        [x - 5, y0 + h + 5],
      ],
      PAPER,
      { opacity: 0.75 },
    );
    s.poly(
      [
        [x, y0],
        [x + w, y1],
        [x + w, y1 + h],
        [x, y0 + h],
      ],
      INK,
      { opacity: 0.85 },
    );
    s.poly(
      [
        [x + 4, y0 + 4],
        [x + w - 4, y1 + 4],
        [x + w - 4, y1 + h * 0.45],
        [x + 4, y0 + h * 0.45],
      ],
      PAPER,
      { opacity: 0.28 },
    );
    // central glazing bar
    s.poly(
      [
        [x + w / 2 - 2, (y0 + y1) / 2],
        [x + w / 2 + 2, (y0 + y1) / 2],
        [x + w / 2 + 2, (y0 + y1) / 2 + h],
        [x + w / 2 - 2, (y0 + y1) / 2 + h],
      ],
      PAPER,
      { opacity: 0.6 },
    );
    // lead soaker shade under the frame
    s.poly(
      [
        [x - 5, y0 + h + 5],
        [x + w + 5, y1 + h + 5],
        [x + w + 5, y1 + h + 16],
        [x - 5, y0 + h + 16],
      ],
      INK,
      { opacity: 0.35 },
    );
  };
  rooflight(330, 96, 150, 120);
  rooflight(700, 96, 150, 120);

  // foreground chimney stack, four pots, sitting astride the ridge
  {
    const cx = 1190,
      cw = 170,
      ctop = 372,
      cbot = yAt(cx) + 60;
    stack(cx, ctop, cw, cbot - ctop, 4, { potH: 54, shadeSide: 0.2, tone: 0.04 });
    // the slope passes in front of the foot of the stack: redraw that patch of slate
    const foot = 18;
    s.poly(
      [
        [cx - 14, yAt(cx - 14) + foot],
        [cx + cw + 14, yAt(cx + cw + 14) + foot],
        [cx + cw + 14, yAt(cx + cw + 14) + 150],
        [cx - 14, yAt(cx - 14) + 150],
      ],
      INK,
    );
    for (let d = 28; d < 150; d += 14)
      s.line(cx - 14, yAt(cx - 14) + d, cx + cw + 14, yAt(cx + cw + 14) + d, {
        color: PAPER,
        opacity: 0.13,
      });
    // lead apron flashing where the stack meets the slate
    s.poly(
      [
        [cx - 6, yAt(cx - 6) + 4],
        [cx + cw + 6, yAt(cx + cw + 6) + 4],
        [cx + cw + 6, yAt(cx + cw + 6) + foot],
        [cx - 6, yAt(cx - 6) + foot],
      ],
      STONE,
      { opacity: 0.9 },
    );
    s.poly(
      [
        [cx - 6, yAt(cx - 6) + foot],
        [cx + cw + 6, yAt(cx + cw + 6) + foot],
        [cx + cw + 6, yAt(cx + cw + 6) + foot + 8],
        [cx - 6, yAt(cx - 6) + foot + 8],
      ],
      INK,
      { opacity: 0.35 },
    );
  }

  return s;
}
