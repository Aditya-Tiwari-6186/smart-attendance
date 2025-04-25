// /app/api/student/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/db';
import Student from '@/models/student';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_here';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { email, rollNo } = await req.json();

    if (!email || !rollNo) {
      return NextResponse.json({ message: 'Email and Roll No are required' }, { status: 400 });
    }

    const student = await Student.findOne({ email, rollNo });
    if (!student) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const token = jwt.sign({ email: student.email, id: student._id }, JWT_SECRET, {
      expiresIn: '7d',
    });

    return NextResponse.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Login Error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
