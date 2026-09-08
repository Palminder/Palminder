import { Sheet, INK, ACCENT, PAPER } from '../toolkit.mjs';

const PROJECT = 'Drumchapel Fabric Upgrade';

export function drumchapelWallSection() {
  const s = new Sheet({
    width: 1000,
    height: 1400,
    number: 'Drawing 01',
    title: 'Wall and window section',
    projectTitle: PROJECT,
    unitPx: 250,
    scaleNote: 'Scale bar 0–1 m',
    description:
      'Section through an upper-floor window of a postwar cavity-wall block with new external mineral-wool insulation and render, an insulated reveal returning to the window frame, a new sill with a drip clear of the insulation and the continuous insulation line.',
  });
  const u = 250;
  const ox = 500;
  const top = 120; // wall outer face at ox
  const outer = 0.1 * u,
    cavity = 0.05 * u,
    inner = 0.1 * u,
    plaster = 0.013 * u,
    ewi = 0.12 * u,
    render = 0.008 * u;
  const H = 3.4 * u;
  // Existing wall leaves (full height) and floor zone at 1.3..1.55 m from the top
  s.rectPoche(ox, top, outer, H);
  s.rect(ox + outer, top, cavity, H, { weight: 0.5, opacity: 0.5 });
  s.rectPoche(ox + outer + cavity, top, inner, H);
  s.line(
    ox + outer + cavity + inner + plaster,
    top,
    ox + outer + cavity + inner + plaster,
    top + H,
    { weight: 1.2 },
  );
  const floorY = top + 2.1 * u;
  s.rectPoche(ox + outer + cavity + inner, floorY, 0.9 * u, 0.25 * u);
  s.note(ox + outer + cavity + inner + 0.3 * u, floorY + 0.16 * u, 'Existing floor', {
    size: 11,
    color: PAPER,
  });
  // Window opening: 1.2 m tall, head at top + 0.5 m
  const headY = top + 0.5 * u,
    sillY = headY + 1.2 * u;
  s.opening(ox, headY, outer + cavity + inner + plaster + 2, sillY - headY);
  s.rectPoche(ox + outer + cavity, headY - 0.15 * u, inner, 0.15 * u); // lintel (inner)
  s.rectPoche(ox, headY - 0.15 * u, outer, 0.15 * u);
  // New window frame (replaced as part of the programme) set back in the reveal
  s.rectNew(ox + outer + 0.01 * u, headY, 0.08 * u, 0.07 * u);
  s.rectNew(ox + outer + 0.01 * u, sillY - 0.07 * u, 0.08 * u, 0.07 * u);
  s.line(ox + outer + 0.05 * u, headY + 0.07 * u, ox + outer + 0.05 * u, sillY - 0.07 * u, {
    weight: 3,
  });
  // EWI: insulation band outside the outer leaf over the full height, returning into the reveal at head and sill
  s.insulation(ox - ewi, top, ewi, headY - 0.02 * u - top, { horizontal: false });
  s.insulation(ox - ewi, sillY + 0.06 * u, ewi, top + H - (sillY + 0.06 * u), {
    horizontal: false,
  });
  s.insulation(ox - ewi, headY - 0.02 * u, ewi + outer + 0.01 * u, 0.03 * u); // reveal at head
  s.line(ox - ewi - render, top, ox - ewi - render, headY - 0.02 * u, { weight: 2, color: ACCENT });
  s.line(ox - ewi - render, sillY + 0.06 * u, ox - ewi - render, top + H, {
    weight: 2,
    color: ACCENT,
  }); // render line
  // Sill: new sill over the insulation with a drip
  s.rectNew(ox - ewi - 0.05 * u, sillY - 0.03 * u, ewi + outer + 0.05 * u, 0.06 * u);
  s.path(`M${ox - ewi - 0.05 * u} ${sillY + 0.03 * u}l0 10l8 0`, { weight: 1.2, color: ACCENT });
  // Continuous insulation line (dotted) tracing the insulation
  s.dotted(ox - ewi / 2, top + 10, ox - ewi / 2, headY - 0.02 * u);
  s.dotted(ox - ewi / 2, headY - 0.02 * u, ox + outer + 0.01 * u, headY - 0.02 * u);
  s.dotted(ox - ewi / 2, sillY + 0.06 * u, ox - ewi / 2, top + H - 10);
  s.dotted(ox - ewi / 2, sillY, ox + outer + 0.01 * u, sillY);
  // Leaders
  const lead = (x, y, tx, ty, text, anchor = 'start') =>
    s.leader(x, y, tx, ty, text, { size: 12, anchor });
  const L = ox - ewi - 60; // left label margin
  lead(
    ox - ewi / 2,
    top + 0.2 * u,
    L,
    top + 0.2 * u,
    'Mineral-wool external wall insulation,',
    'end',
  );
  s.note(L - 6, top + 0.2 * u + 22, 'mechanically fixed and adhered, with base coat', {
    size: 12,
    anchor: 'end',
  });
  s.note(L - 6, top + 0.2 * u + 40, 'and render; palette per elevation study', {
    size: 12,
    anchor: 'end',
  });
  lead(
    ox - ewi + 10,
    headY - 0.01 * u,
    L,
    headY + 0.3 * u,
    'Insulated reveal returned to the frame',
    'end',
  );
  lead(
    ox - ewi - render,
    top + 1.25 * u,
    L,
    top + 1.25 * u,
    'Render finish line on the new wall plane',
    'end',
  );
  lead(
    ox - ewi - 0.03 * u,
    sillY,
    L,
    sillY + 0.3 * u,
    'New sill with drip clear of the render;',
    'end',
  );
  s.note(L - 6, sillY + 0.3 * u + 22, 'falls away from the frame', { size: 12, anchor: 'end' });
  const R = ox + outer + cavity + inner + 0.4 * u; // right label margin
  lead(
    ox + outer + 0.05 * u,
    headY + 0.6 * u,
    R,
    headY + 0.6 * u,
    'Window replaced within the programme;',
  );
  s.note(R + 6, headY + 0.6 * u + 22, 'unit from the survey schedule', { size: 12 });
  lead(ox + outer + cavity / 2, top + 1.9 * u, R, top + 1.9 * u, 'Existing cavity retained;');
  s.note(R + 6, top + 1.9 * u + 22, 'cavity closers at reveals', { size: 12 });
  lead(
    ox + outer + cavity + inner + plaster,
    top + 2.9 * u,
    R,
    top + 2.9 * u,
    'Existing internal finishes retained;',
  );
  s.note(R + 6, top + 2.9 * u + 22, 'no internal works beyond making good', { size: 12 });
  lead(ox + outer / 2, top + 0.15 * u, R, top + 0.15 * u, 'Existing outer leaf: defects repaired');
  s.note(R + 6, top + 0.15 * u + 22, 'before insulation is fixed', { size: 12 });
  s.dotted(R, top + 3.25 * u, R + 0.15 * u, top + 3.25 * u);
  s.note(R + 0.2 * u, top + 3.25 * u + 4, 'Continuous insulation line', { size: 12 });
  s.note(ox - ewi - 30, top + H + 30, 'Outside', { size: 12, anchor: 'end' });
  s.note(ox + outer + cavity + inner + 0.1 * u, top + H + 30, 'Inside', { size: 12 });
  s.legend(80, 1130, [
    { swatch: 'poche', text: 'Existing fabric (cut)' },
    { swatch: 'new', text: 'New work' },
    { swatch: 'insulation', text: 'Insulation' },
    { swatch: 'dotted', text: 'Continuous insulation line' },
  ]);
  s.scaleBar(600, 1150, 1);
  return s.titleStrip();
}

export function drumchapelEavesBase() {
  const s = new Sheet({
    width: 1200,
    height: 1200,
    number: 'Drawing 02',
    title: 'Eaves and base details',
    projectTitle: PROJECT,
    unitPx: 350,
    scaleNote: 'Scale bar 0–500 mm',
    description:
      'Eaves detail with the gutter relocated to the new wall line, a ventilated eaves with insect mesh and insulation continuing to meet the roof insulation; base detail with a starter track, drained perforated rail, insulation stopping above the damp-proof course and a durable plinth.',
  });
  const u = 350;
  const outer = 0.1 * u,
    cavity = 0.05 * u,
    inner = 0.1 * u,
    ewi = 0.12 * u;
  // ---- Eaves (left) ----
  let ox = 420,
    top = 120;
  s.label(100, 100, 'Eaves', { size: 15, weight: 500 });
  const wallTop = top + 0.5 * u;
  const H = 0.9 * u;
  s.rectPoche(ox, wallTop, outer, H);
  s.rect(ox + outer, wallTop, cavity, H, { weight: 0.5, opacity: 0.5 });
  s.rectPoche(ox + outer + cavity, wallTop, inner, H);
  // roof: rafters/sarking sloping from the wallhead outward; ceiling with loft insulation inside
  s.line(
    ox + outer + cavity + inner + 0.6 * u,
    top + 0.05 * u,
    ox - ewi - 0.25 * u,
    wallTop + 0.05 * u,
    { weight: 8 },
  ); // rafter/sarking (existing)
  s.line(
    ox + outer + cavity + inner + 0.6 * u,
    top + 0.05 * u - 10,
    ox - ewi - 0.25 * u,
    wallTop + 0.05 * u - 10,
    { weight: 1.2 },
  ); // tiles line
  s.rectPoche(ox + outer + cavity + inner, wallTop + 0.12 * u, 0.6 * u, 0.04 * u); // ceiling
  s.insulation(ox + outer + cavity + inner, wallTop - 0.12 * u, 0.6 * u, 0.24 * u); // loft insulation over ceiling
  s.note(
    ox + outer + cavity + inner + 0.05 * u,
    wallTop + 0.3 * u,
    'Loft insulation (existing, topped up)',
    { size: 11 },
  );
  // EWI to the wallhead, meeting the roof insulation; ventilated eaves with mesh
  s.insulation(ox - ewi, wallTop - 0.08 * u, ewi, H + 0.08 * u, { horizontal: false });
  s.line(ox - ewi - 3, wallTop - 0.08 * u, ox - ewi - 3, wallTop + H, { weight: 2, color: ACCENT });
  s.rectNew(ox - ewi - 0.02 * u, wallTop - 0.12 * u, ewi + 0.02 * u, 0.04 * u); // head closer / soffit board
  s.rect(ox - ewi - 0.25 * u, wallTop - 0.16 * u, 0.25 * u, 0.02 * u, {
    weight: 1,
    fill: PAPER,
    color: ACCENT,
  });
  s.note(ox - ewi - 0.25 * u, wallTop - 0.18 * u, 'Insect mesh', { size: 10, color: ACCENT });
  s.path(
    `M${ox - ewi - 0.2 * u} ${wallTop - 0.03 * u}L${ox - ewi - 0.05 * u} ${wallTop - 0.2 * u}`,
    { weight: 1, color: ACCENT },
  );
  s.path(
    `M${ox - ewi - 0.07 * u} ${wallTop - 0.17 * u}L${ox - ewi - 0.05 * u} ${wallTop - 0.2 * u}L${ox - ewi - 0.09 * u} ${wallTop - 0.21 * u}`,
    { weight: 1, color: ACCENT },
  );
  s.note(ox - ewi - 0.6 * u, wallTop + 0.62 * u, 'Ventilated eaves with insect mesh', { size: 10 });
  // gutter relocated outward on a new fascia
  s.rectNew(ox - ewi - 0.29 * u, wallTop - 0.14 * u, 0.04 * u, 0.2 * u); // fascia
  s.path(`M${ox - ewi - 0.29 * u} ${wallTop - 0.1 * u}a0.06 0.06 0 0 0 -${0.14 * u} 0`, {
    weight: 2,
  }); // gutter (arc)
  s.add(
    `<path d="M${ox - ewi - 0.29 * u} ${wallTop - 0.1 * u} a${0.07 * u} ${0.07 * u} 0 1 0 -${0.14 * u} 0" fill="none" stroke="${INK}" stroke-width="2"/>`,
  );
  s.note(ox - ewi - 0.6 * u, wallTop + 0.42 * u, 'Gutter and fascia relocated', { size: 10 });
  s.note(ox - ewi - 0.6 * u, wallTop + 0.42 * u + 14, 'to the new wall line', { size: 10 });
  s.dotted(ox - ewi / 2, wallTop - 0.1 * u, ox - ewi / 2, wallTop + H);
  s.dotted(
    ox - ewi / 2,
    wallTop - 0.1 * u,
    ox + outer + cavity + inner + 0.6 * u,
    wallTop - 0.1 * u,
  );
  s.note(ox + 0.02 * u, wallTop + H + 26, 'Existing wall', { size: 11 });
  // ---- Base (right) ----
  ox = 900;
  top = 120;
  s.label(760, 100, 'Base', { size: 15, weight: 500 });
  const G = top + 0.9 * u;
  const Hb = 1.2 * u;
  s.rectPoche(ox, top, outer, Hb);
  s.rect(ox + outer, top, cavity, Hb, { weight: 0.5, opacity: 0.5 });
  s.rectPoche(ox + outer + cavity, top, inner, Hb);
  s.line(ox + outer + cavity + inner + 0.3 * u, G, ox - ewi - 0.45 * u, G, { weight: 2 });
  for (let x = ox - ewi - 0.45 * u; x < ox + outer + cavity + inner + 0.3 * u; x += 16)
    s.line(x, G, x - 8, G + 8, { weight: 0.5, opacity: 0.5 });
  s.rectPoche(ox + outer + cavity + inner, G - 0.15 * u, 0.3 * u, 0.15 * u);
  s.note(ox + outer + cavity + inner + 0.02 * u, G + 0.14 * u, 'Existing ground floor', {
    size: 10,
  });
  s.dotted(ox - 0.02 * u, G - 0.15 * u, ox + outer + cavity + inner + 0.02 * u, G - 0.15 * u, {
    color: ACCENT,
  });
  s.note(ox + outer + cavity + inner + 0.05 * u, G - 0.19 * u, 'DPC', { size: 10, color: ACCENT });
  // EWI stops above DPC on a starter/base track with drained perforated rail; plinth below
  const stopY = G - 0.3 * u;
  s.insulation(ox - ewi, top, ewi, stopY - top, { horizontal: false });
  s.line(ox - ewi - 3, top, ox - ewi - 3, stopY, { weight: 2, color: ACCENT });
  s.rectNew(ox - ewi - 0.01 * u, stopY, ewi + 0.01 * u, 0.02 * u); // base track
  for (let i = 0; i < 4; i++)
    s.circle(ox - ewi + 10 + i * 12, stopY + 0.01 * u, 1.5, { fill: PAPER, weight: 0.5 }); // perforations
  s.rectNew(ox - 0.06 * u, stopY + 0.02 * u, 0.06 * u, G + 0.05 * u - (stopY + 0.02 * u)); // plinth: durable board and render
  s.dotted(ox - ewi / 2, top + 10, ox - ewi / 2, stopY);
  s.note(ox - ewi - 0.06 * u, stopY - 0.04 * u, 'Starter track with', { size: 10, anchor: 'end' });
  s.note(ox - ewi - 0.06 * u, stopY - 0.04 * u + 14, 'drained, perforated rail', {
    size: 10,
    anchor: 'end',
  });
  s.note(ox - ewi - 0.06 * u, stopY + 0.1 * u, 'Insulation stops', { size: 10, anchor: 'end' });
  s.note(ox - ewi - 0.06 * u, stopY + 0.1 * u + 14, '150 mm above the DPC', {
    size: 10,
    anchor: 'end',
  });
  s.note(ox - ewi - 0.06 * u, G + 0.02 * u, 'Durable plinth on', { size: 10, anchor: 'end' });
  s.note(ox - ewi - 0.06 * u, G + 0.02 * u + 14, 'cement board, render finish', {
    size: 10,
    anchor: 'end',
  });
  s.note(ox + 0.02 * u, top + Hb + 26, 'Existing wall', { size: 11 });
  s.note(ox - ewi - 0.62 * u, G - 8, 'Ground', { size: 11 });
  s.legend(80, 1000, [
    { swatch: 'poche', text: 'Existing fabric (cut)' },
    { swatch: 'new', text: 'New work' },
    { swatch: 'insulation', text: 'Insulation' },
    { swatch: 'dotted', text: 'Continuous insulation line' },
  ]);
  s.parts.push('');
  for (let i = 0; i < 5; i++)
    s.add(
      `<rect x="${700 + i * 35}" y="1010" width="35" height="8" fill="${i % 2 ? PAPER : INK}" stroke="${INK}" stroke-width="0.8"/>`,
    );
  for (let i = 0; i <= 5; i++)
    s.note(700 + i * 35, 1005, `${i * 100}`, { size: 10, anchor: 'middle' });
  s.note(885, 1018, 'mm', { size: 10 });
  return s.titleStrip();
}
