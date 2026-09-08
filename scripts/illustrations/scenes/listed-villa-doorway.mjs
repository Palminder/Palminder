import { Scene, SANDSTONE, INK, PAPER, STONE, MOSS } from '../toolkit.mjs';

/** Front doorway of a listed Victorian sandstone villa: columned porch, panelled door with fanlight, railings. */
export function listedVillaDoorway() {
  const s = new Scene({
    width: 1600,
    height: 1000,
    title: 'Listed villa doorway',
    description:
      'The front doorway of a Victorian sandstone villa, seen square-on: a porch with two plain columns and a parapet, a panelled timber door beneath a semicircular fanlight, two stone steps, a tall sash window on either side and cast-iron railings in front.',
  });

  // ---- local helpers ----
  /** A stepped moulding: `steps` rects growing outward as they rise, light on top, shade beneath. */
  const moulding = (x, y, w, h, steps = 3, grow = 6) => {
    const sh = h / steps;
    for (let i = 0; i < steps; i++) {
      const g = grow * (steps - 1 - i);
      s.rect(x - g, y + i * sh, w + g * 2, sh, SANDSTONE);
      s.light(x - g, y + i * sh, w + g * 2, sh, 0.35 - i * 0.1);
    }
    s.shade(x, y + h, w, h * 0.5, 0.18);
  };
  /** Plain classical column: shaft as a rect with shade on the left and a light strip to the right. */
  const column = (x, y, w, h) => {
    // shaft
    s.rect(x, y, w, h, SANDSTONE);
    s.shade(x, y, w * 0.3, h, 0.16);
    s.shade(x, y, w * 0.12, h, 0.12);
    s.light(x + w * 0.5, y, w * 0.24, h, 0.32);
    s.shade(x + w * 0.9, y, w * 0.1, h, 0.1);
    // capital: neck ring, echinus, abacus (stepped)
    s.rect(x - 2, y - 6, w + 4, 6, SANDSTONE);
    s.light(x - 2, y - 6, w + 4, 6, 0.2);
    s.rect(x - 8, y - 20, w + 16, 14, SANDSTONE);
    s.light(x - 8, y - 20, w + 16, 14, 0.3);
    s.shade(x - 8, y - 20, (w + 16) * 0.3, 14, 0.1);
    s.rect(x - 14, y - 34, w + 28, 14, SANDSTONE);
    s.light(x - 14, y - 34, w + 28, 14, 0.4);
    s.shade(x - 14, y - 34, (w + 28) * 0.3, 14, 0.1);
    // base: torus and plinth (stepped)
    s.rect(x - 6, y + h, w + 12, 12, SANDSTONE);
    s.light(x - 6, y + h, w + 12, 12, 0.3);
    s.shade(x - 6, y + h, (w + 12) * 0.3, 12, 0.1);
    s.rect(x - 14, y + h + 12, w + 28, 16, SANDSTONE);
    s.light(x - 14, y + h + 12, w + 28, 16, 0.15);
    s.shade(x - 14, y + h + 12, (w + 28) * 0.3, 16, 0.1);
    s.shade(x - 14, y + h + 28, w + 28, 6, 0.2);
  };
  /** Raised door panel: field with light top/left edges and shade bottom/right. */
  const panel = (x, y, w, h) => {
    s.shade(x - 4, y - 4, w + 8, h + 8, 0.35); // sunk moulding
    s.rect(x, y, w, h, INK, { opacity: 0.85 });
    s.light(x, y, w, 4, 0.3);
    s.light(x, y, 4, h, 0.3);
    s.shade(x, y + h - 4, w, 4, 0.5);
    s.shade(x + w - 4, y, 4, h, 0.5);
    s.light(x + 10, y + 10, w - 20, h - 20, 0.06);
  };

  // ---- levels ----
  const skyTop = 116; // parapet coping starts here: sky only in the top ~12%
  const wallTop = 124;
  const ground = 840; // foot of the bottom step / pavement
  const plinthTop = 940; // railing plinth
  const porchX = 560,
    porchW = 480; // the porch, centred
  const cx = 800;

  // ---- sky ----
  s.overcast(skyTop);

  // ---- wall: sandstone ashlar coursing, full width ----
  s.coursing(0, wallTop, s.w, ground - wallTop, { course: 44, stone: 186, joint: 5 });
  // wall-head cornice either side of the porch
  moulding(0, wallTop, s.w, 22, 2, 0);
  // base course
  s.rect(0, ground - 40, s.w, 40, SANDSTONE);
  s.shade(0, ground - 40, s.w, 40, 0.14);
  s.light(0, ground - 40, s.w, 5, 0.3);

  // ---- sash windows either side ----
  const winY = 330,
    winW = 130,
    winH = 340;
  for (const wx of [215, 1255]) {
    // dressed margins around the opening
    s.rect(wx - 30, winY - 30, winW + 60, winH + 46, SANDSTONE);
    s.light(wx - 30, winY - 30, winW + 60, winH + 46, 0.18);
    // lintel
    s.rect(wx - 34, winY - 46, winW + 68, 18, SANDSTONE);
    s.light(wx - 34, winY - 46, winW + 68, 18, 0.3);
    s.shade(wx - 34, winY - 28, winW + 68, 6, 0.14);
    s.window(wx, winY, winW, winH, { reveal: 10 });
    // upper-sash astragal glazing bars
    s.rect(wx, winY + winH * 0.25, winW, 3, PAPER, { opacity: 0.5 });
    s.rect(wx, winY + winH * 0.75, winW, 3, PAPER, { opacity: 0.5 });
  }

  // ---- porch: recessed back wall ----
  const entabTop = 176,
    entabBot = 270;
  s.shade(porchX, entabBot, porchW, ground - entabBot, 0.2); // recess in shadow
  s.shade(porchX, entabBot, porchW, 30, 0.2); // soffit shadow under the entablature
  // cast shadow of the projecting porch on the wall to the right, and a thin one to the left
  s.shade(porchX + porchW, entabTop, 26, ground - entabTop, 0.2);
  s.shade(porchX + porchW + 26, entabTop, 10, ground - entabTop, 0.08);
  s.shade(porchX - 8, entabTop, 8, ground - entabTop, 0.08);

  // ---- door with fanlight ----
  const doorX = 700,
    doorW = 200,
    doorY = 400,
    doorBot = 760;
  const fanR = doorW / 2;
  s.shade(doorX - 26, doorY - fanR - 26, doorW + 52, doorBot - doorY + fanR + 26, 0.2); // reveal
  // stone arch ring around the fanlight
  s.circle(cx, doorY, fanR + 22, SANDSTONE);
  s.light(cx - fanR - 22, doorY - fanR - 22, (fanR + 22) * 2, fanR + 22, 0.15);
  s.circle(cx, doorY, fanR + 10, INK, { opacity: 0.85 }); // timber frame ring
  s.circle(cx, doorY, fanR, PAPER, { opacity: 0.7 }); // glazed fanlight
  s.light(cx - fanR, doorY - fanR, fanR * 2, fanR * 0.6, 0.35);
  for (let i = 1; i <= 5; i++) {
    const a = (Math.PI * i) / 6;
    s.line(cx, doorY, cx + Math.cos(a) * fanR * -1, doorY - Math.sin(a) * fanR, {
      weight: 3,
      color: INK,
      opacity: 0.85,
    });
  }
  // clip the lower half of the circles with the porch wall, then the door leaf, jambs and transom
  s.rect(doorX - 26, doorY, doorW + 52, doorBot - doorY, SANDSTONE);
  s.shade(doorX - 26, doorY, doorW + 52, doorBot - doorY, 0.34);
  s.shade(doorX - 26, doorY, doorW + 52, doorBot - doorY, 0.2);
  s.rect(doorX - 22, doorY, doorW + 44, doorBot - doorY, INK, { opacity: 0.85 }); // frame and door
  s.rect(doorX - 22, doorY - 6, doorW + 44, 14, INK, { opacity: 0.9 }); // transom
  s.light(doorX - 22, doorY - 6, doorW + 44, 3, 0.25);
  s.light(doorX - 22, doorY, 6, doorBot - doorY, 0.12); // jamb faces
  s.light(doorX + doorW + 16, doorY, 6, doorBot - doorY, 0.12);
  s.shade(doorX - 16, doorY + 8, 16, doorBot - doorY - 8, 0.4); // door stop shadow
  s.shade(doorX + doorW, doorY + 8, 16, doorBot - doorY - 8, 0.4);
  // four raised panels
  const pw = 68,
    gap = 22;
  panel(cx - gap / 2 - pw, doorY + 34, pw, 130);
  panel(cx + gap / 2, doorY + 34, pw, 130);
  panel(cx - gap / 2 - pw, doorY + 196, pw, 130);
  panel(cx + gap / 2, doorY + 196, pw, 130);
  // knob
  s.circle(cx + gap / 2 + pw + 10, doorY + 178, 6, SANDSTONE);
  s.shade(cx + gap / 2 + pw + 10, doorY + 178 - 6, 6, 12, 0.2);
  // threshold
  s.rect(doorX - 22, doorBot - 6, doorW + 44, 6, STONE);

  // ---- columns ----
  const colW = 60,
    colTop = 304,
    colBot = 732;
  column(590, colTop, colW, colBot - colTop);
  column(950, colTop, colW, colBot - colTop);

  // ---- entablature and parapet ----
  // architrave and frieze
  s.rect(porchX, entabTop + 40, porchW, entabBot - entabTop - 40, SANDSTONE);
  s.light(porchX, entabTop + 40, porchW, entabBot - entabTop - 40, 0.1);
  s.line(porchX, entabBot - 18, porchX + porchW, entabBot - 18, { opacity: 0.16 });
  s.line(porchX, entabBot - 8, porchX + porchW, entabBot - 8, { opacity: 0.16 });
  s.shade(porchX, entabBot - 6, porchW, 6, 0.18);
  s.shade(porchX, entabTop + 40, porchW, 4, 0.14);
  // moulded cornice projecting over the frieze
  moulding(porchX + 6, entabTop, porchW - 12, 40, 3, 8);
  // parapet with moulded coping
  s.rect(porchX - 4, skyTop + 22, porchW + 8, entabTop - skyTop - 22, SANDSTONE);
  s.light(porchX - 4, skyTop + 22, porchW + 8, entabTop - skyTop - 22, 0.18);
  s.line(porchX + 40, skyTop + 22, porchX + 40, entabTop, { opacity: 0.1 });
  s.line(porchX + porchW - 40, skyTop + 22, porchX + porchW - 40, entabTop, { opacity: 0.1 });
  moulding(porchX + 2, skyTop, porchW - 4, 22, 2, 8);
  // parapet returns in shade (the porch projects forward of the wall)
  s.shade(porchX + porchW + 4, skyTop, 8, entabTop - skyTop, 0.2);

  // ---- steps ----
  const stepH = 40;
  // top step (stylobate) between and beneath the columns
  s.rect(porchX, ground - stepH * 2, porchW, stepH, SANDSTONE);
  s.light(porchX, ground - stepH * 2, porchW, 6, 0.4);
  s.shade(porchX, ground - stepH * 2 + 6, porchW, 8, 0.2); // under the nosing
  s.shade(porchX, ground - stepH * 2, porchW, stepH, 0.04);
  // bottom step
  s.rect(porchX - 20, ground - stepH, porchW + 40, stepH, SANDSTONE);
  s.light(porchX - 20, ground - stepH, porchW + 40, 6, 0.4);
  s.shade(porchX - 20, ground - stepH + 6, porchW + 40, 8, 0.2);
  s.shade(porchX - 20, ground - stepH, porchW + 40, stepH, 0.02);
  // step ends in shade and a little sunk return either side
  s.shade(porchX, ground - stepH * 2, 8, stepH, 0.12);
  s.shade(porchX - 20, ground - stepH, 8, stepH, 0.12);

  // ---- pavement, path and railing plinth ----
  s.rect(0, ground, s.w, plinthTop - ground, STONE);
  s.shade(0, ground, s.w, plinthTop - ground, 0.08);
  s.shade(0, ground, s.w, 8, 0.12); // shadow at the foot of the wall and step
  // low sandstone plinth with coping
  s.rect(0, plinthTop, s.w, s.h - plinthTop, SANDSTONE);
  s.shade(0, plinthTop, s.w, s.h - plinthTop, 0.06);
  s.rect(0, plinthTop, s.w, 12, SANDSTONE);
  s.light(0, plinthTop, s.w, 12, 0.35);
  s.shade(0, plinthTop + 12, s.w, 6, 0.16);
  for (let px = 0; px < s.w; px += 150)
    s.line(px + 75, plinthTop + 18, px + 75, s.h, { opacity: 0.1 });
  s.rect(0, s.h - 14, s.w, 14, MOSS, { opacity: 0.18 }); // weathering at the base
  // path through the plinth, on axis with the door
  const gateX = 740,
    gateW = 120;
  s.rect(gateX, ground, gateW, s.h - ground, STONE);
  s.shade(gateX, ground, gateW, s.h - ground, 0.04);
  s.shade(gateX, plinthTop, 6, s.h - plinthTop, 0.18); // plinth ends
  s.light(gateX + gateW - 6, plinthTop, 6, s.h - plinthTop, 0.25);
  for (let fy = ground + 30; fy < s.h; fy += 30)
    s.line(gateX, fy, gateX + gateW, fy, { opacity: 0.1 });

  // ---- cast-iron railings ----
  const railTop = 862;
  const railBar = (x, y1, y2, weight) => s.line(x, y1, x, y2, { weight, color: INK, opacity: 0.9 });
  for (let x = 15; x < s.w; x += 30) {
    if (x > gateX && x < gateX + gateW) continue;
    railBar(x, railTop, plinthTop, 4);
    s.circle(x, railTop - 6, 4, INK, { opacity: 0.9 }); // finial
  }
  s.line(0, railTop, gateX, railTop, { weight: 6, color: INK, opacity: 0.9 });
  s.line(gateX + gateW, railTop, s.w, railTop, { weight: 6, color: INK, opacity: 0.9 });
  s.line(0, plinthTop - 14, gateX, plinthTop - 14, { weight: 4, color: INK, opacity: 0.9 });
  s.line(gateX + gateW, plinthTop - 14, s.w, plinthTop - 14, {
    weight: 4,
    color: INK,
    opacity: 0.9,
  });
  // gate: posts and a taller leaf standing open
  railBar(gateX, railTop - 30, plinthTop + 6, 12);
  railBar(gateX + gateW, railTop - 30, plinthTop + 6, 12);
  s.circle(gateX, railTop - 38, 9, INK, { opacity: 0.9 });
  s.circle(gateX + gateW, railTop - 38, 9, INK, { opacity: 0.9 });

  return s;
}
