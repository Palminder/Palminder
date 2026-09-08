import type { Service } from '@/lib/content/types';
import { placeholder } from './placeholders';

export const services: Service[] = [
  {
    slug: 'residential',
    number: '01',
    title: 'Residential',
    navLabel: 'Residential',
    summary:
      'Extensions, attic conversions, tenement alterations, internal remodelling and refurbishment, with planning and building-warrant work coordinated around the particular building.',
    heroHeadline: 'Homes made to work harder, without losing what makes them worth keeping.',
    intro: [
      'Residential work often starts with a practical problem: too little space, a disconnected kitchen, an unused roof, poor daylight, or a plan that no longer suits the way the household lives. We look for changes that make the whole home work better rather than treating an extension or attic conversion as an isolated object.',
    ],
    scope: [
      'Extensions and garden rooms',
      'Attic and loft conversions',
      'Tenement alterations',
      'Internal reordering',
      'Refurbishment',
      'Measured surveys',
      'Feasibility and design',
      'Planning applications where required',
      'Building-warrant information',
      'Technical drawings and specifications',
      'Tender and construction-stage support where appointed',
    ],
    sections: [
      {
        title: 'Understanding the existing home',
        body: [
          'A measured survey records more than room sizes. Floor and ceiling levels, wall thicknesses, window positions, service routes and the visible clues to structure all shape what is practical. In a tenement flat, the shared walls, common services and the close set a framework before any line is drawn.',
          'We use that record to test where a change will make the most difference, which is not always where the problem first appears.',
        ],
      },
      {
        title: 'Design and consent',
        body: [
          'Some alterations need planning permission; many do not. Most need a building warrant. Where a building is listed or in a conservation area, listed-building consent or additional scrutiny may apply. We set out at the beginning which consents are likely to be relevant for the particular property so that the design can respond to them rather than being reworked later.',
          'Design work is developed through plans, sections and material studies at a scale that allows the relationship between new work and the existing house to be judged properly.',
        ],
      },
      {
        title: 'Technical detail',
        body: [
          'Junctions between new and old fabric are where most residential projects succeed or fail: the threshold to a garden room, the head of a new opening in a masonry wall, the point where a new roof meets a sandstone gable. We draw these as coordinated, insulated and drained assemblies, and write specifications that a contractor can price and build from.',
        ],
      },
    ],
    image: placeholder(
      '4x3',
      'sandstone',
      'Rear of a sandstone house with a low timber-lined garden extension',
    ),
    relatedProjectSlugs: [
      'kelvinside-garden-room',
      'pollokshields-tenement-reordering',
      'hyndland-roof-rooms',
    ],
    relatedInsightSlugs: [
      'altering-a-glasgow-tenement-where-to-begin',
      'planning-permission-and-building-warrant-are-not-the-same-thing',
    ],
    seo: {
      title: 'Residential Architecture in Glasgow | Bracken & Roe',
      description:
        'Extensions, attic conversions, tenement alterations and refurbishment in Glasgow, with survey-led design and planning and building-warrant information coordinated around the particular home.',
    },
  },
  {
    slug: 'conservation-listed-buildings',
    number: '02',
    title: 'Conservation & Listed Buildings',
    navLabel: 'Conservation & Listed Buildings',
    summary:
      'Surveys, repair strategies and sensitive alterations to traditional and listed buildings, with close attention to original fabric, stone, lime, windows and appropriate materials.',
    heroHeadline: 'Careful change for buildings with history.',
    intro: [
      'Conservation begins with understanding what is significant, what is failing, and why. The appropriate answer may be repair, adaptation, selective replacement or a new intervention that is deliberately distinguishable but respectful of the existing building.',
    ],
    scope: [
      'Condition and fabric surveys',
      'Conservation-led alteration',
      'Listed-building-consent information',
      'Sandstone and masonry repair strategies',
      'Window and joinery work',
      'Repair schedules',
      'Traditional-material specifications',
      'Planning and building-warrant coordination',
      'Tender information and construction support',
    ],
    supportingCopy: [
      'Where original fabric remains serviceable, the first question should generally be whether it can be retained and repaired. Dense incompatible repairs, uncontrolled water and poorly considered replacement materials can create new problems rather than solve old ones.',
    ],
    sections: [
      {
        title: 'Significance and condition',
        body: [
          'We begin with what the building is and how it has been put together: its plan, its stone, its joinery, its later alterations and its present condition. Understanding significance is not the same as preserving everything; it is the basis for deciding what can change.',
        ],
      },
      {
        title: 'Repair before replacement',
        body: [
          'Traditional masonry, lime mortar and timber windows are usually repairable. A repair strategy deals with causes as well as symptoms: rainwater goods, copes, flashings and open joints often matter more than surface appearance. Replacement is reserved for fabric that can no longer reasonably be retained.',
        ],
      },
      {
        title: 'Consent and information',
        body: [
          'Works affecting the character of a listed building generally require listed-building consent, which is separate from planning permission. We prepare the drawings, schedules and supporting statements that consent applications and building warrants need, and we do not promise an outcome that is the authority’s to decide.',
        ],
      },
    ],
    image: placeholder('4x3', 'stone', 'Close view of weathered red sandstone with lime pointing'),
    relatedProjectSlugs: ['finnieston-shopfront-upper-floors', 'shawlands-sandstone-repair'],
    relatedInsightSlugs: [
      'understanding-category-b-listed-buildings-in-scotland',
      'repairing-traditional-glasgow-sandstone',
    ],
    seo: {
      title: 'Conservation & Listed Buildings | Bracken & Roe',
      description:
        'Condition surveys, repair strategies, listed-building-consent information and sensitive alteration of traditional and listed buildings in Glasgow and across Scotland.',
    },
  },
  {
    slug: 'housing-retrofit',
    number: '03',
    title: 'Housing & Retrofit',
    navLabel: 'Housing & Retrofit',
    summary:
      'Survey-led housing upgrades, fabric-first retrofit, windows, ventilation and repeatable technical information for occupied-home programmes.',
    heroHeadline: 'Practical retrofit for homes that remain in use.',
    intro: [
      'Housing upgrades are as much about existing conditions and repeatable technical decisions as headline performance. We develop survey information, details and specifications that can respond to a group of similar homes while still recording the exceptions.',
    ],
    scope: [
      'Stock-condition and technical surveys',
      'Sample-property surveys',
      'Fabric-first options',
      'External-wall improvements where appropriate',
      'Window programmes',
      'Ventilation coordination',
      'Airtightness and junction detailing',
      'Planning and building-warrant information',
      'Tender drawings and specifications',
      'Phased occupied-housing information',
      'Construction-stage support',
    ],
    sections: [
      {
        title: 'Survey before specification',
        body: [
          'A programme across many homes depends on knowing what is actually there. Sample-property surveys, a survey matrix and a clear record of previous alterations let the typical detail be designed for the typical condition, and let the exceptions be handled deliberately.',
        ],
      },
      {
        title: 'Fabric, windows and ventilation together',
        body: [
          'Window replacement, insulation and airtightness measures change how a home breathes. Extract, background ventilation and moisture behaviour are considered alongside the fabric work, not after it.',
        ],
      },
      {
        title: 'Repeatable details without ignoring exceptions',
        body: [
          'Typical head, jamb, sill, eaves and base details are drawn once and referenced by schedule. Where an opening or junction does not match, the exception is recorded and detailed rather than forced into the standard.',
        ],
      },
      {
        title: 'Working in occupied homes',
        body: [
          'Construction information is sequenced around access, resident notice and the practicalities of working in lived-in property. Phasing, protection and communication are part of the technical package.',
        ],
      },
    ],
    image: placeholder('4x3', 'moss', 'Occupied low-rise housing block with new windows'),
    relatedProjectSlugs: [
      'north-glasgow-window-ventilation-programme',
      'drumchapel-fabric-upgrade',
    ],
    relatedInsightSlugs: [
      'energy-upgrades-in-traditional-buildings',
      'ventilation-when-making-a-home-more-airtight',
    ],
    seo: {
      title: 'Housing & Retrofit Architecture | Bracken & Roe',
      description:
        'Survey-led housing upgrades and fabric-first retrofit for occupied homes: windows, ventilation, junction detailing and repeatable technical information for programmes in Glasgow.',
    },
  },
  {
    slug: 'commercial-community',
    number: '04',
    title: 'Commercial & Community',
    navLabel: 'Commercial & Community',
    summary:
      'Selected cafés, healthcare and workplace fit-outs, community spaces and small commercial alterations where careful use of existing space matters.',
    heroHeadline: 'Small places with public life.',
    intro: [
      'A café, treatment room, office or community space may be modest in area but demanding in use. Layout, access, servicing, acoustics, durability, signage and statutory requirements need to be resolved together.',
    ],
    scope: [
      'Feasibility',
      'Measured survey',
      'Layouts and interior alterations',
      'Accessible arrangements',
      'Servicing coordination',
      'Planning and change-of-use support where relevant',
      'Signage',
      'Building-warrant information',
      'Joinery and detail design',
      'Tender and construction information',
    ],
    sections: [
      {
        title: 'Use, access and servicing',
        body: [
          'Small public spaces succeed on their plan. Entrance levels, an accessible WC, a kitchen or treatment room and the route for drainage, ventilation and power are resolved together so that later changes do not undo the layout.',
        ],
      },
      {
        title: 'Durable interiors',
        body: [
          'Materials are chosen for the way the space will be used and cleaned: retained terrazzo where it survives, linoleum, solid-edged joinery, painted steel and acoustic panels that can take knocks.',
        ],
      },
      {
        title: 'Signage and street presence',
        body: [
          'Signage is designed as part of the frontage rather than added to it, within a controlled zone that respects the building and any conservation-area context.',
        ],
      },
    ],
    image: placeholder('4x3', 'paper', 'Café interior with a glazed screen and perimeter bench'),
    relatedProjectSlugs: ['southside-corner-rooms', 'finnieston-shopfront-upper-floors'],
    relatedInsightSlugs: ['planning-permission-and-building-warrant-are-not-the-same-thing'],
    seo: {
      title: 'Commercial & Community Architecture | Bracken & Roe',
      description:
        'Cafés, healthcare and workplace fit-outs, community rooms and small commercial alterations in Glasgow, resolving layout, access, servicing and signage together.',
    },
  },
];
