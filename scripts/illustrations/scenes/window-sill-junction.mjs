import { Scene, SANDSTONE, INK, PAPER, STONE } from '../toolkit.mjs';

/** Close-up of the junction between a new timber sash window and its projecting sandstone sill, square-on. */
export function windowSillJunction() {
  const s = new Scene({
    width: 1200,
    height: 1200,
    title: 'Window sill junction',
    description:
      'Close-up of the bottom rail of a painted timber sash window meeting a projecting sandstone sill above two courses of stone.',
  });
  const W = s.w,
    H = s.h;
  const reveal = 96; // stone reveal each side of the window
  const fx0 = reveal,
    fx1 = W - reveal; // outer face of the timber frame
  const paneTop = 0,
    railTop = 590,
    subSillTop = 736,
    sillTop = 792,
    sillBottom = 922;

  // ---- masonry below the sill: two courses of sandstone with lime joints ----
  s.rect(0, sillBottom, W, H - sillBottom, STONE);
  const joint = 14,
    course = (H - sillBottom - joint * 2) / 2;
  const stones = [
    [0, 0.5, 0.0],
    [0.5, 1.12, 0.03],
    [-0.25, 0.25, 0.05],
    [0.25, 0.8, 0.0],
    [0.8, 1.25, 0.03],
  ];
  for (let r = 0; r < 2; r++) {
    const y = sillBottom + joint + r * (course + joint);
    for (const [a, b, tone] of stones.slice(r === 0 ? 0 : 2, r === 0 ? 2 : 5)) {
      const x0 = Math.max(a * W + joint / 2, 0),
        x1 = Math.min(b * W - joint / 2, W);
      s.rect(x0, y, x1 - x0, course, SANDSTONE);
      if (tone) s.shade(x0, y, x1 - x0, course, tone);
      if (r) s.light(x0, y, x1 - x0, 8, 0.2); // slight arris catching light on the lower course
      s.shade(x0, y + course - 8, x1 - x0, 8, 0.05);
    }
  }
  s.shade(0, sillBottom, W, 58, 0.22); // shadow cast by the projecting sill
  s.shade(0, sillBottom + 58, W, 14, 0.08);

  // ---- reveals either side of the frame (above the sill) ----
  s.rect(0, 0, reveal, sillTop, SANDSTONE);
  s.rect(fx1, 0, reveal, sillTop, SANDSTONE);
  s.shade(0, 0, reveal, sillTop, 0.22); // left reveal in shade
  s.shade(0, 0, 26, sillTop, 0.1); // deepening toward the outer arris
  s.shade(fx1, 0, reveal, sillTop, 0.12); // right reveal catches more light
  s.light(W - 26, 0, 26, sillTop, 0.14);
  s.line(reveal * 0.72, 0, reveal * 0.72, sillTop, { opacity: 0.1 }); // faint tooling line
  s.line(fx1 + reveal * 0.28, 0, fx1 + reveal * 0.28, sillTop, { opacity: 0.08 });

  // ---- projecting sandstone sill ----
  const sillX0 = 0,
    sillX1 = W; // sill runs off both edges at this range
  s.rect(sillX0, sillTop, sillX1 - sillX0, sillBottom - sillTop, SANDSTONE);
  s.light(sillX0, sillTop, sillX1 - sillX0, 26, 0.45); // weathered top surface catching light
  s.rect(sillX0, sillTop + 26, sillX1 - sillX0, 3, INK, { opacity: 0.2 }); // arris
  s.shade(sillX0, sillBottom - 30, sillX1 - sillX0, 30, 0.1); // underside turning away
  s.line(sillX0 + 24, sillBottom - 14, sillX1 - 24, sillBottom - 14, { weight: 3, opacity: 0.6 }); // throating
  s.shade(0, sillTop, 60, sillBottom - sillTop, 0.06); // faint fall-off toward the shaded side

  // ---- timber frame: pane, bottom rail, sub-sill ----
  const frameX0 = fx0 + 18,
    frameX1 = fx1 - 18; // frame set slightly back into the reveal
  s.rect(fx0, 0, 18, sillTop, PAPER); // outer frame edge (box lining)
  s.rect(fx1 - 18, 0, 18, sillTop, PAPER);
  s.shade(fx0, 0, 18, sillTop, 0.16);
  s.shade(fx1 - 18, 0, 18, sillTop, 0.06);
  s.rect(frameX0, paneTop, frameX1 - frameX0, railTop - paneTop, INK, { opacity: 0.82 }); // glass
  // sky reflection: two soft diagonal bands across the glass
  s.poly(
    [
      [frameX0, paneTop],
      [frameX0 + 420, paneTop],
      [frameX0 + 120, railTop],
      [frameX0, railTop],
    ],
    PAPER,
    { opacity: 0.09 },
  );
  s.poly(
    [
      [frameX0 + 520, paneTop],
      [frameX0 + 640, paneTop],
      [frameX0 + 340, railTop],
      [frameX0 + 220, railTop],
    ],
    PAPER,
    { opacity: 0.05 },
  );
  s.poly(
    [
      [frameX0, paneTop],
      [frameX0 + 200, paneTop],
      [frameX0, railTop * 0.55],
    ],
    PAPER,
    { opacity: 0.06 },
  );
  // stiles of the sash within the box
  s.rect(frameX0, paneTop, 44, railTop, PAPER);
  s.rect(frameX1 - 44, paneTop, 44, railTop, PAPER);
  s.shade(frameX0, paneTop, 44, railTop, 0.08);
  s.line(frameX0 + 44, paneTop, frameX0 + 44, railTop, { opacity: 0.3 });
  s.line(frameX1 - 44, paneTop, frameX1 - 44, railTop, { opacity: 0.3 });
  // putty / glazing bead line along the bottom of the pane
  s.rect(frameX0 + 44, railTop - 10, frameX1 - frameX0 - 88, 10, PAPER, { opacity: 0.9 });
  s.shade(frameX0 + 44, railTop - 10, frameX1 - frameX0 - 88, 4, 0.2);
  // bottom rail
  s.rect(frameX0, railTop, frameX1 - frameX0, subSillTop - railTop, PAPER);
  s.shade(frameX0, railTop, frameX1 - frameX0, 6, 0.12); // shadow where the bead meets the rail
  s.shade(frameX0, subSillTop - 16, frameX1 - frameX0, 16, 0.1); // rail turning under
  s.line(frameX0, subSillTop - 16, frameX1, subSillTop - 16, { opacity: 0.16 });
  // slim projecting sub-sill
  s.rect(fx0, subSillTop, fx1 - fx0, sillTop - subSillTop, PAPER);
  s.light(fx0, subSillTop, fx1 - fx0, 12, 0.6);
  s.shade(fx0, subSillTop + 12, fx1 - fx0, sillTop - subSillTop - 12, 0.06);
  s.shade(fx0, sillTop - 12, fx1 - fx0, 12, 0.18); // drip edge underside
  s.line(fx0, sillTop - 12, fx1, sillTop - 12, { opacity: 0.28 });
  s.shade(fx0, sillTop, fx1 - fx0, 16, 0.2); // sub-sill shadow onto the stone sill

  // ---- sealant / pointing where timber meets stone on the left ----
  s.rect(fx0 - 14, 0, 14, subSillTop + 8, STONE);
  s.shade(fx0 - 14, 0, 4, subSillTop + 8, 0.14);
  s.light(fx0 - 7, 0, 4, subSillTop + 8, 0.4); // tooled concave bead catching light
  s.line(fx1, 0, fx1, subSillTop, { opacity: 0.25 }); // right-hand joint left as a simple shadow line

  // ---- trickle ventilator at the top of the frame ----
  const railH = 84; // meeting rail of the lower sash along the top edge
  s.rect(frameX0, 0, frameX1 - frameX0, railH, PAPER);
  s.shade(frameX0, railH - 10, frameX1 - frameX0, 10, 0.1);
  s.shade(frameX0, railH, frameX1 - frameX0, 22, 0.16); // rail shadow onto the glass
  s.line(frameX0, railH, frameX1, railH, { opacity: 0.35 });
  const vx = frameX0 + 240,
    vw = frameX1 - frameX0 - 480,
    vy = 30,
    vh = 22;
  s.shade(vx - 14, vy + vh, vw + 28, 5, 0.12);
  s.rect(vx, vy, vw, vh, INK);
  s.rect(vx, vy, 30, vh, PAPER);
  s.rect(vx + vw - 30, vy, 30, vh, PAPER);
  s.shade(vx, vy, 30, vh, 0.1);
  s.shade(vx + vw - 30, vy, 30, vh, 0.1);
  return s;
}
