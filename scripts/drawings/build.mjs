// Builds the project drawing set into public/drawings.
// Run: node scripts/drawings/build.mjs [--png]  (PNG previews go to the scratch dir given by PREVIEW_DIR)
import fs from 'node:fs';
import path from 'node:path';
import { kelvinsidePlan, kelvinsideSection } from './projects/kelvinside.mjs';
import {
  pollokshieldsExisting,
  pollokshieldsProposed,
  pollokshieldsAxo,
} from './projects/pollokshields.mjs';
import { hyndlandPlan, hyndlandSection } from './projects/hyndland.mjs';
import { finniestonElevation, finniestonSection } from './projects/finnieston.mjs';
import { shawlandsElevation, shawlandsIndent } from './projects/shawlands.mjs';
import { southsidePlan, southsideSection } from './projects/southside.mjs';
import { northGlasgowTypology, northGlasgowDetails } from './projects/north-glasgow.mjs';
import { drumchapelWallSection, drumchapelEavesBase } from './projects/drumchapel.mjs';

const out = path.resolve('public/drawings');
fs.mkdirSync(out, { recursive: true });

export const sheets = {
  'kelvinside-garden-room-01-existing-proposed-plan.svg': kelvinsidePlan,
  'kelvinside-garden-room-02-section.svg': kelvinsideSection,
  'pollokshields-tenement-reordering-01-existing-plan.svg': pollokshieldsExisting,
  'pollokshields-tenement-reordering-02-proposed-plan.svg': pollokshieldsProposed,
  'pollokshields-tenement-reordering-03-axonometric.svg': pollokshieldsAxo,
  'hyndland-roof-rooms-01-plan.svg': hyndlandPlan,
  'hyndland-roof-rooms-02-section.svg': hyndlandSection,
  'finnieston-shopfront-01-elevation.svg': finniestonElevation,
  'finnieston-shopfront-02-section.svg': finniestonSection,
  'shawlands-sandstone-repair-01-annotated-elevation.svg': shawlandsElevation,
  'shawlands-sandstone-repair-02-indent-detail.svg': shawlandsIndent,
  'southside-corner-rooms-01-plan.svg': southsidePlan,
  'southside-corner-rooms-02-section.svg': southsideSection,
  'north-glasgow-window-programme-01-window-typology.svg': northGlasgowTypology,
  'north-glasgow-window-programme-02-head-jamb-sill.svg': northGlasgowDetails,
  'drumchapel-fabric-upgrade-01-wall-window-section.svg': drumchapelWallSection,
  'drumchapel-fabric-upgrade-02-eaves-base-detail.svg': drumchapelEavesBase,
};

const only = process.argv.find((a) => a.startsWith('--only='))?.slice(7);
const png = process.argv.includes('--png');
let sharp = null;
if (png) sharp = (await import('sharp')).default;

for (const [file, build] of Object.entries(sheets)) {
  if (only && !file.startsWith(only)) continue;
  const svg = build().render();
  fs.writeFileSync(path.join(out, file), svg);
  if (png && sharp) {
    const dir = process.env.PREVIEW_DIR ?? out;
    await sharp(Buffer.from(svg))
      .resize({ width: 1600 })
      .png()
      .toFile(path.join(dir, file.replace('.svg', '.png')));
  }
  console.log('wrote', file);
}
