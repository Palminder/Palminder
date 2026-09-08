import { Sheet, INK, ACCENT, PAPER } from '../toolkit.mjs';

const PROJECT = 'Shawlands Sandstone Repair';

export function shawlandsElevation() {
  const s = new Sheet({
    width: 1600,
    height: 1131,
    number: 'Drawing 01',
    title: 'Annotated condition elevation',
    projectTitle: PROJECT,
    unitPx: 60,
    scaleNote: 'Scale bar 0–5 m',
    description:
      'Annotated elevation of a three-storey red-sandstone tenement mapping open joints, surface loss, previous cement repairs, indents required and rainwater interfaces, each keyed to a repair schedule reference.',
  });
  const u = 60,
    ox = 160,
    oy = 100;
  const W = 12.0,
    H = 11.6;
  const X = (m) => ox + m * u,
    Y = (h) => oy + (H - h) * u;
  s.rect(X(0), Y(H), W * u, H * u, { weight: 1.2, fill: PAPER });
  for (let h = 0.45; h < H; h += 0.45)
    s.line(X(0), Y(h), X(W), Y(h), { weight: 0.4, opacity: 0.3 });
  // Cope / eaves cornice and parapet
  s.rectPoche(X(-0.15), Y(11.0), (W + 0.3) * u, 0.25 * u);
  s.rect(X(0), Y(11.6), W * u, 0.6 * u, { weight: 1, fill: PAPER });
  s.note(X(W / 2 - 0.6), Y(11.3), 'Cope', { size: 10, anchor: 'end' });
  // Close door centre, windows 3 per floor (cills 1.0, 4.6, 8.1), height 2.1, width 1.4
  s.rect(X(5.4), Y(2.6), 1.2 * u, 2.6 * u, { weight: 1.2 });
  s.note(X(6.0), Y(1.3), 'Close', { size: 10, anchor: 'middle' });
  for (const cill of [1.0, 4.6, 8.1])
    for (const x of [1.4, 4.0, 7.2, 9.6]) {
      if (cill === 1.0 && (x === 4.0 || x === 7.2)) continue; // ground floor: shop-free tenement with close in the middle
      s.rect(X(x), Y(cill + 2.1), 1.4 * u, 2.1 * u, { weight: 1.1, fill: PAPER });
      s.rectPoche(X(x - 0.1), Y(cill), 1.6 * u, 0.1 * u);
      s.line(X(x), Y(cill + 1.05), X(x + 1.4), Y(cill + 1.05), { weight: 0.9 });
    }
  // Downpipes
  for (const x of [0.35, W - 0.35]) {
    s.line(X(x), Y(11.0), X(x), Y(0), { weight: 2.2 });
  }
  // Ground / pavement
  s.line(X(-0.6), Y(0), X(W + 0.6), Y(0), { weight: 2 });
  // --- Defects ---
  // Open joints: short thick dashes along coursing
  const openJoints = [
    [2.0, 6.7, 1.5],
    [8.6, 9.9, 1.2],
    [0.6, 3.4, 1.0],
    [9.8, 5.5, 1.3],
    [3.2, 10.1, 1.0],
  ];
  for (const [x, h, len] of openJoints)
    for (let i = 0; i < 3; i++)
      s.line(X(x), Y(h - i * 0.45), X(x + len), Y(h - i * 0.45), { weight: 4 });
  // Surface loss: stipple patches
  const loss = [
    [0.55, 3.3, 0.7, 0.6],
    [7.4, 7.0, 1.1, 0.8],
    [10.3, 3.5, 0.8, 0.8],
  ];
  for (const [x, h, w, hh] of loss)
    s.rect(X(x), Y(h + hh), w * u, hh * u, { weight: 0.6, fill: 'url(#stipple)' });
  // Previous cement repairs: crosshatch
  const cement = [
    [3.0, 1.2, 0.9, 0.6],
    [6.7, 4.3, 0.8, 0.5],
    [0.5, 9.3, 0.7, 0.9],
  ];
  for (const [x, h, w, hh] of cement)
    s.rect(X(x), Y(h + hh), w * u, hh * u, { weight: 0.6, fill: 'url(#crosshatch)' });
  // Indents required: solid accent
  const indent = [
    [1.25, 0.6, 0.45, 0.3],
    [9.45, 4.2, 0.4, 0.3],
    [3.4, 8.3, 0.4, 0.3],
  ];
  for (const [x, h, w, hh] of indent)
    s.add(
      `<rect x="${X(x)}" y="${Y(h + hh)}" width="${w * u}" height="${hh * u}" fill="${ACCENT}"/>`,
    );
  // Rainwater interfaces: triangles at cope/downpipe junctions and a leaking shoe
  const tri = (x, h) =>
    s.path(`M${X(x)} ${Y(h) - 12}L${X(x) + 10} ${Y(h) + 6}L${X(x) - 10} ${Y(h) + 6}Z`, {
      weight: 1.4,
      color: ACCENT,
    });
  tri(0.35, 10.6);
  tri(W - 0.35, 10.6);
  tri(W - 0.35, 0.5);
  tri(6.0, 11.35);
  // Schedule references
  const ref = (x, h, t) => {
    s.circle(X(x), Y(h), 12, { weight: 1, fill: PAPER });
    s.add(
      `<text x="${X(x)}" y="${Y(h) + 4}" font-family="Inter, 'Helvetica Neue', Arial, sans-serif" font-size="11" font-weight="500" text-anchor="middle" fill="${INK}">${t}</text>`,
    );
  };
  ref(2.8, 7.4, 'R1');
  ref(1.0, 4.6, 'R2');
  ref(4.1, 1.35, 'R3');
  ref(9.2, 3.9, 'R4');
  ref(0.9, 10.7, 'R5');
  ref(11.3, 1.1, 'R6');
  ref(8.9, 7.9, 'R7');
  ref(4.6, 8.55, 'R8');
  // Notes
  s.note(X(W + 0.4), Y(10.2), 'R5 / R6: cope joints and downpipe', { size: 11 });
  s.note(X(W + 0.4), Y(9.95), 'shoes allowing water into the wall', { size: 11 });
  s.note(X(W + 0.4), Y(9.4), 'R1: repoint open joints in lime', { size: 11 });
  s.note(X(W + 0.4), Y(9.15), 'after raking out', { size: 11 });
  s.note(X(W + 0.4), Y(8.6), 'R3: remove failing cement repair,', { size: 11 });
  s.note(X(W + 0.4), Y(8.35), 'dress back and repoint', { size: 11 });
  s.note(X(W + 0.4), Y(7.8), 'R4: indent where retention is no', { size: 11 });
  s.note(X(W + 0.4), Y(7.55), 'longer reasonable', { size: 11 });
  s.note(X(W + 0.4), Y(7.0), 'Surface loss left where stable;', { size: 11 });
  s.note(X(W + 0.4), Y(6.75), 'monitor at next inspection', { size: 11 });
  s.note(X(W / 2), Y(-0.4), 'Pavement', { size: 11, anchor: 'middle' });
  s.legend(80, 860, [
    { swatch: 'thickdash', text: 'Open joints' },
    { swatch: 'stipple', text: 'Surface loss' },
    { swatch: 'crosshatch', text: 'Previous cement repair' },
    { swatch: 'accent', text: 'Indent required' },
    { swatch: 'triangle', text: 'Rainwater interface issue' },
  ]);
  s.note(
    600,
    865,
    'R1–R8: repair schedule references. Defects mapped at close inspection from scaffold before any treatment was specified.',
    { size: 12 },
  );
  s.scaleBar(600, 900, 5);
  return s.titleStrip();
}

export function shawlandsIndent() {
  const s = new Sheet({
    width: 1200,
    height: 1200,
    number: 'Drawing 02',
    title: 'Stone indent detail',
    projectTitle: PROJECT,
    unitPx: 600,
    scaleNote: 'Scale bar 0–500 mm',
    description:
      'Section through the wall face at a stone indent: decayed face cut back square, new sandstone indent bedded in lime with a non-ferrous dowel, lime pointing finished slightly recessed; with an elevation of the same stone and numbered callouts.',
  });
  const u = 600; // px per metre (1:5 at 120 dpi feel)
  // Section (left): wall face at x = 300, wall extends right; three courses 0.3 tall
  const fx = 300,
    top = 200;
  const course = 0.3 * u;
  s.label(120, 160, 'Section through the wall face', { size: 14, weight: 500 });
  for (let i = 0; i < 3; i++) s.rectPoche(fx, top + i * course, 0.55 * u, course - 10);
  // Middle course: decayed zone cut back 0.12 m; original face dashed; indent 0.14 deep
  const cy = top + course;
  const cutDepth = 0.14 * u;
  s.opening(fx, cy, cutDepth, course - 10);
  s.line(fx, cy, fx, cy + course - 10, { dashed: true, weight: 1 }); // original face
  s.rectNew(fx + 8, cy + 8, cutDepth - 8, course - 26); // indent stone
  s.insulation(fx + cutDepth - 2, cy + 8, 6, course - 26, { horizontal: false }); // bedding shown as thin band (reuse zigzag as mortar joint symbol)
  // dowel
  s.line(fx + 30, cy + course / 2 - 5, fx + cutDepth + 70, cy + course / 2 - 5, {
    weight: 3,
    color: ACCENT,
  });
  // pointing recessed 3 mm at joints above and below the indent
  s.rect(fx + 2, cy - 10, 10, 10, { weight: 0.8, fill: PAPER });
  s.rect(fx + 2, cy + course - 10, 10, 10, { weight: 0.8, fill: PAPER });
  // Callouts
  const c = (x, y, n, tx, ty) => {
    s.line(x, y, tx, ty, { weight: 0.7 });
    s.circle(x, y, 2.2, { fill: INK, weight: 0 });
    s.callout(tx, ty, n);
  };
  c(fx + 4, cy + 40, 1, 200, cy + 40);
  c(fx + cutDepth / 2, cy + course - 60, 2, 200, cy + course - 40);
  c(fx + cutDepth + 2, cy + 90, 3, 200, cy + 110);
  c(fx + cutDepth + 40, cy + course / 2 - 5, 4, fx + cutDepth + 150, cy + course / 2 - 60);
  c(fx + 7, cy - 5, 5, 200, cy - 30);
  c(fx + 0.4 * u, top + 40, 6, fx + 0.4 * u, top - 40);
  s.note(fx - 20, top - 20, 'Wall face', { size: 12, anchor: 'end' });
  s.note(fx + 0.3 * u, top + 3 * course + 30, 'Existing sandstone wall, courses retained', {
    size: 12,
    anchor: 'middle',
  });
  // Elevation (right): the stone with the indent outline
  const ex = 700,
    ey = 240;
  s.label(ex, 160, 'Elevation of the same stone', { size: 14, weight: 500 });
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 2; j++)
      s.rect(
        ex + j * 0.4 * u - (i % 2 ? 0.2 * u : 0) + (i % 2 ? 0 : 0),
        ey + i * course,
        0.4 * u,
        course - 8,
        { weight: 1 },
      );
  s.rectNew(ex + 60, ey + course + 30, 0.26 * u, course - 68);
  s.boxNote(ex + 60 + 0.13 * u, ey + course + 110, 'Indent', {
    size: 11,
    anchor: 'middle',
    color: ACCENT,
  });
  s.note(ex, ey + 3 * course + 30, 'Indent cut square to the bed and joint lines,', { size: 12 });
  s.note(ex, ey + 3 * course + 50, 'never feathered into sound stone.', { size: 12 });
  // Legend of callouts
  const items = [
    '1  Original face line; decayed stone cut back square to sound material',
    '2  New sandstone indent, matched by bed, colour and texture, minimum 100 mm deep',
    '3  Lime mortar bedding and joint, compatible with the existing masonry',
    '4  Non-ferrous dowel set in lime grout where the indent needs restraint',
    '5  Lime pointing finished slightly recessed from the arris',
    '6  Sound existing stone retained; surface weathering left untouched',
  ];
  items.forEach((t, i) => s.note(120, 900 + i * 24, t, { size: 13 }));
  s.legend(700, 900, [
    { swatch: 'poche', text: 'Existing stone (cut)' },
    { swatch: 'new', text: 'New stone indent' },
  ]);
  s.scaleBar(760, 1010, 0.5 > 0 ? 1 : 1); // 1 unit = 600px would overflow: draw 500 mm as five 100 mm segments below instead
  s.parts.pop();
  s.parts.pop();
  s.parts.pop(); // remove default bar
  for (let i = 0; i < 5; i++)
    s.add(
      `<rect x="${700 + i * 60}" y="1010" width="60" height="8" fill="${i % 2 ? PAPER : INK}" stroke="${INK}" stroke-width="0.8"/>`,
    );
  for (let i = 0; i <= 5; i++)
    s.note(700 + i * 60, 1005, `${i * 100}`, { size: 11, anchor: 'middle' });
  s.note(1010, 1018, 'mm', { size: 11 });
  return s.titleStrip();
}
