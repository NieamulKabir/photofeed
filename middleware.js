import { NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

let defaultLocal = "en";
let locals = ["bn", "en"];

function getLocal(request) {
  const acceptedLanguage = request.headers.get("accept-language") ?? undefined;
  let headers = { "accept-language": acceptedLanguage };
  let languages = new Negotiator({ headers }).languages();
  return match(languages, locals, defaultLocal);
}

export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  const pathnameIsMissingLocal = locals.every(
    (local) => !pathname.startsWith(`/${local}/`) && pathname !== `/${local}`
  );

  if (pathnameIsMissingLocal) {
    const local = getLocal(request);

    return NextResponse.redirect(
      new URL(` /${local}/${pathname}`, request.url)
    );
  }
}
export const config = {
  matcher: [
    // Skip all internal paths (_next, assets, api)
    "/((?!api|assets|.*\\..*|_next).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
};
