import type { Insight } from '@/lib/content/types';
import { illustration } from '../media';

/**
 * Insight: Ventilation when making a home more airtight.
 * General guidance touching Scottish building standards; carries a review date and stays
 * gated until verified. No performance figures are given anywhere in the body.
 */
export const ventilationWhenMakingAHomeMoreAirtight: Insight = {
  id: 'insight-ventilation-when-making-a-home-more-airtight',
  slug: 'ventilation-when-making-a-home-more-airtight',
  title: 'Ventilation when making a home more airtight',
  dek: 'Window replacement, draughtproofing and insulation can change how air moves through a home. Ventilation needs to be considered at the same time.',
  category: 'Ventilation',
  body: [
    {
      type: 'paragraph',
      text: 'A Glasgow home built before the middle of the last century was ventilated mostly by accident: sash and case windows leak at the meeting rail and pulley boxes, open fireplaces draw air up the flue, and suspended timber floors breathe through their ventilators. Draughtproofing, insulation and new windows remove some of that incidental air movement. What it leaves behind has to be planned.',
    },
    {
      type: 'paragraph',
      text: 'Uncontrolled leakage and designed ventilation are not the same thing. Reducing drafts can improve comfort, but removing incidental air paths without reviewing extract and background ventilation can alter moisture and indoor-air conditions.',
    },
    {
      type: 'paragraph',
      text: 'Survey existing fans, air paths, wet rooms and window arrangements before specifying replacement elements. The appropriate response depends on the dwelling, occupancy assumptions, existing systems and proposed degree of intervention.',
    },
    {
      type: 'paragraph',
      text: 'That survey is short but specific. It should record:',
    },
    {
      type: 'list',
      items: [
        'Which rooms have an extract fan, whether it runs and where its duct goes.',
        'Where the flues and floor ventilators are and whether they have been blocked.',
        'Which windows open, which have trickle ventilators and which are painted shut.',
        'Where the boiler is and how it takes its air.',
        'Where clothes are dried.',
      ],
    },
    {
      type: 'paragraph',
      text: 'In a programme across many homes, a sample of properties surveyed this way shows the range of conditions the design has to cover.',
    },
    { type: 'heading', level: 2, text: 'Kitchens and bathrooms' },
    {
      type: 'paragraph',
      text: 'Moisture is produced mostly in a few rooms: the kitchen, the bathroom, a shower room and any utility space. Extracting it at source, before it spreads to bedrooms and hallways, is the first line of a ventilation strategy, and the part most often found not working. Fans fitted years ago may be seized, switched off at the isolator or ducted into a ceiling void rather than to outside.',
    },
    {
      type: 'paragraph',
      text: 'There are two broad approaches. Intermittent extract fans run when switched on, usually with the light, sometimes with a run-on period. Continuous extract runs at a low rate all the time and boosts when humidity rises, serving one room or several through ducts to a central unit. Intermittent fans are simpler to replace one at a time; continuous systems depend less on the occupant but need a duct route and proper commissioning.',
    },
    {
      type: 'paragraph',
      text: 'Either way the duct has to reach outside by the shortest reasonable route, not into a roof space. A grille through an external wall is visible on the elevation, and on a listed building or in a conservation area that may need consent.',
    },
    { type: 'heading', level: 2, text: 'Background air' },
    {
      type: 'paragraph',
      text: 'Extract only works if replacement air can get in. Once the sash gaps and the chimney are sealed, it needs a designed route. Trickle ventilators — small controllable slots in the window head or frame — are the usual answer in housing, giving a steady supply of background air that can be turned down but not lost.',
    },
    {
      type: 'paragraph',
      text: 'Air also has to move between rooms, from the bedrooms where it enters to the kitchen and bathroom where it leaves. A gap under each internal door, or a transfer grille where that is not practical, keeps the path open once draughtproofing has closed the others.',
    },
    {
      type: 'paragraph',
      text: 'Purge ventilation is the third element: opening a window to clear a room quickly after cooking or decorating. Replacement windows should open at least as usefully as the ones they replace. A fixed light where a sash used to be removes an option the occupant relied on.',
    },
    { type: 'heading', level: 2, text: 'Window replacement' },
    {
      type: 'paragraph',
      text: 'Replacing a timber sash and case window with a sealed modern unit is one of the largest single changes that can be made to how a home breathes. If the fireplaces are already blocked and the bathroom fan does not work, a flat can go from well ventilated to barely ventilated in an afternoon.',
    },
    {
      type: 'paragraph',
      text: 'So the window specification is a ventilation decision. Trickle ventilators in the new frames restore a controllable part of what the old sashes provided. The technical handbook guidance on replacement windows generally expects that the ventilation available before the work is not reduced by it; check the current edition. Whether the replacement itself needs a building warrant depends on the property and the scope of work, and work that does not need one must still comply with the building regulations.',
    },
    { type: 'heading', level: 3, text: 'Listed buildings' },
    {
      type: 'paragraph',
      text: 'In a listed building, whether Category A, B or C, replacing original windows will normally need listed-building consent, and the council may ask that sash and case windows be repaired and draughtproofed rather than replaced. Brush seals at the meeting rail and secondary glazing inside can reduce leakage considerably while retaining the fabric. Trickle ventilators cut into a Victorian sash change its appearance; concealed ventilators in the frame head, or a separate mechanical supply, may be more appropriate. The argument for any change has to be made, and we do not predict the outcome of an application.',
    },
    { type: 'heading', level: 2, text: 'Airtightness' },
    {
      type: 'paragraph',
      text: 'Airtightness is not a product. It is a continuous line, drawn on the section from ground floor to roof, that every trade then has to respect. In a masonry wall the line is usually the internal plaster; at a window it is the seal between frame and reveal. It has to be continuous at every junction: window head, jamb and sill, eaves, floor edge, chimney breast, and every pipe, cable and duct that passes through it.',
    },
    {
      type: 'paragraph',
      text: 'Junctions are where the work succeeds or fails. A window fitted with a foam-filled gap and a bead of mastic will leak around its perimeter; one fitted with a tape or a sealed reveal lining, detailed on the drawing and checked on site, will not. When we draw head, jamb and sill details for a housing programme, the airtightness line and the background ventilation are shown on the same sheet, so the two are decided together.',
    },
    { type: 'heading', level: 2, text: 'Moisture' },
    {
      type: 'paragraph',
      text: 'Condensation forms where warm, moist air meets a surface cold enough to bring it to its dew point. Making a home more airtight raises the humidity indoors unless the moisture is removed, and insulating some walls and not others changes which surfaces are the cold ones. The risk moves to the reveal beside a new window, the corner of a bedroom on a gable wall, or the back of a wardrobe against an uninsulated wall.',
    },
    {
      type: 'paragraph',
      text: 'Occupant behaviour is part of the calculation. Drying clothes indoors on a rack or a radiator releases a great deal of water into the air, and in a flat with no outdoor drying space it is not a habit that can be designed away. Uncovered pans, an open bathroom door and heating kept low because of cost are all normal; a strategy that only works for a household that behaves ideally is not a strategy.',
    },
    {
      type: 'paragraph',
      text: 'The response varies with the property: continuous extract, a drying space with its own fan, or simply making sure the existing fans run for long enough and the trickle ventilators stay open. A blocked chimney needs a ventilated cap and a vent to the room, not a sealed void.',
    },
    { type: 'heading', level: 2, text: 'Commissioning' },
    {
      type: 'paragraph',
      text: 'A fan that has been installed is not the same as a fan that is working. Commissioning means:',
    },
    {
      type: 'list',
      items: [
        'Confirming it runs, and runs on for as long as it should.',
        'Measuring the airflow at the grille and, for continuous systems, balancing the rates room by room.',
        'Checking that the duct discharges outside and that the backdraught shutter opens.',
        'Recording the results in the handover file with the window schedule and the details.',
      ],
    },
    {
      type: 'paragraph',
      text: 'A completion certificate submitted to the building standards service may rely on this record, and whoever maintains the property later needs it. Snagging in an occupied home should include the fans.',
    },
    { type: 'heading', level: 2, text: 'Occupant information' },
    {
      type: 'paragraph',
      text: 'The people who live in the home decide, every day, whether the ventilation works. They need to know what has changed and why: that the trickle ventilators should stay open in winter, that the bathroom fan is meant to run on after the light goes off, that the gap under the door is deliberate, and that a noisy fan should be reported rather than switched off at the isolator.',
    },
    {
      type: 'callout',
      title: 'Occupied-housing programmes',
      text: 'Where windows or ventilation are changed across many occupied homes, resident-facing information is part of the construction package, not an afterthought. A note left in each home, a contact for reporting a fan that has stopped and a brief explanation of the new ventilators make it far more likely that the system is used as designed.',
    },
    { type: 'heading', level: 2, text: 'Coordination with current building standards' },
    {
      type: 'paragraph',
      text: 'In Scotland the requirements for ventilation in dwellings are set by the building regulations and explained in the domestic technical handbook published by the Scottish Government. Its environment section covers extract from kitchens, bathrooms and utility rooms, background and purge ventilation, and air for combustion appliances. The handbooks are revised periodically; the current edition applies and should be checked.',
    },
    {
      type: 'paragraph',
      text: 'The local authority building standards service acts as verifier. Installing or altering a fixed ventilation system, and some window work, may need a building warrant, and the verifier will look for the ventilation provision on the warrant drawings alongside the fabric measures.',
    },
    {
      type: 'paragraph',
      text: 'Historic Environment Scotland’s guidance on energy efficiency in traditional buildings makes the same point from the other side: measures that reduce air leakage in an older building should retain adequate ventilation, so that moisture is not trapped in the fabric. A traditional building sealed without a ventilation strategy can deteriorate in ways that take years to appear.',
    },
    {
      type: 'paragraph',
      text: 'None of this argues against making a home more airtight. It argues for treating ventilation as part of the same drawing, the same specification and the same site visit, and for asking the questions before the old windows come out.',
    },
  ],
  author: { type: 'studio' },
  publishedAt: '2026-06-15',
  reviewedAt: '2026-09-01',
  hero: illustration(
    'window-sill-junction',
    'context',
    'Close view of a new timber sash window meeting its stone sill, with a trickle ventilator at the head.',
  ),
  officialSources: [
    {
      label: 'Building standards',
      href: 'https://www.gov.scot/policies/building-standards/',
      publisher: 'Scottish Government',
      note: 'Policy landing page for the Scottish building standards system, including the domestic technical handbook where the ventilation guidance sits. Check the current edition at review.',
    },
    {
      label: 'Building warrants',
      href: 'https://www.mygov.scot/building-warrants',
      publisher: 'mygov.scot',
      note: 'Explains when a building warrant is needed in Scotland and how to apply to the local authority verifier. Check the current edition at review.',
    },
    {
      label: 'Advice and support',
      href: 'https://www.historicenvironment.scot/advice-and-support/',
      publisher: 'Historic Environment Scotland',
      note: 'Guidance on caring for traditional buildings, including energy efficiency measures and the need to retain adequate ventilation in older fabric. Check the current edition at review.',
    },
    {
      label: 'Designations portal',
      href: 'https://portal.historicenvironment.scot/',
      publisher: 'Historic Environment Scotland',
      note: 'Search for listed buildings and their categories (A, B or C) before specifying replacement windows or external vents.',
    },
    {
      label: 'Planning',
      href: 'https://www.glasgow.gov.uk/planning',
      publisher: 'Glasgow City Council',
      note: 'The council’s planning service, covering conservation area information and applications for planning permission and listed-building consent. Check the current edition at review.',
    },
  ],
  relatedServiceSlugs: ['housing-retrofit'],
  relatedProjectSlugs: ['north-glasgow-window-ventilation-programme', 'drumchapel-fabric-upgrade'],
  touchesRegulation: true,
  verificationStatus: 'verified',
  seo: {
    description:
      'Why draughtproofing, insulation and window replacement in a Glasgow home need extract, background and purge ventilation designed at the same time.',
  },
};
