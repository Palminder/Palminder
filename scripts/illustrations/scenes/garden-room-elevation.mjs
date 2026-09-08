import { Scene, SANDSTONE, INK, PAPER, STONE, MOSS, TERRACOTTA, WHITE } from '../toolkit.mjs';

/** Timber-clad wall: warm dark tone over sandstone with vertical board lines. */
function timberWall(s, x, y, w, h) {
  s.rect(x, y, w, h, SANDSTONE);
  s.shade(x, y, w, h, 0.7);
  for (let bx = x + 18; bx < x + w; bx += 18)
    s.line(bx, y, bx, y + h, { color: PAPER, opacity: 0.15 });
  return s;
}

/** Wide glazed sliding door with paper frame lines. */
function slidingDoor(s, x, y, w, h, leaves = 3) {
  s.rect(x - 6, y - 6, w + 12, h + 6, PAPER, { opacity: 0.55 }); // frame
  s.rect(x, y, w, h, INK, { opacity: 0.82 });
  s.light(x + 4, y + 4, w - 8, h * 0.38, 0.12); // sky reflection
  const lw = w / leaves;
  for (let i = 1; i < leaves; i++) s.rect(x + lw * i - 2, y, 4, h, PAPER, { opacity: 0.7 });
  s.rect(x, y + h - 6, w, 6, PAPER, { opacity: 0.5 }); // threshold track
  return s;
}

/** Stone paving with a staggered slab pattern. */
function paving(s, x, y, w, h, { slab = 96, row = 32 } = {}) {
  s.rect(x, y, w, h, STONE);
  let r = 0;
  for (let cy = y; cy < y + h; cy += row) {
    s.line(x, cy, x + w, cy, { opacity: 0.14 });
    const off = r % 2 ? slab / 2 : 0;
    for (let cx = x + off; cx < x + w; cx += slab)
      s.line(cx, cy, cx, Math.min(cy + row, y + h), { opacity: 0.12 });
    r++;
  }
  return s;
}

/** Rear elevation of a two-storey sandstone villa with a new single-storey timber garden room at the right. */
export function gardenRoomElevation() {
  const s = new Scene({
    width: 1600,
    height: 1000,
    title: 'Garden room elevation',
    description:
      'Rear elevation of a two-storey red sandstone villa with a slate roof and chimney, joined by a narrow glazed link to a new single-storey timber-clad garden room with a wide sliding glass door, a flat roof with a rooflight, a stone terrace and a lawn under an overcast sky.',
  });
  const ground = 780; // lawn takes the bottom 22%
  s.overcast(ground + 40);

  // ---- distant planting behind the house, so the villa sits in a garden not on paper ----
  s.circle(90, 330, 150, MOSS, { opacity: 0.3 });
  s.circle(230, 400, 110, MOSS, { opacity: 0.26 });
  s.circle(20, 470, 120, MOSS, { opacity: 0.32 });
  s.rect(0, 420, 200, ground - 420, MOSS, { opacity: 0.34 });
  s.circle(1540, 470, 90, MOSS, { opacity: 0.34 });
  s.circle(1610, 400, 100, MOSS, { opacity: 0.28 });
  s.rect(1480, 500, 120, ground - 500, MOSS, { opacity: 0.34 });

  // ---- villa ----
  const vx = 100,
    vw = 670,
    eaves = 462;
  // chimney behind the roof
  s.chimney(600, 195, 56, 120, 2);
  // hipped slate roof: eaves overhang to ridge
  s.poly(
    [
      [vx - 28, eaves],
      [vx + vw + 28, eaves],
      [vx + vw - 196, 282],
      [vx + 206, 282],
    ],
    INK,
    { opacity: 0.6 },
  );
  for (let cy = 294; cy < eaves; cy += 12) {
    const t = (cy - 282) / (eaves - 282);
    const lx = vx + 206 - t * 234,
      rx = vx + vw - 196 + t * 224;
    s.line(lx, cy, rx, cy, { color: PAPER, opacity: 0.12 });
  }
  s.rect(vx + 206, 282, vw - 402, 4, PAPER, { opacity: 0.35 }); // ridge
  s.line(vx - 28, eaves, vx + 206, 282, { color: PAPER, opacity: 0.35, weight: 3 });
  s.line(vx + vw + 28, eaves, vx + vw - 196, 282, { color: PAPER, opacity: 0.35, weight: 3 });
  // eaves gutter and shadow
  s.rect(vx - 28, eaves - 6, vw + 56, 10, INK, { opacity: 0.75 });
  // facade
  s.facade(vx, eaves + 4, vw, ground - eaves - 4, { course: 30 });
  s.shade(vx, eaves + 4, vw, 26, 0.2); // eaves shadow
  s.cornice(vx, eaves + 4 + 150, vw, 10); // first-floor string course
  // quoins at each corner
  for (let q = 0; q < 10; q++) {
    const qy = eaves + 4 + q * 30;
    const qw = q % 2 ? 22 : 34;
    s.rect(vx, qy, qw, 30, SANDSTONE);
    s.light(vx, qy, qw, 30, 0.22);
    s.line(vx + qw, qy, vx + qw, qy + 30, { opacity: 0.16 });
    s.rect(vx + vw - qw, qy, qw, 30, SANDSTONE);
    s.light(vx + vw - qw, qy, qw, 30, 0.22);
    s.line(vx + vw - qw, qy, vx + vw - qw, qy + 30, { opacity: 0.16 });
  }
  // first floor: three sash windows
  const w1y = eaves + 36,
    w1h = 104,
    w1w = 88;
  for (const wx of [vx + 96, vx + vw / 2 - w1w / 2, vx + vw - 96 - w1w])
    s.window(wx, w1y, w1w, w1h, { reveal: 9 });
  // ground floor: two tall sashes flanking a blind centre with a back door
  const w0y = eaves + 4 + 178,
    w0h = 122;
  s.window(vx + 96, w0y, w1w, w0h, { reveal: 9 });
  s.window(vx + vw - 96 - w1w, w0y, w1w, w0h, { reveal: 9 });
  s.door(vx + vw / 2 - 32, ground - 134, 64, 134, { fanlight: true, fill: MOSS });
  // plinth / base course
  s.rect(vx, ground - 22, vw, 22, SANDSTONE);
  s.shade(vx, ground - 22, vw, 22, 0.16);
  s.line(vx, ground - 22, vx + vw, ground - 22, { opacity: 0.25 });

  // ---- glazed link between villa and extension ----
  const lx = vx + vw,
    lw = 76,
    ltop = 618;
  s.rect(lx, ltop, lw, ground - ltop, INK, { opacity: 0.82 });
  s.light(lx + 3, ltop + 3, lw - 6, (ground - ltop) * 0.4, 0.14);
  s.rect(lx, ltop - 6, lw, 6, INK, { opacity: 0.9 }); // slim flat roof edge
  s.rect(lx + lw / 2 - 2, ltop, 4, ground - ltop, PAPER, { opacity: 0.55 });
  s.rect(lx, ltop + (ground - ltop) * 0.3, lw, 4, PAPER, { opacity: 0.55 });
  s.shade(lx, ltop, lw, ground - ltop, 0.18); // recessed, in shadow of both masses

  // ---- garden room extension ----
  const ex = lx + lw,
    ew = 1600 - ex - 70,
    etop = 536,
    fasciaH = 50,
    wallTop = etop + fasciaH;
  // fascia: deep, in paper-light timber
  s.rect(ex, etop, ew, fasciaH, SANDSTONE);
  s.light(ex, etop, ew, fasciaH, 0.45);
  s.rect(ex, etop, ew, 5, INK, { opacity: 0.8 }); // roof edge trim
  s.shade(ex, etop + fasciaH - 6, ew, 6, 0.2); // fascia underside
  // rooflight upstand on the flat roof
  s.rect(ex + 260, etop - 14, 200, 14, SANDSTONE);
  s.shade(ex + 260, etop - 14, 200, 14, 0.45);
  s.rooflight(ex + 266, etop - 28, 188, 16);
  // walls
  timberWall(s, ex, wallTop, ew, ground - wallTop);
  s.shade(ex, wallTop, ew, 14, 0.3); // fascia shadow on wall
  // sliding door across the main span with a solid panel at right
  const dx = ex + 40,
    dw = ew - 200,
    dy = wallTop + 26;
  slidingDoor(s, dx, dy, dw, ground - dy, 3);
  // slim clerestory-height window in the solid end panel
  s.rect(ex + ew - 120, wallTop + 26, 70, 60, INK, { opacity: 0.82 });
  s.rect(ex + ew - 124, wallTop + 22, 78, 4, PAPER, { opacity: 0.5 });
  s.rect(ex + ew - 124, wallTop + 22, 4, 68, PAPER, { opacity: 0.5 });
  s.rect(ex + ew - 54, wallTop + 22, 4, 68, PAPER, { opacity: 0.5 });
  s.rect(ex + ew - 124, wallTop + 86, 78, 4, PAPER, { opacity: 0.5 });
  // right-hand return of the extension, glimpsed because the garden room projects forward
  const rw = 26;
  s.rect(ex + ew, wallTop, rw, ground - wallTop, SANDSTONE);
  s.shade(ex + ew, wallTop, rw, ground - wallTop, 0.84);
  s.rect(ex + ew, etop, rw, fasciaH, SANDSTONE);
  s.shade(ex + ew, etop, rw, fasciaH, 0.3);
  s.rect(ex + ew, etop, rw, 5, INK, { opacity: 0.8 });

  // ---- ground: lawn, terrace, shadow ----
  s.rect(0, ground, 1600, 1000 - ground, MOSS);
  s.light(0, ground, 1600, 1000 - ground, 0.08);
  for (let gy = ground + 30; gy < 1000; gy += 30)
    s.line(0, gy, 1600, gy, { color: PAPER, opacity: 0.05 });
  // terrace in front of the extension, stepping down to the lawn
  paving(s, ex - 60, ground, ew + 120, 96);
  s.rect(ex - 60, ground + 96, ew + 120, 6, INK, { opacity: 0.3 }); // step edge
  s.rect(ex - 60, ground + 102, ew + 120, 26, STONE);
  s.shade(ex - 60, ground + 102, ew + 120, 26, 0.12);
  s.rect(ex - 60, ground + 128, ew + 120, 5, INK, { opacity: 0.25 });
  // shadow thrown onto the ground by the projecting garden room
  s.shade(ex - 60, ground, ew + 120, 34, 0.14);
  s.shade(vx, ground, vw + lw, 18, 0.1);
  // narrow gravel margin along the villa base
  s.rect(vx - 10, ground, vw + 10, 12, STONE);
  s.shade(vx - 10, ground, vw + 10, 12, 0.1);
  // planting: a clipped hedge and shrubs at the left of the lawn, a shrub at the right of the terrace
  const hedgeTop = ground - 74,
    hedgeR = vx - 20;
  s.rect(0, hedgeTop, hedgeR, 74 + 40, MOSS);
  s.circle(hedgeR, hedgeTop + 22, 22, MOSS);
  s.rect(hedgeR - 22, hedgeTop + 22, 22, 92, MOSS);
  for (let bx = 8; bx < hedgeR - 10; bx += 26) s.circle(bx, hedgeTop + 2, 16, MOSS);
  s.shade(0, hedgeTop, hedgeR + 2, 114, 0.16);
  s.light(0, hedgeTop - 10, hedgeR - 14, 22, 0.1);
  s.shade(0, ground + 20, hedgeR, 20, 0.12);
  s.circle(1552, ground - 36, 44, MOSS);
  s.circle(1528, ground - 56, 30, MOSS);
  s.circle(1578, ground - 54, 26, MOSS);
  s.light(1520, ground - 84, 40, 24, 0.08);
  s.shade(1508, ground - 30, 92, 32, 0.12);
  // a soft haze at the roofline so the villa recedes behind the extension
  s.light(0, 0, 1600, etop, 0.06);
  return s;
}
