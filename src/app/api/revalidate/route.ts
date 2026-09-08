import { revalidateTag } from 'next/cache';
import { NextResponse, type NextRequest } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

export const runtime = 'nodejs';

const KNOWN_TYPES = new Set([
  'project',
  'person',
  'service',
  'insight',
  'studioNote',
  'testimonial',
  'legalDocument',
  'siteSettings',
  'redirect',
]);

/**
 * Sanity webhook → tag revalidation. The request signature is verified against
 * SANITY_REVALIDATE_SECRET; the body may only name a document type to revalidate.
 */
export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret)
    return NextResponse.json({ message: 'Revalidation is not configured.' }, { status: 503 });
  try {
    const { isValidSignature, body } = await parseBody<{ _type?: string }>(request, secret);
    if (!isValidSignature)
      return NextResponse.json({ message: 'Invalid signature.' }, { status: 401 });
    const type = body?._type;
    if (!type || !KNOWN_TYPES.has(type))
      return NextResponse.json({ message: 'Unknown document type.' }, { status: 400 });
    revalidateTag('content', 'max');
    revalidateTag(type, 'max');
    return NextResponse.json({ revalidated: true, type });
  } catch {
    return NextResponse.json({ message: 'Bad request.' }, { status: 400 });
  }
}

export function GET() {
  return NextResponse.json(
    { message: 'Method not allowed.' },
    { status: 405, headers: { Allow: 'POST' } },
  );
}
