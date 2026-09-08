import { Scene, SANDSTONE, INK, PAPER, STONE, MOSS } from '../toolkit.mjs';

/** A run of three-storey red-sandstone tenements with bay windows, seen square-on under an overcast sky. */
export function glasgowTenementStreet() {
  const s = new Scene({
    width: 1600,
    height: 1000,
    title: 'Glasgow tenement street',
    description:
      'A terrace of three-storey red-sandstone tenements with bay windows, close doors, chimneys and an overcast sky.',
  });
  const ground = 880;
  s.overcast(ground - 240);
  // Terrace: five closes, each 11 m wide at 26 px/m
  const u = 30,
    closeW = 11 * u;
  const x0 = -120;
  const eaves = ground - 12.4 * u; // terrace runs off both edges so it reads as a street, not a model const eaves = ground - 12.4 * u; // 3 storeys + ground
  // Roof band behind the parapet
  s.roof(x0 - 20, eaves - 40, closeW * 6 + 40, 60);
  for (let c = 0; c < 6; c++) {
    const x = x0 + c * closeW;
    s.facade(x, eaves, closeW, ground - eaves, { tone: c % 2 ? 0.03 : 0 });
    // eaves cornice and string courses
    s.cornice(x, eaves, closeW, 16);
    s.cornice(x, eaves + 4.2 * u, closeW, 8);
    // bay window on the left half of each close through the three upper... tenement bays run ground to eaves
    const bay = s.bay(x + 0.8 * u, eaves + 0.9 * u, 3.6 * u, ground - (eaves + 0.9 * u) - 0.1 * u);
    for (let f = 0; f < 3; f++) {
      const wy = eaves + (1.1 + f * 3.75) * u;
      s.window(bay.inner[0] + 0.3 * u, wy, bay.inner[1] - bay.inner[0] - 0.6 * u, 2.2 * u, {
        reveal: 5,
      });
      s.window(x + 6.2 * u, wy, 1.5 * u, 2.2 * u);
      s.window(x + 8.6 * u, wy, 1.5 * u, 2.2 * u);
    }
    // close door with fanlight
    s.door(x + 6.4 * u, ground - 2.9 * u, 1.3 * u, 2.9 * u);
    // ground-floor window right of the close
    s.window(x + 8.6 * u, ground - 3.0 * u, 1.5 * u, 2.2 * u);
    // chimneys at the party lines
    s.chimney(x + closeW - 0.6 * u, eaves - 1.4 * u, 1.2 * u, 1.4 * u, 3);
    // subtle party-wall line
    s.line(x + closeW, eaves, x + closeW, ground, { opacity: 0.12 });
  }
  s.chimney(x0 - 0.6 * u, eaves - 1.4 * u, 1.2 * u, 1.4 * u, 3);
  // base course and pavement
  s.rect(x0, ground - 0.5 * u, closeW * 6, 0.5 * u, INK, { opacity: 0.18 });
  s.pavement(ground, { depth: 56 });
  // road
  s.rect(0, ground + 64, s.w, s.h - ground - 64, INK, { opacity: 0.45 });
  // a parked-car-free street: just a faint lane line
  s.rect(0, ground + 100, s.w, 2, PAPER, { opacity: 0.2 });
  // soften with a light haze at distance
  s.light(0, 0, s.w, eaves, 0.12);
  return s;
}
