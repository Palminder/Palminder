import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextResponse, type NextRequest } from 'next/server';

/** Enables Sanity draft preview when the shared secret matches. Preview pages are noindex. */
export async function GET(request: NextRequest) {
  const secret = process.env.SANITY_PREVIEW_SECRET;
  const supplied = request.nextUrl.searchParams.get('secret');
  if (!secret || !supplied || supplied !== secret) {
    return NextResponse.json({ message: 'Invalid preview token.' }, { status: 401 });
  }
  const target = request.nextUrl.searchParams.get('path') ?? '/';
  // Only same-site relative paths; never an absolute or protocol-relative URL.
  const safe = target.startsWith('/') && !target.startsWith('//') ? target : '/';
  const dm = await draftMode();
  dm.enable();
  redirect(safe);
}
