/** GROQ queries. Images project their intrinsic dimensions so layout never shifts. */
const image = `{
  ...,
  "url": asset->url,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  "lqip": asset->metadata.lqip
}`;

export const projectsQuery = `*[_type == "project"] | order(order asc) {
  _id, title, "slug": slug.current, locationDisplay, area, sector, sectorLabel, status, year,
  realityType, verificationStatus, buildingType, summary, brief, context, response, services,
  materials, technical, outcome, "hero": hero ${image}, "gallery": gallery[] ${image},
  "drawings": drawings[] ${image}, featured, order, relatedService, seo
}`;

export const teamQuery = `*[_type == "person"] | order(order asc) {
  _id, name, "slug": slug.current, rolePublic, roleType, bio, expertise, "portrait": portrait ${image},
  order, verificationStatus, protectedTitleVerified, qualificationVerified
}`;

export const servicesQuery = `*[_type == "service"] | order(number asc) {
  _id, title, "slug": slug.current, number, navLabel, shortIntro, hero, lead, serviceScope,
  sections[]{ title, body }, supportingCopy, modularBody, "image": image ${image},
  "relatedProjectSlugs": relatedProjects[]->slug.current,
  "relatedInsightSlugs": relatedInsights[]->slug.current, seo
}`;

export const insightsQuery = `*[_type == "insight"] | order(publishedAt desc) {
  _id, title, "slug": slug.current, dek, category, body[]{ ..., _type == "imageWithMeta" => ${image} },
  "authorSlug": author->slug.current, publishedAt, reviewedAt, "hero": hero ${image}, officialSources,
  "relatedServiceSlugs": relatedServices[]->slug.current,
  "relatedProjectSlugs": relatedProjects[]->slug.current, touchesRegulation, verificationStatus, seo
}`;

export const studioNotesQuery = `*[_type == "studioNote"] | order(date desc) {
  _id, date, category, shortText, "media": media ${image}, "relatedProjectSlug": relatedProject->slug.current,
  optionalSocialURL, published
}`;

export const testimonialsQuery = `*[_type == "testimonial"] {
  _id, quote, attribution, descriptor, consentConfirmed, verified, "relatedProjectSlug": relatedProject->slug.current
}`;

export const legalDocumentQuery = `*[_type == "legalDocument" && type == $type][0] {
  type, title, intro, effectiveDate, reviewedAt, body
}`;

export const redirectsQuery = `*[_type == "redirect"] { sourcePath, destinationPath, permanent }`;

export const siteSettingsQuery = `*[_type == "siteSettings"][0] { instagramUrl, linkedinUrl }`;
