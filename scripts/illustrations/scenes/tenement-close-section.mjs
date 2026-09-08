import { Scene, PAPER, INK, SANDSTONE, STONE, TERRACOTTA } from '../toolkit.mjs';

/** Sectional cut-away through a Glasgow tenement close: cut walls and floors in ink, dog-leg stair, landing windows and flat doors. */
export function tenementCloseSection() {
  const s = new Scene({
    width: 1200,
    height: 1500,
    title: 'Tenement close section',
    description:
      'A cross-section through a Glasgow tenement close showing the stair rising between four floors, flat doors on each landing, landing windows, the arched close mouth at street level and the pitched roof above.',
  });
  const W = s.w;
  const wall = 26,
    slab = 20,
    storey = 290,
    ink = 0.85;
  const ground = 1380; // top of the ground slab
  const bx = 80,
    bw = 1040; // building extents
  const shaftL = 400,
    shaftR = 800; // close shaft between the rooms
  const eaves = ground - 4 * storey; // 220
  const floorY = (i) => ground - i * storey;
  const apex = eaves - 170;

  // ---- local helpers --------------------------------------------------------
  /** Stepped flight from (x1,y1) low end to (x2,y2) high end, as a solid ink polygon with soffit. */
  const flight = (x1, y1, x2, y2, steps, thick = 62) => {
    const dx = (x2 - x1) / steps,
      dy = (y2 - y1) / steps;
    const pts = [[x1, y1]];
    for (let i = 0; i < steps; i++) {
      const x = x1 + dx * i;
      pts.push([x, y1 + dy * (i + 1)]); // riser up
      pts.push([x + dx, y1 + dy * (i + 1)]); // tread across
    }
    pts.push([x2, y2 + thick]);
    pts.push([x1 + Math.sign(dx) * thick * 0.9, y1]);
    s.poly(pts, INK, { opacity: ink });
    // soffit shade beneath the flight
    const soffit = [
      [x2, y2 + thick],
      [x1 + Math.sign(dx) * thick * 0.9, y1],
      [x1 + Math.sign(dx) * thick * 0.9, y1 + 26],
      [x2, y2 + thick + 26],
    ];
    s.poly(soffit, INK, { opacity: 0.16 });
    // nosings catch the light
    for (let i = 0; i < steps; i++) {
      const x = x1 + dx * i,
        y = y1 + dy * (i + 1);
      s.rect(Math.min(x, x + dx), y, Math.abs(dx), 4, PAPER, { opacity: 0.4 });
    }
  };
  /** Flat entrance door seen on the far wall of the close. */
  const flatDoor = (x, y, w, h) => {
    s.rect(x - 8, y - 8, w + 16, h + 8, PAPER); // clean ground behind the door
    s.rect(x - 8, y - 8, w + 16, h + 8, SANDSTONE, { opacity: 0.6 }); // architrave
    s.shade(x - 8, y - 8, w + 16, h + 8, 0.08);
    s.rect(x, y, w, h, INK, { opacity: 0.6 });
    s.rect(x + 8, y + 12, w - 16, h * 0.34, PAPER, { opacity: 0.12 }); // upper panel
    s.rect(x + 8, y + h * 0.52, w - 16, h * 0.42, PAPER, { opacity: 0.12 }); // lower panel
    s.rect(x + w - 14, y + h * 0.5, 5, 5, PAPER, { opacity: 0.6 }); // handle
    s.rect(x - 8, y + h, w + 16, 4, INK, { opacity: 0.25 }); // threshold
  };
  /** Semicircular-headed close mouth. */
  const closeMouth = (x, y, w, h) => {
    const r = w / 2;
    s.rect(x - 16, y - r - 16, w + 32, h + r + 16, SANDSTONE); // dressed surround
    s.circle(x + r, y, r + 16, SANDSTONE);
    s.rect(x, y, w, h, SANDSTONE);
    s.circle(x + r, y, r, SANDSTONE);
    s.shade(x, y, w, h, 0.42); // the passage beyond in shadow
    s.circle(x + r, y, r, INK, { opacity: 0.42 });
    s.rect(x - 16, y + h - 6, w + 32, 6, INK, { opacity: 0.3 }); // step
    // keystone and imposts
    s.rect(x + r - 10, y - r - 20, 20, 24, SANDSTONE);
    s.light(x + r - 10, y - r - 20, 20, 24, 0.35);
    (s.rect(x - 16, y - 6, 20, 8, SANDSTONE), s.light(x - 16, y - 6, 20, 8, 0.35));
    (s.rect(x + w - 4, y - 6, 20, 8, SANDSTONE), s.light(x + w - 4, y - 6, 20, 8, 0.35));
  };

  // ---- paper and ground ------------------------------------------------------
  s.sky(PAPER);
  // faint stone bands at the horizon behind the roof
  for (let i = 0; i < 5; i++)
    s.rect(0, apex - 40 - i * 34, W, 34, STONE, { opacity: 0.04 * (5 - i) });
  // earth below the ground slab
  s.rect(0, ground, W, s.h - ground, STONE);
  s.shade(0, ground, W, s.h - ground, 0.1);
  for (let y = ground + 44; y < s.h; y += 30) s.line(0, y, W, y, { opacity: 0.08 });
  // pavement either side of the building
  s.rect(0, ground - 12, bx, 12, STONE);
  s.rect(bx + bw, ground - 12, W - bx - bw, 12, STONE);
  s.rect(0, ground - 12, bx, 5, INK, { opacity: 0.2 });
  s.rect(bx + bw, ground - 12, W - bx - bw, 5, INK, { opacity: 0.2 });

  // ---- rooms and close shaft (fills behind the cut) --------------------------
  for (let i = 0; i < 4; i++) {
    const fy = floorY(i);
    s.rect(bx + wall, fy - storey, shaftL - bx - wall, storey, SANDSTONE, { opacity: 0.35 });
    s.rect(shaftR, fy - storey, bx + bw - wall - shaftR, storey, SANDSTONE, { opacity: 0.35 });
    // ceiling shade in each room
    s.shade(bx + wall, fy - storey, shaftL - bx - wall, 34, 0.07);
    s.shade(shaftR, fy - storey, bx + bw - wall - shaftR, 34, 0.07);
    // skirting shade where the floor meets the far wall
    s.shade(bx + wall, fy - slab - 10, shaftL - bx - wall, 10, 0.05);
    s.shade(shaftR, fy - slab - 10, bx + bw - wall - shaftR, 10, 0.05);
  }
  // close shaft far wall: cooler paper with a painted dado
  s.rect(shaftL, eaves, shaftR - shaftL, ground - eaves, STONE, { opacity: 0.22 });
  s.light(shaftL, eaves, shaftR - shaftL, ground - eaves, 0.3);
  for (let i = 0; i < 4; i++) {
    const fy = floorY(i);
    s.rect(shaftL, fy - 120, shaftR - shaftL, 120, STONE, { opacity: 0.35 }); // tiled dado
    s.rect(shaftL, fy - 124, shaftR - shaftL, 4, INK, { opacity: 0.22 }); // dado rail
  }

  // ---- close mouth at ground -------------------------------------------------
  closeMouth(shaftL + 14, ground - 210, 110, 210);

  // ---- landing windows on the rear wall and flat doors ------------------------
  for (let i = 0; i < 3; i++) {
    const half = floorY(i) - storey / 2;
    s.window(shaftR - 130, half - 236, 84, 176, { reveal: 8, lit: true });
  }
  // top storey has a window at landing level rather than a half landing
  s.window(shaftR - 130, floorY(3) - 256, 84, 176, { reveal: 8, lit: true });
  for (let i = 0; i <= 3; i++) {
    const fy = floorY(i);
    if (i > 0) flatDoor(shaftL + 22, fy - 196, 60, 196); // front flat
    if (i > 0) flatDoor(shaftL + 112, fy - 196, 60, 196); // back flat
  }

  // ---- stair: dog-leg rising through three storeys ---------------------------
  const halfW = 100,
    landW = 196;
  for (let i = 0; i < 3; i++) {
    const fy = floorY(i);
    const half = fy - storey / 2;
    const lowStartX = i === 0 ? shaftL + 150 : shaftL + landW;
    // lower flight: rises left to right up to the half landing at the rear wall
    flight(lowStartX, fy, shaftR - halfW, half, i === 0 ? 8 : 9);
    // half landing slab
    s.rect(shaftR - halfW, half, halfW, slab, INK, { opacity: ink });
    s.shade(shaftR - halfW, half + slab, halfW, 22, 0.16);
    // upper flight: rises right to left up to the next floor landing at the front
    flight(shaftR - halfW, half, shaftL + landW, fy - storey, 9);
    // balustrade on the upper flight
    s.poly(
      [
        [shaftR - halfW - 6, half - 62],
        [shaftL + landW, fy - storey - 62],
        [shaftL + landW, fy - storey - 57],
        [shaftR - halfW - 6, half - 57],
      ],
      INK,
      { opacity: 0.7 },
    );
    s.rect(shaftL + landW - 5, fy - storey - 62, 5, 62, INK, { opacity: 0.7 });
    // landing slab at the next floor across the front of the shaft
    s.rect(shaftL, fy - storey, landW, slab, INK, { opacity: ink });
    s.shade(shaftL, fy - storey + slab, landW, 22, 0.16);
    // balustrade: a thin ink rail following the lower flight and the half landing
    const railH = 62;
    s.poly(
      [
        [lowStartX + 6, fy - railH],
        [shaftR - halfW, half - railH],
        [shaftR - halfW, half - railH + 5],
        [lowStartX + 6, fy - railH + 5],
      ],
      INK,
      { opacity: 0.7 },
    );
    s.rect(shaftR - halfW, half - railH, halfW - 6, 5, INK, { opacity: 0.7 });
    s.rect(lowStartX + 6, fy - railH, 5, railH, INK, { opacity: 0.7 }); // newel
    s.rect(shaftR - halfW, half - railH, 5, railH, INK, { opacity: 0.7 }); // newel at the turn
  }
  // top landing balustrade across the front landing
  s.rect(shaftL + landW - 4, floorY(3) - 62, 5, 62, INK, { opacity: 0.7 });

  // ---- cut floor slabs (ink) through the rooms --------------------------------
  for (let i = 0; i <= 4; i++) {
    const fy = floorY(i);
    s.rect(bx, fy, shaftL - bx, slab, INK, { opacity: ink });
    s.rect(shaftR, fy, bx + bw - shaftR, slab, INK, { opacity: ink });
    // shadow under the slab
    s.shade(bx + wall, fy + slab, shaftL - bx - wall, 14, 0.14);
    s.shade(shaftR, fy + slab, bx + bw - wall - shaftR, 14, 0.14);
  }
  // ground slab under the whole building
  s.rect(bx - 20, ground, bw + 40, 30, INK, { opacity: ink });
  // party walls between the rooms and the close (thinner cut walls)
  s.rect(shaftL - 14, eaves, 14, ground - eaves, INK, { opacity: ink });
  s.rect(shaftR, eaves, 14, ground - eaves, INK, { opacity: ink });
  // outer walls, full height through the roof
  s.rect(bx, eaves - 20, wall, ground - eaves + 20, INK, { opacity: ink });
  s.rect(bx + bw - wall, eaves - 20, wall, ground - eaves + 20, INK, { opacity: ink });
  // window openings cut through the outer walls, one per storey
  for (let i = 0; i < 4; i++) {
    const fy = floorY(i);
    for (const wx of [bx, bx + bw - wall]) {
      s.rect(wx, fy - 236, wall, 170, PAPER);
      s.rect(wx + wall / 2 - 2, fy - 236, 4, 170, INK, { opacity: 0.55 }); // glass line
      s.rect(wx - 6, fy - 66, wall + 12, 8, INK, { opacity: ink }); // sill
      s.rect(wx - 6, fy - 244, wall + 12, 8, INK, { opacity: ink }); // lintel
    }
  }

  // ---- roof ---------------------------------------------------------------
  const rt = 26; // slate band thickness
  const ridge = [bx + bw / 2, apex];
  const slope = (eaves - rt - apex) / (bw / 2);
  s.poly(
    [
      [bx - 30, eaves - rt + 30 * slope],
      ridge,
      [bx + bw + 30, eaves - rt + 30 * slope],
      [bx + bw + 30, eaves + 30 * slope],
      [bx + bw / 2, apex + rt],
      [bx - 30, eaves + 30 * slope],
    ],
    INK,
    { opacity: ink },
  );
  // attic void below the slates, ceiling slab already cut at eaves level
  s.poly(
    [
      [bx + wall, eaves],
      [bx + bw / 2, apex + rt + 6],
      [bx + bw - wall, eaves],
    ],
    SANDSTONE,
    { opacity: 0.2 },
  );
  s.poly(
    [
      [bx + wall, eaves],
      [bx + bw / 2, apex + rt + 6],
      [bx + bw - wall, eaves],
    ],
    INK,
    { opacity: 0.06 },
  );
  // rooflight over the close, on the slope
  const rlX = bx + bw / 2 + 90,
    rlY = apex + (rlX - bx - bw / 2) * slope;
  s.poly(
    [
      [rlX, rlY - 12],
      [rlX + 90, rlY + 26 - 12],
      [rlX + 90, rlY + 26 + 30],
      [rlX, rlY + 30],
    ],
    PAPER,
    { opacity: 0.85 },
  );
  s.poly(
    [
      [rlX + 5, rlY - 4],
      [rlX + 85, rlY + 22 - 4],
      [rlX + 85, rlY + 22 + 22],
      [rlX + 5, rlY + 22],
    ],
    INK,
    { opacity: 0.8 },
  );
  s.poly(
    [
      [rlX + 9, rlY],
      [rlX + 81, rlY + 21],
      [rlX + 81, rlY + 30],
      [rlX + 9, rlY + 9],
    ],
    PAPER,
    { opacity: 0.3 },
  );
  // chimney stacks at the gables
  for (const cx of [bx - 8, bx + bw - wall - 8]) {
    s.rect(cx, apex + 30, wall + 16, eaves - apex - 30, INK, { opacity: ink });
    s.rect(cx - 5, apex + 30, wall + 26, 10, INK, { opacity: ink });
    s.rect(cx + 6, apex + 4, 10, 26, TERRACOTTA, { opacity: 0.9 });
    s.rect(cx + 26, apex + 4, 10, 26, TERRACOTTA, { opacity: 0.9 });
  }
  return s;
}
