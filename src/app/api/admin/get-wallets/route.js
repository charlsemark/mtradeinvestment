import { connectToDB } from '@/database';
import Plan from '@/models/plan';
import User from '@/models/user';
import Wallet from '@/models/wallet';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// @route   GET /api/admin/get-wallets/
// @desc    Fetch all wallet
// @access  Private
export async function GET(req) {
  try {
    await connectToDB();

    const wallet = await Wallet.find({});

    if (!wallet) {
      return NextResponse.json({
        success: false,
        state: 'error',
        message: 'No wallet available',
      });
    }

    const response = NextResponse.json({
      success: true,
      state: 'success',
      wallet,
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
