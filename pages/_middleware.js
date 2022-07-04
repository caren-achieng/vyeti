import { NextResponse } from "next/server";

export async function middleware(req) {
  const url = req.nextUrl.clone();
  const path = req.url;
  const { cookies } = req;

  if (path.includes("/dashboard")) {
    url.pathname = "/register/earner";
    const token = cookies.vyeti_jwt;
    if (token === undefined) return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
