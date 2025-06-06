import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Employee } from '@/model/Employee';
import { User } from '@/model/User';
import { verifyToken, getTokenFromHeaders } from '@/lib/auth';

export async function GET(request) {
  try {
    await dbConnect();
    
    const token = getTokenFromHeaders(request.headers);
    if (!token) {
      return NextResponse.json(
        { error: 'Authorization token required' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (decoded.role !== 'employee') {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    const employee = await Employee.findOne({ user: decoded.userId })
      .populate('user', 'email firstName lastName');

    if (!employee) {
      return NextResponse.json(
        { error: 'Employee profile not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(employee);
  } catch (error) {
    console.error('Employee profile error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
