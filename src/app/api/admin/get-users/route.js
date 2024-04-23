import { connectToDB } from '@/database';
import Plan from '@/models/plan';
import User from '@/models/user';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// @route   GET /api/admin/get-users/
// @desc    Fetch all users
// @access  Private
export async function GET(req) {
  try {
    await connectToDB();

    const users = await User.find({});

    if (!users) {
      return NextResponse.json({
        success: false,
        state: 'error',
        message: 'No users available',
      });
    }

    const response = NextResponse.json({
      success: true,
      state: 'success',
      users,
    });

    return response;
  } catch (error) {
    if (error) {
      if (error.message) {
        return NextResponse.json({
          success: false,
          state: 'error',
          message: error.message,
        });
      } else {
        return NextResponse.json({
          success: false,
          state: 'error',
          message: error,
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        state: 'error',
        message: 'Something went wrong! please try again later',
      });
    }
  }
}
