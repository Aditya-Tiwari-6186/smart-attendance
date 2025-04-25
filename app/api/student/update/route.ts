// /app/api/student/update/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import  jwt  from 'jsonwebtoken';
import Student from '@/models/student';



const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_here';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decoded: any = jwt.verify(token, JWT_SECRET);

    const { fullName, phone, enrolled, major, skills, rollNo } = await req.json();

    const student = await Student.findOneAndUpdate(
      { email: decoded.email },
      { fullName, phone, enrolled, major, skills: skills ? skills.split(',') : [], rollNo },
      { new: true }
    );

    if (!student) {
      return NextResponse.json({ message: 'Student not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Profile updated successfully', student });
  } catch (error) {
    console.error('Update Error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
