import { Scene, SANDSTONE, INK, PAPER, STONE, MOSS } from '../toolkit.mjs';

/** Close-up of one restored painted-timber tenement shopfront, pavement to first-floor sill. */
export function shopfrontDetail() {
  const s = new Scene({
    width: 1200,
    height: 1500,
    title: 'Restored shopfront',
    description:
      'A painted timber tenement shopfront with a deep green fascia, two large panes, stone pilasters, a panelled stallriser and a recessed entrance with a tiled threshold.',
  });
  const W = s.w,
    H = s.h;
  const pave = H - 120; // bottom 8%

  // ---- vertical datums (top to bottom) ----
  const sillH = 30; // first-floor sill along the top edge
  const wallY = sillH,
    wallH = 84; // sandstone between sill and cornice
  const cornY = wallY + wallH,
    cornH = 34; // stone cornice
  const fasciaY = cornY + cornH,
    fasciaH = 210; // deep signage fascia
  const mouldY = fasciaY + fasciaH,
    mouldH = 40; // projecting cornice mould
  const frameY = mouldY + mouldH; // top of the shopfront frame
  const plinthH = 84;
  const plinthY = pave - plinthH;
  const stallH = 210;
  const stallY = plinthY - stallH;
  const headH = 22; // timber head rail under the mould
  const gTop = frameY + headH;
  const transomH = 150;

  // ---- horizontal datums ----
  const pilW = 96;
  const pilL = 22,
    pilR = W - pilW - 22;
  const innerL = pilL + pilW,
    innerR = pilR;
  const doorX = 790; // recess begins at the right third
  const mullionX = Math.round((innerL + doorX) / 2);

  // local helper: a stepped moulding (three rects) reading as a capital or console
  const steppedCap = (x, y, w, steps, dir = 1) => {
    // steps: [[outset, height], ...] from top down when dir = 1
    let cy = y;
    for (const [o, h] of steps) {
      s.rect(x - o, cy, w + o * 2, h, STONE);
      s.light(x - o, cy, w + o * 2, h, dir > 0 ? 0.3 : 0.1);
      s.shade(x - o, cy + h, w + o * 2, 6, 0.2);
      cy += h + 6;
    }
    return cy;
  };

  // ---- wall above: sill, ashlar and cornice ----
  s.rect(0, 0, W, cornY, SANDSTONE);
  // ashlar joints
  s.line(0, wallY + 42, W, wallY + 42, { color: STONE, opacity: 0.9, weight: 3 });
  for (let x = 90; x < W; x += 260)
    s.line(x, wallY, x, wallY + 42, { color: STONE, opacity: 0.9, weight: 3 });
  for (let x = 220; x < W; x += 260)
    s.line(x, wallY + 42, x, cornY, { color: STONE, opacity: 0.9, weight: 3 });
  s.shade(0, wallY, W, wallH, 0.04);
  // first-floor sill
  s.rect(0, 0, W, sillH, SANDSTONE);
  s.light(0, 0, W, sillH, 0.35);
  s.shade(0, sillH - 6, W, 6, 0.1);
  s.shade(0, sillH, W, 12, 0.18);
  // stone cornice above the fascia: two fillets and a cavetto in shade
  s.rect(0, cornY, W, cornH, SANDSTONE);
  s.light(0, cornY, W, 12, 0.4);
  s.rect(0, cornY + 12, W, 3, INK, { opacity: 0.12 });
  s.light(0, cornY + 15, W, 9, 0.15);
  s.shade(0, cornY + 24, W, cornH - 24, 0.14);

  // ---- fascia ----
  s.rect(0, fasciaY, W, fasciaH, MOSS);
  s.shade(0, fasciaY, W, 18, 0.26); // shadow cast by the stone cornice
  s.rect(0, fasciaY + 34, W, 3, PAPER, { opacity: 0.8 }); // upper moulding line
  s.rect(0, fasciaY + fasciaH - 37, W, 3, PAPER, { opacity: 0.8 }); // lower moulding line
  // console brackets over each pilaster, breaking the fascia lines
  const consoleW = pilW + 20;
  const consoleAt = (x) => {
    s.rect(x, fasciaY, consoleW, fasciaH, MOSS);
    s.light(x, fasciaY, consoleW, fasciaH, 0.06);
    s.light(x, fasciaY, 10, fasciaH, 0.16); // lit edge
    s.shade(x + consoleW - 12, fasciaY, 12, fasciaH, 0.2); // shaded return
    s.shade(x, fasciaY, consoleW, 18, 0.26);
    s.rect(x + 14, fasciaY + 34, consoleW - 28, 3, PAPER, { opacity: 0.5 });
    s.rect(x + 14, fasciaY + fasciaH - 37, consoleW - 28, 3, PAPER, { opacity: 0.5 });
  };
  consoleAt(pilL - 10);
  consoleAt(pilR - 10);

  // ---- projecting cornice mould beneath the fascia ----
  s.rect(0, mouldY, W, mouldH, MOSS);
  s.light(0, mouldY, W, 12, 0.32); // top fillet catching light
  s.rect(0, mouldY + 12, W, 5, PAPER, { opacity: 0.55 }); // paper bead
  s.shade(0, mouldY + 17, W, 9, 0.1);
  s.shade(0, mouldY + 26, W, mouldH - 26, 0.28); // underside
  s.shade(0, frameY, W, 30, 0.34); // deep shadow thrown onto the frame head

  // ---- shopfront frame ----
  s.rect(0, frameY, W, plinthY - frameY, MOSS);
  s.rect(0, frameY, pilL, plinthY - frameY, SANDSTONE); // slivers of wall beyond the pilasters
  s.rect(pilR + pilW, frameY, W - pilR - pilW, plinthY - frameY, SANDSTONE);
  s.shade(0, frameY, pilL, plinthY - frameY, 0.14);
  s.shade(pilR + pilW, frameY, W - pilR - pilW, plinthY - frameY, 0.14);
  s.shade(0, frameY, W, 30, 0.2);

  // ---- glazing: transom lights and two large panes ----
  const gx = innerL + 14,
    gw = doorX - 14 - gx;
  const gBot = stallY - 18;
  const gh = gBot - gTop;
  s.rect(gx, gTop, gw, gh, INK, { opacity: 0.85 });
  // reflection: a soft upper band and a diagonal flash of sky in each pane
  s.light(gx, gTop, gw, gh * 0.4, 0.1);
  const flash = (x0, x1, y0, y1) => {
    const w = x1 - x0,
      h = y1 - y0;
    s.poly(
      [
        [x0 + 12, y0 + 12],
        [x0 + w * 0.46, y0 + 12],
        [x0 + 12, y0 + h * 0.66],
      ],
      PAPER,
      { opacity: 0.08 },
    );
    s.poly(
      [
        [x0 + w * 0.46, y0 + 12],
        [x0 + w * 0.6, y0 + 12],
        [x0 + 12, y0 + h * 0.86],
        [x0 + 12, y0 + h * 0.66],
      ],
      PAPER,
      { opacity: 0.04 },
    );
  };
  flash(gx, mullionX, gTop + transomH, gBot);
  flash(mullionX, gx + gw, gTop + transomH, gBot);
  // transom lights a shade lighter
  s.light(gx, gTop, gw, transomH, 0.06);
  // transom rail
  s.rect(gx - 14, gTop + transomH, gw + 28, 24, MOSS);
  s.light(gx - 14, gTop + transomH, gw + 28, 6, 0.22);
  s.shade(gx - 14, gTop + transomH + 24, gw + 28, 12, 0.28);
  // slender central mullion below the transom, glazing bar above
  s.rect(mullionX - 8, gTop + transomH, 16, gh - transomH, MOSS);
  s.light(mullionX - 8, gTop + transomH, 5, gh - transomH, 0.22);
  s.shade(mullionX + 4, gTop + transomH, 4, gh - transomH, 0.28);
  s.rect(mullionX - 4, gTop, 8, transomH, MOSS);
  // glazing bead shadows
  s.shade(gx, gTop, gw, 10, 0.32);
  s.shade(gx, gTop, 8, gh, 0.24);
  s.shade(gx, gTop + transomH + 24, gw, 8, 0.2);
  // timber sill over the stallriser
  s.rect(gx - 14, gBot, gw + 28, 18, MOSS);
  s.light(gx - 14, gBot, gw + 28, 6, 0.24);
  s.shade(gx - 14, gBot + 18, gw + 28, 10, 0.2);

  // ---- stallriser with raised panels (one under each pane) ----
  s.rect(innerL, stallY, doorX - innerL, stallH, MOSS);
  const panel = (x, w) => {
    const py = stallY + 34,
      ph = stallH - 68;
    s.light(x, py, w, ph, 0.12);
    s.light(x, py, w, 7, 0.2); // top bevel lit
    s.light(x, py, 7, ph, 0.16); // left bevel lit
    s.shade(x + w - 7, py, 7, ph, 0.2); // right bevel shaded
    s.shade(x, py + ph - 7, w, 7, 0.24); // bottom bevel shaded
    s.shade(x - 6, py - 6, w + 12, 4, 0.14); // rebate shadow above
  };
  panel(innerL + 30, mullionX - 22 - innerL - 30);
  panel(mullionX + 22, doorX - 30 - mullionX - 22);

  // ---- recessed entrance on the right ----
  const rx = doorX,
    rw = innerR - doorX;
  const revL = 62,
    revR = 26; // visible reveals: deep on the left, sliver on the right
  const dx = rx + revL,
    doorW = rw - revL - revR;
  const recessTop = gTop;
  // recess back wall in shadow
  s.rect(rx, recessTop, rw, pave - recessTop, MOSS);
  s.shade(rx, recessTop, rw, pave - recessTop, 0.22);
  // soffit: a band in deep shade with a lit fillet at the front edge
  s.shade(rx, recessTop, rw, 28, 0.3);
  s.rect(rx, recessTop, rw, 6, PAPER, { opacity: 0.12 });
  // left reveal: painted timber return, deeply shaded, with a lit arris
  s.rect(rx, recessTop, revL, pave - recessTop, MOSS);
  s.shade(rx, recessTop, revL, pave - recessTop, 0.34);
  s.light(rx, recessTop, 6, pave - recessTop, 0.18);
  s.shade(rx + revL - 10, recessTop, 10, pave - recessTop, 0.15);
  // right reveal catching a little light
  s.rect(rx + rw - revR, recessTop, revR, pave - recessTop, MOSS);
  s.shade(rx + rw - revR, recessTop, revR, pave - recessTop, 0.1);
  s.shade(rx + rw - revR, recessTop, 4, pave - recessTop, 0.3);
  // door frame
  const frameW = 12;
  const fanY = recessTop + 34,
    fanH = transomH - 34;
  const doorTop = fanY + fanH + 24;
  const thrH = 58; // tiled threshold depth
  const doorBot = pave - thrH;
  s.rect(dx, fanY - frameW, doorW, doorBot - fanY + frameW, MOSS);
  s.light(dx, fanY - frameW, doorW, doorBot - fanY + frameW, 0.05);
  // fanlight
  s.rect(dx + frameW, fanY, doorW - frameW * 2, fanH, INK, { opacity: 0.85 });
  s.light(dx + frameW, fanY, doorW - frameW * 2, fanH * 0.5, 0.12);
  s.poly(
    [
      [dx + frameW + 8, fanY + 8],
      [dx + doorW * 0.45, fanY + 8],
      [dx + frameW + 8, fanY + fanH - 12],
    ],
    PAPER,
    { opacity: 0.08 },
  );
  s.shade(dx + frameW, fanY, doorW - frameW * 2, 8, 0.3);
  s.rect(dx + doorW / 2 - 3, fanY, 6, fanH, MOSS); // glazing bar
  // transom over the door, aligned with the shop transom rail
  s.rect(dx, fanY + fanH, doorW, 24, MOSS);
  s.light(dx, fanY + fanH, doorW, 6, 0.2);
  s.shade(dx, fanY + fanH + 24, doorW, 10, 0.28);
  // the door leaf
  const dh = doorBot - doorTop;
  const lx = dx + frameW,
    lw = doorW - frameW * 2;
  s.rect(lx, doorTop, lw, dh, MOSS);
  s.shade(lx, doorTop, lw, dh, 0.06);
  s.shade(lx, doorTop, lw, 8, 0.3); // head shadow
  s.shade(lx, doorTop, 6, dh, 0.22); // hinge stile in shade
  // glazed upper panel
  const px = lx + 26,
    pw = lw - 52;
  const gpY = doorTop + 26,
    gpH = dh * 0.46;
  s.shade(px - 5, gpY - 5, pw + 10, gpH + 10, 0.14); // rebate
  s.rect(px, gpY, pw, gpH, INK, { opacity: 0.82 });
  s.light(px, gpY, pw, gpH * 0.45, 0.12);
  s.poly(
    [
      [px + 6, gpY + 6],
      [px + pw * 0.5, gpY + 6],
      [px + 6, gpY + gpH * 0.6],
    ],
    PAPER,
    { opacity: 0.08 },
  );
  // mid rail with letter-plate slot
  const midY = gpY + gpH + 24;
  s.rect(px, midY + 18, pw * 0.5, 8, INK, { opacity: 0.35 });
  // raised lower panel
  const lpY = midY + 54,
    lpH = doorBot - 26 - lpY;
  s.light(px, lpY, pw, lpH, 0.12);
  s.light(px, lpY, pw, 6, 0.2);
  s.light(px, lpY, 6, lpH, 0.14);
  s.shade(px + pw - 6, lpY, 6, lpH, 0.2);
  s.shade(px, lpY + lpH - 6, pw, 6, 0.24);
  // door furniture: knob and escutcheon
  s.circle(lx + lw - 30, midY + 22, 9, INK, { opacity: 0.75 });
  s.circle(lx + lw - 33, midY + 19, 3.5, PAPER, { opacity: 0.45 });
  s.rect(lx + lw - 34, midY + 44, 8, 14, INK, { opacity: 0.4 });
  // tiled threshold: STONE/PAPER chequer across the recess floor, foreshortened
  const tile = 22;
  const tX = rx + revL - 6,
    tW = doorW + 12;
  const tY = doorBot,
    tH = thrH;
  s.rect(tX, tY, tW, tH, STONE);
  for (let r = 0; r * (tile * 0.55) < tH; r++) {
    const rh = Math.min(tile * 0.55, tH - r * tile * 0.55);
    for (let c = 0; c * tile < tW; c++) {
      if ((r + c) % 2) continue;
      const w = Math.min(tile, tW - c * tile);
      s.rect(tX + c * tile, tY + r * tile * 0.55, w, rh, PAPER);
    }
  }
  s.shade(tX, tY, tW, tH, 0.1);
  s.shade(tX, tY, tW, 6, 0.24); // door bottom shadow
  s.shade(tX, tY + tH - 4, tW, 4, 0.12);
  // reveal returns at threshold level
  s.rect(rx, tY, revL - 6, tH, MOSS);
  s.shade(rx, tY, revL - 6, tH, 0.34);
  s.rect(rx + rw - revR, tY, revR, tH, MOSS);
  s.shade(rx + rw - revR, tY, revR, tH, 0.14);

  // ---- granite plinth (stops at the recess) ----
  s.rect(0, plinthY, doorX, plinthH, INK, { opacity: 0.35 });
  s.rect(innerR, plinthY, W - innerR, plinthH, INK, { opacity: 0.35 });
  s.light(0, plinthY, doorX, 6, 0.2);
  s.light(innerR, plinthY, W - innerR, 6, 0.2);
  s.shade(0, plinthY + plinthH - 12, doorX, 12, 0.22);
  s.shade(innerR, plinthY + plinthH - 12, W - innerR, 12, 0.22);
  s.line(mullionX, plinthY + 6, mullionX, plinthY + plinthH - 12, { opacity: 0.22, weight: 2 });
  s.line(pilL - 8, plinthY + 6, pilL - 8, plinthY + plinthH - 12, { opacity: 0.22, weight: 2 });
  s.line(pilR + pilW + 8, plinthY + 6, pilR + pilW + 8, plinthY + plinthH - 12, {
    opacity: 0.22,
    weight: 2,
  });
  // plinth return into the recess on the left reveal
  s.rect(rx, plinthY, 10, plinthH - thrH, INK, { opacity: 0.35 });

  // ---- stone pilasters, drawn last so they sit proud of everything ----
  const pilaster = (x) => {
    const y0 = frameY,
      y1 = plinthY - 30;
    s.rect(x, y0, pilW, y1 - y0, STONE);
    s.light(x, y0, pilW, y1 - y0, 0.2);
    s.light(x, y0, 10, y1 - y0, 0.24); // arris catching light
    s.shade(x + pilW - 14, y0, 14, y1 - y0, 0.12); // return in shade
    s.shade(x, y0, pilW, 8, 0.2);
    // capital: three stepped rects
    steppedCap(x, y0 + 8, pilW, [
      [16, 22],
      [9, 16],
      [3, 12],
    ]);
    // base: two steps rising out of the plinth
    s.rect(x - 8, plinthY - 30, pilW + 16, 30, STONE);
    s.light(x - 8, plinthY - 30, pilW + 16, 6, 0.3);
    s.shade(x - 8, plinthY - 30, pilW + 16, 30, 0.06);
    s.rect(x - 14, plinthY - 12, pilW + 28, 12, STONE);
    s.shade(x - 14, plinthY - 12, pilW + 28, 12, 0.12);
    s.shade(x - 14, plinthY, pilW + 28, 6, 0.2);
  };
  pilaster(pilL);
  pilaster(pilR);

  // ---- pavement ----
  s.rect(0, pave, W, H - pave, STONE);
  s.shade(0, pave, W, H - pave, 0.06);
  s.rect(0, pave, W, 6, INK, { opacity: 0.24 });
  s.shade(0, pave + 6, W, 14, 0.08); // shadow at the foot of the plinth
  for (let x = 160; x < W; x += 300) s.line(x, pave + 6, x, H, { opacity: 0.12, weight: 2 });
  s.rect(0, pave + 66, W, 2, INK, { opacity: 0.12 });
  // recess floor shadow spilling onto the pavement
  s.shade(rx + revL - 6, pave, doorW + 12, 10, 0.1);
  return s;
}
