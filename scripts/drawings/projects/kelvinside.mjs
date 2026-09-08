import { Sheet, wallRing, INK, ACCENT, PAPER } from '../toolkit.mjs';

const PROJECT = 'Kelvinside Garden Room';

/** Plan geometry in metres; origin at the top-left of the plot, garden at the top, street at the bottom. */
function housePlan(sheet, ox, oy, u, { proposed }) {
  const M = (v) => v * u; // metres → px
  const X = (x) => ox + M(x);
  const Y = (y) => oy + M(y);
  const T = 0.6; // sandstone external wall
  const t = 0.15; // internal partition

  // Main house ring: x 0..7.2, y 3.0..12.4
  wallRing(sheet, X(0), Y(3.0), M(7.2), M(9.4), M(T));
  // Front bay: x 1.6..4.1 projecting 1.1 m below the front wall (three-sided)
  sheet.poche([
    [X(1.6), Y(11.8)],
    [X(1.6), Y(12.9)],
    [X(4.1), Y(12.9)],
    [X(4.1), Y(11.8)],
    [X(3.6), Y(11.8)],
    [X(3.6), Y(12.4)],
    [X(2.1), Y(12.4)],
    [X(2.1), Y(11.8)],
  ]);
  sheet.opening(X(1.6), Y(11.8), M(2.5), M(0.6));
  sheet.window(X(2.1), Y(12.4), M(1.5), 'h', M(0.5));
  sheet.window(X(1.6), Y(11.9), M(1.0), 'v', M(0.5));
  sheet.window(X(3.6), Y(11.9), M(1.0), 'v', M(0.5));

  // Internal walls (existing, retained in both)
  sheet.rectPoche(X(5.1), Y(3.6), M(t), M(8.2)); // hall spine wall x 5.1..5.25
  sheet.rectPoche(X(0.6), Y(8.3), M(4.5), M(t)); // dining/front room wall y 8.3..8.45
  sheet.rectPoche(X(0.6), Y(5.6), M(4.5), M(t)); // kitchen/dining wall y 5.6..5.75

  // Windows on the main house
  sheet.window(X(0), Y(4.0), M(1.2), 'v', M(T)); // kitchen, left wall
  sheet.window(X(0), Y(6.3), M(1.4), 'v', M(T)); // dining, left wall
  sheet.window(X(0), Y(9.4), M(1.4), 'v', M(T)); // front room, left wall
  sheet.window(X(5.5), Y(11.8), M(0.5), 'h', M(T)); // hall fanlight beside door
  // Front door
  sheet.opening(X(5.9), Y(11.8), M(0.9), M(T));
  sheet.door(X(5.9), Y(11.8), M(0.9), 'r', -1);

  // Stair in hall (up toward the rear)
  sheet.stair(X(5.4), Y(8.7), M(1.1), M(2.9), 'v', { treads: 12, arrow: 'up' });
  sheet.note(X(5.95), Y(11.9), 'UP', { size: 11, anchor: 'middle' });

  // Doors between rooms
  sheet.opening(X(5.1), Y(9.0), M(t), M(0.85)); // front room ↔ hall
  sheet.door(X(5.1), Y(9.0), M(0.85), 'l', -1);
  sheet.opening(X(5.1), Y(6.3), M(t), M(0.85)); // dining ↔ passage
  sheet.door(X(5.1), Y(6.3), M(0.85), 'l', -1);
  sheet.opening(X(2.2), Y(8.3), M(0.85), M(t)); // dining ↔ front room
  sheet.door(X(2.2), Y(8.45), M(0.85), 'r', -1);

  if (!proposed) {
    // Existing rear projection: scullery + WC, brick, 0.3 m walls: x 0..3.0, y 0.6..3.0
    wallRing(sheet, X(0), Y(0.6), M(3.0), M(2.4), M(0.3));
    sheet.rectPoche(X(1.9), Y(0.9), M(0.12), M(2.1)); // scullery / WC partition
    sheet.opening(X(0.9), Y(2.4), M(0.9), M(T)); // scullery ↔ kitchen through the rear wall (existing)
    sheet.opening(X(0.9), Y(3.0), M(0.9), M(0.6));
    sheet.door(X(0.9), Y(3.0), M(0.9), 'r', 1);
    sheet.window(X(0), Y(1.3), M(0.9), 'v', M(0.3)); // scullery window
    sheet.window(X(2.3), Y(0.6), M(0.5), 'h', M(0.3)); // WC window
    sheet.opening(X(2.7), Y(1.5), M(0.3), M(0.8)); // back door on the projection's side
    sheet.door(X(3.0), Y(1.5), M(0.8), 'd', 1);
    sheet.wc(X(2.45), Y(1.05), 'd');
    sheet.sink(X(0.75), Y(1.9), 11);
    // Kitchen / store / passage subdivision
    sheet.rectPoche(X(3.6), Y(3.6), M(t), M(2.0)); // kitchen | store
    sheet.window(X(4.0), Y(3.0), M(0.8), 'h', M(T)); // store window
    sheet.opening(X(5.5), Y(3.0), M(0.9), M(T)); // back door from passage
    sheet.door(X(5.5), Y(3.0), M(0.9), 'r', 1);
    sheet.opening(X(3.6), Y(4.3), M(t), M(0.8));
    sheet.door(X(3.75), Y(4.3), M(0.8), 'd', -1);
    sheet.opening(X(2.4), Y(5.6), M(0.85), M(t)); // kitchen ↔ dining
    sheet.door(X(2.4), Y(5.75), M(0.85), 'r', 1);
    // Fixtures
    sheet.worktop(X(0.6), Y(3.6), M(0.6), M(1.9));
    sheet.sink(X(0.9), Y(4.6), 10);
    sheet.hob(X(0.9), Y(3.95));
    sheet.table(X(1.6), Y(6.4), M(1.8), M(0.9), 4);
    // Labels
    const L = (x, y, s, o = {}) => sheet.label(X(x), Y(y), s, { size: 15, ...o });
    L(0.35, 1.4, 'Scullery', { size: 12 });
    L(2.05, 2.75, 'WC', { size: 13 });
    L(0.8, 5.35, 'Kitchen');
    L(3.8, 5.35, 'Store', { size: 13 });
    L(5.35, 4.4, 'Passage', { size: 13 });
    L(1.4, 7.3, 'Dining');
    L(1.2, 10.4, 'Front room');
    L(5.35, 8.35, 'Hall', { size: 13 });
    sheet.note(X(3.4), Y(0.35), 'Garden', { size: 13 });
    sheet.note(X(4.6), Y(1.8), 'Garden threshold via projection', { size: 12 });
  } else {
    // Removed: projection and kitchen/store partition, dashed
    sheet.rect(X(0), Y(0.6), M(3.0), M(2.4), { dashed: true, weight: 1.2 });
    sheet.line(X(3.6), Y(3.6), X(3.6), Y(5.6), { dashed: true, weight: 1.2 });
    // Rear wall opened between piers: retain 0.6 pier each side → opening x 1.2..6.0
    sheet.opening(X(1.2), Y(3.0), M(4.8), M(T));
    sheet.line(X(1.2), Y(3.0), X(6.0), Y(3.0), { weight: 2, color: ACCENT });
    sheet.line(X(1.2), Y(3.6), X(6.0), Y(3.6), { weight: 2, color: ACCENT });
    sheet.note(X(3.6), Y(3.42), 'New steel over — existing wall opened', {
      size: 11,
      anchor: 'middle',
      color: ACCENT,
    });
    // Garden room: new 0.3 m walls x 0..7.2, y -0.4..3.0, glazed to the garden between x 0.9..6.3
    wallRing(sheet, X(0), Y(-0.4), M(7.2), M(3.4), M(0.3), { newWork: true });
    // glazing: clear the top wall and draw a dark-framed screen
    sheet.opening(X(0.9), Y(-0.4), M(5.4), M(0.3));
    sheet.line(X(0.9), Y(-0.25), X(6.3), Y(-0.25), { weight: 3, color: INK });
    for (const m of [0.9, 2.25, 3.6, 4.95, 6.3])
      sheet.line(X(m), Y(-0.4), X(m), Y(-0.1), { weight: 2, color: INK });
    sheet.note(X(3.6), Y(-0.55), 'Dark metal-framed glazing · sliding leaf', {
      size: 11,
      anchor: 'middle',
    });
    // side window to the west
    sheet.opening(X(0), Y(0.8), M(0.3), M(1.2));
    sheet.line(X(0.15), Y(0.8), X(0.15), Y(2.0), { weight: 3, color: INK });
    // clerestory over, shown dashed just inside the rear wall
    sheet.line(X(0.6), Y(2.75), X(6.6), Y(2.75), { dashed: true, weight: 1, color: ACCENT });
    sheet.note(X(3.6), Y(2.62), 'High-level clerestory over', {
      size: 11,
      anchor: 'middle',
      color: ACCENT,
    });
    // Utility: new partition at y 5.0 from x 5.25..6.6 with door from the kitchen zone
    sheet.rectNew(X(5.25), Y(5.0), M(1.35), M(0.1));
    sheet.opening(X(5.1), Y(4.0), M(t), M(0.8));
    sheet.door(X(5.1), Y(4.0), M(0.8), 'l', -1);
    sheet.line(X(5.1), Y(4.0), X(5.1), Y(4.8), { weight: 1.2, color: ACCENT });
    // Kitchen: worktop along the left wall and rear, island
    sheet.worktop(X(0.6), Y(3.6), M(0.65), M(2.0));
    sheet.worktop(X(0.6), Y(3.6), M(4.4), M(0.65));
    sheet.sink(X(2.6), Y(3.92), 11);
    sheet.hob(X(3.9), Y(3.92));
    sheet.joineryRun(X(1.9), Y(4.75), M(2.2), M(0.8), { newWork: true }); // island, new joinery
    sheet.joineryRun(X(0.3), Y(0.05), M(0.55), M(2.4), { newWork: true }); // fixed timber joinery/bench on the west wall
    sheet.table(X(2.1), Y(0.9), M(2.4), M(1.0), 6);
    sheet.worktop(X(5.35), Y(3.6), M(1.2), M(0.6)); // utility bench
    sheet.sink(X(5.95), Y(3.9), 9);
    sheet.table(X(1.6), Y(6.4), M(1.8), M(0.9), 4);
    // Labels
    const L = (x, y, s, o = {}) => sheet.label(X(x), Y(y), s, { size: 15, ...o });
    L(2.6, 2.3, 'Garden room · dining');
    L(0.8, 5.5, 'Kitchen');
    L(5.35, 4.75, 'Utility', { size: 13 });
    L(5.35, 6.4, 'Passage', { size: 13 });
    L(1.4, 7.3, 'Dining · living');
    L(1.2, 10.4, 'Front room');
    L(5.35, 8.35, 'Hall', { size: 13 });
    sheet.note(X(3.6), Y(-0.85), 'Garden', { size: 13, anchor: 'middle' });
    sheet.note(X(7.35), Y(0.4), 'Timber lining to', { size: 11 });
    sheet.note(X(7.35), Y(0.58), 'garden room walls', { size: 11 });
  }
  // Party wall note
  sheet.note(X(7.35), Y(8.0), 'Party wall', { size: 11 });
  sheet.note(X(7.35), Y(8.18), '(semi-detached)', { size: 11 });
  // Street
  sheet.note(X(3.6), Y(13.4), 'Street', { size: 13, anchor: 'middle' });
}

export function kelvinsidePlan() {
  const s = new Sheet({
    width: 1600,
    height: 1131,
    number: 'Drawing 01',
    title: 'Existing and proposed ground-floor plans',
    projectTitle: PROJECT,
    unitPx: 55,
    description:
      'Existing plan with a fragmented rear kitchen, scullery and WC projection beside a proposed plan in which the rear rooms are reordered into a kitchen and utility and a new garden room extends across the full width of the house.',
  });
  const u = 55;
  s.label(80, 70, 'Existing ground floor', { size: 16, weight: 500 });
  s.label(860, 70, 'Proposed ground floor', { size: 16, weight: 500 });
  s.line(80, 82, 700, 82, { weight: 0.8, opacity: 0.4 });
  s.line(860, 82, 1480, 82, { weight: 0.8, opacity: 0.4 });
  housePlan(s, 90, 160, u, { proposed: false });
  housePlan(s, 870, 160, u, { proposed: true });
  s.legend(80, 940, [
    { swatch: 'poche', text: 'Existing fabric retained (poché)' },
    { swatch: 'new', text: 'New work (hatch)' },
    { swatch: 'dashed', text: 'Removed' },
  ]);
  s.scaleBar(560, 960, 5);
  s.north(1500, 150);
  return s.titleStrip();
}

export function kelvinsideSection() {
  const s = new Sheet({
    width: 1600,
    height: 900,
    number: 'Drawing 02',
    title: 'Section through garden room and clerestory',
    projectTitle: PROJECT,
    unitPx: 80,
    scaleNote: 'Scale bar 0–3 m',
    description:
      'Section from the garden through the new single-storey garden room to the existing two-storey rear wall, showing the stepped roof with a clerestory band against the house, insulated floor and roof build-ups and the rainwater outlet at the low edge.',
  });
  const u = 80; // px per metre
  const gx = 430; // garden edge x (room on the left for notes)
  const G = 660; // ground line y (garden), house floor at 640
  const X = (m) => gx + m * u;
  const Yh = (m) => G - m * u; // height above garden ground

  // Ground
  s.line(40, G, 1560, G, { weight: 2 });
  for (let x = 40; x < 1560; x += 26) s.line(x, G, x - 10, G + 10, { weight: 0.6, opacity: 0.6 });

  // Existing house: rear wall poché x 8.4..9.0 m from ground to 7.4 m (cut), floors beyond
  const wallX = X(8.4);
  const wt = 0.6 * u;
  s.rectPoche(wallX, Yh(6.9), wt, 6.9 * u + 40);
  s.path(`M${wallX - 6} ${Yh(6.9) + 6}l12 -12`, { weight: 1.2, color: PAPER });
  // ground-floor opening in the wall: 0.3..2.6 m
  s.opening(wallX, Yh(2.6), wt, 2.3 * u);
  s.line(wallX, Yh(2.6), wallX + wt, Yh(2.6), { weight: 2, color: ACCENT });
  s.rectNew(wallX - 4, Yh(2.85), wt + 8, 0.25 * u); // new steel/lintel zone
  s.note(wallX + wt + 10, Yh(2.7), 'New steel lintel to opened rear wall', { size: 12 });
  // first-floor window in the wall: 4.3..5.8 m
  s.opening(wallX, Yh(5.8), wt, 1.5 * u);
  s.rect(wallX + wt * 0.3, Yh(5.8), wt * 0.25, 1.5 * u, { weight: 1.2, fill: PAPER });
  s.rectPoche(wallX - 4, Yh(4.3), wt + 8, 0.12 * u); // sill
  s.rectPoche(wallX, Yh(5.95), wt, 0.15 * u); // lintel
  s.note(wallX + wt + 12, Yh(5.9), 'Existing first-floor window retained', { size: 12 });
  // floors of the house beyond the wall (to the right)
  s.rectPoche(wallX + wt, Yh(0.35), 480, 0.35 * u); // ground floor structure zone
  s.rectPoche(wallX + wt, Yh(3.55), 480, 0.35 * u); // first floor
  s.rect(wallX + wt, Yh(3.2), 480, 2.85 * u, { weight: 0.6, opacity: 0.5 });
  s.label(wallX + wt + 30, Yh(1.6), 'Kitchen (existing rear room)', { size: 14 });
  s.label(wallX + wt + 30, Yh(4.6), 'Bedroom over', { size: 14 });
  s.note(wallX + wt + 30, Yh(0.55), 'Existing suspended timber floor', { size: 12 });

  // Garden room: floor slab 0..8.4 m from garden edge (x 0.3 .. 8.4)
  const fx = X(0.3);
  const fw = wallX - fx;
  s.rectNew(fx, Yh(0.0) - 8, fw, 0.32 * u); // new insulated ground floor slab zone
  s.insulation(fx + 2, Yh(0.0) - 6, fw - 4, 0.14 * u);
  s.note(fx + 12, Yh(-0.45), 'Insulated ground-bearing floor · timber floor finish', { size: 12 });
  // Garden-facing glazed wall at x 0.3, height to 2.7 m: dark frame
  s.rectPoche(fx - 6, Yh(2.7), 12, 2.7 * u);
  s.rect(fx - 12, Yh(2.9), 24, 0.2 * u, { weight: 1, fill: INK });
  s.note(fx - 22, Yh(1.3), 'Dark metal-framed glazing to garden', { size: 12, anchor: 'end' });
  // Low roof: from x 0.3 to 5.0 at 2.7..3.0 m (build-up 0.3)
  const lowRoofTop = Yh(3.0);
  s.rectNew(fx - 12, lowRoofTop, X(5.0) - fx + 12, 0.3 * u);
  s.insulation(fx - 8, lowRoofTop + 6, X(5.0) - fx + 4, 0.14 * u);
  // Step / clerestory zone at x 5.0: vertical glazed band 3.0..3.7 m
  s.rectPoche(X(5.0) - 6, Yh(3.7), 12, 0.7 * u);
  s.rect(X(5.0) - 14, Yh(3.75), 28, 0.12 * u, { weight: 1, fill: INK });
  // High roof: x 5.0..8.4 at 3.7..4.0 m
  const highTop = Yh(4.0);
  s.rectNew(X(5.0) - 6, highTop, wallX - X(5.0) + 6, 0.3 * u);
  s.insulation(X(5.0) - 2, highTop + 6, wallX - X(5.0) - 2, 0.14 * u);
  // Timber lining to the underside of both roofs (thin line)
  s.line(fx, Yh(2.7) + 2, X(5.0) - 6, Yh(2.7) + 2, { weight: 1.2 });
  s.line(X(5.0) + 6, Yh(3.7) + 2, wallX, Yh(3.7) + 2, { weight: 1.2 });
  // Abutment flashing at the house wall
  s.line(wallX - 2, Yh(4.0) - 14, wallX - 2, Yh(3.55), { weight: 1.5 });
  s.leader(wallX - 2, Yh(3.9), wallX - 60, Yh(4.7), 'Lead flashing chased into sandstone', {
    size: 12,
    anchor: 'end',
  });
  // Rainwater: outlet at the low garden edge
  s.line(fx - 6, lowRoofTop + 4, fx - 6, Yh(0.05), { weight: 1.6 });
  s.circle(fx - 6, lowRoofTop + 6, 5, { weight: 1 });
  s.note(fx - 22, lowRoofTop - 6, 'Rainwater outlet and downpipe', { size: 12, anchor: 'end' });
  s.note(fx - 22, lowRoofTop + 10, 'set out as part of the elevation', { size: 12, anchor: 'end' });
  // Threshold
  s.line(fx - 30, Yh(0.0), fx - 6, Yh(0.0), { weight: 1.2 });
  s.note(fx - 36, Yh(0.0) - 8, 'Level threshold to garden', { size: 12, anchor: 'end' });

  // Interior labels
  s.label(X(1.2), Yh(1.5), 'Garden room · dining', { size: 16 });
  s.label(X(5.4), Yh(1.5), 'Threshold', { size: 14 });
  s.leader(
    X(6.0),
    Yh(3.85),
    X(5.2),
    Yh(5.3),
    'Roof: membrane · insulation · deck · timber lining',
    { size: 12, anchor: 'end' },
  );
  s.leader(X(2.4), Yh(2.85), X(2.2), Yh(4.3), 'Low roof over dining, falls to garden edge', {
    size: 12,
    anchor: 'end',
  });
  s.leader(
    X(5.0),
    Yh(3.35),
    X(3.4),
    Yh(3.9) - 10,
    'Clerestory glazing carries daylight past the low roof',
    { size: 12, anchor: 'end' },
  );
  s.note(fx - 120, Yh(-0.35), 'Garden', { size: 13, anchor: 'end' });

  s.legend(80, 740, [
    { swatch: 'poche', text: 'Existing fabric (cut)' },
    { swatch: 'new', text: 'New work' },
    { swatch: 'insulation', text: 'Insulation' },
  ]);
  s.scaleBar(600, 760, 3);
  return s.titleStrip();
}
