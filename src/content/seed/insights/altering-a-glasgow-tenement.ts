import type { Insight } from '@/lib/content/types';
import { illustration } from '../media';

/**
 * Insight: Altering a Glasgow tenement — where to begin.
 * General guidance touching Scottish consents and building standards; carries a review date
 * and stays gated until verified.
 */
export const alteringAGlasgowTenement: Insight = {
  id: 'insight-altering-a-glasgow-tenement-where-to-begin',
  slug: 'altering-a-glasgow-tenement-where-to-begin',
  title: 'Altering a Glasgow tenement: where to begin',
  dek: 'A practical starting point for changing a traditional tenement flat, from shared fabric and structure to consent, services and buildability.',
  category: 'Tenements',
  body: [
    {
      type: 'paragraph',
      text: 'A tenement alteration rarely starts with a blank plan. Floors, structural walls, chimney breasts, common services, windows and shared parts already establish a strong framework. Before deciding which wall should move, establish what is private, what is common and how the proposed work interacts with the wider building.',
    },
    {
      type: 'paragraph',
      text: 'A measured survey should record more than room dimensions. Floor and ceiling levels, wall thicknesses, windows, doors, service routes and visible structural clues can affect what is practical. Where a proposal includes a new opening, structural advice may be needed early enough for the architectural design to respond to it rather than treating structure as a late correction.',
    },
    { type: 'heading', level: 2, text: 'Common and shared elements' },
    {
      type: 'paragraph',
      text: 'A tenement flat is one part of a single structure. The close and stair, the roof, the foundations and the external walls are shared in some form with every other owner. The wall between two flats is a mutual wall, and the floor you stand on is the ceiling of the flat below.',
    },
    {
      type: 'paragraph',
      text: 'So the hall ceiling, the wall behind the kitchen units or the sash in the bay may be common property, or may affect it when altered. Changing them can need the agreement of other owners, not only the consent of the council.',
    },
    { type: 'heading', level: 3, text: 'Title deeds and the factor' },
    {
      type: 'paragraph',
      text: 'The title deeds usually describe what belongs to each flat, what is common and whether alterations need the consent of other owners or the factor. Where the deeds are silent, the default rules in the Tenements (Scotland) Act 2004 apply; a solicitor can advise on what they mean for a particular proposal. Tell the factor early, and ask the neighbours directly above and below: they often know about common repairs and earlier alterations that the deeds do not.',
    },
    { type: 'heading', level: 2, text: 'Conservation-area or listed status' },
    {
      type: 'paragraph',
      text: 'Many Glasgow tenements sit within conservation areas, and a number are listed. Both change what needs consent, so check before design work begins: the Historic Environment Scotland designations portal shows listed buildings and their categories (A, B or C), and the council’s planning service shows conservation area boundaries.',
    },
    {
      type: 'paragraph',
      text: 'Listing covers the whole building, inside and out. In a listed tenement, works inside an individual flat that affect its character — removing a cornice, a chimney piece, an original door or a wall that forms part of the plan — may need listed-building consent even where they need no planning permission. In a conservation area the controls bear mainly on the exterior: windows, roofs, dormers and the rear elevation. Neither designation prevents alteration; both mean the case for a change has to be made.',
    },
    { type: 'heading', level: 2, text: 'Moving kitchens and wet services' },
    {
      type: 'paragraph',
      text: 'Kitchens and bathrooms in traditional tenements are usually at the back of the flat, close to the soil stack. Moving a kitchen to a front room, or adding a shower room mid-plan, means new drainage that must fall towards a stack. In a timber floor those runs compete with the joists, which can be notched or drilled only within limits, so a waste pipe crossing them may have to run above the floor, raising thresholds, or below it, within the neighbour’s ceiling void.',
    },
    {
      type: 'paragraph',
      text: 'Extract ventilation needs a route to outside. Through an external wall it becomes a visible grille on an elevation, which may need planning permission and, in a listed building, listed-building consent. Through a window it may take up part of an original sash.',
    },
    {
      type: 'paragraph',
      text: 'Then there is noise. A timber floor between flats carries impact and airborne sound readily, and a kitchen above a neighbour’s bedroom is a common source of complaint. Floor build-ups can help but add height and weight. It is often better to keep wet rooms stacked above one another where the plan allows.',
    },
    { type: 'heading', level: 2, text: 'Structural openings' },
    {
      type: 'paragraph',
      text: 'The most common request is a larger opening between two rooms. Whether that is straightforward depends on the wall. Tenement walls that look alike can be doing quite different things: some are timber stud partitions; others carry floor joists, support the wall in the flat above or brace the building. The wall between the kitchen and the adjoining room is frequently a load-bearing spine wall running the full height of the close.',
    },
    {
      type: 'paragraph',
      text: 'Removing part of a load-bearing wall means introducing a beam with adequate bearing at each end and checking that the load can be carried down through the flats below. Chimney breasts raise a similar question: the stack continues to the roof, and removing a breast in one flat leaves what is above it needing support. Neighbouring flats are involved even where no one sets foot in them.',
    },
    {
      type: 'paragraph',
      text: 'A structural engineer will need to design the beam and its supports, and the building warrant application will need their calculations or a certificate. This is why the survey should record wall thicknesses and joist directions, and why the engineer is best involved before the plan is settled.',
    },
    {
      type: 'callout',
      title: 'Opening up before designing',
      text: 'A lifted floorboard or a small opening in a lath-and-plaster ceiling often says more about how the building is put together than any drawing. Investigations that touch shared fabric should be agreed with the factor or neighbours first, and made good afterwards.',
    },
    { type: 'heading', level: 2, text: 'Fire and escape implications' },
    {
      type: 'paragraph',
      text: 'Open-plan layouts change how a flat behaves in a fire. In a traditional tenement the hall is the protected route from every room to the front door and the common stair; its doors and walls hold smoke back long enough for people to leave. Opening the kitchen or living room into the hall removes part of that protection.',
    },
    {
      type: 'paragraph',
      text: 'The fire section of the domestic technical handbook sets out the conditions under which an open-plan arrangement may be acceptable, including detection and alarm provision and how the escape route is protected. The current Scottish standard for interlinked smoke and heat alarms applies to existing homes whether or not they are being altered. The verifier will look for these matters in the warrant drawings, so resolve them in the design rather than in a late revision.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Planning permission and listed-building consent where relevant',
    },
    {
      type: 'paragraph',
      text: 'Internal alterations to a flat do not normally need planning permission. External changes may. Flats do not have the permitted development rights that houses have, so a new window or rooflight, a dormer, an external flue or vent, or changes to the rear elevation often need an application. In a conservation area the council’s expectations will be more specific.',
    },
    {
      type: 'paragraph',
      text: 'Where the tenement is listed, listed-building consent is a separate application, decided by the council with Historic Environment Scotland consulted in some cases. Both consents are decided on the merits of each application; a similar change granted elsewhere in the street does not guarantee the same outcome, and we do not predict outcomes. What an architect can do is make the application complete, describe the existing fabric honestly and explain why the change is appropriate.',
    },
    { type: 'heading', level: 2, text: 'Building warrant' },
    {
      type: 'paragraph',
      text: 'A building warrant is different from planning permission. It is granted by the council’s building standards service, acting as verifier, and confirms that the proposed work is designed to meet the building regulations. Most tenement alterations need one, including:',
    },
    {
      type: 'list',
      items: [
        'Forming or enlarging a structural opening, or removing a chimney breast.',
        'Moving a kitchen or bathroom where new drainage is involved.',
        'Changing the layout in a way that affects the escape route.',
        'Altering ventilation, heating or other fixed installations.',
      ],
    },
    {
      type: 'paragraph',
      text: 'Some minor works are exempt: replacing a kitchen in the same position, or renewing a bathroom without changing the drainage, may fall outside it. The exemptions are narrow, the line depends on the property, and the building standards service can confirm where it falls.',
    },
    {
      type: 'paragraph',
      text: 'The warrant must be in place before work starts. The verifier may raise queries on the drawings, specification and structural information before granting it. Once the work is complete, a completion certificate is submitted for the verifier to accept; a missing certificate tends to surface at the point of sale.',
    },
    { type: 'heading', level: 2, text: 'Contractor access in occupied closes' },
    {
      type: 'paragraph',
      text: 'Every material for the job comes up the common stair and every skip-load comes down it. This constrains what can be built as much as any regulation. A steel beam has to be carried round the half-landings, so it may need to arrive in sections and be bolted together in the flat. Skips on the street usually need a permit from the council.',
    },
    {
      type: 'paragraph',
      text: 'The close is also where neighbours meet the project. Dust, noise, protection to the stair walls and treads, working hours and a propped-open front door are what people notice. A good contractor agrees these with the factor and neighbours at the outset, protects the common areas and clears the stair each day.',
    },
    { type: 'heading', level: 2, text: 'What is useful at a first consultation' },
    {
      type: 'paragraph',
      text: 'You do not need drawings to start a conversation. If you can, bring:',
    },
    {
      type: 'list',
      items: [
        'The title deeds, or at least the section dealing with common parts and alterations.',
        'Any previous drawings, warrants or completion certificates for the flat.',
        'Photographs of each room, the close and the back court, and of anything that concerns you.',
        'The factor’s contact details and any recent correspondence about common repairs.',
        'A short note of what you want the flat to do differently, in terms of rooms and daily use rather than finishes.',
        'A rough sense of timescale and the budget range you are working within.',
      ],
    },
    {
      type: 'paragraph',
      text: 'From that, we can usually say which parts of a proposal are simple, which will need structural or consent work, and where a measured survey and some opening-up should come first.',
    },
    {
      type: 'paragraph',
      text: 'The best first step is not deciding what an extension or opening should look like. It is building an accurate picture of what is there and which constraints are genuinely fixed.',
    },
  ],
  author: { type: 'studio' },
  publishedAt: '2026-06-15',
  reviewedAt: '2026-09-01',
  hero: illustration(
    'glasgow-tenement-street',
    'context',
    'A terrace of three-storey red-sandstone tenements with bay windows, close doors and chimneys under an overcast sky.',
  ),
  officialSources: [
    {
      label: 'Building warrants',
      href: 'https://www.mygov.scot/building-warrants',
      publisher: 'mygov.scot',
      note: 'Explains when a building warrant is needed in Scotland and how to apply to the local authority verifier. Check the current edition at review.',
    },
    {
      label: 'Planning permission',
      href: 'https://www.mygov.scot/planning-permission',
      publisher: 'mygov.scot',
      note: 'Overview of when planning permission is needed in Scotland and how applications are made. Check the current edition at review.',
    },
    {
      label: 'Building standards',
      href: 'https://www.gov.scot/policies/building-standards/',
      publisher: 'Scottish Government',
      note: 'Policy landing page for the Scottish building standards system, including the domestic technical handbook. Check the current edition at review.',
    },
    {
      label: 'Planning',
      href: 'https://www.glasgow.gov.uk/planning',
      publisher: 'Glasgow City Council',
      note: 'The council’s planning service, including conservation area information and how to apply for planning permission and listed-building consent. Check the current edition at review.',
    },
    {
      label: 'Designations portal',
      href: 'https://portal.historicenvironment.scot/',
      publisher: 'Historic Environment Scotland',
      note: 'Search for listed buildings and their categories (A, B or C) and other national designations.',
    },
  ],
  relatedServiceSlugs: ['residential'],
  relatedProjectSlugs: ['pollokshields-tenement-reordering', 'hyndland-roof-rooms'],
  touchesRegulation: true,
  verificationStatus: 'verified',
  seo: {
    description:
      'Where to start when altering a Glasgow tenement flat: shared fabric, listed status, wet services, structural openings, escape, consents and a building warrant.',
  },
};
