import { connectToDB } from '@/database';
import Plan from '@/models/plan';
import User from '@/models/user';
import Joi from 'joi';
import { NextResponse } from 'next/server';

const fundField = Joi.object({
  amount: Joi.number().required(),
  walletName: Joi.string().required(),
  note: Joi.string(),
  walletAddress: Joi.string().required(),
});

export const dynamic = 'force-dynamic';

// @route   PUT /api/user/create-withdraw/
// @desc    create a withdrawal request
// @access  Private
export async function PUT(req) {
  try {
    await connectToDB();

    const { id: user_id } = JSON.parse(req.headers.get('user-header'));

    //fecting user
    const user = await User.findById(user_id);

    const extractPlanData = await req.json();

    const { amount, walletName, walletAddress, note } = extractPlanData;

    //validate field
    const { error } = fundField.validate(extractPlanData);

    if (error) {
      return NextResponse.json({
        success: false,
        status: 'error',
        message: error.details[0].message,
      });
    }

    if (user.transactions.length) {
      //adding transactions to user schema
      user.transactions.push({
        amount: Number(amount),
        walletName: walletName.toUpperCase(),
        walletAddress,
        note: note ? note : '',
        transactionType: 'WITHDRAW',
        created: new Date(),
        status: { isPending: true, isApproved: false, isRejected: false },
      });
    } else {
      user.transactions = [];

      //adding transactions to user schema
      user.transactions.push({
        amount: Number(amount),
        walletName: walletName.toUpperCase(),
        walletAddress,
        note: note ? note : '',
        transactionType: 'WITHDRAW',
        created: new Date(),
        status: { isPending: true, isApproved: false, isRejected: false },
      });
    }

    user.balance = user.balance - Number(amount);

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
