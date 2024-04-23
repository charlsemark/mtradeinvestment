import { connectToDB } from '@/database';
import Plan from '@/models/plan';
import User from '@/models/user';
import Joi from 'joi';
import { NextResponse } from 'next/server';

const investField = Joi.object({
  planId: Joi.string().required(),
  amount: Joi.number().required(),
  returnInvestment: Joi.number().required(),
});

export const dynamic = 'force-dynamic';

// @route   POST /api/user/start-investment/
// @desc    start aninvestment
// @access  Private
export async function POST(req) {
  try {
    await connectToDB();

    const { id: user_id } = JSON.parse(req.headers.get('user-header'));

    //fecting user
    const user = await User.findById(user_id);

    const extractPlanData = await req.json();

    const { planId, amount, returnInvestment } = extractPlanData;

    //validate field
    const { error } = investField.validate(extractPlanData);

    //fecthing user
    const plan = await Plan.findById(planId);

    if (!plan) {
      return NextResponse.json({
        success: false,
        status: 'error',
        message: 'invalid plan id',
      });
    }

    if (error) {
      return NextResponse.json({
        success: false,
        status: 'error',
        message: error.details[0].message,
      });
    }
    console.log("amount", amount)

    if (user.balance >= amount) {
      //adding plan to user schema
      user.plans.push({
        planId,
        amount,
        returnInvestment,
        elapseTime: Date.now() + Number(plan.period) * (1000 * 60 * 60 * 24),
        status: { isActive: true, isCompleted: false },
      });

      user.balance = user.balance - amount;
    } else {
      return NextResponse.json({
        success: false,
        status: 'error',
        message: 'Insufficient Balance',
      });
    }

    await user.save();

    const response = NextResponse.json({
      success: true,
      state: 'success',
      investment: user.plans,
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
