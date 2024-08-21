// import connectToDB from "@/database";
import { connectToDB } from '@/database';
import Plan from '@/models/plan';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// @route   GET /api/admin/get-plan/[id]
// @desc    Fetch a single plan by ID
// @access  Private
export async function GET(req) {
  try {
    await connectToDB();

    const { id } = req.nextUrl.query;

    if (!id) {
      return NextResponse.json({
        success: false,
        message: 'Plan ID is required',
      });
    }

    const plan = await Plan.findById(id);

    if (plan) {
      return NextResponse.json({
        success: true,
        status: 'success',
        plan,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Plan not found',
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
