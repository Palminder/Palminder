import type { Insight } from '@/lib/content/types';
import { illustration } from '../media';

/**
 * Insight: Understanding Category B listed buildings in Scotland.
 * General guidance touching listed-building consent and Scottish building standards; carries a
 * review date and stays gated until verified.
 */
export const categoryBListedBuildings: Insight = {
  id: 'insight-understanding-category-b-listed-buildings-in-scotland',
  slug: 'understanding-category-b-listed-buildings-in-scotland',
  title: 'Understanding Category B listed buildings in Scotland',
  dek: 'What Category B means, why listing is more than a façade designation, and how an alteration can begin with significance rather than style.',
  category: 'Listed buildings',
  body: [
    {
      type: 'paragraph',
      text: 'Scotland uses Categories A, B and C to indicate the relative architectural or historic interest of listed buildings. Category B covers buildings that are major examples of a particular period, style or type, including examples that may have been altered. The category does not mean that only a building’s street façade matters.',
    },
    {
      type: 'paragraph',
      text: 'Many of Glasgow’s tenements, villas, churches, schools and commercial buildings are listed at Category B. Owners sometimes read the category as a grading of how carefully the building must be treated, with B taken to mean that the interior is free to change. It is not. The category records the building’s relative interest; it does not narrow what the listing covers or what needs consent.',
    },
    { type: 'heading', level: 2, text: 'What listing covers' },
    {
      type: 'paragraph',
      text: 'Listing is a designation made by Historic Environment Scotland. It applies to the whole building, inside and out: the plan, the stair, the roof structure, the windows, the internal joinery, plasterwork and chimney pieces, and later phases as well as the first. It often extends to structures within the curtilage — boundary walls, railings, gatepiers, outbuildings — and to objects fixed to the building.',
    },
    {
      type: 'paragraph',
      text: 'The designation record for any listed building can be checked on the Historic Environment Scotland designations portal. The record gives the category, the date of listing and a description. The description is worth reading carefully, but it is not an inventory: a feature that is not mentioned is still covered by the listing, and the record may have been written decades ago from the pavement. Where a building sits within a conservation area as well, both sets of controls apply.',
    },
    {
      type: 'heading',
      level: 2,
      text: 'Identifying important fabric, interiors and later changes',
    },
    {
      type: 'paragraph',
      text: 'An alteration to a listed building should begin with what the building is, rather than with what it should look like when finished. That means an understanding of significance: which elements carry the architectural or historic interest, which are ordinary, and which are later changes that have added to or taken from the building.',
    },
    {
      type: 'paragraph',
      text: 'In a Glasgow tenement or villa of the 1870s to 1900s the significant fabric is usually more extensive than owners expect. Beyond the sandstone façade it may include the entrance close and its tiling, the stone stair and iron balustrade, the room plan and its hierarchy, timber sash-and-case windows, panelled doors and architraves, cornices and ceiling roses, and a marble or timber chimney piece. Service rooms at the rear, altered kitchens and later partitions are usually of less interest, and are often where change can happen most freely.',
    },
    {
      type: 'paragraph',
      text: 'Later changes need their own judgement. A 1930s shopfront or a Victorian wing on a Georgian house may by now be part of the building’s interest; a replacement window in uPVC or a suspended ceiling almost certainly is not. Working out the sequence of alterations, from the fabric itself and from any earlier drawings, usually shows where significance has already been lost and where the original arrangement survives.',
    },
    { type: 'heading', level: 3, text: 'A short statement of significance' },
    {
      type: 'paragraph',
      text: 'We record this understanding as a short statement, illustrated with photographs and an annotated plan. It does not need to be long. It needs to be honest about condition, clear about what matters and where, and specific enough that the proposals can be tested against it.',
    },
    { type: 'heading', level: 2, text: 'Repair versus alteration' },
    {
      type: 'paragraph',
      text: 'Repair and alteration are treated differently. Repair that uses the same materials, in the same form and to the same detail, such as repointing in lime, replacing a decayed sash rail in timber or renewing slates like for like, does not normally need listed-building consent. It is the ordinary maintenance the building depends on, and delaying it does more harm to a listed building than most alterations.',
    },
    {
      type: 'paragraph',
      text: 'The line is crossed when repair becomes replacement of a different kind: a whole window in a new material or a new pattern, stone replaced with a different stone or with a cementitious patch, a slate roof re-covered in a substitute. Whether a particular repair needs consent depends on the property and on how much of the original would be lost; the planning authority can advise where the line falls, and it is better to ask than to assume.',
    },
    { type: 'heading', level: 2, text: 'Listed-building consent' },
    {
      type: 'paragraph',
      text: 'Listed-building consent is granted by the planning authority, in Glasgow the city council. It is separate from planning permission, made on its own application, and needed for works that would affect the character of the building as one of special architectural or historic interest. Internal works can need it as readily as external ones. A proposal may need one consent, both or neither: an internal reordering of a listed flat may need listed-building consent but no planning permission, while a rear extension may need both.',
    },
    {
      type: 'paragraph',
      text: 'The test is whether the character is affected, not whether the change is visible from the street. Removing a chimney piece, taking down a wall that forms part of the plan, stripping cornices or inserting a new stair can each affect character. Historic Environment Scotland is consulted on some applications, and each case is looked at on its merits.',
    },
    {
      type: 'paragraph',
      text: 'Carrying out works that need consent without it is an offence, and the authority can require unauthorised work to be reversed. Past unauthorised works also tend to surface at the point of sale, and are worth establishing before a new application is prepared, because the application will describe the building as it now stands.',
    },
    {
      type: 'paragraph',
      text: 'Listing does not remove the need for a building warrant where the work would otherwise need one. The warrant is assessed by the council’s building standards service, acting as verifier, against a different set of tests, and the drawings have to satisfy both.',
    },
    {
      type: 'callout',
      title: 'Whose decision it is',
      text: 'We prepare the survey, the drawings, the statement and the case for the change. The decision on listed-building consent, and on planning permission, is the planning authority’s. We do not predict outcomes, and we advise against relying on what has been granted elsewhere in the street.',
    },
    { type: 'heading', level: 2, text: 'Drawings and supporting information' },
    {
      type: 'paragraph',
      text: 'An application for listed-building consent is judged on what it shows. The planning authority needs to see what exists, what is proposed and what the difference is. In practice that means:',
    },
    {
      type: 'list',
      items: [
        'Existing drawings from a measured survey: plans, sections and elevations that record the building as it is, including the features that will be affected.',
        'Proposed drawings at the same scale and in the same views, so that the two can be read side by side.',
        'Photographs of the affected areas, keyed to a plan and taken before any opening-up or stripping out.',
        'A statement explaining the significance of the building, what the proposals do to it and why the change is justified.',
        'Details and specifications for new elements where they matter: a window section, a junction with historic fabric, a repair method.',
      ],
    },
    {
      type: 'paragraph',
      text: 'The standard of the existing drawings matters. A survey that records a window as a rectangle in a wall gives the officer nothing to assess; one that records the sash pattern, the glazing bars and the shutter boxes shows what is at stake. Where a feature is to be removed, the drawings should say so plainly rather than leaving it to be noticed.',
    },
    { type: 'heading', level: 2, text: 'Traditional materials' },
    {
      type: 'paragraph',
      text: 'Many Category B buildings in Glasgow are traditionally constructed: solid sandstone walls bedded in lime, timber floors and roofs, slate coverings, sash-and-case windows. Those materials behave as a system. Lime mortar is softer than the stone around it and lets moisture move out through the joints; a dense cement pointing reverses that and can push decay into the stone. Slate, lead and cast-iron rainwater goods are repairable and long-lived if maintained.',
    },
    {
      type: 'paragraph',
      text: 'The planning authority will generally expect repairs and new work to use compatible materials: lime for pointing and render, sandstone matched for colour, bedding and durability where indents are needed, timber for windows and doors, natural slate for roofs. This is not a preference for the picturesque. Substitute materials often perform worse in a traditional wall and are harder to reverse when they fail. Historic Environment Scotland publishes guidance on managing change in the historic environment and on traditional materials that is worth reading before a specification is written.',
    },
    {
      type: 'paragraph',
      text: 'New work does not have to imitate the old. A new element can be distinguishable in detail and material while remaining respectful of the building, provided it is well made, does not damage what it touches, and can be read as an addition rather than a confusion of the record.',
    },
    { type: 'heading', level: 2, text: 'Early discussion where proposals are sensitive' },
    {
      type: 'paragraph',
      text: 'Where a proposal touches significant fabric — a change to the plan, a new opening in a principal elevation, a roof extension, the loss of an interior — it is usually worth discussing with the planning authority before the application is made. Pre-application discussion with the council’s planning service is available and, for a listed building, usually repays the time. Where Historic Environment Scotland is likely to be consulted, it may help to involve them at the same stage.',
    },
    {
      type: 'paragraph',
      text: 'Pre-application discussion does not commit the authority to a decision, and it is not a shortcut to consent. What it does is bring the questions forward: which elements the officers regard as most important, what information they will need, and whether the approach is one they can support in principle. It is far easier to adjust a scheme at sketch stage than after a refusal.',
    },
    {
      type: 'paragraph',
      text: 'The sequence is unremarkable: understand the building, decide what is significant, design the change from that understanding, test it in discussion, then document it properly. Beginning with significance rather than style tends to produce alterations that are easier to justify and, in the long run, better for the building.',
    },
  ],
  author: { type: 'studio' },
  publishedAt: '2026-06-15',
  reviewedAt: '2026-09-01',
  hero: illustration(
    'listed-villa-doorway',
    'context',
    'The columned porch, panelled door and fanlight of a Victorian sandstone villa, with railings along the pavement.',
  ),
  officialSources: [
    {
      label: 'Designations portal',
      href: 'https://portal.historicenvironment.scot/',
      publisher: 'Historic Environment Scotland',
      note: 'Search for listed buildings, their categories (A, B or C) and the designation record for each, alongside other national designations.',
    },
    {
      label: 'Advice and support',
      href: 'https://www.historicenvironment.scot/advice-and-support/',
      publisher: 'Historic Environment Scotland',
      note: 'Guidance on listing, managing change in the historic environment and the care of traditional buildings and materials. Check the current edition at review.',
    },
    {
      label: 'Planning',
      href: 'https://www.glasgow.gov.uk/planning',
      publisher: 'Glasgow City Council',
      note: 'The planning authority for Glasgow: how to apply for listed-building consent and planning permission, and conservation area information. Check the current edition at review.',
    },
    {
      label: 'Planning permission',
      href: 'https://www.mygov.scot/planning-permission',
      publisher: 'mygov.scot',
      note: 'Overview of when planning permission is needed in Scotland and how applications to the planning authority are made. Check the current edition at review.',
    },
    {
      label: 'Building standards',
      href: 'https://www.gov.scot/policies/building-standards/',
      publisher: 'Scottish Government',
      note: 'Policy landing page for the Scottish building standards system, including the technical handbooks and the building warrant process. Check the current edition at review.',
    },
  ],
  relatedServiceSlugs: ['conservation-listed-buildings'],
  relatedProjectSlugs: ['finnieston-shopfront-upper-floors', 'shawlands-sandstone-repair'],
  touchesRegulation: true,
  verificationStatus: 'verified',
  seo: {
    description:
      'What Category B listing covers in Scotland, how significance guides an alteration, and what listed-building consent from the planning authority requires.',
  },
};
