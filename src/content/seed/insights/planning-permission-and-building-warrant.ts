import type { Insight } from '@/lib/content/types';
import { illustration } from '../media';

export const planningPermissionAndBuildingWarrant: Insight = {
  id: 'insight-planning-permission-and-building-warrant-are-not-the-same-thing',
  slug: 'planning-permission-and-building-warrant-are-not-the-same-thing',
  title: 'Planning permission and a building warrant are not the same thing',
  dek: 'Two different Scottish systems are often discussed as though they were interchangeable. They answer different questions.',
  category: 'Consents',
  body: [
    {
      type: 'paragraph',
      text: 'Ask whether a home alteration in Glasgow needs “permission” and two separate questions tend to collapse into one. Planning permission and a building warrant both involve drawings and both arrive as a decision from the City Council. Beyond that they have little in common.',
    },
    {
      type: 'paragraph',
      text: 'Planning and building standards deal with different aspects of a project. A proposal may need both, one or—in limited circumstances—neither. A planning decision does not mean the construction automatically satisfies building regulations, and a building warrant does not replace planning approval where planning permission is required.',
    },
    {
      type: 'paragraph',
      text: 'Planning asks whether a change is acceptable in its place. Building standards ask whether the construction will be safe and fit to occupy. A proposal can pass one and fail the other, and a project that skips either tends to resurface later, often during a sale.',
    },
    { type: 'heading', level: 2, text: 'What planning considers' },
    {
      type: 'paragraph',
      text: 'Planning permission is granted by the planning authority—in the city, Glasgow City Council—under the Town and Country Planning (Scotland) Act 1997. It is concerned with development: building and other operations, and any material change in the use of land or buildings. The test is whether a proposal is acceptable in its context, judged against the development plan and other material considerations.',
    },
    {
      type: 'paragraph',
      text: 'In practice that means siting, scale and massing; the effect on neighbours’ daylight, privacy and outlook, which the system calls amenity; the appearance of the building and its materials; and how the property is used. Turning a shop into a café is a planning question even if no wall moves. A rear extension is a planning question because of what it does to the garden and the neighbouring windows, not because of how it is built. A planning officer does not check the size of a steel beam or how a bathroom is ventilated, and a grant of planning permission says nothing about them.',
    },
    { type: 'heading', level: 3, text: 'Permitted development' },
    {
      type: 'paragraph',
      text: 'Not every development needs an application. Scottish legislation grants permitted development rights that allow certain classes of work to proceed without planning permission, subject to conditions on size, position and setting. The rights differ between houses and flats, are more limited for a tenement flat, can be restricted in conservation areas or by an Article 4 direction, and change from time to time.',
    },
    {
      type: 'paragraph',
      text: 'It is rarely safe to assume that a type of work is permitted development; the thresholds and exceptions have to be read against the actual site. Where the position is uncertain, a certificate of lawfulness from the planning authority gives a written answer rather than an assumption.',
    },
    { type: 'heading', level: 2, text: 'What a building warrant considers' },
    {
      type: 'paragraph',
      text: 'A building warrant is granted under the Building (Scotland) Act 2003 and the Building (Scotland) Regulations 2004. The application is assessed by a verifier—in Scotland, the local authority building standards service—which checks that the submitted design complies with the building regulations.',
    },
    {
      type: 'paragraph',
      text: 'The regulations are functional standards. Guidance on meeting them is set out in the Scottish Government’s building standards technical handbooks, one domestic and one non-domestic. The handbooks are revised periodically, and a new edition of the domestic technical handbook applies from 6 April 2026. Which edition applies depends on when the warrant application is made, so the current edition should be checked at the time of application.',
    },
    {
      type: 'paragraph',
      text: 'The standards cover what makes a building safe and fit to occupy rather than how it sits in the street. Broadly:',
    },
    {
      type: 'list',
      items: [
        'structure, including new and altered elements and what they bear on;',
        'fire: escape, separation between dwellings and access for the fire service;',
        'environment: ventilation, moisture, drainage and sanitary provision;',
        'safety: stairs, guarding, glazing and electrical installations;',
        'noise between attached dwellings;',
        'energy: the thermal performance of the fabric and the efficiency of heating and lighting.',
      ],
    },
    {
      type: 'paragraph',
      text: 'Some minor work is exempt from the need for a warrant, and other work needs no warrant but must still comply with the regulations. That second category catches people out: the absence of a warrant is not the absence of a standard.',
    },
    { type: 'heading', level: 2, text: 'Listed-building consent and conservation areas' },
    {
      type: 'paragraph',
      text: 'Where a building is listed, a third consent enters the picture. Listed-building consent is required for works that affect the character of a listed building, inside as well as out, whatever the category. Categories A, B and C describe relative importance, not how much of the building is protected, and the consent is needed whether or not planning permission is also required.',
    },
    {
      type: 'paragraph',
      text: 'It is administered by the planning authority, with Historic Environment Scotland consulted on certain applications, and the test is the effect on the building’s special interest. Replacing sash-and-case windows, removing a chimney breast or lining external walls with insulation can all need listed-building consent even where no planning permission is required.',
    },
    {
      type: 'paragraph',
      text: 'Conservation areas add a further layer. Designation restricts permitted development rights, brings most demolition under conservation area consent, and means the authority will weigh the effect of a proposal on the character and appearance of the area. Much of the West End and the Southside is designated, so a replacement window that raises no planning question elsewhere may need an application here.',
    },
    { type: 'heading', level: 2, text: 'Typical home alterations' },
    {
      type: 'paragraph',
      text: 'It is tempting to publish a table—extension needs planning, kitchen does not—and we have chosen not to, because such tables are wrong often enough to be unhelpful.',
    },
    {
      type: 'paragraph',
      text: 'Moving a kitchen to another room usually raises no planning question in a house, though in a flat it is worth checking where the soil pipes run. New drainage, ventilation, electrical work and the fire separation between a kitchen and the escape route may bring the work within the scope of a warrant. In a listed flat, the loss of an original room arrangement may also be a consent matter.',
    },
    {
      type: 'paragraph',
      text: 'Forming an opening in a loadbearing wall is generally a warrant matter because the structure is altered. In a tenement the wall may be carrying floors above and bearing on the flat below, and the design will need structural input. Planning is usually not engaged unless the building is listed or the exterior changes.',
    },
    {
      type: 'paragraph',
      text: 'Converting a roof space into habitable rooms almost always needs a warrant: escape from a new upper storey, the stair, the altered roof structure and the insulation of the new envelope are all standards matters. Whether it also needs planning permission depends on whether dormers or rooflights are proposed, which way they face, and the status of the property.',
    },
    {
      type: 'paragraph',
      text: 'A rear extension may or may not need planning permission, depending on its size, height and position relative to boundaries, the form of the house, and whether permitted development rights have been used up or removed. It will need a building warrant. Where planning is required, the planning drawings describe what the extension is; the warrant drawings show how it complies.',
    },
    {
      type: 'paragraph',
      text: 'In an unlisted house outside a conservation area, like-for-like window replacement is often neither a planning matter nor one that requires a warrant, although the new windows must still comply with the regulations. In a conservation area a change of material or glazing pattern may need planning permission. In a listed building it will need listed-building consent, and the authority may expect timber windows to be repaired rather than replaced.',
    },
    {
      type: 'callout',
      title: 'It depends on the property',
      text: 'The same alteration can need different consents in a detached house, a tenement flat and a listed villa. Before relying on any general rule, confirm the listing status, conservation-area boundary and permitted-development position for the actual address.',
    },
    { type: 'heading', level: 2, text: 'Why sequencing matters' },
    {
      type: 'paragraph',
      text: 'Because the two systems ask different questions, they are normally dealt with in sequence. The order protects later work from decisions not yet made.',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        'Design: survey, brief, options and a settled scheme.',
        'Planning permission or listed-building consent where required, obtained before the technical design is fully developed, since the decision may change the scheme.',
        'Building warrant, applied for with the technical drawings and specification and granted before work starts.',
        'Construction, with the verifier inspecting at the stages it has asked to see.',
        'Completion certificate, submitted by the owner and accepted by the verifier before the new accommodation is occupied. Solicitors acting for buyers routinely ask for it.',
      ],
    },
    {
      type: 'paragraph',
      text: 'Work that requires a warrant should not start before it is granted; starting early can mean enforcement, a late application, and opening up finished work for inspection. Starting before a planning decision carries a similar risk: building something that then has to be altered or removed.',
    },
    { type: 'heading', level: 2, text: 'Check the requirements for the actual property' },
    {
      type: 'paragraph',
      text: 'What applies to a particular project depends on the property—house or flat, listed or not, inside or outside a conservation area, with or without earlier extensions—and on the proposal itself. Two flats in the same close can have different answers.',
    },
    {
      type: 'paragraph',
      text: 'The reliable route is to establish the facts early: check the listing on the Historic Environment Scotland designations portal, confirm conservation-area status with the council, find out what previous owners built and whether it was consented, and read the current technical handbook. Where the position is uncertain, a pre-application enquiry to the planning authority or an early conversation with building standards is worth more than an assumption.',
    },
    {
      type: 'paragraph',
      text: 'Bracken & Roe prepares planning, listed-building and building warrant applications for houses, flats and small commercial buildings across Glasgow, and advises on which consents a proposal is likely to need before design work begins. That does not replace the authority’s decision, but it does mean the questions are asked in the right order.',
    },
  ],
  author: { type: 'studio' },
  publishedAt: '2026-06-15',
  reviewedAt: '2026-09-01',
  hero: illustration(
    'consent-drawings-study',
    'context',
    'Four drawing sheets pinned to a board: a site plan, an elevation, a floor plan and a section.',
  ),
  officialSources: [
    {
      label: 'Planning permission',
      href: 'https://www.mygov.scot/planning-permission',
      publisher: 'mygov.scot',
      note: 'Public guidance on when planning permission is needed in Scotland and how to apply. Check the current edition at review.',
    },
    {
      label: 'Building warrants',
      href: 'https://www.mygov.scot/building-warrants',
      publisher: 'mygov.scot',
      note: 'Public guidance on building warrants, exemptions and completion certificates. Check the current edition at review.',
    },
    {
      label: 'Building standards',
      href: 'https://www.gov.scot/policies/building-standards/',
      publisher: 'Scottish Government',
      note: 'Policy landing page for the Scottish building standards system, including the domestic and non-domestic technical handbooks. Check the current edition at review.',
    },
    {
      label: 'Planning',
      href: 'https://www.glasgow.gov.uk/planning',
      publisher: 'Glasgow City Council',
      note: 'The planning authority for Glasgow: applications, conservation areas and pre-application advice. Check the current edition at review.',
    },
    {
      label: 'Advice and support',
      href: 'https://www.historicenvironment.scot/advice-and-support/',
      publisher: 'Historic Environment Scotland',
      note: 'Guidance on listed buildings, listed-building consent and conservation areas; the designations portal can be reached from this area.',
    },
  ],
  relatedServiceSlugs: ['residential', 'commercial-community'],
  relatedProjectSlugs: ['kelvinside-garden-room', 'southside-corner-rooms'],
  touchesRegulation: true,
  verificationStatus: 'verified',
  seo: {
    description:
      'How planning permission, building warrants and listed-building consent differ in Scotland, and why the answer depends on the property.',
  },
};
