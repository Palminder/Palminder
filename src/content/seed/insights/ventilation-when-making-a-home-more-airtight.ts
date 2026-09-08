import type { Insight } from '@/lib/content/types';
import { placeholder } from '../placeholders';

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
      text: 'A Glasgow home built before the middle of the last century was ventilated mostly by accident. Sash and case windows leak at the meeting rail and around the pulley boxes, open fireplaces draw air up the flue, and suspended timber floors breathe through their ventilators. Replacing windows, sealing draughts or adding insulation removes some of that incidental air movement, which is the point of the work. What it leaves behind has to be planned.',
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
      text: 'Photographs and a marked-up plan are usually enough. In a programme across many homes, a sample of properties surveyed this way shows the range of conditions the design has to cover.',
    },
    { type: 'heading', level: 2, text: 'Kitchens and bathrooms' },
    {
      type: 'paragraph',
      text: 'Moisture is produced mostly in a few rooms: the kitchen, the bathroom, a shower room and any utility space. Extracting it at source, before it spreads to bedrooms and hallways, is the first line of a ventilation strategy, and it is the part most often found not working. Fans fitted years ago may be seized, switched off at the isolator or ducted into a ceiling void rather than to outside.',
    },
    {
      type: 'paragraph',
      text: 'There are two broad approaches. Intermittent extract fans run when switched on, usually with the light, and sometimes for a period afterwards. Continuous extract runs at a low rate all the time and boosts when humidity rises; it may serve one room or several through ducts to a central unit. Intermittent fans are simpler to replace one at a time. Continuous systems depend less on the occupant but need a duct route, a place for the unit and proper commissioning. Which is appropriate depends on the property, the layout and how the home is likely to be used.',
    },
    {
      type: 'paragraph',
      text: 'In either case the duct has to reach the outside by the shortest reasonable route, with a terminal that does not blow moist air into a roof space. Where a fan discharges through an external wall, the grille becomes visible on an elevation, and on a listed building or in a conservation area that may need consent.',
    },
    { type: 'heading', level: 2, text: 'Background air' },
    {
      type: 'paragraph',
      text: 'Extract only works if replacement air can get in. In an older home it arrived through the sash gaps and the chimney. Once those are sealed, it needs a designed route. Trickle ventilators — small controllable slots in the window head or frame — are the usual answer in housing, giving a steady supply of background air that can be turned down in cold weather but not lost altogether.',
    },
    {
      type: 'paragraph',
      text: 'Air also has to move between rooms, from the bedrooms where it enters to the kitchen and bathroom where it leaves. A gap under each internal door, or a transfer grille where that is not practical, keeps the path open once draughtproofing has closed the others. A new carpet or a replacement door can undo it.',
    },
    {
      type: 'paragraph',
      text: 'Purge ventilation is the third element: the ability to open a window and clear a room quickly after cooking or decorating. Replacement windows should open at least as usefully as the ones they replace. A fixed light where a sash used to be, or a restrictor that cannot be released, removes an option the occupant relied on.',
    },
    { type: 'heading', level: 2, text: 'Window replacement' },
    {
      type: 'paragraph',
      text: 'Replacing a timber sash and case window with a sealed modern unit is one of the largest single changes that can be made to how a home breathes. The leakage around the old sashes, parting beads and pulley boxes disappears at once. If the fireplaces have already been blocked and the bathroom fan does not work, a flat can go from well ventilated to barely ventilated in an afternoon.',
    },
    {
      type: 'paragraph',
      text: 'So the window specification is a ventilation decision. Trickle ventilators in the new frames restore a controllable part of what the old sashes provided; where they are omitted, something else has to take their place. The technical handbook guidance on replacement windows generally expects that the ventilation available before the work is not reduced by it, and the current edition should be checked for what that means in a particular case. Whether the replacement itself needs a building warrant depends on the property and the scope of the work; the council’s building standards service can confirm. Work that does not need a warrant must still comply with the building regulations.',
    },
    { type: 'heading', level: 3, text: 'Listed buildings and conservation areas' },
    {
      type: 'paragraph',
      text: 'In a listed building, whether Category A, B or C, replacing original windows will normally need listed-building consent, and the council may ask that sash and case windows be repaired and draughtproofed rather than replaced. A repaired sash with brush seals at the meeting rail and parting beads, and secondary glazing inside, can reduce leakage considerably while retaining the fabric. Trickle ventilators cut into a Victorian sash change its appearance; concealed ventilators in the frame head, or a separate mechanical supply, may be more appropriate. In a conservation area the controls bear mainly on the elevations facing the street. In either case the argument for the change has to be made, and we do not predict the outcome of an application.',
    },
    { type: 'heading', level: 2, text: 'Airtightness' },
    {
      type: 'paragraph',
      text: 'Airtightness is not a product. It is a continuous line, drawn on the section from ground floor to roof, which the design commits to and every trade then has to respect. In a masonry wall the line is usually the internal plaster; at a window it is the seal between frame and reveal. It has to be continuous at every junction — window head, jamb and sill, eaves, floor edge, chimney breast, and every pipe, cable and duct that passes through it.',
    },
    {
      type: 'paragraph',
      text: 'Junctions are where the work succeeds or fails. A window fitted with a foam-filled gap and a bead of mastic will leak around its perimeter for as long as the mastic lasts. A window fitted with a tape or a sealed reveal lining, detailed on the drawing and checked on site, will not. When we draw head, jamb and sill details for a housing programme, the airtightness line and the background ventilation are indicated on the same sheet, so that the two are decided together rather than in sequence. The failures are otherwise invisible: a gap behind the plasterboard at a reveal lets warm, moist air reach a cold surface it never touched before, and the mould appears where no one was looking.',
    },
    { type: 'heading', level: 2, text: 'Moisture' },
    {
      type: 'paragraph',
      text: 'Condensation forms where warm, moist air meets a surface cold enough to bring it to its dew point. Making a home more airtight raises the humidity indoors unless the moisture is removed; insulating some walls and not others changes which surfaces are the cold ones. A reveal beside a new window, the corner of a bedroom on a gable wall, the back of a wardrobe against an uninsulated external wall: these are where the risk moves to.',
    },
    {
      type: 'paragraph',
      text: 'Occupant behaviour is part of the calculation and should be an honest part. Drying clothes indoors on a rack or a radiator releases a great deal of water into the air, and in a flat with no outdoor drying space it is not a habit that can be designed away. Cooking with pans uncovered, showering with the door open, keeping the heating low because of cost — all of these are normal. A ventilation strategy that only works for a household that behaves ideally is not a strategy.',
    },
    {
      type: 'paragraph',
      text: 'The response varies with the property: a continuous extract that runs regardless of what anyone switches on, a drying space with its own fan, or simply making sure the existing fans run for long enough and the trickle ventilators stay open. A blocked chimney deserves a ventilated cap and a vent to the room, not a sealed void.',
    },
    { type: 'heading', level: 2, text: 'Commissioning' },
    {
      type: 'paragraph',
      text: 'A fan that has been installed is not the same as a fan that is working. Commissioning means:',
    },
    {
      type: 'list',
      items: [
        'Switching it on, confirming it runs, and checking it runs on for as long as it should.',
        'Measuring the airflow at the grille and, for continuous systems, balancing the rates room by room.',
        'Checking that the duct discharges outside and that the backdraught shutter opens.',
        'Recording the results in the handover file with the window schedule and the details.',
      ],
    },
    {
      type: 'paragraph',
      text: 'A completion certificate submitted to the building standards service may rely on this record, and whoever maintains the property later needs to know what was installed and what it was set to. Snagging in an occupied home is a visit, not a paper exercise, and it should include the fans.',
    },
    { type: 'heading', level: 2, text: 'Occupant information' },
    {
      type: 'paragraph',
      text: 'The people who live in the home decide, every day, whether the ventilation works. They need to know what has changed and why: that the trickle ventilators should stay open in winter, that the bathroom fan is meant to run on after the light goes off, that the gap under the door is deliberate, and that a fan which has become noisy should be reported rather than switched off at the isolator. This is short, plain information, ideally on a page or two with a photograph of each control.',
    },
    {
      type: 'callout',
      title: 'Occupied-housing programmes',
      text: 'Where windows or ventilation are changed across many occupied homes, resident-facing information is part of the construction package rather than an afterthought. A note left in each home, a contact for reporting a fan that has stopped, and a brief explanation of the new ventilators make it far more likely that the installed system is used as designed.',
    },
    { type: 'heading', level: 2, text: 'Coordination with current building standards' },
    {
      type: 'paragraph',
      text: 'In Scotland the requirements for ventilation in dwellings are set by the building regulations and explained in the domestic technical handbook published by the Scottish Government. The environment section covers extract from kitchens, bathrooms and utility rooms, background and purge ventilation, and the supply of air to combustion appliances. The handbooks are revised periodically and the ventilation guidance has changed over time; the current edition applies and should be checked at the time of design.',
    },
    {
      type: 'paragraph',
      text: 'The local authority building standards service acts as verifier. Installing or altering a fixed ventilation system, and some window work, may need a building warrant, and the verifier will look for the ventilation provision on the warrant drawings alongside the fabric measures.',
    },
    {
      type: 'paragraph',
      text: 'Historic Environment Scotland’s guidance on energy efficiency in traditional buildings makes the same point from the other side: measures that reduce air leakage in an older building should retain adequate ventilation, so that moisture is not trapped in the fabric. Solid masonry walls, lime plaster and timber floors rely on being able to dry out, and a traditional building sealed without a ventilation strategy can deteriorate in ways that take years to appear.',
    },
    {
      type: 'paragraph',
      text: 'None of this argues against making a home more airtight. It argues for treating ventilation as part of the same drawing, the same specification and the same site visit, and for asking the questions before the old windows come out.',
    },
  ],
  author: { type: 'studio' },
  publishedAt: '2026-06-15',
  reviewedAt: '2026-09-01',
  hero: placeholder(
    '16x10',
    'stone',
    'Hero image for Ventilation when making a home more airtight',
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
  verificationStatus: 'pending',
  seo: {
    description:
      'Why draughtproofing, insulation and window replacement in a Glasgow home need extract, background and purge ventilation designed at the same time.',
  },
};
