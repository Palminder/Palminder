import { Scene, INK, PAPER, STONE, MOSS, SANDSTONE } from '../toolkit.mjs';

/**
 * Two four-storey post-war walk-up blocks in a suburban Glasgow scheme. The nearer block, left,
 * is part way through an external-wall-insulation upgrade: its left half is finished in crisp
 * pale panels, the right half is still the original roughcast.
 */
export function postwarHousingBlocks() {
  const s = new Scene({
    width: 1600,
    height: 1200,
    title: 'Post-war housing blocks',
    description:
      'Two four-storey post-war walk-up housing blocks with paired windows and stair towers, the nearer block half re-clad in pale insulation panels, with a grass strip, path and sapling in front under an overcast sky.',
  });

  // ---- local helpers -------------------------------------------------------------------------
  /** Roughcast wall: stone with faint horizontal shade bands at each storey. */
  const roughcast = (x, y, w, h, storey) => {
    s.rect(x, y, w, h, STONE);
    let i = 0;
    for (let cy = y; cy < y + h; cy += storey, i++) {
      const bh = Math.min(storey, y + h - cy);
      if (i % 2) s.shade(x, cy, w, bh, 0.04);
      s.shade(x, cy + bh - storey * 0.18, w, storey * 0.18, 0.035); // heavier band under each floor line
      s.line(x, cy, x + w, cy, { opacity: 0.1 });
    }
  };
  /** New external-wall-insulation finish: paper-tinted crisp panels with fine joints. */
  const ewi = (x, y, w, h, storey, bay) => {
    s.rect(x, y, w, h, STONE);
    s.light(x, y, w, h, 0.4);
    for (let cy = y + storey; cy < y + h; cy += storey) s.line(x, cy, x + w, cy, { opacity: 0.2 });
    for (let cx = x + bay / 2; cx < x + w - 1; cx += bay / 2)
      s.line(cx, y, cx, y + h, { opacity: 0.2 });
    // a little sheen on the upper storey so the panels read as smooth render
    s.light(x, y, w, storey, 0.1);
  };
  /** Shallow hipped roof band in ink at half strength, ridge catching the light. */
  const hipRoof = (x, y, w, rise, hip) => {
    s.poly(
      [
        [x, y],
        [x + w, y],
        [x + w - hip, y - rise],
        [x + hip, y - rise],
      ],
      INK,
      { opacity: 0.5 },
    );
    s.rect(x + hip, y - rise, w - hip * 2, 4, PAPER, { opacity: 0.35 });
    s.rect(x - 6, y, w + 12, 8, STONE); // gutter / fascia
    s.shade(x - 6, y, w + 12, 8, 0.25);
    s.shade(x - 6, y + 8, w + 12, 10, 0.16); // shadow under the eaves
  };
  /** Shaded end return (gable wall) seen in three-quarter view, to the left of a block. */
  const endReturn = (x, y, w, h, roofRise, hip) => {
    s.rect(x - w, y, w, h, STONE);
    s.shade(x - w, y, w, h, 0.22);
    s.poly(
      [
        [x - w, y],
        [x, y],
        [x + hip, y - roofRise],
        [x - w + hip * 0.6, y - roofRise * 0.55],
      ],
      INK,
      { opacity: 0.62 },
    );
    s.shade(x - w, y + h - 24, w, 24, 0.12);
  };
  /** Paired windows: two sashes side by side in one opening bay. */
  const pair = (cx, y, ww, wh, gap) => {
    s.window(cx - gap / 2 - ww, y, ww, wh, { reveal: 5 });
    s.window(cx + gap / 2, y, ww, wh, { reveal: 5 });
  };
  /** Stair tower rising above eaves with a vertical strip of half-landing windows. */
  const tower = (x, y, w, groundY, storey, landings, { pale = false } = {}) => {
    s.rect(x, y, w, groundY - y, STONE);
    if (pale) s.light(x, y, w, groundY - y, 0.4);
    s.shade(x, y, w, groundY - y, 0.05);
    s.shade(x, y, 6, groundY - y, 0.14); // returns either side of the projecting tower
    s.light(x + w - 6, y, 6, groundY - y, 0.12);
    s.rect(x - 4, y, w + 8, 10, STONE);
    s.shade(x - 4, y, w + 8, 10, 0.3);
    s.shade(x - 4, y + 10, w + 8, 8, 0.12);
    const lw = w * 0.4,
      lh = storey * 0.62;
    for (let i = 0; i < landings; i++) {
      const wy = groundY - storey * (i + 1.5) - lh / 2; // half-landing height
      s.window(x + (w - lw) / 2, wy, lw, lh, { reveal: 5, sill: false });
    }
    // close entrance with a small canopy
    const dw = w * 0.42,
      dh = storey * 0.78;
    s.door(x + (w - dw) / 2, groundY - dh, dw, dh, { fanlight: true });
    s.rect(x + (w - dw) / 2 - 18, groundY - dh - 16, dw + 36, 10, STONE);
    s.shade(x + (w - dw) / 2 - 18, groundY - dh - 16, dw + 36, 10, 0.3);
    s.shade(x + (w - dw) / 2 - 18, groundY - dh - 6, dw + 36, 8, 0.15);
  };

  // ---- sky and ground ------------------------------------------------------------------------
  const nearGround = 1030,
    farGround = 950;
  s.overcast(farGround);
  // distant tree line behind the blocks (moss, very soft)
  for (let i = 0; i < 12; i++)
    s.circle(60 + i * 140, farGround - 30, 80 + (i % 3) * 26, MOSS, { opacity: 0.22 });
  s.rect(0, farGround - 6, s.w, s.h - farGround + 6, MOSS);
  s.light(0, farGround - 6, s.w, 60, 0.18); // far grass paler in the haze

  // ---- far block (right, smaller) ------------------------------------------------------------
  {
    const storey = 118,
      floors = 4,
      h = storey * floors;
    const x = 1080,
      w = 480,
      eaves = farGround - h;
    const bays = 3,
      bayW = 100,
      towerW = 80;
    endReturn(x, eaves, 22, h, 42, 30);
    roughcast(x, eaves, w, h, storey);
    const tx = x + bays * bayW;
    // paired windows left of tower (3 bays), one bay right of tower
    for (let f = 0; f < floors; f++) {
      const wy = eaves + f * storey + storey * 0.22;
      for (let b = 0; b < bays; b++) pair(x + bayW * (b + 0.5), wy, 26, storey * 0.56, 8);
      pair(tx + towerW + bayW * 0.5, wy, 26, storey * 0.56, 8);
    }
    tower(tx, eaves - 30, towerW, farGround, storey, 3);
    hipRoof(x, eaves, w, 46, 34);
    s.rect(x, farGround - 18, w, 18, INK, { opacity: 0.15 }); // plinth
    s.light(x - 22, eaves - 50, w + 22, farGround - eaves + 50, 0.14); // atmospheric haze on the far block
  }

  // ---- near block (left, larger) -------------------------------------------------------------
  {
    const storey = 172,
      floors = 4,
      h = storey * floors;
    const x = 70,
      w = 940,
      eaves = nearGround - h;
    const bays = 3,
      bayW = 140,
      towerW = 100;
    const tx = x + bays * bayW; // left edge of stair tower — also the EWI junction
    endReturn(x, eaves, 34, h, 64, 46);
    ewi(x, eaves, tx - x, h, storey, bayW);
    roughcast(tx, eaves, x + w - tx, h, storey);
    // sharp junction line where the new insulation stops
    s.rect(tx - 3, eaves, 6, h, INK, { opacity: 0.55 });
    s.rect(tx - 10, eaves, 7, h, PAPER, { opacity: 0.45 });
    // paired windows: 3 bays left of tower, 3 bays right
    const rightX = tx + towerW;
    for (let f = 0; f < floors; f++) {
      const wy = eaves + f * storey + storey * 0.22;
      for (let b = 0; b < bays; b++) pair(x + bayW * (b + 0.5), wy, 44, storey * 0.54, 14);
      for (let b = 0; b < bays; b++) pair(rightX + bayW * (b + 0.5), wy, 44, storey * 0.54, 14);
    }
    tower(tx, eaves - 44, towerW, nearGround, storey, 3);
    hipRoof(x, eaves, w, 78, 56);
    s.rect(x, nearGround - 26, w, 26, INK, { opacity: 0.16 }); // plinth
    s.shade(x - 34, nearGround, w + 34, 14, 0.18); // shadow at the foot of the wall
  }

  // ---- foreground ----------------------------------------------------------------------------
  // pavement along the base of the near block and a path curving down to the bottom edge
  s.rect(0, nearGround, s.w, 34, STONE);
  s.shade(0, nearGround, s.w, 34, 0.06);
  s.rect(0, nearGround + 34, s.w, 3, INK, { opacity: 0.18 });
  s.poly(
    [
      [470, nearGround + 34],
      [610, nearGround + 34],
      [780, s.h],
      [340, s.h],
    ],
    STONE,
  );
  s.shade(340, nearGround + 34, 440, s.h - nearGround - 34, 0.05);
  s.poly(
    [
      [470, nearGround + 34],
      [478, nearGround + 34],
      [352, s.h],
      [340, s.h],
    ],
    INK,
    { opacity: 0.16 },
  );
  s.poly(
    [
      [602, nearGround + 34],
      [610, nearGround + 34],
      [780, s.h],
      [768, s.h],
    ],
    INK,
    { opacity: 0.16 },
  );
  // grass texture: a few pale horizontal bands and a darker foreground strip
  s.light(0, nearGround + 60, s.w, 6, 0.08);
  s.light(0, nearGround + 120, s.w, 4, 0.06);
  s.shade(0, s.h - 60, s.w, 60, 0.12);
  // a low hedge/bed against the far block
  s.rect(1090, farGround - 6, 470, 28, MOSS);
  s.shade(1090, farGround - 6, 470, 28, 0.2);
  // sapling on the grass, right of the path
  s.line(1250, 1185, 1250, 1060, { weight: 6, color: INK, opacity: 0.85 });
  s.line(1272, 1185, 1272, 1095, { weight: 4, color: SANDSTONE, opacity: 0.95 }); // timber stake
  s.circle(1250, 1030, 72, MOSS);
  s.circle(1250, 1030, 72, INK, { opacity: 0.12 });
  s.circle(1226, 1008, 44, PAPER, { opacity: 0.07 });
  s.circle(1250, 1185, 26, INK, { opacity: 0.14 }); // shadow at the foot
  // second, smaller sapling far left to balance the frame
  s.line(130, 1190, 130, 1105, { weight: 4, color: INK, opacity: 0.85 });
  s.circle(130, 1078, 46, MOSS);
  s.circle(130, 1078, 46, INK, { opacity: 0.12 });
  s.circle(116, 1064, 28, PAPER, { opacity: 0.07 });
  return s;
}
