import { Sheet, INK, ACCENT, PAPER } from '../toolkit.mjs';

const PROJECT = 'Southside Corner Rooms';

export function southsidePlan() {
  const s = new Sheet({
    width: 1600,
    height: 1131,
    number: 'Drawing 01',
    title: 'Proposed ground-floor plan',
    projectTitle: PROJECT,
    unitPx: 62,
    scaleNote: 'Scale bar 0–5 m',
    description:
      'Proposed plan of a deep corner unit: step-free corner entrance, café room with counter and perimeter bench, a servicing spine along the party wall with kitchen, store and accessible WC, and an internal glazed screen to the community room at the rear.',
  });
  const u = 62,
    ox = 300,
    oy = 120;
  const M = (v) => v * u,
    X = (x) => ox + M(x),
    Y = (y) => oy + M(y);
  const W = 7.6,
    D = 14.0;
  const T = 0.5,
    t = 0.15;
  // Envelope: street walls top (y 0..0.5) and left (x 0..0.5), party walls right and rear
  s.rectPoche(X(0), Y(0), M(W), M(T));
  s.rectPoche(X(0), Y(0), M(T), M(D));
  s.rectPoche(X(W - T), Y(0), M(T), M(D));
  s.rectPoche(X(0), Y(D - T), M(W), M(T));
  // Chamfered corner entrance: cut the corner and add a splay wall with the door
  s.opening(X(0), Y(0), M(1.6), M(1.6));
  s.poche([
    [X(0), Y(1.6)],
    [X(1.6), Y(0)],
    [X(1.6), Y(T)],
    [X(T), Y(1.6)],
  ]);
  // door in the splay (opening 1.0 m wide along the splay)
  s.add(
    `<polygon points="${[
      [X(0.55), Y(1.05)],
      [X(1.05), Y(0.55)],
      [X(1.4), Y(0.9)],
      [X(0.9), Y(1.4)],
    ]
      .map((p) => p.join(','))
      .join(' ')}" fill="${PAPER}"/>`,
  );
  s.line(X(0.8), Y(1.3), X(1.5), Y(1.75), { weight: 1.6 });
  s.path(`M${X(1.5)} ${Y(1.75)}A${M(0.83)} ${M(0.83)} 0 0 1 ${X(0.45)} ${Y(1.65)}`, {
    weight: 0.7,
  });
  s.note(X(0.2), Y(-0.25), 'Step-free corner entrance', { size: 11 });
  // Shopfront glazing on the two street walls (stallriser + glazing)
  s.window(X(1.9), Y(0), M(2.6), 'h', M(T));
  s.window(X(4.9), Y(0), M(2.0), 'h', M(T));
  s.window(X(0), Y(2.0), M(2.6), 'v', M(T));
  s.window(X(0), Y(5.0), M(2.0), 'v', M(T));
  // Community room windows on the side street
  s.window(X(0), Y(8.6), M(1.6), 'v', M(T));
  s.window(X(0), Y(11.0), M(1.6), 'v', M(T));
  // Servicing spine along the party wall: x 5.6..7.1, y 7.4..13.5 (new partitions hatched)
  s.rectNew(X(5.6), Y(7.4), M(t), M(6.1));
  for (const y of [7.4, 9.9, 11.0, 13.0]) s.rectNew(X(5.6), Y(y), M(1.5), M(t));
  // Kitchen y 7.55..9.9; store 10.05..11.0; accessible WC 11.15..13.0; plant 13.15..13.5
  s.worktop(X(6.5), Y(7.6), M(0.6), M(2.2));
  s.sink(X(6.8), Y(8.2), 9);
  s.hob(X(6.8), Y(9.3));
  s.opening(X(5.6), Y(8.3), M(t), M(0.85));
  s.door(X(5.6), Y(8.3), M(0.85), 'l', -1);
  s.opening(X(5.6), Y(10.25), M(t), M(0.7));
  s.door(X(5.6), Y(10.25), M(0.7), 'l', 1);
  s.opening(X(5.6), Y(11.5), M(t), M(0.95));
  s.door(X(5.6), Y(11.5), M(0.95), 'l', -1);
  s.wc(X(6.85), Y(11.3), 'd');
  s.basin(X(6.1), Y(12.7));
  s.rect(X(6.55), Y(12.1), M(0.45), M(0.1), { weight: 0.7 }); // grab rail
  s.label(X(5.85), Y(9.65), 'Kitchen', { size: 12 });
  s.label(X(5.85), Y(10.75), 'Store', { size: 11 });
  s.label(X(5.8), Y(11.45), 'Accessible', { size: 10 });
  s.label(X(5.8), Y(11.65), 'WC', { size: 10 });
  s.label(X(5.85), Y(13.4), 'Plant', { size: 9 });
  // Counter along the spine side in the café: new joinery x 5.9..7.1, y 3.4..7.0
  s.joineryRun(X(5.9), Y(3.6), M(0.7), M(3.4), { newWork: true });
  s.note(X(5.85), Y(3.4), 'Counter', { size: 11, anchor: 'end' });
  s.worktop(X(6.6), Y(3.6), M(0.5), M(3.4));
  // Perimeter bench along the street walls (new joinery)
  s.joineryRun(X(1.9), Y(0.5), M(5.0), M(0.5), { newWork: true });
  s.joineryRun(X(0.5), Y(2.0), M(0.5), M(5.0), { newWork: true });
  s.note(X(3.5), Y(1.3), 'Perimeter bench with storage under', { size: 11, anchor: 'middle' });
  // Café tables
  for (const [x, y] of [
    [1.6, 2.6],
    [1.6, 4.4],
    [3.4, 2.6],
    [3.4, 4.4],
  ])
    s.table(X(x), Y(y), M(0.8), M(0.8), 2);
  s.label(X(2.2), Y(6.5), 'Café', { size: 16 });
  // Glazed screen between café and community room at y 7.4, x 0.5..5.6, with a 1.8 m double door
  s.rectNew(X(0.5), Y(7.35), M(5.1), M(0.1));
  s.opening(X(2.4), Y(7.35), M(1.8), M(0.1));
  s.line(X(2.4), Y(7.4), X(3.3), Y(7.4), { weight: 1.6, color: ACCENT });
  s.line(X(4.2), Y(7.4), X(3.3), Y(7.4), { weight: 1.6, color: ACCENT });
  s.path(`M${X(2.4)} ${Y(7.4)}A${M(0.9)} ${M(0.9)} 0 0 0 ${X(3.3)} ${Y(8.3)}`, { weight: 0.7 });
  s.path(`M${X(4.2)} ${Y(7.4)}A${M(0.9)} ${M(0.9)} 0 0 1 ${X(3.3)} ${Y(8.3)}`, { weight: 0.7 });
  s.note(X(0.6), Y(7.2), 'Internal glazed screen: light borrowed into the community room', {
    size: 11,
    color: ACCENT,
  });
  // Community room: table and stacking chairs
  s.table(X(1.6), Y(9.6), M(2.6), M(1.0), 6);
  s.label(X(1.0), Y(12.6), 'Community room', { size: 15 });
  s.note(X(1.0), Y(12.9), 'Meetings and events by evening', { size: 11 });
  s.rect(X(4.3), Y(12.2), M(1.0), M(0.9), { weight: 0.7, dashed: true });
  s.note(X(4.8), Y(12.05), 'Chair store', { size: 10, anchor: 'middle' });
  // Street labels
  s.note(X(W / 2), Y(-0.6), 'Main street', { size: 12, anchor: 'middle' });
  s.note(X(-0.3), Y(7.0), 'Side street', { size: 12, anchor: 'end' });
  s.note(X(W + 0.2), Y(4.0), 'Party wall', { size: 11 });
  s.note(X(W / 2), Y(D + 0.5), 'Rear: neighbouring property', { size: 11, anchor: 'middle' });
  s.note(X(5.5), Y(6.7), 'Servicing spine along the party wall:', { size: 10, anchor: 'end' });
  s.note(X(5.5), Y(6.92), 'drainage, extract and power in one route', { size: 10, anchor: 'end' });
  s.legend(80, 960, [
    { swatch: 'poche', text: 'Existing fabric retained (poché)' },
    { swatch: 'new', text: 'New work (hatch)' },
    { swatch: 'dashed', text: 'Removed / loose furniture' },
  ]);
  s.scaleBar(700, 975, 5);
  s.north(1500, 150);
  return s.titleStrip();
}

export function southsideSection() {
  const s = new Sheet({
    width: 1600,
    height: 900,
    number: 'Drawing 02',
    title: 'Section through café and community room',
    projectTitle: PROJECT,
    unitPx: 85,
    scaleNote: 'Scale bar 0–3 m',
    description:
      'Long section from the street corner to the rear: level threshold, café with counter and wood-wool acoustic ceiling panels, the internal glazed screen, the community room with side-street window, retained terrazzo and new linoleum floors, and the tenement floor above.',
  });
  const u = 85,
    ox = 120;
  const G = 620;
  const X = (m) => ox + m * u,
    Y = (h) => G - h * u;
  const D = 14.0;
  // Ground / pavement and floor
  s.line(40, G, 1560, G, { weight: 2 });
  s.rectPoche(X(0.5), Y(0.12), 13.0 * u, 0.12 * u);
  s.note(X(0.6), Y(-0.35), 'Retained terrazzo, repaired', { size: 12 });
  s.note(X(7.6), Y(-0.35), 'New linoleum', { size: 12 });
  s.line(X(7.4), Y(0.12), X(7.4), Y(0.0), { weight: 1.2, color: ACCENT });
  // Walls: street wall (left) 0.5, rear wall (right)
  s.rectPoche(X(0), Y(4.9), 0.5 * u, 4.9 * u + 0.2 * u);
  s.rectPoche(X(D - 0.5), Y(4.9), 0.5 * u, 4.9 * u + 0.2 * u);
  s.opening(X(0), Y(2.6), 0.5 * u, 2.4 * u);
  s.line(X(0.25), Y(2.6), X(0.25), Y(0.2), { weight: 3 });
  s.note(X(-0.2), Y(1.4), 'Corner door', { size: 11, anchor: 'end' });
  // Tenement floor above at 3.9..4.25 and the flat above (cut)
  s.rectPoche(X(0.5), Y(4.25), 13.0 * u, 0.35 * u);
  s.label(X(3.0), Y(4.6), 'Tenement flat above', { size: 13 });
  // Ceiling with wood-wool acoustic panels between 3.3 and 3.5 in the café; plain ceiling in the community room
  for (let x = 0.7; x < 7.2; x += 0.6) s.rectNew(X(x), Y(3.5), 0.5 * u, 0.12 * u);
  s.note(X(3.4), Y(3.62), 'Wood-wool acoustic panels', {
    size: 11,
    anchor: 'middle',
    color: ACCENT,
  });
  s.line(X(7.6), Y(3.5), X(13.5), Y(3.5), { weight: 1.2 });
  s.note(X(10.5), Y(3.62), 'Plasterboard ceiling · services above', { size: 11, anchor: 'middle' });
  // Glazed screen at x 7.4: full height to 3.5 with a door
  s.rectNew(X(7.35), Y(3.5), 0.1 * u, 3.5 * u);
  s.line(X(7.4), Y(2.1), X(7.4), Y(0.12), { weight: 3, color: INK });
  s.leader(
    X(7.4),
    Y(2.8),
    X(8.6),
    Y(4.7),
    'Internal glazed screen borrows light deeper into the plan',
    { size: 12 },
  );
  // Counter in the café
  s.rectNew(X(5.2), Y(0.95), 1.6 * u, 0.83 * u);
  s.note(X(6.0), Y(1.15), 'Counter', { size: 11, anchor: 'middle' });
  // Perimeter bench near the corner
  s.rectNew(X(0.6), Y(0.55), 0.5 * u, 0.43 * u);
  s.note(X(0.6), Y(0.75), 'Bench', { size: 10 });
  // Side-street window in the community room (beyond) drawn as elevation
  s.rect(X(9.4), Y(2.9), 1.6 * u, 1.9 * u, { weight: 1.1 });
  s.line(X(9.4), Y(1.95), X(11.0), Y(1.95), { weight: 0.8 });
  s.note(X(10.2), Y(3.05), 'Side-street window beyond', { size: 10, anchor: 'middle' });
  // Table in the community room
  s.rect(X(11.6), Y(0.75), 1.4 * u, 0.06 * u, { weight: 1, fill: INK });
  s.line(X(11.7), Y(0.75), X(11.7), Y(0.12), { weight: 1 });
  s.line(X(12.9), Y(0.75), X(12.9), Y(0.12), { weight: 1 });
  s.label(X(2.2), Y(2.3), 'Café', { size: 16 });
  s.label(X(8.0), Y(2.3), 'Community room', { size: 15 });
  s.leader(X(0.5), Y(0.0), X(1.4), Y(-0.75) + 0, 'Level threshold from the pavement', { size: 12 });
  s.note(X(-0.3), Y(-0.35), 'Pavement', { size: 12, anchor: 'end' });
  s.legend(80, 740, [
    { swatch: 'poche', text: 'Existing fabric (cut)' },
    { swatch: 'new', text: 'New work' },
  ]);
  s.scaleBar(600, 760, 3);
  return s.titleStrip();
}
