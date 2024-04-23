import { connectToDB } from '@/database';
import User from '@/models/user';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// @route   GET /api/user/get-user-by-id/
// @desc    Fetch one user details
// @access  Private
export async function GET(req) {
  try {
    await connectToDB();

    const url = new URL(req.url);
    const user_id = url.searchParams.get('user_id');

    //fecting user
    const user = await User.findById(user_id);

    if (!user) {
      return NextResponse({
        success: false,
        state: 'error',
        message: 'Invalid user id',
      });
    }

    const response = NextResponse.json({
      success: true,
      state: 'success',
      user: user,
    });
    return response;
  } catch (error) {
    if (error) {
      if (error.message) {
        return NextResponse({
          success: false,
          state: 'error',
          message: error.message,
        });
      } else {
        return NextResponse({
          success: false,
          state: 'error',
          message: error,
        });
      }
    } else {
      return NextResponse({
        success: false,
        state: 'error',
        message: 'Something went wrong! please try again later',
      });
    }
  }
}
