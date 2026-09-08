import type { LegalDocument } from '@/lib/content/types';
import { site } from '@/lib/site';

/**
 * Legal documents. Placeholders for the controller identity, retention periods, lawful bases
 * and complaints process are marked explicitly and must be completed after legal review
 * before launch. Nothing here invents a company number or legal entity name.
 *
 * Every statement about the website below describes what the codebase actually does:
 * no analytics, no advertising or social cookies, Turnstile only on the contact page,
 * a preview cookie only for editors, enquiries delivered by email and not stored on the site.
 */

const EFFECTIVE = '2026-09-07';
const REVIEWED = '2026-09-07';

const a = site.address;
/** The fixed office address as a single line of text, always with the appointment wording. */
const officeAddressText = `${a.line1}, ${a.line2}, ${a.locality}, ${a.city} ${a.postcode}, ${a.country}. ${a.appointmentNote}`;

const privacy: LegalDocument = {
  type: 'privacy',
  title: 'Privacy Notice',
  effectiveDate: EFFECTIVE,
  reviewedAt: REVIEWED,
  intro:
    'This notice explains what personal information we collect through this website, why we collect it, who helps us process it and the rights you have over it.',
  body: [
    { type: 'heading', level: 2, text: 'Who we are' },
    {
      type: 'paragraph',
      text: `Bracken & Roe is the data controller for personal information collected through this website. We are an architectural practice based in Glasgow. Our office address is ${officeAddressText} You can contact us about anything in this notice at ${site.email}.`,
    },
    {
      type: 'callout',
      title: 'Before launch',
      text: '[Legal entity name to be confirmed before launch]. The following points are to be completed after legal review and before this notice is published: the legal entity name and any company number of the data controller; the lawful basis relied on for each purpose; the retention periods for enquiries and technical logs; confirmation of the Information Commissioner’s Office complaint details; and the list of processors actually enabled on the live website.',
    },

    { type: 'heading', level: 2, text: 'What we collect' },
    {
      type: 'paragraph',
      text: 'We collect only what is needed to respond to an enquiry. Most of it is what you type into the enquiry form on the contact page.',
    },
    { type: 'heading', level: 3, text: 'The enquiry form' },
    {
      type: 'list',
      items: [
        'Your name and email address.',
        'The postcode or area of the project.',
        'The project type, the stage it has reached and, if you choose to tell us, your preferred timescale.',
        'A short description of the project.',
        'If file uploads are switched on, an optional supporting file (a PDF, JPG or PNG). Files are checked for malware before they are accepted.',
        'Confirmation that you have read this notice.',
      ],
    },
    {
      type: 'paragraph',
      text: 'You may include personal information in the description, for example the address of the property. Please include only what we need in order to understand the project.',
    },
    { type: 'heading', level: 3, text: 'Technical information' },
    {
      type: 'paragraph',
      text: 'When you use the website, our hosting provider and our abuse-protection service record technical details such as your IP address, browser type, the pages requested and the time of each request. These logs are used to keep the website running, to limit the number of enquiries that can be sent from one connection in a short period, and to detect and block automated abuse. We do not use them to build a profile of you.',
    },
    {
      type: 'paragraph',
      text: 'When an enquiry is sent, the website records a reference number, the project type and whether a file was attached, so that a problem with delivery can be traced. It does not record the content of your message or your file.',
    },

    { type: 'heading', level: 2, text: 'Why we collect it' },
    {
      type: 'paragraph',
      text: 'We use the information you send us to understand the project, to reply to you, and to arrange a first conversation or a meeting if that is the next step. If the enquiry leads to an appointment, the information becomes part of the project record.',
    },
    {
      type: 'paragraph',
      text: 'We do not use enquiry information for marketing. We do not sell it, and we do not share it with anyone for their own purposes.',
    },

    { type: 'heading', level: 2, text: 'Lawful basis' },
    {
      type: 'paragraph',
      text: 'We expect to rely on our legitimate interests in responding to enquiries about our work and, where you are asking us to act for you, on the steps needed before entering into a contract with you. The lawful basis for each purpose is subject to legal review and will be confirmed before this notice is finalised.',
    },

    { type: 'heading', level: 2, text: 'Who processes it' },
    {
      type: 'paragraph',
      text: 'We use a small number of service providers to run the website. They process information on our instructions as our processors and are not permitted to use it for their own purposes.',
    },
    {
      type: 'list',
      items: [
        'Vercel — hosting for the website and for the endpoint that receives the enquiry form.',
        'Resend — delivery of the enquiry email to the practice and, if it is switched on, a short acknowledgement to you.',
        'Cloudflare Turnstile — abuse protection on the contact page, which checks that the enquiry is being sent by a person rather than an automated script.',
        'Sanity — the content management system that holds the website’s text and images. It does not receive enquiry information.',
      ],
    },
    {
      type: 'paragraph',
      text: 'Once an enquiry reaches us it is held in the practice’s email and, where a project follows, in the project files. The website itself does not keep a copy.',
    },

    { type: 'heading', level: 2, text: 'International transfers' },
    {
      type: 'paragraph',
      text: 'Some of the providers listed above operate outside the United Kingdom, so handling your information may involve a transfer outside the UK. Where that happens we expect it to be covered by appropriate safeguards recognised under UK data protection law. The transfers that actually take place, and the safeguard applying to each, will be confirmed before this notice is finalised.',
    },

    { type: 'heading', level: 2, text: 'How long we keep it' },
    {
      type: 'paragraph',
      text: 'We keep enquiries only for as long as we need them to respond and for a limited period afterwards, so that a conversation that resumes can be picked up where it left off. [retention period to be confirmed]. If an enquiry leads to a commission, the information becomes part of the project record and is kept for the life of that record. Technical logs are kept by our hosting and abuse-protection providers for short periods set by them.',
    },

    { type: 'heading', level: 2, text: 'Your rights' },
    {
      type: 'paragraph',
      text: 'Under the UK General Data Protection Regulation and the Data Protection Act 2018, as amended by the Data (Use and Access) Act 2025, you have the right to:',
    },
    {
      type: 'list',
      items: [
        'ask for a copy of the personal information we hold about you (access);',
        'ask us to correct information that is inaccurate or incomplete (rectification);',
        'ask us to delete your information (erasure);',
        'ask us to restrict how we use it (restriction);',
        'object to our use of it where we rely on our legitimate interests (objection);',
        'receive the information you gave us in a portable form (portability).',
      ],
    },
    {
      type: 'paragraph',
      text: `These rights are not absolute and some apply only in particular circumstances. To exercise any of them, email ${site.email}. We may need to confirm your identity before we act. We will respond within one month, and we will tell you if a complex request needs longer.`,
    },

    { type: 'heading', level: 2, text: 'How to complain' },
    {
      type: 'paragraph',
      text: `If you are unhappy with how we have handled your personal information, please tell us first by emailing ${site.email} with “Data protection complaint” in the subject line. We will acknowledge your complaint within 30 days of receiving it, look into it without undue delay and let you know the outcome.`,
    },
    {
      type: 'paragraph',
      text: 'You also have the right to complain to the Information Commissioner’s Office, the UK’s independent regulator for data protection, at ico.org.uk. We would welcome the chance to address your concern first, but you do not have to contact us before going to the ICO.',
    },

    { type: 'heading', level: 2, text: 'Cookies' },
    {
      type: 'paragraph',
      text: 'This website sets no analytics, advertising or social-media cookies. The only storage it uses is essential: what Cloudflare Turnstile needs to protect the contact form, and a preview cookie set only for editors who choose to preview unpublished content. Our Cookies and Storage notice describes this in more detail.',
    },

    { type: 'heading', level: 2, text: 'Changes to this notice' },
    {
      type: 'paragraph',
      text: 'We will update this notice when the website, our providers or the law change. The effective and review dates at the top of the page show when it was last revised.',
    },
  ],
};

const cookies: LegalDocument = {
  type: 'cookies',
  title: 'Cookies and Storage',
  effectiveDate: EFFECTIVE,
  reviewedAt: REVIEWED,
  intro:
    'This website uses no analytics, advertising or social-media cookies. This notice lists the small amount of storage it does use and explains why no consent banner is shown.',
  body: [
    { type: 'heading', level: 2, text: 'What this website does not do' },
    {
      type: 'paragraph',
      text: 'We set no analytics cookies, no advertising cookies and no social-media cookies. There are no tracking pixels, no embedded maps and no embedded social feeds. Nothing on this website follows you to other websites, and nothing records how you browse it.',
    },

    { type: 'heading', level: 2, text: 'What the website does use' },
    { type: 'heading', level: 3, text: 'Cloudflare Turnstile on the contact page' },
    {
      type: 'paragraph',
      text: 'The enquiry form on the contact page uses Cloudflare Turnstile to check that an enquiry is being sent by a person rather than an automated script. To do this, Turnstile may set its own cookies or use browser storage while the form is on the page. That storage is under Cloudflare’s control, is used only for abuse protection, and is not present on any other page of this website. Cloudflare’s own privacy documentation describes what it stores.',
    },
    { type: 'heading', level: 3, text: 'Draft preview for editors' },
    {
      type: 'paragraph',
      text: 'Editors of this website can switch on a preview of unpublished content. Doing so sets a preview cookie in the editor’s browser so that the site knows to show drafts. The cookie is set only when an editor deliberately enables preview, is never set for visitors, and is removed when preview is switched off.',
    },
    { type: 'heading', level: 3, text: 'Nothing else' },
    {
      type: 'paragraph',
      text: 'That is the full list. The website does not use local storage, session storage or any other browser storage for its own purposes.',
    },

    { type: 'heading', level: 2, text: 'Why there is no consent banner' },
    {
      type: 'paragraph',
      text: 'UK law requires consent for cookies and similar storage that are not strictly necessary to provide a service the visitor has asked for. Everything listed above is essential either to the working of the contact form or to an editing feature used only by the practice, so no consent is needed and no banner is shown. A banner asking permission for something that does not exist would be misleading.',
    },
    {
      type: 'paragraph',
      text: 'If that changes — for example, if we decide to add analytics — we will introduce clear controls before any non-essential technology runs, with Accept and Reject options given equal weight, and we will update this notice at the same time.',
    },

    { type: 'heading', level: 2, text: 'Managing storage in your browser' },
    {
      type: 'paragraph',
      text: `You can clear or block cookies and site data through your browser’s settings. Blocking storage for this website may stop the abuse-protection check on the contact page from completing, in which case you can email us directly at ${site.email}.`,
    },

    { type: 'heading', level: 2, text: 'Questions' },
    {
      type: 'paragraph',
      text: `If you have a question about this notice, email ${site.email}.`,
    },
  ],
};

const accessibility: LegalDocument = {
  type: 'accessibility',
  title: 'Accessibility Statement',
  effectiveDate: EFFECTIVE,
  reviewedAt: REVIEWED,
  intro:
    'We want everyone to be able to use this website. This statement describes what we have done so far, the limitations we know about and how to tell us about a problem.',
  body: [
    { type: 'heading', level: 2, text: 'Our commitment' },
    {
      type: 'paragraph',
      text: 'This website is run by Bracken & Roe. We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA and to keep meeting them as the site changes. We have not commissioned a formal audit. During development the site has been tested with automated accessibility checks and by manual keyboard review, and we will continue to test it as pages are added.',
    },

    { type: 'heading', level: 2, text: 'What we have done' },
    {
      type: 'list',
      items: [
        'Pages are built with a clear structure: one main heading per page, headings in order, landmarks for navigation and content, and lists and tables marked up as such.',
        'A skip link at the top of every page lets keyboard users go straight to the content.',
        'Everything that can be done with a mouse can be done with a keyboard, including the menu, the project filters, the enlarged drawing view and the enquiry form.',
        'Keyboard focus is always visible.',
        'Links, buttons and form controls are sized so that the area you can press is at least 44 pixels high.',
        'Text and its background meet the WCAG contrast requirements, and text is never placed over photographs.',
        'Movement is kept to a minimum and is switched off for people who have asked their device to reduce motion.',
        'Photographs and drawings have text alternatives. Drawings carry a caption describing what they show.',
        'Form fields have visible labels, instructions appear before you need them, and error messages say what is wrong and how to put it right.',
        'Text can be resized and the layout reflows to a single column on small screens without losing content.',
      ],
    },

    { type: 'heading', level: 2, text: 'Known limitations' },
    {
      type: 'list',
      items: [
        'Architectural drawings convey much of their detail visually. Each drawing has a caption and a text alternative, and a zoom view lets you enlarge it, but the text cannot describe every line of a plan or section.',
        'Some documents, such as PDFs, and some third-party content, such as the abuse-protection check on the contact page, are not produced by us and may not be fully accessible.',
      ],
    },

    { type: 'heading', level: 2, text: 'Reporting a problem' },
    {
      type: 'paragraph',
      text: `If you find something on this website that you cannot use, or you need information in a different format, email ${site.email}. Tell us the page you were on, what you were trying to do and, if you can, the browser and any assistive technology you were using. We will reply by email, and we will aim to fix the problem or provide the information in another way.`,
    },

    { type: 'heading', level: 2, text: 'About this statement' },
    {
      type: 'paragraph',
      text: 'This statement was prepared on 7 September 2026. We will review it periodically, and whenever the website changes in a way that affects accessibility. The effective and review dates at the top of the page show when it was last revised.',
    },
  ],
};

export const legalDocuments: LegalDocument[] = [privacy, cookies, accessibility];
