import { Sheet, INK, ACCENT } from '../toolkit.mjs';
import { isoProjector, isoBox } from '../geometry.mjs';

const PROJECT = 'Pollokshields Tenement Reordering';

/**
 * Tenement flat, one of two on a landing. Metres; back court at the top, street at the bottom,
 * close and stair to the right. Outer envelope x 0..9.6, y 0..11.0; bay to the street.
 */
function flatPlan(sheet, ox, oy, u, { proposed }) {
  const M = (v) => v * u,
    X = (x) => ox + M(x),
    Y = (y) => oy + M(y);
  const T = 0.6,
    t = 0.15,
    m = 0.5; // external, partition, mutual wall
  // Envelope: rear wall y 0..0.6, front wall y 10.4..11.0, left mutual wall x 0..0.5, right wall to close x 9.1..9.6
  sheet.rectPoche(X(0), Y(0), M(9.6), M(T));
  sheet.rectPoche(X(0), Y(10.4), M(9.6), M(T));
  sheet.rectPoche(X(0), Y(0), M(m), M(11.0));
  sheet.rectPoche(X(9.1), Y(0), M(m), M(11.0));
  // Bay window x 1.2..4.2 projecting 1.0 m
  sheet.poche([
    [X(1.2), Y(10.4)],
    [X(1.2), Y(12.0)],
    [X(4.2), Y(12.0)],
    [X(4.2), Y(10.4)],
    [X(3.7), Y(10.4)],
    [X(3.7), Y(11.5)],
    [X(1.7), Y(11.5)],
    [X(1.7), Y(10.4)],
  ]);
  sheet.opening(X(1.2), Y(10.4), M(3.0), M(T));
  sheet.window(X(1.7), Y(11.5), M(2.0), 'h', M(0.5));
  sheet.window(X(1.2), Y(10.5), M(0.9), 'v', M(0.5));
  sheet.window(X(3.7), Y(10.5), M(0.9), 'v', M(0.5));
  // Close and stair beyond the right wall: x 9.6..12.4, y 3.4..8.6 with landing y 5.6..7.4
  sheet.rectPoche(X(9.6), Y(3.4), M(2.8), M(0.5));
  sheet.rectPoche(X(9.6), Y(8.1), M(2.8), M(0.5));
  sheet.rectPoche(X(12.4), Y(3.4), M(0.5), M(5.2));
  sheet.stair(X(9.7), Y(3.95), M(1.3), M(1.6), 'v', { treads: 8, arrow: 'down' });
  sheet.stair(X(11.0), Y(3.95), M(1.3), M(1.6), 'v', { treads: 8, arrow: 'up' });
  sheet.stair(X(9.7), Y(7.0), M(1.3), M(1.05), 'v', { treads: 6, arrow: 'down' });
  sheet.label(X(9.9), Y(6.5), 'Landing', { size: 12 });
  sheet.note(X(11.0), Y(9.0), 'Common close', { size: 12 });
  // Front door from landing: right wall x 9.1..9.6 at y 6.0..6.9
  sheet.opening(X(9.1), Y(6.0), M(m), M(0.9));
  sheet.door(X(9.1), Y(6.0), M(0.9), 'd', -1);
  sheet.note(X(9.65), Y(5.85), 'Front door', { size: 11 });
  // Windows: rear
  sheet.window(X(0.8), Y(0), M(0.7), 'h', M(T)); // box room
  sheet.window(X(2.6), Y(0), M(1.1), 'h', M(T)); // kitchen
  sheet.window(X(6.8), Y(0), M(1.3), 'h', M(T)); // back room
  sheet.window(X(6.7), Y(10.4), M(1.5), 'h', M(T)); // bedroom 1 front
  // Internal walls common to both: front rooms / hall
  sheet.rectPoche(X(0.5), Y(7.0), M(8.6), M(t)); // wall between hall leg A and front rooms
  sheet.rectPoche(X(4.4), Y(7.15), M(t), M(3.25)); // living | bedroom partition? no: living x0.5..4.4, bedroom x 5.75.. → keep two walls
  sheet.rectPoche(X(5.6), Y(7.15), M(t), M(3.25));
  sheet.rectPoche(X(4.4), Y(2.0), M(t), M(5.0)); // hall leg B left wall x 4.4..4.55
  sheet.rectPoche(X(5.6), Y(0.6), M(t), M(5.25)); // hall leg B right wall x 5.6..5.75 (back room side)
  sheet.rectPoche(X(0.5), Y(3.75), M(3.9), M(t)); // kitchen / bathroom wall
  sheet.rectPoche(X(0.5), Y(5.7), M(3.9), M(t)); // bathroom / lobby wall
  sheet.rectPoche(X(4.4), Y(2.0), M(1.2), M(t)); // end of hall leg B (top)
  // Doors common to both
  sheet.opening(X(4.4), Y(7.3), M(t), M(0.85));
  sheet.door(X(4.4), Y(7.3), M(0.85), 'l', 1); // living from the hall spur
  sheet.opening(X(6.0), Y(7.0), M(0.85), M(t));
  sheet.door(X(6.0), Y(7.15), M(0.85), 'r', -1); // bedroom 1 (swing into room)
  sheet.opening(X(4.4), Y(4.3), M(t), M(0.8));
  sheet.door(X(4.4), Y(4.3), M(0.8), 'l', 1); // bathroom
  // Living-side lobby between the hall and living: the strip y 5.85..7.0 left of leg B is a "press/lobby"
  sheet.rectPoche(X(2.4), Y(5.85), M(t), M(1.15));
  sheet.opening(X(4.4), Y(6.1), M(t), M(0.8));
  sheet.door(X(4.4), Y(6.1), M(0.8), 'l', 1);
  sheet.label(X(2.65), Y(6.55), 'Press', { size: 11 });
  sheet.label(X(0.7), Y(6.55), 'Bed recess', { size: 11 });

  if (!proposed) {
    // Left rear: kitchen x 2.0..4.25, box room and press to the left
    sheet.rectPoche(X(1.85), Y(0.6), M(t), M(3.15));
    sheet.rectPoche(X(0.5), Y(2.3), M(1.35), M(t));
    sheet.opening(X(1.85), Y(1.2), M(t), M(0.75));
    sheet.door(X(2.0), Y(1.2), M(0.75), 'd', 1); // box room
    sheet.opening(X(1.85), Y(2.8), M(t), M(0.75));
    sheet.door(X(2.0), Y(2.8), M(0.75), 'd', 1); // press
    sheet.opening(X(4.4), Y(2.5), M(t), M(0.8));
    sheet.door(X(4.4), Y(2.5), M(0.8), 'l', 1); // kitchen from hall
    sheet.worktop(X(2.0), Y(0.6), M(0.6), M(2.2));
    sheet.sink(X(2.3), Y(1.2), 10);
    sheet.hob(X(2.3), Y(2.3));
    // Right rear: back room, WC + press strip
    sheet.rectPoche(X(5.75), Y(4.5), M(3.35), M(t));
    sheet.rectPoche(X(7.0), Y(4.65), M(t), M(1.05));
    sheet.rectPoche(X(5.75), Y(5.7), M(3.35), M(t));
    sheet.opening(X(5.6), Y(3.0), M(t), M(0.85));
    sheet.door(X(5.6), Y(3.0), M(0.85), 'r', 1); // back room from hall
    sheet.opening(X(6.1), Y(5.7), M(0.7), M(t));
    sheet.door(X(6.1), Y(5.7), M(0.7), 'r', 1); // WC from hall leg A
    sheet.opening(X(7.6), Y(5.7), M(0.7), M(t));
    sheet.door(X(7.6), Y(5.7), M(0.7), 'r', 1); // press
    sheet.wc(X(6.4), Y(4.7), 'd');
    sheet.bed(X(6.4), Y(0.9), M(1.5), M(2.0));
    // Bathroom fixtures
    sheet.bath(X(0.7), Y(3.95), M(1.7), M(0.75));
    sheet.wc(X(1.2), Y(5.05), 'u');
    sheet.basin(X(3.4), Y(5.2));
    const L = (x, y, s, o = {}) => sheet.label(X(x), Y(y), s, { size: 14, ...o });
    L(0.65, 1.5, 'Box room', { size: 11 });
    L(0.65, 3.2, 'Press', { size: 11 });
    L(2.7, 3.4, 'Kitchen');
    L(6.0, 4.0, 'Back room');
    L(5.95, 5.35, 'WC', { size: 11 });
    L(7.3, 5.35, 'Press', { size: 11 });
    L(2.55, 5.45, 'Bathroom', { size: 12 });
  } else {
    // Removed: WC/press strip and its partitions (dashed), kitchen fixtures gone
    sheet.line(X(5.75), Y(4.57), X(9.1), Y(4.57), { dashed: true });
    sheet.line(X(7.07), Y(4.65), X(7.07), Y(5.7), { dashed: true });
    sheet.line(X(5.75), Y(5.77), X(9.1), Y(5.77), { dashed: true });
    sheet.rectPoche(X(5.75), Y(5.7), M(3.35), M(t)); // keep the hall wall (retained)
    // New structural opening between hall leg B and the new kitchen: wall x 5.6..5.75, y 2.2..4.4
    sheet.opening(X(5.6), Y(2.2), M(t), M(2.2));
    sheet.line(X(5.6), Y(2.2), X(5.6), Y(4.4), { weight: 2, color: ACCENT });
    sheet.line(X(5.75), Y(2.2), X(5.75), Y(4.4), { weight: 2, color: ACCENT });
    sheet.rectNew(X(5.5), Y(2.05), M(0.35), M(0.15));
    sheet.rectNew(X(5.5), Y(4.4), M(0.35), M(0.15)); // padstones
    sheet.note(X(5.68), Y(1.85), 'New steel over · structural opening', {
      size: 11,
      anchor: 'middle',
      color: ACCENT,
    });
    // Kitchen/dining in the enlarged back room
    sheet.worktop(X(5.75), Y(0.6), M(3.35), M(0.65));
    sheet.sink(X(6.7), Y(0.92), 11);
    sheet.hob(X(8.2), Y(0.92));
    sheet.joineryRun(X(8.4), Y(1.3), M(0.7), M(3.6), { newWork: true }); // full-height joinery absorbing services
    sheet.table(X(6.1), Y(2.7), M(1.9), M(0.9), 4);
    sheet.note(X(9.0), Y(5.55), 'Full-height joinery: storage, services', {
      size: 11,
      anchor: 'end',
    });
    // Extract route to the rear wall
    sheet.line(X(8.2), Y(0.6), X(8.2), Y(0.05), { weight: 1, color: ACCENT });
    sheet.path(`M${X(8.2) - 5} ${Y(0.2)}L${X(8.2)} ${Y(0.05)}L${X(8.2) + 5} ${Y(0.2)}`, {
      weight: 1,
      color: ACCENT,
    });
    sheet.note(X(8.3), Y(0.42), 'Extract', { size: 10, color: ACCENT });
    // Former kitchen → utility / study: remove press partition, keep box room as store
    sheet.rectPoche(X(1.85), Y(0.6), M(t), M(3.15));
    sheet.line(X(0.5), Y(2.37), X(1.85), Y(2.37), { dashed: true });
    sheet.opening(X(1.85), Y(1.2), M(t), M(0.75));
    sheet.door(X(2.0), Y(1.2), M(0.75), 'd', 1);
    sheet.opening(X(4.4), Y(2.5), M(t), M(0.8));
    sheet.door(X(4.4), Y(2.5), M(0.8), 'l', 1);
    sheet.joineryRun(X(2.0), Y(0.6), M(0.6), M(3.15), { newWork: true }); // utility run
    sheet.sink(X(2.3), Y(1.6), 9);
    sheet.worktop(X(3.5), Y(1.6), M(0.75), M(1.6)); // desk
    sheet.rectNew(X(2.0), Y(3.35), M(2.25), M(0.1)); // low upstand? no: a new partition is not needed; treat as threshold line
    // Bathroom retained
    sheet.bath(X(0.7), Y(3.95), M(1.7), M(0.75));
    sheet.wc(X(1.2), Y(5.05), 'u');
    sheet.basin(X(3.4), Y(5.2));
    const L = (x, y, s, o = {}) => sheet.label(X(x), Y(y), s, { size: 14, ...o });
    L(0.65, 1.5, 'Store', { size: 11 });
    L(2.6, 2.4, 'Utility ·', { size: 12 });
    L(2.6, 2.62, 'study', { size: 12 });
    L(6.0, 4.2, 'Kitchen · dining');
    L(2.55, 5.45, 'Bathroom', { size: 12 });
    sheet.note(X(5.9), Y(5.05), 'Borrowed light to the hall', { size: 11 });
  }
  const L = (x, y, s, o = {}) => sheet.label(X(x), Y(y), s, { size: 14, ...o });
  L(1.0, 9.0, 'Living');
  L(6.0, 9.0, 'Bedroom 1');
  L(4.62, 4.9, 'Hall', { size: 11 });
  L(6.4, 6.55, 'Hall', { size: 12 });
  sheet.note(X(2.2), Y(-0.35), 'Back court', { size: 12 });
  sheet.note(X(2.7), Y(12.6), 'Street', { size: 12 });
  sheet.note(X(-0.2), Y(5.0), 'Mutual wall', { size: 11, anchor: 'end' });
  sheet.note(X(0.7), Y(8.1), 'Cornice and doors retained', { size: 10 });
  sheet.note(X(5.9), Y(8.1), 'Cornice and doors retained', { size: 10 });
}

function base(number, title, description) {
  return new Sheet({
    width: 1600,
    height: 1131,
    number,
    title,
    projectTitle: PROJECT,
    unitPx: 62,
    description,
  });
}

export function pollokshieldsExisting() {
  const s = base(
    'Drawing 01',
    'Existing plan',
    'Existing plan of a c.1900 tenement flat: generous front living room with bay and front bedroom, a hall in two legs from the landing, a small rear kitchen with box room and press, a bathroom and a back room with a WC and press strip between it and the hall.',
  );
  s.label(80, 70, 'Existing plan · first-floor flat', { size: 16, weight: 500 });
  s.line(80, 82, 1000, 82, { weight: 0.8, opacity: 0.4 });
  flatPlan(s, 220, 130, 62, { proposed: false });
  s.legend(80, 960, [
    { swatch: 'poche', text: 'Existing fabric (poché)' },
    { swatch: 'grey', text: 'Common and shared walls indicated by position' },
  ]);
  s.scaleBar(700, 975, 5);
  s.north(1500, 150);
  return s.titleStrip();
}
export function pollokshieldsProposed() {
  const s = base(
    'Drawing 02',
    'Proposed plan',
    'Proposed plan: kitchen and dining move into the enlarged back room, one structural opening connects it to the hall for movement and borrowed light, the former kitchen becomes a utility and study, and full-height joinery absorbs storage and services.',
  );
  s.label(80, 70, 'Proposed plan · first-floor flat', { size: 16, weight: 500 });
  s.line(80, 82, 1000, 82, { weight: 0.8, opacity: 0.4 });
  flatPlan(s, 220, 130, 62, { proposed: true });
  s.legend(80, 960, [
    { swatch: 'poche', text: 'Existing fabric retained (poché)' },
    { swatch: 'new', text: 'New work (hatch)' },
    { swatch: 'dashed', text: 'Removed' },
  ]);
  s.scaleBar(700, 975, 5);
  s.north(1500, 150);
  return s.titleStrip();
}
export function pollokshieldsAxo() {
  const s = new Sheet({
    width: 1200,
    height: 1200,
    number: 'Drawing 03',
    title: 'Axonometric of old and new',
    projectTitle: PROJECT,
    unitPx: 52,
    description:
      'Axonometric of the rear half of the flat with walls cut low: retained fabric in grey, the new structural opening, kitchen joinery and utility run in terracotta hatch.',
  });
  const P = isoProjector({ originX: 520, originY: 300, scale: 56 });
  const z = 1.1;
  const grey = (pts, o) =>
    s.add(
      `<polygon points="${pts.map((p) => p.map((v) => v.toFixed(1)).join(',')).join(' ')}" fill="${INK}" fill-opacity="${o}" stroke="${INK}" stroke-width="0.8"/>`,
    );
  const hatch = (pts) =>
    s.add(
      `<polygon points="${pts.map((p) => p.map((v) => v.toFixed(1)).join(',')).join(' ')}" fill="url(#newwork)" stroke="${ACCENT}" stroke-width="1"/>`,
    );
  // Floor plate of the rear half (y 0..6.0) as a light outline
  s.add(
    `<polygon points="${[P(0, 0), P(9.6, 0), P(9.6, 6.0), P(0, 6.0)].map((p) => p.join(',')).join(' ')}" fill="${INK}" fill-opacity="0.05" stroke="${INK}" stroke-width="0.8"/>`,
  );
  const walls = [
    [0, 0, 9.6, 0.6],
    [0, 0.6, 0.5, 5.4],
    [9.1, 0.6, 0.5, 5.4], // envelope
    [4.4, 2.0, 0.15, 4.0],
    [5.6, 0.6, 0.15, 1.6],
    [5.6, 4.4, 0.15, 1.6], // hall leg B walls (with the opening left out)
    [4.4, 2.0, 1.2, 0.15],
    [0.5, 3.75, 3.9, 0.15],
    [0.5, 5.7, 3.9, 0.15],
    [5.75, 5.7, 3.35, 0.15],
    [1.85, 0.6, 0.15, 3.15],
    [2.4, 5.85, 0.15, 0.15],
  ];
  // draw back-to-front for overlap: sort by (x + y)
  const boxes = walls.map(([x, y, w, h]) => ({ x, y, w, h, k: x + y + w + h }));
  boxes.sort((a, b) => a.k - b.k);
  for (const b of boxes) {
    const f = isoBox(P, b.x, b.y, b.w, b.h, z);
    grey(f.right, 0.55);
    grey(f.front, 0.4);
    grey(f.top, 0.28);
  }
  // New: opening head (steel) drawn as a hatched beam spanning the opening at z 1.1..1.25 over y 2.2..4.4 at x 5.6
  const beam = isoBox(P, 5.55, 2.2, 0.25, 2.2, 0.15);
  const lift = (pts) => pts.map(([px, py]) => [px, py - z * 62]);
  hatch(lift(beam.right));
  hatch(lift(beam.front));
  hatch(lift(beam.top));
  // New joinery: kitchen run and utility run
  for (const [x, y, w, h] of [
    [8.4, 1.3, 0.7, 3.6],
    [2.0, 0.6, 0.6, 3.15],
    [5.75, 0.6, 3.35, 0.65],
  ]) {
    const f = isoBox(P, x, y, w, h, 0.9);
    hatch(f.right);
    hatch(f.front);
    hatch(f.top);
  }
  // Labels with leaders
  const lab = (pt, dx, dy, text, anchor = 'start') => {
    s.line(pt[0], pt[1], pt[0] + dx, pt[1] + dy, { weight: 0.7 });
    s.circle(pt[0], pt[1], 2.2, { fill: INK, weight: 0 });
    s.note(pt[0] + dx + (anchor === 'end' ? -6 : 6), pt[1] + dy + 4, text, { size: 13, anchor });
  };
  lab(P(5.62, 3.3, 1.2), 60, -200, 'New steel over structural opening');
  lab(P(8.75, 3.0, 0.9), 40, 150, 'Full-height joinery: storage and services');
  lab(P(2.3, 2.2, 0.9), -150, -120, 'Utility run in the former kitchen', 'end');
  lab(P(7.4, 0.9, 0.9), 60, -170, 'Kitchen along the rear wall, window retained');
  lab(P(0.25, 3.0, 1.1), -120, 40, 'Mutual wall retained', 'end');
  lab(P(9.35, 4.5, 1.1), 40, 120, 'Wall to close retained');
  s.note(P(4.9, 5.4, 0)[0], P(4.9, 5.4, 0)[1] + 60, 'Hall', { size: 13, anchor: 'middle' });
  s.note(P(7.4, 3.2, 0)[0], P(7.4, 3.2, 0)[1] + 4, 'Kitchen · dining', {
    size: 13,
    anchor: 'middle',
  });
  s.note(P(2.3, 4.7, 0)[0], P(2.3, 4.7, 0)[1] + 4, 'Bathroom', { size: 13, anchor: 'middle' });
  s.legend(80, 1010, [
    { swatch: 'grey', text: 'Retained fabric (walls cut at 1.1 m)' },
    { swatch: 'new', text: 'New work' },
  ]);
  s.note(1120, 1020, 'Not to scale', { size: 12, anchor: 'end' });
  return s.titleStrip();
}
