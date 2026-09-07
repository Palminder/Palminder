import type { StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Bracken & Roe')
    .items([
      S.listItem().title('Site settings').id('siteSettings').child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),
      S.documentTypeListItem('project').title('Projects'),
      S.documentTypeListItem('service').title('Services'),
      S.documentTypeListItem('insight').title('Insights'),
      S.documentTypeListItem('studioNote').title('Studio notes'),
      S.documentTypeListItem('person').title('Team'),
      S.documentTypeListItem('testimonial').title('Testimonials'),
      S.divider(),
      S.documentTypeListItem('legalDocument').title('Legal documents'),
      S.documentTypeListItem('redirect').title('Redirects'),
    ]);
