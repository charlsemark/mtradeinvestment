import { connectToDB } from '@/database';
import Copier from '@/models/copiers';
import Joi from 'joi';
import { NextResponse } from 'next/server';

const createCopier = Joi.object({
    name: Joi.string().required(),
    username: Joi.string().required(),
    bonus: Joi.number().required(),
    imageUrl: Joi.string().required(),
  });
  
export const dynamic = 'force-dynamic';

// @route   POST /api/admin/create-copier/
// @desc    create copier
// @access  Private

export async function POST(req) {
    try {
        await connectToDB();

        const { id: user_id, role } = JSON.parse(req.headers.get('user-header'));

        if (role.toLowerCase() === 'admin') {
            const extractCopierData = await req.json();
      
            // Validating createNewPlan
            const { error } = createCopier.validate(extractCopierData);
            if (error) {
              return NextResponse.json({
                success: false,
                message: error.details[0].message,
              });
            }
      
            const newlyCreatedCopier = await Copier.create(extractCopierData);
      
            if (newlyCreatedCopier) {
              return NextResponse.json({
                success: true,
                status: 'success',
                message: 'Copier created successfully',
                copier: newlyCreatedCopier,
              });
            } else {
              return NextResponse.json({
                success: false,
                message: 'Failed to create copier! Please try again.',
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