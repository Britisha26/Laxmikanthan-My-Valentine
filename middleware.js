import { NextResponse } from 'next/server'

export function middleware(request) {

  const authHeader = request.headers.get('authorization')

  const correctPassword = 'laxmiandme'

  if (authHeader) {

    const base64 = authHeader.split(' ')[1]
    const decoded = atob(base64)
    const password = decoded.split(':')[1]

    if (password === correctPassword) {

      return NextResponse.next()

    }

  }

  return new Response('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Private Valentine"'
    },
  })
}

export const config = {
  matcher: '/:path*',
}