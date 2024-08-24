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
  pin: Joi.string().min(4).required(),  // Added validation for pin
  role: Joi.string(),
});

export const dynamic = 'force-dynamic';

export async function POST(req) {
  await connectToDB();
  const { name, email, password, phone, username, address, state, country, pin, role } = await req.json();

  // Validating schema
  const { error } = schema.validate({ name, email, password, phone, username, address, state, country, pin, role });
  if (error) {
    return NextResponse.json({
      success: false,
      message: error.details[0].message,
    });
  }

  try {
    // Checking if user already exists
    const isUserAlreadyExisting = await User.findOne({ email });
    if (isUserAlreadyExisting) {
      return NextResponse.json({
        success: false,
        message: 'User already exists, try another email or login please!',
      });
    }

    const hashPassword = await hash(password, 12);

    // Create new user with the raw pin
    const newUser = await User.create({
      name,
      email,
      password: hashPassword,  // Hash the password only
      pin,  // Save the pin as provided by the frontend
      phone,
      username,
      address,
      state,
      country,
      role,
    });

    if (newUser) {
      return NextResponse.json({
        success: true,
        message: 'User created successfully!',
      });
    }
  } catch (error) {
    console.error('Error creating new user:', error);
    return NextResponse.json({
      success: false,
      message: 'Something went wrong! please try again later',
    });
  }
}
