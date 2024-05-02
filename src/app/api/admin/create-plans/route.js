// import connectToDB from "@/database";
import { connectToDB } from '@/database';
import Plan from '@/models/plan';
import Joi from 'joi';
import { NextResponse } from 'next/server';

const createNewPlan = Joi.object({
  planName: Joi.string().required(),
  minPrice: Joi.number().required(),
  maxPrice: Joi.number().required(),
  roiPeriod: Joi.string().required(),
  roi: Joi.number().required(),
  period: Joi.number().required(),
  imageUrl: Joi.string(),
});

export const dynamic = 'force-dynamic';

// @route   POST /api/admin/create-plans/
// @desc    create plan
// @access  Private
export async function POST(req) {
  try {
    await connectToDB();

    const { id: user_id, role } = JSON.parse(req.headers.get('user-header'));

    if (role.toLowerCase() === 'admin') {
      const extractPlanData = await req.json();

      // Validating createNewPlan
      const { error } = createNewPlan.validate(extractPlanData);
      if (error) {
        return NextResponse.json({
          success: false,
          message: error.details[0].message,
        });
      }

      const newlyCreatedPlan = await Plan.create(extractPlanData);

      if (newlyCreatedPlan) {
        return NextResponse.json({
          success: true,
          status: 'success',
          message: 'Plan created successfully',
          plan: newlyCreatedPlan,
        });
      } else {
        return NextResponse.json({
          success: false,
          message: 'Failed to create plan! Please try again.',
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
