import { connectToDB } from '@/database';
import User from '@/models/user';
import { hash } from 'bcryptjs';
import Joi from 'joi';
import { NextResponse } from 'next/server';

const updateDatas = Joi.object({
  name: Joi.string(),
  phone: Joi.number(),
  state: Joi.string(),
  email: Joi.string(),
  country: Joi.string(),
  balance: Joi.number(),
  profit: Joi.number(),
  topUpBalance: Joi.string(),
  password: Joi.string(),
  profilePicture: Joi.string(),
  btc: Joi.string(),
  usdt: Joi.string(),
  ethereum: Joi.string(),
  litecoin: Joi.string(),
  accountUpgrade: Joi.string(),
  investment: Joi.object().keys({
    investmentId: Joi.string(),
    status: Joi.object().keys({
      isCompleted: Joi.boolean(),
    }),
  }),
  transactions: Joi.object().keys({
    transactionsId: Joi.string(),
    status: Joi.object().keys({
      isApproved: Joi.boolean(),
      isRejected: Joi.boolean(),
    }),
  }),
});

export const dynamic = 'force-dynamic';

// @route   PUT /api/admin/update-user/
// @desc    update a user
// @access  Private
export async function PUT(req) {
  try {
    await connectToDB();

    const url = new URL(req.url);
    const user_id = url.searchParams.get('user_id');

    const user = await User.findById(user_id);

    if (!user) {
      return NextResponse.json({
        success: false,
        state: 'error',
        message: 'No user available',
      });
    }

    const extractPlanData = await req.json();

    const {
      name,
      phone,
      state,
      country,
      balance,
      topUpBalance,
      profit,
      password,
      profilePicture,
      btc,
      usdt,
      ethereum,
      email,
      litecoin,
      accountUpgrade,
      transactions = {},
      investment = {},
    } = extractPlanData;

    // Validating createNewPlan
    const { error } = updateDatas.validate(extractPlanData);

    if (error) {
      return NextResponse.json({
        success: false,
        status: 'error',
        message: error.details[0].message,
      });
    }

    const hashPassword = password ? await hash(password, 12) : '';

    if (name) {
      user.name = name;
    }
    if (phone) {
      user.phone = phone;
    }
    if (state) {
      user.state = state;
    }
    if (country) {
      user.country = country;
    }
    if (email) {
      user.email = email;
    }
    if (balance) {
      if(topUpBalance === 'replace') {
        user.balance = balance;
      }else{
        user.balance =  user.balance + balance;
      }
    }
    if(profit) {
      user.profit = profit;
    }
    if (hashPassword) {
      user.password = hashPassword;
    }
    if (profilePicture) {
      user.profilePicture = profilePicture;
    }
    if (btc) {
      user.wallet.bitcoin = btc;
    }
    if (ethereum) {
      user.wallet.ethereum = ethereum;
    }
    if (usdt) {
      user.wallet.usdt = usdt;
    }
    if (litecoin) {
      user.wallet.litecoin = litecoin;
    }
    if (accountUpgrade) {
      user.accountUpgrade = accountUpgrade;
    }
    if (Object.keys(investment).length > 0) {
      user.plans = user.plans.map((invest) => {
        const investmentId = investment.investmentId;
        const statusToUpdate = Object.keys(investment.status)[0];

        if (
          invest._id.toString().trim() === investmentId &&
          invest.status[statusToUpdate] !== undefined
        ) {
          invest.status = {
            isActive: false,
            isCompleted: false,
            [statusToUpdate]: true,
          };
          if (
            statusToUpdate === 'isCompleted' &&
            invest.status[statusToUpdate] &&
            invest.status.isActive === false
          ) {
            user.balance = user.balance + invest.returnInvestment;
          }
        }

        return invest;
      });
    }
    if (Object.keys(transactions).length > 0) {
      user.transactions = user.transactions.map((trans) => {
        const transactionId = transactions.transactionsId;
        const statusToUpdate = Object.keys(transactions.status)[0];

        if (
          trans._id.toString().trim() === transactionId &&
          trans.status[statusToUpdate] !== undefined
        ) {
          trans.status = {
            isPending: false,
            isApproved: false,
            isRejected: false,
            [statusToUpdate]: true,
          };
          if (
            trans.transactionType === 'DEPOSIT' &&
            statusToUpdate === 'isApproved' &&
            trans.status[statusToUpdate]
          ) {
            user.balance = user.balance + trans.amount;
          }
        }

        return trans;
      });
    }

    await user.save();

    const response = NextResponse.json({
      success: true,
      state: 'success',
      user,
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
