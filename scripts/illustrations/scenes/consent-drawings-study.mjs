import { Scene, PAPER, INK, STONE, TERRACOTTA, MOSS, WHITE } from '../toolkit.mjs';

/** Four consent drawings pinned in a row on a moss pinboard: site plan, elevation, floor plan and section. */
export function consentDrawingsStudy() {
  const s = new Scene({
    width: 1600,
    height: 1000,
    title: 'Consent drawings study',
    description:
      'Four sheets of planning drawings pinned to a green pinboard with red pins: a site plan, a tenement elevation, a floor plan and a section.',
  });

  // ---- pinboard ----
  s.rect(0, 0, s.w, s.h, MOSS);
  // faint felt texture: a deterministic grid of soft flecks
  for (let i = 0; i < 40; i++) {
    for (let j = 0; j < 25; j++) {
      const tone = (i * 7 + j * 11) % 5;
      if (tone === 0) s.shade(i * 40 + ((j * 13) % 20), j * 40 + ((i * 17) % 20), 14, 6, 0.05);
      if (tone === 2)
        s.rect(i * 40 + ((j * 19) % 24), j * 40 + ((i * 23) % 24), 10, 5, PAPER, {
          opacity: 0.035,
        });
    }
  }
  // vignette: darker edges, lighter centre band
  s.shade(0, 0, s.w, 70, 0.12);
  s.shade(0, s.h - 90, s.w, 90, 0.16);
  s.shade(0, 0, 60, s.h, 0.1);
  s.shade(s.w - 60, 0, 60, s.h, 0.1);
  // timber frame lip top and bottom
  s.rect(0, 0, s.w, 18, STONE);
  s.shade(0, 0, s.w, 18, 0.35);
  s.shade(0, 18, s.w, 10, 0.3);
  s.rect(0, s.h - 18, s.w, 18, STONE);
  s.shade(0, s.h - 18, s.w, 18, 0.25);
  s.light(0, s.h - 18, s.w, 3, 0.2);

  // ---- sheet helper: local coords (u,v) from sheet's top-left, rotated about sheet centre ----
  const K = 1.1; // local-to-world scale so the four sheets fill the board
  const sheet = (cx, cy, w, h, deg) => {
    const a = (deg * Math.PI) / 180,
      ca = Math.cos(a),
      sa = Math.sin(a);
    const P = (u, v) => {
      const dx = (u - w / 2) * K,
        dy = (v - h / 2) * K;
      return [cx + dx * ca - dy * sa, cy + dx * sa + dy * ca];
    };
    const quad = (u, v, qw, qh) => [P(u, v), P(u + qw, v), P(u + qw, v + qh), P(u, v + qh)];
    const api = {
      P,
      w,
      h,
      /** thin ink line in local coords */
      ln: (u1, v1, u2, v2, o = {}) => {
        const [x1, y1] = P(u1, v1),
          [x2, y2] = P(u2, v2);
        s.line(x1, y1, x2, y2, { weight: 1.6, opacity: 0.75, ...o });
      },
      /** outlined box in local coords */
      box: (u, v, bw, bh, o = {}) => {
        api.ln(u, v, u + bw, v, o);
        api.ln(u + bw, v, u + bw, v + bh, o);
        api.ln(u + bw, v + bh, u, v + bh, o);
        api.ln(u, v + bh, u, v, o);
      },
      /** filled quad in local coords */
      fill: (u, v, fw, fh, colour, o = {}) => s.poly(quad(u, v, fw, fh), colour, o),
      /** dashed line approximated with short segments */
      dash: (u1, v1, u2, v2, seg = 14, gap = 8, o = {}) => {
        const L = Math.hypot(u2 - u1, v2 - v1),
          du = (u2 - u1) / L,
          dv = (v2 - v1) / L;
        for (let t = 0; t < L; t += seg + gap) {
          const e = Math.min(t + seg, L);
          api.ln(u1 + du * t, v1 + dv * t, u1 + du * e, v1 + dv * e, o);
        }
      },
      /** quarter-circle door swing approximated with chords */
      swing: (u, v, r, q) => {
        const start = (q * Math.PI) / 2;
        let pu = u + r * Math.cos(start),
          pv = v + r * Math.sin(start);
        for (let k = 1; k <= 6; k++) {
          const ang = start + (k / 6) * (Math.PI / 2);
          const nu = u + r * Math.cos(ang),
            nv = v + r * Math.sin(ang);
          api.ln(pu, pv, nu, nv, { weight: 1.1, opacity: 0.5 });
          pu = nu;
          pv = nv;
        }
      },
      paper: () => {
        // shadow (offset down-right), then sheet, then edge tone
        s.poly(quad(9, 12, w, h), INK, { opacity: 0.32 });
        s.poly(quad(4, 6, w, h), INK, { opacity: 0.16 });
        s.poly(quad(0, 0, w, h), PAPER);
        s.poly(quad(0, 0, w, 3), WHITE, { opacity: 0.7 });
        s.poly(quad(0, h - 4, w, 4), INK, { opacity: 0.07 });
        s.poly(quad(w - 4, 0, 4, h), INK, { opacity: 0.05 });
        // border line
        api.box(18, 18, w - 36, h - 36, { weight: 1, opacity: 0.4 });
      },
      titleBlock: () => {
        const tw = w * 0.34,
          th = 44;
        const u = w - 18 - tw,
          v = h - 18 - th;
        api.box(u, v, tw, th, { weight: 1.2, opacity: 0.6 });
        api.ln(u, v + th * 0.42, u + tw, v + th * 0.42, { weight: 1, opacity: 0.45 });
        api.ln(u + tw * 0.38, v, u + tw * 0.38, v + th, { weight: 1, opacity: 0.45 });
      },
      pins: () => {
        for (const [u, v] of [
          [26, 24],
          [w - 26, 24],
        ]) {
          const [x, y] = P(u, v);
          s.circle(x + 3, y + 6, 15, INK, { opacity: 0.3 });
          s.circle(x, y, 13, TERRACOTTA);
          s.circle(x - 3.5, y - 3.5, 5.5, WHITE, { opacity: 0.35 });
          s.circle(x + 2.5, y + 3.5, 10.5, INK, { opacity: 0.12 });
        }
      },
    };
    return api;
  };

  // ---- sheet 1: site plan ----
  {
    const sh = sheet(212, 505, 330, 470, -2);
    sh.paper();
    // streets: two roads crossing
    sh.ln(40, 150, 290, 150, { weight: 1.2, opacity: 0.5 });
    sh.ln(40, 190, 290, 190, { weight: 1.2, opacity: 0.5 });
    sh.ln(200, 40, 200, 150, { weight: 1.2, opacity: 0.5 });
    sh.ln(240, 40, 240, 150, { weight: 1.2, opacity: 0.5 });
    // neighbouring blocks (light hatch by line only)
    sh.box(50, 50, 130, 85, { weight: 1.2, opacity: 0.45 });
    sh.box(60, 330, 60, 55, { weight: 1.2, opacity: 0.45 });
    // subject block: L-shaped footprint with a rear wing
    sh.ln(90, 215, 250, 215);
    sh.ln(250, 215, 250, 330);
    sh.ln(250, 330, 190, 330);
    sh.ln(190, 330, 190, 290);
    sh.ln(190, 290, 90, 290);
    sh.ln(90, 290, 90, 215);
    // hatch the footprint diagonally
    for (let k = 1; k < 14; k++) {
      // 45-degree hatch clipped to the L: rectangle 90..250 x 215..290 plus wing 190..250 x 290..330
      const c = 90 + 215 + 20 * k; // u + v = c
      const segs = [
        [90, 250, 215, 290],
        [190, 250, 290, 330],
      ];
      for (const [ua, ub, va, vb] of segs) {
        const u1 = Math.max(ua, c - vb),
          u2 = Math.min(ub, c - va);
        if (u2 > u1) sh.ln(u1, c - u1, u2, c - u2, { weight: 0.9, opacity: 0.35 });
      }
    }
    // garden wall and a tree
    sh.ln(250, 240, 290, 240, { weight: 1, opacity: 0.4 });
    sh.ln(150, 330, 150, 385, { weight: 1, opacity: 0.4 });
    for (let k = 0; k < 8; k++) {
      const a1 = (k / 8) * Math.PI * 2,
        a2 = ((k + 1) / 8) * Math.PI * 2;
      const p1 = sh.P(230 + 20 * Math.cos(a1), 362 + 20 * Math.sin(a1)),
        p2 = sh.P(230 + 20 * Math.cos(a2), 362 + 20 * Math.sin(a2));
      s.line(p1[0], p1[1], p2[0], p2[1], { weight: 1.1, opacity: 0.45 });
    }
    // red-line boundary, dashed terracotta
    const red = { color: TERRACOTTA, weight: 3.2, opacity: 0.95 };
    sh.dash(60, 205, 275, 205, 14, 8, red);
    sh.dash(275, 205, 275, 395, 14, 8, red);
    sh.dash(275, 395, 60, 395, 14, 8, red);
    sh.dash(60, 395, 60, 205, 14, 8, red);
    // north point: small circle and a stroke
    sh.ln(60, 92, 60, 48, { weight: 2, opacity: 0.7 });
    sh.ln(60, 48, 52, 62, { weight: 2, opacity: 0.7 });
    sh.ln(60, 48, 68, 62, { weight: 2, opacity: 0.7 });
    sh.titleBlock();
    sh.pins();
  }

  // ---- sheet 2: front elevation of a tenement ----
  {
    const sh = sheet(600, 495, 360, 520, 1.5);
    sh.paper();
    const gl = 430; // ground line
    sh.ln(30, gl, 330, gl, { weight: 2.2, opacity: 0.8 });
    // main wall
    const L = 60,
      R = 300,
      eav = 120;
    sh.box(L, eav, R - L, gl - eav, { weight: 1.8 });
    // parapet and roof
    sh.ln(L - 6, eav, R + 6, eav, { weight: 2 });
    sh.ln(L - 6, eav + 12, R + 6, eav + 12, { weight: 1.2, opacity: 0.55 });
    sh.ln(L, eav, L + 50, 70);
    sh.ln(R, eav, R - 50, 70);
    sh.ln(L + 50, 70, R - 50, 70);
    // chimneys
    sh.box(L + 20, 48, 26, 40);
    sh.box(R - 46, 48, 26, 40);
    sh.ln(L + 20, 56, L + 46, 56, { weight: 1, opacity: 0.5 });
    sh.ln(R - 46, 56, R - 20, 56, { weight: 1, opacity: 0.5 });
    // string courses
    sh.ln(L, 230, R, 230, { weight: 1, opacity: 0.5 });
    sh.ln(L, 330, R, 330, { weight: 1, opacity: 0.5 });
    // bay on the left, two floors of windows to the right, close door at ground
    sh.ln(L + 20, eav + 12, L + 20, gl, { weight: 1.2, opacity: 0.55 });
    sh.ln(L + 110, eav + 12, L + 110, gl, { weight: 1.2, opacity: 0.55 });
    for (let f = 0; f < 3; f++) {
      const wy = 145 + f * 100;
      // bay: three lights
      sh.box(L + 26, wy, 22, 60);
      sh.box(L + 54, wy, 22, 60);
      sh.box(L + 82, wy, 22, 60);
      sh.ln(L + 26, wy + 32, L + 104, wy + 32, { weight: 1, opacity: 0.5 });
      // two sash windows on the right
      sh.box(L + 140, wy, 34, 60);
      sh.ln(L + 140, wy + 32, L + 174, wy + 32, { weight: 1, opacity: 0.5 });
      sh.ln(L + 157, wy, L + 157, wy + 60, { weight: 1, opacity: 0.5 });
      sh.box(L + 194, wy, 34, 60);
      sh.ln(L + 194, wy + 32, L + 228, wy + 32, { weight: 1, opacity: 0.5 });
      sh.ln(L + 211, wy, L + 211, wy + 60, { weight: 1, opacity: 0.5 });
      // sills
      sh.ln(L + 22, wy + 62, L + 108, wy + 62, { weight: 1.4, opacity: 0.65 });
      sh.ln(L + 136, wy + 62, L + 178, wy + 62, { weight: 1.4, opacity: 0.65 });
      sh.ln(L + 190, wy + 62, L + 232, wy + 62, { weight: 1.4, opacity: 0.65 });
    }
    // ground floor: door and window
    sh.box(L + 130, gl - 78, 30, 78);
    sh.ln(L + 130, gl - 62, L + 160, gl - 62, { weight: 1, opacity: 0.5 });
    sh.box(L + 194, gl - 75, 34, 60);
    sh.ln(L + 194, gl - 45, L + 228, gl - 45, { weight: 1, opacity: 0.5 });
    // ground level hatch
    for (let u = 30; u < 330; u += 12) sh.ln(u, gl, u - 8, gl + 8, { weight: 0.9, opacity: 0.4 });
    sh.titleBlock();
    sh.pins();
  }

  // ---- sheet 3: floor plan ----
  {
    const sh = sheet(995, 508, 340, 480, -1.2);
    sh.paper();
    const t = 8; // wall thickness
    const L = 50,
      T = 60,
      R = 290,
      B = 400;
    // external walls as double lines
    sh.box(L, T, R - L, B - T, { weight: 2 });
    sh.box(L + t, T + t, R - L - 2 * t, B - T - 2 * t, { weight: 1.2, opacity: 0.55 });
    // spine wall and partitions
    sh.ln(L + 130, T + t, L + 130, B - t, { weight: 1.6 });
    sh.ln(L + 138, T + t, L + 138, B - t, { weight: 1, opacity: 0.5 });
    sh.ln(L + t, 190, L + 130, 190, { weight: 1.4 });
    sh.ln(L + t, 196, L + 130, 196, { weight: 1, opacity: 0.5 });
    sh.ln(L + 138, 250, R - t, 250, { weight: 1.4 });
    sh.ln(L + 138, 256, R - t, 256, { weight: 1, opacity: 0.5 });
    sh.ln(L + t, 300, L + 130, 300, { weight: 1.4 });
    sh.ln(L + t, 306, L + 130, 306, { weight: 1, opacity: 0.5 });
    // windows on the front (bottom) wall: gap with a thin glazing line
    for (const [u, w] of [
      [70, 50],
      [160, 40],
      [230, 40],
    ]) {
      sh.fill(u, B - t - 1, w, t + 2, PAPER);
      sh.ln(u, B - t / 2, u + w, B - t / 2, { weight: 1, opacity: 0.6 });
      sh.ln(u, B - t, u, B, { weight: 1.2 });
      sh.ln(u + w, B - t, u + w, B, { weight: 1.2 });
    }
    // rear windows
    for (const [u, w] of [
      [80, 44],
      [200, 44],
    ]) {
      sh.fill(u, T - 1, w, t + 2, PAPER);
      sh.ln(u, T + t / 2, u + w, T + t / 2, { weight: 1, opacity: 0.6 });
      sh.ln(u, T, u, T + t, { weight: 1.2 });
      sh.ln(u + w, T, u + w, T + t, { weight: 1.2 });
    }
    // doors: openings with swings
    sh.fill(L + 129, 120, 10, 34, PAPER);
    sh.ln(L + 138, 120, L + 172, 120, { weight: 1.2 });
    sh.swing(L + 138, 120, 34, 0);
    sh.fill(L + 129, 340, 10, 34, PAPER);
    sh.ln(L + 138, 374, L + 172, 374, { weight: 1.2 });
    sh.swing(L + 138, 374, 34, 3);
    sh.fill(90, 189, 34, 8, PAPER);
    sh.ln(90, 190, 90, 156, { weight: 1.2 });
    sh.swing(90, 190, 34, 3);
    sh.fill(190, 249, 34, 8, PAPER);
    sh.ln(224, 250, 224, 284, { weight: 1.2 });
    sh.swing(224, 250, 34, 1);
    // stair: treads on the right of the entrance
    for (let k = 0; k < 7; k++)
      sh.ln(L + 146, 270 + k * 12, L + 200, 270 + k * 12, { weight: 1, opacity: 0.5 });
    sh.ln(L + 146, 270, L + 146, 354, { weight: 1.2 });
    sh.ln(L + 200, 270, L + 200, 354, { weight: 1.2 });
    sh.ln(L + 173, 270, L + 173, 354, { weight: 0.9, opacity: 0.45 });
    // kitchen run and a bath
    sh.box(L + t + 4, T + t + 4, 24, 110, { weight: 1, opacity: 0.5 });
    sh.box(R - t - 60, T + t + 6, 54, 26, { weight: 1, opacity: 0.5 });
    // section marker: two short heavy ticks with a dashed line across
    sh.dash(L - 20, 230, R + 20, 230, 10, 8, { weight: 1, opacity: 0.45 });
    sh.ln(L - 20, 220, L - 20, 240, { weight: 2.4, opacity: 0.8 });
    sh.ln(R + 20, 220, R + 20, 240, { weight: 2.4, opacity: 0.8 });
    sh.titleBlock();
    sh.pins();
  }

  // ---- sheet 4: section ----
  {
    const sh = sheet(1386, 500, 330, 500, 2.2);
    sh.paper();
    const gl = 420,
      L = 70,
      R = 260;
    // ground: heavy line with hatch below
    sh.ln(30, gl, 300, gl, { weight: 2.2, opacity: 0.8 });
    for (let u = 30; u < 300; u += 12) sh.ln(u, gl, u - 8, gl + 8, { weight: 0.9, opacity: 0.4 });
    // solum and foundations
    sh.box(L - 10, gl, 26, 18, { weight: 1.2, opacity: 0.6 });
    sh.box(R - 16, gl, 26, 18, { weight: 1.2, opacity: 0.6 });
    // walls (double line) rising to the eaves
    const eav = 130;
    sh.ln(L, gl, L, eav, { weight: 2 });
    sh.ln(L + 10, gl, L + 10, eav + 4, { weight: 1.2, opacity: 0.55 });
    sh.ln(R, gl, R, eav, { weight: 2 });
    sh.ln(R - 10, gl, R - 10, eav + 4, { weight: 1.2, opacity: 0.55 });
    // floors: joist depth as a pair of lines
    for (const fy of [gl - 90, gl - 185, gl - 280]) {
      sh.ln(L, fy, R, fy, { weight: 1.6 });
      sh.ln(L + 10, fy + 10, R - 10, fy + 10, { weight: 1, opacity: 0.5 });
    }
    // ground floor slab
    sh.ln(L, gl - 8, R, gl - 8, { weight: 1.4 });
    // pitched roof: rafters as a pair, ridge, and a rear pitch
    const ridgeU = (L + R) / 2,
      ridgeV = 62;
    sh.ln(L - 12, eav + 4, ridgeU, ridgeV, { weight: 2 });
    sh.ln(R + 12, eav + 4, ridgeU, ridgeV, { weight: 2 });
    sh.ln(L, eav + 14, ridgeU, ridgeV + 12, { weight: 1, opacity: 0.5 });
    sh.ln(R, eav + 14, ridgeU, ridgeV + 12, { weight: 1, opacity: 0.5 });
    // attic floor and dormer to the front
    sh.ln(L, eav, R, eav, { weight: 1.4 });
    sh.ln(L + 30, eav, L + 30, 96);
    sh.ln(L + 30, 96, L + 80, 96);
    sh.ln(L + 80, 96, L + 80, eav);
    sh.ln(L + 30, 96, L + 55, 82);
    sh.ln(L + 55, 82, L + 80, 96, { weight: 1, opacity: 0.5 });
    // chimney breast through the section
    const roofAt = (u) => eav + 4 - ((R + 12 - u) / (R + 12 - ridgeU)) * (eav + 4 - ridgeV);
    sh.ln(R - 40, gl - 8, R - 40, roofAt(R - 40), { weight: 1.2, opacity: 0.6 });
    sh.ln(R - 24, roofAt(R - 24), R - 24, ridgeV + 18, { weight: 1.6 });
    sh.ln(R - 40, roofAt(R - 40), R - 40, ridgeV + 18, { weight: 1.6 });
    sh.ln(R - 44, ridgeV + 18, R - 20, ridgeV + 18, { weight: 1.6 });
    sh.ln(R - 44, ridgeV + 24, R - 20, ridgeV + 24, { weight: 1, opacity: 0.5 });
    // windows in the cut wall: short breaks with sill and head marks
    for (const wy of [gl - 70, gl - 165, gl - 260]) {
      sh.fill(L - 1, wy - 40, 12, 40, PAPER);
      sh.ln(L, wy - 40, L + 10, wy - 40, { weight: 1.2 });
      sh.ln(L, wy, L + 10, wy, { weight: 1.2 });
      sh.ln(L + 5, wy - 40, L + 5, wy, { weight: 1, opacity: 0.6 });
    }
    // stair flight seen beyond, drawn as a light zigzag
    let su = R - 50,
      sv = gl - 8;
    for (let k = 0; k < 8; k++) {
      sh.ln(su, sv, su, sv - 10, { weight: 1, opacity: 0.45 });
      sh.ln(su, sv - 10, su - 12, sv - 10, { weight: 1, opacity: 0.45 });
      su -= 12;
      sv -= 10;
    }
    // level markers: small triangles at each floor on the right
    for (const fy of [gl, gl - 90, gl - 185, gl - 280]) {
      sh.ln(R + 24, fy, R + 34, fy - 8, { weight: 1.1, opacity: 0.6 });
      sh.ln(R + 34, fy - 8, R + 44, fy, { weight: 1.1, opacity: 0.6 });
      sh.ln(R + 24, fy, R + 44, fy, { weight: 1.1, opacity: 0.6 });
    }
    sh.titleBlock();
    sh.pins();
  }

  return s;
}
