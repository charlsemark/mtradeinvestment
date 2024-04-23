import { connectToDB } from '@/database';
import Plan from '@/models/plan';
import User from '@/models/user';
import Joi from 'joi';
import { NextResponse } from 'next/server';

const fundField = Joi.object({
  amount: Joi.number().required(),
  walletName: Joi.string().required(),
  receipt: Joi.string().required(),
});

export const dynamic = 'force-dynamic';

// @route   PUT /api/user/fund-balance/
// @desc    start aninvestment
// @access  Private
export async function PUT(req) {
  try {
    await connectToDB();

    const { id: user_id } = JSON.parse(req.headers.get('user-header'));

    //fecting user
    const user = await User.findById(user_id);

    const extractPlanData = await req.json();

    const { receipt, amount, walletName } = extractPlanData;

    //validate field
    const { error } = fundField.validate(extractPlanData);

    if (error) {
      return NextResponse.json({
        success: false,
        status: 'error',
        message: error.details[0].message,
      });
    }

    // Ensure the receipt is a string
    const receiptValue = String(receipt);

    if (user.transactions.length) {
      //adding transactions to user schema
      user.transactions.push({
        amount: Number(amount),
        receipt: receiptValue,
        walletName: walletName.toUpperCase(),
        transactionType: 'DEPOSIT',
        created: new Date(),
        status: { isPending: true, isApproved: false, isRejected: false },
      });
    } else {
      user.transactions = [];

      //adding transactions to user schema
      user.transactions.push({
        amount: Number(amount),
        receipt: receiptValue,
        walletName: walletName.toUpperCase(),
        transactionType: 'DEPOSIT',
        created: new Date(),
        status: { isPending: true, isApproved: false, isRejected: false },
      });
    }

    await user.save();

    const response = NextResponse.json({
      success: true,
      state: 'success',
      transactions: user.transactions,
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
