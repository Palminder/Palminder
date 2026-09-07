import type { Person } from '@/lib/content/types';
import { placeholder } from './placeholders';

/**
 * Team seed records. STAGING CONTENT UNTIL VERIFIED.
 * Every record is `pending`; none can render in production until the practice verifies
 * the person, and — where the role uses the protected title "architect" or claims a
 * qualification — the entitlement to that title or qualification.
 */
export const team: Person[] = [
  {
    id: 'person-mairi-bracken',
    slug: 'mairi-bracken',
    name: 'Mairi Bracken',
    rolePublic: 'Director',
    roleType: 'director',
    expertise: ['Residential', 'Conservation', 'Briefing and design'],
    bio: 'Mairi’s work focuses on the careful adaptation of existing homes and traditional buildings. She is particularly interested in how a plan can be made clearer without losing the proportions, material character and useful fabric that were already there. Her role combines early conversations with clients, survey-led design development and the coordination of proposals through consent and technical stages.',
    portrait: placeholder('4x5', 'sandstone', 'Portrait of Mairi Bracken, chest-up, natural window light, quiet stone interior', { mediaType: 'portrait' }),
    order: 1,
    verificationStatus: 'pending',
    protectedTitleVerified: false,
    qualificationVerified: false,
  },
  {
    id: 'person-thomas-roe',
    slug: 'thomas-roe',
    name: 'Thomas Roe',
    rolePublic: 'Director',
    roleType: 'director',
    expertise: ['Housing', 'Retrofit', 'Technical delivery'],
    bio: 'Thomas leads work involving housing programmes, retrofit and technical coordination. His focus is on turning survey evidence into practical information: understanding repeated building types, recording exceptions, resolving junctions and developing specifications that can be delivered in occupied properties. He also works across residential and refurbishment projects where buildability and sequencing are central to the design.',
    portrait: placeholder('4x5', 'stone', 'Portrait of Thomas Roe, three-quarter crop, drawing background', { mediaType: 'portrait' }),
    order: 2,
    verificationStatus: 'pending',
    protectedTitleVerified: false,
    qualificationVerified: false,
  },
  {
    id: 'person-ailsa-mclaren',
    slug: 'ailsa-mclaren',
    name: 'Ailsa McLaren',
    rolePublic: 'Senior Architect',
    roleType: 'architect',
    expertise: ['Traditional buildings', 'Listed-building work', 'Repair strategy'],
    bio: 'Ailsa works primarily with traditional and historic buildings, from early condition assessment to alterations and repair packages. Her approach begins with the significance and physical condition of existing fabric, with particular attention to stone, windows, internal finishes and previous interventions. She develops consent information and detailed repair proposals alongside the wider consultant team.',
    portrait: placeholder('4x5', 'paper', 'Portrait of Ailsa McLaren, eye level, lime-plaster interior', { mediaType: 'portrait' }),
    order: 3,
    verificationStatus: 'pending',
    // "Architect" is protected under the Architects Act 1997. Entitlement must be verified
    // with the practice (and against the ARB register) before this record can publish.
    protectedTitleVerified: false,
    qualificationVerified: false,
  },
  {
    id: 'person-jamie-kerr',
    slug: 'jamie-kerr',
    name: 'Jamie Kerr',
    rolePublic: 'Architectural Technologist',
    roleType: 'technologist',
    expertise: ['Building warrant', 'Detailing', 'Specifications'],
    bio: 'Jamie develops the technical information behind the practice’s projects. His work includes measured information, building-warrant packages, construction details, schedules and specifications, with a particular interest in the points where new work meets existing fabric. He works closely with designers and consultants to make sure proposed assemblies remain coherent as projects move toward construction.',
    portrait: placeholder('4x5', 'sandstone', 'Portrait of Jamie Kerr, chest-up, stair background', { mediaType: 'portrait' }),
    order: 4,
    verificationStatus: 'pending',
    protectedTitleVerified: false,
    qualificationVerified: false,
  },
  {
    id: 'person-niamh-odonnell',
    slug: 'niamh-odonnell',
    name: 'Niamh O’Donnell',
    rolePublic: 'Part II Architectural Assistant',
    roleType: 'assistant',
    expertise: ['Survey', 'Drawing', 'Design development', 'Visualisation'],
    bio: 'Niamh supports projects from measured survey and precedent research through design development, drawing and visual communication. She is especially interested in the spatial possibilities of tenements and other constrained existing buildings, where relatively precise changes can alter daylight, circulation and use without unnecessary demolition.',
    portrait: placeholder('4x5', 'stone', 'Portrait of Niamh O’Donnell, three-quarter crop, window reveal', { mediaType: 'portrait' }),
    order: 5,
    verificationStatus: 'pending',
    protectedTitleVerified: false,
    // "Part II" is a stated qualification and must be verified before publication.
    qualificationVerified: false,
  },
  {
    id: 'person-fiona-campbell',
    slug: 'fiona-campbell',
    name: 'Fiona Campbell',
    rolePublic: 'Practice Administrator',
    roleType: 'administrator',
    expertise: ['Enquiries', 'Appointments', 'Project records'],
    bio: 'Fiona coordinates the practical running of the practice, including initial enquiries, appointment arrangements, project records and general studio administration. She is often the first point of contact for a new enquiry and helps make sure project information and communication remain organised as work moves between stages.',
    portrait: placeholder('4x5', 'paper', 'Portrait of Fiona Campbell, chest-up, book and drawing background', { mediaType: 'portrait' }),
    order: 6,
    verificationStatus: 'pending',
    protectedTitleVerified: false,
    qualificationVerified: false,
  },
];
