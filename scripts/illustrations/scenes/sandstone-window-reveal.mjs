import { Scene, SANDSTONE, INK, PAPER, STONE, TERRACOTTA, MOSS, WHITE } from '../toolkit.mjs';

/** Close-up of a single Victorian timber sash window set deep in a red-sandstone tenement wall. */
export function sandstoneWindowReveal() {
  const s = new Scene({
    width: 1200,
    height: 1500,
    title: 'Sandstone window reveal',
    description:
      'A single white-painted timber sash window set deep in a red-sandstone wall, with a flat stone lintel above, dressed margins either side and a projecting sill casting a shadow beneath.',
  });
  const W = s.w,
    H = s.h;

  // ---- opening geometry: middle 55% of width, 50% of height ----
  const ox = 270,
    ow = 660; // opening (structural) 270..930
  const oy = 375,
    oh = 750; // 375..1125
  const reveal = 46; // depth of reveal seen as a shaded return
  const margin = 96; // dressed margin width either side of the opening
  const lintelH = 118;
  const sillH = 56,
    sillProj = 34;

  // ---- wall: red sandstone ashlar coursing edge to edge ----
  s.coursing(0, 0, W, H, { course: 92, stone: 236, joint: 8, fill: SANDSTONE, jointFill: STONE });
  s.rect(0, 0, W, H, TERRACOTTA, { opacity: 0.34 }); // warm red cast over the whole wall
  // gentle tonal drift: a touch brighter towards the top, cooler at the base (stepped very softly)
  for (let i = 0; i < 4; i++) s.light(0, 0, W, 120 + i * 100, 0.02);
  for (let i = 0; i < 4; i++) s.shade(0, H - 120 - i * 100, W, 120 + i * 100, 0.015);

  // ---- dressed margins (smooth blocks) either side, between lintel and sill ----
  const dressed = (x, y, w, h) => {
    s.rect(x, y, w, h, SANDSTONE);
    s.rect(x, y, w, h, TERRACOTTA, { opacity: 0.22 });
    s.light(x, y, w, h, 0.1);
  };
  const mTop = oy - lintelH,
    mBot = oy + oh + sillH;
  // margin blocks in courses of 92 + 8 joint, alternating long-and-short
  const courseStep = 100;
  for (let side = 0; side < 2; side++) {
    const left = side === 0;
    let row = 0;
    for (let cy = mTop + lintelH; cy < oy + oh; cy += courseStep, row++) {
      const long = row % 2 === 0;
      const bw = long ? margin + 40 : margin;
      const bh = Math.min(courseStep - 8, oy + oh - cy);
      const bx = left ? ox - bw : ox + ow;
      dressed(bx, cy, bw, bh);
      // fine joint line between blocks
      s.line(bx, cy + bh + 4, bx + bw, cy + bh + 4, { opacity: 0.16, weight: 2 });
    }
    // vertical outer joint of the margin
    const jx = left ? ox - margin - 40 : ox + ow + margin + 40;
    s.line(jx, mTop + lintelH, jx, oy + oh, { opacity: 0.1, weight: 2 });
  }

  // ---- flat lintel: a single long dressed stone with a joint below it ----
  const lx = ox - margin - 40,
    lw = ow + (margin + 40) * 2;
  dressed(lx, mTop, lw, lintelH);
  s.light(lx, mTop, lw, lintelH, 0.08);
  s.line(lx, mTop, lx + lw, mTop, { opacity: 0.2, weight: 3 });
  s.line(lx, oy - 4, lx + lw, oy - 4, { opacity: 0.22, weight: 3 });
  s.line(lx, mTop, lx, oy - 4, { opacity: 0.12, weight: 2 });
  s.line(lx + lw, mTop, lx + lw, oy - 4, { opacity: 0.12, weight: 2 });
  // faint tooling marks on the lintel face
  for (let x = lx + 24; x < lx + lw - 20; x += 22)
    s.line(x, mTop + 14, x + 6, oy - 18, { opacity: 0.05 });

  // ---- the reveal: returns receding into the wall ----
  // outer edge of opening (wall plane) -> inner frame plane at reveal depth
  const fx = ox + reveal,
    fw = ow - reveal * 2; // frame plane x, width
  const fy = oy + reveal,
    fh = oh - reveal; // frame plane y (top only; sill sits at bottom)
  // fill the whole opening dark first
  s.rect(ox, oy, ow, oh, INK, { opacity: 0.55 });
  // returns: head (darkest), left (lit slightly from the right), right (deep shade)
  s.poly(
    [
      [ox, oy],
      [ox + ow, oy],
      [fx + fw, fy],
      [fx, fy],
    ],
    SANDSTONE,
  );
  s.poly(
    [
      [ox, oy],
      [ox + ow, oy],
      [fx + fw, fy],
      [fx, fy],
    ],
    INK,
    { opacity: 0.5 },
  );
  s.poly(
    [
      [ox, oy],
      [fx, fy],
      [fx, oy + oh],
      [ox, oy + oh],
    ],
    SANDSTONE,
  );
  s.poly(
    [
      [ox, oy],
      [fx, fy],
      [fx, oy + oh],
      [ox, oy + oh],
    ],
    INK,
    { opacity: 0.26 },
  );
  s.poly(
    [
      [ox + ow, oy],
      [fx + fw, fy],
      [fx + fw, oy + oh],
      [ox + ow, oy + oh],
    ],
    SANDSTONE,
  );
  s.poly(
    [
      [ox + ow, oy],
      [fx + fw, fy],
      [fx + fw, oy + oh],
      [ox + ow, oy + oh],
    ],
    INK,
    { opacity: 0.4 },
  );
  s.rect(ox, oy, ow, oh, TERRACOTTA, { opacity: 0.18 });
  // arrises
  s.line(ox, oy, ox, oy + oh, { opacity: 0.3, weight: 2 });
  s.line(ox + ow, oy, ox + ow, oy + oh, { opacity: 0.3, weight: 2 });
  s.line(ox, oy, ox + ow, oy, { opacity: 0.3, weight: 2 });

  // ---- sash window in the frame plane ----
  const gx = fx,
    gy = fy,
    gw = fw,
    gh = fh; // outer face of the box frame
  const frame = 26; // outer frame / pulley stile width
  const stile = 22,
    rail = 24,
    meet = 30,
    bar = 10;
  // outer frame (paper) with a shadow line where it meets the reveal
  s.rect(gx, gy, gw, gh, PAPER);
  s.shade(gx, gy, gw, gh, 0.08);
  s.shade(gx, gy, gw, 6, 0.2);
  s.shade(gx, gy, 6, gh, 0.14);
  // glazing area within the box frame
  const ax = gx + frame,
    ay = gy + frame,
    aw = gw - frame * 2,
    ah = gh - frame;
  s.rect(ax, ay, aw, ah, INK, { opacity: 0.86 });
  // upper sash: glass with sky reflection
  const upH = Math.round(ah / 2);
  s.light(ax + stile, ay + rail, aw - stile * 2, upH - rail, 0.14);
  for (let i = 1; i <= 6; i++)
    s.rect(ax + stile, ay + rail, aw - stile * 2, (upH - rail) * (0.75 - i * 0.1), WHITE, {
      opacity: 0.035,
    });
  // a soft diagonal of reflected light across the upper glass
  s.poly(
    [
      [ax + stile, ay + rail],
      [ax + aw * 0.6, ay + rail],
      [ax + stile, ay + upH * 0.7],
    ],
    WHITE,
    { opacity: 0.07 },
  );
  s.poly(
    [
      [ax + stile, ay + rail],
      [ax + aw * 0.4, ay + rail],
      [ax + stile, ay + upH * 0.45],
    ],
    WHITE,
    { opacity: 0.06 },
  );
  // lower sash glass: a little darker, interior in shadow
  s.shade(ax + stile, ay + upH, aw - stile * 2, ah - upH, 0.1);
  // upper sash frame: top rail, stiles (paper)
  s.rect(ax, ay, aw, rail, PAPER);
  s.rect(ax, ay, stile, upH, PAPER);
  s.rect(ax + aw - stile, ay, stile, upH, PAPER);
  // upper sash vertical astragal
  s.rect(ax + aw / 2 - bar / 2, ay, bar, upH, PAPER);
  // meeting rail: lower sash sits in front, so it casts a shadow on the upper glass
  s.shade(ax + stile, ay + upH - 10, aw - stile * 2, 10, 0.22);
  s.rect(ax, ay + upH, aw, meet, PAPER);
  s.light(ax, ay + upH, aw, 6, 0.4);
  // lower sash: stiles, bottom rail, astragal
  s.rect(ax, ay + upH, stile, ah - upH, PAPER);
  s.rect(ax + aw - stile, ay + upH, stile, ah - upH, PAPER);
  s.rect(ax, ay + ah - rail - 6, aw, rail + 6, PAPER);
  s.rect(ax + aw / 2 - bar / 2, ay + upH, bar, ah - upH, PAPER);
  // each pane: a thin shadow along its top and left where the timber stands proud of the glass
  const panes = [
    [ax + stile, ay + rail, aw / 2 - bar / 2 - stile, upH - rail],
    [ax + aw / 2 + bar / 2, ay + rail, aw / 2 - bar / 2 - stile, upH - rail],
    [ax + stile, ay + upH + meet, aw / 2 - bar / 2 - stile, ah - upH - meet - rail - 6],
    [ax + aw / 2 + bar / 2, ay + upH + meet, aw / 2 - bar / 2 - stile, ah - upH - meet - rail - 6],
  ];
  for (const [px, py, pw, ph] of panes) {
    s.shade(px, py, pw, 5, 0.3);
    s.shade(px, py, 4, ph, 0.22);
  }
  // putty line: a hairline of paper just inside each pane edge
  for (const [px, py, pw, ph] of panes) {
    s.line(px, py + ph - 1, px + pw, py + ph - 1, { color: PAPER, opacity: 0.25 });
    s.line(px + pw - 1, py, px + pw - 1, py + ph, { color: PAPER, opacity: 0.2 });
  }
  // slight warmth on the frame from the sandstone
  s.rect(gx, gy, gw, gh, SANDSTONE, { opacity: 0.06 });

  // ---- projecting stone sill ----
  const sx = ox - sillProj,
    sw = ow + sillProj * 2,
    sy = oy + oh;
  // sill top surface (a thin strip, very light)
  s.rect(sx, sy, sw, 14, SANDSTONE);
  s.light(sx, sy, sw, 14, 0.5);
  // sill face
  s.rect(sx, sy + 14, sw, sillH - 14, SANDSTONE);
  s.rect(sx, sy + 14, sw, sillH - 14, TERRACOTTA, { opacity: 0.16 });
  s.light(sx, sy + 14, sw, sillH - 14, 0.12);
  // weathered moss-green tint along the top and dribbling on the face
  s.rect(sx, sy, sw, 14, MOSS, { opacity: 0.22 });
  s.rect(sx, sy + 14, sw, 10, MOSS, { opacity: 0.14 });
  s.rect(sx + 40, sy + 14, 120, sillH - 14, MOSS, { opacity: 0.1 });
  s.rect(sx + sw - 200, sy + 14, 90, sillH - 14, MOSS, { opacity: 0.12 });
  s.rect(sx + 300, sy + 14, 60, sillH - 14, MOSS, { opacity: 0.08 });
  // sill ends and arris
  s.line(sx, sy + 14, sx + sw, sy + 14, { opacity: 0.22, weight: 2 });
  s.shade(sx + sw - 14, sy + 14, 14, sillH - 14, 0.14);
  s.light(sx, sy + 14, 8, sillH - 14, 0.18);
  // shadow cast by the sill on the wall beneath, stepped so it softens downward
  const shY = sy + sillH;
  s.shade(sx, shY, sw, 30, 0.3);
  s.shade(sx + 6, shY + 30, sw - 12, 18, 0.18);
  s.shade(sx + 12, shY + 48, sw - 24, 14, 0.1);
  s.shade(sx + 18, shY + 62, sw - 36, 10, 0.05);
  // weathering streak below the sill ends where water runs off
  for (let i = 0; i < 4; i++) {
    s.rect(sx + 22 + i * 3, shY, 26 - i * 6, 90 + i * 30, MOSS, { opacity: 0.04 });
    s.rect(sx + sw - 60 + i * 3, shY, 30 - i * 6, 110 + i * 36, MOSS, { opacity: 0.045 });
  }

  return s;
}
