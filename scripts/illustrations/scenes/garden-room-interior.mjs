import { Scene, SANDSTONE, INK, PAPER, STONE, MOSS } from '../toolkit.mjs';

/** Inside a timber-lined garden room, looking square-on through a fully glazed wall to lawn and terrace. */
export function gardenRoomInterior() {
  const s = new Scene({
    width: 1600,
    height: 1200,
    title: 'Garden room interior',
    description:
      'The inside of a single-storey timber-lined garden room seen square-on, with a wide glazed opening and clerestory looking out to a stone terrace, lawn and trees, a fixed bench along one wall and a small table.',
  });
  const W = s.w;
  const wallTop = 210,
    floorY = 920;
  const ox = 320,
    ow = 960,
    headY = 340; // main glazed opening
  const clY = 236,
    clH = 74; // clerestory
  const bar = 14;

  // ---- garden beyond, drawn first; the walls and frame are laid over it so nothing leaks ----
  const skyBottom = 600,
    lawnTop = 650,
    terraceTop = 800;
  s.rect(ox, wallTop, ow, floorY - wallTop, PAPER); // sky (also fills the clerestory)
  for (let i = 0; i < 5; i++)
    s.rect(ox, skyBottom - (i + 1) * 40, ow, 40, STONE, { opacity: 0.045 * (5 - i) });
  // tree canopies along the boundary: opaque moss, with a paler crown so they read as rounded masses
  const canopy = [
    [ox + 90, 540, 120],
    [ox + 250, 500, 140],
    [ox + 430, 560, 95],
    [ox + 600, 470, 160],
    [ox + 790, 530, 120],
    [ox + 930, 505, 135],
  ];
  for (const [cx, cy, r] of canopy) s.circle(cx, cy, r, MOSS);
  for (const [cx, cy, r] of canopy)
    s.circle(cx - r * 0.22, cy - r * 0.22, r * 0.62, PAPER, { opacity: 0.14 });
  for (const [cx, cy, r] of canopy)
    s.rect(cx - 9, cy + r * 0.5, 18, skyBottom - cy - r * 0.5 + 4, INK, { opacity: 0.35 }); // trunks
  // clipped hedge, then lawn
  s.rect(ox, skyBottom, ow, lawnTop - skyBottom, MOSS);
  s.shade(ox, skyBottom, ow, lawnTop - skyBottom, 0.3);
  s.rect(ox, lawnTop, ow, terraceTop - lawnTop, MOSS);
  s.light(ox, lawnTop, ow, 50, 0.16);
  s.light(ox, lawnTop + 50, ow, 50, 0.08);
  for (let y = lawnTop + 30; y < terraceTop; y += 30)
    s.line(ox, y, ox + ow, y, { color: PAPER, opacity: 0.05 }); // mown stripes
  // a clipped shrub either side of the lawn, for scale
  s.circle(ox + 150, terraceTop - 44, 62, MOSS);
  s.shade(ox + 150 - 62, terraceTop - 44, 124, 44, 0.2);
  s.circle(ox + ow - 170, terraceTop - 34, 74, MOSS);
  s.shade(ox + ow - 170 - 74, terraceTop - 34, 148, 34, 0.2);
  // stone terrace with paving joints
  s.rect(ox, terraceTop, ow, floorY - terraceTop, STONE);
  s.light(ox, terraceTop, ow, floorY - terraceTop, 0.18);
  for (let y = terraceTop + 40; y < floorY; y += 40) s.line(ox, y, ox + ow, y, { opacity: 0.12 });
  for (let x = ox + 120; x < ox + ow; x += 240) s.line(x, terraceTop, x, floorY, { opacity: 0.1 });
  s.shade(ox, terraceTop, ow, 6, 0.14); // lawn edge
  // glass tint and pale reflection bands high in each pane
  s.light(ox, headY, ow, floorY - headY, 0.06);
  for (let i = 0; i < 4; i++)
    s.light(ox + i * 240 + bar + 6, headY + 10, 240 - bar - 12, 100, 0.16);

  // ---- ceiling: paper with a faint stone gradient towards the wall ----
  s.rect(0, 0, W, wallTop, PAPER);
  for (let i = 0; i < 6; i++)
    s.rect(0, wallTop - (i + 1) * 30, W, 30, STONE, { opacity: 0.07 * (6 - i) });
  s.shade(0, wallTop - 8, W, 8, 0.1); // soffit meeting wall

  // ---- floor: stone boards with faint lines ----
  s.rect(0, floorY, W, s.h - floorY, STONE);
  s.shade(0, floorY, W, s.h - floorY, 0.05);
  for (let x = 40; x < W; x += 96) s.line(x, floorY, x, s.h, { opacity: 0.12 });
  // spill of garden light across the floor, widening towards the viewer
  for (let i = 0; i < 3; i++) {
    const inset = 30 + i * 90,
      depth = (s.h - floorY) * (1 - i * 0.28);
    s.poly(
      [
        [ox + inset, floorY],
        [ox + ow - inset, floorY],
        [ox + ow - inset + 60, floorY + depth],
        [ox + inset - 60, floorY + depth],
      ],
      PAPER,
      { opacity: 0.07 },
    );
  }
  s.rect(0, floorY, W, 3, INK, { opacity: 0.2 }); // wall/floor junction

  // ---- timber-lined flank walls (drawn over the garden to mask the canopies) ----
  const timber = (x, y, w, h) => {
    s.rect(x, y, w, h, SANDSTONE);
    s.shade(x, y, w, h, 0.25);
    for (let bx = x + 11; bx < x + w; bx += 22)
      s.line(bx, y, bx, y + h, { color: PAPER, opacity: 0.15 });
  };
  timber(0, wallTop, ox - bar, floorY - wallTop);
  timber(ox + ow + bar, wallTop, W - ox - ow - bar, floorY - wallTop);
  timber(ox - bar, wallTop, ow + bar * 2, clY - bar - wallTop); // strip above the clerestory head
  // reveals: the inside faces of the timber either side of the opening
  s.shade(ox - bar - 28, wallTop, 28, floorY - wallTop, 0.16);
  s.light(ox + ow + bar, wallTop, 28, floorY - wallTop, 0.12);

  // ---- frames and glazing bars ----
  const mullionXs = [ox, ox + 240, ox + 480, ox + 720, ox + ow - bar];
  s.rect(ox - bar, clY - bar, ow + bar * 2, bar, INK); // clerestory head
  s.rect(ox - bar, clY, bar, clH, INK);
  s.rect(ox + ow, clY, bar, clH, INK);
  for (const mx of mullionXs.slice(1, 4)) s.rect(mx, clY, bar, clH, INK);
  s.rect(ox, clY + clH - 18, ow, 18, STONE, { opacity: 0.1 }); // faint haze at the base of the clerestory
  // deep transom between clerestory and main opening
  s.rect(ox - bar, clY + clH, ow + bar * 2, headY - clY - clH, INK);
  s.light(ox - bar, clY + clH, ow + bar * 2, 8, 0.18);
  // main opening: jambs, mullions, slim transom and threshold
  s.rect(ox - bar, headY, bar, floorY - headY, INK);
  s.rect(ox + ow, headY, bar, floorY - headY, INK);
  for (const mx of mullionXs.slice(1, 4)) s.rect(mx, headY, bar, floorY - headY, INK);
  s.rect(ox, headY + 320, ow, 8, INK, { opacity: 0.85 });
  s.rect(ox - bar, floorY - 12, ow + bar * 2, 12, INK);
  s.light(ox - bar, floorY - 12, ow + bar * 2, 3, 0.2);

  // ---- fixed timber bench along the left wall ----
  const bx = 30,
    bw = 250,
    seatY = floorY - 100;
  s.rect(bx, seatY + 30, bw - 12, floorY - seatY - 30, INK, { opacity: 0.55 }); // recessed void beneath the seat
  s.rect(bx + bw - 12, seatY + 30, 12, floorY - seatY - 30, SANDSTONE); // plinth end leg
  s.shade(bx + bw - 12, seatY + 30, 12, floorY - seatY - 30, 0.3);
  s.rect(bx, seatY, bw, 30, SANDSTONE); // seat
  s.light(bx, seatY, bw, 6, 0.4);
  s.shade(bx, seatY + 22, bw, 8, 0.12);
  s.shade(bx, seatY + 30, bw, 6, 0.22); // seat lip shadow
  s.shade(bx, floorY, bw + 40, 26, 0.12); // cast shadow on floor
  s.rect(bx + 24, seatY - 26, 130, 26, STONE); // loose cushion
  s.light(bx + 24, seatY - 26, 130, 5, 0.3);
  s.shade(bx + 24, seatY - 6, 130, 6, 0.08);

  // ---- simple table: top and pedestal ----
  const tx = 1020,
    tw = 240,
    ttop = floorY - 40,
    th = 150;
  s.shade(tx - 10, ttop + th - 10, tw + 20, 18, 0.08); // cast shadow
  s.rect(tx + tw / 2 - 16, ttop, 32, th, SANDSTONE); // pedestal
  s.shade(tx + tw / 2 - 16, ttop, 32, th, 0.35);
  s.rect(tx + tw / 2 - 70, ttop + th - 10, 140, 10, INK, { opacity: 0.7 }); // foot
  s.rect(tx, ttop, tw, 18, SANDSTONE); // top
  s.light(tx, ttop, tw, 6, 0.4);
  s.shade(tx, ttop + 18, tw, 8, 0.2);

  // ---- corners fall into shade so the glazed centre reads brightest ----
  s.shade(0, wallTop, 140, floorY - wallTop, 0.08);
  s.shade(W - 140, wallTop, 140, floorY - wallTop, 0.05);
  return s;
}
