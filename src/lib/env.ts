/**
 * Deployment signals. NODE_ENV is "production" for every `next start`, including CI and
 * staging, so gates that must fail closed on the live site key off the deployment instead.
 */
export function isProductionDeployment(): boolean {
  return (
    process.env.VERCEL_ENV === 'production' ||
    process.env.CONTENT_STAGE?.trim().toLowerCase() === 'production'
  );
}
