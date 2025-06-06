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
    if (decoded.role !== 'management') {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    const employees = await Employee.find()
      .populate('user', 'email firstName lastName')
      .sort({ createdAt: -1 });

    return NextResponse.json(employees);
  } catch (error) {
    console.error('Management employees error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
