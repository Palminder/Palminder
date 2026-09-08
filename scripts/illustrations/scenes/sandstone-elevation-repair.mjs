import { Scene, SANDSTONE, INK, PAPER } from '../toolkit.mjs';

/** A four-storey red-sandstone tenement elevation, scaffolded on the left for repair and freshly repaired on the right. */
export function sandstoneElevationRepair() {
  const s = new Scene({
    width: 1600,
    height: 1000,
    title: 'Sandstone elevation repair',
    description:
      'A four-storey red-sandstone tenement elevation seen square-on under an overcast sky, with scaffolding and debris netting across the left half and completed indent repairs and re-pointing on the right half.',
  });
  const W = s.w;
  const ground = 900;
  const eaves = 180;
  const storey = (ground - eaves) / 4; // 180
  const course = 36;
  const split = Math.round(W * 0.45); // 720: scaffolded half ends here

  // ---- sky and roof ----
  s.overcast(eaves);
  // slate roof band behind the wall-head, with chimneys at the party lines
  s.roof(0, eaves - 62, W, 70);
  for (const cx of [190, 790, 1390]) s.chimney(cx - 34, eaves - 122, 68, 70, 3);
  s.shade(0, eaves - 62, W, 8, 0.12); // ridge/roof under wall-head

  // ---- façade ----
  s.facade(0, eaves, W, ground - eaves, { course });
  // fine perpends across the whole elevation, staggered by course (worn on the left, crisper on the right)
  const stoneW = 120;
  let row = 0;
  for (let cy = eaves; cy < ground; cy += course) {
    const off = row % 2 ? stoneW / 2 : 0;
    for (let px = off; px < W; px += stoneW) {
      const crisp = px >= split;
      s.line(px, cy, px, cy + course, { opacity: crisp ? 0.18 : 0.07 });
    }
    row++;
  }
  // crisper bed joints on the repaired half
  for (let cy = eaves + course; cy < ground; cy += course)
    s.line(split, cy, W, cy, { opacity: 0.12 });

  // weathering: darker soiling on the unrepaired half, stronger under the wall-head and at the base
  s.shade(0, eaves, split, ground - eaves, 0.07);
  s.shade(0, eaves, split, 70, 0.08);
  s.shade(0, ground - 90, split, 90, 0.08);
  // repaired half reads cleaner
  s.light(split, eaves, W - split, ground - eaves, 0.06);

  // ---- string courses and wall-head cornice ----
  s.cornice(0, eaves, W, 18);
  s.cornice(0, eaves + storey * 1 + 4, W, 10);
  s.cornice(0, eaves + storey * 3 + 4, W, 12);
  // base course
  s.rect(0, ground - 22, W, 22, SANDSTONE);
  s.shade(0, ground - 22, W, 22, 0.2);

  // ---- windows: eight bays, four storeys; close door in the centre of the ground floor ----
  const bays = 8;
  const bayW = W / bays; // 200
  const winW = 76;
  const winH = 108;
  for (let f = 0; f < 4; f++) {
    const wy = eaves + f * storey + 44;
    for (let b = 0; b < bays; b++) {
      const wx = b * bayW + bayW / 2 - winW / 2;
      const isDoorBay = f === 3 && b === 4;
      if (isDoorBay) continue;
      const h = f === 3 ? winH + 12 : winH;
      s.window(wx, wy, winW, h, { reveal: 8 });
    }
  }
  // close door with fanlight, in bay 4
  const dx = 4 * bayW + bayW / 2 - 40;
  s.door(dx, ground - 22 - 150, 80, 150);
  s.rect(dx - 14, ground - 22 - 170, 108, 20, SANDSTONE); // lintel
  s.light(dx - 14, ground - 22 - 170, 108, 20, 0.3);
  s.shade(dx - 14, ground - 22 - 150, 108, 8, 0.2);

  // ---- completed repairs on the right: three indent stones, lighter than their neighbours ----
  const indent = (x, y, w, h) => {
    s.rect(x, y, w, h, SANDSTONE);
    s.light(x, y, w, h, 0.35);
    s.line(x, y, x + w, y, { opacity: 0.22 });
    s.line(x, y + h, x + w, y + h, { opacity: 0.22 });
    s.line(x, y, x, y + h, { opacity: 0.22 });
    s.line(x + w, y, x + w, y + h, { opacity: 0.22 });
  };
  // jamb stone beside a first-floor window
  indent(5 * bayW + bayW / 2 + winW / 2 + 8, eaves + storey + 44 + course * 1, 60, course * 2);
  // cill-level stone below a second-floor window
  indent(6 * bayW + bayW / 2 - 90, eaves + storey * 2 + 44 + winH + 16, 180, course);
  // string-course return at the top storey
  indent(7 * bayW + bayW / 2 - 96, eaves + 44 + winH + 22, 120, course);

  // ---- scaffold across the left 45% ----
  const scaffTop = eaves - 40;
  const lift = 150;
  const standards = [36, 208, 380, 552, 704];
  const boardH = 16;
  const member = (x, y, w, h) => s.rect(x, y, w, h, INK, { opacity: 0.7 });
  // debris netting first: sits over the façade and softens it
  s.rect(0, scaffTop, split, ground - scaffTop, PAPER, { opacity: 0.28 });
  // boards and ledgers at each lift, from the ground up
  for (let ly = ground; ly >= scaffTop + 20; ly -= lift) {
    const boardY = ly - boardH;
    if (ly !== ground) {
      s.rect(0, boardY, split, boardH, SANDSTONE); // scaffold boards
      s.light(0, boardY, split, 4, 0.4); // top face catching the light
      s.shade(0, boardY + boardH, split, 10, 0.26); // board underside
      s.rect(0, boardY - 20, split, 6, SANDSTONE); // toe board
      s.shade(0, boardY - 20, split, 6, 0.3);
    }
    member(0, boardY + boardH - 2, split, 6); // ledger under the boards
    member(0, boardY - 80, split, 6); // guard rail
  }
  // standards, the full height
  for (const x of standards) member(x - 3, scaffTop, 6, ground - scaffTop);
  // diagonal face braces between the outer standards
  const brace = (x1, y1, x2, y2) => s.line(x1, y1, x2, y2, { weight: 6, color: INK, opacity: 0.7 });
  brace(standards[0], ground, standards[1], ground - lift * 2);
  brace(standards[1], ground - lift * 2, standards[0], ground - lift * 4);
  brace(standards[3], ground, standards[4], ground - lift * 2);
  brace(standards[4], ground - lift * 2, standards[3], ground - lift * 4);
  // base plates and sole boards
  for (const x of standards) {
    s.rect(x - 14, ground - 4, 28, 4, INK, { opacity: 0.7 });
  }
  // top guard rail and rooftop ledger
  member(0, scaffTop, split, 6);
  // ladder between two standards at the lowest two lifts
  const lx = standards[2] + 14;
  member(lx, ground - lift * 2 - 30, 4, lift * 2 + 30);
  member(lx + 34, ground - lift * 2 - 30, 4, lift * 2 + 30);
  for (let ry = ground - 20; ry > ground - lift * 2 - 20; ry -= 24) member(lx, ry, 38, 4);

  // rainwater downpipes at the party lines on the repaired half
  for (const px of [split + 290, W - 24]) {
    s.shade(px - 4, eaves + 18, 16, ground - eaves - 18, 0.1);
    s.rect(px, eaves + 18, 9, ground - eaves - 18, INK, { opacity: 0.55 });
    s.light(px, eaves + 18, 3, ground - eaves - 18, 0.25);
  }

  // ---- pavement, kerb and road ----
  s.pavement(ground, { depth: 56 });
  s.rect(0, ground + 64, W, s.h - ground - 64, INK, { opacity: 0.45 });
  // hoarding line where the scaffold meets the pavement
  s.rect(0, ground + 6, split + 30, 14, SANDSTONE);
  s.shade(0, ground + 6, split + 30, 14, 0.12);
  s.shade(0, ground + 20, split + 30, 5, 0.22);
  return s;
}
