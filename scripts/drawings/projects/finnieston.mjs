import { Sheet, ACCENT, PAPER } from '../toolkit.mjs';

const PROJECT = 'Finnieston Shopfront & Upper Floors';

/** Street elevation: 11 m frontage, shop with three bays and a close door, two sandstone floors above. */
function elevation(s, ox, oy, u, { proposed }) {
  const X = (m) => ox + m * u,
    Y = (h) => oy + (12.4 - h) * u; // heights above pavement; sheet y down
  const W = 11;
  // Sandstone face
  s.rect(X(0), Y(12.0), W * u, 12.0 * u, { weight: 1.2, fill: PAPER });
  // Coursing (light)
  for (let h = 4.4; h < 12.0; h += 0.45)
    s.line(X(0), Y(h), X(W), Y(h), { weight: 0.4, opacity: 0.35 });
  // String course / cornice above the shop, floor bands, eaves cornice and parapet
  s.rectPoche(X(-0.1), Y(4.4), (W + 0.2) * u, 0.25 * u);
  s.line(X(0), Y(8.0), X(W), Y(8.0), { weight: 1 });
  s.rectPoche(X(-0.15), Y(12.0), (W + 0.3) * u, 0.3 * u);
  s.rect(X(0), Y(12.4), W * u, 0.4 * u, { weight: 1, fill: PAPER });
  // Upper windows: 1.5 wide × 2.1 tall, cills at 4.9 and 8.5
  for (const cill of [4.9, 8.5])
    for (const x of [1.2, 4.75, 8.3]) {
      s.rect(X(x), Y(cill + 2.1), 1.5 * u, 2.1 * u, { weight: 1.2, fill: PAPER });
      s.rectPoche(X(x - 0.1), Y(cill), 1.7 * u, 0.12 * u); // cill
      s.line(X(x), Y(cill + 1.05), X(x + 1.5), Y(cill + 1.05), { weight: 1 }); // meeting rail
      s.line(X(x + 0.75), Y(cill + 2.1), X(x + 0.75), Y(cill), { weight: 0.5, opacity: 0.6 });
      s.rectPoche(X(x - 0.15), Y(cill + 2.25), 1.8 * u, 0.15 * u); // lintel
    }
  // Downpipe at the right edge
  s.line(X(W - 0.25), Y(12.0), X(W - 0.25), Y(0), { weight: 2.2 });
  s.line(X(W - 0.35), Y(12.0), X(W - 0.35), Y(0), { weight: 0.6 });
  // Ground floor: pilasters at bay divisions, close door at the right
  const pil = [
    [0, 0.35],
    [3.5, 0.35],
    [7.0, 0.35],
    [9.5, 0.3],
    [10.65, 0.35],
  ];
  for (const [x, w] of pil) s.rectPoche(X(x), Y(4.4), w * u, 4.4 * u);
  // Close door 9.8..10.65
  s.rect(X(9.8), Y(2.8), 0.85 * u, 2.8 * u, { weight: 1.2 });
  s.rect(X(9.8), Y(3.6), 0.85 * u, 0.7 * u, { weight: 0.8 });
  s.note(X(10.22), Y(1.4), 'Close', { size: 10, anchor: 'middle' });
  s.rect(X(9.8), Y(3.65), 0.85 * u, 0.45 * u, { weight: 0.8 }); // fanlight
  if (!proposed) {
    // Existing: patched fascia across all bays, bay 2 infilled with a panel, altered stallrisers, redundant fixings
    s.rect(X(0.35), Y(4.1), 9.15 * u, 1.1 * u, { weight: 1, fill: 'url(#crosshatch)' });
    s.boxNote(X(4.9), Y(4.75), 'Patched fascia and later signboard fixings', {
      size: 11,
      anchor: 'middle',
    });
    for (const x of [1.0, 2.2, 5.0, 6.2, 8.0]) {
      s.line(X(x) - 5, Y(3.3) - 5, X(x) + 5, Y(3.3) + 5, { weight: 1 });
      s.line(X(x) - 5, Y(3.3) + 5, X(x) + 5, Y(3.3) - 5, { weight: 1 });
    }
    // Bay 1: glazing with altered stallriser (dashed tile cladding)
    s.rect(X(0.35), Y(3.0), 3.15 * u, 2.3 * u, { weight: 1.2 });
    s.rect(X(0.35), Y(0.7), 3.15 * u, 0.7 * u, { weight: 1, dashed: true });
    s.boxNote(X(1.9), Y(1.55), 'Altered stallriser (tile cladding)', {
      size: 10,
      anchor: 'middle',
    });
    // Bay 2: infill panel
    s.rect(X(3.85), Y(3.0), 3.15 * u, 3.0 * u, {
      weight: 1.2,
      dashed: true,
      fill: 'url(#stipple)',
    });
    s.boxNote(X(5.4), Y(1.5), 'Blocked bay: infill panel', { size: 11, anchor: 'middle' });
    // Bay 3: door and glazing
    s.rect(X(7.35), Y(3.0), 1.2 * u, 3.0 * u, { weight: 1.2 });
    s.rect(X(8.6), Y(3.0), 0.9 * u, 2.3 * u, { weight: 1.2 });
    s.rect(X(8.6), Y(0.7), 0.9 * u, 0.7 * u, { weight: 1, dashed: true });
    // Stone defects above: previous cement repair patches
    s.rect(X(2.9), Y(7.2), 1.2 * u, 0.9 * u, { weight: 0.8, fill: 'url(#crosshatch)' });
    s.boxNote(X(3.5), Y(8.35), 'Cement patch', { size: 10, anchor: 'middle' });
    s.rect(X(6.4), Y(11.4), 1.0 * u, 0.8 * u, { weight: 0.8, fill: 'url(#stipple)' });
    s.boxNote(X(6.9), Y(11.15), 'Surface loss', { size: 10, anchor: 'middle' });
    s.note(X(W - 0.55), Y(6.0), 'Existing downpipe', { size: 10, anchor: 'end' });
  } else {
    // Proposed: new composition set out from the structural bays
    const glazing = (x, w) => {
      s.rect(X(x), Y(3.1), w * u, 2.4 * u, { weight: 1.6 });
      s.line(X(x), Y(2.4), X(x + w), Y(2.4), { weight: 1 });
    };
    // Stallrisers, painted timber
    for (const [x, w] of [
      [0.35, 3.15],
      [3.85, 3.15],
      [8.6, 0.9],
    ])
      s.rectNew(X(x), Y(0.7), w * u, 0.7 * u);
    glazing(0.35, 3.15);
    glazing(3.85, 3.15);
    glazing(8.6, 0.9);
    // Door bay 3
    s.rectNew(X(7.35), Y(3.1), 1.2 * u, 3.1 * u);
    s.line(X(7.35), Y(2.0), X(8.55), Y(2.0), { weight: 0.8, color: ACCENT });
    s.boxNote(X(7.95), Y(1.2), 'Door', { size: 10, anchor: 'middle' });
    // Fascia: signage zone defined
    s.rectNew(X(0.35), Y(3.9), 9.15 * u, 0.7 * u);
    s.rect(X(0.9), Y(3.75), 8.0 * u, 0.42 * u, { weight: 1.2, dashed: true, color: ACCENT });
    s.boxNote(X(4.9), Y(4.75), 'Signage zone (controlled height and extent)', {
      size: 11,
      anchor: 'middle',
    });
    // Transoms
    for (const [x, w] of [
      [0.35, 3.15],
      [3.85, 3.15],
    ])
      s.line(X(x), Y(3.1), X(x + w), Y(3.1), { weight: 1.4, color: ACCENT });
    s.boxNote(X(1.9), Y(1.55), 'Painted timber stallriser and frame', {
      size: 10,
      anchor: 'middle',
    });
    // Stone repairs keyed
    s.rect(X(2.9), Y(7.2), 1.2 * u, 0.9 * u, { weight: 0.9, color: ACCENT, fill: 'none' });
    s.note(X(3.5), Y(7.3), 'R1 indent', { size: 10, anchor: 'middle', color: ACCENT });
    s.rect(X(6.4), Y(11.4), 1.0 * u, 0.8 * u, { weight: 0.9, color: ACCENT, fill: 'none' });
    s.note(X(6.9), Y(11.5), 'R2 repoint', { size: 10, anchor: 'middle', color: ACCENT });
    s.note(X(W - 0.55), Y(6.0), 'Downpipe renewed', { size: 10, anchor: 'end' });
  }
  // Pavement line
  s.line(X(-0.6), Y(0), X(W + 0.8), Y(0), { weight: 2 });
  for (let x = -0.6; x < W + 0.8; x += 0.35)
    s.line(X(x), Y(0), X(x) - 8, Y(0) + 8, { weight: 0.5, opacity: 0.5 });
  s.note(X(W / 2), Y(-0.45), 'Pavement', { size: 11, anchor: 'middle' });
}

export function finniestonElevation() {
  const s = new Sheet({
    width: 1600,
    height: 1131,
    number: 'Drawing 01',
    title: 'Existing and proposed street elevations',
    projectTitle: PROJECT,
    unitPx: 55,
    scaleNote: 'Scale bar 0–5 m',
    description:
      'Existing survey elevation with a patched fascia, a blocked bay and altered stallrisers beside the proposed elevation with a new shopfront composition set out from the structural bays, a defined signage zone and keyed stone repairs.',
  });
  s.label(80, 70, 'Existing elevation', { size: 16, weight: 500 });
  s.line(80, 82, 740, 82, { weight: 0.8, opacity: 0.4 });
  s.label(860, 70, 'Proposed elevation', { size: 16, weight: 500 });
  s.line(860, 82, 1520, 82, { weight: 0.8, opacity: 0.4 });
  elevation(s, 130, 120, 55, { proposed: false });
  elevation(s, 910, 120, 55, { proposed: true });
  s.legend(80, 940, [
    { swatch: 'poche', text: 'Stone dressings, pilasters and cornices' },
    { swatch: 'new', text: 'New shopfront elements' },
    { swatch: 'crosshatch', text: 'Previous cement repair / patched fascia' },
    { swatch: 'stipple', text: 'Surface loss / infill' },
  ]);
  s.scaleBar(700, 960, 5);
  return s.titleStrip();
}

export function finniestonSection() {
  const s = new Sheet({
    width: 1000,
    height: 1400,
    number: 'Drawing 02',
    title: 'Section through façade and service zone',
    projectTitle: PROJECT,
    unitPx: 95,
    scaleNote: 'Scale bar 0–2 m',
    description:
      'Section through the shopfront: pavement, stallriser, glazing and fascia with a services zone behind it, the retained first-floor structure and sandstone wall above with its window.',
  });
  const u = 95,
    ox = 200;
  const G = 1080; // pavement level y
  const X = (m) => ox + m * u,
    Y = (h) => G - h * u;
  // Pavement and floor
  s.line(40, G, 960, G, { weight: 2 });
  for (let x = 40; x < 960; x += 24) s.line(x, G, x - 8, G + 8, { weight: 0.5, opacity: 0.5 });
  s.rectPoche(X(0.4), Y(0.15), 5.6 * u, 0.15 * u);
  s.note(X(1.2), Y(-0.25), 'Existing floor, terrazzo repaired', { size: 12 });
  // Upper wall (sandstone 0.6 m) from 4.4 m up to 8.2 (cut), with first-floor window 4.9..7.0
  s.rectPoche(X(0), Y(8.2), 0.6 * u, 3.8 * u);
  s.opening(X(0), Y(7.0), 0.6 * u, 2.1 * u);
  s.rect(X(0.18), Y(7.0), 0.14 * u, 2.1 * u, { weight: 1.2, fill: PAPER });
  s.rectPoche(X(-0.1), Y(4.9), 0.8 * u, 0.12 * u);
  s.rectPoche(X(0), Y(7.15), 0.6 * u, 0.15 * u);
  s.note(X(0.75), Y(6.0), 'Existing first-floor window and stone retained', { size: 12 });
  // Cornice / string course over the shop at 4.4
  s.rectPoche(X(-0.2), Y(4.65), 0.8 * u, 0.25 * u);
  // First-floor structure: timber joists zone 4.05..4.4 spanning into the plan
  s.rectPoche(X(0.6), Y(4.4), 5.4 * u, 0.32 * u);
  s.note(X(2.4), Y(4.55), 'First-floor structure retained', { size: 12 });
  // Shopfront: stallriser 0..0.7 (new), glazing 0.7..3.1, transom, fascia 3.9..4.4 with signage zone
  s.rectNew(X(0.05), Y(0.7), 0.25 * u, 0.7 * u);
  s.line(X(0.17), Y(3.1), X(0.17), Y(0.7), { weight: 4 });
  s.line(X(0.05), Y(3.1), X(0.3), Y(3.1), { weight: 2, color: ACCENT });
  s.rectNew(X(0.0), Y(4.4), 0.32 * u, 1.3 * u); // fascia build-up 3.1..4.4
  s.rect(X(-0.02), Y(4.2), 0.05 * u, 0.5 * u, { weight: 1, dashed: true, color: ACCENT });
  s.note(X(-0.1), Y(4.0), 'Signage zone', { size: 11, anchor: 'end', color: ACCENT });
  // Services zone behind the fascia and under the first floor: 3.2..4.05, depth 0.32..1.4 m
  s.rectNew(X(0.32), Y(4.05), 1.1 * u, 0.85 * u);
  s.rect(X(0.5), Y(3.85), 0.75 * u, 0.4 * u, { weight: 1, color: ACCENT, fill: PAPER });
  s.note(X(0.87), Y(3.6), 'Duct', { size: 10, anchor: 'middle', color: ACCENT });
  s.path(`M${X(1.42)} ${Y(3.6)}L${X(2.4)} ${Y(3.6)}`, { weight: 1, color: ACCENT });
  s.path(`M${X(2.25)} ${Y(3.7)}L${X(2.4)} ${Y(3.6)}L${X(2.25)} ${Y(3.5)}`, {
    weight: 1,
    color: ACCENT,
  });
  s.leader(
    X(0.9),
    Y(4.0),
    X(2.6),
    Y(5.3),
    'Services zone behind the fascia: ventilation duct, cabling and drainage routes',
    { size: 12 },
  );
  s.leader(
    X(1.8),
    Y(3.6),
    X(2.6),
    Y(4.95),
    'Routes run in the zone, not through retained stone or joinery',
    { size: 12 },
  );
  // Ceiling line under services zone
  s.line(X(0.32), Y(3.2), X(6.0), Y(3.2), { weight: 1.2 });
  s.note(X(3.2), Y(3.02), 'New ceiling line', { size: 11 });
  // Labels
  s.label(X(1.6), Y(1.6), 'Shop interior', { size: 15 });
  s.label(X(1.6), Y(6.2), 'Upper floor', { size: 13 });
  s.leader(X(0.17), Y(2.0), X(1.4), Y(2.4), 'Painted timber shopfront glazing', { size: 12 });
  s.leader(X(0.17), Y(0.35), X(1.4), Y(0.5), 'Timber stallriser on a repaired plinth', {
    size: 12,
  });
  s.note(X(-0.3), Y(-0.25), 'Pavement', { size: 12, anchor: 'end' });
  s.legend(80, 1170, [
    { swatch: 'poche', text: 'Existing fabric (cut)' },
    { swatch: 'new', text: 'New work' },
  ]);
  s.scaleBar(560, 1190, 2);
  return s.titleStrip();
}
