import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Employee } from '@/model/Employee';
import { User } from '@/model/User';
import { verifyToken, getTokenFromHeaders } from '@/lib/auth';

// GET FUNCTION: Fetch Employee Profile
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

// POST FUNCTION: Create Employee Profile
export async function POST(request) {
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

    const {
      firstName,
      lastName,
      department,
      position,
      salary,
      hireDate,
      phone,
      address,
      emergencyContact,
      skills
    } = await request.json();

    await User.findByIdAndUpdate(decoded.userId, {
      firstName,
      lastName
    });

    let employee = await Employee.findOne({ user: decoded.userId });
    
    if (employee) {
      return NextResponse.json(
        { error: 'Employee details already exist. Use PUT to update.' },
        { status: 400 }
      );
    }

    employee = new Employee({
      user: decoded.userId,
      department,
      position,
      salary: parseFloat(salary),
      hireDate: new Date(hireDate),
      skills: Array.isArray(skills) ? skills : [],
      personalInfo: {
        phone,
        address: {
          street: address
        },
        emergencyContact: {
          phone: emergencyContact
        }
      }
    });

    await employee.save();

    const populatedEmployee = await Employee.findById(employee._id)
      .populate('user', 'email firstName lastName');

    return NextResponse.json(populatedEmployee);
  } catch (error) {
    console.error('Employee profile creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT FUNCTION: Update Employee Profile
export async function PUT(request) {
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

    const {
      firstName,
      lastName,
      department,
      position,
      salary,
      hireDate,
      phone,
      address,
      emergencyContact,
      skills
    } = await request.json();

    await User.findByIdAndUpdate(decoded.userId, {
      firstName,
      lastName
    });

    const employee = await Employee.findOneAndUpdate(
      { user: decoded.userId },
      {
        department,
        position,
        salary: parseFloat(salary),
        hireDate: new Date(hireDate),
        skills: Array.isArray(skills) ? skills : [],
        'personalInfo.phone': phone,
        'personalInfo.address.street': address,
        'personalInfo.emergencyContact.phone': emergencyContact
      },
      { new: true }
    ).populate('user', 'email firstName lastName');

    if (!employee) {
      return NextResponse.json(
        { error: 'Employee profile not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(employee);
  } catch (error) {
    console.error('Employee profile update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
