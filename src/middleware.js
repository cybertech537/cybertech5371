import { NextResponse } from 'next/server';
import cookie from 'cookie'; // Install with: npm install cookie

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Define routes that require authentication
  const protectedRoutes = ['/admin', '/dashboard', '/blood-requests','/donors/'];

  // Check if the user is trying to access a protected route
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Get the cookies from the request headers
  const cookies = cookie.parse(req.headers.get('cookie') || '');
 
  const accessToken = cookies['agreeToken'];

  if (isProtectedRoute) {
    if (!accessToken) {
      // Redirect to login if not authenticated
      return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
      // Verify user with your backend
      const response = await fetch('http://localhost:5050/api/user/v1/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

     if (!response.ok) {
        return NextResponse.redirect(new URL('/login', req.url));
      }

      const user = await response.json();
      console.log(user,'user');
      if(!user){
        return NextResponse.redirect(new URL('/login', req.url));
      }

      // if (user.role !== 'admin' && pathname.startsWith('/admin')) {
      //   return NextResponse.redirect(new URL('/login', req.url));
      // }

      req.user = user; // Add user data for logging or additional checks
      console.log('Authenticated user:', user); // Logs in terminal

      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/donors/:path*', '/blood-requests/:path*', '/dashboard/:path*']
};

