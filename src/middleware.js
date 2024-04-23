import { NextResponse } from 'next/server';
import decodeJwtToken from './utils/decodeJwtToken';
import { withAuth } from 'next-auth/middleware';

export default withAuth({});

export async function middleware(req, res) {
  const token = req.headers.get('authorization').split(' ')[1];

  if (!token)
    NextResponse.json({
      success: false,
      state: 'error',
      message: 'Sign in Required',
    });

  const result =
    token &&
    (await decodeJwtToken(token).catch((error) => {
      if (error) {
        return NextResponse.json({
          success: false,
          state: 'error',
          message: 'Token has Expired 2',
        });
      }
    }));

  if (!result.id) {
    return NextResponse.json({
      success: false,
      state: 'error',
      message: 'Token has Expired',
    });
  }

  const newString = `{"id": "${result.id}", "role": "${result.role}", "iat": "${result.iat}", "exp": "${result.exp}"}`;

  const response = NextResponse.next();

  response.headers.set('USER-HEADER', newString);

  return response;
}

export const config = {
  matcher: [
    '/api/user/get-user/:path*',
    '/api/user/get-plan/:path*',
    '/api/user/start-investment/:path*',
    '/api/user/get-user-by-id/:path*',
    '/api/user/fund-balance/:path*',
    '/api/user/create-withdraw/:path*',
    '/api/admin/:path*',
    '/api/user/refreshToken/:path*',
  ],
};
