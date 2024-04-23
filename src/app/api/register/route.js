// import connectToDB from "@/database";
import { connectToDB } from '@/database';
import User from '@/models/user';
import { hash } from 'bcryptjs';
import Joi from 'joi';
import { NextResponse } from 'next/server';

const schema = Joi.object({
  name: Joi.string().required(),
  username: Joi.string().required(),
  address: Joi.string().required(),
  state: Joi.string().required(),
  country: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phone: Joi.number().required(),
  role: Joi.string(),
});

export const dynamic = 'force-dynamic';

// @route   POST /api/register
// @desc    creating an account
// @access  Public
export async function POST(req) {
  await connectToDB();
  const { name, email, password, phone, username, address, state, country, role } = await req.json();

  // Validating schema
  const { error } = schema.validate({ name, email, password, phone, username, address, state, country, role });
  if (error) {
    return NextResponse.json({
      success: false,
      message: error.details[0].message,
    });
  }

  try {
    // Checking if user already exist or not
    const isUserAlreadyExisting = await User.findOne({ email });
    if (isUserAlreadyExisting) {
      return NextResponse.json({
        success: false,
        message: 'User already existed, Try another email or login please!',
      });
    } else {
      const hashPassword = await hash(password, 12);

      const newUser = await User.create({
        name,
        email,
        password: hashPassword,
        phone,
        role,
      });

      if (newUser) {
        return NextResponse.json({
          success: true,
          message: 'User created successfully!',
        });
      }
    }
  } catch (error) {
    console.log('Error creating new user, please try again');
    return NextResponse({
      success: false,
      message: 'Something went wrong! please try again later',
    });
  }
}
