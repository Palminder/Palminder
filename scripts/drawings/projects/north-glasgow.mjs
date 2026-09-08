import { Sheet, INK, ACCENT, PAPER } from '../toolkit.mjs';

const PROJECT = 'North Glasgow Window & Ventilation Programme';

export function northGlasgowTypology() {
  const s = new Sheet({
    width: 1600,
    height: 1131,
    number: 'Drawing 01',
    title: 'Annotated window typology',
    projectTitle: PROJECT,
    unitPx: 90,
    scaleNote: 'Scale bar 0–2 m',
    description:
      'Window typology sheet: six typical opening types across the blocks drawn as elevations with opening lights, sizes and recorded exceptions keyed to the survey matrix, and a key plan of a block with window positions numbered.',
  });
  const u = 90; // px per metre
  const types = [
    {
      id: 'W1',
      name: 'Single casement',
      w: 0.9,
      h: 1.2,
      lights: [['s', 0, 0, 0.9, 1.2]],
      note: 'Bedroom, gable',
      ex: ['Two openings narrowed by 40 mm', '(matrix B2-07, B4-03)'],
    },
    {
      id: 'W2',
      name: 'Double casement',
      w: 1.5,
      h: 1.2,
      lights: [
        ['s', 0, 0, 0.75, 1.2],
        ['s', 0.75, 0, 0.75, 1.2],
      ],
      note: 'Living room',
      ex: ['One replaced 1990s unit retained (B1-11)'],
    },
    {
      id: 'W3',
      name: 'Casement and fixed light',
      w: 1.8,
      h: 1.2,
      lights: [
        ['s', 0, 0, 0.6, 1.2],
        ['f', 0.6, 0, 1.2, 1.2],
      ],
      note: 'Living room, front',
      ex: ['Sill height varies 850–900 mm'],
    },
    {
      id: 'W4',
      name: 'Kitchen, trickle vent',
      w: 1.2,
      h: 1.05,
      lights: [
        ['t', 0, 0, 1.2, 0.35],
        ['f', 0, 0.35, 1.2, 0.7],
      ],
      note: 'Kitchen, rear',
      ex: ['Extract fan adjacent:', 'coordinate with W4 head'],
    },
    {
      id: 'W5',
      name: 'Bathroom, obscured',
      w: 0.6,
      h: 0.9,
      lights: [['t', 0, 0, 0.6, 0.9]],
      note: 'Bathroom',
      ex: ['Obscured glass to all;', 'two with vent grille below'],
    },
    {
      id: 'W6',
      name: 'Stair window',
      w: 0.9,
      h: 1.8,
      lights: [
        ['f', 0, 0, 0.9, 0.9],
        ['t', 0, 0.9, 0.9, 0.9],
      ],
      note: 'Common stair',
      ex: ['Restricted opening and', 'safety glass required'],
    },
  ];
  let x = 90;
  const baseY = 420; // sill datum for all windows (bottom of frame)
  for (const t of types) {
    const W = t.w * u,
      H = t.h * u;
    const x0 = x,
      y0 = baseY - H;
    s.label(x0, 150, t.id, { size: 16, weight: 500 });
    s.note(x0, 172, t.name, { size: 13 });
    s.rect(x0, y0, W, H, { weight: 1.6 }); // outer frame
    s.rect(x0 + 6, y0 + 6, W - 12, H - 12, { weight: 0.8 });
    for (const [kind, lx, ly, lw, lh] of t.lights) {
      const ax = x0 + lx * u,
        ay = y0 + ly * u,
        aw = lw * u,
        ah = lh * u;
      s.rect(ax + 6, ay + 6, aw - 12, ah - 12, { weight: 0.8 });
      if (kind === 's') {
        // side-hung: triangle from hinge side (left) to the opposite mid
        s.path(`M${ax + 8} ${ay + 8}L${ax + aw - 8} ${ay + ah / 2}L${ax + 8} ${ay + ah - 8}`, {
          weight: 0.7,
          dashed: true,
        });
      } else if (kind === 't') {
        // top-hung
        s.path(`M${ax + 8} ${ay + 8}L${ax + aw / 2} ${ay + ah - 8}L${ax + aw - 8} ${ay + 8}`, {
          weight: 0.7,
          dashed: true,
        });
      } else {
        // fixed
        s.note(ax + aw / 2, ay + ah / 2 + 4, 'fixed', { size: 10, anchor: 'middle' });
      }
    }
    if (t.id === 'W4') {
      s.rectNew(x0 + 10, y0 - 10, W - 20, 8);
      s.note(x0 + W / 2, y0 - 16, 'Trickle ventilator in head', {
        size: 9,
        anchor: 'middle',
        color: ACCENT,
      });
    }
    // sill line and size note
    s.rectPoche(x0 - 8, baseY, W + 16, 6);
    s.note(x0, baseY + 26, `${Math.round(t.w * 1000)} × ${Math.round(t.h * 1000)} mm nominal`, {
      size: 11,
    });
    s.note(x0, baseY + 44, t.note, { size: 11 });
    s.note(x0, baseY + 70, 'Exceptions recorded', { size: 11, color: ACCENT });
    t.ex.forEach((e, i) => s.note(x0, baseY + 88 + i * 16, e, { size: 10 }));
    x += Math.max(W, 150) + 70;
  }
  s.note(
    90,
    128,
    'Typical types across the blocks. Sizes are nominal; every opening is measured and carried on the window schedule with its matrix reference.',
    { size: 12 },
  );
  // Key plan of a block: 24 m × 9 m at 10 px/m, window positions numbered on the long elevations
  const kx = 90,
    ky = 640,
    ku = 22;
  s.label(kx, ky - 20, 'Key plan · typical block (windows numbered on the schedule)', {
    size: 13,
    weight: 500,
  });
  s.rect(kx, ky, 24 * ku, 9 * ku, { weight: 1.4 });
  s.line(kx + 8 * ku, ky, kx + 8 * ku, ky + 9 * ku, { weight: 0.8 });
  s.line(kx + 16 * ku, ky, kx + 16 * ku, ky + 9 * ku, { weight: 0.8 });
  s.note(kx + 4 * ku, ky + 4.5 * ku + 4, 'Close 1', { size: 10, anchor: 'middle' });
  s.note(kx + 12 * ku, ky + 4.5 * ku + 4, 'Close 2', { size: 10, anchor: 'middle' });
  s.note(kx + 20 * ku, ky + 4.5 * ku + 4, 'Close 3', { size: 10, anchor: 'middle' });
  const positions = [1.2, 3.2, 5.2, 9.2, 11.2, 13.2, 17.2, 19.2, 21.2];
  positions.forEach((px, i) => {
    s.line(kx + px * ku, ky, kx + (px + 1.5) * ku, ky, { weight: 3 });
    s.note(kx + (px + 0.75) * ku, ky - 6, `${i + 1}`, { size: 9, anchor: 'middle' });
    s.line(kx + px * ku, ky + 9 * ku, kx + (px + 1.5) * ku, ky + 9 * ku, { weight: 3 });
    s.note(kx + (px + 0.75) * ku, ky + 9 * ku + 14, `${i + 10}`, { size: 9, anchor: 'middle' });
  });
  s.note(
    kx,
    ky + 9 * ku + 40,
    'Front elevation: positions 1–9 (W2, W3, W1). Rear elevation: positions 10–18 (W4, W5, W1). Stair windows W6 at each close.',
    { size: 11 },
  );
  s.note(
    kx,
    ky + 9 * ku + 58,
    'Survey matrix: one row per opening recording size, condition, ventilation provision and any deviation from the typical type.',
    { size: 11 },
  );
  s.legend(760, 660, [
    { swatch: 'dashed', text: 'Opening light: apex at the hinge side' },
    { swatch: 'new', text: 'New ventilation provision' },
    { swatch: 'poche', text: 'Sill / structure' },
  ]);
  s.scaleBar(760, 780, 2);
  s.north(1500, 660);
  return s.titleStrip();
}

export function northGlasgowDetails() {
  const s = new Sheet({
    width: 1200,
    height: 1600,
    number: 'Drawing 02',
    title: 'Head, jamb and sill details',
    projectTitle: PROJECT,
    unitPx: 600,
    scaleNote: 'Scale bar 0–300 mm',
    description:
      'Typical window head, jamb and sill details through the existing cavity wall: new frame, insulated cavity closer, sealant and backer rod, the airtightness line taped to the inner leaf, a trickle ventilator in the head and a sill with drip; numbered callouts.',
  });
  const u = 600; // px per metre (about 1:5)
  const outer = 0.1 * u,
    cavity = 0.06 * u,
    inner = 0.1 * u,
    plaster = 0.015 * u;
  const wallT = outer + cavity + inner;
  const c = (x, y, num, tx, ty) => {
    s.line(x, y, tx, ty, { weight: 0.7 });
    s.circle(x, y, 2.2, { fill: INK, weight: 0 });
    s.callout(tx, ty, num);
  };

  /** Draws a wall cut (horizontal band) with the outside at the left. ox,oy top-left; h height. */
  function wallBand(ox, oy, h) {
    // outer leaf (brick) poché, cavity, inner leaf (block) poché, plaster line
    s.rectPoche(ox, oy, outer, h);
    s.rect(ox + outer, oy, cavity, h, { weight: 0.6, opacity: 0.5 });
    s.rectPoche(ox + outer + cavity, oy, inner, h);
    s.line(ox + wallT + plaster, oy, ox + wallT + plaster, oy + h, { weight: 1.2 });
    return { inside: ox + wallT + plaster, outside: ox };
  }

  // ---- HEAD (top) ----
  let oy = 140;
  s.label(100, 110, 'Head', { size: 15, weight: 500 });
  const hx = 380;
  const bandH = 0.28 * u;
  wallBand(hx, oy, bandH);
  // opening below the band: lintel zone in the inner leaf (poché stays), frame head below
  const headY = oy + bandH;
  s.rectNew(hx + outer + cavity - 0.03 * u, headY - 0.03 * u, 0.09 * u, 0.03 * u); // insulated cavity closer / closer at the head
  s.rectNew(hx + outer + 0.01 * u, headY, 0.08 * u, 0.07 * u); // new frame head section
  s.rect(hx + outer + 0.03 * u, headY + 0.07 * u, 0.04 * u, 0.02 * u, { weight: 1, fill: INK }); // glazing bead / glass line
  s.line(hx + outer + 0.05 * u, headY + 0.09 * u, hx + outer + 0.05 * u, headY + 0.3 * u, {
    weight: 3,
  }); // glass
  s.rect(hx + outer + 0.02 * u, headY + 0.012 * u, 0.06 * u, 0.02 * u, {
    weight: 0.8,
    fill: PAPER,
    color: ACCENT,
  }); // trickle ventilator
  s.path(`M${hx + outer - 12} ${headY + 0.022 * u}L${hx + outer + 0.02 * u} ${headY + 0.022 * u}`, {
    weight: 1,
    color: ACCENT,
  });
  s.path(
    `M${hx + outer - 4} ${headY + 0.022 * u - 5}L${hx + outer - 12} ${headY + 0.022 * u}L${hx + outer - 4} ${headY + 0.022 * u + 5}`,
    { weight: 1, color: ACCENT },
  );
  s.dotted(
    hx + outer + cavity + 0.02 * u,
    oy + bandH * 0.4,
    hx + outer + cavity + 0.02 * u,
    headY + 0.02 * u,
  ); // airtightness tape from inner leaf to frame
  s.dotted(
    hx + outer + cavity + 0.02 * u,
    headY + 0.02 * u,
    hx + outer + 0.09 * u,
    headY + 0.02 * u,
  );
  s.circle(hx + outer - 4, headY + 0.035 * u, 5, { weight: 0.8 }); // sealant + backer rod outside
  s.rect(hx + wallT + plaster, headY - 0.012 * u, 0.12 * u, 0.012 * u, {
    weight: 0.8,
    fill: PAPER,
  }); // plasterboard reveal at the head
  s.line(hx + wallT + plaster, headY, hx + wallT + plaster + 0.12 * u, headY, { weight: 1.2 });
  s.insulation(hx + wallT + plaster, headY - 0.012 * u, 0.12 * u, 0.012 * u);
  c(hx + outer + 0.05 * u, headY + 0.022 * u, 1, 760, headY - 40);
  c(hx + outer + cavity + 0.02 * u, oy + bandH * 0.7, 2, 760, oy + bandH * 0.5);
  c(hx + outer + 0.04 * u, headY + 0.035 * u, 3, 760, headY + 40);
  c(hx + outer - 4, headY + 0.035 * u, 4, 200, headY + 40);
  c(hx + wallT + plaster + 0.06 * u, headY - 0.006 * u, 5, 760, headY + 100);
  s.note(hx - 20, oy + 20, 'Outside', { size: 11, anchor: 'end' });
  s.note(hx + wallT + plaster + 0.13 * u, oy + 20, 'Inside', { size: 11 });

  // ---- JAMB (middle, in plan) ----
  oy = 620;
  s.label(100, 590, 'Jamb (plan)', { size: 15, weight: 500 });
  const jx = 380;
  const jamH = 0.28 * u;
  wallBand(jx, oy, jamH);
  const jambY = oy + jamH; // the opening is "below" in the drawing = along the window
  s.rectNew(jx + outer + cavity - 0.03 * u, jambY - 0.03 * u, 0.09 * u, 0.03 * u); // insulated cavity closer
  s.rectNew(jx + outer + 0.01 * u, jambY, 0.08 * u, 0.07 * u); // frame jamb
  s.line(jx + outer + 0.05 * u, jambY + 0.07 * u, jx + outer + 0.05 * u, jambY + 0.3 * u, {
    weight: 3,
  }); // glass
  s.dotted(
    jx + outer + cavity + 0.02 * u,
    oy + jamH * 0.4,
    jx + outer + cavity + 0.02 * u,
    jambY + 0.02 * u,
  );
  s.dotted(
    jx + outer + cavity + 0.02 * u,
    jambY + 0.02 * u,
    jx + outer + 0.09 * u,
    jambY + 0.02 * u,
  );
  s.circle(jx + outer - 4, jambY + 0.035 * u, 5, { weight: 0.8 });
  s.rect(jx + wallT + plaster, jambY - 0.012 * u, 0.12 * u, 0.012 * u, {
    weight: 0.8,
    fill: PAPER,
  });
  s.insulation(jx + wallT + plaster, jambY - 0.012 * u, 0.12 * u, 0.012 * u);
  c(jx + outer + cavity + 0.01 * u, jambY - 0.015 * u, 6, 760, jambY - 30);
  c(jx + outer + cavity + 0.02 * u, oy + jamH * 0.7, 2, 760, oy + jamH * 0.5);
  c(jx + outer - 4, jambY + 0.035 * u, 4, 200, jambY + 40);
  c(jx + wallT + plaster + 0.06 * u, jambY - 0.006 * u, 5, 760, jambY + 60);
  s.note(jx - 20, oy + 20, 'Outside', { size: 11, anchor: 'end' });
  s.note(jx + wallT + plaster + 0.13 * u, oy + 20, 'Inside', { size: 11 });

  // ---- SILL (bottom) ----
  oy = 1100;
  s.label(100, 1070, 'Sill', { size: 15, weight: 500 });
  const sx = 380;
  const sillTop = oy + 0.1 * u;
  s.line(sx + outer + 0.05 * u, oy - 0.2 * u, sx + outer + 0.05 * u, oy - 0.02 * u, { weight: 3 }); // glass above
  s.rectNew(sx + outer + 0.01 * u, oy - 0.02 * u, 0.08 * u, 0.06 * u); // frame bottom rail
  // new sill with drip projecting beyond the outer face
  s.rectNew(sx - 0.04 * u, oy + 0.04 * u, outer + 0.06 * u, 0.03 * u);
  s.path(`M${sx - 0.04 * u} ${oy + 0.07 * u}l0 8l6 0`, { weight: 1.2, color: ACCENT }); // drip
  s.rectNew(sx + outer + cavity - 0.03 * u, oy + 0.04 * u, 0.09 * u, 0.03 * u); // closer at sill
  wallBand(sx, sillTop, 0.24 * u);
  s.dotted(
    sx + outer + cavity + 0.02 * u,
    oy + 0.02 * u,
    sx + outer + cavity + 0.02 * u,
    sillTop + 0.14 * u,
  );
  s.dotted(sx + outer + 0.09 * u, oy + 0.02 * u, sx + outer + cavity + 0.02 * u, oy + 0.02 * u);
  s.rect(sx + wallT + plaster, oy + 0.035 * u, 0.12 * u, 0.015 * u, { weight: 0.9, fill: PAPER }); // internal window board
  s.circle(sx + outer - 4, oy + 0.03 * u, 5, { weight: 0.8 });
  c(sx - 0.02 * u, oy + 0.055 * u, 7, 200, oy + 0.16 * u);
  c(sx + outer + cavity + 0.02 * u, sillTop + 0.08 * u, 2, 760, sillTop + 0.08 * u);
  c(sx + wallT + plaster + 0.06 * u, oy + 0.042 * u, 8, 760, oy + 0.02 * u);
  c(sx + outer - 4, oy + 0.03 * u, 4, 200, oy + 0.06 * u);
  s.note(sx - 20, sillTop + 20, 'Outside', { size: 11, anchor: 'end' });
  s.note(sx + wallT + plaster + 0.13 * u, sillTop + 20, 'Inside', { size: 11 });

  // Legend of callouts
  const items = [
    '1  Trickle ventilator in the head of the new frame, sized to the room',
    '2  Airtightness line: tape from the inner leaf onto the frame, continuous around the opening',
    '3  New window frame; unit sized from the survey, not from the nominal type',
    '4  Sealant on a backer rod to the outer leaf; not relied on for airtightness',
    '5  Plasterboard reveal on an insulated lining, sealed to the frame',
    '6  Insulated cavity closer replacing the existing uninsulated closer',
    '7  New sill with a drip clear of the outer face; existing sill made good',
    '8  Internal window board bedded on sealant',
  ];
  items.forEach((t, i) => s.note(100, 1380 + i * 18, t, { size: 11.5 }));
  s.legend(820, 1385, [
    { swatch: 'poche', text: 'Existing outer and inner leaves' },
    { swatch: 'new', text: 'New work' },
    { swatch: 'dotted', text: 'Airtightness line' },
    { swatch: 'insulation', text: 'Insulation' },
  ]);
  return s.titleStrip();
}
