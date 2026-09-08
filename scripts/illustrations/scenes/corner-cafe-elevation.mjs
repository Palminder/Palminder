import { Scene, SANDSTONE, INK, PAPER, STONE, TERRACOTTA, MOSS, WHITE } from '../toolkit.mjs';

/** A Glasgow tenement corner with a splayed bay, a wrap-around café shopfront and a conical turret cap. */
export function cornerCafeElevation() {
  const s = new Scene({
    width: 1600,
    height: 1000,
    title: 'Corner café elevation',
    description:
      'A three-storey sandstone tenement corner with a splayed bay, a café with continuous glazing wrapping the ground floor, sash windows above, a conical turret cap and a pavement with kerb.',
  });
  const u = 38; // px per metre
  const ground = 892;
  const gfH = 4.4 * u; // ground-floor storey (café)
  const stH = 3.5 * u; // upper storeys
  const eaves = ground - gfH - 3 * stH; // 380
  const gfTop = ground - gfH;
  // Panels: left elevation, splayed corner, right elevation (in shade)
  const L = { x: 0, w: 780 };
  const C = { x: 780, w: 170 };
  const R = { x: 950, w: 650 };

  s.overcast(eaves - 60);

  // ---- roof band behind the parapet, chimneys ----
  s.roof(L.x, eaves - 46, L.w + C.w, 60);
  s.roof(R.x, eaves - 46, R.w, 60);
  s.shade(R.x, eaves - 46, R.w, 60, 0.18);
  s.chimney(210, eaves - 1.6 * u, 1.3 * u, 1.6 * u, 3);
  s.chimney(560, eaves - 1.6 * u, 1.3 * u, 1.6 * u, 3);
  s.chimney(1180, eaves - 1.6 * u, 1.1 * u, 1.6 * u, 3);
  s.chimney(1480, eaves - 1.6 * u, 1.1 * u, 1.6 * u, 3);
  s.shade(1180, eaves - 1.6 * u - 26, 1.1 * u + 8, 1.6 * u + 26, 0.14);
  s.shade(1480, eaves - 1.6 * u - 26, 1.1 * u + 8, 1.6 * u + 26, 0.14);

  // ---- façades ----
  s.facade(L.x, eaves, L.w, ground - eaves);
  s.facade(C.x, eaves, C.w, ground - eaves);
  s.light(C.x, eaves, C.w, ground - eaves, 0.18);
  s.facade(R.x, eaves, R.w, ground - eaves, { tone: 0.14 });

  // eaves cornice and string courses across all three panels
  const strings = [eaves, eaves + stH, eaves + 2 * stH, gfTop - 0.35 * u];
  strings.forEach((y, i) => {
    const h = i === 0 ? 18 : i === 3 ? 12 : 9;
    s.cornice(L.x, y, L.w, h);
    s.cornice(C.x, y, C.w, h);
    s.light(C.x, y, C.w, h, 0.15);
    s.cornice(R.x, y, R.w, h);
    s.shade(R.x, y, R.w, h * 1.7, 0.12);
  });

  // ---- upper-floor sash windows ----
  const leftCols = [70, 235, 400, 565, 690];
  const rightCols = [995, 1105, 1215, 1325, 1435, 1545];
  for (let f = 0; f < 3; f++) {
    const wy = eaves + f * stH + 0.85 * u;
    const wh = 2.1 * u;
    leftCols.forEach((x, i) => {
      const w = i === 4 ? 1.4 * u : 1.7 * u;
      s.window(x, wy, w, wh);
    });
    // corner splay: one tall narrow window per floor, lighter
    s.window(C.x + 52, wy, 66, wh, { reveal: 7 });
    s.light(C.x + 52, wy, 66, wh, 0.08);
    // right elevation windows are foreshortened
    rightCols.forEach((x) => {
      s.window(x, wy, 1.05 * u, wh, { reveal: 6 });
      s.shade(x - 6, wy - 6, 1.05 * u + 12, wh + 13, 0.14);
    });
  }

  // ---- corner quoins: light edge on the left arris, deep shade on the right ----
  s.light(C.x - 14, eaves, 14, ground - eaves, 0.1);
  s.line(C.x, eaves, C.x, ground, { opacity: 0.28 });
  s.shade(C.x + C.w, eaves, 16, ground - eaves, 0.16);
  s.line(C.x + C.w, eaves, C.x + C.w, ground, { opacity: 0.4 });

  // ---- ground floor: café shopfront wrapping both elevations and the splay ----
  const sfY = gfTop;
  const sfH = ground - gfTop;
  s.shopfront(L.x, sfY, L.w, sfH, { fill: MOSS, pilaster: 24, fascia: 0.17, stallriser: 0.15 });
  s.shopfront(C.x, sfY, C.w, sfH, { fill: MOSS, pilaster: 24, fascia: 0.17, stallriser: 0.15 });
  s.light(C.x, sfY, C.w, sfH, 0.12);
  s.shopfront(R.x, sfY, R.w, sfH, { fill: MOSS, pilaster: 24, fascia: 0.17, stallriser: 0.15 });
  s.shade(R.x, sfY, R.w, sfH, 0.16);
  // glazing mullions to break the long café glazing into bays
  const glzTop = sfY + sfH * 0.17,
    glzBot = ground - sfH * 0.15;
  for (const x of [200, 390, 580]) s.rect(x - 3, glzTop, 6, glzBot - glzTop, MOSS);
  for (const x of [1090, 1230, 1370, 1510])
    (s.rect(x - 2, glzTop, 5, glzBot - glzTop, MOSS),
      s.shade(x - 2, glzTop, 5, glzBot - glzTop, 0.16));
  // a wide transom band on the left elevation to read as the café's clerestory line
  s.rect(L.x + 24, glzTop + (glzBot - glzTop) * 0.22, L.w - 48, 4, MOSS);

  // recessed corner entrance in the splay: the glazing steps back behind side reveals
  const dh = glzBot - glzTop;
  const rx = C.x + 24,
    rw = C.w - 48; // opening between the pilasters
  s.rect(rx, glzTop, rw, dh, MOSS);
  s.shade(rx, glzTop, rw, dh, 0.28); // recess soffit and floor in shade
  const rev = 22; // side reveals returning into the recess
  s.rect(rx, glzTop, rev, dh, MOSS);
  s.light(rx, glzTop, rev, dh, 0.1);
  s.rect(rx + rw - rev, glzTop, rev, dh, MOSS);
  s.shade(rx + rw - rev, glzTop, rev, dh, 0.28);
  const dw = rw - rev * 2,
    dx = rx + rev;
  s.rect(dx, glzTop + 10, dw, dh - 10, INK, { opacity: 0.86 }); // door leaf and side screens
  s.light(dx + 4, glzTop + 14, dw - 8, (dh - 10) * 0.4, 0.1); // glass reflection
  s.rect(dx, glzTop + 10 + (dh - 10) * 0.2, dw, 4, MOSS); // transom over the door
  s.rect(dx + dw * 0.5 - 1.5, glzTop + 10, 3, dh - 10, MOSS); // meeting stile
  s.rect(dx + dw * 0.5 - 22, glzTop + 10, 3, dh - 10, MOSS, { opacity: 0.6 });
  s.rect(dx + dw * 0.5 + 19, glzTop + 10, 3, dh - 10, MOSS, { opacity: 0.6 });
  s.rect(rx, glzTop, rw, 10, MOSS); // recess head
  s.shade(rx, glzTop, rw, 10, 0.4);
  s.rect(rx, glzBot - 6, rw, 6, STONE); // threshold step
  s.light(rx, glzBot - 6, rw, 6, 0.3);
  s.shade(rx, glzBot - 6, rw, 2, 0.12);

  // fascia returns catch the light on the splay, shade on the right
  s.light(C.x, sfY, C.w, sfH * 0.17, 0.12);

  // ---- corner turret cap ----
  const tx0 = C.x - 30,
    tx1 = C.x + C.w + 30,
    tw = tx1 - tx0;
  const tBase = eaves + 2;
  const apex = [tx0 + tw / 2, eaves - 215];
  // drum / cornice at base of cone
  s.rect(tx0, tBase - 36, tw, 36, SANDSTONE);
  s.light(tx0, tBase - 36, tw, 36, 0.16);
  s.shade(tx0 + tw * 0.62, tBase - 36, tw * 0.38, 36, 0.14);
  s.rect(tx0 - 8, tBase - 44, tw + 16, 10, SANDSTONE);
  s.light(tx0 - 8, tBase - 44, tw + 16, 10, 0.32);
  s.shade(tx0 - 8, tBase - 34, tw + 16, 6, 0.16);
  // ink cone with lit left facet and dark right facet
  const coneBase = tBase - 44;
  s.poly([[tx0 - 14, coneBase], [tx1 + 14, coneBase], apex], INK, { opacity: 0.82 });
  s.poly([[tx0 - 14, coneBase], [tx0 + tw * 0.42, coneBase], apex], PAPER, { opacity: 0.16 });
  s.poly([[tx0 + tw * 0.62, coneBase], [tx1 + 14, coneBase], apex], INK, { opacity: 0.3 });
  // slate courses on the cone
  for (let i = 1; i < 8; i++) {
    const t = i / 8;
    const y = coneBase - (coneBase - apex[1]) * t;
    const half = ((tw + 28) / 2) * (1 - t);
    s.line(apex[0] - half, y, apex[0] + half, y, { color: PAPER, opacity: 0.14 });
  }
  // terracotta finial
  s.rect(apex[0] - 5, apex[1] - 22, 10, 26, TERRACOTTA);
  s.circle(apex[0], apex[1] - 30, 9, TERRACOTTA);
  s.rect(apex[0] - 12, apex[1] - 4, 24, 6, TERRACOTTA);
  s.rect(apex[0] - 2, apex[1] - 52, 4, 24, TERRACOTTA);

  // ---- base course, pavement and kerb ----
  s.rect(L.x, ground - 0.3 * u, L.w + C.w, 0.3 * u, INK, { opacity: 0.2 });
  s.rect(R.x, ground - 0.3 * u, R.w, 0.3 * u, INK, { opacity: 0.32 });
  s.pavement(ground, { depth: 64 });
  // paving joints
  for (let x = 40; x < s.w; x += 120) s.line(x, ground + 6, x, s.h, { opacity: 0.08 });
  // faint road beyond on the right: the side street's carriageway receding past the corner
  s.poly(
    [
      [1120, s.h],
      [s.w, s.h],
      [s.w, ground + 24],
      [1490, ground + 24],
    ],
    INK,
    { opacity: 0.3 },
  );
  s.poly(
    [
      [1112, s.h],
      [1128, s.h],
      [1496, ground + 24],
      [1484, ground + 24],
    ],
    INK,
    { opacity: 0.22 },
  ); // kerb edge
  s.rect(1490, ground + 24, s.w - 1490, 5, INK, { opacity: 0.2 });
  s.poly(
    [
      [1330, s.h],
      [1338, s.h],
      [1600, ground + 60],
      [1600, ground + 54],
    ],
    PAPER,
    { opacity: 0.18 },
  ); // lane line

  // distance haze on the upper storeys
  s.light(0, 0, s.w, eaves - 20, 0.06);
  return s;
}
