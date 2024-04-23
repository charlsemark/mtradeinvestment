import decodeJwtToken from '@/utils/decodeJwtToken';
import { SignJWT } from 'jose';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { jwtKey } from '@/utils/jwtTokenKey';
// import decodeJwtToken from './decodeJwtToken';

export async function POST(req) {
    try {
        // console.log("Authorization.....", req.headers.get('authorization'))
        const { id: user_id, role, exp } = JSON.parse(req.headers.get('user-header'));
        console.log(user_id, role, exp)

        // const result =
        // accessToken &&
        // (await decodeJwtToken(accessToken).catch((error) => {
        //   if (error) {
        //     return NextResponse.json({
        //       success: false,
        //       state: 'error',
        //       message: 'Token has Expired',
        //     });
        //   }
        // }));

        const token = jwt.sign(
            { id: user_id, role: role },
            jwtKey,
            { expiresIn: '1h' }
        );

        return NextResponse.json({
            success: true,
            state: 'success',
            token,
        });
    } catch (error) {
        console.error('Error generating refresh token:', error);
        throw error;
    }
};
