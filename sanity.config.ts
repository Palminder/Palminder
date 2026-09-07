import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './src/sanity/schemas';
import { structure } from './src/sanity/structure';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? process.env.SANITY_PROJECT_ID ?? '';
const dataset = process.env.SANITY_STUDIO_DATASET ?? process.env.SANITY_DATASET ?? 'production';

export default defineConfig({
  name: 'bracken-roe',
  title: 'Bracken & Roe',
  projectId,
  dataset,
  plugins: [structureTool({ structure })],
  schema: { types: schemaTypes },
});
