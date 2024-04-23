import { connectToDB } from '@/database';
import Plan from '@/models/plan';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// @route   GET /api/user/get-plans/
// @desc    Fetch all plan
// @access  Public
export async function GET(req) {
  try {
    await connectToDB();

    const plans = await Plan.find({});

    if (!plans) {
      return NextResponse.json({
        success: false,
        state: 'error',
        message: 'No plan available',
      });
    }

    const response = NextResponse.json({
      success: true,
      state: 'success',
      plans,
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
