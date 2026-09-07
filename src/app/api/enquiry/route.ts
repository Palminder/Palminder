import { NextResponse, type NextRequest } from 'next/server';
import { processEnquiry } from '@/lib/forms/enquiry/process';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const THANKS = '/contact/thanks';
const BACK = '/contact?enquiry=error#project-enquiry';

function wantsJson(request: NextRequest): boolean {
  return (request.headers.get('accept') ?? '').includes('application/json');
}

/**
 * Enquiry endpoint. JSON clients (the enhanced form) receive structured results; plain
 * HTML form posts are redirected with 303 so a refresh never re-submits.
 */
export async function POST(request: NextRequest) {
  const result = await processEnquiry(request);
  const json = wantsJson(request);

  switch (result.status) {
    case 'success':
      return json
        ? NextResponse.json({ ok: true, redirectTo: THANKS })
        : NextResponse.redirect(new URL(THANKS, request.nextUrl.origin), 303);
    case 'invalid':
      return json
        ? NextResponse.json({ ok: false, message: result.message, fieldErrors: result.fieldErrors }, { status: 400 })
        : NextResponse.redirect(new URL(BACK, request.nextUrl.origin), 303);
    case 'rejected': {
      const headers: Record<string, string> = {};
      if (result.retryAfterSeconds) headers['Retry-After'] = String(result.retryAfterSeconds);
      return json
        ? NextResponse.json({ ok: false, message: result.message }, { status: result.httpStatus, headers })
        : NextResponse.redirect(new URL(`/contact?enquiry=${result.httpStatus}#project-enquiry`, request.nextUrl.origin), 303);
    }
    case 'unavailable':
      return json
        ? NextResponse.json({ ok: false, message: result.message }, { status: 503 })
        : NextResponse.redirect(new URL('/contact?enquiry=unavailable#project-enquiry', request.nextUrl.origin), 303);
  }
}

const notAllowed = () => NextResponse.json({ message: 'Method not allowed.' }, { status: 405, headers: { Allow: 'POST' } });
export const GET = notAllowed;
export const PUT = notAllowed;
export const PATCH = notAllowed;
export const DELETE = notAllowed;
