import { Scene, SANDSTONE, INK, PAPER, STONE, MOSS, TERRACOTTA, WHITE } from '../toolkit.mjs';

/** Street-level view of three painted timber shopfronts in the ground floor of a sandstone tenement. */
export function finniestonShopfronts() {
  const s = new Scene({
    width: 1800,
    height: 1200,
    title: 'Finnieston shopfronts',
    description:
      'Three painted timber shopfronts in moss green, terracotta and ink side by side in the ground floor of a sandstone tenement, with stone pilasters, a cornice, an awning and a pavement.',
  });
  const W = s.w,
    H = s.h;
  const ground = H * 0.86; // pavement takes the bottom 14%
  const corniceY = 326,
    corniceH = 30;
  const shopTop = corniceY + corniceH + 8; // fascias start under the cornice shadow
  const shopH = ground - shopTop;

  // ---- upper facade (first floor, cut by the top of the frame) ----
  s.facade(0, 0, W, corniceY, { course: 46 });
  // faint vertical joints so the coursing reads as ashlar
  for (let cx = 90; cx < W; cx += 180) {
    for (let r = 0; r < 7; r++) {
      const jx = cx + (r % 2 ? 90 : 0);
      s.line(jx, r * 46, jx, r * 46 + 46, { opacity: 0.07 });
    }
  }
  // first-floor sash windows: only the lower two thirds are in frame
  const winH = 330,
    winW = 150,
    winY = -winH / 3;
  const winXs = [160, 500, 840, 1170, 1500];
  for (const wx of winXs) s.window(wx, winY, winW, winH, { reveal: 10 });
  // string course between window sills and the shop cornice
  s.rect(0, 258, W, 10, SANDSTONE);
  s.light(0, 258, W, 10, 0.25);
  s.shade(0, 268, W, 6, 0.12);

  // ---- continuous cornice over the fascias ----
  s.rect(0, corniceY - 12, W, 12, SANDSTONE); // frieze
  s.shade(0, corniceY - 12, W, 12, 0.06);
  s.cornice(0, corniceY, W, corniceH);
  s.rect(0, corniceY - 22, W, 10, SANDSTONE); // upper step of the cornice
  s.light(0, corniceY - 22, W, 10, 0.4);
  s.shade(0, corniceY - 12, W, 4, 0.14);
  s.rect(0, corniceY + corniceH, W, 6, INK, { opacity: 0.3 }); // deep underside

  // ---- pilasters and units ----
  const pw = 46;
  const units = [
    { x: pw, w: 536, fill: MOSS, fascia: 0.17, awning: true },
    { x: pw + 536 + pw, w: 590, fill: TERRACOTTA, fascia: 0.23, recessed: true },
    { x: pw + 536 + pw + 590 + pw, w: 490, fill: INK, fascia: 0.2 },
  ];
  const pilasterXs = [0, pw + 536, pw + 536 + pw + 590, W - pw];

  // ground-floor stone behind everything
  s.rect(0, shopTop, W, shopH, STONE);

  for (const u of units) {
    const { x, w, fill } = u;
    const fh = shopH * u.fascia;
    const sh = shopH * 0.16;
    s.shopfront(x, shopTop, w, shopH, { fascia: u.fascia, stallriser: 0.16, fill, pilaster: 20 });
    const glassTint = fill === INK ? 0.2 : 0.06; // glass must read against a dark-painted frame
    s.rect(x + 20, shopTop + fh, w - 40, shopH - fh - sh, STONE, { opacity: glassTint });
    // fascia panel moulding
    s.rect(x + 16, shopTop + 14, w - 32, fh - 28, fill);
    s.light(x + 16, shopTop + 14, w - 32, fh - 28, 0.05);
    s.line(x + 16, shopTop + 14, x + w - 16, shopTop + 14, {
      color: PAPER,
      opacity: 0.18,
      weight: 2,
    });
    s.line(x + 16, shopTop + fh - 14, x + w - 16, shopTop + fh - 14, { opacity: 0.35, weight: 2 });
    // stallriser panels
    const srY = ground - sh;
    const panels = Math.max(2, Math.round(w / 160));
    const pwid = (w - 40) / panels;
    for (let i = 0; i < panels; i++) {
      s.shade(x + 20 + i * pwid + 10, srY + 16, pwid - 20, sh - 32, 0.12);
      s.light(x + 20 + i * pwid + 10, srY + 16, pwid - 20, 4, 0.2);
    }
    // glazing bars: a vertical mullion in each unit
    const gTop = shopTop + fh,
      gBot = srY;
    const gH = gBot - gTop;
    const transomY = gTop + gH * 0.22;
    // door
    const dw = 128;
    if (u.recessed) {
      // recessed doorway: a shaded slot on the right of the window, door set back in it
      const dx = x + w - 20 - dw - 40;
      s.rect(dx - 20, gTop, dw + 60, gH + sh, fill); // frame surround in the shop colour
      s.rect(dx, gTop, dw + 20, gH + sh, INK, { opacity: 0.55 }); // the slot
      s.shade(dx, gTop, dw + 20, gH + sh, 0.2);
      s.shade(dx, gTop, 26, gH + sh, 0.25); // left return deeper
      s.light(dx + dw, gTop, 20, gH + sh, 0.06); // right return catching a little light
      // door at the back of the slot
      s.rect(dx + 26, transomY + 6, dw - 32, gBot + sh - transomY - 6, fill, { opacity: 0.9 });
      s.shade(dx + 26, transomY + 6, dw - 32, gBot + sh - transomY - 6, 0.25);
      s.rect(dx + 26 + (dw - 32) / 2 - 1.5, transomY + 6, 3, gBot + sh - transomY - 6, PAPER, {
        opacity: 0.25,
      });
      s.rect(dx + 40, transomY + 20, dw - 60, 120, INK, { opacity: 0.6 }); // door glazing
      s.light(dx + 43, transomY + 23, dw - 66, 44, 0.12);
      // fanlight over the recess
      s.rect(dx + 26, gTop + 8, dw - 32, transomY - gTop - 14, INK, { opacity: 0.5 });
      // threshold step in stone
      s.rect(dx, gBot + sh - 10, dw + 20, 10, STONE);
      s.shade(dx, gBot + sh - 10, dw + 20, 10, 0.1);
    } else {
      const dx = u.awning ? x + w - 20 - dw : x + 20;
      s.rect(dx - 6, gTop, dw + 12, gH + sh, fill); // door surround
      s.rect(dx, transomY + 6, dw, gBot + sh - transomY - 6, fill);
      s.shade(dx, transomY + 6, dw, gBot + sh - transomY - 6, 0.18);
      s.rect(dx + 14, transomY + 20, dw - 28, 150, INK, { opacity: 0.75 }); // door glazing
      s.rect(dx + 14, transomY + 20, dw - 28, 150, STONE, { opacity: glassTint });
      s.light(dx + 17, transomY + 23, dw - 34, 56, 0.12);
      s.shade(dx + 14, gBot + sh - 120, dw - 28, 80, 0.14); // kick panel
      s.rect(dx + dw - 30, transomY + 200, 8, 8, PAPER, { opacity: 0.6 }); // handle
      s.rect(dx, gTop + 8, dw, transomY - gTop - 14, INK, { opacity: 0.8 }); // fanlight
      s.rect(dx, gTop + 8, dw, transomY - gTop - 14, STONE, { opacity: glassTint });
      s.light(dx + 3, gTop + 11, dw - 6, (transomY - gTop - 14) * 0.5, 0.12);
      // mullion splitting the remaining glazing
      const gl = u.awning ? x + 20 : dx + dw + 6;
      const gr = u.awning ? dx - 6 : x + w - 20;
      const mid = (gl + gr) / 2;
      s.rect(mid - 4, gTop, 8, gH, fill);
      s.shade(mid - 4, gTop, 8, gH, 0.15);
    }
    // a hint of interior: window display shelves as light bands low in the glazing
    const gl = x + 20,
      gr = x + w - 20;
    s.light(gl, gBot - 90, gr - gl, 3, 0.14);
    // dado shadow under the fascia return
    s.shade(x, gTop, w, 10, 0.18);
  }

  // stone pilasters between and beside the units
  for (const px of pilasterXs) {
    s.rect(px, shopTop, pw, shopH, SANDSTONE);
    s.light(px, shopTop, pw, shopH, 0.12);
    s.shade(px + pw - 8, shopTop, 8, shopH, 0.18); // right return
    s.light(px, shopTop, 6, shopH, 0.25); // left arris catching light
    // capital and base blocks
    s.rect(px - 4, shopTop, pw + 8, 34, SANDSTONE);
    s.light(px - 4, shopTop, pw + 8, 34, 0.2);
    s.shade(px - 4, shopTop + 34, pw + 8, 8, 0.2);
    s.rect(px - 4, ground - 60, pw + 8, 60, SANDSTONE);
    s.shade(px - 4, ground - 60, pw + 8, 60, 0.1);
    s.light(px - 4, ground - 60, pw + 8, 5, 0.25);
    // console bracket under the cornice
    s.poly(
      [
        [px + 6, shopTop - 8],
        [px + pw - 6, shopTop - 8],
        [px + pw - 12, shopTop + 30],
        [px + 12, shopTop + 30],
      ],
      SANDSTONE,
    );
    s.shade(px + 6, shopTop - 8, pw - 12, 38, 0.14);
  }

  // ---- awning over the moss unit: a shallow triangle band ----
  {
    const u = units[0];
    const fh = shopH * u.fascia;
    const ay = shopTop + fh + 4;
    const ax = u.x + 6,
      aw = u.w - 12,
      ad = 70;
    s.poly(
      [
        [ax, ay],
        [ax + aw, ay],
        [ax + aw - 28, ay + ad],
        [ax + 28, ay + ad],
      ],
      MOSS,
    );
    s.shade(ax, ay, aw, ad, 0.1);
    s.light(ax, ay, aw, 8, 0.2); // top edge catching light
    // valance of small triangles along the lower edge
    const vn = 12,
      vw = (aw - 56) / vn;
    for (let i = 0; i < vn; i++) {
      const vx = ax + 28 + i * vw;
      s.poly(
        [
          [vx, ay + ad],
          [vx + vw, ay + ad],
          [vx + vw / 2, ay + ad + 22],
        ],
        MOSS,
      );
    }
    // shadow cast by the awning onto the glazing
    s.shade(u.x + 20, ay + ad, u.w - 40, 60, 0.16);
    // awning arms
    s.line(ax + 28, ay + ad, ax + 6, ay + 2, { opacity: 0.35, weight: 2 });
    s.line(ax + aw - 28, ay + ad, ax + aw - 6, ay + 2, { opacity: 0.35, weight: 2 });
  }

  // ---- projecting sign bracket on the pilaster between units 2 and 3 ----
  {
    const px = pilasterXs[1] + pw / 2;
    const by = shopTop + 50;
    s.line(px, by, px + 150, by, { opacity: 0.85, weight: 4 }); // arm
    s.line(px, by + 80, px + 100, by, { opacity: 0.85, weight: 3 }); // brace
    s.line(px + 120, by, px + 120, by + 24, { opacity: 0.85, weight: 3 }); // hanger
    s.circle(px + 120, by + 30, 5, INK, { opacity: 0.85 });
    // hanging sign board, blank, in terracotta with an ink border
    s.rect(px + 78, by + 34, 84, 70, INK, { opacity: 0.85 });
    s.rect(px + 82, by + 38, 76, 62, MOSS);
    s.light(px + 82, by + 38, 76, 20, 0.12);
  }

  // ---- pavement with kerb ----
  s.pavement(ground, { depth: 110, kerb: false });
  // flagstone joints
  for (let cx = 60; cx < W; cx += 180) s.line(cx, ground, cx + 40, H, { opacity: 0.08 });
  s.line(0, ground + 60, W, ground + 60, { opacity: 0.08 });
  // shadow line at the foot of the buildings
  s.shade(0, ground, W, 14, 0.14);
  // kerb along the bottom edge
  s.rect(0, H - 34, W, 34, STONE);
  s.light(0, H - 34, W, 34, 0.35);
  s.rect(0, H - 34, W, 4, INK, { opacity: 0.22 });
  s.shade(0, H - 8, W, 8, 0.25);

  // soft daylight gradient: the top of the frame a touch lighter
  s.light(0, 0, W, corniceY, 0.08);
  // white paint hint on window frames of the shopfronts is already in the primitive; a small white pigeon-proof
  // detail is not needed. Keep the palette clean.
  void WHITE;
  return s;
}
