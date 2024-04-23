import { connectToDB } from '@/database';
import Copier from '@/models/copiers';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// @route   GET /api/user/get-copiers/
// @desc    Fetch all copiers
// @access  public
export async function GET(req) {
  try {
    await connectToDB();

    const copiers = await Copier.find({});

    if (!copiers) {
      return NextResponse.json({
        success: false,
        state: 'error',
        message: 'No copiers available',
      });
    }

    const response = NextResponse.json({
      success: true,
      state: 'success',
      copiers,
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
