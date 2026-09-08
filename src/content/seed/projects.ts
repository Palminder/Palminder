import type { Project } from '@/lib/content/types';
import { drawing, illustration } from './media';

/**
 * Project records. Each carries a hero, a short gallery and a drawing set, all produced by the
 * practice. No cost, floor area, contractor, engineer or client is recorded anywhere.
 */
export const projects: Project[] = [
  {
    id: 'project-kelvinside-garden-room',
    slug: 'kelvinside-garden-room',
    title: 'Kelvinside Garden Room',
    locationDisplay: 'Kelvinside, Glasgow',
    area: 'Kelvinside',
    sector: 'residential',
    status: 'completed',
    year: 2025,
    realityType: 'real-project',
    verificationStatus: 'verified',
    buildingType: 'Late-Victorian red-sandstone semi-detached house',
    summary:
      'A compact garden pavilion and reordered rear rooms bring daylight and a workable kitchen to a late-Victorian sandstone house without competing with its scale.',
    brief: [
      'Adapt a late-Victorian red-sandstone semi-detached home whose rear kitchen and service rooms had little relationship with the garden. The brief asked for a larger kitchen and dining room, a practical utility zone and better daylight, without allowing a new extension to compete with the scale of the original house.',
    ],
    existing: [
      'The principal rooms retain strong proportions and substantial masonry, while incremental work at the rear had produced a fragmented plan and an abrupt garden threshold.',
    ],
    response: [
      'The existing rear rooms were reordered first, before a compact garden pavilion was added. The new volume is kept visually below the main sandstone house, deep openings mediate between old masonry and new joinery, and high-level light is introduced so that daylight reaches beyond the immediate extension.',
    ],
    services: [
      'Measured survey',
      'Feasibility',
      'Concept and developed design',
      'Planning work as required',
      'Building-warrant information',
      'Consultant coordination',
      'Technical and tender drawings',
      'Construction support where appointed',
    ],
    materials: [
      'Retained sandstone repaired with compatible methods',
      'Dark metal-framed glazing',
      'Timber lining and fixed joinery',
      'Insulated threshold and roof junctions',
      'Rainwater detailing designed as part of the elevation',
    ],
    technical: [
      'The threshold and roof junctions between the pavilion and the existing wall were drawn as insulated, drained assemblies rather than left to be resolved on site. Rainwater goods were placed as part of the elevation composition so that the new roof does not rely on improvised outlets.',
    ],
    outcome: [
      'The intervention is intended to make the whole ground floor read more coherently, with the new room acting as a continuation of the house rather than a detached glazed object.',
    ],
    hero: illustration(
      'garden-room-elevation',
      'visualisation',
      'Garden elevation: the single-storey timber-lined garden room sits to one side of the red-sandstone rear wall, its flat roof held below the eaves of the house.',
      { caption: 'Garden elevation: the pavilion is kept below the scale of the original house.' },
    ),
    gallery: [
      illustration(
        'garden-room-interior',
        'visualisation',
        'Inside the garden room, looking out through the wide glazed opening to the lawn, with timber-lined walls and a clerestory above.',
        { caption: 'The garden room: timber lining, a deep glazed opening and high-level light.' },
      ),
      illustration(
        'drawing-board-overlay',
        'context',
        'Existing and proposed ground-floor plans overlaid on tracing paper at the drawing board.',
        {
          caption:
            'Existing and proposed plans overlaid to keep changes to the retained fabric small.',
        },
      ),
    ],
    drawings: [
      drawing(
        'kelvinside-garden-room-01-existing-proposed-plan.svg',
        1600,
        1131,
        'proposed-plan',
        'Existing and proposed ground-floor plans side by side: the fragmented rear rooms replaced by a kitchen and dining room opening to a garden pavilion.',
        {
          number: 'Drawing 01',
          title: 'Existing and proposed ground-floor plans',
          note: 'Existing masonry retained in charcoal; new work shown with a controlled accent hatch.',
        },
      ),
      drawing(
        'kelvinside-garden-room-02-section.svg',
        1600,
        900,
        'section',
        'Section through the garden room showing the clerestory bringing high-level light past the existing rear wall.',
        {
          number: 'Drawing 02',
          title: 'Section through garden room and clerestory',
          note: 'High-level glazing carries daylight beyond the immediate extension.',
        },
      ),
    ],
    featured: true,
    order: 1,
    relatedService: 'residential',
    seo: {
      description:
        'A compact garden room and reordered rear rooms for a late-Victorian sandstone house in Kelvinside, Glasgow, keeping new work below the scale of the original house.',
    },
  },
  {
    id: 'project-pollokshields-tenement-reordering',
    slug: 'pollokshields-tenement-reordering',
    title: 'Pollokshields Tenement Reordering',
    locationDisplay: 'Pollokshields, Glasgow',
    area: 'Pollokshields',
    sector: 'residential',
    status: 'completed',
    year: 2024,
    realityType: 'real-project',
    verificationStatus: 'verified',
    buildingType: 'c.1900 red-sandstone tenement flat',
    summary:
      'A single controlled structural opening and full-height joinery give a c.1900 tenement flat a larger everyday kitchen while its principal rooms stay quiet.',
    brief: [
      'Rework a c.1900 red-sandstone tenement flat whose generous principal rooms contrasted with a fragmented rear kitchen, box room and service spaces. The brief asked for a larger everyday kitchen and dining room and a flexible work and guest space, while retaining original doors, cornice and floor fabric where serviceable.',
    ],
    existing: [
      'The principal rooms carry their original cornice, doors and timber floors. The rear of the plan had been subdivided over time into a small kitchen, a box room and service spaces with little daylight between them.',
    ],
    response: [
      'The kitchen moves into the larger rear room and one controlled structural opening improves movement and borrowed light between it and the adjacent space. The former kitchen becomes a compact utility and study room. New full-height joinery absorbs storage and services so that the retained rooms remain visually quiet.',
    ],
    services: [
      'Measured survey',
      'Feasibility and design',
      'Structural engineer coordination',
      'Building-warrant information',
      'Technical drawings and specification',
      'Joinery design',
      'Construction support where appointed',
    ],
    materials: [
      'Repaired plaster and cornice',
      'Retained timber floorboards',
      'Painted full-height joinery',
      'Service coordination within new cabinetry',
    ],
    technical: [
      'The structural opening and its support were coordinated with the engineer before the layout was fixed. Fire and escape implications, ventilation and extract routes were checked against the tenement’s shared parts rather than treated as a late correction.',
    ],
    outcome: [
      'The flat gains a kitchen that suits daily use and a second workable room, with the original doors, cornice and floors still doing most of the visual work.',
    ],
    hero: illustration(
      'tenement-kitchen-opening',
      'visualisation',
      'The new wide opening between kitchen and dining room, with the retained cornice above and painted full-height cabinetry beyond.',
      {
        caption:
          'Kitchen and dining room joined through one carefully placed opening; cornice and window retained.',
      },
    ),
    gallery: [
      illustration(
        'tenement-close-section',
        'diagram',
        'Cut-away through a tenement close showing the stair, half-landings and the flats either side.',
        { caption: 'The close: the shared stair around which every tenement plan is organised.' },
      ),
      illustration(
        'glasgow-tenement-street',
        'context',
        'A terrace of three-storey red-sandstone tenements with bay windows and close doors.',
        {
          caption:
            'Pollokshields: three-storey sandstone tenements with bay windows to the principal rooms.',
        },
      ),
    ],
    drawings: [
      drawing(
        'pollokshields-tenement-reordering-01-existing-plan.svg',
        1600,
        1131,
        'existing-plan',
        'Existing plan of the tenement flat with a small rear kitchen, box room and service spaces.',
        {
          number: 'Drawing 01',
          title: 'Existing plan',
          note: 'Shared close and common walls indicated.',
        },
      ),
      drawing(
        'pollokshields-tenement-reordering-02-proposed-plan.svg',
        1600,
        1131,
        'proposed-plan',
        'Proposed plan showing the kitchen moved into the rear room and a new opening to the dining space.',
        {
          number: 'Drawing 02',
          title: 'Proposed plan',
          note: 'Existing masonry retained in charcoal; new opening and joinery shown with a controlled accent hatch.',
        },
      ),
      drawing(
        'pollokshields-tenement-reordering-03-axonometric.svg',
        1200,
        1200,
        'axonometric',
        'Concise axonometric distinguishing retained fabric from the new opening and joinery.',
        {
          number: 'Drawing 03',
          title: 'Axonometric of old and new',
          note: 'Retained fabric in charcoal; new work in accent.',
        },
      ),
    ],
    featured: true,
    order: 2,
    relatedService: 'residential',
    seo: {
      description:
        'Reordering a c.1900 red-sandstone tenement flat in Pollokshields, Glasgow: a larger kitchen, one controlled structural opening and retained original fabric.',
    },
  },
  {
    id: 'project-hyndland-roof-rooms',
    slug: 'hyndland-roof-rooms',
    title: 'Hyndland Roof Rooms',
    locationDisplay: 'Hyndland, Glasgow',
    area: 'Hyndland',
    sector: 'residential',
    status: 'completed',
    year: 2025,
    realityType: 'real-project',
    verificationStatus: 'verified',
    buildingType: 'Top-floor tenement flat and pitched roof',
    summary:
      'Rooms within the roof of a top-floor tenement flat, arranged around the existing timber structure and chimney masses rather than against them.',
    brief: [
      'Create useful accommodation within the pitched roof above a top-floor tenement flat while protecting the character of the roofscape.',
    ],
    existing: [
      'Timber roof structure, chimney masses and restricted headroom produce a series of usable and unusable zones rather than one open loft.',
    ],
    response: [
      'The stair and new rooms are positioned around the existing structural logic rather than trying to erase it. Rooflights sit on the less visually sensitive roof pitches, and carefully sized openings are used instead of an over-scaled dormer. Fire, structure, insulation, moisture risk and ventilation were treated as integrated constraints from the beginning.',
    ],
    services: [
      'Measured survey',
      'Feasibility and design',
      'Planning advice and applications where required',
      'Building-warrant information',
      'Structural engineer coordination',
      'Technical drawings and specification',
    ],
    materials: [
      'Retained and strengthened timber where viable',
      'Insulated roof build-ups appropriate to the verified construction',
      'Plaster finishes',
      'Painted timber joinery',
    ],
    technical: [
      'The roof build-up was specified against the surveyed construction rather than a standard assembly, with moisture risk and ventilation of the roof void considered alongside insulation and fire separation from the common close.',
    ],
    outcome: [
      'The roof now holds a bedroom and bathroom that read as rooms in their own right, with the roofscape largely unchanged from the street.',
    ],
    hero: illustration(
      'roof-room-interior',
      'visualisation',
      'Bedroom within the roof, with exposed rafters, two conservation rooflights and a small gable window.',
      {
        caption: 'The principal roof room: rooflights bring light down across the sloping ceiling.',
      },
    ),
    gallery: [
      illustration(
        'tenement-roofscape',
        'context',
        'View across tenement roofs: slate pitches, chimney stacks with terracotta pots, a dormer and rooflights.',
        {
          caption:
            'The Hyndland roofscape, where the new rooflights sit within the existing slate pitch.',
        },
      ),
    ],
    drawings: [
      drawing(
        'hyndland-roof-rooms-01-plan.svg',
        1600,
        1131,
        'proposed-plan',
        'Proposed roof-level plan arranged around chimney masses, with stair, bedroom and bathroom.',
        {
          number: 'Drawing 01',
          title: 'Proposed roof-level plan',
          note: 'Headroom zones and retained structure indicated.',
        },
      ),
      drawing(
        'hyndland-roof-rooms-02-section.svg',
        1600,
        1000,
        'section',
        'Section through the ridge showing the stair, rooflights and insulated roof build-up.',
        {
          number: 'Drawing 02',
          title: 'Section through ridge',
          note: 'Insulated build-up and ventilation path indicated.',
        },
      ),
    ],
    featured: false,
    order: 3,
    relatedService: 'residential',
    seo: {
      description:
        'Rooms within the roof of a top-floor tenement flat in Hyndland, Glasgow, arranged around the existing timber structure with rooflights instead of a large dormer.',
    },
  },
  {
    id: 'project-finnieston-shopfront',
    slug: 'finnieston-shopfront-upper-floors',
    title: 'Finnieston Shopfront & Upper Floors',
    locationDisplay: 'Finnieston, Glasgow',
    area: 'Finnieston',
    sector: 'conservation',
    sectorLabel: 'Conservation & adaptive reuse',
    status: 'completed',
    year: 2023,
    realityType: 'real-project',
    verificationStatus: 'verified',
    buildingType: 'Late-19th-century tenemental commercial unit',
    summary:
      'A new shopfront composition drawn from the existing structural bays, selective masonry repair and a flexible ground floor for a late-19th-century Finnieston tenement.',
    brief: [
      'Repair the street presence of a late-19th-century tenemental commercial unit whose shopfront and upper façade had been altered and patched over time, while adapting the ground floor for flexible commercial use.',
    ],
    existing: [
      'Successive shopfronts had obscured the proportions of the original frontage. The upper façade carried patched stone, redundant fixings and altered openings.',
    ],
    response: [
      'A new shopfront composition was established from the proportions and structural bays of the existing frontage rather than by applying a historic pastiche. A controlled zone was defined for signage, masonry was repaired selectively, and new internal services were routed with minimal impact on retained fabric.',
    ],
    services: [
      'Measured survey and existing elevation',
      'Condition assessment',
      'Design and consent information',
      'Building-warrant information',
      'Repair schedule and specification',
      'Tender information and construction support',
    ],
    materials: [
      'Compatible stone repairs and lime mortar where appropriate',
      'Painted timber and metal shopfront elements',
      'Restrained signboard',
      'Durable linoleum or terrazzo repair inside',
    ],
    technical: [
      'The service zone behind the façade was drawn in section so that ventilation, drainage and electrical routes could be introduced without cutting into retained stone or joinery.',
    ],
    outcome: [
      'The unit reads again as part of its tenement, with a shopfront that can accept different occupiers without further alteration to the fabric.',
    ],
    hero: illustration(
      'finnieston-shopfronts',
      'visualisation',
      'Three painted timber shopfronts beneath a sandstone tenement, with fascias, pilasters and the first-floor windows above.',
      {
        caption:
          'The shopfront in its run: fascia, pilasters and stallriser reinstated within the original structural bays.',
      },
    ),
    gallery: [
      illustration(
        'shopfront-detail',
        'visualisation',
        'Close view of the restored painted-timber shopfront: cornice, fascia, glazing, pilasters and stallriser.',
        {
          caption:
            'Shopfront detail: a clear signage zone within the fascia and a raised-panel stallriser.',
        },
      ),
      illustration(
        'sandstone-coursing',
        'material-study',
        'Ashlar sandstone coursing with lime joints, weathered stones and one fresh indent.',
        {
          caption:
            'Upper façade: indent repairs and lime pointing to the sandstone above the shop.',
        },
      ),
    ],
    drawings: [
      drawing(
        'finnieston-shopfront-01-elevation.svg',
        1600,
        1131,
        'elevation',
        'Existing survey elevation and proposed elevation of the shopfront and upper floors, one above the other.',
        {
          number: 'Drawing 01',
          title: 'Existing and proposed street elevations',
          note: 'Signage zone and repaired stone indicated.',
        },
      ),
      drawing(
        'finnieston-shopfront-02-section.svg',
        1000,
        1400,
        'section',
        'Section through the façade and service zone showing how new services pass behind the retained frontage.',
        {
          number: 'Drawing 02',
          title: 'Section through façade and service zone',
          note: 'Retained fabric in charcoal; new services in accent.',
        },
      ),
    ],
    featured: true,
    order: 4,
    relatedService: 'conservation-listed-buildings',
    seo: {
      description:
        'Shopfront repair and adaptive reuse of a late-19th-century tenement commercial unit in Finnieston, Glasgow, with selective stone repair and a flexible ground floor.',
    },
  },
  {
    id: 'project-shawlands-sandstone-repair',
    slug: 'shawlands-sandstone-repair',
    title: 'Shawlands Sandstone Repair',
    locationDisplay: 'Shawlands, Glasgow',
    area: 'Shawlands',
    sector: 'conservation',
    status: 'completed',
    year: 2024,
    realityType: 'real-project',
    verificationStatus: 'verified',
    buildingType: '1890s red-sandstone tenement',
    summary:
      'A condition-led repair package for an 1890s sandstone tenement: defects mapped before treatment, water dealt with first, and stone replaced only where retention was no longer reasonable.',
    brief: [
      'Develop a condition-led repair package for an 1890s red-sandstone tenement showing open joints, localised surface loss and previous dense repairs.',
    ],
    existing: [
      'Weathering had opened joints on the exposed elevations. Earlier cementitious repairs were failing and trapping water, and several rainwater interfaces were contributing to localised decay.',
    ],
    response: [
      'Observed defects were mapped before any treatment was specified. Water and rainwater interfaces were addressed first; failing incompatible repairs were removed selectively; appropriate joints were repointed; and localised stone indents or replacement were used only where retention was no longer technically reasonable.',
    ],
    services: [
      'Close inspection and condition survey',
      'Annotated elevations',
      'Repair schedule',
      'Sample requirements',
      'Drawings and specification',
      'Tender assistance',
      'Construction inspections where appointed',
    ],
    materials: [
      'Lime mortar matched by sample panel',
      'Sandstone indents selected for compatibility',
      'Repaired rainwater goods and flashings',
    ],
    technical: [
      'The repair schedule ties every intervention to a mapped defect, so the contractor’s scope is auditable and later maintenance can be planned from the same record.',
    ],
    outcome: [
      'The aim was not to restore the façade to an as-new condition. Sound original masonry is retained, weathering performance is improved and a maintainable repair approach has been established.',
    ],
    hero: illustration(
      'sandstone-elevation-repair',
      'visualisation',
      'Four-storey sandstone tenement elevation with scaffolding across one half and completed indent repairs on the other.',
      {
        caption:
          'The elevation during the works: scaffold to the left, completed indents and repointing to the right.',
      },
    ),
    gallery: [
      illustration(
        'stone-indent-detail',
        'material-study',
        'A sandstone indent repair in progress, with the new stone half inserted and mason’s tools on the scaffold board.',
        { caption: 'Indent repair: decayed stone cut out and a matching block bedded in lime.' },
      ),
      illustration(
        'lime-mortar-samples',
        'material-study',
        'A board of nine lime mortar sample panels with sandstone offcuts and a pointing trowel.',
        {
          caption:
            'Lime mortar samples compared against the existing stone before the joint mix was chosen.',
        },
      ),
    ],
    drawings: [
      drawing(
        'shawlands-sandstone-repair-01-annotated-elevation.svg',
        1600,
        1131,
        'survey-drawing',
        'Annotated elevation mapping open joints, surface loss, previous repairs and rainwater interfaces with a keyed legend.',
        {
          number: 'Drawing 01',
          title: 'Annotated condition elevation',
          note: 'Defect types keyed by symbol; repair schedule references shown.',
        },
      ),
      drawing(
        'shawlands-sandstone-repair-02-indent-detail.svg',
        1200,
        1200,
        'detail-drawing',
        'Detail of a stone indent showing the cut-back, bedding and pointing of a new stone piece.',
        {
          number: 'Drawing 02',
          title: 'Stone indent detail',
          note: 'Indent depth, bedding and lime pointing indicated.',
        },
      ),
    ],
    featured: false,
    order: 5,
    relatedService: 'conservation-listed-buildings',
    seo: {
      description:
        'Condition-led sandstone repair for an 1890s tenement in Shawlands, Glasgow: mapped defects, lime repointing and selective stone indents.',
    },
  },
  {
    id: 'project-north-glasgow-window-ventilation',
    slug: 'north-glasgow-window-ventilation-programme',
    title: 'North Glasgow Window & Ventilation Programme',
    locationDisplay: 'North Glasgow',
    area: 'North Glasgow',
    sector: 'housing-retrofit',
    status: 'completed',
    year: 2026,
    realityType: 'real-project',
    verificationStatus: 'verified',
    buildingType: 'Occupied low-rise housing blocks of a repeated type',
    summary:
      'Window improvements across a repeated housing type, developed from a survey matrix and sample homes so that exceptions are recorded rather than forced into a standard.',
    brief: [
      'Coordinate window improvements across a repeated housing type while addressing variable existing conditions, ventilation and resident access.',
    ],
    existing: [
      'The blocks share a typology but not a condition. Previous replacements, altered openings and varied ventilation provision meant that a single detail could not be applied everywhere.',
    ],
    response: [
      'A survey matrix and sample-home strategy were developed before repeatable details were finalised. Exceptional openings were recorded rather than forced into a standard solution. Extract, background ventilation and airtightness were considered alongside the window work, and construction information was sequenced around occupied access.',
    ],
    services: [
      'Surveys',
      'Options appraisal',
      'Typical and exception details',
      'Statutory information as required',
      'Tender drawings',
      'Window schedules',
      'Ventilation coordination',
      'Construction-stage support',
    ],
    materials: [
      'Window units specified against the surveyed openings',
      'Head, jamb and sill junctions detailed for the existing wall build-up',
      'Background ventilation coordinated with extract',
    ],
    technical: [
      'The window schedule references the survey matrix directly, so each opening carries its own record of dimensions, condition and any exception to the typical detail.',
    ],
    outcome: [
      'The programme delivered a repeatable detail set that still respected the exceptions, with residents remaining in their homes throughout.',
    ],
    hero: illustration(
      'housing-block-window-programme',
      'visualisation',
      'A three-storey low-rise housing block during window replacement: new windows fitted to one half, the older windows still in place on the other, a scaffold tower at the junction.',
      {
        caption:
          'The programme in progress: new windows to the left, the existing windows still in place to the right.',
      },
    ),
    gallery: [
      illustration(
        'window-sill-junction',
        'material-study',
        'Close view of a new timber sash window meeting its stone sill, with a trickle ventilator at the head.',
        { caption: 'Sill junction and trickle ventilation, repeated across the programme.' },
      ),
    ],
    drawings: [
      drawing(
        'north-glasgow-window-programme-01-window-typology.svg',
        1600,
        1131,
        'survey-drawing',
        'Annotated window typology sheet showing the typical opening types across the blocks and the recorded exceptions.',
        {
          number: 'Drawing 01',
          title: 'Annotated window typology',
          note: 'Typical types and recorded exceptions keyed to the survey matrix.',
        },
      ),
      drawing(
        'north-glasgow-window-programme-02-head-jamb-sill.svg',
        1200,
        1600,
        'detail-drawing',
        'Head, jamb and sill details for the typical window with background ventilation and airtightness line indicated.',
        {
          number: 'Drawing 02',
          title: 'Head, jamb and sill details',
          note: 'Airtightness line and background ventilation indicated.',
        },
      ),
    ],
    featured: true,
    order: 6,
    relatedService: 'housing-retrofit',
    seo: {
      description:
        'A window and ventilation programme across repeated occupied housing in North Glasgow, built on a survey matrix, sample homes and coordinated ventilation.',
    },
  },
  {
    id: 'project-drumchapel-fabric-upgrade',
    slug: 'drumchapel-fabric-upgrade',
    title: 'Drumchapel Fabric Upgrade',
    locationDisplay: 'Drumchapel, Glasgow',
    area: 'Drumchapel',
    sector: 'housing-retrofit',
    status: 'on-site',
    year: 2026,
    realityType: 'real-project',
    verificationStatus: 'verified',
    buildingType: 'Postwar two- and three-storey housing blocks',
    summary:
      'Envelope repair and thermal improvement to occupied postwar blocks, with defects fixed first and external insulation coordinated with reveals, eaves, services and ventilation.',
    brief: [
      'Improve envelope condition and thermal performance while homes remain occupied, using a coherent palette and robust junctions rather than treating external insulation as a superficial façade exercise.',
    ],
    existing: [
      'The blocks showed a mix of original render, later patching and localised water ingress at eaves and ground level. Rainwater goods and services were fixed to the existing wall line.',
    ],
    response: [
      'Significant defects are repaired first. Where technically appropriate, mineral-wool external wall insulation is coordinated with window reveals, eaves, ground conditions, services, rainwater goods and ventilation. Elevation studies make the necessary changes to the buildings’ appearance deliberate.',
    ],
    services: [
      'Condition survey and defect mapping',
      'Options appraisal',
      'Elevation studies',
      'Junction details',
      'Planning and building-warrant information',
      'Tender drawings and specification',
      'Phased occupied-housing information',
      'Construction-stage support',
    ],
    materials: [
      'Mineral-wool external wall insulation where technically appropriate',
      'Reveals, eaves and base details drawn for the new wall line',
      'Relocated rainwater goods and services',
      'A coherent, restrained render palette',
    ],
    technical: [
      'Each junction — window reveal, eaves, base and service penetration — is drawn for the new wall thickness so that the insulation is continuous and drained rather than cosmetic.',
    ],
    outcome: [
      'Work is on site and phased so that residents remain in occupation. Outcomes will be recorded once the programme completes; no performance figures are published until they have been measured and approved.',
    ],
    hero: illustration(
      'postwar-housing-blocks',
      'visualisation',
      'Two post-war walk-up housing blocks, the nearer one with a new external wall insulation finish to half of its elevation.',
      {
        caption:
          'The blocks during the works: new external insulation and render to the left, existing roughcast to the right.',
      },
    ),
    gallery: [
      illustration(
        'housing-block-entrance',
        'visualisation',
        'The entrance of a walk-up block after upgrade: new render, windows, door, canopy and a ramp with a handrail.',
        { caption: 'Common entrance after upgrade: new door, canopy and level access.' },
      ),
      illustration(
        'site-inspection-reveal',
        'context',
        'A wall with an area of the outer leaf opened up to show its construction, a ladder against it.',
        {
          caption:
            'Opening-up to confirm the existing wall build-up before the insulation detail was fixed.',
        },
      ),
    ],
    drawings: [
      drawing(
        'drumchapel-fabric-upgrade-01-wall-window-section.svg',
        1000,
        1400,
        'section',
        'Wall and window section showing external wall insulation, the new reveal, sill and the continuous insulation line.',
        {
          number: 'Drawing 01',
          title: 'Wall and window section',
          note: 'Insulation line, reveal and drained sill indicated.',
        },
      ),
      drawing(
        'drumchapel-fabric-upgrade-02-eaves-base-detail.svg',
        1200,
        1200,
        'detail-drawing',
        'Eaves and base details showing how the insulation terminates at the roof edge and above ground level.',
        {
          number: 'Drawing 02',
          title: 'Eaves and base details',
          note: 'Ventilated eaves and drained base rail indicated.',
        },
      ),
    ],
    featured: false,
    order: 7,
    relatedService: 'housing-retrofit',
    seo: {
      description:
        'Fabric upgrade to occupied postwar housing blocks in Drumchapel, Glasgow: defects repaired first, external insulation coordinated with reveals, eaves and services.',
    },
  },
  {
    id: 'project-southside-corner-rooms',
    slug: 'southside-corner-rooms',
    title: 'Southside Corner Rooms',
    locationDisplay: 'Glasgow Southside',
    area: 'Southside',
    sector: 'commercial-community',
    status: 'completed',
    year: 2025,
    realityType: 'real-project',
    verificationStatus: 'verified',
    buildingType: 'Former corner shop',
    summary:
      'A former corner shop becomes a small café and community room, with servicing gathered into a spine and an internal glazed screen carrying light deeper into the plan.',
    brief: [
      'Adapt a former corner shop into a small café and community room able to operate during the day and host meetings or events in the evening.',
    ],
    existing: [
      'A deep ground-floor unit with a strong corner frontage but blocked rear light, accumulated fit-out layers and limited accessible facilities.',
    ],
    response: [
      'The main volume is recovered, servicing is concentrated into a defined spine and an internal glazed screen borrows light deeper into the plan. Seating and storage are integrated into robust perimeter joinery. Entrance levels, accessible WC provision, acoustics, lighting, kitchen servicing and signage are addressed as parts of the architecture rather than afterthoughts.',
    ],
    services: [
      'Feasibility and measured survey',
      'Layouts and interior alterations',
      'Accessible arrangements',
      'Servicing coordination',
      'Planning and change-of-use support where relevant',
      'Signage',
      'Building-warrant information',
      'Joinery and detail design',
      'Tender and construction information',
    ],
    materials: [
      'Retained terrazzo where viable',
      'Linoleum',
      'Timber veneer or solid-edged joinery',
      'Painted steel',
      'Wood-wool acoustic panels',
      'Modest, externally readable signage',
    ],
    technical: [
      'Entrance levels were resolved to give step-free access from the corner, and the accessible WC was placed within the servicing spine so that drainage, ventilation and the kitchen share one route.',
    ],
    outcome: [
      'The unit works as a café by day and a meeting room by evening without either use feeling like a compromise of the other.',
    ],
    hero: illustration(
      'corner-cafe-elevation',
      'visualisation',
      'A tenement corner with a splayed corner bay, its ground floor glazed as a café and community room beneath three storeys of sandstone.',
      { caption: 'The corner: continuous glazing wraps both street elevations and the splay.' },
    ),
    gallery: [
      illustration(
        'cafe-interior',
        'visualisation',
        'Inside the café: tall street windows, a glazed timber screen to the kitchen and a perimeter bench.',
        {
          caption:
            'The room: a glazed screen keeps the kitchen visible while the bench follows the windows.',
        },
      ),
    ],
    drawings: [
      drawing(
        'southside-corner-rooms-01-plan.svg',
        1600,
        1131,
        'proposed-plan',
        'Proposed plan showing the recovered main volume, the servicing spine with kitchen and accessible WC, and the glazed screen.',
        {
          number: 'Drawing 01',
          title: 'Proposed ground-floor plan',
          note: 'Servicing spine and glazed screen shown with accent hatch.',
        },
      ),
      drawing(
        'southside-corner-rooms-02-section.svg',
        1600,
        900,
        'section',
        'Section through the unit showing the glazed screen, acoustic ceiling panels and the entrance level change.',
        {
          number: 'Drawing 02',
          title: 'Section through café and community room',
          note: 'Acoustic panels and step-free entrance indicated.',
        },
      ),
    ],
    featured: false,
    order: 8,
    relatedService: 'commercial-community',
    seo: {
      description:
        'A former corner shop in Glasgow’s Southside adapted into a café and community room with a servicing spine, glazed screen and integrated joinery.',
    },
  },
];
