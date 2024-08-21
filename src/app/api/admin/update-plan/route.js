import { connectToDB } from '@/database';
import Plan from '@/models/plan';
import Joi from 'joi';
import { NextResponse } from 'next/server';

const updatePlanSchema = Joi.object({
  planId: Joi.string().required(),
  planName: Joi.string(),
  minPrice: Joi.number(),
  maxPrice: Joi.number(),
  roiPeriod: Joi.string(),
  roi: Joi.number(),
  period: Joi.number(),
  imageUrl: Joi.string(),
});

export const dynamic = 'force-dynamic';

// @route   PUT /api/admin/update-plan/
// @desc    Update an existing plan
// @access  Private
export async function PUT(req) {
  try {
    await connectToDB();

    const { id: user_id, role } = JSON.parse(req.headers.get('user-header'));

    if (role.toLowerCase() === 'admin') {
      const updatedPlanData = await req.json();

      // Validating updatePlanSchema
      const { error } = updatePlanSchema.validate(updatedPlanData);
      if (error) {
        return NextResponse.json({
          success: false,
          message: error.details[0].message,
        });
      }

      const { planId, ...updateFields } = updatedPlanData;
      
      const updatedPlan = await Plan.findByIdAndUpdate(planId, updateFields, { new: true });

      if (updatedPlan) {
        return NextResponse.json({
          success: true,
          status: 'success',
          message: 'Plan updated successfully',
          plan: updatedPlan,
        });
      } else {
        return NextResponse.json({
          success: false,
          message: 'Failed to update plan! Please try again.',
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        status: 'error',
        message: 'Unauthorized access!',
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
