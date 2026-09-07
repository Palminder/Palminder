import { imageWithMeta } from './objects/imageWithMeta';
import { seo } from './objects/seo';
import { richText } from './objects/richText';
import {
  modularBody,
  moduleCTA,
  moduleCallout,
  moduleDrawing,
  moduleFacts,
  moduleFullWidthImage,
  moduleImagePair,
  moduleImageText,
  moduleProjectSelection,
  moduleRichText,
  moduleStudioNotes,
} from './objects/modules';
import { siteSettings } from './documents/siteSettings';
import { person } from './documents/person';
import { project } from './documents/project';
import { service } from './documents/service';
import { insight } from './documents/insight';
import { studioNote } from './documents/studioNote';
import { testimonial } from './documents/testimonial';
import { redirect } from './documents/redirect';
import { legalDocument } from './documents/legalDocument';

export const schemaTypes = [
  imageWithMeta,
  seo,
  richText,
  moduleRichText,
  moduleFullWidthImage,
  moduleImagePair,
  moduleImageText,
  moduleDrawing,
  moduleFacts,
  moduleCallout,
  moduleProjectSelection,
  moduleStudioNotes,
  moduleCTA,
  modularBody,
  siteSettings,
  person,
  project,
  service,
  insight,
  studioNote,
  testimonial,
  redirect,
  legalDocument,
];
