import { Sheet, ACCENT } from '../toolkit.mjs';

const PROJECT = 'Hyndland Roof Rooms';

export function hyndlandPlan() {
  const s = new Sheet({
    width: 1600,
    height: 1131,
    number: 'Drawing 01',
    title: 'Proposed roof-level plan',
    projectTitle: PROJECT,
    unitPx: 68,
    description:
      'Proposed roof-level plan above a top-floor tenement flat: new stair arriving between the chimney masses, a bedroom and bathroom within the ridge zone, eaves stores, the 1.5 m headroom line and rooflights on the rear pitch only.',
  });
  const u = 68,
    ox = 250,
    oy = 150;
  const M = (v) => v * u,
    X = (x) => ox + M(x),
    Y = (y) => oy + M(y);
  // Attic envelope: x 0..9.6 (mutual walls 0.5), y 0..11 (rear wallhead at y 0..0.4, front wallhead y 10.6..11)
  s.rectPoche(X(0), Y(0), M(0.5), M(11));
  s.rectPoche(X(9.1), Y(0), M(0.5), M(11));
  s.rectPoche(X(0), Y(0), M(9.6), M(0.4));
  s.rectPoche(X(0), Y(10.6), M(9.6), M(0.4));
  // Chimney masses on the mutual walls
  for (const [x, y] of [
    [0.5, 2.4],
    [0.5, 7.4],
    [8.1, 4.9],
  ])
    s.rectPoche(X(x), Y(y), M(1.0), M(1.2));
  for (const [x, y] of [
    [0.5, 2.4],
    [0.5, 7.4],
    [8.1, 4.9],
  ])
    s.note(X(x + 0.06), Y(y + 0.7), 'Chimney', { size: 10 });
  // Ridge line and headroom lines
  s.line(X(0.5), Y(5.5), X(9.1), Y(5.5), { weight: 0.8, dashed: true, opacity: 0.6 });
  s.note(X(9.2), Y(5.55), 'Ridge', { size: 11 });
  s.dotted(X(0.5), Y(2.9), X(9.1), Y(2.9));
  s.dotted(X(0.5), Y(8.1), X(9.1), Y(8.1));
  s.note(X(8.9), Y(2.8), '1.5 m headroom line', { size: 11, anchor: 'end' });
  s.note(X(4.8), Y(8.35), '1.5 m headroom line', { size: 11, anchor: 'middle' });
  // New stair from the flat below arriving in the centre: x 4.4..5.6, y 3.2..6.2
  s.rectNew(X(4.25), Y(3.05), M(0.15), M(3.3));
  s.rectNew(X(5.6), Y(3.05), M(0.15), M(3.3));
  s.rectNew(X(4.25), Y(6.35), M(1.5), M(0.15));
  s.stair(X(4.45), Y(3.2), M(1.1), M(3.0), 'v', { treads: 13, arrow: 'down' });
  s.note(X(5.0), Y(3.05), 'DN', { size: 10, anchor: 'middle' });
  s.note(X(4.95), Y(6.75), 'New stair from flat below', { size: 11, anchor: 'middle' });
  // Rooms: bedroom left x 0.5..4.25, y 3.2..7.9 ; bathroom right x 5.75..7.9, y 3.6..7.4 ; store x 8.1..9.1 beyond the chimney
  s.rectNew(X(1.6), Y(3.05), M(2.65), M(0.15));
  s.rectNew(X(0.5), Y(7.9), M(3.75), M(0.15)); // bedroom partitions to eaves stores
  s.rectNew(X(5.75), Y(3.45), M(2.35), M(0.15));
  s.rectNew(X(5.75), Y(7.4), M(2.35), M(0.15));
  s.rectNew(X(7.95), Y(3.45), M(0.15), M(4.1));
  s.opening(X(4.25), Y(5.0), M(0.15), M(0.8));
  s.door(X(4.25), Y(5.0), M(0.8), 'l', 1);
  s.line(X(4.25), Y(5.0), X(4.25), Y(5.8), { weight: 1, color: ACCENT });
  s.opening(X(5.75), Y(5.0), M(0.15), M(0.8));
  s.door(X(5.9), Y(5.0), M(0.8), 'd', 1);
  s.line(X(5.9), Y(5.0), X(5.9), Y(5.8), { weight: 1, color: ACCENT });
  s.bed(X(1.9), Y(4.2), M(1.6), M(2.0));
  s.bath(X(6.0), Y(3.7), M(1.7), M(0.75));
  s.wc(X(6.4), Y(6.9), 'u');
  s.basin(X(7.5), Y(6.6));
  s.shower(X(6.0), Y(4.6), M(0.9));
  // Eaves stores (low headroom) with small doors
  s.opening(X(2.3), Y(3.05), M(0.15), M(0)); // no-op to keep API symmetric
  s.note(X(2.0), Y(0.85), 'Eaves store', { size: 11 });
  s.note(X(2.0), Y(9.4), 'Eaves store', { size: 11 });
  s.note(X(6.1), Y(0.85), 'Eaves store', { size: 11 });
  s.note(X(6.1), Y(9.4), 'Eaves store', { size: 11 });
  s.label(X(8.15), Y(4.5), 'Store', { size: 11 });
  s.opening(X(2.4), Y(3.05), M(0.7), M(0.15));
  s.line(X(2.4), Y(3.12), X(3.1), Y(3.12), { weight: 1.4, color: ACCENT });
  s.opening(X(2.4), Y(7.9), M(0.7), M(0.15));
  s.line(X(2.4), Y(7.97), X(3.1), Y(7.97), { weight: 1.4, color: ACCENT });
  // Rooflights on the rear pitch (top) as dashed rectangles; none on the street pitch
  for (const [x, w] of [
    [1.2, 1.0],
    [2.8, 1.0],
    [6.2, 0.9],
  ]) {
    s.rect(X(x), Y(1.3), M(w), M(1.1), { dashed: true, weight: 1.2, color: ACCENT });
    s.note(X(x + w / 2), Y(1.95), 'Rooflight', { size: 10, anchor: 'middle', color: ACCENT });
  }
  s.note(X(4.8), Y(2.7), 'Rear pitch: rooflights on the less visible slope', {
    size: 11,
    anchor: 'middle',
  });
  s.note(X(4.8), Y(10.3), 'Street pitch: no new openings', { size: 11, anchor: 'middle' });
  s.label(X(0.8), Y(7.3), 'Bedroom');
  s.label(X(6.0), Y(6.15), 'Bathroom', { size: 13 });
  s.note(X(4.8), Y(-0.3), 'Back court', { size: 12, anchor: 'middle' });
  s.note(X(4.8), Y(11.45), 'Street', { size: 12, anchor: 'middle' });
  s.note(X(-0.15), Y(5.0), 'Mutual wall', { size: 11, anchor: 'end' });
  s.legend(80, 960, [
    { swatch: 'poche', text: 'Existing fabric (poché)' },
    { swatch: 'new', text: 'New work (hatch)' },
    { swatch: 'dotted', text: 'Headroom line' },
    { swatch: 'dashed', text: 'Rooflight over / ridge' },
  ]);
  s.scaleBar(700, 975, 5);
  s.north(1500, 150);
  return s.titleStrip();
}

export function hyndlandSection() {
  const s = new Sheet({
    width: 1600,
    height: 1000,
    number: 'Drawing 02',
    title: 'Section through ridge',
    projectTitle: PROJECT,
    unitPx: 75,
    description:
      'Section across the roof: existing rafters and chimney in poché, the new attic floor and stair, rooflights on the rear pitch, insulation between and below the rafters with a ventilated void, and the top-floor flat below.',
  });
  const u = 75,
    ox = 240;
  const F = 600; // attic floor level y
  const X = (m) => ox + m * u,
    Y = (h) => F - h * u;
  const span = 11.0,
    ridge = 3.9;
  // Flat below: floor at -2.9 m, walls, ceiling/attic floor structure
  // The flat below is shown to 1.7 m and cut with a break line.
  s.rectPoche(X(0), Y(-1.7), 0.5 * u, 1.7 * u + 0.3 * u);
  s.rectPoche(X(span - 0.5), Y(-1.7), 0.5 * u, 1.7 * u + 0.3 * u);
  s.label(X(1.0), Y(-1.0), 'Top-floor flat below', { size: 14 });
  s.rectPoche(X(4.4), Y(-1.7), 0.15 * u, 1.7 * u);
  s.rectPoche(X(5.6), Y(-1.7), 0.15 * u, 1.7 * u); // hall walls below
  s.note(X(4.7), Y(-0.9), 'Hall', { size: 12 });
  s.path(`M${X(-0.3)} ${Y(-1.7)}l14 -8l14 16l14 -8`, { weight: 1 });
  s.line(X(0.4), Y(-1.7), X(span - 0.4), Y(-1.7), { weight: 0.6, dashed: true, opacity: 0.5 });
  // Existing attic floor / ceiling joists: thin band (existing) with new floor structure hatched above
  s.rectPoche(X(0.5), Y(0.0), (span - 1.0) * u, 0.22 * u);
  s.rectNew(X(0.5), Y(0.22), (span - 1.0) * u, 0.2 * u);
  s.note(X(7.2), Y(0.6), 'New floor joists over existing ceiling structure', { size: 12 });
  // Wallheads
  s.rectPoche(X(0), Y(0.6), 0.5 * u, 0.6 * u + 0.3 * u);
  s.rectPoche(X(span - 0.5), Y(0.6), 0.5 * u, 0.9 * u);
  // Roof pitches: from wallhead (0.5, 0.6) up to ridge (5.5, 3.9)
  const L0 = [X(0.25), Y(0.6)],
    R0 = [X(span - 0.25), Y(0.6)],
    RG = [X(span / 2), Y(ridge)];
  // rafters (existing) as poché band 0.15 thick perpendicular-ish (draw as thick line)
  s.line(L0[0], L0[1], RG[0], RG[1], { weight: 9 });
  s.line(R0[0], R0[1], RG[0], RG[1], { weight: 9 });
  // slate line above
  s.line(L0[0] - 6, L0[1] - 8, RG[0], RG[1] - 9, { weight: 1.2 });
  s.line(R0[0] + 6, R0[1] - 8, RG[0], RG[1] - 9, { weight: 1.2 });
  // Insulation between/below rafters: a parallel band offset 14px inward, drawn as zigzag along the slope
  const zig = (a, b, off) => {
    const dx = b[0] - a[0],
      dy = b[1] - a[1];
    const len = Math.hypot(dx, dy);
    const nx = -dy / len,
      ny = dx / len;
    let d = '';
    const steps = Math.floor(len / 10);
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const px = a[0] + dx * t + nx * (off + (i % 2 ? 14 : 0));
      const py = a[1] + dy * t + ny * (off + (i % 2 ? 14 : 0));
      d += `${i ? 'L' : 'M'}${px.toFixed(1)} ${py.toFixed(1)}`;
    }
    return d;
  };
  s.path(zig(L0, RG, 8), { weight: 0.8, opacity: 0.6 });
  s.path(zig(RG, R0, -8), { weight: 0.8, opacity: 0.6 });
  // lining (plasterboard) line further inward
  s.line(L0[0] + 10, L0[1] + 26, RG[0], RG[1] + 32, { weight: 1.2 });
  s.line(R0[0] - 10, R0[1] + 26, RG[0], RG[1] + 32, { weight: 1.2 });
  // Chimney mass on the left mutual wall through the roof
  s.rectPoche(X(0), Y(4.6), 0.5 * u, 4.0 * u);
  s.rectPoche(X(0.5), Y(1.0), 1.0 * u, 1.0 * u);
  s.note(X(0.55), Y(1.72), 'Chimney', { size: 10 });
  // Rooflights on the rear pitch (left): two, drawn as thickened frames on the slope
  for (const t of [0.3, 0.55]) {
    const ax = L0[0] + (RG[0] - L0[0]) * t,
      ay = L0[1] + (RG[1] - L0[1]) * t;
    const bx = L0[0] + (RG[0] - L0[0]) * (t + 0.16),
      by = L0[1] + (RG[1] - L0[1]) * (t + 0.16);
    s.line(ax, ay - 14, bx, by - 14, { weight: 5, color: ACCENT });
    s.rectNew(ax - 4, ay - 26, 8, 12);
    s.rectNew(bx - 4, by - 26, 8, 12);
  }
  s.leader(
    L0[0] + (RG[0] - L0[0]) * 0.45,
    L0[1] + (RG[1] - L0[1]) * 0.45 - 16,
    X(1.3),
    Y(4.4),
    'Rooflights on the rear pitch, sized to the room',
    { size: 12 },
  );
  // Stair and rooms
  s.rectNew(X(4.4), Y(0.42), 0.15 * u, 2.2 * u);
  s.rectNew(X(5.6), Y(0.42), 0.15 * u, 2.2 * u);
  // Stair drawn as steps rising from the flat below to the attic floor (sectional)
  let sx = X(4.55),
    sy = Y(-1.7);
  const treads = 8,
    rise = ((1.7 + 0.42) * u) / treads,
    going = (1.85 * u) / treads;
  let d = `M${sx} ${sy}`;
  for (let i = 0; i < treads; i++) {
    sy -= rise;
    d += `L${sx} ${sy}`;
    sx += going;
    d += `L${sx} ${sy}`;
  }
  s.path(d, { weight: 1.4 });
  s.label(X(5.85), Y(-1.3), 'Stair', { size: 12 });
  s.label(X(2.0), Y(0.85), 'Bedroom', { size: 15 });
  s.label(X(6.4), Y(1.6), 'Bathroom', { size: 14 });
  s.dotted(X(1.7), Y(1.5), X(4.2), Y(1.5));
  s.note(X(1.7), Y(1.35), '1.5 m headroom', { size: 10 });
  // Ventilation and build-up leaders
  s.leader(
    X(8.4),
    Y(2.0) + 0,
    X(8.9),
    Y(4.3),
    'Existing rafters retained and strengthened where required',
    { size: 12 },
  );
  s.leader(
    R0[0] - (R0[0] - RG[0]) * 0.28,
    R0[1] - (R0[1] - RG[1]) * 0.28 + 16,
    X(9.0),
    Y(3.7),
    'Insulation between and below rafters',
    { size: 12 },
  );
  s.leader(
    R0[0] - (R0[0] - RG[0]) * 0.28,
    R0[1] - (R0[1] - RG[1]) * 0.28 - 12,
    X(9.0),
    Y(3.1),
    'Ventilated void under the sarking · eaves and ridge vents',
    { size: 12 },
  );
  s.leader(RG[0], RG[1] - 2, RG[0] + 40, Y(4.6), 'Ridge retained; slates re-laid where disturbed', {
    size: 12,
  });
  s.leader(
    X(5.0),
    Y(3.0),
    X(5.4),
    Y(4.1) - 200 + 200,
    'Plasterboard lining and painted timber joinery',
    { size: 12 },
  );
  s.note(X(-0.2), Y(-0.4), 'Back court side', { size: 12, anchor: 'end' });
  s.note(X(span + 0.2), Y(-0.4), 'Street side', { size: 12 });
  s.legend(80, 800, [
    { swatch: 'poche', text: 'Existing fabric (cut)' },
    { swatch: 'new', text: 'New work' },
    { swatch: 'insulation', text: 'Insulation' },
  ]);
  s.scaleBar(1120, 830, 3);
  return s.titleStrip();
}
