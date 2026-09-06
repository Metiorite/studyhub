export const config = {
  matcher: '/:path*',
};

function unauthorized() {
  return new Response('Authentication required.', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Restricted"' },
  });
}

export default function middleware(request) {
  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return unauthorized();
  }

  try {
    const base64Credentials = authHeader.split(' ')[1];
    const decoded = atob(base64Credentials);
    const separatorIndex = decoded.indexOf(':');
    const user = decoded.slice(0, separatorIndex);
    const pass = decoded.slice(separatorIndex + 1);

    if (user === process.env.SITE_USER && pass === process.env.SITE_PASSWORD) {
      return; // allow the request through
    }
  } catch (e) {
    // fall through to unauthorized
  }

  return unauthorized();
}
