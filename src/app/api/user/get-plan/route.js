import { connectToDB } from '@/database';
import Plan from '@/models/plan';
import User from '@/models/user';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// @route   GET /api/user/get-plan/?plan_id=6666
// @desc    Fetch a single plan details
// @access  Private
export async function GET(req) {
  try {
    await connectToDB();

    const url = new URL(req.url);
    const plan_id = url.searchParams.get('plan_id');

    const plan = await Plan.findById(plan_id);

    if (!plan) {
      return NextResponse({
        success: false,
        state: 'error',
        message: 'Invalid plan id',
      });
    }

    const response = NextResponse.json({
      success: true,
      state: 'success',
      plan,
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
