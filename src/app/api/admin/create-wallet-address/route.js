// import connectToDB from "@/database";
import { connectToDB } from '@/database';
import Plan from '@/models/plan';
import Wallet from '@/models/wallet';
import { hash } from 'bcryptjs';
import Joi from 'joi';
import { NextResponse } from 'next/server';

const createNewWallet = Joi.object({
  walletName: Joi.string().required(),
  walletAddress: Joi.string(),
  imageUrl: Joi.string().required(),
});

export const dynamic = 'force-dynamic';

// @route   POST /api/admin/create-wallet-address/
// @desc    create plan
// @access  Private
export async function POST(req) {
  try {
    await connectToDB();

    const { id: user_id, role } = JSON.parse(req.headers.get('user-header'));

    if (role.toLowerCase() === 'admin') {
      const extractWalletData = await req.json();

      // Validating createNewWallet
      const { error } = createNewWallet.validate(extractWalletData);
      if (error) {
        return NextResponse.json({
          success: false,
          message: error.details[0].message,
        });
      }

      const newlyCreatedWallet = await Wallet.create(extractWalletData);

      if (newlyCreatedWallet) {
        return NextResponse.json({
          success: true,
          status: 'success',
          message: 'wallet created successfully',
          plan: newlyCreatedWallet,
        });
      } else {
        return NextResponse.json({
          success: false,
          message: 'Failed to create wallet! Please try again.',
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        status: 'error',
        message: 'Something went wrong! please try again later',
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      status: 'error',
      message: error.message,
    });
  }
}
