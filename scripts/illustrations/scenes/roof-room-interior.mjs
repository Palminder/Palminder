import { Scene, SANDSTONE, INK, PAPER, STONE, TERRACOTTA, MOSS, WHITE } from '../toolkit.mjs';

/**
 * A bedroom made within a tenement roof, seen in one-point perspective: the gable wall ahead with a
 * small sash window, the coombed ceiling on the right with exposed rafters and two conservation
 * rooflights set between trimmed rafters, a low platform bed tucked under the slope and a boarded
 * floor with a rug lit from the rooflights.
 */
export function roofRoomInterior() {
  const s = new Scene({
    width: 1600,
    height: 1200,
    title: 'Roof room interior',
    description:
      'The inside of a bedroom formed within a tenement roof: a gable wall with a small sash window ahead, a sloping ceiling with exposed timber rafters and two rooflights on the right, a low platform bed with a mattress and folded blanket beneath the slope, and a boarded floor with a rug lit from the rooflights.',
  });

  // ---- perspective: coordinates are given on the picture plane (z = 0) and recede towards V ----
  const V = [760, 640];
  const E = 1500; // eye distance to the picture plane (px); a point z px beyond it scales by E / (E + z)
  const f = (z) => E / (E + z);
  const P = (x, y, z) => {
    const k = f(z);
    return [V[0] + (x - V[0]) * k, V[1] + (y - V[1]) * k];
  };
  const ZF = 1520; // depth of the far gable (about 4 m at 380 px/m)
  const ZN = -800; // planes are carried this far back towards the eye so the slope covers the top-right corner
  // room section on the picture plane
  const L = -50,
    FLOOR = 1260,
    CEIL = -40; // left wall, floor, flat ceiling
  const RIDGE = [640, CEIL]; // where the flat ceiling meets the slope
  const KNEE = [1700, 720]; // top of the short vertical wall
  const KX = KNEE[0];
  const S = (u) => [RIDGE[0] + (KNEE[0] - RIDGE[0]) * u, RIDGE[1] + (KNEE[1] - RIDGE[1]) * u]; // along the slope
  const sl = [KNEE[0] - RIDGE[0], KNEE[1] - RIDGE[1]];
  const slLen = Math.hypot(sl[0], sl[1]);
  const nrm = [-sl[1] / slLen, sl[0] / slLen]; // inward normal to the slope (down and to the left)
  const off = (p, d) => [p[0] + nrm[0] * d, p[1] + nrm[1] * d];
  const quad = (pts, fill, opacity = 1) => s.poly(pts, fill, { opacity });

  // ---- the six planes, far to near ----
  // flat ceiling strip beside the ridge
  quad([P(L, CEIL, ZN), P(RIDGE[0], CEIL, ZN), P(RIDGE[0], CEIL, ZF), P(L, CEIL, ZF)], PAPER);
  quad([P(L, CEIL, ZN), P(RIDGE[0], CEIL, ZN), P(RIDGE[0], CEIL, ZF), P(L, CEIL, ZF)], INK, 0.18);
  // left wall (away from the light)
  quad([P(L, CEIL, ZN), P(L, CEIL, ZF), P(L, FLOOR, ZF), P(L, FLOOR, ZN)], PAPER);
  quad([P(L, CEIL, ZN), P(L, CEIL, ZF), P(L, FLOOR, ZF), P(L, FLOOR, ZN)], INK, 0.13);
  // sloping ceiling: the brightest plane
  const slopePoly = [P(...RIDGE, ZN), P(...KNEE, ZN), P(...KNEE, ZF), P(...RIDGE, ZF)];
  quad(slopePoly, PAPER);
  quad(slopePoly, WHITE, 0.3);
  // knee wall
  const kneePoly = [P(KX, KNEE[1], ZN), P(KX, FLOOR, ZN), P(KX, FLOOR, ZF), P(KX, KNEE[1], ZF)];
  quad(kneePoly, PAPER);
  quad(kneePoly, INK, 0.09);
  // floor of stone boards running towards the gable
  const floorPoly = [P(L, FLOOR, ZN), P(KX, FLOOR, ZN), P(KX, FLOOR, ZF), P(L, FLOOR, ZF)];
  quad(floorPoly, STONE);
  let b = 0;
  for (let x = L; x < KX; x += 88, b++) {
    const x2 = Math.min(x + 88, KX);
    if (b % 2)
      quad([P(x, FLOOR, ZN), P(x2, FLOOR, ZN), P(x2, FLOOR, ZF), P(x, FLOOR, ZF)], INK, 0.035);
    const a = P(x, FLOOR, ZN),
      c = P(x, FLOOR, ZF);
    s.line(a[0], a[1], c[0], c[1], { opacity: 0.16 });
  }
  // a few board ends staggered across the floor
  for (const [x0, x1, z] of [
    [L + 88 * 3, L + 88 * 4, 300],
    [L + 88 * 6, L + 88 * 7, 760],
    [L + 88 * 5, L + 88 * 6, 1100],
    [L + 88 * 9, L + 88 * 10, 520],
    [L + 88 * 12, L + 88 * 13, 980],
    [L + 88 * 15, L + 88 * 16, 640],
    [L + 88 * 8, L + 88 * 9, -120],
    [L + 88 * 2, L + 88 * 3, -360],
    [L + 88 * 11, L + 88 * 12, -500],
  ]) {
    const a = P(x0, FLOOR, z),
      c = P(x1, FLOOR, z);
    s.line(a[0], a[1], c[0], c[1], { opacity: 0.2 });
  }
  // far gable wall: plain plaster, lit by the rooflights
  const far = (x, y) => P(x, y, ZF);
  const gable = [far(L, CEIL), far(...RIDGE), far(...KNEE), far(KX, FLOOR), far(L, FLOOR)];
  s.poly(gable, PAPER);
  s.poly(gable, WHITE, { opacity: 0.18 });
  const G = { l: far(L, CEIL)[0], r: far(KX, FLOOR)[0], floor: far(L, FLOOR)[1] };
  // skirtings
  const sk = 26;
  s.rect(G.l, G.floor - sk * f(ZF), G.r - G.l, sk * f(ZF), INK, { opacity: 0.28 });
  quad([P(L, FLOOR - sk, ZN), P(L, FLOOR, ZN), P(L, FLOOR, ZF), P(L, FLOOR - sk, ZF)], INK, 0.28);
  quad(
    [P(KX, FLOOR - sk, ZN), P(KX, FLOOR, ZN), P(KX, FLOOR, ZF), P(KX, FLOOR - sk, ZF)],
    INK,
    0.28,
  );
  // junction lines
  const edge = (a, c, o = 0.2) => s.line(a[0], a[1], c[0], c[1], { opacity: o, weight: 2 });
  edge(P(L, FLOOR, ZN), P(L, FLOOR, ZF), 0.3);
  edge(P(KX, FLOOR, ZN), P(KX, FLOOR, ZF), 0.3);
  edge(P(L, CEIL, ZN), P(L, CEIL, ZF), 0.14);
  edge(P(...RIDGE, ZN), P(...RIDGE, ZF), 0.14);
  edge(far(L, CEIL), far(...RIDGE), 0.14);
  edge(far(...RIDGE), far(...KNEE), 0.16);
  edge(far(...KNEE), far(KX, FLOOR), 0.16);
  edge(far(L, CEIL), far(L, FLOOR), 0.16);
  edge(far(L, FLOOR), far(KX, FLOOR), 0.3);

  // ---- small sash window in the gable ----
  const wx = 455,
    wy = 505,
    ww = 170,
    wh = 285;
  s.window(wx, wy, ww, wh, { reveal: 12, lit: true });
  s.rect(wx + 3, wy + 3, ww - 6, wh * 0.5 - 6, WHITE, { opacity: 0.3 }); // sky in the upper sash
  s.light(wx - 14, wy + wh + 14, ww + 28, 36, 0.2); // spill below the sill

  // ---- panelled door in the left wall, nearest the viewer ----
  const dz1 = 1000,
    dz2 = 1300,
    dTop = FLOOR - 800;
  const wallQ = (y1, y2, z1, z2, fill, o = 1) =>
    quad([P(L, y1, z1), P(L, y1, z2), P(L, y2, z2), P(L, y2, z1)], fill, o);
  wallQ(dTop - 24, FLOOR, dz1 - 22, dz2 + 22, PAPER); // architrave
  wallQ(dTop - 24, FLOOR, dz1 - 22, dz2 + 22, INK, 0.3);
  wallQ(dTop, FLOOR, dz1, dz2, PAPER); // leaf
  wallQ(dTop, FLOOR, dz1, dz2, INK, 0.2);
  for (const [y1, y2] of [
    [dTop + 60, dTop + 300],
    [dTop + 360, FLOOR - 70],
  ]) {
    for (const [z1, z2] of [
      [dz1 + 40, dz1 + 130],
      [dz2 - 130, dz2 - 40],
    ]) {
      wallQ(y1, y2, z1, z2, INK, 0.12);
      wallQ(y1 + 10, y2 - 10, z1 + 8, z2 - 8, PAPER, 0.35);
    }
  }
  wallQ(dTop + 330, dTop + 346, dz2 - 60, dz2 - 36, INK, 0.5); // knob

  // ---- wall plate along the top of the knee wall ----
  const WP = 40;
  quad(
    [
      P(KX - WP, KNEE[1] + 2, ZN),
      P(KX - WP, KNEE[1] + 2, ZF),
      P(KX - WP, KNEE[1] + 40, ZF),
      P(KX - WP, KNEE[1] + 40, ZN),
    ],
    SANDSTONE,
  );
  quad(
    [
      P(KX - WP, KNEE[1] + 2, ZN),
      P(KX - WP, KNEE[1] + 2, ZF),
      P(KX - WP, KNEE[1] + 40, ZF),
      P(KX - WP, KNEE[1] + 40, ZN),
    ],
    INK,
    0.25,
  );
  quad(
    [
      P(KX - WP, KNEE[1] + 40, ZN),
      P(KX - WP, KNEE[1] + 40, ZF),
      P(KX, KNEE[1] + 40, ZF),
      P(KX, KNEE[1] + 40, ZN),
    ],
    INK,
    0.12,
  ); // shadow line under it

  // ---- rafters at about 500 mm centres, two of them trimmed for the rooflights ----
  const SP = 200,
    T = 16,
    DEPTH = 36; // spacing, thickness (along the room) and exposed depth, px on the picture plane
  const rafterZ = [];
  for (let i = -4; i < 8; i++) rafterZ.push(40 + i * SP);
  const uA = [0.3, 0.58]; // rooflights run this far down the slope
  const trimmed = { 5: uA, 9: uA }; // rafter index -> the gap cut out of it
  const roofBays = [
    [4, 6],
    [8, 10],
  ]; // rooflights span from rafter a (far side) to rafter b (near side)

  // rooflights first: they sit in the slope plane, above the rafters
  const rooflight = (z1, z2, u1, u2) => {
    const fr = 0.022,
      m = 6;
    const box = (a, b, c, d, fill, o = 1) =>
      quad([P(...S(a), c), P(...S(b), c), P(...S(b), d), P(...S(a), d)], fill, o);
    // plastered reveal through the roof thickness, then the frame, then the pane
    box(u1 - fr - 0.02, u2 + fr + 0.02, z1 - m - 10, z2 + m + 10, INK, 0.16);
    box(u1 - fr, u2 + fr, z1 - m, z2 + m, PAPER);
    box(u1 - fr, u2 + fr, z1 - m, z2 + m, INK, 0.1);
    box(u1, u2, z1, z2, INK, 0.8);
    const um = u1 + (u2 - u1) * 0.5;
    box(u1, um, z1, z2, WHITE, 0.7); // sky through the upper pane
    box(um, u2, z1, z2, WHITE, 0.4); // paler cloud through the lower pane
    box(u1, u1 + 0.03, z1, z2, WHITE, 0.2); // head bar highlight
    const zm = (z1 + z2) / 2,
      a = P(...S(u1), zm),
      c = P(...S(u2), zm);
    s.line(a[0], a[1], c[0], c[1], { color: PAPER, opacity: 0.9, weight: 4 }); // central glazing bar
    const d = P(...S(um), z1),
      e = P(...S(um), z2);
    s.line(d[0], d[1], e[0], e[1], { color: PAPER, opacity: 0.85, weight: 3 }); // meeting bar
  };
  const bayZ = (a, bIdx) => [rafterZ[bIdx] + T, rafterZ[a]]; // clear opening between the two rafters
  for (const [a, c] of roofBays) rooflight(...bayZ(a, c), uA[0], uA[1]);

  // ---- light from the rooflights falling across the floor ----
  const sun = [-0.25, 0.85, -0.2];
  const floorPatch = (z1, z2, u1, u2) => {
    const out = [];
    for (const [z, u] of [
      [z2, u1],
      [z1, u1],
      [z1, u2],
      [z2, u2],
    ]) {
      const [sx, sy] = S(u);
      const lam = (FLOOR - sy) / sun[1];
      out.push(P(sx + sun[0] * lam, FLOOR, z + sun[2] * lam));
    }
    return out;
  };
  const patches = roofBays.map(([a, c]) => floorPatch(...bayZ(a, c), uA[0], uA[1]));

  // rug on the boards
  const rug = (xa, xb, za, zb) => {
    const r = [P(xa, FLOOR, za), P(xb, FLOOR, za), P(xb, FLOOR, zb), P(xa, FLOOR, zb)];
    s.poly(r, TERRACOTTA);
    s.poly(r, INK, { opacity: 0.08 });
    const i = 22,
      zi = 30;
    quad(
      [
        P(xa + i, FLOOR, za + zi),
        P(xb - i, FLOOR, za + zi),
        P(xb - i, FLOOR, zb - zi),
        P(xa + i, FLOOR, zb - zi),
      ],
      PAPER,
      0.14,
    );
    quad(
      [
        P(xa + i * 2, FLOOR, za + zi * 2),
        P(xb - i * 2, FLOOR, za + zi * 2),
        P(xb - i * 2, FLOOR, zb - zi * 2),
        P(xa + i * 2, FLOOR, zb - zi * 2),
      ],
      TERRACOTTA,
    );
  };
  rug(360, 1010, 180, 1020);
  for (const p of patches) s.poly(p, PAPER, { opacity: 0.3 });
  for (const p of patches) s.poly(p, WHITE, { opacity: 0.2 });

  // ---- low platform bed under the coomb, its head against the gable ----
  const box = (xa, xb, top, zn, zf, fill, { front = 0.16, side = 0.28, topLight = 0 } = {}) => {
    const topQ = [P(xa, top, zf), P(xb, top, zf), P(xb, top, zn), P(xa, top, zn)];
    s.poly(topQ, fill);
    if (topLight) s.poly(topQ, PAPER, { opacity: topLight });
    const sideQ = [P(xa, top, zf), P(xa, top, zn), P(xa, FLOOR, zn), P(xa, FLOOR, zf)];
    s.poly(sideQ, fill);
    s.poly(sideQ, INK, { opacity: side });
    const frontQ = [P(xa, top, zn), P(xb, top, zn), P(xb, FLOOR, zn), P(xa, FLOOR, zn)];
    s.poly(frontQ, fill);
    s.poly(frontQ, INK, { opacity: front });
  };
  const bxA = 1180,
    bxB = 1660,
    bzN = 480,
    bzF = ZF - 10,
    bedTop = FLOOR - 96;
  // shadow on the floor beside and in front of the platform
  quad(
    [P(bxA - 70, FLOOR, bzN + 20), P(bxA, FLOOR, bzN), P(bxA, FLOOR, bzF), P(bxA - 70, FLOOR, bzF)],
    INK,
    0.1,
  );
  quad(
    [P(bxA - 70, FLOOR, bzN - 40), P(bxB, FLOOR, bzN - 40), P(bxB, FLOOR, bzN), P(bxA, FLOOR, bzN)],
    INK,
    0.07,
  );
  box(bxA, bxB, bedTop, bzN, bzF, SANDSTONE, { front: 0.2, side: 0.32, topLight: 0.2 });
  // mattress
  const mA = bxA + 22,
    mB = bxB - 22,
    mN = bzN + 14,
    mF = bzF - 8,
    mTop = bedTop - 58;
  box(mA, mB, mTop, mN, mF, PAPER, { front: 0.1, side: 0.2 });
  quad([P(mA, mTop, mF), P(mB, mTop, mF), P(mB, mTop, mN), P(mA, mTop, mN)], WHITE, 0.5);
  quad([P(mA, mTop, mN), P(mB, mTop, mN), P(mB, mTop + 6, mN), P(mA, mTop + 6, mN)], INK, 0.08); // rounded edge
  // the platform lip below the mattress
  quad(
    [P(bxA, bedTop, bzN), P(bxB, bedTop, bzN), P(bxB, bedTop + 5, bzN), P(bxA, bedTop + 5, bzN)],
    INK,
    0.1,
  );
  // folded moss blanket across the foot
  const blF = mN + 200;
  quad([P(mA, mTop, blF), P(mB, mTop, blF), P(mB, mTop, mN), P(mA, mTop, mN)], MOSS);
  quad([P(mA, mTop, mN), P(mB, mTop, mN), P(mB, bedTop + 16, mN), P(mA, bedTop + 16, mN)], MOSS);
  quad(
    [P(mA, mTop, mN), P(mB, mTop, mN), P(mB, bedTop + 16, mN), P(mA, bedTop + 16, mN)],
    INK,
    0.22,
  );
  quad([P(mA, mTop, blF), P(mA, mTop, mN), P(mA, bedTop + 16, mN), P(mA, bedTop + 16, blF)], MOSS);
  quad(
    [P(mA, mTop, blF), P(mA, mTop, mN), P(mA, bedTop + 16, mN), P(mA, bedTop + 16, blF)],
    INK,
    0.32,
  );
  quad(
    [P(mA, mTop, blF), P(mB, mTop, blF), P(mB, mTop, blF - 10), P(mA, mTop, blF - 10)],
    INK,
    0.16,
  ); // fold
  // pillows at the head
  const pillow = (xa, xb) => {
    const top = mTop - 18,
      zn = mF - 210,
      zf = mF - 12;
    quad([P(xa, top, zf), P(xb, top, zf), P(xb, top, zn), P(xa, top, zn)], WHITE);
    quad([P(xa, top, zf), P(xa, top, zn), P(xa, mTop, zn), P(xa, mTop, zf)], WHITE);
    quad([P(xa, top, zf), P(xa, top, zn), P(xa, mTop, zn), P(xa, mTop, zf)], INK, 0.14);
    quad([P(xa, top, zn), P(xb, top, zn), P(xb, mTop, zn), P(xa, mTop, zn)], WHITE);
    quad([P(xa, top, zn), P(xb, top, zn), P(xb, mTop, zn), P(xa, mTop, zn)], INK, 0.07);
    quad(
      [P(xa, mTop, zn - 6), P(xb, mTop, zn - 6), P(xb, mTop, zn + 40), P(xa, mTop, zn + 40)],
      INK,
      0.06,
    ); // soft shadow on the sheet
  };
  pillow(mA + 18, mA + 214);
  pillow(mA + 226, mB - 18);

  // ---- rafters, drawn nearest last so each overlaps the one beyond ----
  const rafter = (z, u1, u2) => {
    const a = S(u1),
      c = S(u2);
    // soft shade cast up the plaster beyond the rafter
    quad([P(...a, z + T), P(...c, z + T), P(...c, z + T + 34), P(...a, z + T + 34)], INK, 0.09);
    // underside (its far edge steps back by the thickness)
    const ua = off(a, DEPTH),
      uc = off(c, DEPTH);
    quad([P(...ua, z), P(...uc, z), P(...uc, z + T), P(...ua, z + T)], SANDSTONE);
    quad([P(...ua, z), P(...uc, z), P(...uc, z + T), P(...ua, z + T)], INK, 0.42);
    // near face
    quad([P(...a, z), P(...c, z), P(...uc, z), P(...ua, z)], SANDSTONE);
    quad([P(...a, z), P(...c, z), P(...uc, z), P(...ua, z)], INK, 0.2);
    const g1 = P(...off(a, DEPTH * 0.6), z),
      g2 = P(...off(c, DEPTH * 0.6), z);
    s.line(g1[0], g1[1], g2[0], g2[1], { opacity: 0.12, weight: 1.5 }); // grain
    const l1 = P(...off(a, 2), z),
      l2 = P(...off(c, 2), z);
    s.line(l1[0], l1[1], l2[0], l2[1], { color: PAPER, opacity: 0.4, weight: 2 }); // lit arris
  };
  // trimmers across the head and foot of each rooflight opening
  const trimmer = (u, z1, z2) => {
    const a = S(u),
      c = S(u + 0.03);
    const ua = off(a, DEPTH * 0.55),
      uc = off(c, DEPTH * 0.55);
    quad([P(...ua, z1), P(...uc, z1), P(...uc, z2), P(...ua, z2)], SANDSTONE);
    quad([P(...ua, z1), P(...uc, z1), P(...uc, z2), P(...ua, z2)], INK, 0.34);
    quad([P(...a, z1), P(...a, z2), P(...ua, z2), P(...ua, z1)], INK, 0.12); // shade against the plaster
  };
  for (let i = rafterZ.length - 1; i >= 0; i--) {
    const z = rafterZ[i];
    const cut = trimmed[i];
    if (cut) {
      rafter(z, 0, cut[0] - 0.045);
      rafter(z, cut[1] + 0.045, 1);
    } else rafter(z, 0, 1);
    for (const [a, c] of roofBays)
      if (c === i) {
        trimmer(uA[0] - 0.052, rafterZ[a], z + T); // head trimmer, drawn with the near rafter of its bay
        trimmer(uA[1] + 0.022, rafterZ[a], z + T); // foot trimmer
      }
  }

  // ---- settle the corners into shade ----
  quad([far(L, CEIL), far(L + 90, CEIL), far(L + 90, FLOOR), far(L, FLOOR)], INK, 0.05);
  return s;
}
