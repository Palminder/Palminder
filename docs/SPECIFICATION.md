# Bracken & Roe Website — Production Implementation Specification

This specification is the single build authority for the Bracken & Roe website. It supersedes unresolved choices in the supplied brief while preserving the fixed brand, positioning, services, contact details, Glasgow character, portfolio intent, and technical requirements. The finished product must read as a considered architectural-practice website first and a digital product second: confident, useful, image-led, technically literate, restrained, and free of startup conventions.

## Brand, identity and governing decisions

**Brand name:** Bracken & Roe
**Domain:** `brackenroe.co.uk`
**Public email:** `studio@brackenroe.co.uk`
**Telephone:** none; never create, infer, or display one.

**Office address:**

> Bracken & Roe
> Office 1810
> 3 Fitzroy Place, 1/1 Sauchiehall Street
> Finnieston
> Glasgow G3 7RH
> United Kingdom
> **Meetings by appointment.**

Never describe this address as an always-open studio, staffed reception, visitor center, showroom, or walk-in office.

**Primary positioning statement**

> **Architecture rooted in Glasgow.**

**Supporting proposition**

> Bracken & Roe is a Glasgow architectural practice working across residential design, conservation and listed buildings, housing retrofit, and selected commercial and community projects. We combine careful design with a practical understanding of existing buildings, technical delivery and the consent process.

**Brand promise**

> **Careful design. Clear technical thinking. Respect for what is already there.**

Bracken & Roe should occupy the territory between design-led residential studios and larger technical consultancies. Its value is not extravagant form-making or corporate scale. It is the combination of architectural judgment, familiarity with traditional and existing buildings, conservation awareness, retrofit knowledge, and the ability to turn proposals into coordinated drawings, applications, specifications and buildable work.

The primary audiences, in priority order, are private homeowners and property owners; housing associations and residential property managers; community and small commercial organizations; and professional referrers such as surveyors, structural engineers and contractors.

**Tone of voice:** calm, specific, informed, unshowy and direct. Prefer "We began by understanding the existing stonework and drainage" over "We deliver innovative, future-focused solutions." Prefer concrete architectural nouns—stone, lime mortar, rooflight, window reveal, tenement, stair, section, fabric, threshold—to generic abstractions. Avoid "award-winning," "industry-leading," "best-in-class," "passionate," "bespoke solutions," "dream home," "transformational," "sustainable" without qualification, and all unsupported superlatives.

**Authenticity and production gates**

The visual polish of the site must never be achieved by passing invented people, commissions or endorsements off as real. The six team profiles and eight projects later in this specification are complete editorial seed records for development, visual design and staging. Before a public deployment, every record must pass an explicit verification state.

The title **architect** is protected in the UK under the Architects Act 1997, and ARB specifically regulates its use by individuals and businesses. Do not publish a fictional or unverified person as "Architect," "Senior Architect," or otherwise imply registration. Implement `verificationStatus` as a hard publishing gate rather than relying on an editor to remember this rule.

| Content                                                  | Production rule                                                                                          |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Team member                                              | `verificationStatus: verified` required for public publication                                           |
| Role containing "Architect"                              | additionally requires the practice to have verified the person's entitlement to use that protected title |
| "Part II" qualification                                  | verify before public publication                                                                         |
| Project described as completed, on site, or commissioned | `verificationStatus: verified` and `realityType: real-project` required                                  |
| Unverified project                                       | staging only, or publicly and conspicuously labeled **Design study** / **Representative study**          |
| Testimonial                                              | publish only when quote, attribution wording and permission are verified                                 |
| Client name/logo                                         | never invent; publish only with verified permission                                                      |
| Award/accreditation/membership                           | never invent; require verification                                                                       |
| Founding year                                            | do not display unless supplied and verified                                                              |
| Performance or energy-saving statistic                   | require evidence and project approval                                                                    |
| Social account                                           | hide completely until an actual account URL is configured                                                |
| Legal company number/entity name                         | do not invent; add only once confirmed                                                                   |

This avoids the most serious weakness in the original brief: a highly credible design could accidentally make fictional staff and representative projects look like genuine trading history.

**Logo and identity direction**

The identity must feel typographic and architectural rather than illustrative.

The **primary wordmark** is a custom vector lockup reading:

> **Bracken & Roe**

Use an editorial serif construction as the starting point, but redraw the final mark as vectors so the logo is not simply typed text. The "B," "R," and ampersand should carry the distinctive character. The ampersand can be slightly compact, with a controlled tension between curved and constructed strokes suggestive of drawing geometry without turning into a drafting icon.

Create a secondary all-capitals lockup only for tiny technical applications:

> **BRACKEN & ROE**

The **B&R monogram** should be constructed on a geometric grid using shared vertical stems and negative space. It should look plausible on a drawing title block, site sign, embossed notebook or favicon. It must not contain a roof outline, fern, leaf, deer/roe silhouette, skyline, compass, pencil, house icon or other literal architectural cliché.

Logo rules:

| Rule                   | Specification                                                                                                |
| ---------------------- | ------------------------------------------------------------------------------------------------------------ |
| Primary color          | Ink on Paper or White                                                                                        |
| Reverse                | Paper/White on Ink or Moss                                                                                   |
| Accent-logo usage      | do not use Terracotta as the default logo color                                                              |
| Clear space            | at least the cap-height of the "B" around all sides                                                          |
| Minimum wordmark width | 145 px digital                                                                                               |
| Minimum monogram size  | 20 × 20 px                                                                                                   |
| Effects                | no gradients, bevels, shadows, outlines or animation                                                         |
| Distortion             | never stretch, condense or rotate                                                                            |
| Photography            | use only where the surrounding image area provides WCAG-compliant contrast; otherwise place on a solid field |
| Source assets          | master outlined SVG plus editable vector source                                                              |
| Web assets             | wordmark SVG, monogram SVG, favicon SVG, favicon ICO, 180 px Apple touch icon                                |

The favicon at 16 px should use the simplified monogram or custom ampersand, not the full wordmark.

**Identity character:** measured rather than precious; tactile rather than rustic; Scottish through material and urban context rather than tartan, thistles or national motifs.

## Information architecture and page specifications

Use the apex domain as canonical and redirect `www` to it. URLs have no trailing slash.

| Route                                     | Purpose                          | Indexing              |
| ----------------------------------------- | -------------------------------- | --------------------- |
| `/`                                       | Home                             | index                 |
| `/practice`                               | Practice, approach, team, office | index                 |
| `/projects`                               | Complete project index           | index                 |
| `/projects/[slug]`                        | Individual project               | verified content only |
| `/services`                               | Services overview                | index                 |
| `/services/residential`                   | Residential                      | index                 |
| `/services/conservation-listed-buildings` | Conservation                     | index                 |
| `/services/housing-retrofit`              | Housing & retrofit               | index                 |
| `/services/commercial-community`          | Commercial/community             | index                 |
| `/insights`                               | Guidance/article index           | index                 |
| `/insights/[slug]`                        | Individual insight               | index                 |
| `/contact`                                | Enquiry and office information   | index                 |
| `/contact/thanks`                         | Successful form state            | noindex               |
| `/privacy`                                | Privacy notice                   | index                 |
| `/cookies`                                | Cookies/storage notice           | index                 |
| `/accessibility`                          | Accessibility statement          | index                 |
| `404`                                     | Custom not-found state           | noindex               |

**Primary navigation**

Desktop:

`Wordmark | Projects | Services | Practice | Insights | Contact | Discuss a project`

The wordmark returns home. "Discuss a project" links to `/contact#project-enquiry`.

Do not include "Home" in the desktop navigation. No dropdown is necessary for Services: clicking Services opens the overview page, where the four disciplines are presented prominently. This keeps the header architectural rather than corporate.

Desktop header is approximately 82–86 px high, sticky, Paper background with a 1 px low-contrast rule. Do not place the primary navigation over changing photography unless an individual hero has a guaranteed solid contrast field.

Mobile header is 68 px high with wordmark left and a textual **Menu** control right. The menu opens a full-viewport Paper panel with large serif navigation, the enquiry CTA, email, and the four service links. Trap keyboard focus, support Escape, return focus to the trigger on close and lock document scrolling while open.

**Footer**

Use Ink background and Paper text. It contains:

> **Bracken & Roe**
> Architecture rooted in Glasgow.

> `studio@brackenroe.co.uk`

> Office 1810
> 3 Fitzroy Place, 1/1 Sauchiehall Street
> Finnieston
> Glasgow G3 7RH
> United Kingdom
> **Meetings by appointment.**

Then concise navigation for Projects, Services, Practice, Insights, Contact; conditional Instagram and LinkedIn links; Privacy, Cookies and Accessibility; current copyright year. No telephone number, newsletter form, fake credentials or awards.

**Homepage**

The homepage is a business-first editorial sequence. It must not begin with a slideshow, showreel or full-screen logo animation.

**Hero:** use a strong verified Bracken & Roe project image once available. During staging, use licensed Glasgow-context photography and never caption it as practice work.

Eyebrow:

> Glasgow architectural practice

Headline:

> **Architecture rooted in Glasgow.**

Body:

> Bracken & Roe works across residential design, conservation and listed buildings, housing retrofit, and selected commercial and community projects. We bring careful design and practical technical knowledge to existing buildings and new interventions.

Primary CTA: **Discuss a project**
Secondary CTA: **View our work**

Desktop hero layout: copy occupies columns 1–5 and image columns 6–12, with the image extending toward the viewport edge where feasible. Avoid central text floating over the image. Mobile: copy first, then image.

**Introduction section**

Small label: `The practice`

Headline:

> **Working with what is already there.**

Copy:

> Much of our work begins with an existing building: a sandstone house that needs to adapt, a tenement flat with a difficult plan, a listed façade requiring repair, or homes that need fabric and ventilation improvements. We start by understanding the building before deciding what should change.

> That approach carries through from early feasibility and consent to building-warrant information, detailed drawings, specifications and construction support.

Link: **About the practice**

**Services section**

Present four full-width editorial rows, not four rounded icon cards.

`01 Residential`

> Extensions, attic conversions, tenement alterations, internal remodelling and refurbishment, with planning and building-warrant work coordinated around the particular building.

`02 Conservation & Listed Buildings`

> Surveys, repair strategies and sensitive alterations to traditional and listed buildings, with close attention to original fabric, stone, lime, windows and appropriate materials.

`03 Housing & Retrofit`

> Survey-led housing upgrades, fabric-first retrofit, windows, ventilation and repeatable technical information for occupied-home programmes.

`04 Commercial & Community`

> Selected cafés, healthcare and workplace fit-outs, community spaces and small commercial alterations where careful use of existing space matters.

Each row has one relevant image crop or drawing and a restrained arrow link.

**Featured projects**

Heading:

> **Selected work**

Use four verified projects in an asymmetric editorial grid: first project 7 columns wide, second 5; following row reversed. Image comes first, then project title, location, sector and year/status. No hover overlays hiding essential information.

Default featured records once verified: Kelvinside Garden Room, Finnieston Shopfront & Upper Floors, North Glasgow Window & Ventilation Programme, Pollokshields Tenement Reordering.

**Conservation section**

Two-column composition: close masonry photograph and text.

> **Care for existing fabric**

> Traditional buildings rarely benefit from a one-size-fits-all response. We look first at significance, condition, moisture, previous repairs and how the building has been put together. Alterations and repairs can then be designed to retain useful original fabric while addressing the practical requirements of continued use.

CTA: **Conservation & listed buildings**

Scottish listed-building consent is separate from ordinary planning considerations where works affect the character of a listed building, making careful consent language important throughout the site.

**Housing and retrofit section**

Use a technical drawing beside an occupied-housing/context image.

> **Housing work that considers the whole building**

> Window replacement, insulation and airtightness measures do not sit in isolation. Survey information, junctions, existing defects, ventilation, resident access and repeatable details all influence whether an upgrade works in practice.

CTA: **Housing & retrofit**

HES guidance emphasizes a building-specific approach to traditional fabric and the need to maintain adequate ventilation when energy-efficiency interventions reduce uncontrolled air leakage.

**Practice section**

Headline:

> **Small enough to stay close to the work.**

Copy:

> Bracken & Roe is structured as a small practice rather than a large multidisciplinary office. Design, survey information and technical decisions remain closely connected throughout a project, with specialist consultants brought into the team where the work requires them.

Show three portraits on desktop as a teaser only if verified. CTA: **Meet the practice**.

**Process section**

Do not call it a proprietary "four-step framework." Use an architectural working sequence:

| Stage                | Copy                                                                                                                                         |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Survey & brief       | Understand the building, site, constraints and what the project needs to achieve.                                                            |
| Design               | Test layouts, material approaches and the relationship between new work and existing fabric.                                                 |
| Consent & technical  | Prepare the information appropriate to planning, listed-building consent and/or building warrant, then develop coordinated technical detail. |
| Construction support | Where appointed, support tendering and construction with specifications, site information and responses to issues that arise.                |

Add:

> Scope varies by project. We agree the services required before work begins.

**Insights section:** latest three verified Insights cards, with title, category, publication/review date and short dek. CTA **View all Insights**.

**From the Studio:** four CMS-authored visual notes. No live social widget.

**Final CTA**

> **Tell us what you are working on.**

> A short note about the building, location and stage of the project is enough to start.

Buttons: **Discuss a project** and inline email.

**Practice page**

Hero:

> **A small practice with a close understanding of Glasgow's buildings.**

Intro:

> Bracken & Roe works across private homes, traditional and listed buildings, housing programmes, and selected community and commercial spaces. Much of that work involves making careful decisions about buildings that already have a history, structure and material character.

> We combine architectural design with the less visible work that makes projects viable: measured information, consent strategy, technical coordination, details, specifications and communication with the wider project team.

Use three editorial principles rather than corporate "values" cards:

**Read the building.**

> Survey, fabric and context come before a preconceived solution.

**Make the process legible.**

> Clients should understand what is being decided, what requires consent and what information is needed next.

**Detail for long life.**

> Materials and junctions should make sense for the building, the weather and future maintenance.

Then six-person team, working-method imagery, and office/location block.

Do not claim an establishment date, employee count beyond actual team records, professional accreditations, awards or turnover.

**Projects index**

Hero:

> **Projects**

Intro:

> Residential alterations, conservation work, housing retrofit and selected spaces for work and community use.

Filters: `All`, `Residential`, `Conservation`, `Housing & Retrofit`, `Commercial & Community`.

Filters update on the client without changing the meaning or accessibility of the page; all verified projects exist in initial HTML. Provide a visible result count only if useful. Do not use masonry that changes unpredictably as images load.

Cards show image, title, general location, sector and year/status. A project need not disclose a full private residential address.

**Services overview**

Hero:

> **Architectural services for existing buildings, homes and neighbourhoods.**

Intro:

> Projects begin at different points. Some need an early feasibility study; others need consent drawings, technical information or help turning a developed brief into construction work. Bracken & Roe can shape an appointment around the stage and complexity of the project.

Follow with the four service disciplines, a process strip, related projects, and CTA. Never imply that all projects need every statutory application.

**Residential page**

Hero:

> **Homes made to work harder, without losing what makes them worth keeping.**

Intro:

> Residential work often starts with a practical problem: too little space, a disconnected kitchen, an unused roof, poor daylight, or a plan that no longer suits the way the household lives. We look for changes that make the whole home work better rather than treating an extension or attic conversion as an isolated object.

Service scope:

> Extensions and garden rooms; attic and loft conversions; tenement alterations; internal reordering; refurbishment; measured surveys; feasibility and design; planning applications where required; building-warrant information; technical drawings and specifications; tender and construction-stage support where appointed.

Sections: `Understanding the existing home`, `Design and consent`, `Technical detail`, related residential projects, relevant Insights, enquiry CTA.

**Conservation & Listed Buildings page**

Hero:

> **Careful change for buildings with history.**

Intro:

> Conservation begins with understanding what is significant, what is failing, and why. The appropriate answer may be repair, adaptation, selective replacement or a new intervention that is deliberately distinguishable but respectful of the existing building.

Scope:

> Condition and fabric surveys; conservation-led alteration; listed-building-consent information; sandstone and masonry repair strategies; window and joinery work; repair schedules; traditional-material specifications; planning and building-warrant coordination; tender information and construction support.

Supporting copy:

> Where original fabric remains serviceable, the first question should generally be whether it can be retained and repaired. Dense incompatible repairs, uncontrolled water and poorly considered replacement materials can create new problems rather than solve old ones.

HES guidance similarly prioritizes maintenance, repair and material compatibility in traditional buildings, including appropriate lime work and selective rather than wholesale replacement.

Never promise listed-building consent.

**Housing & Retrofit page**

Hero:

> **Practical retrofit for homes that remain in use.**

Intro:

> Housing upgrades are as much about existing conditions and repeatable technical decisions as headline performance. We develop survey information, details and specifications that can respond to a group of similar homes while still recording the exceptions.

Scope:

> Stock-condition and technical surveys; sample-property surveys; fabric-first options; external-wall improvements where appropriate; window programmes; ventilation coordination; airtightness and junction detailing; planning/building-warrant information; tender drawings and specifications; phased occupied-housing information; construction-stage support.

Sections: `Survey before specification`, `Fabric, windows and ventilation together`, `Repeatable details without ignoring exceptions`, `Working in occupied homes`, projects, CTA.

Do not publish predicted U-values, EPC changes, carbon reductions or energy savings unless calculated for an actual project and approved for publication.

**Commercial & Community page**

Hero:

> **Small places with public life.**

Intro:

> A café, treatment room, office or community space may be modest in area but demanding in use. Layout, access, servicing, acoustics, durability, signage and statutory requirements need to be resolved together.

Scope includes feasibility, measured survey, layouts, interior alterations, accessible arrangements, servicing coordination, planning/change-of-use support where relevant, signage, building-warrant information, joinery/detail design, tender and construction information.

**Insights index**

Hero:

> **Insights**

Intro:

> Practical notes on altering, repairing and improving buildings in Glasgow and across Scotland.

Cards show article title, category, 1–2 sentence dek, publication date, last-reviewed date when applicable and reading time calculated from actual word count. Do not show fake authors or arbitrary read-time values.

**Insight article template**

Use a narrow reading column of approximately 680–760 px, with a wider hero and occasional figures. Sequence:

breadcrumb → category → H1 → dek → author → publication/review metadata → hero → article → contextual callout → official sources/further reading → related service → related articles → enquiry CTA.

Add a standing note near the end:

> This article provides general architectural guidance rather than advice for a specific property. Consent and technical requirements depend on the building, location and proposed work.

**Contact**

Hero:

> **Tell us what you are working on.**

Intro:

> A short note is enough to start. Tell us where the project is, what you are considering and the stage you have reached. We'll reply by email.

Place form first and office information second on desktop; single column on mobile.

Office copy:

> **Glasgow**
> Office 1810
> 3 Fitzroy Place, 1/1 Sauchiehall Street
> Finnieston
> Glasgow G3 7RH
> United Kingdom
>
> **Meetings by appointment.**
> `studio@brackenroe.co.uk`

Do not embed Google Maps. A normal external **View location in maps** link may be configured from the supplied address. This avoids both a visually generic contact-page map and unnecessary third-party code.

**Privacy, Cookies and Accessibility:** straightforward editorial pages sharing the article reading width. No decorative hero photography is needed.

**404**

> **That page isn't here.**

> The page may have moved, or the address may be incorrect.

Buttons: **View projects** / **Return home**.

**Contact success**

> **Thank you. Your enquiry has been sent to Bracken & Roe.**

> We'll reply by email.

Do not promise a response within an invented number of hours or days.

## Portfolio, people and editorial content

The following team and project records are deliberately complete enough to build the layouts and CMS immediately. They are **staging content until verified**. The production build must make that distinction technically enforceable.

**Team seed records**

| Name            | Staging role                                                              | Expertise                                                    | Biography                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| --------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mairi Bracken   | Director                                                                  | Residential; conservation; briefing and design               | Mairi's work focuses on the careful adaptation of existing homes and traditional buildings. She is particularly interested in how a plan can be made clearer without losing the proportions, material character and useful fabric that were already there. Her role combines early conversations with clients, survey-led design development and the coordination of proposals through consent and technical stages.                           |
| Thomas Roe      | Director                                                                  | Housing; retrofit; technical delivery                        | Thomas leads work involving housing programmes, retrofit and technical coordination. His focus is on turning survey evidence into practical information: understanding repeated building types, recording exceptions, resolving junctions and developing specifications that can be delivered in occupied properties. He also works across residential and refurbishment projects where buildability and sequencing are central to the design. |
| Ailsa McLaren   | Senior Architect — **protected-title verification required**              | Traditional buildings; listed-building work; repair strategy | Ailsa works primarily with traditional and historic buildings, from early condition assessment to alterations and repair packages. Her approach begins with the significance and physical condition of existing fabric, with particular attention to stone, windows, internal finishes and previous interventions. She develops consent information and detailed repair proposals alongside the wider consultant team.                         |
| Jamie Kerr      | Architectural Technologist                                                | Building warrant; detailing; specifications                  | Jamie develops the technical information behind the practice's projects. His work includes measured information, building-warrant packages, construction details, schedules and specifications, with a particular interest in the points where new work meets existing fabric. He works closely with designers and consultants to make sure proposed assemblies remain coherent as projects move toward construction.                          |
| Niamh O'Donnell | Part II Architectural Assistant — **qualification verification required** | Survey; drawing; design development; visualisation           | Niamh supports projects from measured survey and precedent research through design development, drawing and visual communication. She is especially interested in the spatial possibilities of tenements and other constrained existing buildings, where relatively precise changes can alter daylight, circulation and use without unnecessary demolition.                                                                                    |
| Fiona Campbell  | Practice Administrator                                                    | Enquiries; appointments; project records                     | Fiona coordinates the practical running of the practice, including initial enquiries, appointment arrangements, project records and general studio administration. She is often the first point of contact for a new enquiry and helps make sure project information and communication remain organized as work moves between stages.                                                                                                          |

Do not expose an ARB number, RIAS/RIBA membership, qualification, award, university or prior employer unless individually verified.

**Portrait direction**

Commission or produce six coherent 4:5 portraits. Camera language: eye level, approximately 50–70 mm full-frame equivalent, chest-up or three-quarter crop, natural side/window light, moderate depth of field and neutral expression. Wardrobe should use charcoal, navy, cream, brown, olive and stone; no matching uniforms, ties or exaggerated "creative" outfits.

Backgrounds should suggest material and architectural context without pretending the virtual office is a staffed studio: a quiet stone or lime-plaster interior, book/drawing background, stair or window reveal. Do not manufacture a fake open-plan Bracken & Roe office full of staff.

Keep gaze direction and framing varied enough to feel real but grade all portraits consistently. No crossed-arm executive poses, hard hats, scale rulers, coffee-cup clichés or people pointing at plans.

**Project publication rule**

Each project record includes:

`realityType = real-project | design-study | representative-study`
`verificationStatus = draft | pending | verified`

A project with `real-project` cannot be rendered in production unless `verificationStatus === verified`. A design study can be published only if **Design study** is visibly displayed beside its status and in relevant metadata. Synthetic imagery must be labeled **Visualisation**, never "Completed view."

**Kelvinside Garden Room — Kelvinside, Glasgow — Residential**

Staging status: `Completed 2025`, requiring verification.

**Brief:** Adapt a late-Victorian red-sandstone semi-detached home whose rear kitchen and service rooms had little relationship with the garden. The brief asks for a larger kitchen and dining room, a practical utility zone and better daylight without allowing a new extension to compete with the scale of the original house.

**Existing building:** The principal rooms retain strong proportions and substantial masonry, while incremental work at the rear has produced a fragmented plan and abrupt garden threshold.

**Architectural response:** Reorder the existing rear rooms before adding a compact garden pavilion. Keep the new volume visually below the main sandstone house, use deep openings to mediate between old masonry and new joinery, and introduce high-level light so that daylight reaches beyond the immediate extension.

**Services:** measured survey; feasibility; concept and developed design; planning work as required; building-warrant information; consultant coordination; technical and tender drawings; construction support where appointed.

**Materials and technical emphasis:** repair retained sandstone with compatible methods; dark metal-framed glazing; timber lining and fixed joinery; carefully insulated threshold and roof junctions; rainwater detailing designed as part of the elevation.

**Outcome copy:** The intervention is intended to make the whole ground floor read more coherently, with the new room acting as a continuation of the house rather than a detached glazed object.

**Required imagery:** street/stone context; existing rear elevation; before/after ground-floor plan; garden elevation; interior toward garden; interior back toward original house; roof/clerestory section; masonry-to-new-work junction; material detail.

**Pollokshields Tenement Reordering — Pollokshields, Glasgow — Residential**

Staging status: `Completed 2024`, requiring verification.

**Brief:** Rework a c.1900 red-sandstone tenement flat whose generous principal rooms contrast with a fragmented rear kitchen, box room and service spaces. Create a larger everyday kitchen/dining room and a flexible work/guest space while retaining original doors, cornice and floor fabric where serviceable.

**Response:** Move the kitchen into the larger rear room and form one controlled structural opening to improve movement and borrowed light. Reuse the former kitchen as a compact utility/study space. New full-height joinery absorbs storage and services so that retained rooms remain visually quiet.

**Technical considerations:** structural opening and support; fire/escape implications where relevant; ventilation and extract routes; repaired plaster and cornice; retained timber floorboards; service coordination within new cabinetry.

**Required imagery:** tenement street context; existing-plan drawing; proposed plan; principal room; kitchen long view; opening and threshold; joinery detail; retained cornice/floor detail; concise axonometric showing old/new.

**Hyndland Roof Rooms — Hyndland, Glasgow — Residential**

Staging status: `Completed 2025`, requiring verification.

**Brief:** Create useful accommodation within the pitched roof above a top-floor tenement flat while protecting the character of the roofscape.

**Existing condition:** Timber roof structure, chimney masses and restricted headroom produce a series of usable and unusable zones rather than one open loft.

**Response:** Position the stair and new rooms around the existing structural logic rather than trying to erase it. Locate rooflights on less visually sensitive roof pitches and use carefully sized openings instead of an over-scaled dormer. Treat fire, structure, insulation, moisture risk and ventilation as integrated constraints from the beginning.

**Materials:** retained/strengthened timber where viable, insulated roof build-ups appropriate to the verified construction, plaster finishes and painted timber joinery.

**Imagery:** surrounding roofscape; existing attic; stair; sectional perspective through ridge; floor plan; rooflight detail; completed/visualized bedroom; bathroom; retained timber detail.

**Finnieston Shopfront & Upper Floors — Finnieston, Glasgow — Conservation / Adaptive Reuse**

Staging status: `Completed 2023`, requiring verification.

**Brief:** Repair the street presence of a late-19th-century tenemental commercial unit whose shopfront and upper façade have been altered and patched over time, while adapting the ground floor for flexible commercial use.

**Response:** Establish a new shopfront composition from the proportions and structural bays of the existing frontage rather than applying a historic pastiche. Define a controlled zone for signage, repair masonry selectively and route new internal services with minimal impact on retained fabric.

**Materials:** compatible stone repairs and lime mortar where appropriate; painted timber and metal shopfront elements; restrained signboard; durable linoleum or terrazzo repair inside.

**Imagery:** Finnieston urban context; archival/existing-style survey elevation; proposed elevation; full shopfront; signage and joinery detail; stone repair; interior; section through façade/service zone.

**Shawlands Sandstone Repair — Shawlands, Glasgow — Conservation**

Staging status: `Completed 2024`, requiring verification.

**Brief:** Develop a condition-led repair package for an 1890s red-sandstone tenement showing open joints, localized surface loss and previous dense repairs.

**Response:** Map observed defects before specifying treatment. Address water and rainwater interfaces; remove failing incompatible repairs selectively; repoint appropriate joints; use localized stone indents or replacement only where retention is no longer technically reasonable.

**Services:** close inspection/condition survey; annotated elevations; repair schedule; sample requirements; drawings and specification; tender assistance; construction inspections where appointed.

**Outcome language:** avoid "restored to as-new condition." The aim is to retain sound original masonry, improve weathering performance and establish a maintainable repair approach.

**Imagery:** annotated elevation; open-joint close-up; previous repair; mortar sample panel; stone indent process; scaffold/site photograph; rainwater interface; completed repaired area.

**North Glasgow Window & Ventilation Programme — North Glasgow — Housing & Retrofit**

Staging status: `Completed 2026`, requiring verification.

Seed programme: 118 occupied homes in four low-rise blocks. Never retain this number publicly unless verified.

**Brief:** Coordinate window improvements across a repeated housing type while addressing variable existing conditions, ventilation and resident access.

**Response:** Develop a survey matrix and sample-home strategy before finalizing repeatable details. Record exceptional openings rather than forcing them into a standard solution. Consider extract, background ventilation and airtightness alongside window work; sequence construction information around occupied access.

**Services:** surveys; options appraisal; typical and exception details; statutory information as required; tender drawings; window schedules; ventilation coordination; construction-stage support.

**Imagery:** block context; survey matrix; annotated window typology; plan/elevation; head/jamb/sill detail; extract/background-ventilation diagram; sample installation; safely managed progress view.

No fabricated energy saving or resident-satisfaction figures.

**Drumchapel Fabric Upgrade — Drumchapel, Glasgow — Housing & Retrofit**

Staging status: `On site 2026`, requiring verification.

Seed programme: 72 homes in six two- and three-story postwar blocks. Verify or remove quantities.

**Brief:** Improve envelope condition and thermal performance while homes remain occupied, using a coherent palette and robust junctions rather than treating external insulation as a superficial façade exercise.

**Response:** Repair significant defects first. Where technically appropriate, coordinate mineral-wool external wall insulation with window reveals, eaves, ground conditions, services, rainwater goods and ventilation. Use elevation studies to make necessary changes to the building's appearance deliberate.

**Imagery:** existing blocks; condition map; thermal/junction diagram; elevation study; wall/window section; eaves/base detail; sample panel; construction progress.

**Southside Corner Rooms — Glasgow Southside — Commercial & Community**

Staging status: `Completed 2025`, requiring verification.

**Brief:** Adapt a former corner shop into a small café and community room able to operate during the day and host meetings or events in the evening.

**Existing building:** A deep ground-floor unit with a strong corner frontage but blocked rear light, accumulated fit-out layers and limited accessible facilities.

**Response:** Recover the main volume, concentrate servicing into a defined spine and use an internal glazed screen to borrow light deeper into the plan. Integrate seating and storage into robust perimeter joinery. Address entrance levels, accessible WC provision, acoustics, lighting, kitchen servicing and signage as parts of the architecture rather than afterthoughts.

**Materials:** retained terrazzo where viable; linoleum; timber veneer or solid-edged joinery; painted steel; wood-wool acoustic panels; modest externally readable signage.

**Imagery:** street corner; before; plan; interior wide view; glazed divider; bench/joinery; signage; material junction; accessible entrance/WC detail.

**Project-page template**

Every project follows the same information hierarchy but allows images to produce a different rhythm:

1. breadcrumb;
2. full-width or 8/12-column hero;
3. project title;
4. location / sector / verified year-status;
5. one-sentence project summary;
6. concise fact rail;
7. `Brief`;
8. first image pair;
9. `Existing building`;
10. existing/proposed drawing;
11. `Architectural response`;
12. major project image;
13. `Technical & materials`;
14. detail/section sequence;
15. `Outcome`;
16. related service;
17. previous/next project;
18. enquiry CTA.

Project facts are limited to information that actually helps: location, sector, status/year, building type and Bracken & Roe services. Do not manufacture construction cost, floor area, contractor, structural engineer or client.

Plans, sections and elevations appear on Paper backgrounds with figure-style captions such as:

> **Drawing 03 — Proposed ground-floor plan**
> Existing masonry retained in charcoal; new work shown with a controlled accent hatch.

Image captions explicitly differentiate:

`Existing condition`
`Construction progress`
`Visualisation`
`Proposed plan`
`Section`
`Material study`
`Completed view` — only for real verified photography.

**Project visualisation rules**

Build each synthetic project from one consistent architectural model/reference set. Do not generate each image independently and accept changes to windows, roof geometry, material joints or furniture layout between views.

Exterior viewpoint: 35–50 mm equivalent, verticals corrected, Glasgow daylight/overcast conditions appropriate but not theatrically gloomy. Interior: approximately 24–35 mm equivalent, realistic daylight and restrained practical lighting. Avoid hyper-gloss rendering, implausibly empty spaces, perfectly arranged "AI lifestyle" props, impossible stone textures or excessive depth-of-field blur.

Project drawings should be genuinely legible graphic assets, not generative pseudo-drawings filled with nonsense dimensions.

**Testimonials**

Launch with **no testimonial section** unless genuine approved material exists. The CMS may support testimonials, but the component renders only verified records.

Do not use stars. Preferred future treatment:

> "Actual approved quote goes here."

> — Client, residential project, West End

Even a generic attribution such as "Residential client, West End" must be true and approved.

**From the Studio**

This is a CMS-curated editorial stream, not an Instagram embed. Each record contains one image/drawing, a date, one concise observation and one category:

`Site` · `Drawing` · `Detail` · `Material` · `Glasgow`

Examples of the editorial tone:

> **Detail**
> Testing how a new window reveal meets existing sandstone before the typical detail is repeated.

> **Drawing**
> Existing and proposed plans overlaid to check how little fabric needs to change.

> **Material**
> A repair sample is useful because "matching stone" is not a single color or texture.

> **Glasgow**
> Deep window openings do a great deal of the visual work on a sandstone façade.

Seed at least eight studio notes so the homepage never looks like it has an empty social feed. Show four on Home. No likes, follower counts, timestamps such as "2h ago," verification badges or fake engagement.

Instagram and LinkedIn should be plain outbound links, hidden when their URLs are unset. Do not load platform scripts, previews or trackers merely to show the accounts.

**Insights editorial set**

The guidance must use Scottish terminology. Planning permission and building warrant are distinct systems: planning addresses matters such as development, siting, use and amenity, while a building warrant deals with compliance of the submitted design with building standards. The current Scottish domestic technical handbook should be checked at article review time; the 2026 edition applies to relevant warrant applications/work from 6 April 2026.

**Altering a Glasgow tenement: where to begin**

Dek:

> A practical starting point for changing a traditional tenement flat, from shared fabric and structure to consent, services and buildability.

Article structure and core copy:

> A tenement alteration rarely starts with a blank plan. Floors, structural walls, chimney breasts, common services, windows and shared parts already establish a strong framework. Before deciding which wall should move, establish what is private, what is common and how the proposed work interacts with the wider building.

> A measured survey should record more than room dimensions. Floor and ceiling levels, wall thicknesses, windows, doors, service routes and visible structural clues can affect what is practical. Where a proposal includes a new opening, structural advice may be needed early enough for the architectural design to respond to it rather than treating structure as a late correction.

Then cover: common/shared elements; conservation-area/listed status; moving kitchens and wet services; structural openings; fire/escape implications; planning/listed-building consent where relevant; building warrant; contractor access in occupied closes; information useful at a first consultation.

Conclusion:

> The best first step is not deciding what an extension or opening should look like. It is building an accurate picture of what is there and which constraints are genuinely fixed.

**Planning permission and a building warrant are not the same thing**

Dek:

> Two different Scottish systems are often discussed as though they were interchangeable. They answer different questions.

Core copy:

> Planning and building standards deal with different aspects of a project. A proposal may need both, one or—in limited circumstances—neither. A planning decision does not mean the construction automatically satisfies building regulations, and a building warrant does not replace planning approval where planning permission is required.

Cover: what planning considers; what a warrant considers; listed-building consent as another consent route where applicable; typical home alterations; why sequencing matters; why requirements must be checked for the actual property.

Do not publish a simplistic table that says "extension = always planning" or similar.

**Understanding Category B listed buildings in Scotland**

Dek:

> What Category B means, why listing is more than a façade designation, and how an alteration can begin with significance rather than style.

Core copy:

> Scotland uses Categories A, B and C to indicate the relative architectural or historic interest of listed buildings. Category B covers buildings that are major examples of a particular period, style or type, including examples that may have been altered. The category does not mean that only a building's street façade matters.

Explain identifying important fabric, interiors and later changes; repair versus alteration; listed-building consent; drawings and supporting information; traditional materials; early discussion where proposals are sensitive.

**Repairing traditional Glasgow sandstone**

Dek:

> Good masonry repair starts with water, condition and compatibility—not with making every stone look new.

Core copy:

> A weathered sandstone façade is not automatically a defective one. Survey work should distinguish natural weathering from open joints, unstable material, failed previous repairs and defects that are allowing water to remain in the wall.

> A repair strategy should deal with causes as well as symptoms. Rainwater goods, copes, flashings and open joints may matter more than surface appearance. Where mortar or stone repair is required, compatibility with the existing masonry is important; wholesale hard cementitious replacement can be inappropriate for traditional construction. HES guidance emphasizes repair, compatible materials and traditional methods rather than unnecessary replacement.

Cover defect mapping, lime mortar, stone indent/replacement thresholds, cleaning caution, sample panels and maintenance.

**Energy upgrades in traditional buildings**

Dek:

> Traditional buildings can often be improved, but moisture, ventilation and existing fabric need to be considered alongside headline thermal performance.

Core copy:

> Begin with condition. Persistent leaks, defective pointing or damaged rainwater goods should not be concealed behind an insulation intervention. Straightforward maintenance and draught reduction may also be part of the first stage.

> Traditional construction behaves differently from many modern sealed assemblies. An intervention therefore needs to respond to the actual wall, roof, floor and window construction rather than applying a standard build-up simply because it reaches a theoretical U-value.

Cover maintenance; roofs and floors; draughtproofing; existing windows; secondary glazing where appropriate; wall-insulation risk; thermal bridges; moisture; consents; staged upgrades. HES guidance supports building-specific retrofit and careful treatment of traditional fabric.

**Ventilation when making a home more airtight**

Dek:

> Window replacement, draughtproofing and insulation can change how air moves through a home. Ventilation needs to be considered at the same time.

Core copy:

> Uncontrolled leakage and designed ventilation are not the same thing. Reducing drafts can improve comfort, but removing incidental air paths without reviewing extract and background ventilation can alter moisture and indoor-air conditions.

> Survey existing fans, air paths, wet rooms and window arrangements before specifying replacement elements. The appropriate response depends on the dwelling, occupancy assumptions, existing systems and proposed degree of intervention.

Cover kitchens and bathrooms; background air; window replacement; airtightness; moisture; commissioning; occupant information; coordination with current building standards. HES explicitly cautions that energy upgrades need to retain adequate ventilation.

Every Insight must have `publishedAt`, `reviewedAt`, real verified author or `Bracken & Roe Studio`, article sources, related service/project and a review flag. Guidance touching regulation should be reviewed periodically rather than treated as evergreen.

## Visual system, components and responsive behavior

**Color system**

| Token          |       Hex | Primary use                         |
| -------------- | --------: | ----------------------------------- |
| `--paper`      | `#F3F0E8` | principal site background           |
| `--ink`        | `#242722` | body text, strong rules             |
| `--moss`       | `#405448` | primary CTA, selected states        |
| `--sandstone`  | `#D5C2A3` | sectional backgrounds, material cue |
| `--stone`      | `#C8C2B6` | borders, muted surfaces             |
| `--terracotta` | `#8C4F3D` | rare editorial accent               |
| `--white`      | `#FBFAF6` | clean alternate surface             |
| `--deep-ink`   | `#171916` | footer / strongest dark field       |

Paper/Ink is approximately 13:1 contrast, Paper/Moss approximately 7:1 and Paper/Terracotta approximately 5.6:1, making these appropriate candidates for normal text when used as specified against those backgrounds; final implementation must still run automated and manual WCAG checks. WCAG 2.2 is the target standard.

Stone and Sandstone are **not** body-copy colors. Use them as backgrounds, dividers and nonessential graphic fields.

Never create "design system rainbow" variants. Most pages should visually consist of Paper, Ink and photography; Moss appears for calls to action and Terracotta for an occasional drawing/caption cue.

**Typography**

Use open, self-hostable web fonts for the build:

`Newsreader` — display/editorial serif.
`Inter` — navigation, labels, body, forms and metadata.

Load using `next/font` or self-hosted font files, with appropriate subsets and `font-display: swap`. The logo remains a custom SVG and must not rely on Newsreader.

| Style       | Desktop / responsive value        | Line height |
| ----------- | --------------------------------- | ----------: |
| Display     | `clamp(3.5rem, 7vw, 6.5rem)`      |      `0.95` |
| H1          | `clamp(2.8rem, 5vw, 5rem)`        |      `1.00` |
| H2          | `clamp(2.1rem, 3.5vw, 3.75rem)`   |      `1.05` |
| H3          | `clamp(1.5rem, 2vw, 2rem)`        |      `1.15` |
| Lead        | `clamp(1.25rem, 1.6vw, 1.625rem)` |      `1.42` |
| Body large  | `1.1875rem`                       |       `1.6` |
| Body        | `1.0625rem`                       |      `1.65` |
| Small/meta  | `0.875rem`                        |      `1.45` |
| Micro label | `0.8125rem`                       |      `1.35` |

Display serif is regular weight. Do not make every heading italic. A restrained italic can be used for a project location, pull quote or short editorial phrase.

Small metadata may use `letter-spacing: 0.06–0.08em`; do not letter-space normal paragraphs.

Long editorial copy has `max-width: 70ch`; Insight body ideal width is nearer 65–68ch.

**Grid**

Base spacing unit: 8 px, with useful tokens at 4, 8, 12, 16, 24, 32, 48, 64, 96, 128 and 160 px.

| Viewport  | Grid                                 | Gutter | Gap      |
| --------- | ------------------------------------ | ------ | -------- |
| ≥1440     | 12 columns, max content 1320–1360 px | 64 px  | 24–32 px |
| 1200–1439 | 12 columns                           | 48 px  | 24 px    |
| 1024–1199 | 8 columns                            | 40 px  | 24 px    |
| 768–1023  | 8 columns                            | 32 px  | 20 px    |
| 640–767   | 4 columns                            | 24 px  | 16 px    |
| <640      | 4 columns                            | 20 px  | 16 px    |

Full-bleed image modules may extend beyond the 1320 px text grid but should still align a meaningful edge to the architectural grid.

Vertical section spacing: 112–144 px large desktop, 80–104 px tablet, 56–72 px mobile. Dense metadata areas may be tighter.

**Surface treatment**

Use almost no drop shadows. Cards are delineated through spacing, photography, typography and thin rules rather than floating white boxes. Border radii: 0–4 px. Buttons: 2 px or square. Do not use ubiquitous 16–24 px rounded corners or pill chips.

Rules are `1px solid` using Ink at approximately 15–20% opacity or Stone.

**Image ratios**

| Asset                 | Preferred ratio                            |
| --------------------- | ------------------------------------------ |
| Homepage/project hero | approximately 16:10 or intrinsic landscape |
| Project-index card    | 4:3 desktop; 3:2 or 4:3 mobile             |
| Team portrait         | 4:5                                        |
| Context street image  | 3:2                                        |
| Masonry/detail        | 1:1 or 4:5                                 |
| Drawings              | use natural sheet ratio                    |
| Insight card          | 4:3                                        |
| Studio note           | 1:1 / 4:5 / 3:2 depending source           |

Never crop drawings merely to force a consistent card ratio.

Photography should retain believable Glasgow weather, stone color and interior material. Avoid a universal monochrome treatment. If context photographs need cohesion, use very light tonal correction rather than a visible "brand filter."

**Animation**

Animation is subordinate to architecture.

Page elements may transition opacity and translate at most 8 px over approximately 180–260 ms using CSS. Perform a reveal once, not every time content re-enters the viewport.

Navigation hover: underline/rule movement or small arrow translation of 2–4 px.
Project-card hover: subtle image scale, maximum 1.015, 300–400 ms.
Buttons: color/rule change; no bounce or large scaling.
No scroll-jacking, parallax, magnetic buttons, custom cursors, marquee text, spinning monograms, autoplay background video or artificial loading screen.

When `prefers-reduced-motion: reduce` is active, remove nonessential transforms, smooth scrolling and entrance animations.

**Reusable component inventory**

| Component         | Required behavior                          |
| ----------------- | ------------------------------------------ |
| `SiteHeader`      | sticky, responsive, accessible nav         |
| `MobileMenu`      | focus-managed dialog/navigation            |
| `SiteFooter`      | address, email, conditional socials, legal |
| `Wordmark`        | SVG variants                               |
| `Button`          | primary / secondary / text-link            |
| `Breadcrumbs`     | project/service/insight hierarchy          |
| `PageHero`        | text-first; optional image                 |
| `EditorialIntro`  | eyebrow + serif heading + body             |
| `ServiceRow`      | numbered discipline, summary, media, link  |
| `ProjectCard`     | image + factual metadata                   |
| `ProjectGrid`     | asymmetric featured or regular index       |
| `ProjectFacts`    | definition-list semantics                  |
| `MediaFigure`     | image/drawing + caption + credit           |
| `ImagePair`       | complementary figures                      |
| `DrawingFigure`   | non-cropped drawing presentation           |
| `ZoomableDrawing` | optional keyboard-accessible dialog        |
| `TeamCard`        | portrait + role + bio                      |
| `InsightCard`     | title/dek/metadata                         |
| `ArticleMeta`     | author/date/review/read time               |
| `Callout`         | restrained guidance note                   |
| `StudioNoteCard`  | image/category/date/note                   |
| `Testimonial`     | verified records only                      |
| `ProcessSequence` | four architectural stages                  |
| `EnquiryForm`     | progressively enhanced accessible form     |
| `FormField`       | persistent label/helper/error              |
| `FileUpload`      | optional validated file                    |
| `OfficeBlock`     | fixed address + appointment wording        |
| `CTASection`      | enquiry/email action                       |
| `FilterBar`       | project filters                            |
| `ConsentControls` | only if nonessential technologies enabled  |
| `EmptyState`      | never expose editor/debug wording          |
| `NotFound`        | custom 404                                 |

Avoid installing a general-purpose UI component library that imposes SaaS aesthetics. Headless primitives may be used only for genuinely complex accessibility behavior such as a dialog.

**Responsive rules**

Homepage asymmetric compositions collapse to one column with text before or directly adjacent to its related image. Do not turn core content into swipe carousels.

Featured project grids become one column below 768 px.

Team grid: three columns at ≥1024, two columns from 640–1023, one column below 640.

Service rows change from side-by-side image/text to text then image.

Project pages retain a full single-column story on mobile. Facts use a two-column definition list when space permits and one column at narrow widths.

Forms may use two columns for name/email and selected short fields above 768 px, but project description, upload, privacy and submit action are full width. Mobile is entirely one column.

Drawings scale to container width. Provide an accessible zoom view if fine annotations cannot otherwise be read; do not solve this with uncontrolled horizontal scrolling.

Buttons and navigation controls should target at least 44 × 44 px in this design even where the formal WCAG 2.2 minimum target-size criterion is smaller. WCAG 2.2 also adds requirements including Focus Not Obscured and Target Size (Minimum), so sticky UI must never hide the focused control.

## CMS, forms and technical implementation

**Application stack**

Build as a modern, mostly server-rendered content site rather than a client-side application.

| Layer               | Decision                                                                                         |
| ------------------- | ------------------------------------------------------------------------------------------------ |
| Framework           | Next.js App Router                                                                               |
| Framework version   | patched Next.js `16.3.4` or later compatible 16.x Active LTS release current at the actual build |
| Language            | TypeScript, `strict: true`                                                                       |
| React               | version supported by selected Next.js release                                                    |
| Styling             | Tailwind CSS plus CSS custom properties for brand tokens                                         |
| CMS                 | Sanity                                                                                           |
| CMS integration     | `next-sanity`, GROQ, generated TypeScript types                                                  |
| Validation          | Zod                                                                                              |
| Form endpoint       | server Route Handler                                                                             |
| Transactional email | Resend                                                                                           |
| Abuse defense       | Cloudflare Turnstile + honeypot + rate limiting                                                  |
| Animation           | CSS only unless a genuine unmet requirement emerges                                              |
| Package manager     | pnpm                                                                                             |
| Hosting             | Vercel                                                                                           |
| Source              | Git repository with protected production branch                                                  |

Next.js 16.3.4 was the current listed release during this specification's preparation, and Next.js published security updates in August 2026 that required applications to move to patched releases. Treat "latest patched compatible release" as a deployment gate rather than blindly preserving a package-lock version.

Use Server Components by default. Client Components are justified for mobile menu behavior, project filtering, form enhancement, consent controls and optional drawing zoom. Do not hydrate ordinary project/article prose.

Use static generation for stable editorial pages with CMS webhook/tag-based revalidation. Provide Sanity draft-mode preview.

Use Next's image and metadata facilities for responsive images, sizing, lazy loading where appropriate, canonical metadata, icons, Open Graph output, `robots.txt` and sitemap generation.

**Repository shape**

```text
src/
  app/
    (site)/
      page.tsx
      practice/
      projects/
      services/
      insights/
      contact/
      privacy/
      cookies/
      accessibility/
    api/
      enquiry/
      revalidate/
    not-found.tsx
    sitemap.ts
    robots.ts
    layout.tsx
  components/
    brand/
    layout/
    projects/
    editorial/
    forms/
    media/
  emails/
  lib/
    seo/
    forms/
    security/
    content/
  sanity/
    schemas/
    queries/
    types/
  styles/
public/
  brand/
  icons/
```

**CMS model**

Sanity is a good fit because project and editorial content can be structured independently of the interface; its Next.js integration supports typed content querying and structured content patterns.

Do **not** create an unrestricted drag-and-drop page builder. Architecture sites become inconsistent quickly when every page can invent its own layout. Use a constrained set of approved modules.

| Schema          | Important fields                                                                                                                                                                                                             |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `siteSettings`  | brandName, domain, publicEmail, structured address, appointmentNote, social URLs, default SEO, default OG, legal entity fields, analytics mode                                                                               |
| `person`        | name, slug, rolePublic, roleType, bio, expertise, portrait, portraitAlt, order, verificationStatus, optional verified professional-reference field                                                                           |
| `service`       | title, slug, shortIntro, hero, lead, modularBody, serviceScope[], relatedProjects[], relatedInsights[], SEO                                                                                                                  |
| `project`       | title, slug, locationDisplay, area, sector, status, year, realityType, verificationStatus, summary, brief, context, response, services[], materials[], technical, outcome, hero, gallery[], drawings[], featured, order, SEO |
| `insight`       | title, slug, dek, category, body, author/reference or studio, publishedAt, reviewedAt, hero, officialSources[], relatedServices[], relatedProjects[], disclaimer, verificationStatus, SEO                                    |
| `studioNote`    | date, category, shortText, media, alt, relatedProject, optionalSocialURL, published                                                                                                                                          |
| `testimonial`   | quote, attribution, descriptor, consentConfirmed, verified, relatedProject                                                                                                                                                   |
| `assetMetadata` | sourceType, creator, sourceIdentifier, license, rightsCheckedAt, contextOnly, synthetic, caption, alt                                                                                                                        |
| `redirect`      | sourcePath, destinationPath, permanent                                                                                                                                                                                       |
| `legalDocument` | type, effectiveDate, reviewedAt, body                                                                                                                                                                                        |

Approved page-body modules:

`RichText`
`FullWidthImage`
`ImagePair`
`ImageText`
`Drawing`
`Facts`
`Callout`
`ProjectSelection`
`StudioNotes`
`CTA`

Validation rules must reject publication where: project/person verification fails; a required image has no alt/caption policy value; a slug duplicates another record; an external image lacks rights metadata; a synthetic project image lacks its media type label; an Insight touching regulation has neither a published nor review date.

**Enquiry form**

Fields, in order:

| Field                     | Rule                                                                                                                                      |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Name                      | required; 2–100 chars                                                                                                                     |
| Email                     | required; valid email; max 254 chars                                                                                                      |
| Project postcode or area  | required; helper says street address is not needed at this stage                                                                          |
| Project type              | required: Residential / Conservation & Listed Building / Housing & Retrofit / Commercial & Community / Other                              |
| Project stage             | required: Exploring feasibility / Preparing for consent / Consent already in place / Looking for technical or delivery support / Not sure |
| Preferred timescale       | optional: As soon as practical / Within 3 months / 3–6 months / 6–12 months / Longer term / Not sure                                      |
| Short project description | required; 50–3000 chars                                                                                                                   |
| Supporting file           | optional; one PDF/JPG/JPEG/PNG; 8 MB maximum                                                                                              |
| Privacy acknowledgement   | required                                                                                                                                  |

Label the privacy checkbox:

> I have read the Privacy Notice and understand how Bracken & Roe will use my information to respond to this enquiry.

Do not conflate this UI acknowledgment with a definitive legal-basis statement; the actual privacy notice must document the controller's chosen lawful basis after legal review.

Do not add a preselected newsletter/marketing checkbox.

Submit label:

> **Send project enquiry**

The form must work with normal semantic form behavior and be progressively enhanced for inline state.

Server processing order:

1. reject unsupported methods;
2. enforce content/request-size limit;
3. validate CSRF/origin expectations appropriate to the deployment;
4. validate all fields with Zod server-side;
5. check honeypot;
6. enforce abuse rate limit;
7. validate Turnstile token server-side;
8. validate file extension, MIME signature and size;
9. malware-scan any uploaded file before it is made accessible or forwarded;
10. create an idempotency key;
11. send studio notification;
12. optionally send a plain acknowledgement email;
13. avoid logging the full submitted message/file;
14. redirect/succeed at `/contact/thanks`.

Cloudflare requires Turnstile tokens to be validated server-side; tokens are short-lived and single-use, so visual client completion is not sufficient.

Use a honeypot field inaccessible to normal keyboard/screen-reader workflows and a minimum plausible submission interval as secondary signals, but never make either the sole anti-spam system.

Suggested rate limits: 5 attempted submissions per IP in 15 minutes and 20 per day, adjustable after observing real traffic. Do not expose exact limits in the user interface.

**Upload safety**

Allow only one file and only PDF/JPG/JPEG/PNG. Verify actual signatures/MIME rather than trusting the filename. Replace filenames with random identifiers and preserve the sanitized original name only as private metadata. Store temporarily in non-public object storage. Delete according to the documented retention schedule.

OWASP guidance recommends allowlisting extensions, validating file type, limiting size, changing server-side names and keeping uploads outside the public web root or otherwise isolated.

Where a dependable malware-scanning step cannot be implemented, **disable file uploads in production** rather than silently accepting unsafe attachments. Keep the field schema so it can be activated later.

**Email behavior**

Public email remains `studio@brackenroe.co.uk`.

Use a verified sending identity such as:

`website@brackenroe.co.uk`

or a dedicated transactional subdomain configured without disrupting the existing mailbox.

Notification:

Subject:

> New website enquiry — [Project type] — [Project postcode/area]

Reply-To: submitter email.

Email body should be plain, readable and reproduce structured fields without HTML decoration.

Acknowledgement, when enabled:

> **Subject:** Bracken & Roe — project enquiry received
> Thank you for getting in touch with Bracken & Roe. We have received your project enquiry and will reply by email.
>
> Bracken & Roe
> studio@brackenroe.co.uk

Do not include marketing.

Resend currently documents Next.js integration and support for attachments; its provider limits are much greater than the site's deliberately conservative upload cap. Use provider idempotency functionality where practical to reduce duplicate transactional sends.

## SEO, accessibility, performance, security and privacy

**SEO baseline**

Use one canonical origin:

```text
https://brackenroe.co.uk
```

Canonical URLs omit trailing slashes.

Page title defaults:

| Page         | `<title>`                            |
| ------------ | ------------------------------------ |
| Home         | `Bracken & Roe                       | Architecture, Conservation & Retrofit in Glasgow` |
| Practice     | `Practice                            | Bracken & Roe, Glasgow`                           |
| Projects     | `Projects                            | Bracken & Roe`                                    |
| Services     | `Architectural Services in Glasgow   | Bracken & Roe`                                    |
| Residential  | `Residential Architecture in Glasgow | Bracken & Roe`                                    |
| Conservation | `Conservation & Listed Buildings     | Bracken & Roe`                                    |
| Housing      | `Housing & Retrofit Architecture     | Bracken & Roe`                                    |
| Commercial   | `Commercial & Community Architecture | Bracken & Roe`                                    |
| Insights     | `Insights                            | Bracken & Roe`                                    |
| Contact      | `Contact Bracken & Roe               | Glasgow`                                          |

Home description:

> Glasgow architectural practice for residential projects, conservation and listed buildings, housing retrofit, and selected commercial and community work.

Write unique natural descriptions for every verified project, service and article. Do not stuff "architect Glasgow" into headings, footers, hidden fields or image alts.

No meta-keywords tag.

Project titles should generally follow:

`[Project] — [Area, Glasgow] | Bracken & Roe`

Insight titles:

`[Article title] | Bracken & Roe`

Create 1200 × 630 Open Graph imagery. Use a simple generated template: Paper/Ink wordmark, article/project title, category/location and one image or detail. Do not duplicate Instagram-like graphics.

Use descriptive image filenames such as:

```text
kelvinside-garden-room-rear-elevation-01.avif
shawlands-sandstone-repair-mortar-sample-02.webp
```

Generate XML sitemap from publishable CMS content. Exclude drafts, unverified real-project records, `/contact/thanks`, CMS routes, preview URLs and 404.

Staging/preview deployments must carry both HTTP/X-Robots controls and page metadata that prevent indexing.

**Structured data**

Use `Organization` on Home/Practice with:

- `name`: Bracken & Roe
- canonical URL
- logo
- email
- `PostalAddress`
- `areaServed`: Glasgow / relevant Scottish service area only when truthful
- configured real `sameAs` Instagram/LinkedIn URLs.

Do **not** include a telephone property.

Because the supplied office is virtual and should not be represented as a staffed walk-in destination, prefer general `Organization` markup rather than constructing rich `LocalBusiness` data with opening hours, reception availability or geographic claims that suggest an open public premises.

Use `BreadcrumbList` on service, project and Insight detail pages.

Use `Article`/`BlogPosting` on Insights with genuine author, publication date, modified/review date and image.

Optional `CreativeWork` can describe verified projects semantically, but do not manufacture properties merely to make schema richer.

No Review/AggregateRating schema without genuine qualifying reviews.

**Accessibility**

Target **WCAG 2.2 AA** across templates and content.

Required implementation behavior:

| Area               | Acceptance requirement                                                                                                                       |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Semantic structure | one logical H1; heading levels do not skip for styling; `header`, `nav`, `main`, `footer`, `article`, `figure`, `address` used appropriately |
| Skip navigation    | first keyboard-focusable item: **Skip to main content**                                                                                      |
| Keyboard           | every function available without pointer                                                                                                     |
| Focus              | strong visible focus indicator; never clipped or hidden by sticky header                                                                     |
| Touch              | design target 44 × 44 px minimum                                                                                                             |
| Contrast           | AA for text/UI; no text over images without guaranteed contrast field                                                                        |
| Zoom               | usable at 200%; core content reflows at 400% without loss                                                                                    |
| Alt text           | describes meaningful content/function; decorative images use empty alt                                                                       |
| Drawings           | caption provides type/purpose; meaningful plan information also conveyed in surrounding text                                                 |
| Forms              | explicit labels; instructions not placeholder-only; error summary plus inline error; fields retain valid data                                |
| Errors             | identify field and correction in text, not color alone                                                                                       |
| Menu/dialog        | focus management, Escape support, trigger-state semantics                                                                                    |
| Filters            | operable by keyboard and screen reader; selection state announced                                                                            |
| Motion             | respect reduced-motion preference                                                                                                            |
| Links              | purpose understandable in context; avoid repeated unlabeled "Read more"                                                                      |
| External links     | do not rely on icon alone; accessible name provided                                                                                          |
| Images             | no essential text baked into photography                                                                                                     |
| Video              | none required; any future video requires captions/transcript as applicable                                                                   |
| Language           | HTML `lang="en-GB"` is appropriate to site content even though copy style is written in clear English                                        |
| Status             | form success/failure announced to assistive technology                                                                                       |
| Tables             | use only for tabular information; headings associated correctly                                                                              |

For architectural image alt text, write:

> "Rear elevation of a sandstone house with a low timber-lined garden extension."

Do not write:

> "Stunning modern architecture by leading Glasgow architects."

A drawing caption can say:

> "Proposed ground-floor plan showing the kitchen moved into the rear room and a new opening to the dining space."

**Performance**

Field targets at the 75th percentile:

| Metric |  Target |
| ------ | ------: |
| LCP    |  ≤2.5 s |
| INP    | ≤200 ms |
| CLS    |   ≤0.10 |

Additional release goals on representative mobile pages: Lighthouse Performance ≥95, Accessibility ≥95, Best Practices ≥95 and SEO ≥95. Treat real-user Core Web Vitals as more important than chasing a synthetic score to 100.

Performance rules:

- server-render ordinary content;
- no general animation library;
- no third-party social embeds;
- no map iframe;
- no autoplay video;
- keep initial client JavaScript minimal;
- preload only genuinely critical fonts/assets;
- subset fonts and avoid loading unused weights;
- hero image gets explicit dimensions and appropriate priority;
- below-fold images lazy load;
- store intrinsic dimensions for every CMS image;
- never send a 3000 px image into a 400 px slot;
- responsive breakpoints around 480/640/768/960/1280/1600/1920 as appropriate;
- prefer negotiated AVIF, then WebP, retaining the source in the CMS;
- do not blindly convert line drawings to lossy imagery where SVG/PDF-derived vector output is appropriate;
- cache immutable static assets aggressively;
- revalidate CMS pages rather than making all requests dynamic.

**Security**

HTTPS only.

Apply, test and maintain restrictive response headers, including:

```text
Content-Security-Policy:
  default-src 'self';
  base-uri 'self';
  object-src 'none';
  frame-ancestors 'none';
  form-action 'self';
  img-src 'self' data: https://cdn.sanity.io [configured approved image origins];
  font-src 'self';
  connect-src 'self' [Sanity] [Turnstile] [configured analytics only];
  frame-src https://challenges.cloudflare.com;
  script-src 'self' [nonce/approved Turnstile requirements];
  style-src 'self' [minimal framework-required exception if unavoidable];

X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
X-Frame-Options: DENY
```

Use HSTS after all required subdomains are confirmed HTTPS:

```text
Strict-Transport-Security: max-age=63072000; includeSubDomains
```

Add `preload` only after intentionally completing the preload requirements; do not add it casually.

CSP must be tested against Sanity image delivery and Turnstile rather than weakened to broad wildcards simply because a third-party resource failed.

Never expose Sanity write tokens, Resend keys or Turnstile server secrets to client code.

Production procedures: dependency/security checks in CI; Dependabot/Renovate-style monitoring; no unreviewed CMS webhook endpoint; webhook signatures; least-privilege CMS tokens; protected main branch; secrets only in provider environment settings; no personal enquiry text in analytics/error telemetry; redact request bodies in server logs.

**Privacy and cookies**

As of 2026, UK organizations operate under the UK GDPR/Data Protection Act framework as amended by the Data (Use and Access) Act 2025; the ICO states that the Act's data-protection provisions were brought into force in stages through June 2026. The ICO also describes a new duty for organizations to provide a data-protection complaints process and associated handling requirements, including acknowledgement within 30 days.

The final Privacy page therefore cannot safely be filled with fabricated corporate details. Before launch, obtain and insert the actual:

- legal/controller name;
- company number if applicable;
- privacy contact;
- hosting/CMS/email/form processors actually enabled;
- international-transfer mechanism/details where relevant;
- retention periods;
- legal bases;
- complaints procedure;
- ICO complaint information.

The ICO expects privacy information to explain what data is used, why, retention, recipients, rights and relevant complaint/contact information, and privacy information should be provided when personal data is collected.

Place a short privacy notice and link directly beside the enquiry submit area.

**Cookie strategy:** ship production with **no optional analytics, advertising or social embed technology by default**. This is both faster and cleaner. The Cookies page should document whatever essential storage/technology really exists, including form-abuse mechanisms where applicable.

Only introduce analytics after the practice deliberately chooses a product and completes its privacy configuration.

Where nonessential cookies or comparable client storage are later used, do not set them before the required user choice. ICO cookie guidance continues to distinguish essential from nonessential technologies and requires an appropriate consent mechanism where consent applies.

If consent-gated analytics is enabled, use an equal-weight control:

`Accept analytics`
`Reject analytics`

with a secondary `Cookie settings` route/control. Default to rejected/unset, and allow withdrawal later. Do not use a dark pattern in which "Accept all" is a large colored button and rejection is hidden as a text link.

## Asset manifest, deployment and final acceptance

**Licensed Glasgow contextual photography**

Context imagery may create a sense of place, but it must be clearly separated editorially from the practice's portfolio. Never put a Pexels photograph on a project page in a way that implies Bracken & Roe designed the depicted building.

Pexels currently permits commercial use of its licensed photos and does not require attribution under its standard license, but its terms also make clear that third-party rights associated with depicted buildings, brands or other subject matter can still require consideration. Keep a rights record for every downloaded image rather than treating "from Pexels" as the end of the rights review.

Useful researched candidate assets for art direction:

| Candidate                        | Intended use                                    |
| -------------------------------- | ----------------------------------------------- |
| Pexels 15511414, Radubradu       | West End sandstone/terraced residential context |
| Pexels 6477726, Jonathan Clark   | Finnieston/Clyde context; Contact or Practice   |
| Pexels 30175096, Büşra Karabulut | Glasgow historic red-stone urban detail         |
| Pexels 36476021, Prajwol Ghemosu | Traditional Glasgow streetscape                 |
| Pexels 28845698, K               | Central historic streetscape                    |
| Pexels 37042663, Prajwol Ghemosu | Atmospheric Glasgow street/weather              |
| Pexels 13441030, Adrien Olichon  | Architectural façade/detail context             |

Do not blindly use all seven. Art-direct a final selection of four to six after checking the actual full-resolution image, recognizable trademarks/signage, people/model-release implications where relevant, and current license status at download.

For every licensed asset, CMS rights metadata must record: creator, source platform, source ID, acquisition date, license checked date, source reference, intended usage and `contextOnly: true`.

**Production asset manifest**

| Asset family              | Quantity / requirement                          |
| ------------------------- | ----------------------------------------------- |
| Primary wordmark          | light + dark SVG                                |
| Monogram                  | light + dark SVG                                |
| Favicon                   | SVG + ICO 16/32/48                              |
| Apple touch icon          | 180 × 180                                       |
| Default social image      | 1200 × 630                                      |
| Dynamic OG template       | project/article/service variants                |
| Glasgow context photos    | 4–6 approved master images                      |
| Team portraits            | 6 × 4:5, minimum 1600 px high                   |
| Project hero media        | 8, one per project                              |
| Project story imagery     | ideally 8–12 per project                        |
| Existing-condition images | 1–3 per project where applicable                |
| Plans                     | at least 1 per relevant project                 |
| Sections/elevations       | at least 1 per project where technically useful |
| Detail images             | 2–4 per project                                 |
| Construction/site imagery | 1–3 per applicable real project                 |
| Insight hero assets       | 6                                               |
| Studio notes              | minimum 8 at launch                             |
| Service contextual images | 1–2 per service; reuse only intentionally       |
| Material/details library  | stone, lime, window, joinery, drawing detail    |
| Email iconography         | none required beyond wordmark                   |
| Map                       | no embedded map asset required                  |

Original architectural photography should ideally be supplied at ≥2400 px on the longest relevant dimension, with larger hero masters where genuine resolution exists. Never upscale a low-resolution source merely to satisfy a nominal size.

Preserve high-quality originals in the DAM/CMS and generate delivery variants. Record photographer and usage rights for commissioned imagery.

**Deployment**

Production architecture:

```text
Git repository
    ↓
Vercel preview deployments
    ↓
Protected production deployment
    ↓
brackenroe.co.uk

Sanity production dataset
    ↕ webhook/revalidation
Next.js application

Contact form
    → Turnstile validation
    → rate limit / server validation
    → secure optional file handling
    → Resend
    → studio@brackenroe.co.uk
```

Configure separate production and preview/staging environment values for:

```text
NEXT_PUBLIC_SITE_URL
SANITY_PROJECT_ID
SANITY_DATASET
SANITY_API_VERSION
SANITY_READ_TOKEN          # server only if needed for preview
SANITY_REVALIDATE_SECRET
RESEND_API_KEY             # server only
ENQUIRY_FROM_EMAIL
ENQUIRY_TO_EMAIL
TURNSTILE_SITE_KEY
TURNSTILE_SECRET_KEY       # server only
RATE_LIMIT_*               # provider-specific
ANALYTICS_*                # absent by default
```

Never commit `.env` files. Commit `.env.example` with names but no secret values.

Use separate Sanity staging and production data or an equally strong draft/preview strategy. Preview URLs must be `noindex,nofollow` and preferably access-controlled.

Configure the production domain so one canonical version wins:

```text
https://brackenroe.co.uk
```

and redirect `www.brackenroe.co.uk` permanently to it.

Configure TLS before launch. When setting up transactional mail, preserve the existing DNS/MX configuration that supports `studio@brackenroe.co.uk`. Add SPF/DKIM/DMARC deliberately; do not overwrite an existing SPF record with a second incompatible record.

After production DNS is live, submit sitemap/search properties to Google Search Console and equivalent webmaster tooling. Do not add marketing analytics merely for launch completeness.

Implement automated CMS exports/backups on a documented schedule and verify that a restore is possible.

CI should run, at minimum: dependency install from lockfile; formatting/linting; TypeScript check; unit tests for utilities; production build; route/link test; Playwright smoke tests; automated accessibility checks using axe on key templates; and Lighthouse CI or an equivalent performance budget.

**Final QA and launch acceptance checklist**

The site is not production-ready until every applicable row is signed off.

| Area                       | Acceptance test                                                                                                                       |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Fixed brand                | Every visible occurrence says **Bracken & Roe** consistently                                                                          |
| Domain                     | Canonical is `brackenroe.co.uk`; `www` redirects correctly                                                                            |
| Email                      | Every contact link uses `studio@brackenroe.co.uk`; test on desktop/mobile                                                             |
| Phone                      | No telephone number exists in content, schema, footer or metadata                                                                     |
| Address                    | Exact supplied office address is consistent site-wide                                                                                 |
| Virtual office             | Every office presentation uses **Meetings by appointment** and never implies permanent staffing                                       |
| Staff reality              | No unverified fictional person is visible in production                                                                               |
| Protected title            | Every published use of "Architect" attached to a person has been independently verified                                               |
| Qualifications             | "Part II" or other credentials verified before publication                                                                            |
| Projects                   | Every production project is either verified real work or conspicuously labeled a design/representative study                          |
| Clients                    | No invented client names or logos                                                                                                     |
| Awards/accreditations      | None displayed without evidence                                                                                                       |
| Testimonials               | No placeholder/fabricated quote is rendered                                                                                           |
| Project claims             | Dates, status, locations and scope agree everywhere                                                                                   |
| Performance claims         | No unsubstantiated carbon, energy, cost or percentage claims                                                                          |
| Social                     | Instagram/LinkedIn hidden when real URLs are absent                                                                                   |
| Social privacy             | No live social feed or platform script loaded                                                                                         |
| Context photography        | Context imagery cannot reasonably be mistaken for practice project photography                                                        |
| Asset rights               | Every external image has source/licensing metadata and rights review                                                                  |
| Synthetic imagery          | Every non-photographic proposed project view is labeled Visualisation where users could mistake it for completed work                 |
| Image consistency          | Multiple views of one project preserve building geometry/material logic                                                               |
| Logo                       | Correct SVG variants; favicon works at 16/32 px                                                                                       |
| Typography                 | Newsreader/Inter load locally or through approved optimized mechanism with no flash-induced layout jump                               |
| Color                      | Text and controls pass WCAG contrast checks                                                                                           |
| Header                     | Sticky behavior works without obscuring anchors/focus                                                                                 |
| Mobile nav                 | Keyboard focus trapped appropriately; Escape closes; focus returns to trigger                                                         |
| Skip link                  | Appears on focus and lands on `<main>`                                                                                                |
| Heading order              | Each template has one logical H1 and coherent hierarchy                                                                               |
| Keyboard                   | Entire site usable keyboard-only                                                                                                      |
| Focus                      | Visible on every interactive element                                                                                                  |
| Screen reader              | Navigation, project filters, forms and dialogs have correct names/states                                                              |
| Reduced motion             | Nonessential animation removed when requested                                                                                         |
| Zoom                       | Pages function at 200% zoom and 400% reflow                                                                                           |
| Target sizes               | Primary interactive controls meet 44 px design target                                                                                 |
| Forms                      | Every input has persistent visible label                                                                                              |
| Validation                 | Server and client rules agree                                                                                                         |
| Errors                     | Error summary and inline text identify corrections; focus moves appropriately                                                         |
| Form persistence           | User does not lose valid fields after a validation error                                                                              |
| Form success               | Success state announced and `/contact/thanks` works                                                                                   |
| Email send                 | Studio notification received from production domain                                                                                   |
| Reply-To                   | Replying targets the submitter rather than transactional sender                                                                       |
| Autoresponder              | If enabled, contains no marketing and no invented response-time promise                                                               |
| Spam                       | Turnstile verified server-side                                                                                                        |
| Rate limiting              | Repeated abuse is rejected without blocking ordinary submissions                                                                      |
| Honeypot                   | Invisible to normal users and assistive technology                                                                                    |
| File extension             | Disallowed types rejected                                                                                                             |
| File signature             | Actual content type validated, not filename alone                                                                                     |
| File size                  | >8 MB rejected                                                                                                                        |
| Malware                    | File upload disabled unless scanning/isolation is properly implemented                                                                |
| Privacy checkbox           | Links directly to Privacy Notice                                                                                                      |
| Privacy notice             | Real controller/legal identity inserted before launch                                                                                 |
| Privacy retention          | Actual enquiry/upload retention periods documented                                                                                    |
| Privacy complaints         | 2026-compliant complaint process/contact details reviewed                                                                             |
| Cookies                    | Cookies/storage page reflects actual deployed technology                                                                              |
| Optional analytics         | No nonessential storage runs before required consent                                                                                  |
| Consent UI                 | Accept and reject choices equally accessible if consent controls are required                                                         |
| SEO title                  | Every indexable route has unique meaningful title                                                                                     |
| Meta description           | Every important route has unique natural description                                                                                  |
| Canonical                  | Self-canonical correct; no staging domain leaks                                                                                       |
| Sitemap                    | Contains only production indexable URLs                                                                                               |
| Robots                     | Production allowed; preview/staging blocked                                                                                           |
| Thank-you route            | `noindex`                                                                                                                             |
| Draft content              | Cannot leak into production sitemap/pages                                                                                             |
| Open Graph                 | 1200 × 630 cards render without clipping                                                                                              |
| Schema                     | Organization has no invented phone/opening hours                                                                                      |
| Schema                     | Breadcrumbs and Article markup validate                                                                                               |
| Schema                     | No fake Review/AggregateRating                                                                                                        |
| Links                      | Automated crawl finds no broken internal links                                                                                        |
| External links             | Current and intentional                                                                                                               |
| Architecture terminology   | Scotland-specific planning/building-warrant terminology reviewed                                                                      |
| Insight dates              | Regulation-sensitive articles carry review dates                                                                                      |
| Insight sources            | Official Scottish/HES sources included where guidance depends on them                                                                 |
| Images                     | Width/height known before rendering; no avoidable CLS                                                                                 |
| Hero                       | Responsive sizes tested; no oversized desktop source on mobile                                                                        |
| Formats                    | AVIF/WebP negotiation works; appropriate fallbacks exist                                                                              |
| LCP                        | ≤2.5 s target at 75th-percentile field monitoring                                                                                     |
| INP                        | ≤200 ms target                                                                                                                        |
| CLS                        | ≤0.10 target                                                                                                                          |
| Lighthouse                 | Representative mobile templates meet agreed ≥95 release targets or documented justified exception                                     |
| JavaScript                 | No unnecessary client hydration or large animation bundle                                                                             |
| CSP                        | Enabled and tested; no broad wildcard added as a shortcut                                                                             |
| Headers                    | `nosniff`, referrer, frame, permissions policies correct                                                                              |
| HSTS                       | Enabled only after HTTPS subdomain review                                                                                             |
| HTTPS                      | No mixed content                                                                                                                      |
| Secrets                    | No API secret appears in browser bundle/repository                                                                                    |
| Logs                       | Enquiry body, personal files and private data not unnecessarily logged                                                                |
| Dependencies               | Framework/dependencies updated to currently patched compatible releases immediately before launch                                     |
| CMS webhook                | Authenticated/signed and cannot trigger arbitrary operations                                                                          |
| CMS editing                | Projects/Insights editable without layout redesign                                                                                    |
| CMS validation             | Unverified protected-title/project records cannot publish                                                                             |
| CMS preview                | Draft preview works and remains non-indexable                                                                                         |
| 404                        | Custom page works on arbitrary invalid URL                                                                                            |
| Redirects                  | `www`, old/test slugs and deliberate redirects tested                                                                                 |
| Browsers                   | Current Safari, Chrome, Firefox and Edge checked                                                                                      |
| Mobile                     | Current iOS Safari and Android Chrome checked                                                                                         |
| Small screen               | 320–360 px width has no unintended horizontal overflow                                                                                |
| Tablet                     | 768–1024 layouts intentionally composed, not merely scaled desktop                                                                    |
| Large desktop              | Layout remains contained and does not produce unreadably long text                                                                    |
| DNS                        | Apex and `www` resolve as intended                                                                                                    |
| Email DNS                  | SPF/DKIM/DMARC configured without breaking existing mail                                                                              |
| Backup                     | CMS export/backup process documented and tested                                                                                       |
| Production content         | No lorem ipsum, placeholder photos, "coming soon," debug labels or AI-development notes                                               |
| Final visual review        | No SaaS icon grids, giant metrics, pill-heavy UI, gratuitous gradients, generic corporate stock or excessive motion                   |
| Final architectural review | Plans, sections, materials, project terminology and captions are internally coherent                                                  |
| Final authenticity review  | A visitor cannot reasonably mistake staging fiction, synthetic imagery or licensed Glasgow context for verified Bracken & Roe history |
