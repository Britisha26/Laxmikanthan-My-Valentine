export default function middleware(request) {

  const authHeader = request.headers.get('authorization');

  const PASSWORD = 'LkT@926!';

  if (authHeader) {

    const base64 = authHeader.split(' ')[1];
    const decoded = atob(base64);
    const password = decoded.split(':')[1];

    if (password === PASSWORD) {
      return;
    }
  }

  return new Response('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Private Valentine"'
    }
  });
}

export const config = {
  matcher: '/:path*',
};