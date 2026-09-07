import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET ?? process.env.SANITY_DATASET ?? 'production',
  },
  typegen: {
    path: './src/**/*.{ts,tsx}',
    schema: './src/sanity/types/schema.json',
    generates: './src/sanity/types/sanity.types.ts',
  },
});
