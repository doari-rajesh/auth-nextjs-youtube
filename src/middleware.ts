import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {

  console.log("path:" , request)
  const isPublicPath = request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup' ||
  request.nextUrl.pathname === '/verifyemail' 


  const token = request.cookies.get('token')?.value
  console.log("tokenMiddleware: ", token);

  
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/',request.nextUrl))
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login',request.nextUrl))
  }
}

export const config = {
  matcher: ['/signup','/login','/profile', '/profile/:id*','/verifyemail']
  
}
