/** Build environment flag. Anything other than `production` is treated as a preview build. */
export const siteEnv: 'preview' | 'production' =
  import.meta.env.PUBLIC_SITE_ENV === 'production' ? 'production' : 'preview';

export const isProduction = siteEnv === 'production';
