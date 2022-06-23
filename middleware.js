import { NextResponse, NextRequest } from 'next/server'

export async function middleware(req) {
  const { pathname } = req.nextUrl
  console.log(pathname)
  if (pathname == '/') {
    return NextResponse.redirect(new URL('/main/yeongtong', req.url))
  }
  return NextResponse.next()
}
