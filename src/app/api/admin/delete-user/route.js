import { connectToDB } from '@/database';
import User from '@/models/user';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// @route   DELETE /api/admin/delete-user/
// @desc    delete a user
// @access  Private
export async function DELETE(req) {
  try {
    await connectToDB();

    const url = new URL(req.url);
    const user_id = url.searchParams.get('user_id');

    const user = await User.findByIdAndDelete(user_id);

    if (!user) {
      return NextResponse.json({
        success: false,
        status: 'error',
        message: 'No user available',
      });
    }

    // await user.remove();

    const response = NextResponse.json({
      success: true,
      status: 'success',
      message: 'User deleted successfully',
    });

    return response;
  } catch (error) {
    console.error('Error deleting user:', error);

    return NextResponse.json({
      success: false,
      status: 'error',
      message: 'Something went wrong! Please try again later',
      error: error.message,
    });
  }
}
