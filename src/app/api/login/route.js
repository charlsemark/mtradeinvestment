import { connectToDB } from '@/database';
import Joi from 'joi';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import User from '@/models/user';
import { jwtKey } from '@/utils/jwtTokenKey';

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const dynamic = 'force-dynamic';

// @route   GET /api/login
// @desc    login an account
// @access  Public
export async function POST(req) {
  await connectToDB();

  const { email, password } = await req.json();

  // Validating schema
  const { error } = schema.validate({ email, password });
  if (error) {
    return NextResponse.json({
      success: false,
      message: error.details[0].message,
    });
  }

  try {
    // Check if the user exists in the database
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return NextResponse.json({
        success: false,
        message: 'User not found',
      });
    }

    // Verify the password
    const isPasswordMatch = await bcrypt.compare(password, checkUser.password);
    if (!isPasswordMatch) {
      return NextResponse.json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // User matched, create and assign a token
    const token = jwt.sign(
      { id: checkUser?._id, role: checkUser?.role },
      jwtKey,
      { expiresIn: '1h' }
    );

    // console.log(checkUser);

    const finalResult = {
      token,
      user: {
        email: checkUser.email,
        name: checkUser.name,
        _id: checkUser._id,
        role: checkUser.role,
      },
    };

    // Return success response with the token
    return NextResponse.json({
      success: true,
      message: 'Login successful!',
      finalResult,
    });
  } catch (e) {
    console.log('Error while logging in, please try again');
    return NextResponse({
      success: false,
      message: 'Something went wrong! please try again later',
    });
  }
}
