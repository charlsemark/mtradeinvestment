import { jwtVerify, SignJWT } from 'jose';
import { jwtKey } from './jwtTokenKey';
import { NextResponse } from 'next/server';

const decodeJwtToken = async (props) => {
  try {
    const AuthResponse = await jwtVerify(
      props,
      new TextEncoder().encode(jwtKey)
    );

    return AuthResponse.payload;
  } catch (error) {
    return NextResponse.json({
      success: false,
      state: 'error',
      message: 'Token has Expired',
    });
  }
};

export default decodeJwtToken;
