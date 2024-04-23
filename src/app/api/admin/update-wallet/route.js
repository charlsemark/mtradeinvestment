import { connectToDB } from '@/database';
import Wallet from '@/models/wallet';
import Joi from 'joi';
import { NextResponse } from 'next/server';

const updateDatas = Joi.object({
  walletName: Joi.string(),
  walletAddress: Joi.string(),
  imageUrl: Joi.string(),
});

export const dynamic = 'force-dynamic';

// @route   PUT /api/admin/update-wallet/
// @desc    update a wallet
// @access  Private
export async function PUT(req) {
  try {
    await connectToDB();

    const url = new URL(req.url);
    const wallet_id = url.searchParams.get('wallet_id');

    const wallet = await Wallet.findById(wallet_id);

    if (!wallet) {
      return NextResponse.json({
        success: false,
        state: 'error',
        message: 'No wallet available',
      });
    }

    const extractWalletData = await req.json();

    const { walletName, walletAddress, imageUrl } = extractWalletData;

    // Validating createNewPlan
    const { error } = updateDatas.validate(extractWalletData);

    if (error) {
      return NextResponse.json({
        success: false,
        status: 'error',
        message: error.details[0].message,
      });
    }

    if (walletName) {
      wallet.walletName = walletName;
    }
    if (walletAddress) {
      wallet.walletAddress = walletAddress;
    }
    if (imageUrl) {
      wallet.imageUrl = imageUrl;
    }

    await wallet.save();

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
