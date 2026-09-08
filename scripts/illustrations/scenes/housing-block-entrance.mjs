import { Scene, PAPER, INK, STONE, MOSS, SANDSTONE, WHITE } from '../toolkit.mjs';

/** Entrance of an upgraded four-storey post-war walk-up block, square-on: rendered walls, new window grid, stair tower, canopy, ramp, bin store. */
export function housingBlockEntrance() {
  const s = new Scene({
    width: 1600,
    height: 1000,
    title: 'Housing block entrance',
    description:
      'The entrance of a four-storey post-war walk-up housing block after upgrade, with freshly rendered walls, a regular grid of new windows either side of a central stair tower, a canopied door with a ramp, a grass strip, a path and a bin store.',
  });
  const u = 50; // px per metre
  const ground = 790;
  const storey = 2.75 * u;
  const eaves = ground - 4 * storey; // 240
  const cx = s.w / 2;

  s.overcast(eaves + 40);

  // ---- new pitched roof: shallow slope seen square-on, rising to a ridge ----
  const overhang = 22;
  const roofH = 120;
  s.rect(-40, eaves - 30 - roofH, s.w + 80, roofH, INK, { opacity: 0.44 }); // slate plane
  for (let ry = eaves - 30 - roofH + 14; ry < eaves - 34; ry += 14)
    s.line(-40, ry, s.w + 40, ry, { color: PAPER, opacity: 0.12 });
  s.rect(-40, eaves - 30 - roofH, s.w + 80, 5, PAPER, { opacity: 0.4 }); // ridge capping
  s.light(-40, eaves - 30 - roofH, s.w + 80, roofH * 0.35, 0.08); // sky catching the upper slope
  s.rect(-40, eaves - 30, s.w + 80, 22, INK, { opacity: 0.5 }); // fascia / eaves edge
  s.rect(-40, eaves - 30, s.w + 80, 3, PAPER, { opacity: 0.3 });
  s.rect(-40, eaves - 8, s.w + 80, 8, INK, { opacity: 0.7 }); // gutter
  // stair tower rises through the roof with its own small hipped cap
  const tw = 3.4 * u;
  const tx = cx - tw / 2;
  const capY = eaves - 30 - roofH - 46;
  s.poly(
    [
      [tx - 14, capY + 46],
      [tx + tw + 14, capY + 46],
      [tx + tw - 10, capY],
      [tx + 10, capY],
    ],
    INK,
    { opacity: 0.6 },
  );
  s.rect(tx + 10, capY, tw - 20, 4, PAPER, { opacity: 0.3 });
  s.rect(tx - 14, capY + 40, tw + 28, 8, INK, { opacity: 0.7 });
  // ---- rendered elevation ----
  s.rect(0, eaves, s.w, ground - eaves, STONE);
  s.light(0, eaves, s.w, ground - eaves, 0.4);
  s.shade(0, eaves, s.w, overhang, 0.14); // shadow under eaves
  // very faint render panel joints between window bays
  const bay = 3.6 * u;
  const bays = [1, 2, 3]; // bays each side of the tower
  const winW = 1.6 * u,
    winH = 1.5 * u;
  const sillDrop = 0.95 * u;
  for (let f = 0; f < 4; f++) {
    const wy = ground - (f + 1) * storey + sillDrop;
    for (const b of bays) {
      for (const dir of [-1, 1]) {
        const wx = cx + dir * (tw / 2 + b * bay - bay / 2) - winW / 2;
        s.window(wx, wy, winW, winH, { reveal: 6 });
      }
    }
  }
  // movement joints in the render at the bay lines (very light)
  for (const b of [0.5, 1.5, 2.5, 3.5])
    for (const dir of [-1, 1]) {
      const jx = cx + dir * (tw / 2 + b * bay);
      s.line(jx, eaves + overhang, jx, ground, { opacity: 0.06 });
    }

  // ---- stair tower ----
  const tTop = capY + 48;
  s.rect(tx, tTop, tw, ground - tTop, STONE);
  s.light(tx, tTop, tw, ground - tTop, 0.3);
  s.shade(tx, tTop, tw, 14, 0.14); // shadow under the cap
  s.shade(tx, tTop, 10, ground - tTop, 0.1); // left return shading (tower projects slightly)
  s.shade(tx - 8, eaves, 8, ground - eaves, 0.16); // shadow cast onto the left wall
  s.light(tx + tw - 8, tTop, 8, ground - tTop, 0.2);
  s.line(tx, tTop, tx, ground, { opacity: 0.25 });
  s.line(tx + tw, tTop, tx + tw, ground, { opacity: 0.25 });
  // vertical strip of landing windows (half-landing height, between floors)
  const lw = 0.9 * u,
    lh = 1.3 * u;
  for (let f = 0; f < 4; f++) {
    const ly = ground - (f + 0.5) * storey - lh / 2 - 0.2 * u;
    s.shade(cx - lw / 2 - 6, ly - 6, lw + 12, lh + 6, 0.22);
    s.rect(cx - lw / 2, ly, lw, lh, INK, { opacity: 0.82 });
    s.light(cx - lw / 2 + 3, ly + 3, lw - 6, lh * 0.42, 0.1);
    s.rect(cx - lw / 2, ly + lh / 2 - 2, lw, 4, PAPER, { opacity: 0.85 });
    s.rect(cx - lw / 2 - 10, ly + lh, lw + 20, 6, SANDSTONE);
    s.light(cx - lw / 2 - 10, ly + lh, lw + 20, 6, 0.35);
    s.shade(cx - lw / 2 - 10, ly + lh + 6, lw + 20, 5, 0.18);
  }

  // ---- entrance: canopy, door, number plate ----
  const dW = 1.4 * u,
    dH = 2.2 * u;
  const dx = cx - dW / 2,
    dy = ground - dH;
  const canY = dy - 0.55 * u,
    canH = 0.28 * u,
    canX = tx - 0.6 * u,
    canW = tw + 1.2 * u;
  // shadow band beneath the canopy
  s.shade(canX + 6, canY + canH, canW - 12, 0.55 * u, 0.2);
  s.shade(canX + 6, canY + canH, canW - 12, 0.2 * u, 0.15);
  // door reveal and door
  s.shade(dx - 10, dy - 10, dW + 20, dH + 10, 0.24);
  s.rect(dx, dy, dW, dH, MOSS);
  s.rect(dx + 8, dy + 10, dW - 16, dH * 0.52, INK, { opacity: 0.82 }); // glazed panel
  s.light(dx + 11, dy + 13, dW - 22, dH * 0.22, 0.14);
  s.rect(dx + dW / 2 - 1.5, dy + 10, 3, dH * 0.52, MOSS); // glazing bar
  s.rect(dx + dW - 22, dy + dH * 0.62, 5, 0.5 * u, WHITE, { opacity: 0.8 }); // pull handle
  s.shade(dx, dy + dH * 0.62 + 10, dW, 4, 0.2); // kick-plate line
  s.rect(dx, dy + dH - 14, dW, 14, INK, { opacity: 0.35 }); // kick plate
  // glazed side panel to the right of the door
  const spX = dx + dW + 10,
    spW = 0.55 * u;
  s.shade(spX - 6, dy - 10, spW + 12, dH + 10, 0.24);
  s.rect(spX, dy, spW, dH, INK, { opacity: 0.82 });
  s.light(spX + 3, dy + 3, spW - 6, dH * 0.35, 0.12);
  s.rect(spX, dy + dH * 0.62, spW, 4, PAPER, { opacity: 0.7 });
  // canopy itself (drawn after door so it sits proud)
  s.rect(canX, canY, canW, canH, INK, { opacity: 0.7 });
  s.rect(canX, canY, canW, 4, PAPER, { opacity: 0.3 }); // top edge catching light
  s.shade(canX, canY + canH - 5, canW, 5, 0.3); // underside edge
  // number plate: empty rectangle on the left jamb
  s.rect(dx - 0.62 * u, dy + 0.25 * u, 0.42 * u, 0.3 * u, WHITE);
  s.line(dx - 0.62 * u, dy + 0.25 * u, dx - 0.2 * u, dy + 0.25 * u, { opacity: 0.35 });
  s.line(dx - 0.62 * u, dy + 0.55 * u, dx - 0.2 * u, dy + 0.55 * u, { opacity: 0.35 });
  s.line(dx - 0.62 * u, dy + 0.25 * u, dx - 0.62 * u, dy + 0.55 * u, { opacity: 0.35 });
  s.line(dx - 0.2 * u, dy + 0.25 * u, dx - 0.2 * u, dy + 0.55 * u, { opacity: 0.35 });
  // wall light beside the door (small INK block)
  s.rect(spX + spW + 22, dy + 0.3 * u, 14, 20, INK, { opacity: 0.7 });

  // ---- rainwater pipe at the left tower junction and at the far right ----
  s.line(tx - 22, eaves - 4, tx - 22, ground, { weight: 5, opacity: 0.5 });
  s.line(tx - 22, eaves - 4, tx - 22, ground, { weight: 2, color: PAPER, opacity: 0.15 });
  s.line(s.w - 140, eaves - 4, s.w - 140, ground, { weight: 5, opacity: 0.5 });

  // ---- plinth ----
  s.rect(0, ground - 0.4 * u, s.w, 0.4 * u, INK, { opacity: 0.16 });
  s.shade(0, ground - 0.4 * u, s.w, 3, 0.1);

  // ---- ground: grass, path, ramp ----
  s.rect(0, ground, s.w, s.h - ground, MOSS);
  s.light(0, ground, s.w, s.h - ground, 0.12);
  // mown lines in the grass
  for (let gy = ground + 30; gy < s.h; gy += 44) s.rect(0, gy, s.w, 14, INK, { opacity: 0.05 });
  // level threshold apron and path leading to the viewer
  const pathTopW = 3.2 * u,
    pathBotW = 5.6 * u;
  s.poly(
    [
      [cx - pathTopW / 2, ground],
      [cx + pathTopW / 2, ground],
      [cx + pathBotW / 2, s.h],
      [cx - pathBotW / 2, s.h],
    ],
    STONE,
  );
  s.poly(
    [
      [cx - pathTopW / 2, ground],
      [cx + pathTopW / 2, ground],
      [cx + pathBotW / 2, s.h],
      [cx - pathBotW / 2, s.h],
    ],
    PAPER,
    { opacity: 0.15 },
  );
  // path edging
  s.poly(
    [
      [cx - pathTopW / 2, ground],
      [cx - pathTopW / 2 + 6, ground],
      [cx - pathBotW / 2 + 8, s.h],
      [cx - pathBotW / 2, s.h],
    ],
    INK,
    { opacity: 0.18 },
  );
  s.poly(
    [
      [cx + pathTopW / 2 - 6, ground],
      [cx + pathTopW / 2, ground],
      [cx + pathBotW / 2, s.h],
      [cx + pathBotW / 2 - 8, s.h],
    ],
    INK,
    { opacity: 0.18 },
  );
  // paving joints across the path
  for (let i = 1; i < 6; i++) {
    const t = i / 6;
    const y = ground + t * (s.h - ground);
    const hw = (pathTopW + (pathBotW - pathTopW) * t) / 2;
    s.line(cx - hw, y, cx + hw, y, { opacity: 0.12 });
  }
  // ramp at the left of the entrance, rising to the threshold along the wall
  const rampL = 3.2 * u,
    rampH = 0.32 * u;
  const rx = cx - pathTopW / 2 - rampL;
  s.poly(
    [
      [rx, ground],
      [cx - pathTopW / 2, ground - rampH],
      [cx - pathTopW / 2, ground],
      [cx - pathTopW / 2, ground + 0.5 * u],
      [rx, ground + 0.5 * u],
    ],
    STONE,
  );
  s.poly(
    [
      [rx, ground],
      [cx - pathTopW / 2, ground - rampH],
      [cx - pathTopW / 2, ground],
    ],
    STONE,
  );
  s.light(rx, ground, rampL, 0.5 * u, 0.1);
  s.shade(rx, ground + 0.5 * u - 6, rampL, 6, 0.2); // ramp kerb face
  s.poly(
    [
      [rx, ground],
      [cx - pathTopW / 2, ground - rampH],
      [cx - pathTopW / 2, ground - rampH + 6],
      [rx, ground + 6],
    ],
    INK,
    { opacity: 0.12 },
  ); // ramp top edge
  // level landing in front of the door
  s.rect(cx - pathTopW / 2, ground - rampH, pathTopW, rampH, STONE);
  s.light(cx - pathTopW / 2, ground - rampH, pathTopW, rampH, 0.25);
  s.shade(cx - pathTopW / 2, ground - 3, pathTopW, 3, 0.15);
  // handrail as thin INK lines: two rails and posts
  const railTop = 0.95 * u;
  const railPts = [
    [rx, ground],
    [cx - pathTopW / 2 - 6, ground - rampH],
  ];
  s.line(railPts[0][0], railPts[0][1] - railTop, railPts[1][0], railPts[1][1] - railTop, {
    weight: 4,
    opacity: 0.75,
  });
  s.line(
    railPts[0][0],
    railPts[0][1] - railTop * 0.55,
    railPts[1][0],
    railPts[1][1] - railTop * 0.55,
    { weight: 2.5, opacity: 0.6 },
  );
  for (let i = 0; i <= 3; i++) {
    const t = i / 3;
    const px = rx + t * (rampL - 6);
    const py = ground - t * rampH;
    s.line(px, py, px, py - railTop, { weight: 3, opacity: 0.75 });
  }
  s.line(cx - pathTopW / 2 - 6, ground - rampH - railTop, cx - pathTopW / 2 - 6, ground - rampH, {
    weight: 3,
    opacity: 0.75,
  });

  // ---- bin store: small dark slatted box, right foreground ----
  const bx = cx + pathBotW / 2 + 1.1 * u,
    by = ground + 0.9 * u,
    bw = 2.6 * u,
    bh = 1.25 * u;
  s.shade(bx - 10, by + bh - 4, bw + 40, 14, 0.18); // ground shadow
  s.rect(bx, by, bw, bh, INK, { opacity: 0.6 });
  s.rect(bx, by - 8, bw + 14, 8, INK, { opacity: 0.72 }); // lid
  s.rect(bx + bw, by, 14, bh, INK, { opacity: 0.75 }); // returned end
  for (let sy = by + 12; sy < by + bh - 6; sy += 12)
    s.line(bx + 4, sy, bx + bw - 4, sy, { color: PAPER, opacity: 0.22, weight: 2 });
  s.rect(bx + bw / 2 - 2, by, 4, bh, INK, { opacity: 0.5 }); // door split
  s.light(bx, by - 8, bw + 14, 3, 0.3); // lid edge catching light
  // low planting against the wall base either side of the bin store and at the left
  const shrub = (x, y, r) => {
    s.circle(x, y, r, MOSS);
    s.circle(x + r * 0.2, y - r * 0.15, r * 0.7, MOSS);
    s.rect(x - r, y, r * 2, r * 0.9, INK, { opacity: 0.16 });
    s.circle(x, y, r, INK, { opacity: 0.18 });
    s.circle(x - r * 0.25, y - r * 0.3, r * 0.5, PAPER, { opacity: 0.08 });
  };
  shrub(cx + pathTopW / 2 + 1.5 * u, ground + 0.15 * u, 0.42 * u);
  shrub(cx + pathTopW / 2 + 2.3 * u, ground + 0.22 * u, 0.5 * u);
  shrub(cx + pathTopW / 2 + 3.4 * u, ground + 0.12 * u, 0.38 * u);
  shrub(rx - 1.1 * u, ground + 0.18 * u, 0.46 * u);
  shrub(rx - 2.1 * u, ground + 0.12 * u, 0.4 * u);
  shrub(rx - 2.9 * u, ground + 0.2 * u, 0.5 * u);

  // low kerb at the bottom edge of the scene, edge of the footpath
  s.rect(0, s.h - 70, s.w, 70, STONE);
  s.light(0, s.h - 70, s.w, 70, 0.1);
  s.shade(0, s.h - 70, s.w, 5, 0.22);
  s.rect(0, s.h - 22, s.w, 22, INK, { opacity: 0.12 }); // kerb line at the frame edge
  for (let px = 40; px < s.w; px += 160) s.line(px, s.h - 65, px, s.h - 22, { opacity: 0.1 });

  // a faint atmospheric lift on the upper storeys
  s.light(0, 0, s.w, eaves + storey, 0.08);
  return s;
}
