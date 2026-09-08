import type { Insight } from '@/lib/content/types';
import { placeholder } from '../placeholders';

/**
 * Insight: Repairing traditional Glasgow sandstone.
 * General guidance on condition-led masonry repair. It touches listed-building consent and
 * building standards, so it carries a review date and stays gated until verified.
 */
export const repairingTraditionalGlasgowSandstone: Insight = {
  id: 'insight-repairing-traditional-glasgow-sandstone',
  slug: 'repairing-traditional-glasgow-sandstone',
  title: 'Repairing traditional Glasgow sandstone',
  dek: 'Good masonry repair starts with water, condition and compatibility, not with making every stone look new.',
  category: 'Masonry repair',
  body: [
    {
      type: 'paragraph',
      text: 'A weathered sandstone façade is not automatically a defective one. Survey work should distinguish natural weathering from open joints, unstable material, failed previous repairs and defects that are allowing water to remain in the wall.',
    },
    {
      type: 'paragraph',
      text: 'A repair strategy should deal with causes as well as symptoms. Rainwater goods, copes, flashings and open joints may matter more than surface appearance. Where mortar or stone repair is required, compatibility with the existing masonry is important; wholesale hard cementitious replacement can be inappropriate for traditional construction.',
    },
    {
      type: 'paragraph',
      text: 'That is also the position taken in national guidance. Historic Environment Scotland’s advice on traditional buildings emphasises repair, compatible materials and traditional methods rather than unnecessary replacement, and it applies whether or not the building is listed.',
    },
    { type: 'heading', level: 2, text: 'Defect mapping' },
    {
      type: 'paragraph',
      text: 'The first job on any elevation is to record what is actually there. Close inspection from a scaffold or platform is different from looking up from the pavement: a joint that appears closed from the street may be open at the back, and a stone that reads as sound can sound hollow when tapped. We record each defect on an annotated elevation, keyed by type, so that the repair schedule can refer to it.',
    },
    {
      type: 'paragraph',
      text: 'The categories matter: each points to a different cause and response. An annotated elevation usually records:',
    },
    {
      type: 'list',
      items: [
        'Open, cracked or hollow joints, and the mortar type where it can be seen.',
        'Surface loss by kind: contour scaling, delamination along the bed, granular loss, blistering.',
        'Previous repairs, their material, and whether they are sound or failing.',
        'Cracks, displaced stones, and rusting iron cramps or fixings that are lifting the stone.',
        'Water routes: staining, damp patches, vegetation, and the rainwater goods, copes and flashings above them.',
      ],
    },
    {
      type: 'paragraph',
      text: 'Glasgow’s sandstone is not one material. Broadly, the blond stone of the earlier tenements and villas was quarried close to the city, and the red stone that followed came from Dumfriesshire and Ayrshire. In general terms, blond sandstone is often more variable and can be prone to scaling and delamination, particularly where a block has been face-bedded, with its bedding planes set parallel to the wall face rather than lying flat. Red sandstone is often more uniform but can lose its surface as loose grains where it is kept wet. None of this is a rule; the quarry, the bed and where the water comes from matter more than the colour, so look at each stone rather than assuming a façade-wide diagnosis.',
    },
    {
      type: 'callout',
      title: 'While the scaffold is up',
      text: 'Scaffolding is disruptive and is usually the only time an elevation can be seen at arm’s length. Use it to inspect and record the whole elevation, not only the areas already in the schedule, and to tap-test the stones that could not be reached from the ground. What is recorded saves the next survey.',
    },
    { type: 'heading', level: 2, text: 'Lime mortar' },
    {
      type: 'paragraph',
      text: 'Traditional sandstone walls were built with lime mortar and still rely on it. Lime is softer and more porous than the stone around it, so it takes up movement and lets moisture in the wall dry out through the joint. A hard cement mortar reverses that: it is stronger than the stone, it holds water in the wall, and it forces drying, and with it decay, through the face of the stone rather than the joint. Cement pointing often looks tidy long after it has started doing damage.',
    },
    {
      type: 'paragraph',
      text: 'Repointing is only as good as its preparation. Old mortar is raked out by hand to a depth that gives the new mortar something to hold, without widening the joint or chipping the arrises, which angle grinders on narrow joints tend to do. The joint is dampened, the mortar packed in firmly and finished flush or slightly back from the face so that it sheds water. Lime needs protection from sun, wind and frost while it cures, so the season and the sheeting on the scaffold matter as much as the mix.',
    },
    {
      type: 'paragraph',
      text: 'The mix is chosen for the stone and the exposure, not from a catalogue. Aggregate colour and grading and the type of lime affect how the joint performs and how it looks. That is why we ask for sample panels before any mix is agreed, and prefer to see them weather for a few weeks before choosing: a lime mortar that looks right the day it is struck can dry lighter or warmer than expected.',
    },
    { type: 'heading', level: 2, text: 'Stone indent and replacement thresholds' },
    {
      type: 'paragraph',
      text: 'Replacing a stone is the last resort, not the first. A stone with some surface loss is usually still doing its job, and a stabilised weathered face is part of the character of a Glasgow street. The threshold is the point at which retention is no longer reasonable: when a stone has lost so much section that it can no longer carry its load or shed water, when it is loose or cracked through, or when a failing previous repair cannot be removed without taking the stone with it. Those judgements are made stone by stone, on the scaffold.',
    },
    {
      type: 'paragraph',
      text: 'Where replacement is justified, an indent, a new piece of stone let into the cut-back face of the old, is often preferable to replacing the whole block, because more original fabric stays in the wall. The new stone should match the old by bed, colour and texture, in that order. Bed first, because a piece set with its bedding lying flat will weather with the wall rather than against it. Colour and texture next, accepting that new stone will look different at first and tone down over years. The original quarry is rarely available, so a compatible source is a judgement about porosity, grain and durability as much as appearance.',
    },
    {
      type: 'paragraph',
      text: 'Plastic repair, a mortar built up to reshape a damaged stone, has a narrow place: small areas of loss, mouldings that need their profile back, and places where cutting an indent would do more harm than good. It should be a lime-based mortar compatible with the stone, keyed to sound material, and not a way of avoiding the decision to replace. Cement-rich plastic repairs and resin fillers are hard and impermeable, and are often the next thing to fail.',
    },
    { type: 'heading', level: 3, text: 'Listed buildings and conservation areas' },
    {
      type: 'paragraph',
      text: 'Like-for-like repair to a listed building may not need listed-building consent, but the line between repair and alteration is not always obvious, and replacing stone, changing the mortar finish or cleaning a façade can cross it. In a conservation area the council will take a view on external appearance. Ask the council’s planning service before work starts. Repair alone does not usually need a building warrant, but work that involves structure, such as rebuilding part of a wall or a chimney head, may, and the local authority building standards service can confirm. We do not predict consent outcomes.',
    },
    { type: 'heading', level: 2, text: 'Cleaning caution' },
    {
      type: 'paragraph',
      text: 'Cleaning is not repair, and it can undo it. As sandstone weathers it forms a slightly harder, more compact skin at its face, and soot is held in and on that skin. Aggressive methods, including grit blasting, high-pressure water and strong acids or alkalis, take the skin off and leave a fresh, open surface that absorbs water more readily and weathers faster.',
    },
    {
      type: 'paragraph',
      text: 'Chemical cleaning can leave salts in the stone that crystallise later and push the surface off; blasting rounds off arrises and tooling; both can drive water into joints. Where cleaning is genuinely needed, for example to remove a damaging deposit, the gentlest method that works is the right one, tested on a small area first. Cleaning a listed building may need listed-building consent in its own right. Often the better answer is to leave the dirt and mend the water.',
    },
    { type: 'heading', level: 2, text: 'Sample panels' },
    {
      type: 'paragraph',
      text: 'We ask for a sample of every repair type before it is approved for the elevation: a panel of raked-out and repointed joints, a sample indent, a plastic repair on a moulding and, if cleaning is proposed, a cleaned patch in an inconspicuous place. Each is set out on the scaffold where it can be seen in the same light as the work it stands for, photographed, and left to weather before anyone decides.',
    },
    {
      type: 'paragraph',
      text: 'Sample panels are not a formality. They are where the mix, the finish, the stone choice and the standard of workmanship are agreed, and they become the reference the rest of the job is checked against.',
    },
    { type: 'heading', level: 2, text: 'Maintenance' },
    {
      type: 'paragraph',
      text: 'Most of the sandstone decay we see comes from water that was allowed to sit: a blocked gutter, a cracked cope, a lifted flashing, a downpipe discharging against the wall, a buddleia rooted in a joint. The repair package should fix these first. Keeping them fixed makes the repair last, and needs no scaffold. A simple cycle is enough:',
    },
    {
      type: 'list',
      items: [
        'Twice a year, and after heavy weather: clear gutters, hoppers and downpipes, and look for overflow staining below.',
        'Once a year: walk the elevations with binoculars; look at copes, skews, chimney heads, flashings and the joints beneath them for new cracks, loose pieces or vegetation.',
        'As it appears: remove vegetation from joints, copes and gutters by hand before roots take hold.',
        'Whenever access is available for other work: a closer look at the areas the survey flagged as vulnerable.',
      ],
    },
    {
      type: 'paragraph',
      text: 'In a tenement these are common repairs, and the factor and the other owners are part of the picture. The annotated elevation and repair schedule are worth keeping with the deeds: they tell the next owner what was done and where to look first.',
    },
    {
      type: 'paragraph',
      text: 'A good repair does not make a sandstone façade look new. It leaves sound original stone in place, deals with the water, replaces only what has failed with something compatible, and sets the building up for years of ordinary maintenance.',
    },
  ],
  author: { type: 'studio' },
  publishedAt: '2026-06-15',
  reviewedAt: '2026-09-01',
  hero: placeholder('16x10', 'stone', 'Hero image for Repairing traditional Glasgow sandstone'),
  officialSources: [
    {
      label: 'Advice and support',
      href: 'https://www.historicenvironment.scot/advice-and-support/',
      publisher: 'Historic Environment Scotland',
      note: 'Guidance on the care, repair and maintenance of traditional buildings, including publications on masonry, lime mortars and stone cleaning. Check the current edition at review.',
    },
    {
      label: 'Designations portal',
      href: 'https://portal.historicenvironment.scot/',
      publisher: 'Historic Environment Scotland',
      note: 'Search for listed buildings and their categories (A, B or C) and other national designations.',
    },
    {
      label: 'Planning',
      href: 'https://www.glasgow.gov.uk/planning',
      publisher: 'Glasgow City Council',
      note: 'The council’s planning service, including conservation area information and how to apply for listed-building consent. Check the current edition at review.',
    },
    {
      label: 'Building warrants',
      href: 'https://www.mygov.scot/building-warrants',
      publisher: 'mygov.scot',
      note: 'Explains when a building warrant is needed in Scotland and how to apply to the local authority verifier. Check the current edition at review.',
    },
  ],
  relatedServiceSlugs: ['conservation-listed-buildings'],
  relatedProjectSlugs: ['shawlands-sandstone-repair', 'finnieston-shopfront-upper-floors'],
  touchesRegulation: true,
  verificationStatus: 'pending',
  seo: {
    description:
      'Condition-led sandstone repair in Glasgow: defect mapping, lime mortar, when to indent or replace stone, cleaning caution, sample panels and maintenance.',
  },
};
