import type { Insight } from '@/lib/content/types';
import { placeholder } from '../placeholders';

/**
 * Insight: Energy upgrades in traditional buildings.
 * General guidance on improving solid-walled, traditionally constructed housing without
 * trapping moisture or removing ventilation. It touches listed-building consent, conservation
 * areas and building warrants, so it carries a review date and stays gated until verified.
 */
export const energyUpgradesInTraditionalBuildings: Insight = {
  id: 'insight-energy-upgrades-in-traditional-buildings',
  slug: 'energy-upgrades-in-traditional-buildings',
  title: 'Energy upgrades in traditional buildings',
  dek: 'Traditional buildings can often be improved, but moisture, ventilation and existing fabric need to be considered alongside headline thermal performance.',
  category: 'Retrofit',
  body: [
    {
      type: 'paragraph',
      text: 'Much of Glasgow’s housing was built before the middle of the twentieth century: sandstone tenements and villas with solid lime-bonded walls, timber sash-and-case windows, suspended timber ground floors and slated roofs over ventilated lofts. These buildings can often be made more comfortable and easier to heat. The question is rarely whether to improve them, but how and in what order, so that the fabric keeps managing moisture as it was built to.',
    },
    {
      type: 'paragraph',
      text: 'Begin with condition. Persistent leaks, defective pointing or damaged rainwater goods should not be concealed behind an insulation intervention. Straightforward maintenance and draught reduction may also be part of the first stage.',
    },
    {
      type: 'paragraph',
      text: 'Traditional construction behaves differently from many modern sealed assemblies. An intervention therefore needs to respond to the actual wall, roof, floor and window construction rather than applying a standard build-up simply because it reaches a theoretical U-value.',
    },
    {
      type: 'paragraph',
      text: 'Historic Environment Scotland’s guidance on traditional buildings takes the same position. It supports a building-specific approach to traditional fabric, based on survey and on how the construction takes up and releases moisture, and it is clear that adequate ventilation should be retained when air leakage is reduced. That applies whether or not a building is listed.',
    },
    { type: 'heading', level: 2, text: 'Maintenance first' },
    {
      type: 'paragraph',
      text: 'A wet wall is a cold wall, and stone and lime that are kept wet decay sooner. Before insulation is discussed, the building should be shedding water as it was designed to: gutters and downpipes clear and discharging away from the wall, copes and flashings sound, joints pointed in a compatible lime mortar, ground levels below the internal floor. Inside, a failed bath seal, a leaking overflow or a blocked tenement rhone can keep a wall damp for years.',
    },
    {
      type: 'paragraph',
      text: 'These defects matter more once a lining goes over them. Behind insulation a damp patch cannot be seen, the wall dries more slowly, and embedded timber is left colder and wetter than before. Repair first, allow the fabric a drying period, and only then decide what the building needs next.',
    },
    { type: 'heading', level: 2, text: 'Roofs and floors' },
    {
      type: 'paragraph',
      text: 'Where there is a cold loft, insulation laid at ceiling level, between and over the joists, is often the most straightforward measure available. The condition is that the loft stays ventilated. Insulation should stop short of the eaves so that air still moves across the roof space; where the sarking was kept dry by that airflow, blocking it can leave condensation on its underside. Pipes and tanks above the insulation need their own protection, the hatch should be insulated and draught-stripped, and storage should sit on raised boards rather than compress the quilt.',
    },
    {
      type: 'paragraph',
      text: 'A room in the roof is a different problem. Insulation at rafter level, under slates on timber sarking, needs either a ventilated void above it or a build-up designed to manage vapour without one, and which is appropriate depends on the covering and how the ridge and eaves are formed.',
    },
    { type: 'heading', level: 3, text: 'Suspended timber floors' },
    {
      type: 'paragraph',
      text: 'Suspended timber ground floors can usually be insulated between the joists, supported on netting or battens, provided the subfloor void keeps its ventilation. Air bricks should be cleared, not blocked: the joist ends bear into the solid wall and rely on that air movement to stay dry. Check the joists for decay before they are enclosed, and seal gaps between boards and at skirtings as part of the same work.',
    },
    { type: 'heading', level: 2, text: 'Draughtproofing' },
    {
      type: 'paragraph',
      text: 'Draughtproofing is not the same as sealing a building. Its purpose is to reduce uncontrolled air leakage, around sashes, under doors, between floorboards, behind skirtings, at service penetrations and up unused flues, while keeping the ventilation that is intended: trickle ventilators, extract fans in kitchens and bathrooms, and air for any open flue or appliance. An unused chimney is better capped and ventilated than sealed, because a closed flue holds moisture in the chimney breast. Where air leakage is reduced significantly, the ventilation strategy should be reconsidered at the same time; the companion article on ventilation covers this.',
    },
    { type: 'heading', level: 2, text: 'Existing windows' },
    {
      type: 'paragraph',
      text: 'Timber sash-and-case windows are usually repairable. Rotten sections of sill, stile or bottom rail can be spliced, cords and weights replaced, putty renewed and the sashes eased so that they close properly. Draught-stripping, with brush or compression seals let into the parting beads, staff beads and meeting rail, reduces air leakage and rattle while retaining the original window. On many properties this is the first thing to do to the windows and may be all that is needed. Replacement is a separate decision, and in a conservation area or on a listed building it is one the council will take a view on.',
    },
    { type: 'heading', level: 2, text: 'Secondary glazing where appropriate' },
    {
      type: 'paragraph',
      text: 'Secondary glazing, an independent pane fitted on the room side of the existing window, keeps the original window in place, is reversible and can improve comfort and reduce noise. It is often an acceptable approach on listed buildings, but that does not mean consent is never required: depending on the fixing, the frame and how visible the new pane is, listed-building consent may be needed, and the council’s planning service should be asked before an order is placed. We do not predict consent outcomes.',
    },
    {
      type: 'paragraph',
      text: 'The details decide whether it works. Sight lines should follow the sash divisions, the original window must remain accessible for opening and maintenance, some ventilation between the panes is needed to limit condensation on the outer glass, and an escape window in a bedroom must still open readily.',
    },
    { type: 'heading', level: 2, text: 'Wall insulation risk' },
    {
      type: 'paragraph',
      text: 'A solid sandstone wall is typically lime-bonded ashlar or rubble, lined internally with plaster on lath fixed to timber straps, leaving a void between lining and stone. Floor joists, safe lintels, window grounds and those straps are all timber embedded in or fixed to the masonry. The wall stays sound because it can take up rain on the outside and dry in both directions, and because the heated room keeps its inner face warm.',
    },
    {
      type: 'paragraph',
      text: 'Internal wall insulation changes that. The masonry behind the insulation becomes colder and wetter, drying to the inside is reduced, and the risk of interstitial condensation, moisture forming within the wall or at the back of the insulation, increases. The embedded timber is where that risk lands. Elevations exposed to driving rain, walls with defective pointing and rooms with high moisture loads need the most care. Whether an insulated build-up is reasonable, and whether it should be vapour-open or vapour-closed, depends on the property and is a matter for a moisture-risk assessment of the actual wall, not a standard detail.',
    },
    { type: 'heading', level: 3, text: 'External insulation' },
    {
      type: 'paragraph',
      text: 'External wall insulation avoids most of these problems but changes the appearance of the building, and it is rarely acceptable on a sandstone elevation. It is sometimes considered on rendered or rear elevations, subject to consent and to how it is detailed at eaves, openings and ground level.',
    },
    { type: 'heading', level: 2, text: 'Thermal bridges' },
    {
      type: 'paragraph',
      text: 'Insulation has edges, and the edges matter. Where a lining stops at a window reveal, a floor junction, a party wall or a chimney breast, that surface becomes the coldest in the room; warm, moist air condenses on it and mould follows. Partial insulation can concentrate a problem that was previously spread across the whole wall. The junctions that usually need thought are:',
    },
    {
      type: 'list',
      items: [
        'Window and door reveals, sills and lintels, which can often take a thin insulated lining.',
        'Junctions with intermediate floors, where joists pass into the wall and the lining is interrupted.',
        'Party walls, chimney breasts and the returns of external walls.',
        'Ceiling and floor perimeters where loft or floor insulation meets the wall.',
      ],
    },
    {
      type: 'paragraph',
      text: 'Where a bridge cannot be avoided it should at least be understood, and the room ventilated accordingly.',
    },
    { type: 'heading', level: 2, text: 'Moisture' },
    {
      type: 'paragraph',
      text: 'Moisture comes from rain, from the ground, from leaks and from the people inside: cooking, washing, bathing and drying clothes all put water vapour into the air. Traditional fabric copes with this by absorbing and releasing moisture through permeable materials, and through the air movement a leaky building provides. Every upgrade described here reduces one of those routes. An intervention that blocks a path for moisture does not remove the moisture; it moves it to the next coldest surface.',
    },
    {
      type: 'paragraph',
      text: 'That is why ventilation, heating pattern and fabric have to be considered together. Reducing air leakage without reliable extract ventilation, or insulating a room that is heated only occasionally, can leave a building damper than it was. On some projects it is worth monitoring temperature and humidity before and after work, so that decisions rest on how the building actually behaves.',
    },
    {
      type: 'callout',
      title: 'About performance figures',
      text: 'We do not publish predicted U-values, energy or carbon savings, or changes to an EPC rating for measures described in general terms. Figures are only meaningful when calculated for an actual building from survey information, and we provide them to clients on that basis, with their assumptions stated.',
    },
    { type: 'heading', level: 2, text: 'Consents' },
    {
      type: 'paragraph',
      text: 'On a listed building, whether Category A, B or C, works that affect its character are likely to need listed-building consent. That can include internal wall insulation, replacement windows, some forms of secondary glazing, rooflights and external insulation. In a conservation area, permitted development rights are more limited, and external changes such as window replacement, roof coverings and insulation to visible elevations may need planning permission. Flats have fewer permitted development rights than houses in any case.',
    },
    {
      type: 'paragraph',
      text: 'Some upgrade works also need a building warrant. Altering structure, forming or changing ventilation provision, insulating a roof in a way that changes its construction and certain window replacements are examples where the local authority building standards service, as verifier, should be asked; the relevant standards are set out in the building standards technical handbooks. None of this should be assumed either way. The position depends on the property and should be confirmed before work starts.',
    },
    { type: 'heading', level: 2, text: 'Staged upgrades' },
    {
      type: 'paragraph',
      text: 'Most traditional buildings are better improved in stages than in a single package, with the lower-risk measures first and each stage reviewed before the next. A typical order, adjusted to the building, is:',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        'Repair and maintenance, then a period for the fabric to dry.',
        'Draughtproofing, with ventilation reviewed and improved at the same time.',
        'Loft or roof insulation and suspended floor insulation, keeping their ventilation paths.',
        'Window overhaul and draught-stripping, with secondary glazing where appropriate.',
        'Wall insulation last, and only where a moisture-risk assessment supports it.',
      ],
    },
    {
      type: 'paragraph',
      text: 'Staging does not mean working without a plan. A whole-building assessment at the outset sets out what each stage will do and what it must not compromise, so that a measure carried out this year does not make the next one harder. In a tenement the common parts, the roof, the rhones and the stone, need the agreement of the co-owners and usually the factor, which is one more reason to begin with the repairs everyone shares an interest in. Keep a record of what was done, where and with what materials. A traditional building improved carefully, in the right order and with its ventilation intact, can be a good deal more comfortable than it was, and still be the same building underneath.',
    },
  ],
  author: { type: 'studio' },
  publishedAt: '2026-06-15',
  reviewedAt: '2026-09-01',
  hero: placeholder('16x10', 'stone', 'Hero image for Energy upgrades in traditional buildings'),
  officialSources: [
    {
      label: 'Advice and support',
      href: 'https://www.historicenvironment.scot/advice-and-support/',
      publisher: 'Historic Environment Scotland',
      note: 'Guidance on traditional buildings, including energy efficiency, insulation, windows, ventilation and moisture in traditional construction. Check the current edition at review.',
    },
    {
      label: 'Designations portal',
      href: 'https://portal.historicenvironment.scot/',
      publisher: 'Historic Environment Scotland',
      note: 'Search for listed buildings and their categories (A, B or C) to establish whether listed-building consent may apply.',
    },
    {
      label: 'Building standards',
      href: 'https://www.gov.scot/policies/building-standards/',
      publisher: 'Scottish Government',
      note: 'The building standards system in Scotland and the technical handbooks that set out the domestic standards, including energy and ventilation. Check the current edition at review.',
    },
    {
      label: 'Building warrants',
      href: 'https://www.mygov.scot/building-warrants',
      publisher: 'mygov.scot',
      note: 'Explains when a building warrant is needed in Scotland and how to apply to the local authority verifier. Check the current edition at review.',
    },
    {
      label: 'Planning',
      href: 'https://www.glasgow.gov.uk/planning',
      publisher: 'Glasgow City Council',
      note: 'The council’s planning service, including conservation area information and applications for planning permission and listed-building consent. Check the current edition at review.',
    },
  ],
  relatedServiceSlugs: ['housing-retrofit', 'conservation-listed-buildings'],
  relatedProjectSlugs: ['drumchapel-fabric-upgrade', 'north-glasgow-window-ventilation-programme'],
  touchesRegulation: true,
  verificationStatus: 'pending',
  seo: {
    description:
      'Improving traditional Glasgow buildings in order: maintenance, draughtproofing, roofs, floors, windows and the risks of insulating solid sandstone walls.',
  },
};
