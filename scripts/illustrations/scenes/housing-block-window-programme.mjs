import { Scene, INK, PAPER, STONE, MOSS, SANDSTONE, WHITE } from '../toolkit.mjs';

/**
 * A three-storey post-war low-rise housing block seen square-on, part way through a window
 * replacement programme in occupied homes. The left half already has its new windows, the right
 * half still has the old ones; a mobile scaffold tower stands at the junction in front of the
 * first old window, with the next new unit waiting on the ground beside the common entrance.
 */
export function housingBlockWindowProgramme() {
  const s = new Scene({
    width: 1600,
    height: 1000,
    title: 'Housing block window programme',
    description:
      'A three-storey roughcast post-war housing block with paired windows, new pale-framed windows on its left half and older windows on the right, a mobile scaffold tower beside the central entrance door with a new window unit leaning against the wall, and a grass strip, path and low fence in front under an overcast sky.',
  });

  // ---- layout ---------------------------------------------------------------------------------
  const ground = 840; // base of the wall; the foreground occupies the bottom 16%
  const storey = 175,
    floors = 3;
  const eaves = ground - storey * floors; // 315
  const ridge = eaves - 70; // 245: the sky above is the top quarter
  const x0 = 60,
    x1 = 1540,
    bw = x1 - x0; // 1480 wide block
  const bay = 205,
    bays = 3; // window bays per half
  const ex = x0 + bay * bays,
    ew = bw - bay * bays * 2; // entrance bay 675..925
  const rightX = ex + ew; // 925: start of the old half
  const ww = 64,
    wh = 100,
    gap = 22,
    reveal = 6; // paired window leaves
  const pairInset = (bay - (ww * 2 + gap)) / 2; // 27.5
  const wyOf = (f) => eaves + f * storey + 40; // f = 0 is the top storey
  const leafX = (bx, i) => bx + pairInset + i * (ww + gap);

  // ---- local helpers --------------------------------------------------------------------------
  /** Roughcast wall in stone with faint horizontal shade bands and a soft line at each floor. */
  const roughcast = (x, y, w, h) => {
    s.rect(x, y, w, h, STONE);
    for (let f = 0; f < floors; f++) {
      const fy = y + f * storey;
      if (f % 2) s.shade(x, fy, w, storey, 0.03);
      s.shade(x, fy + storey - 36, w, 36, 0.04); // heavier band under each floor line
      if (f) s.line(x, fy, x + w, fy, { opacity: 0.09 });
    }
    for (let cy = y + 44; cy < y + h; cy += 44) s.line(x, cy, x + w, cy, { opacity: 0.035 }); // dash-coat banding
  };

  /** Roller blind pulled part-way down inside a window. */
  const blind = (x, y, w, h, drop = 0.38) => {
    s.rect(x + 4, y + 4, w - 8, h * drop, PAPER, { opacity: 0.55 });
    s.rect(x + 4, y + 4 + h * drop, w - 8, 2, INK, { opacity: 0.5 });
  };
  /** Curtains drawn back to the jambs. */
  const curtains = (x, y, w, h) => {
    s.rect(x + 4, y + 4, w * 0.2, h - 8, PAPER, { opacity: 0.45 });
    s.rect(x + w - 4 - w * 0.2, y + 4, w * 0.2, h - 8, PAPER, { opacity: 0.45 });
  };

  /** New replacement window: crisp paper frame, trickle vent in the head, deep paper sill. */
  const newWindow = (x, y, w, h, { dressing = null } = {}) => {
    s.light(x - reveal - 8, y - reveal - 8, w + reveal * 2 + 16, h + reveal + 26, 0.09); // made-good render around the new unit
    s.window(x, y, w, h, { reveal, sill: false });
    s.light(x + 4, y + 4, w - 8, h * 0.42, 0.08); // new double glazing catches more sky
    if (dressing === 'blind') blind(x, y, w, h);
    if (dressing === 'curtains') curtains(x, y, w, h);
    const f = 5,
      head = 9;
    s.rect(x, y, w, head, PAPER);
    s.rect(x, y + h - f, w, f, PAPER);
    s.rect(x, y, f, h, PAPER);
    s.rect(x + w - f, y, f, h, PAPER);
    s.rect(x + w / 2 - 3, y, 6, h, PAPER); // mullion
    s.rect(x, y + h / 2 - 3, w, 6, PAPER); // transom
    // trickle ventilator in the head: a slim ink slot with paper end caps
    s.rect(x + 8, y + 2, w - 16, 5, INK, { opacity: 0.12 });
    s.rect(x + 11, y + 3, w - 22, 3, INK, { opacity: 0.8 });
    s.rect(x + 8, y + 2, 3, 5, PAPER);
    s.rect(x + w - 11, y + 2, 3, 5, PAPER);
    // deep paper sill with a lit top edge and a shadow beneath
    s.rect(x - 8, y + h, w + 16, 10, PAPER);
    s.rect(x - 8, y + h, w + 16, 3, WHITE, { opacity: 0.7 });
    s.shade(x - 8, y + h + 10, w + 16, 7, 0.22);
    s.shade(x - 4, y + h + 17, w + 8, 6, 0.08);
  };

  /** Old post-war window: duller frame, thin sill, weathering, optionally a cracked pane. */
  const oldWindow = (x, y, w, h, { cracked = false, dressing = null } = {}) => {
    s.window(x, y, w, h, { reveal, sill: false });
    s.shade(x, y, w, h, 0.06); // grimier glass
    if (dressing === 'blind') blind(x, y, w, h, 0.3);
    if (dressing === 'curtains') curtains(x, y, w, h);
    const f = 4;
    s.rect(x, y, w, f, PAPER, { opacity: 0.5 });
    s.rect(x, y + h - f, w, f, PAPER, { opacity: 0.5 });
    s.rect(x, y, f, h, PAPER, { opacity: 0.5 });
    s.rect(x + w - f, y, f, h, PAPER, { opacity: 0.5 });
    s.rect(x, y + h / 2 - 2, w, 4, INK, { opacity: 0.3 }); // dull the meeting rail
    s.rect(x + w / 2 - 1.5, y, 3, h, INK, { opacity: 0.25 }); // and the astragal
    // thin weathered sill
    s.rect(x - 6, y + h, w + 12, 5, PAPER, { opacity: 0.5 });
    s.shade(x - 6, y + h + 5, w + 12, 4, 0.14);
    s.rect(x - 4, y + h + 9, 9, 28, INK, { opacity: 0.05 }); // run-off staining below the sill ends
    s.rect(x + w - 5, y + h + 9, 9, 28, INK, { opacity: 0.05 });
    if (cracked) {
      const px = x + w / 2 + 2,
        py = y + h / 2 + 2,
        pw = w / 2 - 6,
        ph = h / 2 - 6;
      s.light(px, py, pw, ph, 0.22); // the cracked pane catches the light differently
      const pts = [
        [px + 2, py + 5],
        [px + 12, py + 18],
        [px + 9, py + 30],
        [px + 20, py + 38],
        [px + pw - 1, py + ph - 2],
      ];
      for (let i = 0; i < pts.length - 1; i++)
        s.line(pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], { weight: 2, opacity: 0.95 });
      s.line(px + 12, py + 18, px + pw - 1, py + 6, { weight: 1.5, opacity: 0.9 });
      s.line(px + 9, py + 30, px + 1, py + ph - 3, { weight: 1.5, opacity: 0.9 });
    }
  };

  /** Bare opening where the old frame has just come out, seen behind the tower. */
  const bareOpening = (x, y, w, h) => {
    s.shade(x - reveal - 3, y - reveal - 3, w + reveal * 2 + 6, h + reveal + 3, 0.25);
    s.rect(x - 2, y - 2, w + 4, h + 2, INK, { opacity: 0.86 });
    s.rect(x + 4, y + 2, w * 0.45, h - 6, PAPER, { opacity: 0.14 }); // dust sheet hung inside
    s.rect(x - 8, y + h, w + 16, 6, STONE); // exposed sub-sill
    s.shade(x - 8, y + h, w + 16, 6, 0.2);
    s.shade(x - 8, y + h + 6, w + 16, 5, 0.14);
  };

  /** Rainwater downpipe with a faint shadow to its right and a shoe at the foot. */
  const downpipe = (x) => {
    s.shade(x + 6, eaves + 8, 4, ground - eaves - 20, 0.08);
    s.rect(x, eaves + 6, 6, ground - eaves - 18, INK, { opacity: 0.45 });
    s.rect(x - 2, eaves + 6, 10, 8, INK, { opacity: 0.4 }); // outlet
    s.rect(x, ground - 14, 10, 6, INK, { opacity: 0.45 }); // shoe
  };

  // ---- sky, distance and trees ----------------------------------------------------------------
  s.overcast(eaves - 20);
  s.rect(0, 0, s.w, 70, STONE, { opacity: 0.06 }); // heavier cloud lid at the top
  // mature trees behind either end of the block, canopies just breaking the roofline
  const tree = (cx, mirror) => {
    const m = mirror ? -1 : 1;
    const o = 0.7;
    s.circle(cx - 30 * m, 580, 150, MOSS, { opacity: o });
    s.circle(cx + 40 * m, 500, 90, MOSS, { opacity: o });
    s.circle(cx - 50 * m, 420, 130, MOSS, { opacity: o });
    s.circle(cx + 20 * m, 360, 80, MOSS, { opacity: o });
    s.circle(cx + 6 * m, 318, 96, MOSS, { opacity: o });
    s.circle(cx + 48 * m, 292, 52, MOSS, { opacity: o });
    s.circle(cx - 40 * m, 270, 58, MOSS, { opacity: o });
    s.circle(cx - 30 * m, 280, 44, PAPER, { opacity: 0.1 }); // lit top
    s.circle(cx - 20 * m, 620, 120, INK, { opacity: 0.08 }); // underside of the canopy
  };
  tree(22, false);
  tree(1578, true);
  s.light(0, 0, s.w, eaves, 0.1); // aerial haze over everything behind the block
  s.light(0, 0, 120, eaves + 40, 0.12); // and a little more on the trees, which are furthest away
  s.light(s.w - 120, 0, 120, eaves + 40, 0.12);

  // ---- roof: shallow hip in ink at half strength, ridge catching the light -------------------
  const rx = x0 - 16,
    rw = bw + 32,
    hip = 90;
  s.poly(
    [
      [rx, eaves],
      [rx + rw, eaves],
      [rx + rw - hip, ridge],
      [rx + hip, ridge],
    ],
    INK,
    { opacity: 0.5 },
  );
  for (let cy = ridge + 12; cy < eaves - 4; cy += 12) {
    const t = (eaves - cy) / (eaves - ridge);
    s.line(rx + hip * t, cy, rx + rw - hip * t, cy, { color: PAPER, opacity: 0.1 });
  }
  s.rect(rx + hip, ridge, rw - hip * 2, 5, PAPER, { opacity: 0.5 }); // ridge highlight
  s.line(rx, eaves, rx + hip, ridge, { color: PAPER, opacity: 0.3, weight: 2 }); // hip lines
  s.line(rx + rw, eaves, rx + rw - hip, ridge, { color: PAPER, opacity: 0.3, weight: 2 });
  // two flue stacks straddling the ridge
  for (const cx of [x0 + bay * 1.5, x1 - bay * 1.5]) {
    s.rect(cx - 22, ridge - 40, 44, 58, SANDSTONE);
    s.shade(cx - 22, ridge - 40, 44, 58, 0.1);
    s.shade(cx - 22, ridge - 40, 6, 58, 0.14); // return in shade
    s.rect(cx - 26, ridge - 40, 52, 8, SANDSTONE);
    s.light(cx - 26, ridge - 40, 52, 8, 0.3);
    s.rect(cx - 14, ridge - 62, 10, 22, INK, { opacity: 0.55 }); // flue terminals
    s.rect(cx + 4, ridge - 62, 10, 22, INK, { opacity: 0.55 });
  }

  // ---- wall ------------------------------------------------------------------------------------
  roughcast(x0, eaves, bw, ground - eaves);
  // fascia and gutter along the eaves, shadow on the wall beneath
  s.rect(rx, eaves - 4, rw, 10, STONE);
  s.shade(rx, eaves - 4, rw, 10, 0.22);
  s.light(rx, eaves - 4, rw, 2, 0.3);
  s.shade(x0, eaves + 6, bw, 12, 0.16);
  s.shade(x0, eaves + 18, bw, 8, 0.07);
  // the corners: a whisper of shade at each end so the wall reads as turning away
  s.shade(x0, eaves, 14, ground - eaves, 0.06);
  s.shade(x1 - 14, eaves, 14, ground - eaves, 0.06);
  s.line(x0, eaves, x0, ground, { opacity: 0.2 });
  s.line(x1, eaves, x1, ground, { opacity: 0.2 });
  // plinth
  s.rect(x0, ground - 18, bw, 18, INK, { opacity: 0.14 });
  s.light(x0, ground - 18, bw, 2, 0.15);

  // ---- windows: new on the left, old on the right --------------------------------------------
  const newDressing = {
    '0,1,0': 'blind',
    '1,2,1': 'curtains',
    '2,0,1': 'blind',
    '1,0,0': 'curtains',
  };
  const oldDressing = {
    '0,1,1': 'blind',
    '1,0,1': 'curtains',
    '2,2,0': 'blind',
    '0,2,0': 'curtains',
    '2,0,1': 'curtains',
  };
  for (let f = 0; f < floors; f++) {
    const wy = wyOf(f);
    for (let b = 0; b < bays; b++) {
      for (let i = 0; i < 2; i++)
        newWindow(leafX(x0 + b * bay, i), wy, ww, wh, {
          dressing: newDressing[`${f},${b},${i}`] ?? null,
        });
    }
    for (let b = 0; b < bays; b++) {
      for (let i = 0; i < 2; i++) {
        const x = leafX(rightX + b * bay, i);
        if (f === 0 && b === 0 && i === 0)
          bareOpening(x, wy, ww, wh); // the one coming out today, behind the tower
        else
          oldWindow(x, wy, ww, wh, {
            cracked: f === 1 && b === 2 && i === 1,
            dressing: oldDressing[`${f},${b},${i}`] ?? null,
          });
      }
    }
  }

  // ---- entrance bay: door with canopy and half-landing stair windows ---------------------------
  const dw = 92,
    dh = 150,
    dcx = ex + 110,
    dx = dcx - dw / 2,
    dy = ground - dh;
  newWindow(dcx - 28, ground - storey * 2.5 - 42, 56, 84);
  newWindow(dcx - 28, ground - storey * 1.5 - 42, 56, 84);
  s.rect(dx - 16, dy - 22, dw + 32, 10, STONE); // canopy slab
  s.light(dx - 16, dy - 22, dw + 32, 3, 0.35);
  s.shade(dx - 16, dy - 12, dw + 32, 10, 0.25);
  s.door(dx, dy, dw, dh, { fanlight: true });
  s.rect(dx + dw - 16, dy + dh * 0.58, 4, 14, PAPER, { opacity: 0.6 }); // pull handle
  s.rect(dx + 8, dy + dh * 0.55, dw - 16, 3, PAPER, { opacity: 0.25 }); // push plate line
  s.rect(dx - 6, ground - 6, dw + 12, 6, STONE); // threshold step
  s.shade(dx - 6, ground - 6, dw + 12, 6, 0.18);

  downpipe(x0 + 4);
  downpipe(x1 - 10);
  downpipe(ex - 8);

  // ---- foreground: path along the base, grass strip, fence, pavement --------------------------
  const pathD = 34,
    grassBottom = 952;
  s.rect(0, ground, s.w, pathD, STONE);
  s.shade(0, ground, s.w, pathD, 0.05);
  s.shade(0, ground, s.w, 8, 0.14); // shadow at the foot of the wall
  s.rect(0, ground + pathD, s.w, 3, INK, { opacity: 0.15 });
  s.rect(0, ground + pathD + 3, s.w, grassBottom - ground - pathD - 3, MOSS);
  s.light(0, ground + pathD + 3, s.w, 6, 0.08);
  s.shade(0, grassBottom - 14, s.w, 14, 0.1);
  // path from the door down to the pavement
  const px0 = dx - 12,
    pxw = dw + 24;
  s.rect(px0, ground + pathD, pxw, grassBottom - ground - pathD, STONE);
  s.shade(px0, ground + pathD, pxw, grassBottom - ground - pathD, 0.04);
  s.rect(px0, ground + pathD, 3, grassBottom - ground - pathD, INK, { opacity: 0.16 });
  s.rect(px0 + pxw - 3, ground + pathD, 3, grassBottom - ground - pathD, INK, { opacity: 0.16 });
  s.line(px0, ground + pathD + 40, px0 + pxw, ground + pathD + 40, { opacity: 0.12 });
  // low fence line along the back of the pavement, broken at the path
  const railY = 932;
  s.rect(0, railY, px0 - 6, 3, INK, { opacity: 0.4 });
  s.rect(px0 + pxw + 6, railY, s.w - px0 - pxw - 6, 3, INK, { opacity: 0.4 });
  for (let x = 30; x < s.w; x += 64) {
    if (x > px0 - 12 && x < px0 + pxw + 8) continue;
    s.rect(x, railY - 14, 4, 22, INK, { opacity: 0.4 });
  }
  // pavement
  s.rect(0, grassBottom, s.w, s.h - grassBottom, STONE);
  s.shade(0, grassBottom, s.w, s.h - grassBottom, 0.08);
  s.rect(0, grassBottom, s.w, 4, INK, { opacity: 0.2 });
  s.shade(0, s.h - 12, s.w, 12, 0.06);

  // ---- mobile scaffold tower in front of the first old window ---------------------------------
  const tw = 88,
    tx = leafX(rightX, 0) - reveal - 7; // 939..1027, wrapped round the leaf it serves
  const platY = eaves + storey; // second-floor level
  const topRail = platY - 68,
    midRail = platY - 34,
    tTop = topRail - 2;
  const post = 6;
  const tBot = ground - 10;
  // debris netting wrapped round the tower, denser round the working lift
  s.rect(tx, tTop, tw, tBot + 4 - tTop, PAPER, { opacity: 0.25 });
  s.rect(tx, tTop, tw, platY - tTop, PAPER, { opacity: 0.12 });
  // shadow of the frame on the wall behind
  s.shade(tx + post, tTop + 4, 5, tBot - tTop, 0.1);
  s.shade(tx + tw, tTop + 4, 5, tBot - tTop, 0.1);
  s.shade(tx, platY, tw + 6, 10, 0.16); // under the platform
  s.shade(tx - 6, tBot + 4, tw + 18, 8, 0.16); // on the path
  // diagonal braces between the lower ledgers
  const ledgers = [platY + 70, platY + 140, platY + 210, platY + 280, tBot - 4];
  for (let i = 0; i < ledgers.length - 1; i++) {
    const a = ledgers[i],
      b = ledgers[i + 1];
    if (i % 2) s.line(tx + post, a, tx + tw - post, b, { weight: 3, opacity: 0.5 });
    else s.line(tx + tw - post, a, tx + post, b, { weight: 3, opacity: 0.5 });
  }
  s.line(tx + post, platY, tx + tw - post, ledgers[0], { weight: 3, opacity: 0.5 });
  // standards
  s.rect(tx, tTop, post, tBot - tTop, INK, { opacity: 0.7 });
  s.rect(tx + tw - post, tTop, post, tBot - tTop, INK, { opacity: 0.7 });
  // ledgers: guardrails, platform ledger, frame rungs below
  for (const y of [topRail, midRail, platY, ...ledgers])
    s.rect(tx, y, tw, post, INK, { opacity: 0.7 });
  // board platform with toe board
  s.rect(tx + 2, platY - 22, tw - 4, 13, SANDSTONE);
  s.shade(tx + 2, platY - 22, tw - 4, 13, 0.12);
  s.rect(tx, platY - 9, tw, 9, SANDSTONE);
  s.light(tx, platY - 9, tw, 2, 0.4);
  s.line(tx, platY - 3, tx + tw, platY - 3, { opacity: 0.2 });
  // castors
  for (const cx of [tx + post / 2, tx + tw - post / 2]) {
    s.circle(cx, tBot + 4, 8, INK, { opacity: 0.7 });
    s.circle(cx, tBot + 4, 3, PAPER, { opacity: 0.35 });
  }

  // ---- new window unit leaning against the wall between the door and the tower ----------------
  const uw = 64,
    uh = 96,
    ux = dx + dw + 20,
    uy = ground - uh;
  s.shade(ux + uw, uy + 6, 6, uh - 6, 0.14); // stands proud of the wall
  s.shade(ux - 4, uy + uh - 3, uw + 14, 6, 0.22); // shadow on the path
  s.rect(ux, uy, uw, uh, PAPER);
  s.rect(ux + 5, uy + 5, uw - 10, uh - 10, INK, { opacity: 0.8 });
  s.rect(ux + uw / 2 - 3, uy, 6, uh, PAPER);
  s.rect(ux, uy + uh / 2 - 3, uw, 6, PAPER);
  s.light(ux + 8, uy + 8, uw / 2 - 11, uh / 2 - 11, 0.14);
  s.shade(ux, uy, uw, 2, 0.12); // top edge of the frame in shade

  return s;
}
