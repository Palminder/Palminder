import { Scene, SANDSTONE, INK, PAPER, STONE, WHITE } from '../toolkit.mjs';

/** A two-storey tenement bay during a window-replacement programme: old sashes above, new timber sashes below, scaffold to the left. */
export function windowInstallationStudy() {
  const s = new Scene({
    width: 1600,
    height: 1000,
    title: 'Window installation study',
    description:
      'A two-storey sandstone bay window with worn old sash windows on the upper floor and new timber sash windows on the lower floor, with a scaffold and safety netting standing to the left under an overcast sky.',
  });
  const ground = 900;
  const eaves = 150;
  s.overcast(eaves + 60);

  // ---- flat façade behind the bay ----
  s.roof(-20, eaves - 44, s.w + 40, 60);
  s.facade(0, eaves, s.w, ground - eaves, { course: 36 });
  s.cornice(0, eaves, s.w, 20);
  s.cornice(0, 512, s.w, 8); // string course between storeys
  s.rect(0, ground - 22, s.w, 22, INK, { opacity: 0.18 }); // base course

  // ---- the bay: three faces, two storeys ----
  const bx = 470,
    bw = 760,
    by = eaves + 20,
    bh = ground - by;
  const side = 0.22;
  const bay = s.bay(bx, by, bw, bh, { side });
  const sw = bw * side; // return width
  const [il, ir] = bay.inner;
  // the bay projects: soft shadow onto the flat wall beside the shaded return, brighter edge on the lit side
  s.shade(bx - 26, by, 26, bh, 0.1);
  s.shade(bx - 12, by, 12, bh, 0.1);
  s.light(bx + bw, by, 10, bh, 0.18);
  s.shade(bx, by, sw, bh, 0.08);
  // stone pilasters at the face junctions
  for (const px of [bx, il, ir, bx + bw]) {
    s.rect(px - 7, by, 14, bh, SANDSTONE);
    s.light(px - 7, by, 6, bh, 0.25);
    s.shade(px + 1, by, 6, bh, 0.14);
  }
  // bay parapet/cornice at eaves and its own string course
  s.cornice(bx - 10, by - 4, bw + 20, 18);
  s.shade(bx - 10, by + 14, bw + 20, 22, 0.14);
  s.shade(bx - 10, by + 36, bw + 20, 14, 0.06);
  s.cornice(bx - 6, 512, bw + 12, 10);
  s.line(il, by, il, ground, { opacity: 0.3 });
  s.line(ir, by, ir, ground, { opacity: 0.3 });

  // ---- window helpers ----
  const reveal = 10;
  const glass = (x, y, w, h, op) => {
    s.rect(x, y, w, h, INK, { opacity: op });
    s.light(x + 3, y + 3, w - 6, h * 0.4, 0.1);
  };
  /** Old sash: dull, slightly uneven paper frame at half opacity, one cracked pane. */
  const oldWindow = (x, y, w, h, { crack = true } = {}) => {
    s.shade(x - reveal, y - reveal, w + reveal * 2, h + reveal, 0.22);
    glass(x, y, w, h, 0.7);
    s.rect(x, y, w, h, STONE, { opacity: 0.16 }); // dusty, dull glass
    const f = 0.5;
    // top sash dropped slightly: a thin dark gap under the head
    s.rect(x + 10, y + 9, w - 18, 3, INK, { opacity: 0.35 });
    // outer frame: four members with small unevenness in width and position
    s.rect(x, y, w, 9, PAPER, { opacity: f }); // head
    s.rect(x, y, 10, h, PAPER, { opacity: f }); // left jamb
    s.rect(x + w - 8, y + 2, 8, h - 2, PAPER, { opacity: f }); // right jamb, a touch thinner
    s.rect(x, y + h - 7, w, 7, PAPER, { opacity: f }); // bottom rail
    // meeting rail, very slightly dropped on one side
    s.poly(
      [
        [x, y + h * 0.5 - 4],
        [x + w, y + h * 0.5 - 2],
        [x + w, y + h * 0.5 + 5],
        [x, y + h * 0.5 + 3],
      ],
      PAPER,
      { opacity: f },
    );
    // astragal with a small kink at the meeting rail
    s.rect(x + w / 2 - 2, y, 4, h * 0.5, PAPER, { opacity: f * 0.9 });
    s.rect(x + w / 2 - 1, y + h * 0.5, 4, h * 0.5, PAPER, { opacity: f * 0.9 });
    // flaking: dull stone patches on the frame
    s.rect(x + w * 0.2, y + h - 7, w * 0.3, 7, STONE, { opacity: 0.5 });
    s.rect(x + w - 8, y + h * 0.6, 8, h * 0.25, STONE, { opacity: 0.45 });
    // weathered, thinner sill
    s.rect(x - reveal - 2, y + h, w + reveal * 2 + 4, 6, SANDSTONE);
    s.shade(x - reveal - 2, y + h, w + reveal * 2 + 4, 6, 0.1);
    s.shade(x - reveal - 2, y + h + 6, w + reveal * 2 + 4, 5, 0.16);
    if (crack) {
      // a thin ink crack across the lower-left pane
      const cx = x + 12,
        cy = y + h * 0.56;
      const pts = [
        [cx, cy + 6],
        [cx + w * 0.16, cy + h * 0.1],
        [cx + w * 0.22, cy + h * 0.28],
        [cx + w * 0.38, cy + h * 0.36],
      ];
      for (let i = 0; i < pts.length - 1; i++) {
        s.line(pts[i][0] + 1, pts[i][1] + 1, pts[i + 1][0] + 1, pts[i + 1][1] + 1, {
          color: INK,
          weight: 2,
          opacity: 0.6,
        });
        s.line(pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], {
          color: WHITE,
          weight: 1.8,
          opacity: 0.8,
        });
      }
      s.line(cx + w * 0.22, cy + h * 0.28, cx + w * 0.3, cy + h * 0.16, {
        color: WHITE,
        weight: 1.3,
        opacity: 0.65,
      });
      s.line(cx + w * 0.16, cy + h * 0.1, cx + w * 0.1, cy - h * 0.02, {
        color: WHITE,
        weight: 1.1,
        opacity: 0.5,
      });
    }
  };
  /** New timber sash: crisp full-opacity paper frame, deeper sill. */
  const newWindow = (x, y, w, h) => {
    s.shade(x - reveal, y - reveal, w + reveal * 2, h + reveal, 0.22);
    glass(x, y, w, h, 0.84);
    s.rect(x, y, w, 10, PAPER); // head
    s.rect(x, y, 10, h, PAPER);
    s.rect(x + w - 10, y, 10, h, PAPER);
    s.rect(x, y + h - 10, w, 10, PAPER);
    s.rect(x, y + h * 0.5 - 4, w, 8, PAPER); // meeting rail
    s.rect(x + w / 2 - 2, y, 4, h, PAPER); // astragal
    s.rect(x + 10, y + h * 0.5 - 4, w - 20, 2, INK, { opacity: 0.25 }); // shadow under top sash
    // deeper sill with a bold underside
    s.rect(x - reveal - 6, y + h, w + reveal * 2 + 12, 14, SANDSTONE);
    s.light(x - reveal - 6, y + h, w + reveal * 2 + 12, 6, 0.45);
    s.shade(x - reveal - 6, y + h + 14, w + reveal * 2 + 12, 10, 0.2);
  };

  // window positions: upper storey (old) and lower storey (new)
  const upY = by + 60,
    upH = 230;
  const loY = 560,
    loH = 270;
  const m = 34; // margin inside each face
  // centre face: one wide window per storey
  oldWindow(il + m, upY, ir - il - 2 * m, upH);
  newWindow(il + m, loY, ir - il - 2 * m, loH);
  // returns: narrower windows
  const rm = 30;
  oldWindow(bx + rm, upY, sw - 2 * rm, upH, { crack: false });
  oldWindow(ir + rm, upY, sw - 2 * rm, upH, { crack: false });
  newWindow(bx + rm, loY, sw - 2 * rm, loH);
  newWindow(ir + rm, loY, sw - 2 * rm, loH);
  // re-assert return tone over glass so the faces read as turned away
  s.shade(bx, by, sw, bh, 0.06);
  s.light(bx + bw - sw, by, sw, bh, 0.06);

  // one small window on the plain wall to the right, old above, new below
  oldWindow(1360, upY + 10, 96, upH - 20, { crack: false });
  newWindow(1360, loY, 96, loH - 10);

  // ---- scaffold on the left ----
  const sx1 = 130,
    sx2 = 340,
    top = 70;
  const tube = (x, y, w, h) => {
    s.rect(x, y, w, h, INK, { opacity: 0.85 });
    s.rect(x, y, w > h ? w : 2, w > h ? 2 : h, PAPER, { opacity: 0.25 });
  };
  // safety netting between the standards
  s.rect(sx1 + 3, top + 40, sx2 - sx1 - 6, ground - top - 40, PAPER, { opacity: 0.2 });
  for (let y = top + 60; y < ground; y += 28)
    s.line(sx1 + 3, y, sx2 - 3, y, { color: PAPER, opacity: 0.35 });
  for (let x = sx1 + 20; x < sx2; x += 28)
    s.line(x, top + 40, x, ground, { color: PAPER, opacity: 0.3 });
  for (let x = sx1 + 6; x < sx2; x += 28) s.line(x, top + 40, x, ground, { opacity: 0.05 });
  s.rect(sx1 + 3, top + 40, sx2 - sx1 - 6, ground - top - 40, PAPER, { opacity: 0.08 });
  // netting sags a little at the bottom edge
  s.poly(
    [
      [sx1 + 3, ground - 30],
      [sx2 - 3, ground - 30],
      [sx2 - 3, ground - 12],
      [sx1 + 60, ground - 4],
      [sx1 + 3, ground - 14],
    ],
    PAPER,
    { opacity: 0.3 },
  );
  // ledgers
  const ledgers = [top + 40, 300, 540, 760, ground - 40];
  for (const ly of ledgers) tube(sx1 - 12, ly, sx2 - sx1 + 24, 6);
  // standards
  tube(sx1, top, 6, ground - top);
  tube(sx2, top, 6, ground - top);
  // diagonal brace
  s.line(sx1 + 3, 760, sx2 + 3, 300, { weight: 5, opacity: 0.75 });
  // transoms out to the wall (short tubes)
  for (const ly of ledgers) tube(sx2 + 6, ly, 60, 6);
  // couplers at each junction
  for (const ly of ledgers)
    for (const x of [sx1, sx2]) s.rect(x - 4, ly - 4, 14, 14, INK, { opacity: 0.9 });
  // base plates
  s.rect(sx1 - 12, ground - 8, 30, 8, INK, { opacity: 0.7 });
  s.rect(sx2 - 12, ground - 8, 30, 8, INK, { opacity: 0.7 });
  // scaffold board at first-floor level, laid across the ledger
  s.rect(sx1 - 24, 522, sx2 - sx1 + 96, 22, SANDSTONE);
  s.light(sx1 - 24, 522, sx2 - sx1 + 96, 6, 0.4);
  s.shade(sx1 - 24, 538, sx2 - sx1 + 96, 6, 0.25);
  s.line(sx1 - 24, 533, sx2 + 72, 533, { opacity: 0.2 });
  // toe board and guard rail on the board level
  tube(sx1 - 12, 470, sx2 - sx1 + 24, 6);
  s.rect(sx1 - 24, 506, sx2 - sx1 + 96, 14, SANDSTONE);
  s.shade(sx1 - 24, 506, sx2 - sx1 + 96, 14, 0.12);
  // board casts a soft shadow down the wall
  s.shade(sx1 - 10, 546, sx2 - sx1 + 60, 14, 0.08);
  // scaffold shadow onto the wall
  s.shade(sx1 + 30, ground - 6, sx2 - sx1, 6, 0.15);

  // ---- ground ----
  s.pavement(ground, { depth: 60 });
  s.rect(0, ground + 66, s.w, s.h - ground - 66, INK, { opacity: 0.4 });
  s.rect(0, ground + 66, s.w, 3, PAPER, { opacity: 0.2 });
  return s;
}
